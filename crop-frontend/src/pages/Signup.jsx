import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/");
      } else {
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg("Unable to connect to server. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-green-300 w-[70vw] max-w-[1000px] h-[80vh] rounded-3xl flex justify-between shadow-[0_0_20px_rgba(0,0,0,0.25)] overflow-hidden">
        
        {/* LEFT BANNER */}
        <div className="flex flex-col justify-between group p-6 hidden md:flex w-1/2">
          <img
            src="/leaf.png"
            alt="Logo"
            className="w-10 transition-transform duration-300 group-hover:rotate-12"
          />
          <div className="text-white font-semibold text-3xl lg:text-4xl transition-transform duration-500 group-hover:scale-105">
            <h1>Getting</h1>
            <h1>Started With</h1>
            <h1 className="text-green-800">AgroVision AI</h1>
          </div>
          <img
            src="/flowercamera.png"
            alt="Illustration"
            className="h-[40vh] object-contain rounded-full transition-transform duration-500 group-hover:scale-105 self-center"
          />
        </div>

        {/* RIGHT FORM AREA */}
        <div className="bg-white w-full md:w-1/2 h-full shadow-[0_0_20px_rgba(0,0,0,0.25)] flex flex-col justify-center p-6 sm:p-10">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl text-gray-800">
                Create Account
              </h1>
              <p className="text-sm text-gray-500">
                Join AgroVision AI for intelligent crop health monitoring
              </p>

              {errorMsg && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-md">
                  {errorMsg}
                </div>
              )}

              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password (min 6 characters)"
                className="border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-medium p-3 rounded-md transition duration-200 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-sm text-center text-gray-600 mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-green-600 font-bold hover:underline cursor-pointer"
                >
                  Log in
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
