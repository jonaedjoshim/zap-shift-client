import {
    FaBoxOpen,
    FaBuilding,
    FaGlobeAsia,
    FaMoneyBillWave,
    FaShippingFast,
    FaUndo,
} from "react-icons/fa";

import services from "../../../data/services.json";
import ServiceCard from "./ServiceCard";

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
        <section className="rounded-4xl bg-[#03373D] px-4 py-12 shadow-lg md:px-10 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Our Services
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-300 md:text-base">
                        Reliable delivery
                        solutions designed for
                        personal parcels,
                        businesses, and
                        nationwide shipments.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(
                        (
                            service,
                            index
                        ) => (
                            <ServiceCard
                                key={
                                    service.id ??
                                    service.title
                                }
                                service={
                                    service
                                }
                                Icon={
                                    icons[
                                    index %
                                    icons.length
                                    ]
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;