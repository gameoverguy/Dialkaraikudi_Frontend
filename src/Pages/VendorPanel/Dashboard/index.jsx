import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../../config/config";
import {
  FaEdit,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const VendorDashboard = ({ businessData }) => {
  console.log(businessData);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API}/reviews/business/${businessData.user_id}`
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };
    fetchReviews();
  }, [businessData.user_id]);

  // Mock data for views
  const viewsData = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [150, 230, 180, 290, 200, 320, 270],
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [1200, 1500, 1300, 1700],
    },
    yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        5000, 6000, 4500, 7000, 6500, 8000, 7500, 9000, 8500, 7800, 8200, 9500,
      ],
    },
  };

  // Mock data for reviews
  const reviewsData = {
    weekly: {
      labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      data: [25, 15, 8, 4, 2],
    },
    monthly: {
      labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      data: [120, 85, 45, 20, 10],
    },
    yearly: {
      labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      data: [1500, 1000, 500, 200, 100],
    },
  };

  const [viewsPeriod, setViewsPeriod] = useState("weekly");
  const [reviewsPeriod, setReviewsPeriod] = useState("weekly");

  const viewsChartData = {
    labels: viewsData[viewsPeriod].labels,
    datasets: [
      {
        label: "Views",
        data: viewsData[viewsPeriod].data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const reviewsChartData = {
    labels: reviewsData[reviewsPeriod].labels,
    datasets: [
      {
        data: reviewsData[reviewsPeriod].data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Add this before the return statement
  const PeriodSelector = ({ period, setPeriod }) => (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setPeriod("weekly")}
        className={`px-3 py-1 rounded ${
          period === "weekly" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Weekly
      </button>
      <button
        onClick={() => setPeriod("monthly")}
        className={`px-3 py-1 rounded ${
          period === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setPeriod("yearly")}
        className={`px-3 py-1 rounded ${
          period === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Yearly
      </button>
    </div>
  );

  return (
    <div className="p-2">
      <div className="bg-white shadow rounded mb-4 p-4">
        <h1 className="mb-2 text-2xl font-bold ">Dashboard</h1>
        <p>
          The dashboard provides vendors with quick access to Business views and
          customer reviews, helping them monitor engagement, improve service,
          and build trust with potential buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Views Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Page Views</h2>
          <PeriodSelector period={viewsPeriod} setPeriod={setViewsPeriod} />
          <Bar
            data={viewsChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `${
                    viewsPeriod.charAt(0).toUpperCase() + viewsPeriod.slice(1)
                  } Views`,
                },
              },
            }}
          />
        </div>

        {/* Reviews Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Reviews Distribution</h2>
          <PeriodSelector period={reviewsPeriod} setPeriod={setReviewsPeriod} />
          <Pie
            data={reviewsChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `${
                    reviewsPeriod.charAt(0).toUpperCase() +
                    reviewsPeriod.slice(1)
                  } Reviews`,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
