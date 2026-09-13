import Marquee from "react-fast-marquee";

import amazonLogo from "../../../assets/brands/amazon.png";
import casioLogo from "../../../assets/brands/casio.png";
import moonstarLogo from "../../../assets/brands/moonstar.png";
import randstadLogo from "../../../assets/brands/randstad.png";
import starplusLogo from "../../../assets/brands/starplus.png";
import startpeopleLogo from "../../../assets/brands/startpeople.png";

const brands = [
    {
        name: "Casio",
        logo: casioLogo,
    },
    {
        name: "Amazon",
        logo: amazonLogo,
    },
    {
        name: "Moonstar",
        logo: moonstarLogo,
    },
    {
        name: "Star Plus",
        logo: starplusLogo,
    },
    {
        name: "Start People",
        logo: startpeopleLogo,
    },
    {
        name: "Randstad",
        logo: randstadLogo,
    },
];

const Brands = () => {
    return (
        <section className="mx-auto my-16 max-w-6xl md:my-20">
            <div className="mb-8 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                    Trusted by businesses
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#03373D] md:text-3xl">
                    Supporting businesses with reliable delivery
                </h2>
            </div>

            <Marquee
                pauseOnHover
                speed={40}
                gradient
                gradientColor="#ffffff"
                gradientWidth={40}
            >
                {brands.map((brand) => (
                    <div
                        key={brand.name}
                        className="mx-8 flex h-12 items-center md:mx-12"
                    >
                        <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="max-h-7 w-auto max-w-32 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default Brands;