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
                warehouse.map(
                    (item) => item.region
                )
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
            {/* Heading */}
            <div className="border-b border-gray-200 pb-8">
                <h1 className="text-3xl font-bold text-[#03373D] md:text-4xl">
                    Pricing Calculator
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                    Calculate your estimated parcel delivery
                    charge based on parcel type, weight, and
                    delivery location.
                </p>
            </div>

            <div className="py-10 md:py-14">
                <h2 className="mb-8 text-center text-xl font-bold text-[#03373D] md:text-2xl">
                    Calculate Your Cost
                </h2>

                <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-16">
                    {/* Calculator Form */}
                    <form
                        onSubmit={handleCalculate}
                        className="space-y-5"
                    >
                        {/* Parcel Type */}
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
                                onChange={
                                    handleParcelTypeChange
                                }
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

                        {/* Sender Region */}
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

                        {/* Receiver Region */}
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

                        {/* Weight */}
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

                        {/* Buttons */}
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

                    {/* Cost Result */}
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