// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";

// const MyProfile = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   return (
//     <div className="text-white p-6 max-w-4xl mx-auto  h-[700px] mt-[50px]">
//       <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//       {user ? (
//         <div className="space-y-6">
//           {/* Profile Card */}
//           <div className="bg-gray-800 rounded-lg p-6 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <img
//                 src={user.image || "/default-avatar.png"}
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full object-cover border border-gray-600"
//               />
//               <div>
//                 <p className="text-lg font-semibold">
//                   {user.firstname} {user.lastname}
//                 </p>
//                 <p className="text-gray-400">{user.email}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate("/dashboard/settings")}
//               className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition  items-center flex gap-2 flex-row"
//             >
              
//               Edit
//               <FiEdit/>
//             </button>
//           </div>

//           {/* About Section */}
//           <div className="bg-gray-800 rounded-lg p-6 flex justify-between items-start">
//             <div>
//               <h2 className="text-xl font-semibold mb-2">About</h2>
//               <p className="text-gray-400">
//                 {user?.additionaldetail?.about || "Write Something About Yourself"}
                
//               </p>
              
//             </div>
            
//             <button
//               onClick={() => navigate("/dashboard/settings")}
//               className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex flex-row items-center gap-2"
//             >
//               Edit
//               <FiEdit/>
//             </button>
//           </div>

//           {/* Personal Details */}
//           <div className="bg-gray-800 rounded-lg p-6">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">Personal Details</h2>
//               <button
//                 onClick={() => navigate("/dashboard/settings")}
//                 className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex flex-row items-center gap-2"
//               >
//                 Edit
//                 <FiEdit/>
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">First Name:</span>
//     <span className="text-lg font-medium">{user.firstname}</span>
//   </div>
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">Last Name:</span>
//     <span className="text-lg font-medium">{user.lastname}</span>
//   </div>
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">Email:</span>
//     <span className="text-lg font-medium">{user.email}</span>
//   </div>
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">Phone:</span>
//     <span className="text-lg font-medium">{user?.additionaldetail?.contactnumber || "Add Contact Number"}</span>
//   </div>
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">Gender:</span>
//     <span className="text-lg font-medium">{user?.additionaldetail?.gender || "Add Gender"}</span>
//   </div>
//   <div className="flex flex-col">
//     <span className="text-sm text-gray-400">Date of Birth:</span>
//     <span className="text-lg font-medium">{user?.additionaldetail?.dateofbirth || "Add DOB"}</span>
//   </div>
// </div>

//           </div>
//         </div>
//       ) : (
//         <p>No user data found</p>
//       )}
//     </div>
//   );
// };

// export default MyProfile;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="text-white md:p-6 max-w-4xl mx-auto md:mt-12 ">
      <h1 className="md:text-3xl text-2xl font-bold md:mb-6 mb-3">My Profile</h1>

      {user ? (
        <div className="md:space-y-6 space-y-3">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-lg md:p-6 p-2 flex flex-row md:flex-row justify-between items-center md:gap-4 gap-1">
            <div className="flex items-center gap-4">
              <img
                src={user.image || "/default-avatar.png"}
                alt="Profile"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-gray-600 "
              />
              <div>
                <p className="text-lg font-semibold">
                  {user.firstname} {user.lastname}
                </p>
                {/* <p className="text-gray-400 break-all">{user.email}</p> */}
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="bg-yellow-400 text-black md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
            >
              Edit <FiEdit />
            </button>
          </div>



          {/* About Section */}
          <div className="bg-gray-800 rounded-lg md:p-6 p-2 flex  md:flex-row justify-between items-start gap-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-400">
                {user?.additionaldetail?.about || "Write Something About Yourself"}
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="bg-yellow-400 text-black md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center mt-6 md:mt-0  gap-2"
            >
              Edit <FiEdit />
            </button>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-800 rounded-lg md:p-6 p-2">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <h2 className="text-xl font-semibold">Personal Details</h2>
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition  items-center gap-2 hidden md:block"
              >
                Edit <FiEdit />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              {[
                { label: "First Name", value: user.firstname },
                { label: "Last Name", value: user.lastname },
                { label: "Email", value: user.email },
                {
                  label: "Phone",
                  value: user?.additionaldetail?.contactnumber || "Add Contact Number",
                },
                {
                  label: "Gender",
                  value: user?.additionaldetail?.gender || "Add Gender",
                },
                {
                  label: "Date of Birth",
                  value: user?.additionaldetail?.dateofbirth || "Add DOB",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-sm text-gray-400">{item.label}:</span>
                  <span className="text-lg font-medium break-all">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end md:hidden ">
  <button
    onClick={() => navigate("/dashboard/settings")}
    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
  >
    Edit <FiEdit />
  </button>
</div>
          </div>




        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default MyProfile;

