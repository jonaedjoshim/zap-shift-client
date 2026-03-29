import React from "react";
import { FiSearch } from "react-icons/fi";
import Warehouse from "./Warehouse";

const Coverage = () => {
    return (
        <div className="p-12 md:p-24 bg-white rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D3531] mb-10">
                We are available in 64 districts
            </h2>
            <div className="flex items-center max-w-md mb-12">
                <div className="relative w-full">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search district or city..."
                        className="w-full pl-12 pr-4 py-3 text-[#00000050] bg-gray-100 rounded-l-full focus:outline-none focus:ring-1 focus:ring-[#C6E871]"
                    />
                </div>
                <button className="bg-[#C6E871] hover:bg-[#b4d65a] text-black font-medium py-3 px-8 rounded-r-full transition">
                    Search
                </button>
            </div>
            <div className="border-t border-gray-200 mb-12"></div>
            <h3 className="text-xl md:text-2xl font-bold text-[#1D3531] mb-6">
                We deliver almost all over Bangladesh
            </h3>
            <Warehouse />
        </div>
    );
};

export default Coverage;