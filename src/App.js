// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Alerts from "./components/Alerts";
import Profile from "./components/Profile";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import LiveAlerts from "./components/LiveAlerts";
import RiskBreakdown from "./components/RiskBreakdown";
import NewsFeed from "./components/NewsFeed";
import RiskQuiz from "./components/RiskQuiz";
import FaqPage from "./components/FaqPage";
import CsvUpload from "./components/CsvUpload";

import ProfileSetup from "./components/ProfileSetup"; // <-- NEW IMPORT

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [profileComplete, setProfileComplete] = useState(false);


  // Track if user has completed profile setup
  const [profileCompleted, setProfileCompleted] = useState(
    localStorage.getItem("profileCompleted") === "true"
  );

  return (
    <Router>
      {loggedIn && <Navbar setLoggedIn={() => {
        setLoggedIn(false);
        setProfileCompleted(false);
        localStorage.removeItem("profileCompleted");
      }} />}

      <Routes>

        {/* LOGIN ROUTE */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              profileCompleted ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/setup-profile" />
              )
            ) : (
              <Login
                onLogin={(r) => {
                  setLoggedIn(true);
                  setRole(r);
                }}
              />
            )
          }
        />

        {/* NEW PROFILE SETUP ROUTE */}
        <Route
          path="/setup-profile"
          element={
            loggedIn ? (
              <ProfileSetup
                onComplete={() => {
                  localStorage.setItem("profileCompleted", "true");
                  setProfileCompleted(true);
                }}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* PUBLIC ROUTES */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            loggedIn && profileCompleted ? (
              <Dashboard role={role} />
            ) : (
              <Navigate to="/setup-profile" />
            )
          }
        />

        <Route
          path="/transactions"
          element={loggedIn ? <Transactions role={role} /> : <Navigate to="/login" />}
        />

        <Route
          path="/alerts"
          element={loggedIn ? <Alerts role={role} /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={loggedIn ? <Profile role={role} /> : <Navigate to="/login" />}
        />

        <Route path="/live-alerts" element={<LiveAlerts />} />
        <Route path="/risk-breakdown" element={<RiskBreakdown />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/self-assessment" element={<RiskQuiz />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/ml-uploader" element={<CsvUpload />} />

      </Routes>
    </Router>
  );
}

export default App;
