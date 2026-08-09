

import React, { useEffect, useState,useCallback } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signupuser, sendOtp } from "../../../services/operations/authapi";
import { setSignupData } from "../../../slices/authSlice";

const VerifyEmailss = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupData = useSelector((state) => state.auth.signupData);

  // 🔄 Timer related state
  const [timeLeft, setTimeLeft] = useState(180); // 5 minutes = 300 seconds
  const [timerActive, setTimerActive] = useState(true);

  // ⏳ Start timer on mount or reset
  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // 🧠 Hydrate from localStorage if needed
  useEffect(() => {
    if (!signupData) {
      try {
        const saved = localStorage.getItem("signupData");
        if (saved) {
          dispatch(setSignupData(JSON.parse(saved)));
        } else {
          navigate("/signup");
        }
      } catch {
        navigate("/signup");
      }
    }
  }, [signupData, dispatch, navigate]);

  // 🔐 Submit handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!signupData) return;

  //   const {
  //     accountType,
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     confirmPassword,
  //   } = signupData;

  //   dispatch(
  //     signupuser(
  //       accountType,
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       confirmPassword,
  //       otp,
  //       navigate
  //     )
  //   );
  // };

  const handleSubmit = useCallback(
  (e) => {
    e.preventDefault();

    if (!signupData) return;

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signupuser(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  },
  [signupData, dispatch, navigate, otp]
);

  // 🔁 Resend OTP + restart timer
  const handleResend = () => {
    if (!signupData?.email) return;
    dispatch(sendOtp(signupData.email, navigate));
    setTimeLeft(180); // reset 5 mins
    setTimerActive(true);
  };

  // 🕓 Format time for display (mm:ss)
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 🚀 Auto-submit when 6-digit OTP is filled
  useEffect(() => {
    if (otp.length === 6 && /^[0-9]{6}$/.test(otp)) {
      handleSubmit(new Event("submit"));
    }
  }, [otp, handleSubmit]);

  return (
    <div className="bg-[#0a0a0a] text-white h-[800px] flex justify-center items-center">
      <div className="bg-[#111] p-8 rounded-lg shadow-lg w-[450px] text-center">
        <h2 className="text-2xl font-bold mb-2">Verify email</h2>
        <p className="text-gray-400 mb-6">
          A verification code has been sent to you. Enter the code below.
        </p>

        <form onSubmit={handleSubmit}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex justify-center gap-3 mb-6"
            inputStyle={{
              width: "48px",
              height: "48px",
              backgroundColor: "#222",
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
            focusStyle={{
              border: "2px solid #facc15",
              outline: "none",
            }}
            autoFocus
            shouldAutoFocus
          />

          {/* 🧠 Hide the button once 6-digit OTP is filled */}
          {otp.length < 6 && (
            <button
              type="submit"
              className="bg-yellow-400 text-black w-full py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition"
            >
              Verify email
            </button>
          )}
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-blue-600"
          >
            ← Back to login
          </button>

          {timerActive ? (
            <span className="text-gray-400">{formatTime(timeLeft)}</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-green-400 hover:underline"
            >
              Resend it
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailss;


