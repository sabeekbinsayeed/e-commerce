import React, { useContext } from 'react';
import logo from '../../images/logo.png'
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='header'>

            <img src={logo} alt="" />

            <div>
                <Link to="/shop">shop</Link>
                <Link to="/orders">orders</Link>
                <Link to="/inventory">inventory</Link>

                <Link to="/about">about</Link>
                {
                    user?.uid ?
                        <>
                            <button onClick={logOut} className='mx-5'>Log out</button>
                        </> : <>
                            <Link to="/login">login</Link>
                            <Link to="/register">register</Link></>

                }
                <p>{user?.email}</p>
            </div>

        </nav>
    );
};

export default Header; 