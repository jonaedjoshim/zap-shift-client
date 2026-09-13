import { useState } from "react";

import SearchBox from "./SearchBox";
import Warehouse from "./Warehouse";

const Coverage = () => {
    const [
        selectedLocation,
        setSelectedLocation,
    ] = useState(null);

    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10 lg:p-14">
            <div className="border-b border-gray-200 pb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                    Nationwide Coverage
                </p>

                <h1 className="mt-2 text-3xl font-extrabold text-[#03373D] md:text-4xl">
                    We Are Available in 64
                    Districts
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                    Search for your area and
                    explore our parcel delivery
                    coverage across Bangladesh.
                </p>

                <div className="mt-7">
                    <SearchBox
                        onSelect={
                            setSelectedLocation
                        }
                    />
                </div>
            </div>

            <div className="pt-8">
                <h2 className="mb-2 text-xl font-bold text-[#03373D] md:text-2xl">
                    Delivery Coverage Map
                </h2>

                <p className="mb-6 text-sm text-gray-500 md:text-base">
                    Select a district or city to
                    quickly locate the service
                    area on the map.
                </p>

                <Warehouse
                    selectedLocation={
                        selectedLocation
                    }
                />
            </div>
        </section>
    );
};

export default Coverage;