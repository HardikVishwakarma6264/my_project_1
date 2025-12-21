import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { resetpassword } from "../apis";
import { updatepassword } from "../apis";
import { setToken,setSignupData ,setUser} from "../../slices/authSlice";


import { sendotps } from "../apis";
import { signup } from "../apis";
import { login } from "../apis";
import { imageupdate } from "../apis";
import {updateprofile} from "../apis"
import { passwordupdate } from "../apis";
import { accountdelete } from "../apis";
import { courseenrolled } from "../apis";


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await apiconnector("POST", sendotps.SEND_OTP, { email });

      // console.log("SEND OTP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully!");
      navigate("/verify-email");

      return true;  // ✅ success return
    } catch (error) {
      // console.log("SEND OTP ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
      return false; // ✅ failure return
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    // Clear Redux state
    dispatch(setToken(null));
    dispatch(setUser(null));

    // // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Show toast
    toast.success("Logged Out");

    // Redirect to home
    navigate("/");
  };
}

export function signupuser(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    try {
      // Prepare payload for signup
      const payload = {
        accounttype: accountType,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        confirmpassword: confirmPassword,
        otp,
        contactnumber: null,
      };

      // ✅ Signup API call
      const response = await apiconnector("POST", signup.SIGNUPJI, payload);
      // console.log("SIGNUP RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Signup failed");
      }

      // toast.success("Signup Successful!");

      // ✅ Clear staged signup data
      dispatch(setSignupData(null));
      localStorage.removeItem("signupData");

      // ✅ Auto Login after Signup
      await dispatch(loginuser(email, password, navigate));

    } catch (error) {
      // console.log("SIGNUP ERROR:", error);
      toast.error(error?.response?.data?.message || error.message || "Signup Failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function loginuser(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");

    try {
      const response = await apiconnector("POST", login.LOGINJI, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Login failed");
      }

      toast.success("Login Successful!");

      const token = response.data.token;
      const user = response.data.user;

      dispatch(setToken(token));

      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      dispatch(setUser({ ...user, image: userImage }));
      // console.log("setuser data->", user);

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify({ ...user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      // console.error("LOGIN API ERROR:", error);
      toast.error(error?.response?.data?.message || error.message || "Login Failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    // Loading toast show karo
    const toastId = toast.loading("Sending reset email...");

    try {
      const response = await apiconnector("POST", resetpassword.RESET_PASSWORD, { email });

      // console.log("RESET PASSWORD TOKEN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Success hone par previous toast dismiss karke success show karo
      toast.dismiss(toastId);
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN ERROR:", error);

      // Error hone par previous toast dismiss karke error show karo
      toast.dismiss(toastId);
      toast.error("Failed to send reset email");
    }
  };
}

export function resetPasswordAPI(newPassword, confirmPassword, token,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting password...");
    try {
      const response = await apiconnector("POST", updatepassword.UPDATE_PASSWORDS, {
        password:newPassword,
        confirmpassword:confirmPassword, 
        token,
      });

      // console.log("RESET PASSWORD RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Password Reset Successfully!");
       navigate("/reset-success");
    } catch (error) {
      // console.log("RESET PASSWORD ERROR:", error);
      toast.dismiss(toastId);
      toast.error("Failed to reset password");
    }
  };
}



export function handleImageUpload(file) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading image...");
    try {
      if (!file) {
        toast.dismiss(toastId);
        return toast.error("Please select an image");
      }

      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiconnector("POST", imageupdate.IMAGE_UPDATE, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      // console.log("IMAGE UPLOAD RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Image upload failed");
      }

      const imageUrl = response.data.url;
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...userData, image: imageUrl };

      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.dismiss(toastId);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      // console.error("IMAGE UPLOAD ERROR:", error);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  };
}


export const updateProfile = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token; // Get token from Redux

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      toast.loading("Updating profile...");
      const response = await apiconnector("PUT", updateprofile.UPDATE_PROFILE, data, {
        Authorization: `Bearer ${token}`,  // ✅ Pass token
      });

      // console.log("Update Success:", response);

      if (response.data.success) {
        dispatch({ type: "auth/setUser", payload: response.data.user });
        toast.dismiss();
        toast.success("Profile updated successfully!");
      } else {
        toast.dismiss();
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.dismiss();
      // console.log("Update Error:", error);
      toast.error("Something went wrong while updating");
    }
  };
};


export const updatePassword = (data) => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Updating password...");

    try {
      // ✅ Token Redux store ya localStorage se nikal lo
      const token = getState().auth.token || JSON.parse(localStorage.getItem("token"));

      // ✅ Header me Authorization bhejna jaruri hai
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiconnector(
        "POST",
        passwordupdate.PASSWORD_UPDATE,
        data,
        headers
      );

      // console.log("Update Password Response:", response);

      if (response.data.success) {
        toast.success("Password updated successfully");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      // console.log("Update Password Error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Deleting account...");
    try {
      const token = getState().auth.token || JSON.parse(localStorage.getItem("token"));

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apiconnector(
        "DELETE",
        accountdelete.ACCOUNT_DELETE,
        null,
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account deleted successfully");

      // ✅ Clear Redux & LocalStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "auth/logout" }); // agar logout action hai to use karo

      // ✅ Redirect to homepage
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message || "Account deletion failed");
    } finally {
      toast.dismiss(toastId);
    }
  };
};


export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      courseenrolled.ENROLLED_COURSE,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // toast.success("course test....");

    result = response.data.data;
  } catch (error) {
    // console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could not fetch enrolled courses");
  }
  toast.dismiss(toastId);
  return result;
}










