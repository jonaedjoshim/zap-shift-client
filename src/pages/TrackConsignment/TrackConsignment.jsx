import { useState } from "react";
import { FaMagnifyingGlass, FaLocationDot, FaCircleCheck, FaClockRotateLeft } from "react-icons/fa6";
import axios from "axios";

const statusStyles = {
    pending: "text-amber-500",
    confirmed: "text-blue-500",
    "picked-up": "text-indigo-500",
    "in-transit": "text-violet-500",
    "at-warehouse": "text-cyan-500",
    "out-for-delivery": "text-orange-500",
    delivered: "text-green-500",
    cancelled: "text-red-500",
};

const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const formatDate = (date) => {
    return new Date(date).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const TrackConsignment = () => {
    const [trackingId, setTrackingId] = useState("");
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        try {
            setLoading(true);
            setError(null);
            setParcel(null);

            // Public API call, no token required
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/parcels/track/${trackingId.trim()}`);
            setParcel(response.data?.data);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid tracking ID. Please check and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-10 md:py-16">
            <div className="text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                    Live Tracking
                </p>
                <h1 className="mt-2 text-3xl md:text-5xl font-bold text-[#03373D]">Track Your Consignment</h1>
                <p className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto">Enter your unique tracking code below to see the real-time status and journey of your parcel.</p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 mb-12">
                <div className="relative flex-1">
                    <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="e.g. ZS-20260915-XXXX"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 md:py-4 rounded-2xl border border-gray-200 focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66] outline-none shadow-sm transition"
                    />
                </div>
                <button
                    disabled={loading}
                    className="bg-[#CAEB66] hover:bg-[#b9dd50] text-[#03373D] font-bold px-6 md:px-8 rounded-2xl transition shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Searching..." : "Track"}
                </button>
            </form>

            {error && (
                <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl text-center mb-10 text-sm">
                    {error}
                </div>
            )}

            {parcel && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-in">
                    {/* Summary Card */}
                    <div className="lg:col-span-1 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Parcel Details</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Current Status</p>
                                <p className={`text-lg md:text-xl font-bold mt-1 ${statusStyles[parcel.shipment?.status] || 'text-gray-900'}`}>
                                    {formatStatus(parcel.shipment?.status)}
                                </p>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-400">PARCEL TYPE</p>
                                <p className="font-bold text-[#03373D] capitalize mt-1 text-sm md:text-base">{parcel.parcel?.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">DESTINATION</p>
                                <p className="font-bold text-[#03373D] mt-1 text-sm md:text-base">{parcel.receiver?.region}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">BOOKED ON</p>
                                <p className="font-bold text-[#03373D] mt-1 text-sm md:text-base">{formatDate(parcel.createdAt).split(',')[0]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Tracking Updates</h3>

                        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-z-10 before:h-full before:w-0.5 before:bg-gray-100">
                            {parcel.trackingHistory?.map((event, index) => {
                                const isLatest = index === parcel.trackingHistory.length - 1;
                                return (
                                    <div key={index} className="relative flex items-start gap-4 md:gap-6">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ring-4 ring-white ${isLatest ? 'bg-[#CAEB66] text-[#03373D]' : 'bg-gray-100 text-gray-400'}`}>
                                            {isLatest ? <FaLocationDot /> : <FaCircleCheck />}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                                                <h4 className={`font-bold text-sm md:text-base ${isLatest ? 'text-[#03373D]' : 'text-gray-500'}`}>
                                                    {formatStatus(event.status)}
                                                </h4>
                                                <span className="text-[10px] md:text-xs font-medium text-gray-400 flex items-center gap-1">
                                                    <FaClockRotateLeft /> {formatDate(event.timestamp)}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs md:text-sm text-gray-500">{event.message}</p>
                                        </div>
                                    </div>
                                );
                            }).reverse()}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TrackConsignment;