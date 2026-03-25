import React from 'react';
import Layer from "../../../assets/layer.png";

const MerchantCTA = () => {
    return (
        <section className="px-4 py-12 md:py-20">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-4xl merchantBgImg bg-[#002B2B] px-6 py-10 md:px-12 md:py-14 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10 min-h-100">
                    <div className="absolute top-0 left-1/3 w-150 h-75 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 w-full md:w-3/5 text-white">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Merchant and Customer Satisfaction
                            <br className="hidden lg:block" />
                            is Our First Priority
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base max-w-xl mb-8 leading-relaxed font-light">
                            We offer the lowest delivery charge with the highest value along with
                            100% safety of your product. ZapShift courier delivers your parcels in every
                            corner of Bangladesh right on time.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="border-2 border-[#CAEB66] text-[#CAEB66] text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#CAEB66] hover:text-[#002B2B] hover:cursor-pointer transition">
                                Become a Merchant
                            </button>
                            <button className="border-2 border-[#CAEB66] text-[#CAEB66] text-lg font-semibold px-6 py-3 rounded-full hover:bg-[#CAEB66] hover:text-[#002B2B] hover:cursor-pointer transition">
                                Earn with ZapShift Courier
                            </button>
                        </div>
                    </div>
                    <div className="relative z-10 w-full md:w-2/5 flex justify-center md:justify-end">
                        <img
                            src={Layer}
                            alt="Merchant illustration"
                            className="w-full max-w-[320px] md:max-w-105 object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MerchantCTA;