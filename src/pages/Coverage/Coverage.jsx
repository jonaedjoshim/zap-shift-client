import React, { useState } from "react";
import Warehouse from "./Warehouse";
import SearchBox from "./SearchBox";

const Coverage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="p-12 md:p-24 bg-white rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D3531] mb-10">
                We are available in 64 districts
            </h2>
            <SearchBox onSelect={setSelectedLocation} />
            <div className="border-t border-gray-200 mb-12"></div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1D3531] mb-6">
                We deliver almost all over Bangladesh
            </h3>
            <Warehouse selectedLocation={selectedLocation} />
        </div>
    );
};

export default Coverage;