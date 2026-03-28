import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ZapShiftLogo from '../ZapShiftLogo';
import { FaArrowRight } from 'react-icons/fa';
import themeBtn from "../../../assets/theme-btn.png";
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, loading, signout } = useContext(AuthContext);
    const navigate = useNavigate();
    const themes = ["default", "retro", "valentine"];
    const [themeIndex, setThemeIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "default";
        setThemeIndex(themes.indexOf(savedTheme));
    }, []);

    const handleThemeChange = () => {
        const nextIndex = (themeIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        setThemeIndex(nextIndex);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    const handleSignOut = () => {
        toast.loading("Signing out...", { id: "signout" });

        signout()
            .then(() => {
                toast.success("Signed out successfully", { id: "signout" });
                navigate("/signin");
            })
            .catch(() => {
                toast.error("Sign out failed", { id: "signout" });
            });
    };

    const renderAuthButtons = () => {
        if (loading) {
            return <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse hidden lg:flex"></div>
        }

        if (user) {
            return <button onClick={handleSignOut} className="btn rounded-xl hidden lg:flex">Sign Out</button>
        }

        return (
            <>
                <Link to="/signin" className="btn rounded-xl hidden lg:flex">Sign In</Link>
                <div className="join hidden lg:flex">
                    <Link to="/signup" className="btn join-item rounded-xl">Sign Up</Link>
                    <Link to="/signup" className="btn btn-circle join-item rounded-full -rotate-45 bg-black text-lime-400 border-none">
                        <FaArrowRight />
                    </Link>
                </div>
            </>
        )
    }

    return (
        <div className="mx-auto max-w-7xl navbar rounded-2xl shadow-sm py-5 px-4 md:px-8 bg-white relative">
            <div className="navbar-start flex items-center">
                <div className="lg:hidden relative">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"} />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow absolute left-0 border border-gray-100">
                            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
                            <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</NavLink></li>
                            <li><NavLink to="/coverage" onClick={() => setIsMenuOpen(false)}>Coverage</NavLink></li>

                            {loading ? (
                                <li><div className="h-8 bg-gray-200 rounded-xl animate-pulse"></div></li>
                            ) : user ? (
                                <li><button onClick={handleSignOut}>Sign Out</button></li>
                            ) : (
                                <>
                                    <li><NavLink to="/signin" onClick={() => setIsMenuOpen(false)}>Sign In</NavLink></li>
                                    <li><NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</NavLink></li>
                                </>
                            )}
                        </ul>
                    )}
                </div>

                <Link to="/" className="cursor-pointer ml-2 lg:ml-0">
                    <ZapShiftLogo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/" className="font-medium text-[#606060] px-4 btn-circle">Home</NavLink></li>
                    <li><NavLink to="/about" className="font-medium text-[#606060] px-4 btn-circle">About Us</NavLink></li>
                    <li><NavLink to="/coverage" className="font-medium text-[#606060] px-4 btn-circle">Coverage</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-2 md:gap-4">
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

                {renderAuthButtons()}
            </div>
        </div>
    );
};

export default Navbar;