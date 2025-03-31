import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import React from 'react'
import Home from "./pages/Home"
import Chatbot from "./pages/Chatbot"
import Notes from "./pages/Notes"
import Account from "./pages/Account"
import Login from "./pages/Login"
import Register from "./pages/Register"
import VerifyOTP from "./pages/VerifyOTP"
import ForgottenPassword from "./pages/ForgottenPassword"

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/chatbot" element={<PrivateRoute>
          <Chatbot />
        </PrivateRoute>} />

        <Route path="/notes" element={<PrivateRoute>
          <Notes />
        </PrivateRoute>} />   

        <Route path="/account" element={<PrivateRoute>
          <Account />
        </PrivateRoute>} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/forgotten-password" element={<ForgottenPassword />} />

      </Routes>
    </Router>
  )
}

export default App