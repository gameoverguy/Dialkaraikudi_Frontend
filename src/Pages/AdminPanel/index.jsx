import React, { useState } from 'react';
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

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [expandedMenus, setExpandedMenus] = useState([]);

  const settingsItems = [
    { key: 'platform', label: 'Platform Info' },
    { key: 'gateway', label: 'Gateway Configuration' },
  ];

  const organizationItems = [
    { key: 'roles', label: 'Role Assignment' },
    { key: 'categories', label: 'Categories/Subcategories' },
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
      key: '3',
      icon: <MdSecurity size={20} />,
      label: 'Admin Management',
    },
    {
      key: '4',
      icon: <MdBusiness size={20} />,
      label: 'Business Management',
    },
    {
      key: '5',
      icon: <MdRateReview size={20} />,
      label: 'Review Management',
    },
    {
      key: '6',
      icon: <MdSettings size={20} />,
      label: 'Settings',
      children: settingsItems,
    },
    {
      key: '7',
      icon: <MdFolder size={20} />,
      label: 'Organizational Units',
      children: organizationItems,
    },
  ];

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const toggleSubmenu = (key) => {
    setExpandedMenus(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const renderMenuItem = (item) => {
    const isSelected = selectedKey === item.key;
    const isExpanded = expandedMenus.includes(item.key);

    return (
      <div key={item.key}>
        <div 
          className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 
            ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
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
        {!collapsed && item.children && isExpanded && (
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`bg-white shadow-lg transition-all duration-300 relative
        ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="p-4">
          <div className="bg-gray-900 text-white h-12 rounded-lg flex items-center justify-center font-bold">
            {!collapsed ? 'ADMIN PANEL' : 'AP'}
          </div>
        </div>
        
        <div className="mt-4 space-y-1 px-2">
          {menuItems.map(renderMenuItem)}
        </div>

        <div 
          className="absolute bottom-4 w-full flex justify-center cursor-pointer p-2 hover:bg-gray-100 transition-all duration-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MdChevronRight size={20} /> : <MdChevronLeft size={20} />}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm"></header>
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-120px)]">
            Content for {menuItems.find(item => item.key === selectedKey)?.label}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;