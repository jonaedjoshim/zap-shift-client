import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "../../../firebase/firebase.init"
import toast from "react-hot-toast"

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    toast.loading("Signing in...", { id: "signIn" })

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("SignIn successful", { id: "signIn" })
        navigate(from, { replace: true })
      })
      .catch((err) => {
        let message = "SignIn failed"

        if (err.code === "auth/user-not-found") {
          message = "No account found with this email"
        } else if (err.code === "auth/wrong-password") {
          message = "Incorrect password"
        } else if (err.code === "auth/invalid-email") {
          message = "Invalid email address"
        }

        toast.error(message, { id: "signIn" })
      })
  }

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider()

    toast.loading("Signing in...", { id: "google" })

    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("SignIn successful", { id: "google" })
        navigate(from, { replace: true })
      })
      .catch(() => {
        toast.error("Google signIn failed", { id: "google" })
      })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to ZapShift</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
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
              className="w-full px-4 py-2 border rounded-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="w-full bg-[#CAEB66] py-2 rounded-md">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-lime-500">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center my-5">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">Or</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-gray-200"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default SignIn