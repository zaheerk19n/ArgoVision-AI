import React from "react";
import Sidebar from "../components/Sidebar";

const UserCrops = () => {
  const userCrops = [
    {
      id: 1,
      name: "Tomato",
      image: "/tomato.png",
      lastChecked: "18 Jan 2026",
      status: "Healthy",
    },
    {
      id: 2,
      name: "Potato",
      image: "/potato.png",
      lastChecked: "16 Jan 2026",
      status: "Disease Detected",
    },
    {
      id: 3,
      name: "Chilli",
      image: "/chilli.png",
      lastChecked: "14 Jan 2026",
      status: "Healthy",
    },
  ];

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64 px-4 md:px-10 pt-10 md:pt-[14vh]">

        {/* HEADER */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
          rounded-3xl p-5 md:p-6 mb-6 md:mb-8
          flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              My Crops
            </h1>

            <p className="text-gray-600 text-sm mt-1">
              Crops added by you and their latest health status
            </p>
          </div>

          <button
            className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium
            hover:bg-green-600 transition w-full md:w-auto"
          >
            + Add Crop
          </button>
        </div>

        {/* CROPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {userCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
              rounded-3xl p-6 hover:scale-[1.02] transition"
            >
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-36 md:h-40 object-contain mb-4"
              />

              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {crop.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Last checked: {crop.lastChecked}
              </p>

              <span
                className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium
                ${
                  crop.status === "Healthy"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {crop.status}
              </span>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 py-2 rounded-xl bg-gray-800 text-white
                  hover:bg-gray-900 transition"
                >
                  View
                </button>

                <button
                  className="flex-1 py-2 rounded-xl bg-green-500 text-white
                  hover:bg-green-600 transition"
                >
                  Scan
                </button>
              </div>
            </div>
          ))}
        </div>

        {userCrops.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            You haven’t added any crops yet
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCrops;