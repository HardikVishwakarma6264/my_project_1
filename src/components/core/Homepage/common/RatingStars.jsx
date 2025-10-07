


import React from "react";
import { TiStarFullOutline, TiStarOutline, TiStarHalfOutline } from "react-icons/ti";


function RatingStars({
  count = 5,
  size = 24,
  activeColor = "#facc15",
  value = 0,
  readOnly = false,
  onChange,
}) {
  const displayValue = value || 0;

  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1;
        let icon;

        if (displayValue >= starValue) {
          icon = <TiStarFullOutline size={size} color={activeColor} />;
        } else if (displayValue >= starValue - 0.5) {
          icon = <TiStarHalfOutline size={size} color={activeColor} />;
        } else {
          icon = <TiStarOutline size={size} color={activeColor} />;
        }

        return (
          <span
            key={index}
            className={readOnly ? "cursor-default" : "cursor-pointer"}
            // ⭐️ add this:
            onClick={() => {
              if (!readOnly && onChange) onChange(starValue);
            }}
            
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}


export default RatingStars;

