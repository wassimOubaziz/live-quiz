import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
    >
      {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default ThemeToggle;
