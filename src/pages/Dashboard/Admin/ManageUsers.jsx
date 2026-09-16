import { useEffect, useState } from "react";
import { FaUserShield, FaUserCheck, FaMotorcycle, FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get("/admin/users");
            setUsers(response.data?.data || []);
        } catch (error) {
            console.error("Error loading users:", error);
            toast.error("Failed to load user list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [axiosSecure]);

    const handleRoleChange = async (userId, userName, newRole) => {
        const confirm = await Swal.fire({
            title: "Change User Role?",
            text: `Promote/Demote '${userName}' to '${newRole.toUpperCase()}'?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            confirmButtonText: "Yes, Update Role",
            cancelButtonColor: "#d33",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/admin/users/${userId}/role`, { role: newRole });
            toast.success(`Role updated to ${newRole}`);
            loadUsers();
        } catch (error) {
            console.error("Failed to update role:", error);
            Swal.fire("Error", error.response?.data?.message || "Failed to update role.", "error");
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
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">User Management</p>
                        <h1 className="mt-1 text-3xl font-bold text-[#03373D]">All Registered Users</h1>
                        <p className="mt-2 text-sm text-gray-500">Manage user accounts and assign system permissions (User, Rider, Admin).</p>
                    </div>

                    <div className="rounded-full bg-[#F2F8DE] px-4 py-2 text-sm font-semibold text-[#65782C]">
                        {users.length} Total Registered Users
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                                <th className="py-3 px-3">User</th>
                                <th className="py-3 px-3">Email</th>
                                <th className="py-3 px-3">Current Role</th>
                                <th className="py-3 px-3">Joined Date</th>
                                <th className="py-3 px-3 text-right">Actions (Role Change)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b border-gray-50">
                                    <td className="py-4 px-3 flex items-center gap-3">
                                        {u.photoURL ? (
                                            <img src={u.photoURL} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                                        ) : (
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F8DE] font-bold text-[#03373D]">
                                                {u.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="font-semibold text-[#03373D]">{u.name}</span>
                                    </td>

                                    <td className="py-4 px-3 text-gray-600 text-xs font-mono">{u.email}</td>

                                    <td className="py-4 px-3">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                u.role === 'rider' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {u.role === 'admin' && <FaUserShield />}
                                            {u.role === 'rider' && <FaMotorcycle />}
                                            {u.role === 'user' && <FaUser />}
                                            {u.role}
                                        </span>
                                    </td>

                                    <td className="py-4 px-3 text-xs text-gray-400">
                                        {new Date(u.createdAt).toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>

                                    <td className="py-4 px-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            {u.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleRoleChange(u._id, u.name, "admin")}
                                                    className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 transition hover:bg-purple-100 cursor-pointer"
                                                >
                                                    Make Admin
                                                </button>
                                            )}

                                            {u.role !== 'rider' && (
                                                <button
                                                    onClick={() => handleRoleChange(u._id, u.name, "rider")}
                                                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100 cursor-pointer"
                                                >
                                                    Make Rider
                                                </button>
                                            )}

                                            {u.role !== 'user' && (
                                                <button
                                                    onClick={() => handleRoleChange(u._id, u.name, "user")}
                                                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:bg-gray-200 cursor-pointer"
                                                >
                                                    Make User
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ManageUsers;