import { useMemo, useState } from "react";

import warehouse from "../../assets/json/warehouses.json";
import { calculateParcelCost } from "../../utils/calculateParcelCost";

const Pricing = () => {
    const [parcelType, setParcelType] = useState("");
    const [senderRegion, setSenderRegion] = useState("");
    const [receiverRegion, setReceiverRegion] = useState("");
    const [weight, setWeight] = useState("");
    const [cost, setCost] = useState(null);

    const regions = useMemo(() => {
        return [
            ...new Set(
                warehouse.map((item) => item.region)
            ),
        ];
    }, []);

    const handleCalculate = (event) => {
        event.preventDefault();

        const result = calculateParcelCost({
            parcelType,
            weight,
            senderRegion,
            receiverRegion,
        });

        setCost(result);
    };

    const handleReset = () => {
        setParcelType("");
        setSenderRegion("");
        setReceiverRegion("");
        setWeight("");
        setCost(null);
    };

    const handleParcelTypeChange = (event) => {
        const value = event.target.value;

        setParcelType(value);
        setCost(null);

        if (value === "document") {
            setWeight("");
        }
    };

    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10 lg:p-16">

            {/* Page Heading */}
            <div>
                <h1 className="text-3xl font-bold text-[#03373D] md:text-4xl">
                    Pricing Calculator
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                    Check our delivery charges and calculate
                    the estimated cost of sending your parcel.
                </p>
            </div>

            {/* Pricing Rules */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-[#03373D] md:text-2xl">
                    Delivery Pricing
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Our delivery charge depends on the parcel
                    type, weight, and delivery destination.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                    {/* Document */}
                    <div className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h3 className="font-bold text-[#03373D]">
                                Document
                            </h3>

                            <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-[#65782C]">
                                Any Weight
                            </span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Within City
                                </span>

                                <span className="font-bold text-gray-900">
                                    ৳60
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Outside City
                                </span>

                                <span className="font-bold text-gray-900">
                                    ৳80
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Non Document <= 3kg */}
                    <div className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h3 className="font-bold text-[#03373D]">
                                Non-Document
                            </h3>

                            <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-[#65782C]">
                                Up to 3 KG
                            </span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Within City
                                </span>

                                <span className="font-bold text-gray-900">
                                    ৳110
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">
                                    Outside City
                                </span>

                                <span className="font-bold text-gray-900">
                                    ৳150
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Non Document > 3kg */}
                    <div className="rounded-2xl border border-[#C6E871] bg-[#F8FDEB] p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h3 className="font-bold text-[#03373D]">
                                Non-Document
                            </h3>

                            <span className="rounded-full bg-[#C6E871] px-3 py-1 text-xs font-semibold text-[#34400F]">
                                Above 3 KG
                            </span>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500">
                                    Additional Weight
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    + ৳40 / KG
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Outside City
                                </p>

                                <p className="mt-1 font-bold text-gray-900">
                                    + ৳40 Extra
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-5 text-xs leading-5 text-gray-400">
                    * The calculator provides an estimated
                    delivery charge. Final pricing may depend
                    on the service area and delivery zone.
                </p>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-gray-200 md:my-12" />

            {/* Calculator */}
            <div>
                <h2 className="mb-8 text-center text-xl font-bold text-[#03373D] md:text-2xl">
                    Calculate Your Cost
                </h2>

                <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-16">

                    {/* Form */}
                    <form
                        onSubmit={handleCalculate}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="parcelType"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Parcel Type
                            </label>

                            <select
                                id="parcelType"
                                value={parcelType}
                                onChange={handleParcelTypeChange}
                                required
                                className="select select-bordered h-11 min-h-11 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none"
                            >
                                <option value="">
                                    Select Parcel Type
                                </option>

                                <option value="document">
                                    Document
                                </option>

                                <option value="non-document">
                                    Non-Document
                                </option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="senderRegion"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Sender Region
                            </label>

                            <select
                                id="senderRegion"
                                value={senderRegion}
                                onChange={(event) => {
                                    setSenderRegion(
                                        event.target.value
                                    );
                                    setCost(null);
                                }}
                                required
                                className="select select-bordered h-11 min-h-11 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none"
                            >
                                <option value="">
                                    Select Sender Region
                                </option>

                                {regions.map((region) => (
                                    <option
                                        key={region}
                                        value={region}
                                    >
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="receiverRegion"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Delivery Destination
                            </label>

                            <select
                                id="receiverRegion"
                                value={receiverRegion}
                                onChange={(event) => {
                                    setReceiverRegion(
                                        event.target.value
                                    );
                                    setCost(null);
                                }}
                                required
                                className="select select-bordered h-11 min-h-11 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none"
                            >
                                <option value="">
                                    Select Delivery Destination
                                </option>

                                {regions.map((region) => (
                                    <option
                                        key={region}
                                        value={region}
                                    >
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {parcelType === "non-document" && (
                            <div>
                                <label
                                    htmlFor="weight"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Weight (KG)
                                </label>

                                <input
                                    id="weight"
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    value={weight}
                                    onChange={(event) => {
                                        setWeight(
                                            event.target.value
                                        );
                                        setCost(null);
                                    }}
                                    placeholder="Enter parcel weight"
                                    required
                                    className="input input-bordered h-11 w-full border-gray-200 bg-[#F9FAFB] focus:border-[#C6E871] focus:outline-none"
                                />
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="rounded-lg border border-[#A5BF51] px-6 py-2.5 text-sm font-medium text-[#65782C] transition hover:bg-lime-50"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className="grow rounded-lg bg-[#C6E871] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#b4d65a]"
                            >
                                Calculate
                            </button>
                        </div>
                    </form>

                    {/* Result */}
                    <div className="flex min-h-48 items-center justify-center rounded-2xl bg-[#F9FAFB] p-6 md:bg-transparent">
                        {cost !== null ? (
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-500">
                                    Estimated Cost
                                </p>

                                <p className="mt-2 text-5xl font-extrabold text-black md:text-6xl">
                                    ৳{cost}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-4xl font-extrabold text-gray-200 md:text-5xl">
                                    ৳--
                                </p>

                                <p className="mt-3 text-sm text-gray-400">
                                    Fill in the details to calculate
                                    the delivery cost.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;