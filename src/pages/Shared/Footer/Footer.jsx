import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

import ZapShiftLogo from "../ZapShiftLogo";

const footerLinks = [
    {
        label: "Home",
        path: "/",
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
    {
        label: "Send Parcel",
        path: "/sendParcel",
    },
];

const socialLinks = [
    {
        label: "LinkedIn",
        icon: FaLinkedinIn,
        color: "bg-[#0077B5]",
    },
    {
        label: "X / Twitter",
        icon: FaXTwitter,
        color: "bg-white text-black",
    },
    {
        label: "Facebook",
        icon: FaFacebookF,
        color: "bg-[#1877F2]",
    },
    {
        label: "YouTube",
        icon: FaYoutube,
        color: "bg-[#FF0000]",
    },
];

const Footer = () => {
    return (
        <footer className="w-full px-4 pb-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center rounded-4xl bg-[#050505] p-8 text-center md:p-14">
                <div className="mb-5">
                    <ZapShiftLogo textColor="text-white" />
                </div>

                <p className="mb-8 max-w-2xl text-sm leading-6 text-gray-400 md:text-base md:leading-7">
                    Fast, dependable parcel delivery
                    with convenient booking, nationwide
                    coverage, and simple tracking for
                    individuals and businesses.
                </p>

                <div className="mb-7 w-full border-t border-dashed border-[#16464A]" />

                <nav
                    className="mb-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-300 md:text-base"
                    aria-label="Footer navigation"
                >
                    {footerLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="transition-colors hover:text-[#CAEB66]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="mb-7 w-full border-t border-dashed border-[#16464A]" />

                <div
                    className="flex justify-center gap-3"
                    aria-label="Social media"
                >
                    {socialLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                            <div
                                key={social.label}
                                title={`${social.label} link coming soon`}
                                aria-label={social.label}
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${social.color}`}
                            >
                                <Icon size={17} />
                            </div>
                        );
                    })}
                </div>

                <p className="mt-7 text-xs text-gray-600">
                    © {new Date().getFullYear()} ZapShift.
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;