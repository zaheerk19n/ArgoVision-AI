import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import Togglebtn from "./Togglebtn";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Predict Disease", path: "/predict" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Disease Library", path: "/diseases" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${isScrolled ? "py-3 backdrop-blur-md" : "py-4"}`}
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16">

        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2">
          <img
            src="/leaf.png"
            alt="AgroVision AI logo"
            className="h-8 w-8 sm:h-9 sm:w-9 transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="font-bold text-lg sm:text-xl tracking-wide">
            AgroVision AI
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `group flex flex-col text-sm lg:text-base
                hover:text-(--secondary-color)
                ${
                  isActive
                    ? "text-(--secondary-color) font-semibold"
                    : "text-(--text)"
                }`
              }
            >
              {link.name}
              <span className="h-0.5 w-0 bg-current group-hover:w-full transition-all duration-300" />
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <Togglebtn />
          <UserDropdown />
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-3 md:hidden">
          <Togglebtn />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-(--bg) flex flex-col items-center justify-center gap-8 text-xl transition-transform duration-500 md:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-6 right-6 text-3xl"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `hover:text-(--secondary-color)
              ${
                isActive
                  ? "text-(--secondary-color) font-semibold"
                  : "text-(--text)"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {/* Mobile User */}
        <div className="mt-4">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;