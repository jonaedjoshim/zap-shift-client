import React from 'react';
import { NavLink } from 'react-router';
import ZapShiftLogo from '../ZapShiftLogo';
import { FaArrowRight } from 'react-icons/fa';

const Navbar = () => {

    const navItems = <>
        <li className='font-medium text-base'><NavLink to='/'>Home</NavLink></li>
        <li className='font-medium text-base'><NavLink to='/about'>About Us</NavLink></li>
    </>

    return (
        <div className="max-w-400 mx-auto navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><ZapShiftLogo /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end space-x-4">
                <a className="btn rounded-xl text">Sign In</a>
                <div className="join">
                    <button className="btn join-item rounded-xl text">Sign Up</button>
                    <button className="btn btn-circle join-item rounded-full -rotate-45 bg-[#1F1F1F] text-[#CAEB66]"><FaArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;