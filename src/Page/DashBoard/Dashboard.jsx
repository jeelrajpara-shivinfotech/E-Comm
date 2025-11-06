import React, { useEffect } from "react";
import "flowbite";
import logo from "../../assets/logo.svg";
import iconText from "../../assets/logo-text.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SideBarArrow } from "../../assets/svg";
import { SideBarLinks } from "../../common/constants/SideBarConstants";

const Dashboard = () => {
  const location = useLocation();
  return (
    <>
      {/* Sidebar Toggle (mobile) */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <SideBarArrow />
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-8 py-6 overflow-y-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 mb-8">
            <img src={logo} alt="logo" className="h-8" />
            <img src={iconText} alt="text" className="h-5" />
          </Link>

          {/* Sidebar Links */}
          <nav className="flex-1 space-y-1">
            {SideBarLinks.map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                className={`flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 ${
                  location.pathname === path
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="sm:ml-80 bg-gray-50 min-h-screen p-8 shadow-sm border-l-2 border-gray-100">
        <div className=" ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
