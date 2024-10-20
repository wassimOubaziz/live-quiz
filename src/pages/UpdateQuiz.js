import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: "",
    timeLimit: "",
    questions: [{ question: "", options: ["", ""], answer: "" }],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://quiz-live-620d74814e52.herokuapp.com/api/quiz/${id}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to fetch quiz.");
      }
    };

    fetchQuiz();
  }, [id]);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedQuestions = [...quiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "answer") {
      updatedQuestions[index].answer = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].options.push("");
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: ["", ""], answer: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://quiz-live-620d74814e52.herokuapp.com/api/quiz/${id}`,
        quiz
      );
      toast.success("Quiz updated successfully!");
      navigate("/view-quizzes");
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Failed to update quiz.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Update Quiz
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Time Limit
          </label>
          <input
            type="number"
            value={quiz.timeLimit}
            onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })}
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </div>
        {quiz.questions.map((q, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleInputChange(e, index, "question")}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Options
            </label>
            {q.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={(e) => handleInputChange(e, index, optIndex)}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddOption(index)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200"
            >
              Add Option
            </button>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 mt-4">
              Answer
            </label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleInputChange(e, index, "answer")}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition-colors duration-200 mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
