import React, { useState, useEffect } from 'react';
import { FaUsers, FaStore, FaList, FaStar } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = ({ onMenuSelect }) => {
  const [timeRange, setTimeRange] = useState('week');
  const navigate = useNavigate();
  
  // Mock data for different time ranges
  const mockData = {
    week: {
      users: [20, 25, 30, 35, 40, 45, 50],
      businesses: [5, 7, 8, 10, 12, 15, 18],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      users: [50, 60, 75, 90, 120],
      businesses: [15, 20, 25, 30, 35],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
    },
    year: {
      users: [100, 150, 200, 250, 300, 350],
      businesses: [30, 45, 60, 75, 90, 105],
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov']
    }
  };

  // Static stats
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

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const fetchChartData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/statistics/${timeRange}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const getCurrentData = () => mockData[timeRange];

  const pieChartData = {
    labels: ['Users', 'Businesses', 'Categories'],
    datasets: [{
      data: [stats.users, stats.businesses, stats.categories],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    labels: getCurrentData().labels,
    datasets: [
      {
        label: 'Users Growth',
        data: getCurrentData().users,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Business Growth',
        data: getCurrentData().businesses,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded ${
              timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded ${
              timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded ${
              timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Year
          </button>
        </div>
      </div>

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Growth Trends</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Line 
              data={lineChartData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          </div>
        </div>
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