


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditProfile = ({ onSave }) => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    dateofbirth: "",
    gender: "",
    contactnumber: "",
    about: "",
  });

  // Pre-fill from Redux user
  useEffect(() => {
    if (user) {
      setFormData({
        dateofbirth: user?.additionaldetail?.dateofbirth || "",
        gender: user?.additionaldetail?.gender || "",
        contactnumber: user?.additionaldetail?.contactnumber || "",
        about: user?.additionaldetail?.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-2 sm:p-8 bg-gray-800 text-white rounded-2xl max-w-6xl w-full mx-auto mt-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Profile Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              value={user.firstname}
              readOnly
              className="w-full p-2 rounded bg-gray-700 cursor-not-allowed h-[42px]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={user.lastname}
              readOnly
              className="w-full p-2 rounded bg-gray-700 cursor-not-allowed h-[42px]"
            />
          </div>
        </div>

        {/* Date of Birth & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 h-[42px]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 h-[42px]"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Number & About */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              placeholder="Enter Contact Number"
              value={formData.contactnumber}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 h-[42px]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">About</label>
            <input
              type="text"
              name="about"
              placeholder="Enter Bio Details"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 h-[42px]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;




