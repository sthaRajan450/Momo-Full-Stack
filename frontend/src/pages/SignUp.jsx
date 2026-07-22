import React from "react";
import { useForm } from "react-hook-form";
import { signupUser } from "../api/auth.services";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/features/authSlice";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/authSchemas";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await signupUser(data);
    if (res?.success) {
      dispatch(setAuth(res.user));
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        {/* Header section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and get started.
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                className={`block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.fullName
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.email
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.password
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
