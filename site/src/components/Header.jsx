import React from 'react';
//import logo from '../images/logo512.png';
import sky from "../images/sky_sq_nobg.png"
import avatar from '../images/person-fill.svg';
import heart from '../images/bookmark-heart-fill.svg'
import eats from '../images/eats_white.png';
import '../css/Header.css';

//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {
    return (
        <header>
            <a href='/' className='header-link'>
                <img src={sky} alt='sky '></img>
                <img src={eats} alt='eats logo'></img>
                
            </a>

            {/* TODO: Link this to either a login page or a profile page, depending on logged in status */}
            <a href='/login' className='header-right header-link'>
                <img src={avatar} alt='profile' className='img-link profile'></img>
                <body className='text-link profile'>Log In</body>
            </a>

            {/* TODO: Change this link to the saved recipes page once built*/}
            <a href='/' className='header-right header-link saved-recipes'>
            <img src={heart} alt='Saved Recipes' className='img-link saved-recipes'></img>
            <body className='text-link saved-recipes'>Saved Recipes</body>
            </a>

        </header>
    )
}

export default Header;