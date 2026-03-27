import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", form);
  };

  const handleGoogle = () => {
    console.log("Google Sign In");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">SignIn with ZapShift</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition duration-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition duration-200"
            />
          </div>

          <div className="text-left">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-[#CAEB66] hover:bg-lime-500 cursor-pointer text-black font-medium py-2 rounded-md transition">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have any account?{" "}
          <a href="signup" className="text-lime-500 font-medium hover:underline">
            Sign Up
          </a>
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
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;