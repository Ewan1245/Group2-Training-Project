import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="Enter username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};


export default Login;