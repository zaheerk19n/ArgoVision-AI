import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:3000/api/notifications", { headers });
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      await fetch("http://localhost:3000/api/notifications/read-all", {
        method: "PUT",
        headers,
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-600";
      case "success":
        return "bg-green-100 text-green-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "var(--dash)" }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-0 md:ml-64 px-4 sm:px-6 md:px-10 pt-8 sm:pt-10 md:pt-[14vh] pb-10">

        {/* HEADER */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
          rounded-3xl p-4 sm:p-6 mb-6 md:mb-8
          flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              Notifications & Alerts
            </h1>

            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Real-time alerts and diagnostic updates regarding your crops
            </p>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="px-5 py-2 rounded-xl bg-gray-800 text-white font-medium
            hover:bg-gray-900 transition w-full sm:w-auto cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-gray-600">Loading notifications...</div>
          ) : (
            notifications.map((note, idx) => (
              <div
                key={note.id || idx}
                className={`bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
                rounded-2xl p-4 sm:p-6
                flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3
                ${!note.read ? "ring-2 ring-green-400/40" : ""}`}
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {note.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    {note.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {note.time}
                  </p>
                </div>

                <span
                  className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold w-fit uppercase tracking-wider
                  ${getBadgeStyle(note.type)}`}
                >
                  {note.type}
                </span>
              </div>
            ))
          )}

          {!loading && notifications.length === 0 && (
            <div className="text-center py-16 text-gray-500 bg-white/20 rounded-2xl backdrop-blur-md">
              No notifications available at this time.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Notification;