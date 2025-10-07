import React from "react";

const Confirmationalmodal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-[350px] shadow-lg h-[180px]">
        <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
        <p className="text-gray-400 mb-6">
          You will be logged out of your account.
        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={onLogout}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmationalmodal;
