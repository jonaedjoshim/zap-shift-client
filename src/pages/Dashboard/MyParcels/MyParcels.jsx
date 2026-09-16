import { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaCopy, FaCreditCard, FaKey, FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
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
    return status
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let ignore = false;

        const loadParcels = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axiosSecure.get("/parcels/my-parcels");

                if (!ignore) {
                    setParcels(response.data?.data || []);
                }
            } catch (error) {
                console.error("Failed to load parcels:", error);

                if (!ignore) {
                    setError(
                        error.response?.data?.message ||
                        "Unable to load your parcels."
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadParcels();

        return () => {
            ignore = true;
        };
    }, [axiosSecure]);

    const filteredParcels = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return parcels;
        }

        return parcels.filter(
            (parcel) =>
                parcel.trackingId?.toLowerCase().includes(query) ||
                parcel.parcel?.name?.toLowerCase().includes(query) ||
                parcel.receiver?.name?.toLowerCase().includes(query)
        );
    }, [parcels, search]);

    const handleCopy = async (txt, label) => {
        try {
            await navigator.clipboard.writeText(txt);
            toast.success(`${label} copied to clipboard!`);
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
                {/* Header */}
                <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                            Parcel History
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#03373D]">
                            My Parcels
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            View and manage all parcels you have booked with
                            ZapShift.
                        </p>
                    </div>

                    {parcels.length > 0 && (
                        <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                            {parcels.length}{" "}
                            {parcels.length === 1 ? "Parcel" : "Parcels"}
                        </div>
                    )}
                </div>

                {error ? (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                ) : parcels.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F8DE] text-2xl text-[#71852F]">
                            <FaBoxOpen />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-[#03373D]">
                            No Parcels Yet
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            When you book your first parcel, its tracking and
                            delivery details will appear here.
                        </p>

                        <Link
                            to="/sendParcel"
                            className="mt-6 rounded-xl bg-[#CAEB66] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#b9dd50]"
                        >
                            Send a Parcel
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Search */}
                        <div className="relative mt-6 max-w-md">
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search tracking ID, parcel or receiver"
                                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66]"
                            />
                        </div>

                        {/* Desktop Table */}
                        <div className="mt-6 hidden overflow-x-auto lg:block">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400">
                                        <th className="px-3 py-4">Parcel</th>
                                        <th className="px-3 py-4">Tracking ID</th>
                                        <th className="px-3 py-4">Delivery OTP</th>
                                        <th className="px-3 py-4">Receiver</th>
                                        <th className="px-3 py-4">Cost</th>
                                        <th className="px-3 py-4">Payment</th>
                                        <th className="px-3 py-4">Delivery</th>
                                        <th className="px-3 py-4">Date</th>
                                        <th className="px-3 py-4 text-right">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredParcels.map((parcel) => {
                                        const status = parcel.shipment?.status || "pending";
                                        const isUnpaid = parcel.pricing?.paymentStatus === "unpaid";

                                        return (
                                            <tr key={parcel._id} className="border-b border-gray-50 text-sm">
                                                <td className="px-3 py-5">
                                                    <p className="font-semibold text-[#03373D]">
                                                        {parcel.parcel?.name}
                                                    </p>
                                                    <p className="mt-1 text-xs capitalize text-gray-400">
                                                        {parcel.parcel?.type}
                                                    </p>
                                                </td>

                                                <td className="px-3 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs text-gray-600">
                                                            {parcel.trackingId}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleCopy(parcel.trackingId, "Tracking ID")}
                                                            className="text-gray-400 transition hover:text-[#8BA63D] cursor-pointer"
                                                            title="Copy Tracking ID"
                                                        >
                                                            <FaCopy />
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Delivery OTP Display */}
                                                <td className="px-3 py-5">
                                                    {parcel.deliveryOTP ? (
                                                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 w-fit">
                                                            <FaKey size={10} className="text-amber-500" />
                                                            <span>{parcel.deliveryOTP}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleCopy(parcel.deliveryOTP, "Delivery OTP")}
                                                                className="text-amber-400 hover:text-amber-800 cursor-pointer ml-1"
                                                                title="Copy OTP"
                                                            >
                                                                <FaCopy size={11} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">N/A</span>
                                                    )}
                                                </td>

                                                <td className="px-3 py-5 text-gray-600">
                                                    {parcel.receiver?.name}
                                                </td>

                                                <td className="px-3 py-5 font-semibold">
                                                    ৳{parcel.pricing?.amount}
                                                </td>

                                                <td className="px-3 py-5">
                                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${isUnpaid ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                                                        {parcel.pricing?.paymentStatus}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-5">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
                                                        {formatStatus(status)}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-5 text-gray-500">
                                                    {formatDate(parcel.createdAt)}
                                                </td>

                                                <td className="px-3 py-5 text-right">
                                                    {isUnpaid && (
                                                        <button
                                                            onClick={() => navigate(`/dashboard/payment/${parcel._id}`)}
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#CAEB66] px-3.5 py-1.5 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50] active:scale-95 cursor-pointer"
                                                        >
                                                            <FaCreditCard /> Pay Now
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="mt-6 grid gap-4 lg:hidden">
                            {filteredParcels.map((parcel) => {
                                const status = parcel.shipment?.status || "pending";
                                const isUnpaid = parcel.pricing?.paymentStatus === "unpaid";

                                return (
                                    <article key={parcel._id} className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="font-bold text-[#03373D]">
                                                    {parcel.parcel?.name}
                                                </h2>
                                                <p className="mt-1 text-xs capitalize text-gray-400">
                                                    {parcel.parcel?.type}
                                                </p>
                                            </div>

                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
                                                {formatStatus(status)}
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-3 text-sm">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-400">Receiver</span>
                                                <span className="text-right font-medium text-gray-700">
                                                    {parcel.receiver?.name}
                                                </span>
                                            </div>

                                            {parcel.deliveryOTP && (
                                                <div className="flex justify-between gap-4 items-center">
                                                    <span className="text-gray-400">Delivery OTP</span>
                                                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                                        {parcel.deliveryOTP}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-400">Cost</span>
                                                <span className="font-semibold">
                                                    ৳{parcel.pricing?.amount}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-400">Payment</span>
                                                <span className={`font-semibold capitalize ${isUnpaid ? "text-red-600" : "text-green-600"}`}>
                                                    {parcel.pricing?.paymentStatus}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-4">
                                                <span className="text-gray-400">Date</span>
                                                <span className="text-gray-700">
                                                    {formatDate(parcel.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
                                            <span className="truncate font-mono text-xs text-gray-500">
                                                {parcel.trackingId}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => handleCopy(parcel.trackingId, "Tracking ID")}
                                                className="shrink-0 text-gray-400 hover:text-[#8BA63D]"
                                                aria-label="Copy tracking ID"
                                            >
                                                <FaCopy />
                                            </button>
                                        </div>

                                        {isUnpaid && (
                                            <button
                                                onClick={() => navigate(`/dashboard/payment/${parcel._id}`)}
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#CAEB66] py-2.5 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50]"
                                            >
                                                <FaCreditCard /> Pay Now ৳{parcel.pricing?.amount}
                                            </button>
                                        )}
                                    </article>
                                );
                            })}
                        </div>

                        {filteredParcels.length === 0 && (
                            <div className="py-16 text-center text-sm text-gray-500">
                                No parcel matches your search.
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default MyParcels;