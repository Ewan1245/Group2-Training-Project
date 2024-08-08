import React from 'react';
//import logo from '../images/logo512.png';
import sky from "../images/Sky_Eats_Logo.jpg"
import avatar from '../images/person-fill.svg';
import heart from '../images/bookmark-heart-fill.svg'
import '../css/Header.css';
import { Link } from 'react-router-dom';


//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {
    return (
        <header>
            <Link to='/' className='header-link'>
                <img src={sky} alt='logo'></img>
            </Link>

            {/* TODO: Link this to either a login page or a profile page, depending on logged in status */}
            <Link to='/login' className='header-right header-link'>
                <img src={avatar} alt='profile' className='img-link profile'></img>
                <body className='text-link profile'>Log In</body>
            </Link>

            {/* TODO: Change this link to the saved recipes page once built*/}
            <Link to='/savedRecipes' className='header-right header-link saved-recipes'>
            <img src={heart} alt='Saved Recipes' className='img-link saved-recipes'></img>
            <body className='text-link saved-recipes'>Saved Recipes</body>
            </Link>

        </header>
    )
}

export default Header;