import React from 'react';

const Login = () => {
    return (
        <form action="/action_page.php">
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" />
            </div>
            <div class="checkbox">
                <label> Remember me</label>
                <input type="checkbox" />
            </div>
            <button type="submit" class="input-btn btn">Submit</button>
        </form>
    )
}

export default Login;