import { Link } from "react-router-dom";

import Layer from "../../../assets/layer.png";

const MerchantCTA = () => {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="merchantBgImg relative flex min-h-90 flex-col items-center justify-between gap-10 overflow-hidden rounded-4xl bg-[#002B2B] px-6 py-10 md:flex-row md:px-12 md:py-14 lg:px-16">

                    <div className="relative z-10 w-full text-white md:w-3/5">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#CAEB66]">
                            Grow with ZapShift
                        </p>

                        <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                            Merchant and Customer
                            Satisfaction Is Our First
                            Priority
                        </h2>

                        <p className="mb-8 mt-4 max-w-xl text-sm font-light leading-7 text-gray-300 md:text-base">
                            We provide reliable parcel
                            delivery with transparent
                            pricing and nationwide
                            coverage, helping both
                            individuals and businesses
                            deliver with confidence.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/sendParcel"
                                className="rounded-full bg-[#CAEB66] px-6 py-3 text-sm font-semibold text-[#002B2B] transition hover:bg-[#b9dd50]"
                            >
                                Send a Parcel
                            </Link>

                            <Link
                                to="/coverage"
                                className="rounded-full border-2 border-[#CAEB66] px-6 py-3 text-sm font-semibold text-[#CAEB66] transition hover:bg-[#CAEB66] hover:text-[#002B2B]"
                            >
                                View Coverage
                            </Link>
                        </div>
                    </div>

                    <div className="relative z-10 flex w-full justify-center md:w-2/5 md:justify-end">
                        <img
                            src={Layer}
                            alt="Parcel delivery illustration"
                            className="w-full max-w-[320px] object-contain drop-shadow-2xl md:max-w-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MerchantCTA;