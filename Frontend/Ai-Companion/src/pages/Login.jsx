import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/auth/login";

    try {
      const response = await axios.post(url, formData);
      const { token, message, userID } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userID)
      navigate("/");
      console.log(message);
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      toast.error("Invalid Email or Password");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
      <div className="w-full max-w-md bg-[#fdfcfb] p-8 rounded-2xl shadow-2xl border border-[#e0dcdc]">
        <h1 className="text-3xl font-playfair font-semibold text-gray-900 mb-6 text-center tracking-wide">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c7c7c] bg-white"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c7c7c] bg-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#333] transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center text-sm">
          New user?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default Login;