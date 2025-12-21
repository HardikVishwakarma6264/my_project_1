

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updatePassword } from "../../../services/operations/authapi";

export default function UpdatePassword({ onCancel }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleVisibility = (field) =>
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all fields");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }
    dispatch(updatePassword(formData));
  };

  return (
    <div className="md:p-6 p-2 bg-gray-800 text-white rounded-2xl w-full">
      <h2 className="text-xl font-bold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 md:gap-4 gap-1">
        {[
          { label: "Current Password", name: "oldPassword", key: "current" },
          { label: "New Password", name: "newPassword", key: "new" },
          { label: "Confirm Password", name: "confirmPassword", key: "confirm" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block mb-1">{field.label}</label>
            <div className="flex items-center bg-gray-700 rounded px-3">
              <input
                type={showPassword[field.key] ? "text" : "password"}
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 outline-none"
              />
              <span
                onClick={() => toggleVisibility(field.key)}
                className="cursor-pointer"
              >
                {showPassword[field.key] ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>
        ))}
        <div className="md:col-span-3 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

