import { useState } from "react";
import socket from './services/socket'
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
import CreateQuizPage from "./pages/Quiz/CreateQuizPage";
import EditQuizPage from "./pages/Quiz/EditQuizPage";
function App() {

  useEffect(() => {
    function onConnect() {
      console.log("Connected to Socket.IO:", socket.id)
    }
    function onDisconnect() {
      console.log("Disconnected to Socket.IO:", socket.id)
    }

    function onConnectError(error) {
      console.log("Socket connection error:", error.message)
    }

    socket.on("connect", onConnect)
    socket.on("Disconnet", onDisconnect)
    socket.on("connect_error", onConnectError)

    if (!socket.connected) {
      socket.connect()
    }

    return () => {
      socket.off("connect", onConnect)
      socket.off("Disconnet", onDisconnect)
    }

  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quizzes" element={<AllQuizzesPage/>} />
        <Route path="/quizzes/:quizId" element={<ProtectedRoute><QuizDetailsPage/></ProtectedRoute>} />
        <Route path="/quizzes/my-quizzes" element={<ProtectedRoute><MyQuizzesPage/></ProtectedRoute>} />
        <Route path="/quizzes/create" element={<ProtectedRoute><CreateQuizPage/></ProtectedRoute>} />
        <Route path="/quizzes/:quizId/edit" element={<ProtectedRoute><EditQuizPage/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
