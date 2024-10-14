import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success("Registered successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2 mx-auto bg-gray-100 dark:bg-gray-800 -8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 mx-auto bg-gray-100 dark:bg-gray-800 -8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
