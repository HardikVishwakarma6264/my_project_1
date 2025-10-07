import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000); // 5 sec delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">Signup Successful!</h1>
      <p className="text-lg mt-2">Redirecting to login in 5 seconds...</p>
    </div>
  );
};

export default SignupSuccess;
