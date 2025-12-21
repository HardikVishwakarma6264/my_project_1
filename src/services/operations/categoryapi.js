import React from 'react'
import {apiconnector} from "../apiconnector";
import { categorydetails } from '../apis';
import {toast} from "react-hot-toast";

export const getcategoryapi = async (categoryid) => {
  const toastId = toast.loading("fetching category...");
  let result = [];
  try {
    // agar backend POST expect kar raha hai

    if (!categoryid) {
    throw new Error("categoryId is required to fetch details");
  }

    const response = await apiconnector(
      "POST", // <-- GET se POST karo
      categorydetails.CATEGORIES_DETAIL,
      { categoryId: categoryid } // <-- backend ka field naam match kar
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch category page!");
    }

    result = response?.data;
  } catch (error) {
    // console.log("fetch course api ERROR......:", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};


