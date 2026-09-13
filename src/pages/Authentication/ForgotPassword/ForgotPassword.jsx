import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";

const ForgotPassword = () => {
    const { resetPassword } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading(
            "Sending reset email..."
        );

        try {
            await resetPassword(data.email);

            toast.success(
                "Password reset link sent. Please check your email.",
                { id: toastId }
            );
        } catch (error) {
            let message =
                "Could not send the password reset email.";

            if (error.code === "auth/invalid-email") {
                message =
                    "Please enter a valid email address.";
            } else if (
                error.code ===
                "auth/too-many-requests"
            ) {
                message =
                    "Too many attempts. Please try again later.";
            }

            toast.error(message, {
                id: toastId,
            });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white p-8">
                <h1 className="mb-2 text-4xl font-bold">
                    Forgot Password
                </h1>

                <p className="mb-6 text-gray-600">
                    Enter your email address and we&apos;ll
                    send you a reset link.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            {...register("email", {
                                required:
                                    "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Enter a valid email address",
                                },
                            })}
                            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-[#CAEB66] focus:ring-1 focus:ring-[#CAEB66]"
                        />

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-[#CAEB66] py-3 font-medium text-black transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Sending..."
                            : "Send"}
                    </button>
                </form>

                <p className="mt-5 text-gray-500">
                    Remember your password?{" "}
                    <Link
                        to="/signin"
                        className="font-medium text-lime-600 transition hover:text-lime-700"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;