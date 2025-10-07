// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { buycourse } from "../../../services/operations/studentfeatureapi";

// const RenderTotalAmount = () => {
//   const { total, cart } = useSelector((state) => state.cart);
//   const {token,user}=useSelector((state)=>state.auth);
//   const navigate=useNavigate();
//   const dispatch=useDispatch();
  

//   const handlebuycourse = () => {
//     const courses = cart.map((course) => course._id);

// buycourse({
//   courses,
//   token,
//   userdetail: user,   // match the expected param name
//   navigate,
//   dispatch,
// });
    
//   };

//   return (
//     <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
//       <p className="text-xl mb-3">Total:</p>
//       <p className="text-3xl font-bold text-yellow-400">Rs. {total}</p>
//       <p className="line-through text-gray-500 mt-1">Rs. {total + 1000}</p>

//       <button
//         onClick={handlebuycourse}
//         className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg mt-5 hover:bg-yellow-500 transition"
//       >
//         Buy Now
//       </button>
//     </div>
//   );
// };

// export default RenderTotalAmount;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buycourse } from "../../../services/operations/studentfeatureapi";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlebuycourse = () => {
    const courses = cart.map((course) => course._id);
    buycourse({ courses, token, userdetail: user, navigate, dispatch });
  };

  return (
    <div
      className="
        bg-gray-900 p-6 sm:p-8
        rounded-xl shadow-lg text-white
        w-full
      "
    >
      <p className="text-lg sm:text-xl mb-2">Total:</p>
      <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
        ₹ {total}
      </p>
      <p className="line-through text-gray-500 mt-1">₹ {total + 1000}</p>

      <button
        onClick={handlebuycourse}
        className="
          w-full mt-5
          bg-yellow-400 hover:bg-yellow-500
          text-black font-bold py-3 rounded-lg
          transition
        "
      >
        Buy Now
      </button>
    </div>
  );
};

export default RenderTotalAmount;

