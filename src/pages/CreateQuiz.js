import React, { useEffect, useState } from "react";
import { createQuiz } from "../api";
import toast from "react-hot-toast";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], answer: "" },
  ]);
  const [categoryId, setCategoryId] = useState("");

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", ""], answer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await createQuiz({
        userId,
        title: quizTitle,
        timeLimit,
        questions,
        categoryId,
      });
      setQuizTitle("");
      setTimeLimit("");
      setQuestions([{ question: "", options: ["", ""], answer: "" }]);
      setCategoryId("");
      toast.success("Quiz created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Create Quiz
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Quiz Title
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
              required
            />
            <div className="mb-4">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="mb-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Option {oIndex + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
                onClick={() => addOption(qIndex)}
              >
                Add Option
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Correct Answer
              </label>
              <input
                type="text"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "answer", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
          onClick={addQuestion}
        >
          Add Another Question
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4 transition-colors duration-200"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
