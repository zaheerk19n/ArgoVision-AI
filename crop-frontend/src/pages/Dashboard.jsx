import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col md:flex-row"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR COMPONENT */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex flex-1 flex-col md:flex-row justify-end items-center md:items-start">

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
              placeholder="Search..."
              className="w-full outline-none bg-transparent text-gray-700 text-sm md:text-base"
            />
          </div>

          {/* IMAGE */}
          <div className="overflow-hidden w-[90%] md:w-[43vw] mt-6 rounded-3xl">

            <img
              src="/Screenshot 2026-01-18 065213.png"
              alt="plant"
              className="w-full h-[220px] md:h-full object-cover"
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
          <div className="w-[90%] md:w-[29vw] h-[160px] md:h-[27vh] mt-4 rounded-3xl bg-[#8cff66] shadow-lg p-5 flex flex-col justify-between">

            <h3 className="text-sm font-semibold text-gray-700">
              Plants Monitored
            </h3>

            <div className="text-3xl font-bold text-gray-900">
              1,248
            </div>

            <p className="text-xs text-gray-700">
              +12% from last week
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-white w-[90%] md:w-[29vw] h-[160px] md:h-[27vh] mt-4 rounded-3xl shadow-lg p-5 flex flex-col justify-between">

            <h3 className="text-sm font-semibold text-gray-600">
              Diseases Detected
            </h3>

            <div className="text-3xl font-bold text-gray-800">
              34
            </div>

            <p className="text-xs text-red-500">
              5 new cases today
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-gray-500 text-white w-[90%] md:w-[29vw] h-[160px] md:h-[27vh] mt-4 mb-2 rounded-3xl shadow-lg p-5 flex flex-col justify-between">

            <h3 className="text-sm font-semibold">
              AI Predictions Today
            </h3>

            <div className="text-3xl font-bold">
              212
            </div>

            <p className="text-xs opacity-80">
              Generated using ArgoVision AI
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;