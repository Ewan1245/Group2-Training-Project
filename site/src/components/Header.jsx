import React from 'react';
import sky from "../images/sky_sq_nobg.png"
import avatar from '../images/person-fill.svg';
import heart from '../images/bookmark-heart-fill.svg'
import eats from '../images/eats_white.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';

//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {
    return (
        <header>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <Link to='/' className='header-link'>
                            <img src={sky} alt='sky ' className='logo'></img>
                            <img src={eats} alt='eats logo' className='logo'></img>
                        </Link>
                    </div>
                    <div class="col">
                        {/* TODO: Link this to either a login page or a profile page, depending on logged in status */}
                        <Link to={logged_in == false ? '/login' : '/profile'} className='header-right header-link'>
                            <img src={avatar} alt='profile' className='img-link profile'></img>
                            <body className='text-link profile'>{logged_in == false ? "Log In" : "Profile"}</body>
                        </Link>
                   
                        {/* TODO: Change this link to the saved recipes page once built*/}
                        {logged_in == true && (<Link to='/savedRecipes' className='header-right header-link saved-recipes'>
                        <img src={heart} alt='Saved Recipes' className='img-link saved-recipes'></img>
                        <body className='text-link saved-recipes'>Saved Recipes</body>
                        </Link>) }
                    </div>
                </div>    
            </div>    
        </header>
    )
}

export default Header;