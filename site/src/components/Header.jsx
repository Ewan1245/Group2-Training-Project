import React from 'react';
//import logo from '../images/logo512.png';
import sky from "../images/Sky_Eats_Logo.jpg"
import avatar from '../images/profile.png';
import '../css/Header.css';

//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {
    return (
        <header>
            <a href='/' className='header-link'>
                <img src={sky} alt='logo'></img>
                
            </a>
            {/* TODO: Link this to either a login page or a profile page, depending on logged in status */}
            <a href='/login' className='header-right header-link'>
                <img src={avatar} alt='profile'></img>
            </a>
        </header>
    )
}

export default Header;