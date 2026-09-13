import { Link } from "react-router-dom";

import errorImg from "../../assets/error.png";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const ErrorPage = () => {
    return (
        <div className="flex min-h-screen flex-col gap-10 py-8">
            <Navbar />

            <main
                className="mx-auto flex min-h-[65vh] w-11/12 max-w-7xl flex-1 flex-col items-center justify-center rounded-3xl bg-white px-6 text-center"
                data-aos="zoom-in"
            >
                <img
                    src={errorImg}
                    alt="Page not found illustration"
                    className="w-52 object-contain md:w-64"
                />

                <h1 className="mt-5 text-3xl font-bold text-[#03373D] md:text-4xl">
                    Page Not Found
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 md:text-base">
                    The page you are looking for
                    does not exist or may have been
                    moved.
                </p>

                <Link
                    to="/"
                    className="mt-7 rounded-lg bg-[#CAEB66] px-6 py-3 font-semibold text-black transition hover:bg-[#b9dd50]"
                >
                    Go Home
                </Link>
            </main>

            <Footer />
        </div>
    );
};

export default ErrorPage;