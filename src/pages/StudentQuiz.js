import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import toast from "react-hot-toast"; // Importing toast for notifications

const StudentQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isResultsShown, setIsResultsShown] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerPercentage, setAnswerPercentage] = useState({});
  const [finalPoints, setFinalPoints] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const socket = io("https://desolate-peak-12816-fc8e97363b08.herokuapp.com", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.emit("joinQuiz", { quizId, userId: localStorage.getItem("userId") });

    socket.on("firstQuestion", (question) => {
      setIsQuizStarted(true);
      setCurrentQuestion(question);
      setIsResultsShown(false);
      setHasSubmitted(false);
    });

    socket.on("currentQuestion", (question) => {
      setIsQuizStarted(true);
      setCurrentQuestion(question);
      setIsResultsShown(false);
      setHasSubmitted(false);
    });

    socket.on("nextQuestion", (question) => {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setShowResults(false);
      setIsResultsShown(false);
      setHasSubmitted(false);
      setCounter(0);
    });

    socket.on("answerSubmitted", (counter) => {
      setCounter(counter);
    });

    socket.on("showResults", ({ correctAnswer, percentageArray }) => {
      setCorrectAnswer(correctAnswer);
      setAnswerPercentage(percentageArray);
      setIsResultsShown(true);
    });

    socket.on("resultsCalculated", (points) => {
      setFinalPoints(points);
      setShowResults(true);
    });

    socket.on("quizFinished", (result) => {
      setRedirect(true);
      setFinalPoints(result.resultTable);
      setShowResults(true);
    });

    return () => {
      socket.off("firstQuestion");
      socket.off("currentQuestion");
      socket.off("nextQuestion");
      socket.off("answerSubmitted");
      socket.off("showResults");
      socket.off("resultsCalculated");
      socket.off("quizFinished");
    };
  }, [quizId]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    socket.emit(
      "answerSelected",
      quizId,
      localStorage.getItem("userId"),
      answer
    );
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      socket.emit(
        "submitAnswer",
        quizId,
        localStorage.getItem("userId"),
        localStorage.getItem("username"),
        selectedAnswer
      );
      toast.success("Answer submitted!"); // Success message
      setSelectedAnswer(null);
      setHasSubmitted(true);
    } else {
      toast.error("Please select an answer before submitting."); // Error message
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    if (redirect) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Quiz Time!
          </h1>
          {isQuizStarted && (
            <div className="text-2xl text-gray-800 dark:text-gray-200">
              Submissions: {counter}
            </div>
          )}
        </div>
        {isQuizStarted && currentQuestion ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {currentQuestion.question}
            </h2>
            <div className="space-y-4 mb-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={hasSubmitted || isResultsShown}
                  className={`w-full py-2 px-4 rounded focus:outline-none focus:ring-2 transition-colors ${
                    selectedAnswer === option
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={hasSubmitted || isResultsShown}
              className={`w-full ${
                hasSubmitted || isResultsShown ? "bg-gray-400" : "bg-green-500"
              } text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              {hasSubmitted ? "Answer Submitted" : "Submit Answer"}
            </button>
            {hasSubmitted && (
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Please wait for the teacher to show you the results or skip to
                the next question.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Please wait for the teacher to start the quiz.
          </p>
        )}
        {isResultsShown && (
          <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Results
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Correct Answer:{" "}
              <span className="font-semibold">{correctAnswer}</span>
            </p>
            <div className="space-y-2">
              {Object.entries(answerPercentage).map(
                ([option, percentage], index) => (
                  <div key={index}>
                    <div className="flex items-center bg-gray-200 dark:bg-gray-600 rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-800 dark:text-gray-100">
                      {option}: {percentage}%
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="mx-auto bg-gray-100 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-200 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Username
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(finalPoints).map(
                  ([userId, { point, username }]) => (
                    <tr key={userId}>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        {username}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
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

export default StudentQuiz;
