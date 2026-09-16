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
            // Show only delivered parcels
            const delivered = (response.data?.data || []).filter(p => p.shipment?.status === "delivered");
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
            html:
                '<input id="swal-rating" type="number" min="1" max="5" class="swal2-input" placeholder="Rating (1-5)">' +
                '<textarea id="swal-feedback" class="swal2-textarea" placeholder="Write your feedback here..."></textarea>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            preConfirm: () => {
                return [
                    document.getElementById("swal-rating").value,
                    document.getElementById("swal-feedback").value
                ];
            }
        });

        if (formValues) {
            const [rating, feedback] = formValues;

            if (!rating || !feedback) {
                toast.error("Both rating and feedback are required!");
                return;
            }

            try {
                await axiosSecure.post("/reviews", {
                    parcelId,
                    rating: Number(rating),
                    feedback
                });
                toast.success("Review submitted successfully!");
            } catch (error) {
                Swal.fire("Error", error.response?.data?.message || "Failed to submit review.", "error");
            }
        }
    };

    if (loading) return <div className="flex min-h-80 justify-center items-center"><span className="loading loading-spinner text-[#8BA63D]" /></div>;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h1 className="text-3xl font-bold text-[#03373D] mb-6">Leave a Review</h1>
            <p className="text-gray-500 mb-8">Share your experience for parcels that have been delivered successfully.</p>

            {parcels.length === 0 ? (
                <p className="text-gray-400">You have no delivered parcels to review yet.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {parcels.map(parcel => (
                        <div key={parcel._id} className="p-5 border rounded-2xl bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-[#03373D]">{parcel.parcel?.name}</p>
                                <p className="text-xs text-gray-500 font-mono mt-1">{parcel.trackingId}</p>
                            </div>
                            <button
                                onClick={() => handleAddReview(parcel._id)}
                                className="bg-[#CAEB66] text-[#03373D] font-bold px-4 py-2 rounded-lg hover:bg-lime-400 transition"
                            >
                                <FaStar className="inline mr-1 mb-1" /> Review
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;