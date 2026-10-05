import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/");
      } else {
        setErrorMsg(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-4"
      >
        <h1 className="font-bold text-2xl text-gray-800 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Login to access your AgroVision AI dashboard
        </p>

        {errorMsg && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-md">
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don’t have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-green-600 font-bold hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;