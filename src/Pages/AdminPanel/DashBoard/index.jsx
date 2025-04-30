import React from 'react';
import { FaUsers, FaStore, FaList, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onMenuSelect }) => {
  const navigate = useNavigate();
  // Mock data
  const stats = {
    users: 150,
    businesses: 45,
    categories: 12,
    recentReviews: [
      {
        id: 1,
        businessName: "Taj Restaurant",
        userName: "John Doe",
        rating: 4.5,
        comment: "Great food and excellent service!",
        date: "2024-01-15"
      },
      {
        id: 2,
        businessName: "Royal Electronics",
        userName: "Jane Smith",
        rating: 5,
        comment: "Best electronic store in town. Very helpful staff.",
        date: "2024-01-14"
      },
      {
        id: 3,
        businessName: "Fashion Hub",
        userName: "Mike Johnson",
        rating: 4,
        comment: "Good collection but prices are a bit high.",
        date: "2024-01-13"
      }
    ]
  };

  const handleCardClick = (key) => {
    onMenuSelect(key);
  };

  const StatCard = ({ title, value, icon: Icon, color, menuKey }) => (
    <div 
      className={`bg-white rounded-lg shadow-lg p-6 ${color} transform hover:scale-105 transition-transform duration-200 cursor-pointer`}
      onClick={() => handleCardClick(menuKey)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-l-4', 'bg-opacity-20')}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={FaUsers}
          color="border-l-4 border-blue-500"
          menuKey="2"  // corresponds to User Management key
        />
        <StatCard
          title="Total Businesses"
          value={stats.businesses}
          icon={FaStore}
          color="border-l-4 border-green-500"
          menuKey="3"  // corresponds to Business Management key
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          icon={FaList}
          color="border-l-4 border-purple-500"
          menuKey="categories"  // corresponds to Categories key
        />
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {stats.recentReviews.map(review => (
            <div key={review.id} className="border-b last:border-b-0 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{review.businessName}</h3>
                  <p className="text-sm text-gray-600">by {review.userName}</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-1">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;