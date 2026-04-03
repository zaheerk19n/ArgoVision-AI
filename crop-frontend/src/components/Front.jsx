import React from "react";

const Front = () => {
  return (
    <div className="flex items-end justify-center">
    <div className="flex flex-col items-center justify-center bg-(--bg) text-(--text) px-6 md:px-16 lg:px-24 gap-8 ">
      
      {/* Text Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-(--primary-color)">
          Welcome to AgroVision AI
        </h1>
        <p className="text-lg md:text-xl text-(--secondary-color)">
          Your smart crop disease prediction and guidance system
        </p>
        <h2 className="text-2xl md:text-4xl font-semibold text-(--primary-color)">
          Discover, Predict & Protect
        </h2>
        <p className="text-base md:text-lg text-(--text)">
          Explore our dashboard, guides, and disease library to make smarter
          farming decisions.
        </p>

        {/* Optional CTA */}
        <button className="mt-6 px-6 py-3 rounded-full bg-(--secondary-color) text-white hover:bg-(--primary-color) transition-colors duration-300">
          Get Started
        </button>
      </section>
    <hr className="border-t border-green-900 my-8 w-full " />
    </div>
    <div className="flex flex-col items-center justify-center bg-(--bg) text-(--text) ">
        <img 
            src="/advisor.png" 
            alt="Herobot" 
            className="transition-transform duration-300 hover:-rotate-4 mt-6"/>
        <hr className="border-t border-green-900 my-8 w-3/4 " />
    </div>
    </div>
  );
};

export default Front;
