import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import 'aos/dist/aos.css';
import warehouse from '../../assets/json/warehouses.json';

const SendParcel = () => {
    const [parcelType, setParcelType] = useState('document');
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');
    const parcelWeight = watch('parcelWeight');

    const regions = useMemo(() => [...new Set(warehouse.map((w) => w.region))], []);
    const senderAreas = useMemo(() =>
        warehouse.filter((w) => w.region === senderRegion).flatMap((w) => w.covered_area), [senderRegion]
    );
    const receiverAreas = useMemo(() =>
        warehouse.filter((w) => w.region === receiverRegion).flatMap((w) => w.covered_area), [receiverRegion]
    );

    const calculateAmount = () => {
        const ratePerKg = parcelType === 'document' ? 50 : 80;
        const weight = parseFloat(parcelWeight);
        return isNaN(weight) ? 0 : weight * ratePerKg;
    };

    const handlePayment = (onSuccess, onCancel) => {
        const amount = calculateAmount();
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span>Confirm payment: {amount} TK</span>
                <div className="flex gap-2 justify-end mt-1">
                    <button onClick={() => { toast.dismiss(t.id); onSuccess(); }} className="px-3 py-1 bg-[#C6E871] text-white rounded">Confirm</button>
                    <button onClick={() => { toast.dismiss(t.id); onCancel(); }} className="px-3 py-1 bg-red-400 text-white rounded">Cancel</button>
                </div>
            </div>
        ));
    };

    const onSubmit = (data) => {
        handlePayment(
            () => { toast.success('Booking Confirmed!'); reset(); },
            () => { toast.error('Booking Cancelled!'); }
        );
    };

    const InputSection = ({ label, name }) => (
        <div className="form-control flex flex-col">
            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">{label}</span></label>
            <input
                {...register(name, { required: true })}
                placeholder={label}
                className="input input-bordered w-full h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:ring-1 focus:ring-[#C6E871] focus:outline-none"
            />
            {errors[name] && <span className="text-xs text-red-500">Required</span>}
        </div>
    );

    const SelectSection = ({ label, name, options }) => (
        <div className="form-control flex flex-col w-full">
            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">{label}</span></label>
            <select
                {...register(name, { required: true })}
                className="select select-bordered w-full h-11 min-h-11 bg-[#F9FAFB] border-gray-200 focus:border-[#C6E871] focus:ring-1 focus:ring-[#C6E871] focus:outline-none font-normal"
            >
                <option value="">Select {label}</option>
                {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
            </select>
            {errors[name] && <span className="text-xs text-red-500">Required</span>}
        </div>
    );

    const TextareaSection = ({ label, name }) => (
        <div className="form-control flex flex-col w-full">
            <label className="label py-0.5"><span className="text-xs font-medium text-gray-500">{label}</span></label>
            <textarea
                {...register(name, { required: true })}
                placeholder={label}
                className="textarea textarea-bordered bg-[#F9FAFB] h-24 w-full border-gray-200 focus:border-[#C6E871] focus:ring-1 focus:ring-[#C6E871] focus:outline-none"
            />
            {errors[name] && <span className="text-xs text-red-500">Required</span>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100 font-sans overflow-visible">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1D3531] mb-3" data-aos="fade-down">Send Parcel</h1>
            <hr className="border-gray-200 mb-6 md:mb-7" data-aos="fade-in" />

            <div className="space-y-4 md:space-y-5" data-aos="fade-up">
                <h2 className="text-base md:text-lg font-semibold text-[#1D3531]">Enter your parcel details</h2>
                <div className="flex flex-row items-center gap-8 sm:gap-12">
                    {['document', 'non-document'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                checked={parcelType === type}
                                onChange={() => setParcelType(type)}
                                className="radio radio-sm border-[1.5px] checked:border-[#C6E871] [--chkbg:#C6E871] [--chkfg:white]"
                                style={{ color: '#C6E871' }}
                            />
                            <span className="text-sm md:text-[15px] font-medium text-gray-700">{type === 'document' ? 'Document' : 'Not-Document'}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-6 md:mt-7 mb-8 md:mb-10" data-aos="fade-up" data-aos-delay="100">
                <InputSection label="Parcel Name" name="parcelName" />
                <InputSection label="Parcel Weight (KG)" name="parcelWeight" />
            </div>

            <hr className="border-gray-200 mb-8 md:mb-10" data-aos="fade-in" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
                <div className="flex flex-col gap-5 md:gap-6" data-aos="fade-right" data-aos-delay="200">
                    <h3 className="text-base md:text-lg font-semibold text-[#1D3531]">Sender Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <InputSection label="Sender Name" name="senderName" />
                        <SelectSection label="Your Region" name="senderRegion" options={regions} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <InputSection label="Address" name="senderAddress" />
                        <InputSection label="Sender Contact No" name="senderContact" />
                    </div>
                    <SelectSection label="Sender Pickup Warehouse" name="senderWarehouse" options={senderAreas} />
                    <TextareaSection label="Pickup Instruction" name="pickupInstruction" />
                </div>

                <div className="flex flex-col gap-5 md:gap-6" data-aos="fade-left" data-aos-delay="200">
                    <h3 className="text-base md:text-lg font-semibold text-[#1D3531]">Receiver Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <InputSection label="Receiver Name" name="receiverName" />
                        <SelectSection label="Receiver Region" name="receiverRegion" options={regions} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                        <InputSection label="Receiver Address" name="receiverAddress" />
                        <InputSection label="Receiver Contact No" name="receiverContact" />
                    </div>
                    <SelectSection label="Receiver Delivery Warehouse" name="receiverWarehouse" options={receiverAreas} />
                    <TextareaSection label="Delivery Instruction" name="deliveryInstruction" />
                </div>
            </div>

            <div className="mt-10 md:mt-12" data-aos="zoom-in">
                <p className="text-sm text-gray-500 mb-5 md:mb-6">* PickUp Time 4pm-7pm Approx.</p>
                <button type="submit" className="w-full sm:w-auto bg-[#C6E871] hover:bg-[#b4d65a] transition-all px-8 md:px-10 py-3 rounded-xl text-sm font-bold text-gray-800 shadow-sm active:scale-95">Proceed to Confirm Booking</button>
            </div>
        </form>
    );
};

export default SendParcel;