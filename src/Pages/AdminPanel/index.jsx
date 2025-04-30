import React, { useState, useEffect } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdSecurity,
  MdBusiness,
  MdRateReview,
  MdSettings,
  MdFolder,
  MdExpandLess,
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import UserManagement from './UserMangement';
import CategoryManagement from './OrganizationMaterial/Category';
import BusinessManagement from './BussinessManagement';

// Placeholder components - Replace these with your actual components
const Dashboard = () => <div>Dashboard Content</div>;
const PlatformInfo = () => <div>Platform Info Content</div>;
const GatewayConfig = () => <div>Gateway Configuration Content</div>;


const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
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
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settingsItems = [
    { key: 'platform', label: 'Platform Info' },
    { key: 'gateway', label: 'Gateway Configuration' },
  ];

  const organizationItems = [

    { key: 'categories', label: 'Categories' },
  ];

  const menuItems = [
    {
      key: '1',
      icon: <MdDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <MdPeople size={20} />,
      label: 'User Management',
    },
    {
      key: '5',
      icon: <MdFolder size={20} />,
      label: 'Organizational Units',
      children: organizationItems,
    },
    {
      key: '3',
      icon: <MdBusiness size={20} />,
      label: 'Business Management',
    },
    {
      key: '4',
      icon: <MdSettings size={20} />,
      label: 'Settings',
      children: settingsItems,
    },

  ];

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const toggleSubmenu = (key) => {
    setExpandedMenu(expandedMenu === key ? null : key);
  };

  const renderMenuItem = (item) => {
    const isSelected = selectedKey === item.key;
    const isExpanded = expandedMenu === item.key;
    const hasSelectedChild = item.children?.some(child => child.key === selectedKey);

    return (
      <div key={item.key}>
        <div
          className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 
            ${isSelected || hasSelectedChild ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          onClick={() => item.children ? toggleSubmenu(item.key) : handleMenuClick(item.key)}
        >
          <span className="flex items-center">{item.icon}</span>
          {!collapsed && (
            <>
              <span className="ml-3 flex-1">{item.label}</span>
              {item.children && (
                <span className="flex items-center">
                  {isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </span>
              )}
            </>
          )}
        </div>
        {!collapsed && item.children && (isExpanded || hasSelectedChild) && (
          <div className="pl-11 mt-1">
            {item.children.map(subItem => (
              <div
                key={subItem.key}
                className={`py-2 px-3 rounded-md cursor-pointer text-sm transition-all duration-200
                  ${selectedKey === subItem.key ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
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

  // Component mapping object
  const componentMap = {
    '1': <Dashboard />,
    '2': <UserManagement />,
    '3': <BusinessManagement />,
    'platform': <PlatformInfo />,
    'gateway': <GatewayConfig />,
    'categories': <CategoryManagement />
  };

  // Get the current component based on selected key
  const getCurrentComponent = () => {
    return componentMap[selectedKey] || <div>Select a menu item</div>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-scroll">
      {/* Sidebar - Fixed position */}
      <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-10
        ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4">
          <div className="bg-gray-900 text-white h-12 rounded-lg flex items-center justify-center font-bold">
            {!collapsed ? 'ADMIN PANEL' : 'AP'}
          </div>
        </div>

        <div className="mt-4 space-y-1 px-2 h-[calc(100vh-140px)] overflow-y-auto">
          {menuItems.map(renderMenuItem)}
        </div>

        <div
          className="absolute bottom-4 w-full flex justify-center cursor-pointer p-2 hover:bg-gray-100 transition-all duration-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MdChevronRight size={20} /> : <MdChevronLeft size={20} />}
        </div>
      </div>

      {/* Main content wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-h-screen
        ${collapsed ? 'ml-20' : 'ml-64'}`}
      >
        {/* Fixed header */}
        <header className="fixed top-0 right-0 h-16 bg-white shadow-sm z-10 transition-all duration-300"
          style={{
            left: collapsed ? '80px' : '256px'
          }}
        >
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 p-6 mt-16 relative h-[calc(100vh-4rem)]">
          <div className="bg-white rounded-lg shadow-sm p-6 ">
            {getCurrentComponent()}
          </div>
        </main>
      </div>
    </div>
);
};

export default AdminPanel;