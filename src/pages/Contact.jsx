

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../data/countrycode.json";
import Footer from "../components/core/Homepage/Footer";
import toast from "react-hot-toast";
import ReviewSliderdo from "./slider/ReviewSliderdo";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("logging Data->", data);
    try {
      // const response = await apiconnector("POST", ...);
      // const response = { status: "ok" };
      // console.log("logging data->", response);

      toast.success("Thank's Your Information is sent");
    } catch (error) {
      // console.log("error aye h->", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phone: "",
        countryCode: countryCodes[69].code,
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      {/* Contact Section */}
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:px-6 px-3 md:py-12 py-6 max-w-6xl mx-auto">
        {/* LEFT SECTION */}
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col gap-6 w-full md:w-1/3">
          <div>
            <h3 className="text-lg font-semibold">Chat with us</h3>
            <p className="text-gray-200 text-sm">
              Our friendly team is here to help.
            </p>
            <a
              href="mailto:hardiknotion07@gmail.com"
              className="text-gray-400 transition-all duration-300 hover:text-blue-500 hover:scale-105 inline-block"
            >
              Futurenotion07@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Visit us</h3>
            <p className="text-gray-200 text-sm">
              Come and say hello at our office HQ.
            </p>
            <a
              href="https://www.google.com/maps?q=Maulana+Azid+National+Institute+of+Technology,+Hostel-+9,+Bhopal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm transition-all duration-300 hover:text-blue-500 hover:scale-105 inline-block"
            >
              Maulana Azid National Institute of Technology, Hostel-9,Bhopal
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Call us</h3>
            <p className="text-gray-200 text-sm">Mon - Fri from 8am to 5pm</p>
            <a
              href="tel:+6264600616"
              className="text-gray-400 transition-all duration-300 hover:text-blue-500 hover:scale-105 inline-block"
            >
              +6264600616
            </a>
          </div>
        </div>

        {/* RIGHT SECTION (FORM) */}
        <div className="bg-[#1c1c1c] rounded-lg border border-gray-700 p-6 sm:p-10 w-full md:w-2/3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Got an Idea? We've got the skills.
            <br /> Let's team up
          </h2>
          <p className="text-gray-400 mb-6">
            Tell us more about yourself and what you have in mind.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {/* First and Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    First name is required
                  </p>
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
            <div>
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
            <div>
              <label className="block text-gray-300 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode", { required: true })}
                  className="bg-gray-700 text-white rounded-md px-3 py-2 w-[90px]"
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
                  {...register("phone", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Minimum 8 digits required",
                    },
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 digits allowed",
                    },
                  })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message || "Phone number is required"}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
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
      </div>

      {/* Section 2 */}
      <section className="md:mt-[50px] mt-[25px] font-bold">
  <h2 className="text-center text-3xl md:text-4xl mb-6">
    Reviews from other learners
  </h2>

  {/* Swiper ko apna container chahiye fixed height ke bina */}
  <div className="max-w-[1400px] mx-auto px-4">
    <ReviewSliderdo />
  </div>
</section>

      {/* Section 3 */}
      <Footer />
    </div>
  );
}
