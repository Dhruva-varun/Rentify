import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-5">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gradient-to-br from-teal-300 to-blue-400 text-gray-700">
        <h1 className="text-4xl font-bold text-center">Create Account</h1>
        <p className="text-gray-700 text-center mt-2">Join us today!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            id="userName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="flex items-center justify-center w-full gap-3 bg-white border border-gray-300 text-gray-700 font-semibold p-3 rounded-lg hover:bg-gray-100 shadow-md transition-transform transform hover:scale-105 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
          <GoogleAuth />
        </form>

        <div className="flex justify-between items-center mt-5 text-gray-700text-sm">
          <p>Already have an account?</p>
          <Link
            to={"/login"}
            className="text-gray-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
