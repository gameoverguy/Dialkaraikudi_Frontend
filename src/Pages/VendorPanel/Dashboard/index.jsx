import React, { useState, useEffect } from "react";
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
import LottieLoader from "../../../Components/Loader";

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
  const [business, setBusiness] = useState(null);
  const [viewsPeriod, setViewsPeriod] = useState("weekly");
  const [reviewsPeriod, setReviewsPeriod] = useState("weekly");
  const [dashboardData, setDashboardData] = useState({
    views: {
      weekly: { labels: [], data: [], totalViews: 0, totalUniqueViews: 0 },
      monthly: { labels: [], data: [], totalViews: 0, totalUniqueViews: 0 },
      yearly: { labels: [], data: [], totalViews: 0, totalUniqueViews: 0 },
    },
    reviews: {
      weekly: { labels: [], data: [], totalReviews: 0, averageRating: "0.0" },
      monthly: { labels: [], data: [], totalReviews: 0, averageRating: "0.0" },
      yearly: { labels: [], data: [], totalReviews: 0, averageRating: "0.0" },
    },
    favourites: 0
  });
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(
          `${API}/business/dashboard/${businessData?.user_id}`
        );
        console.log(data);

        if (data) {
          setBusiness(data.business);

          // Transform views data to show daily stats
          const transformViewsData = (viewsSummary, period) => {
            const breakdown = viewsSummary?.breakdown || [];
            let labels = [];
            let viewData = [];

            if (breakdown.length > 0) {
              breakdown.forEach((entry) => {
                const date = new Date(entry.date);
                let label = "";

                switch (period) {
                  case "weekly":
                    // Format as "Mon, 24" for weekly view
                    label = date.toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                    });
                    break;
                  case "monthly":
                    // Format as "May 24" for monthly view
                    label = date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    break;
                  case "yearly":
                    // Format as "May 2025" for yearly view
                    label = date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                    break;
                  default:
                    label = date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                }

                labels.push(label);
                viewData.push(entry.totalViews || 0);
              });
            }

            return {
              labels: labels,
              data: viewData,
              totalViews: viewsSummary?.totalViews || 0,
              totalUniqueViews: viewsSummary?.uniqueViews || 0,
            };
          };

          // Transform reviews data to show rating distribution
          const transformReviewsData = (reviewStats) => ({
            labels: ["5★", "4★", "3★", "2★", "1★"],
            data: [
              reviewStats?.ratingBreakdown?.[5] || 0,
              reviewStats?.ratingBreakdown?.[4] || 0,
              reviewStats?.ratingBreakdown?.[3] || 0,
              reviewStats?.ratingBreakdown?.[2] || 0,
              reviewStats?.ratingBreakdown?.[1] || 0,
            ],
            totalReviews: reviewStats?.totalReviews || 0,
            averageRating: Number(reviewStats?.averageRating || 0).toFixed(1),
          });

          setDashboardData({
            views: {
              weekly: transformViewsData(data.views.weekly),
              monthly: transformViewsData(data.views.monthly),
              yearly: transformViewsData(data.views.yearly),
              alltime: transformViewsData(data.views.alltime),
            },
            reviews: {
              weekly: transformReviewsData(data.reviews.reviewStatsWeekly),
              monthly: transformReviewsData(data.reviews.reviewStatsMonthly),
              yearly: transformReviewsData(data.reviews.reviewStatsYearly),
            },
            favourites: data.favourites || 0
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (businessData?.user_id) {
      fetchDashboardData();
    }
  }, [businessData]);

  const viewsChartData = {
    labels: dashboardData.views[viewsPeriod]?.labels || [],
    datasets: [
      {
        label: "Daily Views",
        data: dashboardData.views[viewsPeriod]?.data || [],
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };

  const reviewsChartData = {
    labels: dashboardData.reviews[reviewsPeriod]?.labels || [],
    datasets: [
      {
        data: dashboardData.reviews[reviewsPeriod]?.data || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const PeriodSelector = ({ period, setPeriod }) => (
    <div className="flex gap-2 mb-4">
      {["weekly", "monthly", "yearly"].map((value) => (
        <button
          key={value}
          onClick={() => setPeriod(value)}
          className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
            period === value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </button>
      ))}
    </div>
  );
  if (loading) {
    return (
      <div>
        <LottieLoader />
      </div>
    );
  }
  return (
    <div className="p-4 bg-gray-50">
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {business?.businessName} Dashboard
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaClock className="text-green-500" />
            <span>
              {(() => {
                const days = [
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ];
                const currentDay = days[new Date().getDay()];
                const timing = business?.businessTimings?.[currentDay];
                const formattedDay =
                  currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
                if (
                  !timing ||
                  !timing.isOpen ||
                  (!timing.openTime && !timing.closeTime)
                ) {
                  return `${formattedDay}: Closed`;
                }
                return `${formattedDay}: Open ${timing.openTime} - ${timing.closeTime}`;
              })()}
            </span>
          </div>
          {business?.verified && (
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" />
              <span>Verified Business</span>
            </div>
          )}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Views</h3>
          <p className="text-3xl font-bold text-blue-600">
            {dashboardData.views[viewsPeriod]?.totalViews || 0}
          </p>
        </div>
        {/* <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Unique Views</h3>
          <p className="text-3xl font-bold text-green-600">
            {dashboardData.views[viewsPeriod]?.totalUniqueViews || 0}
          </p>
        </div> */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Reviews</h3>
          <p className="text-3xl font-bold text-purple-600">
            {business?.reviewCount || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Average Rating
          </h3>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-yellow-600">
              {Number(business?.ratings || 0).toFixed(1)}
            </p>
            <FaStar className="text-yellow-400 ml-2 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Favorites</h3>
          <p className="text-3xl font-bold text-red-600">
            {dashboardData?.favourites || 0}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Views Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Page Views</h2>
          <PeriodSelector period={viewsPeriod} setPeriod={setViewsPeriod} />
          <div className="h-[400px]">
            <Bar
              data={viewsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: `${
                      viewsPeriod.charAt(0).toUpperCase() + viewsPeriod.slice(1)
                    } Views Breakdown`,
                    font: {
                      size: 16,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.label}: ${context.raw} views`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { display: true },
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  x: {
                    grid: { display: false },
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: "easeInOutQuart",
                },
                hover: {
                  mode: "nearest",
                  intersect: true,
                },
              }}
            />
          </div>
        </div>

        {/* Reviews Chart */}
        {(dashboardData.reviews[reviewsPeriod]?.totalReviews > 0 ||
          business?.reviewCount > 0) && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Reviews Distribution
            </h2>
            <PeriodSelector
              period={reviewsPeriod}
              setPeriod={setReviewsPeriod}
            />
            <div className="h-[400px]">
              <Pie
                data={reviewsChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 12,
                        },
                      },
                    },
                    title: {
                      display: true,
                      text: `${
                        reviewsPeriod.charAt(0).toUpperCase() +
                        reviewsPeriod.slice(1)
                      } Rating Distribution`,
                      font: {
                        size: 16,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${context.label}: ${context.raw} reviews`,
                      },
                    },
                  },
                  animation: {
                    duration: 1000,
                    easing: "easeInOutQuart",
                  },
                  hover: {
                    mode: "nearest",
                    intersect: true,
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
