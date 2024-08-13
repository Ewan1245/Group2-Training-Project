import React, { useState } from 'react';
import '../css/Register.css';
import bcrypt from 'bcryptjs'
import axios from 'axios';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const pepper = process.env.REACT_APP_PEPPER || 'our-secure-pepper-value';

    const validateForm = () => {
        const errors = {};
        let charRange = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let firstNameIsValid = charRange.test(firstName) && firstName.length >= 2 && firstName.length <= 30;
        let lastNameIsValid = charRange.test(lastName) && lastName.length >= 2 && lastName.length <= 30;

        if (!firstName.trim()) {
            errors.firstName = 'First name is required';
        } else if (!firstNameIsValid) {
            errors.firstName = 'Enter a valid first name';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Last name is required';
        } else if (!lastNameIsValid) {
            errors.lastName = 'Enter a valid last name';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Handle form submission logic here

            async function hashPassword(password) {
                const pepperedPassword = password + pepper;

                const saltRounds = 13;
                const salt = bcrypt.genSaltSync(saltRounds);

                const hash = bcrypt.hashSync(pepperedPassword, salt);

                return hash;
            }

            async function verifyPassword(password, hash) {
                const pepperedPassword = password + pepper;

                return await bcrypt.compare(pepperedPassword, hash);
            }

            const hash = await hashPassword(password)

            // (async () => {
            //     const hash = await hashPassword(password);
            //     console.log(`Hash: ${hash}`);
            //     console.log(`Pepper: ${pepper}`);

            //     const isMatch = await verifyPassword(password, hash);
            //     console.log(`Password Match: ${isMatch}`);
            // })();

            // console.log({ firstName, lastName, email, password, confirmPassword });

            const user = {
                firstname: firstName,
                surname: lastName,
                email: email,
                password: hash
            };

            try {
                await axios.post('http://localhost:8080/createUser', user, {
                });
            } catch (error) {
                console.log(error);
            }


        } else {
            console.log('Form submission failed due to validation errors.');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form d-flex flex-column align-items-center p-4" onSubmit={handleSubmit}>
                <div className="mb-3 w-100">
                    <label htmlFor="firstName" className="form-label">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        placeholder="Enter your first name"
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                    {errors.firstName && (
                        <span className="error-message">
                            {errors.firstName}
                        </span>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="lastName" className="form-label">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        placeholder="Enter your last name"
                        onChange={({ target }) => setLastName(target.value)}
                    />
                    {errors.lastName && (
                        <span className="error-message">
                            {errors.lastName}
                        </span>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="email" className="form-label">Email Address: </label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        placeholder="Enter your email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    {errors.email && (
                        <span className="error-message">
                            {errors.email}
                        </span>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Enter a password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    {errors.password && (
                        <span className="error-message">
                            {errors.password}
                        </span>
                    )}
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        onChange={({ target }) => setConfirmPassword(target.value)}
                    />
                    {errors.confirmPassword && (
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary register-btn w-50">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
