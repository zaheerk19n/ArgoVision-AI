import React, { useState } from "react";
import Login from "../components/Login";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="bg-green-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-green-300 w-[70vw] h-[80vh] rounded-3xl flex justify-between shadow-[0_0_20px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col justify-between group">
          <img
            src="/leaf.png"
            alt=""
            className="w-[2vw] mt-[3vh] ml-[3vh] transition-transform duration-300 group-hover:rotate-24 "
          />
          <div className="text-white font-semibold text-4xl mt-[1vh] ml-[6vh] transition-transform duration-800 group-hover:scale-105">
            <h1>Getting</h1>
            <h1>Started With</h1>
            <h1>AgroVision</h1>
          </div>
          <img
            src="/flowercamera.png"
            alt=""
            className="h-[50vh] m-[2vw] rounded-full transition-transform duration-800 group-hover:scale-105 "
          />
        </div>
        <div className="bg-white w-[42vw] h-[80vh] rounded-4xl shadow-[0_0_20px_rgba(0,0,0,0.25)] flex flex-col gap-6 p-[8vw] group">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <>
              <form
                action="http://localhost:3000/signup"
                method="POST"
                className="flex flex-col"
              >
                <h1 className="font-bold text-xl transition-transform duration-800 group-hover:scale-105">
                  Create Account
                </h1>
                <h1 className="transition-transform duration-800 group-hover:scale-105">
                  Sign Up with Google and facebook
                </h1>
                <h1 className="text-center transition-transform duration-800 group-hover:scale-105">
                  - OR -
                </h1>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="border rounded-sm  p-2 transition-transform duration-800 group-hover:scale-105"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="border rounded-sm  p-2 transition-transform duration-800 group-hover:scale-105"
                />
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  className="border rounded-sm  p-2 transition-transform duration-800 group-hover:scale-105"
                />
                <button
                  type="submit"
                  className="bg-green-500 border rounded-sm  text-white p-2 hover:bg-green-700 transition-transform duration-800 group-hover:scale-105"
                >
                  Create Account
                </button>
                <h1 className="transition-transform duration-800 group-hover:scale-105">
                  Already have an account ?
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-green-500 font-bold hover:text-green-700 transition-transform duration-800 group-hover:scale-105"
                  >
                    Log in
                  </span>{" "}
                </h1>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
