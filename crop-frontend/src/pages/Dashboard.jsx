import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [stats, setStats] = useState({
    plantsMonitored: 1248,
    diseasesDetected: 34,
    aiPredictionsToday: 212,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch("http://localhost:3000/api/dashboard/stats", { headers });
        const data = await res.json();
        if (data) {
          setStats((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      className="w-full min-h-screen flex flex-col md:flex-row"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR COMPONENT */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex flex-1 flex-col md:flex-row justify-end items-center md:items-start ml-0 md:ml-64 px-4 md:px-8">

        {/* LEFT AREA */}
        <div className="flex flex-col items-center md:items-end w-full md:w-auto md:mr-5">

          {/* SEARCH BAR */}
          <div
            className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
            mt-10 md:mt-[14vh]
            w-[90%] md:w-[43vw]
            h-[55px] md:h-[8vh]
            rounded-3xl flex items-center px-4 md:px-6"
          >
            <img src="/search.svg" alt="search" className="w-5 md:w-6 mr-3" />

            <input
              type="text"
              placeholder="Search crops, disease metrics..."
              className="w-full outline-none bg-transparent text-gray-700 text-sm md:text-base"
            />
          </div>

          {/* IMAGE BANNER */}
          <div className="overflow-hidden w-[90%] md:w-[43vw] mt-6 rounded-3xl shadow-lg border border-white/20">
            <img
              src="/Screenshot 2026-01-18 065213.png"
              alt="plant overview"
              className="w-full h-[220px] md:h-[300px] object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800";
              }}
            />
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div
          className="w-full md:w-[30vw]
          flex flex-col items-center
          mt-8 md:mt-[12vh]
          md:mr-[1vw] mb-6"
        >

          {/* CARD 1 */}
          <div className="w-[90%] md:w-[29vw] h-[160px] md:h-[25vh] mt-4 rounded-3xl bg-gradient-to-br from-green-300 to-green-500 shadow-lg p-5 flex flex-col justify-between text-gray-900">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">
              Plants Monitored
            </h3>

            <div className="text-3xl md:text-4xl font-extrabold">
              {stats.plantsMonitored.toLocaleString()}
            </div>

            <p className="text-xs font-medium opacity-90">
              +12% active crop monitoring growth
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/80 backdrop-blur-md w-[90%] md:w-[29vw] h-[160px] md:h-[25vh] mt-4 rounded-3xl shadow-lg p-5 flex flex-col justify-between border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Diseases Detected
            </h3>

            <div className="text-3xl md:text-4xl font-extrabold text-red-600">
              {stats.diseasesDetected.toLocaleString()}
            </div>

            <p className="text-xs text-red-500 font-medium">
              Real-time ML scan diagnostics
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-gray-900 text-white w-[90%] md:w-[29vw] h-[160px] md:h-[25vh] mt-4 mb-2 rounded-3xl shadow-lg p-5 flex flex-col justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-400">
              Total AI Predictions
            </h3>

            <div className="text-3xl md:text-4xl font-extrabold">
              {stats.aiPredictionsToday.toLocaleString()}
            </div>

            <p className="text-xs text-gray-400">
              Powered by AgroVision ML Pipeline
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;