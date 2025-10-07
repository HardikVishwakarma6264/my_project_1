



// import React from "react";
// import { Link } from "react-router-dom";

// const Button = ({ children, active, linkto }) => {
//   return (
//     <Link to={linkto}>
//       <div
//         className={`inline-block text-center text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold
//           ${active
//             ? "bg-yellow-400 text-black hover:bg-yellow-300"
//             : "bg-gray-800 text-white hover:bg-gray-700"}
//           transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
//       >
//         {children}
//       </div>
//     </Link>
//   );
// };

// export default Button;


import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");   // या redux/context से टोकन लें
    if (token) {
      navigate("/dashboard/my-profile");   // टोकन है → डैशबोर्ड
    } else {
      navigate("/signup");      // टोकन नहीं → साइनअप
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block cursor-pointer text-center text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold
        ${active
          ? "bg-yellow-400 text-black hover:bg-yellow-300"
          : "bg-gray-800 text-white hover:bg-gray-700 border-b border-white border-r"}
        transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
    >
      {children}
    </div>
  );
};

export default Button;
