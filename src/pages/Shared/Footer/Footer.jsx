import React from 'react';
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ZapShiftLogo from '../ZapShiftLogo';

const Footer = () => {
    return (
        <footer className="w-full px-4 pb-10">
            <div className="max-w-7xl mx-auto bg-[#050505] rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center text-center">

                <div className="mb-6">
                    <ZapShiftLogo textColor="text-white" />
                </div>

                <p className="text-gray-400 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="w-full border-t border-gray-800/50 mb-8"></div>

                <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-gray-300 text-sm md:text-base mb-10">
                    <a href="#" className="hover:text-white transition-colors">Services</a>
                    <a href="#" className="hover:text-white transition-colors">Coverage</a>
                    <a href="#" className="hover:text-white transition-colors">About Us</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#" className="hover:text-white transition-colors">Blog</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </nav>

                <div className="w-full border-t border-gray-800/50 mb-8"></div>

                <div className="flex justify-center gap-4">
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:opacity-80 transition-opacity">
                        <FaLinkedinIn size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                        <FaXTwitter size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity">
                        <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:opacity-80 transition-opacity">
                        <FaYoutube size={20} />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;