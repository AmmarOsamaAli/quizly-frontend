import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import AllQuizzesPage from "./pages/Quiz/AllQuizzesPage";
import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import QuizDetailsPage from "./pages/Quiz/QuizDetailsPage";
import MyQuizzesPage from "./pages/Quiz/MyQuizzesPage";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quizzes" element={<AllQuizzesPage/>} />
        <Route path="/quizzes/:quizId" element={<ProtectedRoute><QuizDetailsPage/></ProtectedRoute>} />
        <Route path="/quizzes/my-quizzes" element={<ProtectedRoute><MyQuizzesPage/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
