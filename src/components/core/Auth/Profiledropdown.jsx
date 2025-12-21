import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../../slices/authSlice";
import toast from "react-hot-toast";
import { FaAngleDown } from "react-icons/fa";

const Profiledropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button with Avatar + Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none bg-[#121212] text-white px-3 py-2 rounded-lg transition"
      >
        <img
          src={user?.image || "/default-avatar.png"} // ✅ Fallback avatar
          alt="profile"
          className="w-10 h-10 rounded-full border border-gray-500 object-cover"
        />
        <FaAngleDown
          className={`transition-transform duration-200  ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50 md:w-56 ">
          {/* <p className="px-4 py-2 text-sm text-gray-300 truncate">
            {user?.email || "No Email"}
          </p> */}
         
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/dashboard/my-profile");
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Dashboard
          </button>
          <hr className="border-gray-600   my-2" />
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="block w-full text-left px-4 py-2 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profiledropdown;
