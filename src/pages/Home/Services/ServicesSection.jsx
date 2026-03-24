import ServiceCard from "./ServiceCard";
import services from "../../../data/services.json";

import {
    FaShippingFast,
    FaGlobeAsia,
    FaBoxOpen,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo,
} from "react-icons/fa";

const icons = [
    FaShippingFast,
    FaGlobeAsia,
    FaBoxOpen,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo,
];

const ServicesSection = () => {
    return (
        <section className="border border-[#03373D] shadow-lg py-16 px-4 md:px-10 rounded-3xl">
            <div className="max-w-6xl mx-auto text-center text-white">
                <h2 className="text-4xl font-bold mb-4">
                    Our Services
                </h2>
                <p className="text-base opacity-80 max-w-2xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            Icon={icons[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;