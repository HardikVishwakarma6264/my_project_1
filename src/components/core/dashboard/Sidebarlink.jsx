import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const Sidebarlink = ({ link,onClick }) => {
  const location = useLocation();
  const Icon = typeof link.icon === "string" ? Icons[link.icon] : link.icon;

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const isActive = matchRoute(link.path);

  return (
    <NavLink
      to={link.path}
       onClick={onClick}
      className={`group relative flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
        ${isActive ? "bg-red-400 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
      `}
    >
      {/* Left Border Indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[4px] rounded-r-md bg-red-400 transition-all duration-300
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      ></span>

      {/* Icon */}
      {Icon && (
        <Icon
          className={`text-lg transition-all duration-200 ${
            isActive ? "text-white" : "text-gray-400 group-hover:text-red-400"
          }`}
        />
      )}

      {/* Link Name */}
      <span className={`transition-all duration-200 ${isActive ? "font-semibold" : ""}`}>
        {link.name}
      </span>
    </NavLink>
  );
};

export default Sidebarlink;
