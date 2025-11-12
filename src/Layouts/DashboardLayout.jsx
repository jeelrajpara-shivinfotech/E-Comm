import "flowbite";
import logoDash from "../assets/login-logo.png";
import userAvatar from "../assets/avatar.webp";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { sideBarLinks } from "../common/constants/SideBarConstants";
import { titleConst, titles } from "../common/constants/routeConsts";
import { useEffect, useState, useRef } from "react";
import BaseButton from "../Component/BaseComponents/BaseButton";
import { initFlowbite } from "flowbite";
import { SideBarArrow } from "../assets/svg";
import { dashboardMainConstants } from "../common/constants/dashboardConstants";
import BaseConfirmation from "../Component/BaseComponents/BaseConfirmation";
import { IoIosLogOut } from "react-icons/io";

const DashboardLayout = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const title = titles[path] || titleConst.ecomm;
    document.title = `${title} / ${titleConst.ecomm}`;
  }, [location]);

  useEffect(() => {
    initFlowbite();
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOutClick = () => {
    setIsDropdownOpen(false);
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoading(false);
      setShowSignOutModal(false);
      navigate("/");
    }, 800);
  };

  useEffect(() => {
    import("flowbite");
  }, []);

  return (
    <>
      {/* SIDEBAR */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full md:translate-x-0 bg-white shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-8 py-6 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-8">
            <img src={logoDash} alt="logo" className="" />
          </div>

          <nav className="flex-1 space-y-1">
            {sideBarLinks.map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                className={`flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 lexend ${location.pathname === path
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

      {/* MAIN CONTENT */}
      <main className="md:ml-80 bg-gray-50 min-h-screen shadow-sm border-l-2 border-gray-100">
        <nav className="flex items-center justify-between lg:px-8 px-4">
          <div className="flex items-center gap-4">
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">{dashboardMainConstants.openSideBar}</span>
              <SideBarArrow />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="inline-flex items-center cursor-pointer py-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  focus:outline-none"
              >
                <img
                  src={userAvatar}
                  alt="User avatar"
                  className="w-9 h-9 rounded-full border border-gray-200"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 w-32 bg-white rounded-lg shadow-md py-2 border border-gray-100 z-50">
                  <BaseButton
                    onClick={handleSignOutClick}
                    customIcon={<IoIosLogOut className="h-5 w-5 text-red-600"/>}
                    iconPosition="left"
                    className=" bg-transparent text-black hover:bg-gray-50"
                    textColor="black"
                  >
                    {dashboardMainConstants.signOut}
                  </BaseButton>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* MAIN PAGE CONTENT */}
        <div className="px-2">
          <Outlet />
        </div>
      </main>
      <BaseConfirmation
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleConfirmSignOut}
        title={dashboardMainConstants.signOut}
        description= {dashboardMainConstants.signOutConfirmation}
        confirmText={loading ? dashboardMainConstants.confirmationButton: dashboardMainConstants.confirmationButton}
        loading={loading}
      />
    </>
  );
};

export default DashboardLayout;
