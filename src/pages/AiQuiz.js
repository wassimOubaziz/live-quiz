import React, { useState } from "react";
import { generateQuizWithAi } from "../api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const AiQuiz = () => {
  const [prompt, setPrompt] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [sendToDatabase, setSendToDatabase] = useState(false);

  const handleGenerateQuiz = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await generateQuizWithAi(prompt, userId, sendToDatabase);
      setQuiz(response.quiz);
      toast.success("Quiz generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate quiz. Please try again.");
    }
  };

  const handleToggleDatabase = () => {
    setSendToDatabase((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        AI Quiz Generator
      </h2>

      <div className="mb-4">
        <label
          htmlFor="prompt"
          className="block mb-2 text-gray-700 dark:text-gray-300"
        >
          Enter your quiz prompt:
        </label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200"
          placeholder="Type your quiz prompt here..."
        />
      </div>

      <button
        onClick={handleGenerateQuiz}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition-colors duration-200"
      >
        Generate Quiz
      </button>

      <div className="flex items-center my-4">
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          I have my own Quizzes, I want to structure them:
        </span>
        <button
          onClick={handleToggleDatabase}
          className={`p-2 rounded transition-colors duration-200 ${
            sendToDatabase
              ? "bg-green-500 hover:bg-green-700"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {sendToDatabase ? (
            <FaCheckCircle className="text-white" />
          ) : (
            <FaTimesCircle className="text-gray-800 dark:text-white-100" />
          )}
        </button>
      </div>

      {quiz && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {quiz.title}
          </h3>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <p>Questions: {quiz.questions.length}</p>
            <p>Time: {quiz.timeLimit} minutes</p>
          </div>
          <div className="mt-4">
            {quiz.questions.slice(0, 3).map((question, index) => (
              <div
                key={index}
                className="mb-4 bg-white dark:bg-gray-600 p-3 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {index + 1}. {question.question}
                </h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button
            className={`w-full mt-2 ${
              sendToDatabase ? "bg-green-500 hover:bg-green-700" : "bg-gray-400"
            } text-white p-2 rounded transition-colors duration-200`}
            disabled={!sendToDatabase}
          >
            Save Quiz to Database
          </button>
        </div>
      )}
    </div>
  );
};

export default AiQuiz;
