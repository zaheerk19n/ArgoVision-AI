import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("http://localhost:3000/api/history", { headers });
        const data = await res.json();
        if (Array.isArray(data)) {
          setHistoryData(data);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-0 md:ml-64 px-4 md:px-10 pt-10 md:pt-[14vh] pb-10">

        {/* HEADER */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                        rounded-3xl p-5 md:p-6 mb-6 md:mb-8">

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Scan History
          </h1>

          <p className="text-gray-600 text-sm mt-1">
            View all your previous crop disease detections and diagnostic logs
          </p>

        </div>

        {/* TABLE */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                        rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading scan history...</div>
            ) : (
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-white/60">
                  <tr>
                    <th className="p-4 text-gray-700 font-semibold">Crop</th>
                    <th className="p-4 text-gray-700 font-semibold">Disease / Condition</th>
                    <th className="p-4 text-gray-700 font-semibold">Confidence</th>
                    <th className="p-4 text-gray-700 font-semibold">Date</th>
                    <th className="p-4 text-gray-700 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {historyData.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-t border-white/30 hover:bg-white/20 transition"
                    >
                      <td className="p-4 font-semibold text-gray-800">{item.crop}</td>
                      <td className="p-4 text-gray-700">{item.disease}</td>
                      <td className="p-4 text-gray-700 font-medium">
                        {item.confidence ? `${Number(item.confidence).toFixed(1)}%` : "N/A"}
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{item.date}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Healthy"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && historyData.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No scan history records found. Try performing a crop scan!
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default History;