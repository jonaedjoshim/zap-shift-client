import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../../hooks/useAuth";

const SignUp = () => {
    const [showPassword, setShowPassword] =
        useState(false);

    const navigate = useNavigate();

    const {
        createUser,
        googleSignIn,
        updateUserProfile,
        verifyEmail,
    } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading(
            "Creating your account..."
        );

        try {
            await createUser(
                data.email,
                data.password
            );

            await updateUserProfile({
                displayName: data.name,
            });

            await verifyEmail();

            toast.success(
                "Account created. Please verify your email.",
                { id: toastId }
            );

            navigate("/");
        } catch (error) {
            let message =
                "Unable to create your account.";

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {
                message =
                    "An account already exists with this email.";
            } else if (
                error.code === "auth/invalid-email"
            ) {
                message =
                    "Please enter a valid email address.";
            } else if (
                error.code === "auth/weak-password"
            ) {
                message =
                    "Please choose a stronger password.";
            }

            toast.error(message, {
                id: toastId,
            });
        }
    };

    const handleGoogle = async () => {
        const toastId = toast.loading(
            "Signing up with Google..."
        );

        try {
            await googleSignIn();

            toast.success(
                "Signed in successfully.",
                { id: toastId }
            );

            navigate("/");
        } catch {
            toast.error(
                "Google sign up failed.",
                { id: toastId }
            );
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white p-8">
                <h1 className="mb-2 text-4xl font-bold">
                    Create an Account
                </h1>

                <p className="mb-6 text-gray-500">
                    Register with ZapShift
                </p>

                <div className="mb-4 flex justify-start">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                        <span className="text-xl">
                            👤
                        </span>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            autoComplete="name"
                            {...register("name", {
                                required:
                                    "Name is required",
                            })}
                            className="w-full rounded-md border px-4 py-2"
                        />

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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
                            })}
                            className="w-full rounded-md border px-4 py-2"
                        />

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                autoComplete="new-password"
                                {...register("password", {
                                    required:
                                        "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Minimum 6 characters",
                                    },
                                })}
                                className="w-full rounded-md border px-4 py-2 pr-11"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#CAEB66] py-2 font-medium text-black transition hover:bg-lime-400"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/signin"
                        className="font-medium text-lime-600"
                    >
                        Login
                    </Link>
                </p>

                <div className="my-5 flex items-center">
                    <div className="h-px grow bg-gray-300" />
                    <span className="px-3 text-sm text-gray-400">
                        Or
                    </span>
                    <div className="h-px grow bg-gray-300" />
                </div>

                <button
                    type="button"
                    onClick={handleGoogle}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-200 py-2 transition hover:bg-gray-100"
                >
                    <FcGoogle size={20} />
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;