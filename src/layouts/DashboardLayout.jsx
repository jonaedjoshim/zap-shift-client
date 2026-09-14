import { useState } from "react";
import {
    FaBars,
    FaBox,
    FaHouse,
    FaMoneyBillWave,
    FaMotorcycle,
    FaStar,
    FaUsers,
    FaXmark,
} from "react-icons/fa6";
import {
    Link,
    NavLink,
    Outlet,
} from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useUserProfile from "../hooks/useUserProfile";
import ZapShiftLogo from "../pages/Shared/ZapShiftLogo";

const commonLinks = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: FaHouse,
        end: true,
    },
];

const userLinks = [
    {
        label: "My Parcels",
        path: "/dashboard/my-parcels",
        icon: FaBox,
    },
    {
        label: "Send Parcel",
        path: "/sendParcel",
        icon: FaMotorcycle,
    },
    {
        label: "Payments",
        path: "/dashboard/payments",
        icon: FaMoneyBillWave,
    },
    {
        label: "My Reviews",
        path: "/dashboard/reviews",
        icon: FaStar,
    },
];

const riderLinks = [
    {
        label: "Assigned Deliveries",
        path: "/dashboard/deliveries",
        icon: FaMotorcycle,
    },
    {
        label: "Earnings",
        path: "/dashboard/earnings",
        icon: FaMoneyBillWave,
    },
];

const adminLinks = [
    {
        label: "Manage Parcels",
        path: "/dashboard/parcels",
        icon: FaBox,
    },
    {
        label: "Manage Users",
        path: "/dashboard/users",
        icon: FaUsers,
    },
    {
        label: "Manage Riders",
        path: "/dashboard/riders",
        icon: FaMotorcycle,
    },
];

const DashboardLayout = () => {
    const [
        isSidebarOpen,
        setIsSidebarOpen,
    ] = useState(false);

    const { user } = useAuth();

    const {
        profile,
        loading,
        error,
    } = useUserProfile();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F3F5F5]">
                <span className="loading loading-ring loading-lg text-[#8BA63D]" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F3F5F5] p-6">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-xl font-bold text-[#03373D]">
                        Unable to Load Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error ||
                            "Your profile could not be found."}
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-[#CAEB66] px-5 py-2.5 font-semibold text-black"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    const role =
        profile.role || "user";

    let roleLinks = userLinks;

    if (role === "rider") {
        roleLinks = riderLinks;
    }

    if (role === "admin") {
        roleLinks = adminLinks;
    }

    const navigation = [
        ...commonLinks,
        ...roleLinks,
    ];

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F3F5F5]">
            {/* Mobile Header */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
                <Link to="/">
                    <ZapShiftLogo />
                </Link>

                <button
                    type="button"
                    onClick={() =>
                        setIsSidebarOpen(
                            (previous) =>
                                !previous
                        )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-[#03373D]"
                    aria-label="Toggle dashboard navigation"
                >
                    {isSidebarOpen ? (
                        <FaXmark />
                    ) : (
                        <FaBars />
                    )}
                </button>
            </header>

            {/* Overlay */}
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={
                        closeSidebar
                    }
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed bottom-0 left-0 top-0 z-50 flex w-72 flex-col bg-[#03373D] p-5 text-white transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="mb-8 rounded-xl bg-white p-3">
                    <Link
                        to="/"
                        onClick={
                            closeSidebar
                        }
                    >
                        <ZapShiftLogo />
                    </Link>
                </div>

                <div className="mb-7 flex items-center gap-3 border-b border-white/10 pb-6">
                    {user?.photoURL ? (
                        <img
                            src={
                                user.photoURL
                            }
                            alt={
                                profile.name
                            }
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#CAEB66] font-bold text-[#03373D]">
                            {profile.name
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="truncate font-semibold">
                            {
                                profile.name
                            }
                        </p>

                        <p className="mt-0.5 text-xs capitalize text-gray-300">
                            {role}
                        </p>
                    </div>
                </div>

                <nav
                    className="flex-1"
                    aria-label="Dashboard navigation"
                >
                    <ul className="space-y-2">
                        {navigation.map(
                            (item) => {
                                const Icon =
                                    item.icon;

                                return (
                                    <li
                                        key={
                                            item.path
                                        }
                                    >
                                        <NavLink
                                            to={
                                                item.path
                                            }
                                            end={
                                                item.end
                                            }
                                            onClick={
                                                closeSidebar
                                            }
                                            className={({
                                                isActive,
                                            }) =>
                                                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                                    ? "bg-[#CAEB66] text-[#03373D]"
                                                    : "text-gray-200 hover:bg-white/10 hover:text-white"
                                                }`
                                            }
                                        >
                                            <Icon />

                                            {
                                                item.label
                                            }
                                        </NavLink>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </nav>

                <Link
                    to="/"
                    className="mt-5 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-gray-200 transition hover:bg-white/10"
                >
                    Back to Website
                </Link>
            </aside>

            {/* Main */}
            <div className="lg:pl-72">
                <main className="mx-auto min-h-screen max-w-7xl p-4 sm:p-6 lg:p-8">
                    <Outlet
                        context={{
                            profile,
                        }}
                    />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;