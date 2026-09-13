import { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

import themeBtn from "../../../assets/theme-btn.png";
import useAuth from "../../../hooks/useAuth";
import ZapShiftLogo from "../ZapShiftLogo";

const themes = [
    "default",
    "retro",
    "valentine",
];

const navLinks = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Send Parcel",
        path: "/sendParcel",
    },
    {
        label: "Coverage",
        path: "/coverage",
    },
    {
        label: "About Us",
        path: "/about",
    },
    {
        label: "Pricing",
        path: "/pricing",
    },
];

const Navbar = () => {
    const {
        user,
        loading,
        signout,
    } = useAuth();

    const navigate = useNavigate();

    const [themeIndex, setThemeIndex] =
        useState(0);

    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme") ||
            "default";

        const savedThemeIndex =
            themes.indexOf(savedTheme);

        const validTheme =
            savedThemeIndex >= 0
                ? savedTheme
                : "default";

        const validIndex =
            savedThemeIndex >= 0
                ? savedThemeIndex
                : 0;

        setThemeIndex(validIndex);

        document.documentElement.setAttribute(
            "data-theme",
            validTheme
        );
    }, []);

    const handleThemeChange = () => {
        const nextIndex =
            (themeIndex + 1) %
            themes.length;

        const nextTheme =
            themes[nextIndex];

        setThemeIndex(nextIndex);

        document.documentElement.setAttribute(
            "data-theme",
            nextTheme
        );

        localStorage.setItem(
            "theme",
            nextTheme
        );
    };

    const handleSignOut = async () => {
        const toastId = toast.loading(
            "Signing out..."
        );

        try {
            await signout();

            toast.success(
                "Signed out successfully",
                {
                    id: toastId,
                }
            );

            setIsMenuOpen(false);

            navigate("/signin");
        } catch {
            toast.error(
                "Sign out failed",
                {
                    id: toastId,
                }
            );
        }
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const getNavLinkClass = ({
        isActive,
    }) => {
        return `rounded-full px-4 py-2 font-medium transition-colors ${isActive
                ? "bg-[#CAEB66] text-black"
                : "text-[#606060] hover:bg-gray-100 hover:text-black"
            }`;
    };

    return (
        <header className="relative z-50 mx-auto w-full max-w-7xl rounded-2xl bg-white px-4 py-4 shadow-sm md:px-8">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() =>
                            setIsMenuOpen(
                                (previous) =>
                                    !previous
                            )
                        }
                        className="mr-1 flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-gray-100 lg:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={
                            isMenuOpen
                        }
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h12M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                    <Link
                        to="/"
                        onClick={
                            closeMobileMenu
                        }
                        aria-label="ZapShift Home"
                    >
                        <ZapShiftLogo />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav
                    className="hidden lg:block"
                    aria-label="Main navigation"
                >
                    <ul className="flex items-center gap-1">
                        {navLinks.map(
                            (link) => (
                                <li
                                    key={
                                        link.path
                                    }
                                >
                                    <NavLink
                                        to={
                                            link.path
                                        }
                                        end={
                                            link.path ===
                                            "/"
                                        }
                                        className={
                                            getNavLinkClass
                                        }
                                    >
                                        {
                                            link.label
                                        }
                                    </NavLink>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                {/* Right */}
                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        type="button"
                        onClick={
                            handleThemeChange
                        }
                        className="group rounded-full border-none bg-transparent p-2 outline-none transition-all duration-300 hover:bg-gray-100/50 active:scale-95"
                        aria-label="Change theme"
                    >
                        <img
                            src={themeBtn}
                            alt=""
                            className="h-6 w-6 transition-transform duration-700 group-hover:rotate-180"
                        />
                    </button>

                    {loading ? (
                        <div className="hidden h-10 w-24 animate-pulse rounded-xl bg-gray-200 lg:block" />
                    ) : user ? (
                        <button
                            type="button"
                            onClick={
                                handleSignOut
                            }
                            className="hidden rounded-xl border border-gray-200 px-5 py-2.5 font-medium transition hover:bg-gray-100 lg:block"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <div className="hidden items-center gap-2 lg:flex">
                            <Link
                                to="/signin"
                                className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium transition hover:bg-gray-100"
                            >
                                Sign In
                            </Link>

                            <div className="flex items-center">
                                <Link
                                    to="/signup"
                                    className="rounded-l-xl bg-[#CAEB66] px-5 py-2.5 font-semibold text-black transition hover:bg-[#b9dd50]"
                                >
                                    Sign Up
                                </Link>

                                <Link
                                    to="/signup"
                                    aria-label="Create account"
                                    className="-ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-black text-[#CAEB66]"
                                >
                                    <FaArrowRight className="-rotate-45" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl lg:hidden">
                    <nav aria-label="Mobile navigation">
                        <ul className="space-y-1">
                            {navLinks.map(
                                (link) => (
                                    <li
                                        key={
                                            link.path
                                        }
                                    >
                                        <NavLink
                                            to={
                                                link.path
                                            }
                                            end={
                                                link.path ===
                                                "/"
                                            }
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className={({
                                                isActive,
                                            }) =>
                                                `block rounded-lg px-4 py-3 font-medium transition ${isActive
                                                    ? "bg-[#CAEB66] text-black"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            {
                                                link.label
                                            }
                                        </NavLink>
                                    </li>
                                )
                            )}
                        </ul>

                        <div className="mt-3 border-t border-gray-100 pt-3">
                            {loading ? (
                                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
                            ) : user ? (
                                <button
                                    type="button"
                                    onClick={
                                        handleSignOut
                                    }
                                    className="rounded-lg bg-gray-100 px-4 py-3 text-left font-medium"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/signin"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg border border-gray-200 px-4 py-3 text-center font-medium"
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg bg-[#CAEB66] px-4 py-3 text-center font-semibold text-black"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;