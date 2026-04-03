import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = {
    name: "Zaheer Khan",
    email: "zaheer@email.com",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full bg-gradient-to-br from-green-300 to-green-700 hover:opacity-90 transition"
      >
        <img
          src={user.avatar}
          alt="User"
          className="h-9 w-9 md:h-11 md:w-11 rounded-full border-2 border-white object-cover"
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
        absolute right-0 mt-3
        w-48 sm:w-52
        rounded-xl bg-white shadow-lg border
        transition-all duration-200 origin-top-right
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
      >
        {/* User Info */}
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        {/* Menu */}
        <ul className="py-2 text-sm text-gray-700">
          <NavLink to="/profile">
            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer">
              My Profile
            </li>
          </NavLink>

          <NavLink to="/dashboard">
            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer">
              Dashboard
            </li>
          </NavLink>

          <NavLink to="/settings">
            <li className="px-4 py-2 hover:bg-green-100 cursor-pointer">
              Settings
            </li>
          </NavLink>
        </ul>

        {/* Logout */}
        <div className="border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;