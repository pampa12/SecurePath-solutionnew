import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setLoggedIn }) => {
  const [showMore, setShowMore] = useState(false);

  // Load saved profile data
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const profileImage =
    userProfile.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const userName = userProfile.name || "User";

  return (
    <nav
      style={{
        width: "100%",
        background: "var(--nav-bg)",
        color: "var(--txt)",
        padding: "0.7em 2.2em",
        boxSizing: "border-box",
        boxShadow: "0 2px 14px #cddbe849",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Logo / Title */}
        <div
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          SecurePath
        </div>

        {/* Navigation Links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5em",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={navLinkStyle}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/about" style={navLinkStyle}>
              About
            </Link>
          </li>

          {/* More Dropdown */}
          <li style={{ position: "relative" }}>
            <button
              onClick={() => setShowMore((m) => !m)}
              style={moreButtonStyle}
            >
              More ▼
            </button>

            {showMore && (
              <div style={dropdownMenuStyle}>
                <Link
                  to="/live-alerts"
                  onClick={() => setShowMore(false)}
                  style={dropdownLinkStyle}
                >
                  Live Alerts
                </Link>

                <Link
                  to="/risk-breakdown"
                  onClick={() => setShowMore(false)}
                  style={dropdownLinkStyle}
                >
                  Risk Breakdown
                </Link>

                <Link
                  to="/news"
                  onClick={() => setShowMore(false)}
                  style={dropdownLinkStyle}
                >
                  News
                </Link>

                <Link
                  to="/self-assessment"
                  onClick={() => setShowMore(false)}
                  style={dropdownLinkStyle}
                >
                  Self-Assessment
                </Link>

                <Link
                  to="/faq"
                  onClick={() => setShowMore(false)}
                  style={dropdownLinkStyle}
                >
                  FAQ
                </Link>
              </div>
            )}
          </li>

          {/* NEW — USER PROFILE SECTION */}
          <li style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
            <img
              src={profileImage}
              alt="avatar"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
            />
            <span style={{ fontWeight: 600 }}>{userName}</span>

            <button
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("profileCompleted");
                localStorage.removeItem("userProfile");
              }}
              style={logoutButtonStyle}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

/* ---------- STYLES ---------- */

const navLinkStyle = {
  fontSize: "1.1em",
  color: "#233",
  textDecoration: "none",
  fontWeight: 600,
};

const moreButtonStyle = {
  background: "#ffd600",
  color: "#232c3d",
  border: "none",
  borderRadius: "9px",
  padding: "0.4em 1.4em",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "1.1em",
  boxShadow: "0 1px 2px #e1eae7",
};

const dropdownMenuStyle = {
  position: "absolute",
  top: "115%",
  left: 0,
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 20px #b0b0d548",
  display: "flex",
  flexDirection: "column",
  minWidth: "170px",
  zIndex: 99,
};

const dropdownLinkStyle = {
  padding: "0.85em 1.1em",
  color: "#2c3c4d",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1.06em",
  borderBottom: "1px solid #f1f1f1",
  transition: "background 0.14s",
};

const logoutButtonStyle = {
  background: "#3e95cd",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "0.45em 1.2em",
  fontWeight: 700,
  fontSize: "1.13em",
  boxShadow: "0 1.5px 4px #b4daeb92",
  cursor: "pointer",
};

export default Navbar;
