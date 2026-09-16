import { useEffect, useMemo, useState } from "react";
import { FaCopy, FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
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
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
};

const ManageParcels = () => {
    const axiosSecure = useAxiosSecure();

    const [parcels, setParcels] = useState([]);
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [assigningId, setAssigningId] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);

            const [parcelsRes, ridersRes] = await Promise.all([
                axiosSecure.get("/admin/parcels"),
                axiosSecure.get("/admin/riders"),
            ]);

            setParcels(parcelsRes.data?.data || []);
            setRiders(ridersRes.data?.data || []);
        } catch (error) {
            console.error("Error loading admin parcels:", error);
            toast.error("Failed to load parcels.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [axiosSecure]);

    const filteredParcels = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return parcels;

        return parcels.filter(
            (p) =>
                p.trackingId?.toLowerCase().includes(q) ||
                p.sender?.name?.toLowerCase().includes(q) ||
                p.receiver?.name?.toLowerCase().includes(q) ||
                p.createdBy?.toLowerCase().includes(q) ||
                p.shipment?.riderId?.name?.toLowerCase().includes(q)
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

    const handleAssignRider = async (parcel) => {
        if (riders.length === 0) {
            Swal.fire(
                "No Riders",
                "There are no active riders available to assign.",
                "info"
            );
            return;
        }

        const inputOptions = {};
        riders.forEach((rider) => {
            inputOptions[rider._id] = `${rider.name} (${rider.email})`;
        });

        const { value: riderId } = await Swal.fire({
            title: "Assign Rider",
            text: `Parcel: ${parcel.trackingId}`,
            input: "select",
            inputOptions,
            inputPlaceholder: "Select a rider",
            showCancelButton: true,
            confirmButtonText: "Assign",
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#d33",
            inputValidator: (value) => {
                if (!value) return "Please select a rider";
            },
        });

        if (!riderId) return;

        try {
            setAssigningId(parcel._id);

            await axiosSecure.patch(
                `/parcels/${parcel._id}/assign-rider`,
                { riderId }
            );

            toast.success("Rider assigned successfully.");
            await loadData();
        } catch (error) {
            console.error("Assign rider failed:", error);
            Swal.fire(
                "Assignment Failed",
                error.response?.data?.message || "Could not assign rider.",
                "error"
            );
        } finally {
            setAssigningId(null);
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
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                            Admin Control
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-[#03373D]">
                            All System Parcels
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            View parcels and assign active riders to paid bookings.
                        </p>
                    </div>

                    <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                        {parcels.length} Total Parcels · {riders.length} Riders
                    </div>
                </div>

                <div className="relative mt-6 max-w-md">
                    <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tracking ID, sender, receiver, rider..."
                        className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#CAEB66]"
                    />
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                                <th className="py-3 px-3">Parcel Info</th>
                                <th className="py-3 px-3">Tracking ID</th>
                                <th className="py-3 px-3">Route</th>
                                <th className="py-3 px-3">Charge</th>
                                <th className="py-3 px-3">Payment</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-3">Assigned Rider</th>
                                <th className="py-3 px-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParcels.map((parcel) => {
                                const status = parcel.shipment?.status || "pending";
                                const isPaid = parcel.pricing?.paymentStatus === "paid";
                                const hasRider = Boolean(parcel.shipment?.riderId);
                                const canAssign =
                                    isPaid &&
                                    !["delivered", "cancelled"].includes(status);

                                return (
                                    <tr key={parcel._id} className="border-b border-gray-50">
                                        <td className="py-4 px-3">
                                            <p className="font-semibold text-[#03373D]">
                                                {parcel.parcel?.name}
                                            </p>
                                            <p className="text-xs capitalize text-gray-400">
                                                {parcel.parcel?.type}
                                            </p>
                                        </td>

                                        <td className="py-4 px-3">
                                            <div className="flex items-center gap-1.5 font-mono text-xs text-gray-600">
                                                <span>{parcel.trackingId}</span>
                                                <button
                                                    onClick={() => handleCopy(parcel.trackingId)}
                                                    className="text-gray-400 hover:text-[#8BA63D] cursor-pointer"
                                                >
                                                    <FaCopy size={12} />
                                                </button>
                                            </div>
                                        </td>

                                        <td className="py-4 px-3 text-xs">
                                            <p className="font-medium text-gray-800">
                                                {parcel.sender?.region} → {parcel.receiver?.region}
                                            </p>
                                            <p className="text-gray-400">
                                                {parcel.receiver?.name}
                                            </p>
                                        </td>

                                        <td className="py-4 px-3 font-semibold">
                                            ৳{parcel.pricing?.amount}
                                        </td>

                                        <td className="py-4 px-3">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${isPaid
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-red-50 text-red-600"
                                                    }`}
                                            >
                                                {parcel.pricing?.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="py-4 px-3">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] ||
                                                    "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {formatStatus(status)}
                                            </span>
                                        </td>

                                        <td className="py-4 px-3 text-xs">
                                            {hasRider ? (
                                                <div>
                                                    <p className="font-semibold text-[#03373D]">
                                                        {parcel.shipment?.riderId?.name || "Assigned"}
                                                    </p>
                                                    <p className="text-gray-400">
                                                        {parcel.shipment?.riderId?.email || ""}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">Unassigned</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-3 text-right">
                                            {canAssign ? (
                                                <button
                                                    onClick={() => handleAssignRider(parcel)}
                                                    disabled={assigningId === parcel._id}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#CAEB66] px-3 py-1.5 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50] disabled:opacity-50 cursor-pointer"
                                                >
                                                    <FaUserPlus />
                                                    {assigningId === parcel._id
                                                        ? "Assigning..."
                                                        : hasRider
                                                            ? "Reassign"
                                                            : "Assign Rider"}
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredParcels.length === 0 && (
                        <div className="py-12 text-center text-sm text-gray-400">
                            No parcels found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ManageParcels;