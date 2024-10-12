import React from "react";
import BackButton from "./components/BackButton"; // Ensure the correct import path
import ThemeToggle from "./components/ThemeToggle"; // Ensure the correct import path

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  // check if is in home page don't show back button
  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 transition-colors duration-200">
        <div className="flex justify-between items-center mb-4">
          {isHome ? "" : <BackButton />}
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
