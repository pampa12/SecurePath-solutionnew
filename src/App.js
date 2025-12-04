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

import ProfileSetup from "./components/ProfileSetup"; // <-- IMPORTANT

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [profileComplete, setProfileComplete] = useState(false);

  return (
    <Router>
      {loggedIn && profileComplete && (
        <Navbar setLoggedIn={setLoggedIn} />
      )}

      <Routes>

        {/* HOME route: requires login + profile setup */}
        <Route
          path="/"
          element={
            !loggedIn ? (
              <Navigate to="/login" />
            ) : !profileComplete ? (
              <ProfileSetup onComplete={() => setProfileComplete(true)} />
            ) : (
              <Dashboard role={role} />
            )
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={
            loggedIn ? <AboutUs /> : <Navigate to="/login" />
          }
        />

        {/* LIVE ALERTS */}
        <Route
          path="/live-alerts"
          element={
            loggedIn ? <LiveAlerts /> : <Navigate to="/login" />
          }
        />

        {/* RISK BREAKDOWN */}
        <Route
          path="/risk-breakdown"
          element={
            loggedIn ? <RiskBreakdown /> : <Navigate to="/login" />
          }
        />

        {/* NEWS FEED */}
        <Route
          path="/news"
          element={
            loggedIn ? <NewsFeed /> : <Navigate to="/login" />
          }
        />

        {/* RISK QUIZ */}
        <Route
          path="/self-assessment"
          element={
            loggedIn ? <RiskQuiz /> : <Navigate to="/login" />
          }
        />

        {/* CSV UPLOAD */}
        <Route
          path="/csv"
          element={
            loggedIn ? <CsvUpload /> : <Navigate to="/login" />
          }
        />

        {/* LOGIN ROUTE */}
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        {/* PROFILE PAGE */}
        <Route
          path="/profile"
          element={
            loggedIn ? <Profile role={role} /> : <Navigate to="/login" />
          }
        />

        {/* CONTACT US */}
        <Route
          path="/contact"
          element={
            loggedIn ? <ContactUs /> : <Navigate to="/login" />
          }
        />

        {/* DEFAULT FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
