import React, { useState } from "react";
import image_5 from "../../../images/img_5.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../../../services/operations/authapi";
import hard_img from "../../../images/hard_img.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data ->", formData);

    // ✅ dispatch login function
    dispatch(loginuser(formData.email, formData.password, navigate));
  };

  return (
    <div className="flex justify-center items-center bg-[#121212] text-white overflow-y-hidden md:h-[700px] py-12 md:py-0 overflow-hidden">
      <div className="flex flex-col md:flex-row bg-[#121212] rounded-xl shadow-lg w-full max-w-[1200px] overflow-hidden">
        
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center md:px-10 px-8 md:py-12  w-full md:w-1/2">
          <h2 className="hidden md:block text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="hidden md:block text-gray-400 mb-6 text-lg mt-2">
  Build skills for today, tomorrow, and beyond. <br />
  <span className="text-blue-500 italic">
    Education to future-proof your career.
  </span>
</p>

{/* Mobile Logo / Image */}
<div className="flex md:hidden justify-center mb-6">
  <img
    src={hard_img}   // ya apna logo image
    alt="Logo"
    className="w-32 h-auto rounded-full shadow-lg"
  />
</div>


          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="text-sm font-medium">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="text-sm font-medium">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
              />
              <span
                className="absolute top-[40px] right-4 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="/forgot-password" className="text-blue-400 text-sm hover:text-red-400">
                Forgot Password
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          {/* <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-2 text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div> */}

          {/* Google Sign In */}
          {/* <button className="flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-md hover:bg-gray-800">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button> */}
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex justify-center items-center w-full md:w-1/2 p-6">
          <img
            src={image_5}
            alt="Login"
            className="object-cover max-h-[450px] w-full rounded-2xl shadow-[15px_15px_20px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
