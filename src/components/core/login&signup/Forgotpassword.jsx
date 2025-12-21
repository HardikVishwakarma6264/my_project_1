import React, { use, useState } from "react";
import { useDispatch } from "react-redux";

import { getPasswordResetToken } from "../../../services/operations/authapi";


const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [emailsend, setemailsend]=useState(false);
  const dispatch=useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Reset Password Email:", email);
    //password bul gaya h to usko reset karna h to api laga 
    dispatch(getPasswordResetToken(email, setemailsend));
  };

  return (
    <div
      className="flex justify-center items-center bg-[#0d1117] text-white "
      style={{ height: "800px", width: "100%" }} // Height and Width set here
    >
      <div
        className="bg-[#0d1117] rounded-lg shadow-lg p-8 flex flex-col "
        style={{ width: "450px", height:"500px" }} // Form box width in px
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">
          {
            !emailsend ? "Reset your Password":"Check your Email"
          }

        </h2>
        <p className="text-gray-400 mb-6 text-sm leading-6">
          {
            !emailsend ?" Have no fear. We’ll email you instructions to reset your password.If you don’t have access to your email we can try account recovery." : `We have sent the reset email to ${email}`
          }
          
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
         {
          !emailsend && (
            <label>
              <p className="text-sm font-medium mb-1 block">Email Address<span className="text-red-500">*</span></p>
              <input
               required
               type="email"
               name="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               placeholder="Enter your Email Address"
               className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none mt-2"
              style={{ height: "45px" }}
              />

          
              
              </label>
          )
         }   

         <button className="bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 mt-2"  style={{ height: "45px" }}>
          {
            !emailsend ? "Reset Password" : "Resend Email"
          }

          </button>       
        </form>

        {/* Back to Login */}
        <div className="mt-3">
          <a href="/login" className="text-gray-400 hover:text-white text-sm">
            ← Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
