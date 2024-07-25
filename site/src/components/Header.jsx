import React from 'react';
import logo from '../images/logo512.png';
import avatar from '../images/avatar.jpg';
import '../css/Header.css';

//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {
    return (
        <header>
            <a href='/' className='header-link'>
                <img src={logo} alt='logo'></img>
                <h1>Food Recipe Site</h1>
            </a>
            {/* TODO: Link this to either a login page or a profile page, depending on logged in status */}
            <a href='/' className='header-right header-link'>
                <img src={avatar} alt='profile'></img>
            </a>
        </header>
    )
}

export default Header;