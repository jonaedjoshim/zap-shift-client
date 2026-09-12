import { Outlet } from "react-router-dom";

import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const RootLayout = () => {
    return (
        <div className="my-8 flex min-h-screen flex-col gap-14">
            <Navbar />

            <main className="mx-auto w-11/12 grow lg:max-w-7xl">
                <Outlet />
            </main>

            <div
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <Footer />
            </div>
        </div>
    );
};

export default RootLayout;