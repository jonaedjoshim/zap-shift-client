import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import warehouse from "../../assets/json/warehouses.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { calculateParcelCost } from "../../utils/calculateParcelCost";

const SendParcel = () => {
    const [parcelType, setParcelType] =
        useState("document");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            senderName:
                user?.displayName || "",
            senderContact: "",
            senderAddress: "",
            senderRegion: "",
            senderWarehouse: "",

            receiverName: "",
            receiverContact: "",
            receiverAddress: "",
            receiverRegion: "",
            receiverWarehouse: "",

            parcelName: "",
            parcelWeight: "",

            pickupInstruction: "",
            deliveryInstruction: "",
        },
    });

    const senderRegion =
        watch("senderRegion");

    const receiverRegion =
        watch("receiverRegion");

    const regions = useMemo(() => {
        return [
            ...new Set(
                warehouse.map(
                    (item) => item.region
                )
            ),
        ];
    }, []);

    const senderAreas = useMemo(() => {
        if (!senderRegion) {
            return [];
        }

        return warehouse
            .filter(
                (item) =>
                    item.region ===
                    senderRegion &&
                    item.status === "active"
            )
            .flatMap(
                (item) =>
                    item.covered_area
            );
    }, [senderRegion]);

    const receiverAreas = useMemo(() => {
        if (!receiverRegion) {
            return [];
        }

        return warehouse
            .filter(
                (item) =>
                    item.region ===
                    receiverRegion &&
                    item.status === "active"
            )
            .flatMap(
                (item) =>
                    item.covered_area
            );
    }, [receiverRegion]);

    const handleParcelTypeChange = (
        type
    ) => {
        setParcelType(type);

        if (type === "document") {
            setValue(
                "parcelWeight",
                ""
            );
        }
    };

    const resetParcelForm = () => {
        reset({
            senderName:
                user?.displayName || "",
            senderContact: "",
            senderAddress: "",
            senderRegion: "",
            senderWarehouse: "",

            receiverName: "",
            receiverContact: "",
            receiverAddress: "",
            receiverRegion: "",
            receiverWarehouse: "",

            parcelName: "",
            parcelWeight: "",

            pickupInstruction: "",
            deliveryInstruction: "",
        });

        setParcelType("document");
    };

    const handleConfirmBooking = async (
        data
    ) => {
        const estimatedCost =
            calculateParcelCost({
                parcelType,
                weight:
                    data.parcelWeight,
                senderRegion:
                    data.senderRegion,
                receiverRegion:
                    data.receiverRegion,
            });

        if (estimatedCost === null) {
            await Swal.fire({
                icon: "error",
                title: "Unable to Calculate Cost",
                text: "Please check the parcel information and try again.",
                confirmButtonColor:
                    "#C6E871",
            });

            return;
        }

        const confirmation =
            await Swal.fire({
                title:
                    "Confirm Parcel Booking?",
                html: `
                    <p>Your estimated delivery charge is</p>
                    <strong style="font-size: 24px;">৳${estimatedCost}</strong>
                `,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor:
                    "#C6E871",
                cancelButtonColor:
                    "#d33",
                confirmButtonText:
                    "Confirm Booking",
            });

        if (!confirmation.isConfirmed) {
            return;
        }

        const parcelData = {
            ...data,

            parcelType,

            parcelWeight:
                parcelType ===
                    "document"
                    ? null
                    : Number(
                        data.parcelWeight
                    ),
        };

        try {
            setIsSubmitting(true);

            const response =
                await axiosSecure.post(
                    "/parcels",
                    parcelData
                );

            const createdParcel =
                response.data?.data;

            // 🔥 UPDATED SUCCESS POPUP WITH OTP 🔥
            await Swal.fire({
                icon: "success",
                title:
                    "Parcel Booked Successfully!",
                html: `
                    <p>Your tracking ID is</p>
                    <strong style="
                        display: inline-block;
                        margin-top: 8px;
                        font-size: 18px;
                        color: #03373D;
                    ">
                        ${createdParcel.trackingId}
                    </strong>
                    <p style="
                        margin-top: 12px;
                        color: #6b7280;
                    ">
                        Delivery charge: ৳${createdParcel.cost}
                    </p>

                    <div style="
                        margin-top: 15px; 
                        padding: 10px; 
                        background-color: #fef3c7; 
                        border: 1px dashed #d97706; 
                        border-radius: 8px;
                    ">
                        <p style="
                            font-size: 12px; 
                            color: #b45309; 
                            margin-bottom: 5px;
                        ">
                            <strong>DELIVERY OTP (SHARE WITH RECEIVER)</strong>
                        </p>
                        <h2 style="
                            font-size: 24px; 
                            font-family: monospace; 
                            letter-spacing: 4px; 
                            color: #92400e; 
                            margin: 0;
                        ">
                            ${createdParcel.deliveryOTP}
                        </h2>
                    </div>
                `,
                confirmButtonColor:
                    "#C6E871",
                confirmButtonText:
                    "Done",
            });

            resetParcelForm();
        } catch (error) {
            console.error(
                "Parcel booking failed:",
                error
            );

            const message =
                error.response?.data
                    ?.message ||
                "Unable to create your parcel. Please try again.";

            await Swal.fire({
                icon: "error",
                title:
                    "Booking Failed",
                text: message,
                confirmButtonColor:
                    "#C6E871",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = (data) => {
        handleConfirmBooking(data);
    };

    const InputSection = ({
        label,
        name,
        type = "text",
        required = true,
    }) => (
        <div className="form-control flex flex-col">
            <label
                htmlFor={name}
                className="label py-0.5"
            >
                <span className="text-xs font-medium text-gray-500">
                    {label}
                </span>
            </label>

            <input
                id={name}
                type={type}
                step={
                    type === "number"
                        ? "0.1"
                        : undefined
                }
                min={
                    type === "number"
                        ? "0.1"
                        : undefined
                }
                {...register(name, {
                    required: required
                        ? `${label} is required`
                        : false,

                    ...(type ===
                        "number" &&
                        required
                        ? {
                            min: {
                                value: 0.1,
                                message:
                                    "Weight must be greater than 0",
                            },
                        }
                        : {}),
                })}
                placeholder={label}
                className="input input-bordered h-11 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none focus:ring-1 focus:ring-[#C6E871]"
            />

            {errors[name] && (
                <span className="mt-1 text-xs text-red-500">
                    {
                        errors[name]
                            .message
                    }
                </span>
            )}
        </div>
    );

    const SelectSection = ({
        label,
        name,
        options,
    }) => (
        <div className="form-control flex w-full flex-col">
            <label
                htmlFor={name}
                className="label py-0.5"
            >
                <span className="text-xs font-medium text-gray-500">
                    {label}
                </span>
            </label>

            <select
                id={name}
                {...register(name, {
                    required: `${label} is required`,
                })}
                className="select select-bordered h-11 min-h-11 w-full border-gray-200 bg-[#F9FAFB] font-normal focus:border-[#C6E871] focus:outline-none focus:ring-1 focus:ring-[#C6E871]"
            >
                <option value="">
                    Select {label}
                </option>

                {options.map(
                    (option) => (
                        <option
                            key={
                                option
                            }
                            value={
                                option
                            }
                        >
                            {option}
                        </option>
                    )
                )}
            </select>

            {errors[name] && (
                <span className="mt-1 text-xs text-red-500">
                    {
                        errors[name]
                            .message
                    }
                </span>
            )}
        </div>
    );

    const TextareaSection = ({
        label,
        name,
    }) => (
        <div className="form-control flex w-full flex-col">
            <label
                htmlFor={name}
                className="label py-0.5"
            >
                <span className="text-xs font-medium text-gray-500">
                    {label}
                </span>
            </label>

            <textarea
                id={name}
                {...register(name, {
                    required: `${label} is required`,
                })}
                placeholder={label}
                className="textarea textarea-bordered h-24 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none focus:ring-1 focus:ring-[#C6E871]"
            />

            {errors[name] && (
                <span className="mt-1 text-xs text-red-500">
                    {
                        errors[name]
                            .message
                    }
                </span>
            )}
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="w-full overflow-visible rounded-3xl border border-gray-100 bg-white p-6 font-sans shadow-sm md:p-10"
        >
            <h1 className="mb-3 text-2xl font-bold text-[#1D3531] md:text-3xl">
                Send Parcel
            </h1>

            <div className="space-y-4 md:space-y-5">
                <h2 className="text-base font-semibold text-[#1D3531] md:text-lg">
                    Enter your parcel
                    details
                </h2>

                <div className="flex flex-row items-center gap-8 sm:gap-12">
                    {[
                        "document",
                        "non-document",
                    ].map((type) => (
                        <label
                            key={type}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <input
                                type="radio"
                                name="parcelType"
                                value={
                                    type
                                }
                                checked={
                                    parcelType ===
                                    type
                                }
                                onChange={() =>
                                    handleParcelTypeChange(
                                        type
                                    )
                                }
                                className="radio radio-sm border-[1.5px] checked:border-[#C6E871] [--chkbg:#C6E871] [--chkfg:white]"
                            />

                            <span className="text-sm font-medium text-gray-700 md:text-[15px]">
                                {type ===
                                    "document"
                                    ? "Document"
                                    : "Non-Document"}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-8 mt-6 grid grid-cols-1 gap-5 md:mb-10 md:mt-7 md:grid-cols-2 md:gap-8">
                <InputSection
                    label="Parcel Name"
                    name="parcelName"
                />

                <InputSection
                    label="Parcel Weight (KG)"
                    name="parcelWeight"
                    type="number"
                    required={
                        parcelType ===
                        "non-document"
                    }
                />
            </div>

            <div className="grid grid-cols-1 gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16">

                {/* Sender */}
                <div className="flex flex-col gap-5 md:gap-6">
                    <h3 className="text-base font-semibold text-[#1D3531] md:text-lg">
                        Sender Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                        <InputSection
                            label="Sender Name"
                            name="senderName"
                        />

                        <SelectSection
                            label="Your Region"
                            name="senderRegion"
                            options={
                                regions
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                        <InputSection
                            label="Address"
                            name="senderAddress"
                        />

                        <InputSection
                            label="Sender Contact No"
                            name="senderContact"
                            type="tel"
                        />
                    </div>

                    <SelectSection
                        label="Sender Pickup Warehouse"
                        name="senderWarehouse"
                        options={
                            senderAreas
                        }
                    />

                    <TextareaSection
                        label="Pickup Instruction"
                        name="pickupInstruction"
                    />
                </div>

                {/* Receiver */}
                <div className="flex flex-col gap-5 md:gap-6">
                    <h3 className="text-base font-semibold text-[#1D3531] md:text-lg">
                        Receiver Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                        <InputSection
                            label="Receiver Name"
                            name="receiverName"
                        />

                        <SelectSection
                            label="Receiver Region"
                            name="receiverRegion"
                            options={
                                regions
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                        <InputSection
                            label="Receiver Address"
                            name="receiverAddress"
                        />

                        <InputSection
                            label="Receiver Contact No"
                            name="receiverContact"
                            type="tel"
                        />
                    </div>

                    <SelectSection
                        label="Receiver Delivery Warehouse"
                        name="receiverWarehouse"
                        options={
                            receiverAreas
                        }
                    />

                    <TextareaSection
                        label="Delivery Instruction"
                        name="deliveryInstruction"
                    />
                </div>
            </div>

            <div className="mt-10 md:mt-12">
                <p className="mb-5 text-sm text-gray-500 md:mb-6">
                    * PickUp Time
                    4pm-7pm Approx.
                </p>

                <button
                    type="submit"
                    disabled={
                        isSubmitting
                    }
                    className="w-full rounded-xl bg-[#C6E871] px-8 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:bg-[#b4d65a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto md:px-10"
                >
                    {isSubmitting
                        ? "Creating Parcel..."
                        : "Proceed to Confirm Booking"}
                </button>
            </div>
        </form>
    );
};

export default SendParcel;