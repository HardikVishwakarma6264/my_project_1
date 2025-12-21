

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscMenu, VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { logout } from "../../../services/operations/authapi";
import { sidebarLinks } from "../../../data/dashboard-link";
import Sidebarlink from "./Sidebarlink";
import Confirmationalmodal from "../Homepage/common/Confirmationmodal";
import { RiMenuUnfold3Fill } from "react-icons/ri";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setShowModal(false);
  };

  return (
    <>
      {/* ======= Mobile TOP BAR ======= */}
      <div className="md:hidden flex items-start justify-between bg-[#121212] px-4 py-3  text-white shadow">
        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
        <button onClick={() => setDrawerOpen(true)}>
          <RiMenuUnfold3Fill size={26} />
        </button>
      </div>

      {/* ======= Mobile Drawer Overlay ======= */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ======= Sidebar (desktop fixed + mobile drawer) ======= */}
      <aside
        className={`
          fixed md:static
          top-0 left-0 z-50
          w-64 h-full md:h-[calc(100vh-3.5rem)]
          bg-[#121212]
          transform transition-transform duration-300
          ${drawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Links */}
          <div className="flex-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              if (
                link.type &&
                user?.accounttype?.toLowerCase() !== link.type.toLowerCase()
              )
                return null;
              return <Sidebarlink key={link.id} link={link} />;
            })}
          </div>

          {/* Bottom pinned */}
          <div className="mt-auto border-t border-slate-600 pt-4 pb-6 text-white">
            <Sidebarlink
              link={{
                name: "Settings",
                path: "/dashboard/settings",
                icon: "VscSettingsGear",
              }}
            />
            <div
              onClick={() => setShowModal(true)}
              className="mt-2 flex items-center gap-3 px-8 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-red-600 cursor-pointer transition-all"
            >
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>

      <Confirmationalmodal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;






