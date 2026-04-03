import React from "react";
import Front from "../components/Front";
import Gallary from "../components/Gallary";
import Footer from "../components/Footer";
import Headlines from "../components/Headlines";

const Home = () => {
  return (
    <div className="mt-16 md:mt-20 flex flex-col items-center bg-[var(--bg)] text-[var(--text)] px-4">

      {/* FRONT SECTION */}
      <div className="w-full max-w-[1200px]">
        <Front />
      </div>

      {/* GALLERY */}
      <div className="w-full max-w-[1200px] mt-6">
        <Gallary />
      </div>

      {/* DIVIDER */}
      <hr className="border-t border-green-900 my-8 w-full md:w-3/4" />

      {/* FOOTER */}
      <div className="w-full">
        <Footer />
      </div>

    </div>
  );
};

export default Home;