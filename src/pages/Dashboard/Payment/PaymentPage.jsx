import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCreditCard, FaMobileScreenButton, FaShieldHalved } from "react-icons/fa6";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentPage = () => {
    const { parcelId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");

    useEffect(() => {
        let ignore = false;
        const loadParcelDetails = async () => {
            try {
                setLoading(true);
                // Fetch user parcels and find this specific parcel
                const response = await axiosSecure.get("/parcels/my-parcels");
                const found = (response.data?.data || []).find((p) => p._id === parcelId);

                if (!ignore) {
                    if (!found) {
                        Swal.fire("Not Found", "Parcel details not found.", "error");
                        navigate("/dashboard/my-parcels");
                    } else if (found.pricing?.paymentStatus === "paid") {
                        Swal.fire("Already Paid", "This parcel has already been paid.", "info");
                        navigate("/dashboard/my-parcels");
                    } else {
                        setParcel(found);
                    }
                }
            } catch (error) {
                console.error("Error loading parcel for payment:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadParcelDetails();
        return () => {
            ignore = true;
        };
    }, [parcelId, axiosSecure, navigate]);

    const handlePayNow = async (e) => {
        e.preventDefault();

        const confirm = await Swal.fire({
            title: "Confirm Payment?",
            html: `You are paying <strong style="font-size: 20px; color: #03373D;">৳${parcel.pricing.amount}</strong> via <span style="text-transform: uppercase; font-weight: bold;">${paymentMethod}</span>`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            confirmButtonText: "Yes, Pay Now",
            cancelButtonColor: "#d33",
        });

        if (!confirm.isConfirmed) return;

        try {
            setSubmitting(true);
            const response = await axiosSecure.post("/payments/process", {
                parcelId: parcel._id,
                paymentMethod,
            });

            const paymentData = response.data?.data?.payment;

            await Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                html: `
                    <p>Transaction ID:</p>
                    <strong style="font-family: monospace; font-size: 16px; color: #03373D;">${paymentData.transactionId}</strong>
                    <p style="margin-top: 8px; color: #6b7280;">Amount Paid: ৳${paymentData.amount}</p>
                `,
                confirmButtonColor: "#CAEB66",
            });

            navigate("/dashboard/my-parcels");
        } catch (error) {
            console.error("Payment failed:", error);
            Swal.fire("Payment Failed", error.response?.data?.message || "Could not process payment.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <span className="loading loading-ring loading-lg text-[#8BA63D]" />
            </div>
        );
    }

    if (!parcel) return null;

    return (
        <section className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10 border border-gray-100">
                <div className="border-b border-gray-100 pb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">Checkout</p>
                    <h1 className="mt-1 text-2xl font-bold text-[#03373D] md:text-3xl">Parcel Payment</h1>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="rounded-2xl bg-[#F9FAFB] p-6 border border-gray-100">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Parcel Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Parcel Name:</span>
                                <span className="font-semibold text-[#03373D]">{parcel.parcel?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tracking ID:</span>
                                <span className="font-mono text-xs text-gray-700">{parcel.trackingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Receiver:</span>
                                <span className="font-medium text-gray-700">{parcel.receiver?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Destination:</span>
                                <span className="font-medium text-gray-700">{parcel.receiver?.region}</span>
                            </div>

                            <div className="border-t border-gray-200 pt-3 mt-4 flex justify-between items-center">
                                <span className="font-bold text-gray-700">Total Payable:</span>
                                <span className="text-3xl font-extrabold text-[#03373D]">৳{parcel.pricing?.amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selector */}
                    <form onSubmit={handlePayNow} className="flex flex-col justify-between space-y-6">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Select Payment Method</h3>

                            <div className="space-y-3">
                                {[
                                    { id: "card", label: "Credit / Debit Card", icon: FaCreditCard },
                                    { id: "bkash", label: "bKash Mobile Banking", icon: FaMobileScreenButton },
                                    { id: "nagad", label: "Nagad Mobile Banking", icon: FaMobileScreenButton },
                                ].map((method) => {
                                    const Icon = method.icon;
                                    const isSelected = paymentMethod === method.id;
                                    return (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${isSelected ? "border-[#CAEB66] bg-[#F8FDEB]" : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={isSelected}
                                                onChange={() => setPaymentMethod(method.id)}
                                                className="radio radio-sm checked:bg-[#CAEB66]"
                                            />
                                            <Icon className={`text-xl ${isSelected ? "text-[#03373D]" : "text-gray-400"}`} />
                                            <span className="text-sm font-medium text-gray-800">{method.label}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                <FaShieldHalved className="text-green-500" />
                                <span>Encrypted & Secured Payment Gateway</span>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full rounded-xl bg-[#CAEB66] py-3.5 text-sm font-bold text-[#03373D] shadow-sm transition hover:bg-[#b9dd50] active:scale-95 disabled:opacity-50 cursor-pointer"
                            >
                                {submitting ? "Processing..." : `Pay ৳${parcel.pricing?.amount}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PaymentPage;