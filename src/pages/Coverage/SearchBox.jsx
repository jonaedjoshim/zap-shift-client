import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Fuse from "fuse.js";
import data from "../../assets/json/warehouses.json";

const fuse = new Fuse(data, {
    keys: ["district", "city", "covered_area"],
    threshold: 0.4,
});

const SearchBox = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const result = fuse.search(query);

        const sorted = result
            .map((r) => r.item)
            .sort((a, b) => {
                const q = query.toLowerCase();
                const aMatch =
                    a.district.toLowerCase().startsWith(q) ||
                    a.city.toLowerCase().startsWith(q);
                const bMatch =
                    b.district.toLowerCase().startsWith(q) ||
                    b.city.toLowerCase().startsWith(q);
                return bMatch - aMatch;
            });

        setSuggestions(sorted.slice(0, 5));
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setQuery(item.city);
        setSuggestions([]);
        onSelect(item);
    };

    const handleClear = () => {
        setQuery("");
        setSuggestions([]);
        onSelect(null);
    };

    const handleSearch = () => {
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className="flex flex-col max-w-xl mb-12 relative" ref={wrapperRef}>
            <div className="flex w-full">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search district or city..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 text-[#00000050] bg-gray-100 rounded-l-full focus:outline-none focus:ring-1 focus:ring-[#C6E871]"
                    />
                    {query && (
                        <FiX
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            onClick={handleClear}
                        />
                    )}
                </div>

                <button
                    onClick={handleSearch}
                    className="bg-[#C6E871] hover:bg-[#b4d65a] text-black font-medium py-3 px-8 rounded-r-full transition"
                >
                    Search
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-35 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(item)}
                        >
                            {item.district} ({item.covered_area.join(", ")})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;