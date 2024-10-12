import React, { useState, useEffect } from "react";
import { getResults } from "../api";

const Results = () => {
  const [quizCode, setQuizCode] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedResults = await getResults(quizCode);
      setResults(fetchedResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Get Results
        </button>
      </form>
      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Results</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="mb-2">
                {index + 1}. {result.username} - {result.score} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Results;
