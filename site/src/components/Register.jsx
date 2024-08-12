import React, { useState } from 'react';
import '../css/Register.css'

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ firstName, lastName, email, password, confirmPassword });
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
