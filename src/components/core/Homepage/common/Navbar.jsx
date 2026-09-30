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
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);


  const fetchCategories = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      setCategoriesData(result?.data?.allTags || []);
    } catch (error) {
      // console.log("Could not fetch category list", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const location = useLocation();
  const matchroute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div className="flex h-15 md:h-20 items-center justify-center bg-[#131313]">
      <div className="flex max-w-7xl w-full h-[45px] items-center justify-between px-2 md:px-4">
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
          <p className="font-bold text-white text-[20px]">FutureNotion</p>
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


{/* ===== Mobile Overlay ===== */}
{isMobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
    onClick={() => {
      setIsMobileMenuOpen(false);
      setIsCatalogOpen(false);
    }}
  />
)}

{/* ===== Right Side Mobile Drawer ===== */}
<div
  className={`fixed top-0 right-0 h-content w-[60%] max-w-xs bg-[#0a0a0a]
  text-white z-50 transform transition-transform duration-300 ease-in-out
  ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
  md:hidden rounded-l-2xl`}
>
  {/* Close Button */}
  <div className="flex justify-end p-4">
    <button
      onClick={() => {
        setIsMobileMenuOpen(false);
        setIsCatalogOpen(false);
      }}
      className="text-2xl"
    >
      <FaTimes />
    </button>
  </div>

  {/* Links */}
  <div className="flex flex-col items-center gap-5 mt-4">
    {NavbarLinks.map((link, index) => (
      <div key={index}>
        {link.title === "Catalog" ? (
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsCatalogOpen((prev) => !prev)}
              className="flex items-center gap-1 text-lg"
            >
              {link.title}
              <FaAngleDown
                className={`transition-transform ${
                  isCatalogOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCatalogOpen && (
              <div className="mt-3 bg-white text-black rounded-md shadow-md w-44">
                {categoriesData.map((category) => (
                  <Link
                    key={category._id}
                    to={`/catalog/${category.name
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setIsCatalogOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            to={link?.path}
            className={`text-lg ${
              matchroute(link?.path)
                ? "text-yellow-400"
                : "text-white"
            }`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCatalogOpen(false);
            }}
          >
            {link.title}
          </Link>
        )}
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="my-6   h-px bg-gray-700 w-full" />

  {/* Cart + Auth */}
  <div className="flex flex-row justify-center  items-center gap-3 pb-6">
    {user && user?.accounttype !== "Instructor" && (
      <Link
        to="/dashboard/purchase-history"
        onClick={() => setIsMobileMenuOpen(false)}
        className="relative"
      >
        <AiOutlineShoppingCart size={26} />
        {totalitem > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalitem}
          </span>
        )}
      </Link>
    )}

    {token === null ? (
      <>
        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
          <button className="px-4 py-2 bg-[#262525] rounded-lg">
            Log in
          </button>
        </Link>
        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
          <button className="px-4 py-2 bg-[#262525] rounded-lg">
            Sign Up
          </button>
        </Link>
      </>
    ) : (
      <Profiledropdown />
    )}
  </div>



</div>


</div>
  )}


  


export default Navbar;
