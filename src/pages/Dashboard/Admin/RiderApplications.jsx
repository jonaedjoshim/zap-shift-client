import { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleXmark, FaClock } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RiderApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get("/riders/applications");
            setApplications(response.data?.data || []);
        } catch (error) {
            console.error("Error loading rider apps:", error);
            toast.error("Failed to load applications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, [axiosSecure]);

    const handleUpdateStatus = async (appId, applicantName, status) => {
        const confirm = await Swal.fire({
            title: `${status === 'approved' ? 'Approve' : 'Reject'} Application?`,
            text: `Are you sure you want to ${status} '${applicantName}' as a registered Rider?`,
            icon: status === 'approved' ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'approved' ? '#CAEB66' : '#d33',
            confirmButtonText: `Yes, ${status.toUpperCase()}`,
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/applications/${appId}/status`, { status });
            toast.success(`Application ${status} successfully.`);
            loadApplications();
        } catch (error) {
            console.error("Error updating app status:", error);
            Swal.fire("Error", error.response?.data?.message || "Action failed.", "error");
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
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">Rider Approvals</p>
                        <h1 className="mt-1 text-3xl font-bold text-[#03373D]">Pending Rider Applications</h1>
                        <p className="mt-2 text-sm text-gray-500">Review driver licenses & NIDs before approving riders onto the platform.</p>
                    </div>

                    <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                        {applications.length} Total Submitted Applications
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                                <th className="py-3 px-3">Applicant</th>
                                <th className="py-3 px-3">NID & License</th>
                                <th className="py-3 px-3">Region & Vehicle</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id} className="border-b border-gray-50">
                                    <td className="py-4 px-3">
                                        <p className="font-bold text-[#03373D]">{app.name}</p>
                                        <p className="text-xs text-gray-400">{app.userEmail}</p>
                                        <p className="text-xs font-semibold text-gray-600 mt-0.5">📞 {app.phone}</p>
                                    </td>

                                    <td className="py-4 px-3 text-xs space-y-1">
                                        <p><span className="text-gray-400">NID:</span> <span className="font-mono font-medium">{app.nidNumber}</span></p>
                                        <p><span className="text-gray-400">License:</span> <span className="font-mono font-medium">{app.drivingLicense}</span></p>
                                    </td>

                                    <td className="py-4 px-3 text-xs">
                                        <p className="font-semibold text-gray-800">{app.preferredRegion}</p>
                                        <p className="capitalize text-gray-500">{app.vehicleType}</p>
                                    </td>

                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold capitalize ${app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {app.status === 'pending' && <FaClock />}
                                            {app.status === 'approved' && <FaCircleCheck />}
                                            {app.status === 'rejected' && <FaCircleXmark />}
                                            {app.status}
                                        </span>
                                    </td>

                                    <td className="py-4 px-3 text-right">
                                        {app.status === 'pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, app.name, "approved")}
                                                    className="rounded-lg bg-[#CAEB66] px-3.5 py-1.5 text-xs font-bold text-[#03373D] transition hover:bg-[#b9dd50] cursor-pointer"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, app.name, "rejected")}
                                                    className="rounded-lg bg-red-100 px-3.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-200 cursor-pointer"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Action Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {applications.length === 0 && (
                        <div className="py-12 text-center text-sm text-gray-400">No rider applications submitted yet.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RiderApplications;