import React from 'react';
import logo from '../../images/logo.png'
import './Header.css';

const Header = () => {
    return (
        <nav className='header'>

            <img src={logo} alt="" />

            <div>
                <a href="/shop">shop</a>
                <a href="/orders">orders</a>
                <a href="/inventory">inventory</a>
                <a href="/about">about</a>
            </div>

        </nav>
    );
};

export default Header; 