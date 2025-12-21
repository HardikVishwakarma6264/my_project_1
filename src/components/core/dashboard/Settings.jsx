

import React from "react";
import Imageuploder from "../dashboard/Imageuploder";
import { useDispatch } from "react-redux";
import { handleImageUpload } from "../../../services/operations/authapi";
import EditProfile from "./EditProfile";
import { updateProfile } from "../../../services/operations/authapi";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";


export default function Settings() {
  const dispatch = useDispatch();

  const uploadImage = (file) => dispatch(handleImageUpload(file));
  const handleSave = (data) => dispatch(updateProfile(data));

  return (
    <div className=" md:p-6 text-white flex justify-center">
      <div className="flex flex-col items-center w-full max-w-[1050px] md:space-y-6 space-y-3">
        <Imageuploder handleImageUpload={uploadImage} />
        <EditProfile onSave={handleSave} />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}

