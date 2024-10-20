import axios from "axios";

const API_URL = "https://quiz-live-620d74814e52.herokuapp.com/api";

export const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const createCategory = async (categoryData) => {
  return await axios.post(`${API_URL}/quiz/category`, categoryData);
};

export const createQuiz = async (quizData) => {
  return await axios.post(`${API_URL}/quiz/quiz`, quizData);
};

export const joinQuiz = async (joinData) => {
  return await axios.post(`${API_URL}/quiz/join`, joinData);
};

export const submitAnswer = async (answerData) => {
  return await axios.post(`${API_URL}/quiz/answer`, answerData);
};

export const getResults = async (quizCode) => {
  return await axios.get(`${API_URL}/quiz/results/${quizCode}`);
};

export const fetchQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quiz`);
  return response.data;
};

export const removeQuiz = async (quizId) => {
  return await axios.delete(`${API_URL}/quiz/${quizId}`);
};

export const redoQuiz = async (quizId) => {
  return await axios.patch(`${API_URL}/quiz/${quizId}`);
};

export const generateQuizWithAi = async (prompt, userId, isQuiz) => {
  const response = await axios.post(`${API_URL}/ai-quiz`, {
    userId,
    userInput: prompt,
    token: "8f9b3f1a-4b7c-ed29-bbb5-1b6f9m4a7u8j",
    isQuiz,
  });
  return response.data;
};
