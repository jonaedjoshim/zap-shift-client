import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaClock, FaCircleCheck, FaCircleXmark, FaMotorcycle } from "react-icons/fa6";
import Swal from "sweetalert2";

import warehouse from "../../assets/json/warehouses.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone: "",
            nidNumber: "",
            drivingLicense: "",
            preferredRegion: "",
            vehicleType: "bike",
        },
    });

    const regions = useMemo(() => {
        return [...new Set(warehouse.map((item) => item.region))];
    }, []);

    useEffect(() => {
        let ignore = false;
        const loadMyApplication = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await axiosSecure.get("/riders/my-application");
                if (!ignore) {
                    setApplication(response.data?.data || null);
                }
            } catch (error) {
                console.error("Failed to fetch application:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadMyApplication();
        return () => { ignore = true; };
    }, [user, axiosSecure]);

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const response = await axiosSecure.post("/riders/apply", data);

            Swal.fire({
                icon: "success",
                title: "Application Submitted!",
                text: "Your rider application is now under review by our admin team.",
                confirmButtonColor: "#CAEB66",
            });

            setApplication(response.data?.data);
        } catch (error) {
            console.error("Application error:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.message || "Could not submit application.",
                confirmButtonColor: "#CAEB66",
            });
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

    return (
        <section className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2F8DE] text-2xl text-[#03373D] mb-4">
                    <FaMotorcycle />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#03373D]">Become a ZapShift Rider</h1>
                <p className="mt-3 text-sm md:text-base text-gray-500 max-w-xl mx-auto">
                    Earn up to 80% commission per delivery. Flexible working hours, instant payouts, and full operational support.
                </p>
            </div>

            {/* Application Status Banner if already applied */}
            {application ? (
                <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 text-center">
                    {application.status === "pending" && (
                        <div className="flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl text-amber-600 mb-4">
                                <FaClock />
                            </div>
                            <h2 className="text-2xl font-bold text-[#03373D]">Application Under Review</h2>
                            <p className="mt-2 text-sm text-gray-500 max-w-md">
                                Thank you for applying! Our admin team is reviewing your documents (NID & License). You will be notified once approved.
                            </p>
                            <div className="mt-6 rounded-2xl bg-[#F9FAFB] p-4 text-xs font-mono text-gray-600 space-y-1">
                                <p>Applied Region: {application.preferredRegion}</p>
                                <p>Vehicle: {application.vehicleType.toUpperCase()}</p>
                                <p>Submitted: {new Date(application.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}

                    {application.status === "approved" && (
                        <div className="flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 mb-4">
                                <FaCircleCheck />
                            </div>
                            <h2 className="text-2xl font-bold text-[#03373D]">You Are an Approved Rider!</h2>
                            <p className="mt-2 text-sm text-gray-500 max-w-md">
                                Congratulations! Your rider application has been approved. You can now access your Rider Dashboard to manage assigned deliveries.
                            </p>
                            <a
                                href="/dashboard"
                                className="mt-6 inline-block rounded-xl bg-[#CAEB66] px-6 py-3 text-sm font-bold text-[#03373D] transition hover:bg-[#b9dd50]"
                            >
                                Go to Dashboard
                            </a>
                        </div>
                    )}

                    {application.status === "rejected" && (
                        <div className="flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600 mb-4">
                                <FaCircleXmark />
                            </div>
                            <h2 className="text-2xl font-bold text-[#03373D]">Application Rejected</h2>
                            <p className="mt-2 text-sm text-gray-500 max-w-md">
                                Unfortunately, your application could not be approved at this time. Please contact support for details.
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                /* Form */
                <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl bg-white p-6 shadow-sm md:p-10 border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-[#03373D] border-b border-gray-100 pb-4">Rider Registration Form</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={user?.displayName || "N/A"}
                                disabled
                                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={user?.email || "N/A"}
                                disabled
                                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Contact Number *</label>
                            <input
                                type="tel"
                                placeholder="017XXXXXXXX"
                                {...register("phone", { required: "Contact number is required" })}
                                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:border-[#CAEB66]"
                            />
                            {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Preferred Operating Region *</label>
                            <select
                                {...register("preferredRegion", { required: "Region selection is required" })}
                                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:border-[#CAEB66]"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.preferredRegion && <span className="text-xs text-red-500 mt-1">{errors.preferredRegion.message}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">NID Card Number *</label>
                            <input
                                type="text"
                                placeholder="Enter NID Number"
                                {...register("nidNumber", { required: "NID number is required" })}
                                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:border-[#CAEB66]"
                            />
                            {errors.nidNumber && <span className="text-xs text-red-500 mt-1">{errors.nidNumber.message}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Driving License Number *</label>
                            <input
                                type="text"
                                placeholder="Enter Driving License Number"
                                {...register("drivingLicense", { required: "Driving license is required" })}
                                className="w-full rounded-xl border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm outline-none focus:border-[#CAEB66]"
                            />
                            {errors.drivingLicense && <span className="text-xs text-red-500 mt-1">{errors.drivingLicense.message}</span>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { id: "bike", label: "Motorbike" },
                                    { id: "bicycle", label: "Bicycle" },
                                    { id: "scooter", label: "Scooter" },
                                    { id: "van", label: "Delivery Van" },
                                ].map((type) => (
                                    <label key={type.id} className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-[#F9FAFB] cursor-pointer">
                                        <input
                                            type="radio"
                                            value={type.id}
                                            {...register("vehicleType")}
                                            defaultChecked={type.id === "bike"}
                                            className="radio radio-xs checked:bg-[#CAEB66]"
                                        />
                                        <span className="text-xs font-medium text-gray-700">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-xl bg-[#CAEB66] py-3.5 text-sm font-bold text-[#03373D] transition hover:bg-[#b9dd50] active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Submitting Application..." : "Submit Rider Application"}
                    </button>
                </form>
            )}
        </section>
    );
};

export default BeARider;