import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import JoinQuiz from "./pages/JoinQuiz";
import ViewQuizzes from "./pages/ViewQuizzes";
import UpdateQuiz from "./pages/UpdateQuiz";
import TeacherQuiz from "./pages/TeacherQuiz";
import StudentQuiz from "./pages/StudentQuiz";
import AiQuiz from "./pages/AiQuiz";
import Layout from "./Layout"; // Ensure the correct import path

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/join-quiz" element={<JoinQuiz />} />
          <Route path="/view-quizzes" element={<ViewQuizzes />} />
          <Route path="/update-quiz/:id" element={<UpdateQuiz />} />
          <Route path="/teacher-quiz/:quizId" element={<TeacherQuiz />} />
          <Route path="/student-quiz/:quizId" element={<StudentQuiz />} />
          <Route path="/ai-quiz" element={<AiQuiz />} />
        </Routes>
        <Toaster position="bottom-right" />
      </Layout>
    </Router>
  );
};

export default App;

// import CreateCategory from "./pages/CreateCategory";
// import SubmitAnswer from "./pages/SubmitAnswer";
// import Results from "./pages/Results";
{
  /* <Route path="/create-category" element={<CreateCategory />} /> */
}
{
  /* <Route path="/submit-answer" element={<SubmitAnswer />} /> */
}
{
  /* <Route path="/results" element={<Results />} /> */
}
