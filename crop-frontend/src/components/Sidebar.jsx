import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const dashLinks = [
    { name: "Home", icon: "/house.svg", path: "/dashboard" },
    { name: "History", icon: "/clock-history.svg", path: "/history" },
    { name: "Crop", icon: "/leaf-fill.svg", path: "/usercrops" },
    { name: "Details", icon: "/person-lines-fill.svg", path: "/details" },
    { name: "Notifications", icon: "/bell.svg", path: "/notify" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="
        hidden md:flex
        fixed left-4 top-1/2 -translate-y-1/2
        bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
        rounded-3xl
        px-4 py-6
        flex-col items-center gap-6
      "
      >
        {dashLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `w-12 h-12 flex items-center justify-center rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-green-200 scale-105"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <img
              src={link.icon}
              alt={link.name}
              className="w-6 h-6 object-contain"
            />
          </NavLink>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <div
        className="
        md:hidden
        fixed bottom-0 left-0 w-full
        bg-white/70 backdrop-blur-xl border-t border-gray-200
        flex justify-around items-center
        py-3 z-50
      "
      >
        {dashLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs
              ${
                isActive
                  ? "text-green-600"
                  : "text-gray-500"
              }`
            }
          >
            <img
              src={link.icon}
              alt={link.name}
              className="w-5 h-5 mb-1"
            />
            {link.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;