import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const Nav = () => {
    const { user, isLoggedIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <nav className='bg-cyan-900'>
            {isLoggedIn && <ul className='p-5 flex justify-between'>
                <div className='flex items-center content-center'>
                    <li>
                        <HomeIcon onClick={() => { navigate('/') }} sx={{ color: 'white', margin: '0px 8px 0px', cursor: 'pointer' }} />
                    </li>
                </div>
                <li onClick={logOut} className='text-white cursor-pointer'>
                    Log Out
                </li>
            </ul>}
            {!isLoggedIn && <ul className='p-5 flex justify-between'>
                <div className='flex items-center content-center'>
                    <li>
                        <HomeIcon onClick={() => { navigate('/') }} sx={{ color: 'white', margin: '0px 8px 0px', cursor: 'pointer' }} />
                    </li>
                </div>
                <div className='flex'>
                    <Link className='text-white cursor-pointer mx-2' to={'/login'}>
                        Admin Login
                    </Link>
                </div>
            </ul>}
        </nav>
    );
}

export default Nav;
