import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SendParcel = () => {
    const [parcelType, setParcelType] = useState("document");

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="w-full bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100 font-sans overflow-hidden">

            <h1 className="text-2xl md:text-3xl font-bold text-[#1D3531] mb-3" data-aos="fade-down">
                Send Parcel
            </h1>

            <hr className="border-gray-200 mb-6 md:mb-7" data-aos="fade-in" />

            {/* Parcel Details Section */}
            <div className="space-y-4 md:space-y-5" data-aos="fade-up">
                <h2 className="text-base md:text-lg font-semibold text-[#1D3531]">
                    Enter your parcel details
                </h2>

                <div className="flex flex-row items-center gap-8 sm:gap-12">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="parcelType"
                            checked={parcelType === "document"}
                            onChange={() => setParcelType("document")}
                            className="radio radio-sm border-[1.5px]  checked:border-[#C6E871] [--chkbg:#C6E871] [--chkfg:white]"
                            style={{ color: '#C6E871' }}
                        />
                        <span className="text-sm md:text-[15px] font-medium text-gray-700">Document</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="parcelType"
                            checked={parcelType === "document"}
                            onChange={() => setParcelType("document")}
                            className="radio radio-sm border-[1.5px]  checked:border-[#C6E871] [--chkbg:#C6E871] [--chkfg:white]"
                            style={{ color: '#C6E871' }}
                        />
                        <span className="text-sm md:text-[15px] font-medium text-gray-700">Not-Document</span>
                    </label>
                </div>
            </div>

            {/* Parcel Name & Weight Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-6 md:mt-7 mb-8 md:mb-10" data-aos="fade-up" data-aos-delay="100">
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text text-sm font-semibold text-gray-700">Parcel Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Parcel Name"
                        className="input input-bordered w-full h-11 md:h-12 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none"
                    />
                </div>

                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text text-sm font-semibold text-gray-700">Parcel Weight (KG)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Parcel Weight (KG)"
                        className="input input-bordered w-full h-11 md:h-12 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none"
                    />
                </div>
            </div>

            <hr className="border-gray-200 mb-8 md:mb-10" data-aos="fade-in" />

            {/* Sender and Receiver Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">

                {/* Sender Details */}
                <div className="flex flex-col gap-5 md:gap-6" data-aos="fade-right" data-aos-delay="200">
                    <h3 className="text-base md:text-lg font-semibold text-[#1D3531]">Sender Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Sender Name</span></label>
                            <input placeholder="Sender Name" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Sender Pickup Warehouse</span></label>
                            <select className="select select-bordered h-11 min-h-[2.75rem] bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none font-normal">
                                <option disabled selected>Select Warehouse</option>
                                <option>Dhaka Hub</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Address</span></label>
                            <input placeholder="Address" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Sender Contact No</span></label>
                            <input placeholder="Contact No" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                    </div>

                    {/* Desktop Issue Fixed: Always Stacked */}
                    <div className="form-control w-full">
                        <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Your Region</span></label>
                        <select className="select select-bordered h-11 min-h-[2.75rem] w-full bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none font-normal">
                            <option disabled selected>Select your region</option>
                            <option>Dhaka</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Pickup Instruction</span></label>
                        <textarea placeholder="Pickup Instruction" className="textarea textarea-bordered bg-[#F9FAFB] h-24 w-full border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                    </div>
                </div>

                {/* Receiver Details */}
                <div className="flex flex-col gap-5 md:gap-6" data-aos="fade-left" data-aos-delay="200">
                    <h3 className="text-base md:text-lg font-semibold text-[#1D3531]">Receiver Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Receiver Name</span></label>
                            <input placeholder="Receiver Name" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Receiver Delivery Warehouse</span></label>
                            <select className="select select-bordered h-11 min-h-[2.75rem] bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none font-normal">
                                <option disabled selected>Select Warehouse</option>
                                <option>Chittagong Hub</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Receiver Address</span></label>
                            <input placeholder="Address" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                        <div className="form-control">
                            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Receiver Contact No</span></label>
                            <input placeholder="Contact No" className="input input-bordered h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                        </div>
                    </div>

                    {/* Desktop Issue Fixed: Always Stacked */}
                    <div className="form-control w-full">
                        <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Receiver Region</span></label>
                        <select className="select select-bordered h-11 min-h-[2.75rem] w-full bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:outline-none font-normal">
                            <option disabled selected>Select your region</option>
                            <option>Sylhet</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">Delivery Instruction</span></label>
                        <textarea placeholder="Delivery Instruction" className="textarea textarea-bordered bg-[#F9FAFB] h-24 w-full border-gray-200 focus:border-[#C6E871] focus:outline-none" />
                    </div>
                </div>
            </div>

            <div className="mt-10 md:mt-12" data-aos="zoom-in">
                <p className="text-sm text-gray-500 mb-5 md:mb-6">
                    * PickUp Time 4pm-7pm Approx.
                </p>

                <button className="w-full sm:w-auto bg-[#C6E871] hover:bg-[#b4d65a] transition-all px-8 md:px-10 py-3 rounded-xl text-sm font-bold text-[#1D3531] shadow-sm active:scale-95">
                    Proceed to Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default SendParcel;