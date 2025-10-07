import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import image_5 from "../../../images/img_5.jpg";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authapi";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  const staged = { ...formData, accountType };
  dispatch(setSignupData(staged));
  localStorage.setItem("signupData", JSON.stringify(staged));

  try {
    const result = await dispatch(sendOtp(formData.email, navigate));
    if (result) {
      console.log("OTP sent, navigating to /verify-email");
    }
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
};


  return (
    <div className="mt-11 bg-[#121212] flex justify-center items-center text-white">
      <div className="flex flex-col md:flex-row bg-[#121212] rounded-xl shadow-lg w-[1500px] h-[700px] overflow-hidden justify-evenly">
        {/* Left Side - Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">
            Join the millions learning to code <br /> with HardikNotion for free
          </h2>
          <p className="text-gray-400 text-[20px] mb-6">
            Build skills for today, tomorrow, and beyond.
            <br />
            <span className="text-blue-400 italic">
              Education to future-proof your career.
            </span>
          </p>

          {/* Account Type Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-full border ${
                accountType === "Student"
                  ? "bg-gray-700 border-gray-500"
                  : "border-gray-600"
              }`}
              onClick={() => setAccountType("Student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full border ${
                accountType === "Instructor"
                  ? "bg-gray-700 border-gray-500"
                  : "border-gray-600"
              }`}
              onClick={() => setAccountType("Instructor")}
            >
              Instructor
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="flex gap-4">
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <span
                  className="absolute top-9 right-4 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>

              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <span
                  className="absolute top-9 right-4 cursor-pointer text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition mt-5"
            >
              Create Account
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Google Sign Up */}
          <button className="w-full border border-gray-500 text-white py-2 rounded-md flex justify-center items-center gap-2 hover:bg-gray-700 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="w-[500px] h-[500px] mt-10">
          <img
            src={image_5}
            alt="Students"
            className="object-cover h-[500px] w-[500px] shadow-[15px_15px_20px_rgba(255,255,255,0.5)] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;



