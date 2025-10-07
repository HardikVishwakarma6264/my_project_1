import React, { useState, useEffect } from "react";

const RequirementsField = ({ name, label, errors, register, setValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [name, register]);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList, setValue, name]);

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedList = [...requirementsList];
    updatedList.splice(index, 1);
    setRequirementsList(updatedList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="font-semibold text-white text-[16px]">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="flex-1 bg-gray-600 rounded px-[12px] py-[8px] text-[15px] text-white"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="bg-yellow-500 hover:bg-yellow-400 transition-colors px-[16px] py-[8px] rounded font-semibold"
        >
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="mt-2 space-y-2">
          {requirementsList.map((req, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-600 px-[12px] py-[8px] rounded text-white"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="text-red-500 text-sm">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementsField;
