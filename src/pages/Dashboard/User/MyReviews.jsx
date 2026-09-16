import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDeliveredParcels = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get("/parcels/my-parcels");
            const delivered = (response.data?.data || []).filter(
                (p) => p.shipment?.status === "delivered"
            );
            setParcels(delivered);
        } catch (error) {
            console.error("Failed to load parcels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeliveredParcels();
    }, [axiosSecure]);

    const handleAddReview = async (parcelId) => {
        const { value: formValues } = await Swal.fire({
            title: "Write a Review",
            html: `
                <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                    <label style="font-size: 12px; font-weight: bold; color: #4b5563;">Rating (1 to 5 Stars):</label>
                    <input id="swal-rating" type="number" min="1" max="5" class="swal2-input" placeholder="e.g. 5" style="margin: 0; width: 100%;">
                    
                    <label style="font-size: 12px; font-weight: bold; color: #4b5563; margin-top: 10px;">Your Feedback:</label>
                    <textarea id="swal-feedback" class="swal2-textarea" placeholder="Write your delivery experience..." style="margin: 0; width: 100%; height: 100px;"></textarea>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Submit Review",
            confirmButtonColor: "#CAEB66",
            preConfirm: () => {
                const rating = document.getElementById("swal-rating").value;
                const feedback = document.getElementById("swal-feedback").value;
                if (!rating || !feedback) {
                    Swal.showValidationMessage("Please provide both rating and feedback!");
                    return false;
                }
                if (Number(rating) < 1 || Number(rating) > 5) {
                    Swal.showValidationMessage("Rating must be between 1 and 5!");
                    return false;
                }
                return { rating: Number(rating), feedback };
            },
        });

        if (formValues) {
            try {
                await axiosSecure.post("/reviews", {
                    parcelId,
                    rating: formValues.rating,
                    feedback: formValues.feedback,
                });

                toast.success("Review submitted successfully!");
            } catch (error) {
                console.error("Review error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: error.response?.data?.message || "Could not submit review.",
                    confirmButtonColor: "#CAEB66",
                });
            }
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
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <div className="border-b border-gray-100 pb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                        Customer Feedback
                    </p>
                    <h1 className="mt-1 text-3xl font-bold text-[#03373D]">
                        Leave a Review
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Share your delivery experience for parcels that have been delivered successfully.
                    </p>
                </div>

                {parcels.length === 0 ? (
                    <div className="py-16 text-center text-sm text-gray-400">
                        You have no delivered parcels eligible for review yet.
                    </div>
                ) : (
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {parcels.map((parcel) => (
                            <div
                                key={parcel._id}
                                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5"
                            >
                                <div>
                                    <h3 className="font-bold text-[#03373D]">
                                        {parcel.parcel?.name}
                                    </h3>
                                    <p className="mt-1 font-mono text-xs text-gray-400">
                                        {parcel.trackingId}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleAddReview(parcel._id)}
                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#CAEB66] px-4 py-2.5 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50] active:scale-95"
                                >
                                    <FaStar /> Write Review
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyReviews;