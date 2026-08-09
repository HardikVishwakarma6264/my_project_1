

import React, { useEffect, useState } from "react";

const UploadThumbnail = ({ name, label, setValue, getValues, error, rules }) => {
  const [preview, setPreview] = useState(null);

  // useEffect(() => {
  //   const existingImage = getValues(name);

  //   if (typeof existingImage === "string") {
  //     setPreview(existingImage); // ✅ Pre-filled URL
  //   } else if (existingImage instanceof File) {
  //     setPreview(URL.createObjectURL(existingImage));
  //   }
  // }, []);

  useEffect(() => {
  const existingImage = getValues(name);

  if (typeof existingImage === "string") {
    setPreview(existingImage);
  } else if (existingImage instanceof File) {
    setPreview(URL.createObjectURL(existingImage));
  }
}, [getValues, name]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue(name, file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-white text-[16px]">
        {label} <span className="text-red-500">*</span>
      </label>

      {preview && (
        <img
          src={preview}
          alt="Thumbnail Preview"
          className="w-full max-h-[200px] object-cover rounded"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="bg-gray-600 rounded px-[12px] py-[8px] text-white"
      />

      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default UploadThumbnail;

