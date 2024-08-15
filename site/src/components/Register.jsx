import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Register({ setLoginChanged }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const nav = useNavigate();

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

            const createUserURL = process.env.REACT_APP_BASEURL + '/createUser'
            const user = {
                "firstname": firstName,
                "surname": lastName,
                "email": email,
                "password": password
            };

            await axios.post(createUserURL, user).then((res) => {
                sessionStorage.setItem("token", res.data);
                nav('/');
                setLoginChanged(true);
            }).catch((err) => {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Email already exists'
                }))
            });
        } else {
            console.log('Form submission failed due to validation errors.');
        }
    }

    return (
        <div className="register-container">
            <form className="register-form d-flex flex-column p-4" onSubmit={handleSubmit}>
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
                    className="btn register-btn w-50">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
