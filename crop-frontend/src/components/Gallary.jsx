import React, { useState } from "react";

const Gallary = () => {
  const [stopScroll, setStopScroll] = useState(false);

  const cardData = [
    { title: "AI-Powered Crop Advisory", image: "/hero1.png" },
    { title: "Early Disease Detection", image: "/hero2.png" },
    { title: "Smart Yield Prediction", image: "/hero3.png" },
    { title: "Precision Farming Insights", image: "/scanplant.png" },
  ];

  return (
    <>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent" />

        <div
          className="flex w-fit"
          style={{
            animation: `marquee ${cardData.length * 2500}ms linear infinite`,
            animationPlayState: stopScroll ? "paused" : "running",
          }}
        >
          {[...cardData, ...cardData].map((card, index) => (
            <div
              key={index}
              className="w-56 mx-4 h-[20rem] relative group hover:scale-105 transition"
            >
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md opacity-0 group-hover:opacity-100">
                <p className="text-white text-lg font-semibold text-center px-4">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white to-transparent" />
      </div>
    </>
  );
};

export default Gallary;
