import { Link } from "react-router";
import errorImg from "../../assets/error.png";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const ErrorPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div
                className="w-11/12 lg:max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[75vh]"
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
            >
                <img
                    src={errorImg}
                    alt="Error 404"
                    className="w-64 mb-6"
                />
                <Link to="/">
                    <button className="bg-lime-400 px-6 py-2 rounded-lg font-semibold hover:bg-lime-500 transition">
                        Go Home
                    </button>
                </Link>
            </div>
            <div data-aos="fade-up" data-aos-duration="800">
                <Footer />
            </div>
        </div>
    );
};

export default ErrorPage;