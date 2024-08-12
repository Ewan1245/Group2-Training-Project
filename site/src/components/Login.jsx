import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { TbBackground } from 'react-icons/tb';

const Login = () => {
  // return (
  //     <form action="/action_page.php">
  //         <div class="form-group">
  //             <label for="email">Email address:</label>
  //             <input type="email" class="form-control" id="email" />
  //         </div>
  //         <div class="form-group">
  //             <label for="pwd">Password:</label>
  //             <input type="password" class="form-control" id="pwd" />
  //         </div>
  //         <div class="checkbox">
  //             <label> Remember me</label>
  //             <input type="checkbox" />
  //         </div>
  //         <button type="submit" class="input-btn btn">Submit</button>
  //     </form>
  // )

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()

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

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "https://group2-training-project/site/src/app.jsx",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
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
        <div className="mb-3 w-75">
          <label htmlFor="username" className="form-label">Username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            placeholder="Enter username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="mb-3 w-75">
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