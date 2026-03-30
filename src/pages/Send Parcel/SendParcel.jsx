import React, { useState } from "react";

const SendParcel = () => {
    const [parcelType, setParcelType] = useState("document");

    return (
        <div className="mx-auto bg-white rounded-3xl shadow-md p-10 border border-gray-100">

            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Send Parcel
            </h1>

            <p className="text-sm text-gray-500 mb-6">
                Enter your parcel details
            </p>

            <div className="flex items-center gap-8 mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                        type="radio"
                        name="parcelType"
                        checked={parcelType === "document"}
                        onChange={() => setParcelType("document")}
                        className="radio radio-success radio-sm"
                    />
                    <span className="font-medium text-gray-700">Document</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                        type="radio"
                        name="parcelType"
                        checked={parcelType === "non-document"}
                        onChange={() => setParcelType("non-document")}
                        className="radio radio-success radio-sm"
                    />
                    <span className="font-medium text-gray-700">Non-Document</span>
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Parcel Name</label>
                    <input
                        type="text"
                        placeholder="Parcel Name"
                        className="input input-bordered w-full h-10 text-sm"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Parcel Weight (KG)</label>
                    <input
                        type="text"
                        placeholder="Parcel Weight (KG)"
                        className="input input-bordered w-full h-10 text-sm"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">

                <div>
                    <h2 className="font-semibold text-gray-800 mb-4 text-sm">
                        Sender Details
                    </h2>

                    <div className="grid gap-4">

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Sender Name</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Sender Pickup Warehouse</label>
                            <select className="select select-bordered w-full h-10 text-sm">
                                <option>Select Value</option>
                                <option>Dhaka Hub</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Sender Contact No</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Address</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Region</label>
                            <select className="select select-bordered w-full h-10 text-sm">
                                <option>Select your region</option>
                                <option>Dhaka</option>
                                <option>Chattogram</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Pickup Instruction</label>
                            <textarea className="textarea textarea-bordered w-full text-sm h-20" />
                        </div>

                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-gray-800 mb-4 text-sm">
                        Receiver Details
                    </h2>

                    <div className="grid gap-4">

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Receiver Name</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Receiver Delivery Warehouse</label>
                            <select className="select select-bordered w-full h-10 text-sm">
                                <option>Select Value</option>
                                <option>Dhaka Hub</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Receiver Contact No</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Address</label>
                            <input className="input input-bordered w-full h-10 text-sm" />
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Region</label>
                            <select className="select select-bordered w-full h-10 text-sm">
                                <option>Select your region</option>
                                <option>Dhaka</option>
                                <option>Chattogram</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Delivery Instruction</label>
                            <textarea className="textarea textarea-bordered w-full text-sm h-20" />
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-8 flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-success checkbox-sm" />
                <p className="text-sm text-gray-500">
                    I agree to the Terms & Conditions
                </p>
            </div>

            <button className="mt-6 bg-lime-400 hover:bg-lime-500 transition px-6 py-2 rounded-md text-sm font-medium text-black">
                Proceed to Confirm Booking
            </button>

        </div>
    );
};

export default SendParcel;