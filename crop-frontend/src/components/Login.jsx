import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-10">

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-sm
          sm:max-w-md
          flex
          flex-col
          gap-4
          bg-white
          p-6
          sm:p-8
          rounded-xl
          shadow-lg
        "
      >
        <h1 className="font-bold text-xl sm:text-2xl text-center">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="
            border
            p-2
            sm:p-3
            rounded-md
            text-sm
            sm:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="
            border
            p-2
            sm:p-3
            rounded-md
            text-sm
            sm:text-base
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            p-2
            sm:p-3
            rounded-md
            font-medium
            transition
          "
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={onSwitch}
            className="text-green-600 cursor-pointer font-medium hover:underline"
          >
            Sign Up
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;