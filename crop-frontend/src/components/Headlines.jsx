import React, { useState } from "react";

const Headlines = ({ texts = ["Hello! Welcome to AgroVision AI Prediction right now i am trained to predict Tomato disease"], speed = 20 }) => {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <div
      className="overflow-hidden w-full relative bg-green-600 text-white py-2"
      onMouseEnter={() => setStopScroll(true)}
      onMouseLeave={() => setStopScroll(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-green-600 to-transparent" />

      <div
        className="flex w-fit whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: stopScroll ? "paused" : "running",
        }}
      >
        {[...texts, ...texts].map((text, index) => (
          <span key={index} className="mx-8 font-semibold text-lg">
            {text}
          </span>
        ))}
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-green-600 to-transparent" />

      {/* Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Headlines;
