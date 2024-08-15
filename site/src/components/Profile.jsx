import React, { useState, useEffect } from 'react';
import '../css/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

function Profile({ setLoginChanged }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [userInfo, setUserInfo] = useState({});
    
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
          console.log(userInfo)
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

            const createUserURL = process.env.REACT_APP_BASEURL + '/createUser'
            const user = {
                "firstname": firstName,
                "surname": lastName,
                "email": email,
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
                        value={email}
                        placeholder={userInfo.email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    {errors.email && (
                        <span className="error-message">
                            {errors.email}
                        </span>
                    )}
                </div>
                
                <button
                    type="submit"
                    className="btn btn-outline-dark w-50">
                    Update Details
                </button>
            </form>
        </div>
    );
};

export default Profile;
