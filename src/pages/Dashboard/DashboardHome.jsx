import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
    const { profile } =
        useOutletContext();

    return (
        <section>
            <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8BA63D]">
                    Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold text-[#03373D]">
                    Welcome,{" "}
                    {profile.name}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                    Manage your ZapShift
                    account and parcel
                    activities from one
                    place.
                </p>

                <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-[#F9FAFB] p-6">
                    <p className="text-sm text-gray-500">
                        Your dashboard
                        overview will appear
                        here as we connect
                        parcel, payment, and
                        delivery data.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DashboardHome;