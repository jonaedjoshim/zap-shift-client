import { useEffect, useMemo, useState } from "react";
import { FaBox, FaCopy, FaMagnifyingGlass } from "react-icons/fa6";
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
    return status.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const ManageParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let ignore = false;
        const loadParcels = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/admin/parcels");
                if (!ignore) {
                    setParcels(response.data?.data || []);
                }
            } catch (error) {
                console.error("Error loading admin parcels:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadParcels();
        return () => { ignore = true; };
    }, [axiosSecure]);

    const filteredParcels = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return parcels;
        return parcels.filter(
            (p) =>
                p.trackingId?.toLowerCase().includes(q) ||
                p.sender?.name?.toLowerCase().includes(q) ||
                p.receiver?.name?.toLowerCase().includes(q) ||
                p.createdBy?.toLowerCase().includes(q)
        );
    }, [parcels, search]);

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
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">Admin Control</p>
                        <h1 className="mt-1 text-3xl font-bold text-[#03373D]">All System Parcels</h1>
                        <p className="mt-2 text-sm text-gray-500">View and oversee all booked parcels across the platform.</p>
                    </div>

                    <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                        {parcels.length} Total Parcels
                    </div>
                </div>

                {/* Search */}
                <div className="relative mt-6 max-w-md">
                    <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tracking ID, sender, or receiver..."
                        className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#CAEB66]"
                    />
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                                <th className="py-3 px-3">Parcel Info</th>
                                <th className="py-3 px-3">Tracking ID</th>
                                <th className="py-3 px-3">Sender</th>
                                <th className="py-3 px-3">Receiver</th>
                                <th className="py-3 px-3">Charge</th>
                                <th className="py-3 px-3">Payment</th>
                                <th className="py-3 px-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParcels.map((parcel) => {
                                const status = parcel.shipment?.status || "pending";
                                return (
                                    <tr key={parcel._id} className="border-b border-gray-50">
                                        <td className="py-4 px-3">
                                            <p className="font-semibold text-[#03373D]">{parcel.parcel?.name}</p>
                                            <p className="text-xs capitalize text-gray-400">{parcel.parcel?.type}</p>
                                        </td>

                                        <td className="py-4 px-3">
                                            <div className="flex items-center gap-1.5 font-mono text-xs text-gray-600">
                                                <span>{parcel.trackingId}</span>
                                                <button onClick={() => handleCopy(parcel.trackingId)} className="text-gray-400 hover:text-[#8BA63D]">
                                                    <FaCopy size={12} />
                                                </button>
                                            </div>
                                        </td>

                                        <td className="py-4 px-3 text-xs">
                                            <p className="font-medium text-gray-800">{parcel.sender?.name}</p>
                                            <p className="text-gray-400">{parcel.sender?.region}</p>
                                        </td>

                                        <td className="py-4 px-3 text-xs">
                                            <p className="font-medium text-gray-800">{parcel.receiver?.name}</p>
                                            <p className="text-gray-400">{parcel.receiver?.region}</p>
                                        </td>

                                        <td className="py-4 px-3 font-semibold">৳{parcel.pricing?.amount}</td>

                                        <td className="py-4 px-3">
                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${parcel.pricing?.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {parcel.pricing?.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="py-4 px-3">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
                                                {formatStatus(status)}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredParcels.length === 0 && (
                        <div className="py-12 text-center text-sm text-gray-400">No parcels found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ManageParcels;