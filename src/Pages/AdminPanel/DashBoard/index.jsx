import React, { useState, useEffect } from "react";
import { FaUsers, FaStore, FaList, FaStar } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { API } from "../../../../config/config";
import axios from "axios";
import LottieLoader from "../../../Components/Loader.jsx";

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
  const [timeRange, setTimeRange] = useState("week");
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    businesses: 0,
    categories: 0,
    advertSlots: 0,
    recentReviews: [],
    recentUsers: [],
  });
  const [chartData, setChartData] = useState({
    users: [],
    businesses: [],
    labels: [],
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get(`${API}/admin/dashboard`);

      if (data.success) {
        setStats({
          users: data.data.totalUsers,
          businesses: data.data.totalBusinesses,
          categories: data.data.totalCategories,
          advertSlots: data.data.totalAdvertSlots,
          recentReviews: data.data.recentReviews || [],
          recentUsers: data.data.recentUsers || [],
        });

        const timeRangeKey =
          timeRange === "week"
            ? "weekly"
            : timeRange === "month"
            ? "monthly"
            : "yearly";
        const timeRangeData = data.data[timeRangeKey] || {
          users: [],
          businesses: [],
        };

        // Transform the data for charts
        const transformedData = {
          users: timeRangeData.users.map((item) => ({
            date: item._id,
            count: item.count,
          })),
          businesses: timeRangeData.businesses.map((item) => ({
            date: item._id,
            count: item.count,
          })),
        };

        setChartData({
          users: transformedData.users.map((item) => item.count),
          businesses: transformedData.businesses.map((item) => item.count),
          labels: transformedData.users.map((item) => {
            const date = new Date(item.date);
            return timeRange === "year"
              ? date.toLocaleString("default", { month: "short" })
              : date.toLocaleDateString("default", {
                  month: "short",
                  day: "numeric",
                });
          }),
        });
      }
    } catch (error) {
      console.error(
        "Error fetching dashboard data:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
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
        <div
          className={`p-3 rounded-full ${color.replace(
            "border-l-4",
            "bg-opacity-20"
          )}`}
        >
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const pieChartData = {
    labels: ["Users", "Businesses", "Categories"],
    datasets: [
      {
        data: [stats.users, stats.businesses, stats.categories],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Pink
          "rgba(54, 162, 235, 0.8)", // Blue
          "rgba(255, 206, 86, 0.8)", // Yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Users Growth",
        data: chartData.users,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Business Growth",
        data: chartData.businesses,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Users Growth",
        data: chartData.users,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Business Growth",
        data: chartData.businesses,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  if (isloading) {
    return (
      <div>
        <LottieLoader />
      </div>
    );
  }
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                timeRange === range
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={FaUsers}
          color="border-l-4 border-blue-500"
          menuKey="2"
        />
        <StatCard
          title="Total Businesses"
          value={stats.businesses}
          icon={FaStore}
          color="border-l-4 border-green-500"
          menuKey="3"
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          icon={FaList}
          color="border-l-4 border-purple-500"
          menuKey="categories"
        />
        <StatCard
          title="Ad Slots"
          value={stats.advertSlots}
          icon={FaStar}
          color="border-l-4 border-yellow-500"
          menuKey="ads"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Distribution
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Growth Trends
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <Bar
              data={barChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { display: true },
                  },
                  x: {
                    grid: { display: false },
                  },
                },
                plugins: {
                  legend: { position: "top" },
                },
                barThickness: 30,
                maxBarThickness: 40,
                categoryPercentage: 0.8,
                barPercentage: 0.9,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 h-[600px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Users
          </h2>
          <div className="space-y-4 flex-1 overflow-y-auto">
            {stats.recentUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {stats.recentReviews.map((review) => (
              <div key={review._id} className="border-b last:border-b-0 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {review.business.businessName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      by {review.user.name}
                    </p>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-yellow-700">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.createdAt).toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
