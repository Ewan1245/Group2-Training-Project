import React, { useContext, useEffect } from 'react';
import sky from "../images/sky_sq_nobg.png"
import avatar from '../images/person-fill.svg';
import heart from '../images/bookmark-heart-fill.svg'
import eats from '../images/eats_white.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../baseUrl';
import { ChangeLoginContext } from '../App';


//returns a header object with a navbar
//TODO: pages links need to be added
const Header = ({ logged_in, setLoginChanged }) => {

    const handleLogout = async () => {
        let token = sessionStorage.getItem("token");
        let url = process.env.REACT_APP_BASEURL + '/endSession/';

        if (!token) {
            return;
        }

        
        await axios.get(url + token).then(setLoginChanged(true)).catch(err => { console.log(err) })
        reCheckLogin(true);
    }

    const reCheckLogin = useContext(ChangeLoginContext);
    useEffect(() => {
        reCheckLogin(true);
    }, []);

    return (
        <header>
            <div className="container text-center">
                <div className="row align-items-center justify-content-between">
                    <div className="col d-flex justify-content-left">
                        <Link to='/' onClick={() => { reCheckLogin(true) }} className='header-link d-flex align-items-center'>
                            <img src={sky} alt='sky' className='logo'></img>
                            <img src={eats} alt='eats logo' className='logo'></img>
                        </Link>
                    </div>
                    <div className="col-auto d-flex align-items-center justify-content-end">
                        {logged_in == true && (
                            <Link to='/savedRecipes' className='header-right header-link saved-recipes'>
                                <img src={heart} alt='Saved Recipes' className='img-link saved-recipes'></img>
                            </Link>
                        )}
                        <div className="dropdown">
                            <button className="btn header-right header-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={avatar} alt='profile' className='img-link profile'></img>
                            </button>
                            {logged_in == false ?
                                <ul className="dropdown-menu">
                                    <li><Link to='/login' className="dropdown-item">Login</Link></li>
                                    <li><Link to='/register' className="dropdown-item">Register</Link></li>
                                </ul>
                                :
                                <ul className="dropdown-menu">
                                    <li><Link to='/profile' className="dropdown-item">Profile</Link></li>
                                    <li><Link to='/' className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>


    )
}

export default Header;