import React from 'react';
import sky from "../images/sky_sq_nobg.png"
import avatar from '../images/person-fill.svg';
import heart from '../images/bookmark-heart-fill.svg'
import eats from '../images/eats_white.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';


//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({logged_in}) => {

    const handleLogout = () => {
        let token = sessionStorage.getItem("token");
        let url = 'http://localhost:8080/endSession/';

        if (!token) {
            return;
        }

        axios.get(url+token).catch(err => {console.log(err)})
    }

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
                        <div class="dropdown">
                            <button class="btn header-right header-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={avatar} alt='profile' className='img-link profile'></img>
                            </button>
                            {logged_in == false ?
                                <ul class="dropdown-menu">
                                    <li><Link to='/login' class="dropdown-item">Login</Link></li>
                                    <li><Link to='/register' class="dropdown-item">Register</Link></li>
                                </ul>
                            :
                                <ul class="dropdown-menu">
                                    <li><Link to='/profile' class="dropdown-item">Profile</Link></li>
                                    <li><Link to='/' class="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            }
                        </div>
                   
                        {/* TODO: Change this link to the saved recipes page once built*/}
                        {logged_in == true && 
                        (<Link to='/savedRecipes' className='header-right header-link saved-recipes'>
                            <img src={heart} alt='Saved Recipes' className='img-link saved-recipes'></img>
                        </Link>) 
                        }
                    </div>
                </div>    
            </div>    
        </header>
    )
}

export default Header;