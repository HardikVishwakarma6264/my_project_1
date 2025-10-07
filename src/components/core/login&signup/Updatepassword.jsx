import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPasswordAPI } from "../../../services/operations/authapi";
import { useNavigate } from "react-router-dom";




const Updatepassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  // Validation Rules
  const validations = {
    lowerCase: /[a-z]/.test(newPassword),
    upperCase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    minLength: newPassword.length >= 8,
    passwordsMatch: newPassword === confirmPassword && newPassword.length > 0,
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPasswordAPI(newPassword, confirmPassword, token,navigate));
  };

  return (
    <div className="bg-[#0a0a0a] h-[800px] flex items-center justify-center text-white border 2px solid white">
      <div className="w-[450px] bg-[#111] p-6 rounded-lg shadow-lg relative border 2px solid white">
        <h2 className="text-3xl font-bold mb-2">Choose new password</h2>
        <p className="text-gray-400 mb-6 text-[16px]">
          Almost done. Enter your new password and you're all set.
        </p>

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="relative">
            <label className="block mb-2">
              New password<span className="text-red-500">*</span>
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#222]"
            />
            <span
              className="absolute top-[42px] right-4 cursor-pointer text-gray-400"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-2">Confirm new password*</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#222]"
            />
            <span
              className="absolute top-[42px] right-4 cursor-pointer text-gray-400"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Validation Rules */}
          <div className="text-sm mb-2">
            <p
              className={
                validations.lowerCase ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ one lowercase character
            </p>
            <p
              className={
                validations.upperCase ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ one uppercase character
            </p>
            <p
              className={
                validations.specialChar ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ one special character
            </p>
            <p
              className={
                validations.number ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ one number
            </p>
            <p
              className={
                validations.minLength ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ 8 character minimum
            </p>
            <p
              className={
                validations.passwordsMatch ? "text-green-400" : "text-gray-500"
              }
            >
              ✔ passwords match
            </p>
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  className="w-full py-2 rounded font-bold bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300"
>
  Reset Password
</button>

        </form>

        <p
          onClick={() => (window.location.href = "/login")}
          className="mt-4 text-gray-400 hover:text-red-600 cursor-pointer"
        >
          ← Back to login
        </p>
      </div>
    </div>
  );
};

export default Updatepassword;
