import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen gap-14 my-8'>
            <Navbar />
            <div className='w-11/12 lg:max-w-7xl mx-auto grow' >
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;