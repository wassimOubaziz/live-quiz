import React, { useState } from "react";
import { submitAnswer } from "../api";

const SubmitAnswer = () => {
  const [quizCode, setQuizCode] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  const [timeTaken, setTimeTaken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage after login
      await submitAnswer({
        quizCode,
        studentId: userId,
        questionId,
        answer,
        timeTaken,
      });
      setQuizCode("");
      setQuestionId("");
      setAnswer("");
      setTimeTaken("");
      alert("Answer submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Answer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quiz Code</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Question ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Answer</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Time Taken (seconds)
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={timeTaken}
            onChange={(e) => setTimeTaken(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default SubmitAnswer;
