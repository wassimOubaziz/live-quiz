import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes, removeQuiz, redoQuiz } from "../api";
import { FaTrash, FaCopy, FaRedo, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ViewQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const fetchedQuizzes = await fetchQuizzes();
        setQuizzes(fetchedQuizzes);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch quizzes. Please try again.");
      }
    };

    getQuizzes();
  }, []);

  const handleQuizClick = (id) => {
    navigate(`/update-quiz/${id}`);
  };

  const handleRemoveQuiz = async (id, event) => {
    event.stopPropagation();
    try {
      await removeQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      toast.success("Quiz removed successfully!");
    } catch (error) {
      console.error("Error removing quiz:", error);
      toast.error("Failed to remove quiz. Please try again.");
    }
  };

  const handleCopyCode = (code, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Quiz code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy quiz code. Please try again.");
      }
    );
  };

  const handleRedoQuiz = async (id, event) => {
    event.stopPropagation();
    try {
      await redoQuiz(id);
      setQuizzes(
        quizzes.map((quiz) =>
          quiz._id === id ? { ...quiz, isFinished: false } : quiz
        )
      );
      toast.success("Quiz marked for redo!");
    } catch (error) {
      console.error("Error marking quiz for redo:", error);
      toast.error("Failed to mark quiz for redo. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        All Quizzes
      </h2>
      <ul>
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded flex justify-between items-center transition-colors duration-200"
            onClick={() => handleQuizClick(quiz._id)}
          >
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 dark:text-gray-200 mr-2">
                {quiz.title}
              </span>
              {quiz.isFinished && (
                <FaCheckCircle className="text-green-500 mr-2" />
              )}
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 mr-2">
                Code: {quiz.code}
              </span>
              <button
                onClick={(e) => handleCopyCode(quiz.code, e)}
                className="text-blue-500 hover:text-blue-700 mr-2 transition-colors duration-200"
              >
                <FaCopy />
              </button>
              {quiz.isFinished && (
                <button
                  onClick={(e) => handleRedoQuiz(quiz._id, e)}
                  className="text-green-500 hover:text-green-700 mr-2 transition-colors duration-200"
                >
                  <FaRedo />
                </button>
              )}
              <button
                onClick={(e) => handleRemoveQuiz(quiz._id, e)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewQuizzes;
