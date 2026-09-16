import { useEffect, useState } from "react";
import { FaBoxesPacking, FaCopy, FaPhone, FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusStyles = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    "picked-up": "bg-indigo-100 text-indigo-700",
    "in-transit": "bg-violet-100 text-violet-700",
    "at-warehouse": "bg-cyan-100 text-cyan-700",
    "out-for-delivery": "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const AssignedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        const loadDeliveries = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/riders/my-deliveries");
                if (!ignore) {
                    setDeliveries(response.data?.data || []);
                }
            } catch (error) {
                console.error("Error loading deliveries:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadDeliveries();
        return () => { ignore = true; };
    }, [axiosSecure]);

    const handleCopy = async (txt) => {
        try {
            await navigator.clipboard.writeText(txt);
            toast.success("Tracking ID copied.");
        } catch {
            toast.error("Copy failed.");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <span className="loading loading-ring loading-lg text-[#8BA63D]" />
            </div>
        );
    }

    return (
        <section>
            <div className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">Rider Panel</p>
                        <h1 className="mt-1 text-3xl font-bold text-[#03373D]">Assigned Deliveries</h1>
                        <p className="mt-2 text-sm text-gray-500">Parcels assigned to you for pickup and delivery.</p>
                    </div>

                    <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                        {deliveries.length} {deliveries.length === 1 ? "Delivery" : "Deliveries"}
                    </div>
                </div>

                {deliveries.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center text-center p-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F8DE] text-2xl text-[#71852F] mb-4">
                            <FaBoxesPacking />
                        </div>
                        <h2 className="text-xl font-bold text-[#03373D]">No Assigned Deliveries</h2>
                        <p className="mt-2 text-sm text-gray-500 max-w-md">
                            You currently do not have any active parcels assigned to you. Admin will assign parcels soon.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deliveries.map((parcel) => {
                            const status = parcel.shipment?.status || "pending";
                            return (
                                <article key={parcel._id} className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-6 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-[#03373D] text-lg">{parcel.parcel?.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono text-xs text-gray-500">{parcel.trackingId}</span>
                                                <button onClick={() => handleCopy(parcel.trackingId)} className="text-gray-400 hover:text-[#8BA63D]">
                                                    <FaCopy size={12} />
                                                </button>
                                            </div>
                                        </div>

                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
                                            {formatStatus(status)}
                                        </span>
                                    </div>

                                    {/* Pickup Info */}
                                    <div className="rounded-xl bg-white p-4 border border-gray-100 text-xs space-y-2">
                                        <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Pickup From (Sender)</p>
                                        <p className="font-semibold text-gray-800">{parcel.sender?.name}</p>
                                        <p className="text-gray-500 flex items-center gap-1"><FaPhone size={10} /> {parcel.sender?.contact}</p>
                                        <p className="text-gray-500 flex items-start gap-1"><FaLocationDot size={10} className="mt-0.5 shrink-0" /> {parcel.sender?.address}, {parcel.sender?.region}</p>
                                    </div>

                                    {/* Dropoff Info */}
                                    <div className="rounded-xl bg-white p-4 border border-gray-100 text-xs space-y-2">
                                        <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Deliver To (Receiver)</p>
                                        <p className="font-semibold text-gray-800">{parcel.receiver?.name}</p>
                                        <p className="text-gray-500 flex items-center gap-1"><FaPhone size={10} /> {parcel.receiver?.contact}</p>
                                        <p className="text-gray-500 flex items-start gap-1"><FaLocationDot size={10} className="mt-0.5 shrink-0" /> {parcel.receiver?.address}, {parcel.receiver?.region}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AssignedDeliveries;