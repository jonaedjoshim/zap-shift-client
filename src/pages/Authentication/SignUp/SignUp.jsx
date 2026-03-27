import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((res) => {
                console.log("User Created:", res.user);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((res) => console.log(res.user))
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-xl">
                <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
                <p className="text-gray-500 mb-6">Register with ZapShift</p>

                <div className="flex justify-items-start mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl">👤</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1]"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <button className="w-full bg-[#CAEB66] hover:bg-lime-500 cursor-pointer text-black font-medium py-2 rounded-md transition">
                        Register
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-lime-500 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>

                <div className="flex items-center my-5">
                    <div className="grow h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-gray-400">Or</span>
                    <div className="grow h-px bg-gray-300"></div>
                </div>

                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-2 cursor-pointer py-2 rounded-md bg-gray-200 hover:bg-gray-100 transition"
                >
                    <FcGoogle size={20} />
                    Sign Up with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;