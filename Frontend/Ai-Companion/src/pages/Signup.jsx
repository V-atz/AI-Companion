import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/auth/signup";

    setLoading(true);

    try {
      const response = await axios.post(url, formData);
      const { message } = response.data;

      navigate("/login");
      console.log(message);
    } catch (error) {
      setError(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
      <div className="w-full max-w-md bg-[#fdfcfb] p-8 rounded-2xl shadow-2xl border border-[#e0dcdc]">
        <h1 className="text-3xl font-playfair font-semibold text-gray-900 mb-6 text-center tracking-wide">
          Create an Account
        </h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c7c7c] bg-white"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c7c7c] bg-white"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c7c7c] bg-white"
            required
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#333] transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-600 mt-4 text-center text-sm">
          Already a user?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
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

export default Signup;