import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 9000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-400">✅ Your password has been reset successfully!</h1>
        <p className="text-gray-400 mt-4">Please Wait...Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default ResetSuccess;
