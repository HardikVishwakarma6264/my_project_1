// // components/core/dashboard/PurchaseHistory.jsx
// import React from "react";
// import RenderCartCourses from "../cart/RenderCartCourses";
// import RenderTotalAmount from "../cart/RenderTotalAmount";
// import { useSelector } from "react-redux";

// const PurchaseHistory = () => {
//   const { total, totalItems } = useSelector((state) => state.cart);
//   return (
//     <div className="text-white w-11/12 max-w-5xl mx-auto mt-8">
//       <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
//       <p className="text-lg mb-6">{totalItems} Courses in Cart</p>

//       {total > 0 ? (
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="flex-1 space-y-4">
//             <RenderCartCourses />
//           </div>
//           <div className="w-full lg:w-1/3">
//             <RenderTotalAmount />
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-400">Your Cart is Empty</p>
//       )}
//     </div>
//   );
// };

// export default PurchaseHistory;

// components/core/dashboard/PurchaseHistory.jsx
import React from "react";
import RenderCartCourses from "../cart/RenderCartCourses";
import RenderTotalAmount from "../cart/RenderTotalAmount";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="w-11/12 max-w-5xl mx-auto mt-6 text-white">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
        Your Cart
      </h1>
      <p className="text-base md:text-lg mb-4 md:mb-6">
        {totalItems} Courses in Cart
      </p>

      {total > 0 ? (
        <div
          className="
            flex flex-col gap-6
            lg:flex-row
          "
        >
          {/* Cart Courses List */}
          <div className="flex-1 space-y-4">
            <RenderCartCourses />
          </div>

          {/* Total Amount Panel */}
          <div
            className="
              w-full
              sm:w-3/4
              md:w-2/3
              lg:w-1/3
              flex-shrink-0
            "
          >
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center md:text-left">
          Your Cart is Empty
        </p>
      )}
    </div>
  );
};

export default PurchaseHistory;

