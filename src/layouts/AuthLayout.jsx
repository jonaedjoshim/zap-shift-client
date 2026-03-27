import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AuthImage from '../assets/authImage.png';
import ZapShiftLogo from '../pages/Shared/ZapShiftLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-10">
            <div className="w-full max-w-380 bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">

                <div
                    data-aos="fade-right"
                    className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-center relative"
                >
                    <div className="absolute top-4 left-4 md:top-8 md:left-8">
                        <Link to="/">
                            <ZapShiftLogo />
                        </Link>
                    </div>
                    <div className="mt-12 w-full">
                        <Outlet />
                    </div>
                </div>

                <div
                    data-aos="fade-left"
                    className="hidden lg:flex w-1/2 bg-[#FAFDF0] items-center justify-center p-10"
                >
                    <div className="relative w-full max-w-md">
                        <img
                            src={AuthImage}
                            alt="Authentication Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;