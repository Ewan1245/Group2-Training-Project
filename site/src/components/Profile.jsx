import React, { useState, useEffect, useContext } from 'react';
import '../css/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';
import { ChangeLoginContext } from '../App';

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [userInfo, setUserInfo] = useState({});

    const reCheckLogin = useContext(ChangeLoginContext);
    useEffect(() => {
        reCheckLogin(true);
    }, []);

    const nav = useNavigate();

    const validateForm = () => {
        const errors = {};
        let charRange = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let firstNameIsValid = charRange.test(firstName) && firstName.length >= 2 && firstName.length <= 30;
        let lastNameIsValid = charRange.test(lastName) && lastName.length >= 2 && lastName.length <= 30;

        if (!firstNameIsValid && firstName != "") {
            errors.firstName = 'Enter a valid first name';
        }

        if (!lastNameIsValid && lastName != "") {
            errors.lastName = 'Enter a valid last name';
        }

        if (password.length < 8 && password != "") {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    useEffect(() => {
        const getUserInfo = async () => {
            let token = sessionStorage.getItem("token");
            if (!token) {
                nav("/login")
                return
            }

            const url = process.env.REACT_APP_BASEURL + "/getUserInfo/" + token;
            const userInfo = await axios.get(url).catch(err => console.log(err));
            if (!userInfo) {
                console.log("details failed to load")
                return
            }
            setUserInfo(userInfo.data)
        }
        getUserInfo()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Handle form submission logic here

            const updateUserURL = process.env.REACT_APP_BASEURL + '/updateUserInfo/' + sessionStorage.getItem('token')
            const user = {
                "firstname": firstName,
                "surname": lastName,
                "password": password
            };

            await axios.patch(updateUserURL, user).then(
                setSuccess('Details successfully updated')
            ).catch((err) => {
                console.log(err)
                setErrors(prevErrors => ({
                    ...prevErrors,
                }))
            });
        } else {
            console.log('Form submission failed due to validation errors.');
        }
    }

    return (
        <div className="register-container">
            {success && <div class="alert alert-success" role="alert">{success}</div>}
            <form className="register-form d-flex flex-column p-4" onSubmit={handleSubmit}>
                <div className="mb-3 w-100">
                    <label htmlFor="firstName" className="form-label">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        placeholder={userInfo.firstname}
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
                        placeholder={userInfo.surname}
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
                        value={userInfo.email}
                        disabled readonly
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
                    Update Details
                </button>
            </form>
        </div>
    );
};

export default Profile;
