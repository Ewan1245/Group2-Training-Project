import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import '../css/Login.css';
import { TbBackground } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

const Login = ({ setLoginChanged }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()

  const nav = useNavigate();
  const pepper = process.env.REACT_APP_PEPPER || 'our-secure-pepper-value';

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

  // async function verifyPassword(password, hash) {
  //   const pepperedPassword = password + pepper;

  //   return await bcrypt.compare(pepperedPassword, hash);
  // }

  const loginURL = baseUrl + '/login'

  const handleLogin = async (email, password) => {
    let body = {
      'email': email,
      'password': password
    }
    await axios.post(loginURL, body).then((res) => {
      sessionStorage.setItem("token", res.data);
      setLoginChanged(true);
      nav('/');
    }).catch((err) => {
      //TODO: Visualise error to user
      console.log(err);
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    handleLogin(username, password);
  };

  // if there's a user show the message below
  if (user) {
    return <div>
      {user.name} is loggged in
      <button onClick={handleLogout}>logout</button>
    </div>;
  }

  // if there's no user, show the login form
  return (
    <div className="login-container">
      <form className="login-form d-flex flex-column align-items-center p-4" onSubmit={handleSubmit}>
        <div className="mb-3 w-100">
          <label htmlFor="username" className="form-label">Email: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            placeholder="Enter email"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="password" className="form-label">Password: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Enter password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary login-btn w-50">Login</button>
      </form>
    </div>
  );
};


export default Login;