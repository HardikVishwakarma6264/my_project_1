

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col md:flex-row">
        {/* -------- Topbar/Sidebar -------- */}
        <Sidebar />

        {/* -------- Scrollable main content -------- */}
        <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;




