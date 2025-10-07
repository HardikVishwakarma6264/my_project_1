// import React, { useState } from "react";

// const UploadThumbnail = ({ name, label, setValue, getValues, error }) => {
//   const [preview, setPreview] = useState(getValues(name));

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       setValue(name, file);
//     }
//   };

//   const handleRemove = () => {
//     setPreview(null);
//     setValue(name, null);
//   };

//   return (
//     <div>
//       <label className="block mb-2 text-sm text-white font-semibold">
//         {label} <span className="text-red-500">*</span>
//       </label>

//       {/* ✅ Fixed Height Container */}
//       <div className="flex flex-col items-start gap-4 w-full h-[250px] bg-gray-600">
//         {preview ? (
//           <div className="relative w-full h-full">
//             <img
//               src={preview}
//               alt="Thumbnail Preview"
//               className="w-full h-full object-cover rounded-lg border-[5px] border-white"
//             />
//             <button
//               type="button"
//               onClick={handleRemove}
//               className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-400 transition-colors"
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-800 transition">
//             <span className="text-white mb-2">Click to upload thumbnail</span>
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//           </label>
//         )}
//       </div>

//       {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
//     </div>
//   );
// };

// export default UploadThumbnail;

import React, { useEffect, useState } from "react";

const UploadThumbnail = ({ name, label, setValue, getValues, error, rules }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const existingImage = getValues(name);

    if (typeof existingImage === "string") {
      setPreview(existingImage); // ✅ Pre-filled URL
    } else if (existingImage instanceof File) {
      setPreview(URL.createObjectURL(existingImage));
    }
  }, []);

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

