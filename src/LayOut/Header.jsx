import React from 'react';
import Navbar from '../Components/Navber/Navbar';

const Header = () => {
    return (
        <div className='sticky top-0 z-999'>
            <Navbar></Navbar>
        </div>
    );
};

export default Header;