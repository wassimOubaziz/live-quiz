import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (!userId || !token || !role || !username) {
      navigate("/login");
    }
  }, [navigate]);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to QuizApp
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-800 px-4 py-2 rounded transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome, {username}! Create and join quizzes to test your knowledge!
      </p>
      <div className="flex flex-wrap gap-4">
        {role === "teacher" && (
          <>
            <a
              href="/ai-quiz"
              className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-800 px-4 py-2 rounded transition-colors duration-200"
            >
              Generate Quiz With AI
            </a>
            <a
              href="/create-quiz"
              className="bg-green-500 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-800 px-4 py-2 rounded transition-colors duration-200"
            >
              Create Quiz
            </a>
            <a
              href="/view-quizzes"
              className="bg-purple-500 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-800 px-4 py-2 rounded transition-colors duration-200"
            >
              View Quizzes
            </a>
          </>
        )}
        <a
          href="/join-quiz"
          className="bg-indigo-500 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-800 px-4 py-2 rounded transition-colors duration-200"
        >
          Join Quiz
        </a>
      </div>
    </div>
  );
};

export default Home;
