import Marquee from "react-fast-marquee";

// import your logos
import casioLogo from "../../../assets/brands/casio.png";
import amazonLogo from "../../../assets/brands/amazon.png";
import moonstarLogo from "../../../assets/brands/moonstar.png";
import starplusLogo from "../../../assets/brands/starplus.png";
import startpeopleLogo from "../../../assets/brands/startpeople.png";
import randstadLogo from "../../../assets/brands/randstad.png";

const logos = [
    casioLogo,
    amazonLogo,
    moonstarLogo,
    starplusLogo,
    startpeopleLogo,
    randstadLogo,
];

const Brands = () => {
    return (
        <section className="my-24 max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">
                    We've helped thousands of sales teams
                </h2>
            </div>
            <Marquee
                pauseOnHover={true}
                speed={50}
            >
                {logos.map((logo, index) => (
                    <div key={index} className="mx-8 flex items-center">
                        <img
                            src={logo}
                            alt="brand"
                            className="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition duration-300"
                        />
                    </div>
                ))}
            </Marquee>

        </section>
    );
};

export default Brands;