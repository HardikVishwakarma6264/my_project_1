import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import countryCodes from "../../../data/countrycode.json"

export default function Contactform() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitSuccessful },
  } = useForm();

  const submitcontactform=async(data)=>{
    console.log("logging Data->",data);
    try{
     
      // const response=await apiconnector("POST",);
      const response={status:"ok"};
      console.log("logging data->",response);
      
      toast.success("Information send");


    }catch(error){
        console.log("error aye h->",error.message);
        toast.error(error.response?.data?.message || "Something went wrong");


    }

  }

  useEffect(() => {
  if (isSubmitSuccessful) {
    reset({
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      phone: "",
      countryCode: countryCodes[69].code
    });
  }
}, [isSubmitSuccessful, reset]);

  return (
    <div className="h-[700px] flex items-center justify-center bg-[#121212] ">
      <form
        onSubmit={handleSubmit(submitcontactform)}
        className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-2">
          Get in Touch
        </h2>
        <p className="text-gray-400 text-center mb-6">
          We'd love to hear from you. Please fill out this form.
        </p>

        {/* First and Last Name */}
        <div className="flex gap-4 mb-4 md:mt-11">
          <div className="flex-1">
             <label className="block text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">First name is required</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              {...register("lastName", { required: true })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">Last name is required</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4 md:mt-8">
          <label className="block text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Phone Number */}
         <div className="mb-4 md:mt-8">
      <label className="block text-gray-300 mb-1">Phone Number</label>
      <div className="flex gap-2 ">
        <select
          {...register("countryCode", { required: true })}
          className="bg-gray-700 text-white rounded-md px-3 py-2 w-[87px]"
        >
          {countryCodes.map((item, index) => (
            <option key={index} value={item.code}>
              {item.code} - {item.country}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="12345 67890"
          {...register("phone", { required: true,  minLength: { value: 8, message: "Minimum 8 digits required" }, 
  maxLength: { value: 10, message: "Maximum 10 digits allowed" } })}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm">Phone number is required</p>
      )}
    </div>

        {/* Message */}
        <div className="mb-6 md:mt-8">
          <label className="block text-gray-300 mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">Message is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
