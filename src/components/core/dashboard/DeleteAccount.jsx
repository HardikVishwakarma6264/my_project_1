// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deleteAccount } from "../../../services/operations/authapi";
// import { MdDeleteSweep } from "react-icons/md";

// const DeleteAccount = () => {
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();

//   const handleDelete = () => {
//     dispatch(deleteAccount());
//     setShowModal(false);
//   };

//   return (
//     <div className="bg-red-800 text-white p-4 rounded-2xl w-[1050px] mt-[35px] flex items-center justify-center ">
//       <div className=" h-[170px] w-[850px]  flex flex-row  gap-4 ">
//         <div>
//         <MdDeleteSweep  className="h-[120px] w-[120px] mt-4"/>
//         </div>
//         <div>
//       <h2 className="text-[28px] font-bold">Delete Account</h2>
//       <p className="text-[16px] mt-2">
//         Would you like to delete account?<br/> This account may contain Paid Courses.<br/>
//         Deleting your account is permanent and will remove all the content associated with it.
//       </p>
//       <button
//   className="text-red-400 underline mt-1 
//              transition-all duration-300 
//              hover:text-white hover:bg-red-500
//              hover:scale-110 hover:shadow-lg 
//              px-3 py-2 rounded-xl"
//   onClick={() => setShowModal(true)}
// >
//   I want to delete my account.
// </button>
// </div>


//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg text-black">
//             <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
//             <p>Are you sure you want to delete your account permanently?</p>
//             <div className="flex gap-4 mt-4">
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//                 onClick={handleDelete}
//               >
//                 Confirm
//               </button>
//               <button
//                 className="bg-gray-400 px-4 py-2 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default DeleteAccount;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../services/operations/authapi";
import { MdDeleteSweep } from "react-icons/md";

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAccount());
    setShowModal(false);
  };

  return (
    <div className="bg-red-800 text-white p-4 rounded-2xl w-full">
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
        <MdDeleteSweep className="h-24 w-24" />
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">Delete Account</h2>
          <p>
            Deleting your account is permanent and will remove all associated
            content.
          </p>
          <button
            className="text-red-400 underline mt-2 hover:text-white hover:bg-red-500 px-3 py-1 rounded transition"
            onClick={() => setShowModal(true)}
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-black w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete your account permanently?</p>
            <div className="flex gap-4 mt-4 justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

