import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import ZapShiftLogo from '../ZapShiftLogo';
import { FaArrowRight } from 'react-icons/fa';
import themeBtn from "../../../assets/theme-btn.png"

const Navbar = () => {

    const themes = ["default", "retro", "valentine"];
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
            setThemeIndex(themes.indexOf(savedTheme));
        }
    }, []);

    const handleThemeChange = () => {
        const nextIndex = (themeIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        setThemeIndex(nextIndex);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    const navItems = <>
        <li className='font-medium text-base'><NavLink to='/'>Home</NavLink></li>
        <li className='font-medium text-base'><NavLink to='/about'>About Us</NavLink></li>
    </>

    return (
        <div className="max-w-400 mx-auto navbar rounded-2xl shadow-sm py-5 px-8 bg-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="cursor-pointer">
                    <ZapShiftLogo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end space-x-4">
                <button
                    onClick={handleThemeChange}
                    className="group p-2 rounded-full bg-transparent hover:bg-gray-100/50 transition-all duration-300 ease-in-out active:scale-95 hover:shadow-[0_0_15px_rgba(3,55,61,0.2)] border-none cursor-pointer outline-none"
                >
                    <img
                        src={themeBtn}
                        alt="theme button"
                        className="w-6 h-6 transition-transform duration-1500 ease-in-out group-hover:rotate-720"
                    />
                </button>

                <a className="btn rounded-xl text">Sign In</a>

                <div className="join">
                    <button className="btn join-item rounded-xl text">Sign Up</button>
                    <button className="btn btn-circle join-item rounded-full -rotate-45 bg-black text-lime-400">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;