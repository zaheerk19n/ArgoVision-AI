import React, { useEffect, useState } from "react";

const Togglebtn = () => {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isChecked]);

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id="toggle"
        className="sr-only"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label
        htmlFor="toggle"
        className={`
          relative inline-flex items-center
          w-14 h-7 md:w-16 md:h-8
          rounded-full cursor-pointer
          transition-colors duration-300
          ${isChecked ? "bg-green-400" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute left-1
            w-5 h-5 md:w-6 md:h-6
            bg-white rounded-full
            transition-transform duration-300
            flex items-center justify-center
            ${isChecked ? "translate-x-7 md:translate-x-8" : ""}
          `}
        >
          <img
            src="/leaf.png"
            alt="theme"
            className="w-3.5 h-3.5 md:w-4 md:h-4"
          />
        </span>
      </label>
    </div>
  );
};

export default Togglebtn;