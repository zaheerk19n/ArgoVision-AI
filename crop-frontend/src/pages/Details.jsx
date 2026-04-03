import React from "react";
import Sidebar from "../components/Sidebar";

const Details = () => {
  const user = {
    name: "Zaheer Khan",
    email: "zaheer@gmail.com",
    phone: "+91 98765 43210",
    location: "Andhra Pradesh, India",
    role: "Farmer",
    joined: "Jan 2026",
    avatar: "/user-avatar.png",
  };

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
          rounded-3xl p-5 md:p-6 mb-6 md:mb-8"
        >
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            User Details
          </h1>

          <p className="text-gray-600 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div
          className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
          rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center"
        >
          {/* AVATAR */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={user.avatar}
                alt="User"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>

          {/* USER INFO */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

            <Detail label="Full Name" value={user.name} />
            <Detail label="Email" value={user.email} />
            <Detail label="Phone" value={user.phone} />
            <Detail label="Location" value={user.location} />
            <Detail label="Role" value={user.role} />
            <Detail label="Joined On" value={user.joined} />

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium
            hover:bg-green-600 transition w-full sm:w-auto"
          >
            Edit Profile
          </button>

          <button
            className="px-6 py-2 rounded-xl bg-gray-800 text-white font-medium
            hover:bg-gray-900 transition w-full sm:w-auto"
          >
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
};

/* SMALL REUSABLE COMPONENT */
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default Details;