import React from "react";
import Sidebar from "../components/Sidebar";

const History = () => {
  const historyData = [
    { id: 1, crop: "Tomato", disease: "Leaf Blight", date: "18 Jan 2026", status: "Detected" },
    { id: 2, crop: "Potato", disease: "Healthy", date: "16 Jan 2026", status: "No Issue" },
    { id: 3, crop: "Chilli", disease: "Leaf Curl", date: "14 Jan 2026", status: "Detected" },
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
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                        rounded-3xl p-5 md:p-6 mb-6 md:mb-8">

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            History
          </h1>

          <p className="text-gray-600 text-sm mt-1">
            View all previous crop disease detections
          </p>

        </div>

        {/* TABLE */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                        rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left min-w-[500px]">

              <thead className="bg-white/60">
                <tr>
                  <th className="p-4 text-gray-700 font-semibold">Crop</th>
                  <th className="p-4 text-gray-700 font-semibold">Disease</th>
                  <th className="p-4 text-gray-700 font-semibold">Date</th>
                  <th className="p-4 text-gray-700 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {historyData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/30 hover:bg-white/20 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">{item.crop}</td>
                    <td className="p-4 text-gray-700">{item.disease}</td>
                    <td className="p-4 text-gray-600">{item.date}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          item.status === "Detected"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default History;