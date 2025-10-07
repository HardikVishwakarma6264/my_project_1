// import React, { useEffect, useState } from "react";
// import Hard_img from "../../../../images/hard_img.jpg";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import { NavbarLinks } from "../../../../data/navbar-link";
// import { useSelector } from "react-redux";
// import { FaAngleDown } from "react-icons/fa6";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import Profiledropdown from "../../Auth/Profiledropdown";
// import { apiconnector } from "../../../../services/apiconnector";
// import { categories } from "../../../../services/apis";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.auth);
//   const { totalitem } = useSelector((state) => state.cart);

//   const [categoriesData, setCategoriesData] = useState([]);

//   const fetchCategories = async () => {
//     try {
//       const result = await apiconnector("GET", categories.CATEGORIES_API);
      
//       setCategoriesData(result?.data?.allTags || []);
//     } catch (error) {
//       console.log("Could not fetch category list", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const location = useLocation();
//   const matchroute = (route) => matchPath({ path: route }, location.pathname);

//   return (
//     <div className="flex h-20 items-center justify-center bg-[#131313]">
//       <div className="flex w-[1400px] h-[45px] items-center justify-between px-4">
        
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <Link to="/">
//             <img
//               src={Hard_img}
//               width={40}
//               height={40}
//               loading="lazy"
//               className="rounded-full"
//               alt="Logo"
//             />
//           </Link>
//           <p className="font-bold text-white text-[22px]">HardikNotion</p>
//         </div>

//         {/* Navbar Links */}
//         <nav>
//           <ul className="flex gap-x-12 text-white">
//             {NavbarLinks && NavbarLinks.length > 0 ? (
//               NavbarLinks.map((link, index) => (
//                 <li key={index} className="relative group">
//                   {link.title === "Catalog" ? (
//                     <div className="flex items-center gap-1 cursor-pointer">
//                       <p>{link.title}</p>
//                       <FaAngleDown />
                      
//                       {/* Dropdown */}
//                       <div className="invisible absolute left-0 top-8 flex flex-col rounded-md bg-white text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[250px] shadow-lg z-50">
//                         {/* Arrow */}
//                         <div className="absolute top-[-8px] left-[58px] h-4 w-4 rotate-45 bg-white"></div>
                        
//                         {categoriesData.length > 0 ? (
//                           categoriesData.map((category) => (
//                             <Link
//                               key={category._id}
//                               to={`/catalog/${category.name .split(" ") .join("-") .toLowerCase()}`}
//                               className="px-4 py-2 hover:bg-gray-500"
//                             >
//                               {category.name}
//                             </Link>
//                           ))
//                         ) : (
//                           <p className="px-4 py-2 text-gray-500">No Categories Found</p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link to={link?.path}>
//                       <p
//                         className={`${
//                           matchroute(link?.path)
//                             ? "text-yellow-400"
//                             : "text-white"
//                         }`}
//                       >
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <li>No Links Found</li>
//             )}
//           </ul>
//         </nav>

//         {/* Right side */}
//         <div className="flex gap-4 items-center ml-2">
//           {user && user?.accounttype !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart size={24} color="white"/>
//               {totalitem > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                   {totalitem}
//                 </span>
//               )}
//             </Link>
//           )}

//           {token === null && (
//             <>
//               <Link to="/login">
//   <button className="text-white px-3 py-1 border border-[#f5f0f0] bg-[#262525] rounded-lg 
//                      transform transition-transform duration-300 hover:scale-105">
//     Log in
//   </button>
// </Link>

// <Link to="/signup">
//   <button className="text-white px-3 py-1 border border-[#f5f0f0] bg-[#262525] rounded-lg 
//                      transform transition-transform duration-300 hover:scale-105">
//     Sign Up
//   </button>
// </Link>

//             </>
//           )}

//           {token !== null && <Profiledropdown />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useEffect, useState } from "react";
import Hard_img from "../../../../images/hard_img.jpg";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../../../data/navbar-link";
import { useSelector } from "react-redux";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Profiledropdown from "../../Auth/Profiledropdown";
import { apiconnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { totalitem } = useSelector((state) => state.cart);

  const [categoriesData, setCategoriesData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      setCategoriesData(result?.data?.allTags || []);
    } catch (error) {
      console.log("Could not fetch category list", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const location = useLocation();
  const matchroute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div className="flex h-20 items-center justify-center bg-[#131313]">
      <div className="flex max-w-7xl w-full h-[45px] items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={Hard_img}
              width={40}
              height={40}
              loading="lazy"
              className="rounded-full"
              alt="Logo"
            />
          </Link>
          <p className="font-bold text-white text-[20px]">HardikNotion</p>
        </div>

        {/* Desktop Navbar Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 cursor-pointer">
                    <p>{link.title}</p>
                    <FaAngleDown />

                    {/* Dropdown */}
                    <div className="invisible absolute left-0 top-8 flex flex-col rounded-md bg-white text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[220px] shadow-lg z-50">
                      {categoriesData.length > 0 ? (
                        categoriesData.map((category) => (
                          <Link
                            key={category._id}
                            to={`/catalog/${category.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-gray-500">
                          No Categories Found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchroute(link?.path)
                          ? "text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex gap-4 items-center ml-2">
          {user && user?.accounttype !== "Instructor" && (
            <Link to="/dashboard/purchase-history" className="relative">
              <AiOutlineShoppingCart size={24} color="white" />
              {totalitem > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalitem}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="text-white px-3 py-1 border border-gray-300 bg-[#262525] rounded-lg hover:scale-105 transition">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-white px-3 py-1 border border-gray-300 bg-[#262525] rounded-lg hover:scale-105 transition">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <Profiledropdown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white text-2xl">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#1f1f1f] text-white flex flex-col items-center py-6 gap-6 md:hidden z-50">
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="flex flex-col items-center">
                  <p className="flex items-center gap-1">
                    {link.title} <FaAngleDown />
                  </p>
                  <div className="flex flex-col mt-2 bg-white text-black rounded-md shadow-md w-56">
                    {categoriesData.length > 0 ? (
                      categoriesData.map((category) => (
                        <Link
                          key={category._id}
                          to={`/catalog/${category.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          className="px-4 py-2 hover:bg-gray-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500">
                        No Categories Found
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  to={link?.path}
                  className={`${
                    matchroute(link?.path) ? "text-yellow-400" : "text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Right Side */}
          <div className="flex gap-4 items-center">
            {user && user?.accounttype !== "Instructor" && (
              <Link to="/dashboard/purchase-history" className="relative">
                <AiOutlineShoppingCart size={24} color="white" />
                {totalitem > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalitem}
                  </span>
                )}
              </Link>
            )}

            {token === null ? (
              <>
                <Link to="/login">
                  <button className="text-white px-3 py-1 border border-gray-300 bg-[#262525] rounded-lg">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="text-white px-3 py-1 border border-gray-300 bg-[#262525] rounded-lg">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <Profiledropdown />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
