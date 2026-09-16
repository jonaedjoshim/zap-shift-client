import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign, FaCircleCheck, FaClock, FaTruckFast } from "react-icons/fa6";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RiderEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        const loadStats = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/riders/stats");
                if (!ignore) {
                    setStats(response.data?.data || null);
                }
            } catch (error) {
                console.error("Error loading rider stats:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadStats();
        return () => { ignore = true; };
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <span className="loading loading-ring loading-lg text-[#8BA63D]" />
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <div className="border-b border-gray-100 pb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">Income Overview</p>
                    <h1 className="mt-1 text-3xl font-bold text-[#03373D]">Rider Earnings</h1>
                    <p className="mt-2 text-sm text-gray-500">Track your completed deliveries and total commission earned.</p>
                </div>

                {/* Summary Cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="rounded-2xl bg-[#F8FDEB] p-5 border border-[#CAEB66]">
                        <div className="flex items-center justify-between text-[#03373D] mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Earnings</span>
                            <FaBangladeshiTakaSign className="text-xl text-[#8BA63D]" />
                        </div>
                        <p className="text-3xl font-extrabold text-[#03373D]">৳{stats?.totalEarnings || 0}</p>
                    </div>

                    <div className="rounded-2xl bg-[#F9FAFB] p-5 border border-gray-100">
                        <div className="flex items-center justify-between text-[#03373D] mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Completed</span>
                            <FaCircleCheck className="text-xl text-green-500" />
                        </div>
                        <p className="text-3xl font-extrabold text-gray-800">{stats?.totalDelivered || 0}</p>
                    </div>

                    <div className="rounded-2xl bg-[#F9FAFB] p-5 border border-gray-100">
                        <div className="flex items-center justify-between text-[#03373D] mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending</span>
                            <FaClock className="text-xl text-amber-500" />
                        </div>
                        <p className="text-3xl font-extrabold text-gray-800">{stats?.totalPending || 0}</p>
                    </div>

                    <div className="rounded-2xl bg-[#F9FAFB] p-5 border border-gray-100">
                        <div className="flex items-center justify-between text-[#03373D] mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Assigned</span>
                            <FaTruckFast className="text-xl text-blue-500" />
                        </div>
                        <p className="text-3xl font-extrabold text-gray-800">{stats?.totalAssigned || 0}</p>
                    </div>
                </div>

                {/* Earnings History Table */}
                <div className="mt-10">
                    <h3 className="text-lg font-bold text-[#03373D] mb-4">Completed Deliveries Breakdown</h3>

                    {!stats?.earningsHistory || stats.earningsHistory.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F9FAFB] p-8 text-center text-sm text-gray-400">
                            No completed deliveries yet to show earnings breakdown.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                                        <th className="py-3 px-3">Parcel</th>
                                        <th className="py-3 px-3">Tracking</th>
                                        <th className="py-3 px-3">Total Charge</th>
                                        <th className="py-3 px-3">Commission Rate</th>
                                        <th className="py-3 px-3 text-right">Your Earning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.earningsHistory.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-50">
                                            <td className="py-4 px-3 font-semibold text-[#03373D]">{item.parcelName}</td>
                                            <td className="py-4 px-3 font-mono text-xs text-gray-500">{item.trackingId}</td>
                                            <td className="py-4 px-3">৳{item.totalCharge}</td>
                                            <td className="py-4 px-3 text-xs font-medium text-gray-600">{item.commissionRate}</td>
                                            <td className="py-4 px-3 text-right font-bold text-green-600">৳{item.earning}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RiderEarnings;