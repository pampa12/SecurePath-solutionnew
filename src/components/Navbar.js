import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setLoggedIn, user }) {

  const getDisplayName = () => {
    if (!user?.fullName) return "";
    const parts = user.fullName.trim().split(" ");
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "#d9e9ff",
        boxShadow: "0 2px 12px #00000025",
      }}
    >

      {/* LEFT SIDE — LOGO + NAME */}
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1b3b6b" }}>
          SecurePath
        </h1>

        {/* USER NAME — NOW BIGGER + CLEANER */}
        {user?.fullName && (
          <span
            style={{
              padding: "6px 14px",
              background: "#ffffffaa",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "18px",  // ⬅️ INCREASED SIZE
              color: "#1b3b6b",
              border: "1px solid #aac7ff",
            }}
          >
            {getDisplayName()}
          </span>
        )}
      </div>

      {/* RIGHT SIDE — LINKS + LOGOUT */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          gap: "20px",
        }}
      >
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/about">About</Link></li>

        <li>
          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("userProfile");
            }}
            style={{
              background: "#4a8dfc",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
