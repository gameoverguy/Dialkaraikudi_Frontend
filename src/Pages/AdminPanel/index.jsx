import React, { useState, useEffect } from "react";
import {
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdSettings,
  MdFolder,
  MdExpandLess,
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight,
  MdLogout,
  MdNotificationAdd,
} from "react-icons/md";
import UserManagement from "./UserMangement";
import CategoryManagement from "./OrganizationMaterial/Category";
import BusinessManagement from "./BussinessManagement";
import DashBoard from "./DashBoard";
import logo from "../../assets/bulb.png";
import logo1 from "../../assets/logo_01.png";
import HomePage from "./Advertisment/HomePage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config/config";
import Notification from "./Advertisment/Notification";

// Placeholder components - Replace these with your actual components
const PlatformInfo = () => <div>Platform Info Content</div>;
const GatewayConfig = () => <div>Gateway Configuration Content</div>;

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(() => {
    // Get the saved menu item from localStorage or default to '1' (Dashboard)
    return localStorage.getItem("selectedMenuItem") || "1";
  });
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setCollapsed(true);
      }
    };

    // Initial check
    handleResize();
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settingsItems = [
    { key: "platform", label: "Platform Info" },
    { key: "gateway", label: "Gateway Configuration" },
  ];

  const organizationItems = [{ key: "categories", label: "Categories" }];

  const advertisementItems = [{ key: "ads", label: "Ads" },
    {key: "notification", label: "Notification"}
  ];

  

  const menuItems = [
    {
      key: "1",
      icon: <MdDashboard size={20} />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <MdPeople size={20} />,
      label: "User Management",
    },
    {
      key: "5",
      icon: <MdFolder size={20} />,
      label: "Organizational Units",
      children: organizationItems,
    },
    {
      key: "3",
      icon: <MdBusiness size={20} />,
      label: "Business Management",
    },
    // {
    //   key: "4",
    //   icon: <MdSettings size={20} />,
    //   label: "Settings",
    //   children: settingsItems,
    // },
    {
      key: "6",
      icon: <MdSettings size={20} />,
      label: "Advertisement",
      children: advertisementItems,
    },
   
  ];

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    // Save the selected menu item to localStorage
    localStorage.setItem("selectedMenuItem", key);

    // Close any open submenu if clicking a non-submenu item
    if (
      !menuItems.find((item) =>
        item.children?.some((child) => child.key === key)
      )
    ) {
      setExpandedMenu(null);
    }
  };

  // Update the handleMenuSelect function
  const handleMenuSelect = (key) => {
    setSelectedKey(key);
    localStorage.setItem("selectedMenuItem", key);
    if (key === "categories") {
      setExpandedMenu("5"); // Open the Organizational Units submenu
    }
  };
  const toggleSubmenu = (key) => {
    // Close other submenus when opening a new one
    if (key !== expandedMenu) {
      setExpandedMenu(key);
    } else {
      setExpandedMenu(null);
    }
  };

  const renderMenuItem = (item) => {
    const isSelected = selectedKey === item.key;
    const isExpanded = expandedMenu === item.key;
    const hasSelectedChild = item.children?.some(
      (child) => child.key === selectedKey
    );
  
    return (
      <div key={item.key}>
        <div
          className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-500 ease-in-out 
            ${isSelected ? "bg-[#0A8A3D]/10 text-[#0A8A3D]" : hasSelectedChild ? "" : "hover:bg-[#9effc5]"}`}
          onClick={() =>
            item.children ? toggleSubmenu(item.key) : handleMenuClick(item.key)
          }
        >
          <span
            className={`flex items-center ${isSelected ? "text-[#0A8A3D]" : "text-[#F7941D]"}`}
          >
            {item.icon}
          </span>
          <span className={`ml-3 flex-1 ${collapsed ? "hidden group-hover:block" : "block"}`}>
            {item.label}
          </span>
          {item.children && (
            <span
              className={`flex items-center transition-transform duration-1000 ease-in-out transform ${isExpanded ? "rotate-180" : ""} ${collapsed ? "hidden group-hover:block" : "block"}`}
            >
              <MdExpandMore size={20} />
            </span>
          )}
        </div>
        {item.children && (isExpanded || hasSelectedChild) && (
          <div
            className={`mt-1 overflow-hidden transition-all duration-1000 ease-in-out transform origin-top ${collapsed ? "hidden group-hover:block" : "block"}`}
            style={{
              maxHeight: isExpanded ? "500px" : "0",
              opacity: isExpanded ? 1 : 0,
              transform: `scaleY(${isExpanded ? 1 : 0})`,
            }}
          >
            {item.children.map((subItem) => (
              <div
                key={subItem.key}
                className={`py-2 px-12 rounded-md cursor-pointer text-sm transition-all duration-1000 ease-in-out
                  ${selectedKey === subItem.key ? "bg-[#0A8A3D]/10 text-[#0A8A3D]" : "hover:bg-gray-100"}
                  transform hover:translate-x-2`}
                onClick={() => handleMenuClick(subItem.key)}
              >
                {subItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Update the collapse button styles
  <div
    className="transition-all duration-200"
    onClick={() => setCollapsed(!collapsed)}
  >
    {collapsed ? (
      <MdChevronRight
        size={20}
        className="bg-[#0A8A3D] text-white rounded-2xl text-2xl cursor-pointer p-1"
      />
    ) : (
      <MdChevronLeft
        size={20}
        className="bg-[#F7941D] text-white rounded-2xl text-2xl cursor-pointer p-1"
      />
    )}
  </div>;

  const componentMap = {
    1: <DashBoard onMenuSelect={handleMenuSelect} />,
    2: <UserManagement />,
    3: <BusinessManagement />,
    platform: <PlatformInfo />,
    gateway: <GatewayConfig />,
    categories: <CategoryManagement />,
    ads: <HomePage />,
    notification: <Notification />,
  };

  // Get the current component based on selected key
  const getCurrentComponent = () => {
    return componentMap[selectedKey] || <div>Select a menu item</div>;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    const clearAuthentication = async () => {
      try {
        const response = await axios.post(`${API}/authentication/logout`, {
          withCredentials: true, // needed to send cookies
        });

        console.log(response.data);

        if (response.data.success) {
          localStorage.removeItem("userData");
          localStorage.removeItem("businessData");
          localStorage.removeItem("adminData");
          localStorage.setItem("selectedMenuItem", "1");
          navigate("/adminlogin");
        }
      } catch (error) {
        console.log(error);
      }
    };

    clearAuthentication();
    localStorage.setItem("selectedMenuItem", "1");
    navigate("/adminlogin");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-scroll">
      {/* Sidebar - Fixed position */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-20
        ${collapsed ? "w-20 group hover:w-64" : "w-64"} `}
      >
        <div
          className={`p-4 flex ${collapsed ? "flex-col gap-5 items-center group-hover:flex-row group-hover:justify-between" : "justify-between items-center"}`}
        >
          <div>
            {!collapsed ? (
              <img src={logo1} className="h-14" />
            ) : (
              <div className="group-hover:hidden">
                <img src={logo} className="h-14" />
              </div>
            )}
            {collapsed && (
              <div className="hidden group-hover:block">
                <img src={logo1} className="h-14" />
              </div>
            )}
          </div>
          <div
            className="transition-all duration-200"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <MdChevronRight
                size={20}
                className="bg-[#0A8A3D] text-white rounded-2xl text-2xl cursor-pointer"
              />
            ) : (
              <MdChevronLeft
                size={20}
                className="bg-[#F7941D] text-white rounded-2xl text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="space-y-1 px-2 h-[calc(100vh-170px)] overflow-y-auto">
          {menuItems.map(renderMenuItem)}
        </div>

        <div
          className={`border-t ${collapsed ? "mt-0" : "mt-6"} border-gray-200`}
        >
          <button
            onClick={handleLogout}
            className={`w-full cursor-pointer flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 ${collapsed ? "justify-center group-hover:justify-start" : ""}`}
          >
            <MdLogout size={20} />
            {(!collapsed || (collapsed && "group-hover:block")) && <span className="ml-3"></span>}
          </button>
        </div>
      </div>

      {/* Main content wrapper */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen
        ${collapsed ? "ml-20" : "ml-64"}`}
      >
        {/* Fixed header */}
        <header
          className="fixed top-0 right-0 z-10 h-16 bg-white shadow-sm z-0 transition-all duration-300"
          style={{
            left: collapsed ? "80px" : "256px",
          }}
        ></header>

        {/* Scrollable main content */}
        <main className="flex-1 p-6 mt-16 relative h-[calc(100vh-4rem)]">
          <div className="">{getCurrentComponent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
