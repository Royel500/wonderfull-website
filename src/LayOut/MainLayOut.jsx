import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MainLayOut = () => {
    return (
        <div>
            <Header></Header>
    <div className='max-w-7xl min-h-screen mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;