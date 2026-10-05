import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "User",
    email: "user@agrovision.ai",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200",
  });

  useEffect(() => {
    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      try {
        const savedUser = JSON.parse(savedUserStr);
        setUserInfo((prev) => ({
          ...prev,
          name: savedUser.name || prev.name,
          email: savedUser.email || prev.email,
        }));
      } catch (err) {
        console.error("Error parsing stored user info:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signup");
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full bg-gradient-to-br from-green-300 to-green-700 hover:opacity-90 transition flex items-center justify-center cursor-pointer"
      >
        <img
          src={userInfo.avatar}
          alt="User"
          className="h-9 w-9 md:h-10 md:w-10 rounded-full border-2 border-white object-cover"
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
        absolute right-0 mt-3
        w-48 sm:w-56
        rounded-xl bg-white shadow-xl border border-gray-100
        transition-all duration-200 origin-top-right z-50
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
      >
        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900 truncate">{userInfo.name}</p>
          <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
        </div>

        {/* Menu */}
        <ul className="py-2 text-sm text-gray-700">
          <NavLink to="/dashboard" onClick={() => setOpen(false)}>
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer">
              Dashboard
            </li>
          </NavLink>

          <NavLink to="/usercrops" onClick={() => setOpen(false)}>
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer">
              My Crops
            </li>
          </NavLink>

          <NavLink to="/history" onClick={() => setOpen(false)}>
            <li className="px-4 py-2 hover:bg-green-50 cursor-pointer">
              Scan History
            </li>
          </NavLink>
        </ul>

        {/* Logout */}
        <div className="border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 font-medium transition rounded-b-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;