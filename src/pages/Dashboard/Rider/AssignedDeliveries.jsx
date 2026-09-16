import { useEffect, useState } from "react";
import { FaBoxesPacking, FaCopy, FaPhone, FaLocationDot, FaPenToSquare } from "react-icons/fa6";
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
    return status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const AssignedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const loadDeliveries = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get("/riders/my-deliveries");
            setDeliveries(response.data?.data || []);
        } catch (error) {
            console.error("Error loading deliveries:", error);
            toast.error("Failed to load assigned deliveries.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeliveries();
    }, [axiosSecure]);

    const handleCopy = async (txt) => {
        try {
            await navigator.clipboard.writeText(txt);
            toast.success("Tracking ID copied.");
        } catch {
            toast.error("Copy failed.");
        }
    };

    const handleStatusUpdate = async (parcel) => {
        const currentStatus = parcel.shipment?.status || "pending";

        if (currentStatus === "delivered") {
            toast.error("Delivered parcels cannot be updated.");
            return;
        }

        const inputOptions = {
            "in-transit": "In Transit (On the way to hub)",
            "at-warehouse": "At Warehouse (Received at local hub)",
            "out-for-delivery": "Out for Delivery (Rider is nearby)",
            "delivered": "Delivered (Handed to receiver)",
            "cancelled": "Cancelled (Delivery failed)",
        };

        const { value: selectedStatus } = await Swal.fire({
            title: "Update Delivery Status",
            text: `Parcel: ${parcel.trackingId}`,
            input: "select",
            inputOptions,
            inputValue: currentStatus,
            showCancelButton: true,
            confirmButtonText: "Update Status",
            confirmButtonColor: "#CAEB66",
        });

        if (!selectedStatus || selectedStatus === currentStatus) return;

        let otpInput = null;

        // 🔥 OTP PROMPT IF DELIVERED IS SELECTED 🔥
        if (selectedStatus === "delivered") {
            const { value: otp } = await Swal.fire({
                title: "Enter Delivery OTP",
                text: "Ask the receiver for the 6-digit delivery OTP to confirm the handover.",
                input: "text",
                inputPlaceholder: "123456",
                showCancelButton: true,
                confirmButtonColor: "#CAEB66",
                inputValidator: (value) => {
                    if (!value || value.length !== 6) return "Please enter a valid 6-digit OTP";
                }
            });

            if (!otp) return; // Rider cancelled the OTP prompt
            otpInput = otp;
        }

        try {
            setUpdatingId(parcel._id);

            // Sending status (and otp if delivered) to backend
            await axiosSecure.patch(`/riders/deliveries/${parcel._id}/status`, {
                status: selectedStatus,
                otp: otpInput,
            });

            toast.success(`Status updated to ${formatStatus(selectedStatus)}`);
            await loadDeliveries();
        } catch (error) {
            console.error("Status update error:", error);
            Swal.fire("Update Failed", error.response?.data?.message || "Could not update status.", "error");
        } finally {
            setUpdatingId(null);
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
                        <p className="mt-2 text-sm text-gray-500">Update parcel delivery progress and manage assigned tasks.</p>
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
                            const isDelivered = status === "delivered";

                            return (
                                <article key={parcel._id} className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-6 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-[#03373D] text-lg">{parcel.parcel?.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono text-xs text-gray-500">{parcel.trackingId}</span>
                                                <button onClick={() => handleCopy(parcel.trackingId)} className="text-gray-400 hover:text-[#8BA63D] cursor-pointer">
                                                    <FaCopy size={12} />
                                                </button>
                                            </div>
                                        </div>

                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
                                            {formatStatus(status)}
                                        </span>
                                    </div>

                                    {/* Pickup Info */}
                                    <div className="rounded-xl bg-white p-4 border border-gray-100 text-xs space-y-1.5">
                                        <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Pickup From (Sender)</p>
                                        <p className="font-semibold text-gray-800">{parcel.sender?.name}</p>
                                        <p className="text-gray-500 flex items-center gap-1"><FaPhone size={10} /> {parcel.sender?.contact}</p>
                                        <p className="text-gray-500 flex items-start gap-1"><FaLocationDot size={10} className="mt-0.5 shrink-0" /> {parcel.sender?.address}, {parcel.sender?.region}</p>
                                    </div>

                                    {/* Dropoff Info */}
                                    <div className="rounded-xl bg-white p-4 border border-gray-100 text-xs space-y-1.5">
                                        <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Deliver To (Receiver)</p>
                                        <p className="font-semibold text-gray-800">{parcel.receiver?.name}</p>
                                        <p className="text-gray-500 flex items-center gap-1"><FaPhone size={10} /> {parcel.receiver?.contact}</p>
                                        <p className="text-gray-500 flex items-start gap-1"><FaLocationDot size={10} className="mt-0.5 shrink-0" /> {parcel.receiver?.address}, {parcel.receiver?.region}</p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-2">
                                        {!isDelivered ? (
                                            <button
                                                onClick={() => handleStatusUpdate(parcel)}
                                                disabled={updatingId === parcel._id}
                                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#CAEB66] py-3 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50] active:scale-95 disabled:opacity-50 cursor-pointer"
                                            >
                                                <FaPenToSquare />
                                                {updatingId === parcel._id ? "Updating Status..." : "Update Delivery Status"}
                                            </button>
                                        ) : (
                                            <div className="rounded-xl bg-green-50 py-2.5 text-center text-xs font-bold text-green-700 border border-green-200">
                                                ✓ Delivery Completed
                                            </div>
                                        )}
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