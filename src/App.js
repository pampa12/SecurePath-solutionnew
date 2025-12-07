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
import ProfileSetup from "./components/ProfileSetup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  // Load user profile from localStorage
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

  return (
    <Router>
      {/* Show Navbar only if logged in and profile is completed */}
      {loggedIn && profileComplete && (
        <Navbar
          setLoggedIn={(v) => {
            setLoggedIn(v);
            setProfileComplete(false);
            localStorage.removeItem("userProfile");
          }}
          user={savedProfile}  // ← PASS USER TO NAVBAR
        />
      )}

      <Routes>

        {/* MAIN ROUTE */}
        <Route
          path="/"
          element={
            !loggedIn ? (
              <Navigate to="/login" />
            ) : !profileComplete ? (
              <ProfileSetup onComplete={() => setProfileComplete(true)} />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              profileComplete ? (
                <Navigate to="/" />
              ) : (
                <ProfileSetup onComplete={() => setProfileComplete(true)} />
              )
            ) : (
              <Login
                onLogin={() => {
                  setLoggedIn(true);
                  setProfileComplete(false);
                }}
              />
            )
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={loggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* OTHER ROUTES */}
        <Route path="/about" element={loggedIn ? <AboutUs /> : <Navigate to="/login" />} />
        <Route path="/contact" element={loggedIn ? <ContactUs /> : <Navigate to="/login" />} />
        <Route path="/live-alerts" element={loggedIn ? <LiveAlerts /> : <Navigate to="/login" />} />
        <Route path="/risk-breakdown" element={loggedIn ? <RiskBreakdown /> : <Navigate to="/login" />} />
        <Route path="/news" element={loggedIn ? <NewsFeed /> : <Navigate to="/login" />} />
        <Route path="/self-assessment" element={loggedIn ? <RiskQuiz /> : <Navigate to="/login" />} />
        <Route path="/csv" element={loggedIn ? <CsvUpload /> : <Navigate to="/login" />} />

        <Route path="/faq" element={<FaqPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
