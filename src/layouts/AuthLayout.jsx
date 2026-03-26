import React from 'react';
import { Outlet } from 'react-router';
import AuthImage from '../assets/authImage.png';
import ZapShiftLogo from '../pages/Shared/ZapShiftLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-10">
            <div className="w-full max-w-380 bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl min-h-200">

                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
                    <div className="absolute top-8 left-8">
                        <ZapShiftLogo />
                    </div>
                    <div className="mt-12 w-full">
                        <Outlet />
                    </div>
                </div>

                <div className="lg:flex w-1/2 bg-[#FAFDF0] items-center justify-center p-12">
                    <div className="relative w-full max-w-md">
                        <img
                            src={AuthImage}
                            alt="Authentication Illustration"
                            className="w-full h-auto object-contain drop-shadow-sm"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;