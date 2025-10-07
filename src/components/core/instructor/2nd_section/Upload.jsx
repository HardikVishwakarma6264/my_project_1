import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewdata = null,
  editdata = null,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(viewdata || editdata || null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (video && !selectedFile.type.startsWith("video/")) {
        alert("Please upload a valid video file");
        return;
      }
      setFile(selectedFile);
      setValue(name, selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      fakeProgress();
    }
  };

  const fakeProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setValue(name, null);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>

      {/* Drag & Drop area */}
      {!preview ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 cursor-pointer transition"
          onClick={() => document.getElementById(`${name}-input`).click()}
        >
          <FiUploadCloud size={40} className="mb-2 text-blue-500" />
          <p className="text-sm">Drag & drop or click to upload</p>
          <p className="text-xs text-gray-400 mt-1">
            {video ? "MP4, AVI, MOV up to 500MB" : "Supported formats"}
          </p>
          <input
            type="file"
            id={`${name}-input`}
            className="hidden"
            accept={video ? "video/*" : "image/*"}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative mt-3 border border-gray-300 rounded-lg overflow-hidden">
          {/* Preview */}
          {video ? (
            <video
              src={preview}
              controls
              className="w-full rounded-lg max-h-60 bg-black"
            ></video>
          ) : (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          )}

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <AiOutlineClose size={18} />
          </button>

          {/* Progress Bar */}
          {progress > 0 && progress < 100 && (
            <div className="absolute bottom-0 left-0 w-full bg-gray-200 h-2">
              <div
                className="bg-blue-600 h-2"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {errors[name] && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
};

export default Upload;
