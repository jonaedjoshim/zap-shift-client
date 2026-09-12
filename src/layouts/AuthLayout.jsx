import { Link, Outlet } from "react-router-dom";

import AuthImage from "../assets/authImage.png";
import ZapShiftLogo from "../pages/Shared/ZapShiftLogo";

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 md:p-10">
            <div className="flex w-full max-w-380 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex-row">
                <div
                    data-aos="fade-right"
                    className="relative flex w-full flex-col justify-center p-6 md:p-12 lg:w-1/2"
                >
                    <div className="absolute left-4 top-4 md:left-8 md:top-8">
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
                    className="hidden w-1/2 items-center justify-center bg-[#FAFDF0] p-10 lg:flex"
                >
                    <div className="relative w-full max-w-md">
                        <img
                            src={AuthImage}
                            alt="Parcel delivery illustration"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;