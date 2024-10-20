import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerPercentage, setAnswerPercentage] = useState({});
  const [counter, setCounter] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [finalPoints, setFinalPoints] = useState({});
  const [redirect, setRedirect] = useState(false);

  const socket = io("https://desolate-peak-12816-fc8e97363b08.herokuapp.com", {
    transports: ["websocket"],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `https://quiz-live-620d74814e52.herokuapp.com/api/quiz/code/${quizId}`
        );
        setQuiz(response.data);
        setCurrentQuestion(response.data.questions[0]);
        setCorrectAnswer(response.data.questions[0].answer);
      } catch (error) {
        toast.error("Error fetching quiz");
      }
    };
    fetchQuiz();

    socket.emit("joinQuiz", { quizId, userId: localStorage.getItem("userId") });

    socket.on("quizStarted", () => {
      setIsQuizStarted(true);
    });

    socket.on("nextQuestion", (question) => {
      setCurrentQuestion(question);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCorrectAnswer(question?.answer);
      setAnswerPercentage({});
      setCounter(0);
    });

    socket.on("answerSubmitted", (c) => {
      setCounter(c);
    });

    socket.on("teacherReview", (percentages) => {
      setAnswerPercentage(percentages);
    });

    socket.on("resultsCalculated", (points) => {
      setFinalPoints(points); // Store the results
      setShowResults(true); // Show results popup
    });

    socket.on("quizFinished", (result) => {
      setRedirect(true);
      setFinalPoints(result.resultTable);
      setShowResults(true);
    });

    socket.on("connect_error", () => {
      toast.error("Connection failed!");
    });

    socket.on("disconnect", () => {
      toast.error("Disconnected from the server");
    });

    return () => {
      socket.off("quizStarted");
      socket.off("nextQuestion");
      socket.off("answerSubmitted");
      socket.off("teacherReview");
      socket.off("resultsCalculated");
      socket.off("quizFinished");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [quizId]);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    socket.emit("startQuiz", quizId);
    toast.success("Quiz started!");
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quiz.questions.length) {
      const nextQuestion = quiz.questions[nextIndex];
      setCurrentQuestion(nextQuestion);
      socket.emit("nextQuestion", quizId, nextQuestion);
      toast.success("Next question!");
    } else {
      socket.emit("finishQuiz", quizId);
      toast.success("Quiz finished!");
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    if (redirect) navigate("/");
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
        <div className="flex justify-between items-center mb-4">
          {isQuizStarted && (
            <div className="text-2xl text-gray-800 dark:text-gray-200">
              Submissions: {counter}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">
          {quiz?.title}
        </h1>
        {!isQuizStarted && (
          <button
            onClick={handleStartQuiz}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          >
            Start Quiz
          </button>
        )}
        {isQuizStarted && currentQuestion && (
          <div>
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              {currentQuestion.question}
            </h2>
            <div className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Correct Answer:{" "}
              <span className="text-green-600 dark:text-green-400">
                {correctAnswer}
              </span>
            </div>
            <div className="space-y-4 mb-4">
              {currentQuestion.options.map((option, index) => {
                const percentage = answerPercentage[option] || 0;

                return (
                  <div key={index}>
                    <button
                      className="w-full relative text-white py-2 px-4 rounded focus:outline-none mb-2 overflow-hidden"
                      style={{
                        background: `linear-gradient(to right, darkblue ${percentage}%, skyblue ${percentage}%)`,
                        transition: "background 0.5s ease-in-out", // Animation for the background change
                      }}
                    >
                      {option}
                      <span className="absolute right-4 text-xs">
                        {percentage}%
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() =>
                socket.emit("showResults", { quizId, correctAnswer })
              }
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            >
              Show Results
            </button>
            <button
              onClick={handleNextQuestion}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Next Question
            </button>
          </div>
        )}
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200 w-1/2">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Quiz Results
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-100">
                    Username
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-100">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(finalPoints).map(
                  ([userId, { point, username }]) => (
                    <tr key={userId}>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-100">
                        {username}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-100">
                        {point}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseResults}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuiz;
