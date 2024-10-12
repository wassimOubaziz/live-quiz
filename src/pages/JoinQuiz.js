import React, { useState } from "react";
import { joinQuiz } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JoinQuiz = () => {
  const [quizId, setQuizId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("role");

      await joinQuiz({ userId, code: quizId });

      setQuizId("");
      toast.success("Successfully joined the quiz!");

      if (userRole === "teacher") {
        navigate(`/teacher-quiz/${quizId}`);
      } else if (userRole === "user") {
        navigate(`/student-quiz/${quizId}`);
      }
    } catch (error) {
      console.error("Error joining quiz:", error);
      toast.error(
        "Failed to join the quiz. Please check the code and try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Join Quiz
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Quiz Code
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            placeholder="Enter quiz code here"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition-colors duration-200"
        >
          Join Quiz
        </button>
      </form>
    </div>
  );
};

export default JoinQuiz;
