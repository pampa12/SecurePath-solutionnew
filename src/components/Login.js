import React, { useState } from "react";
const logoURL = "/logo.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // <-- Trigger login without role
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={logoURL}
        alt="Company Logo"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "1200px",
          maxWidth: "99vw",
          minWidth: "340px",
          opacity: 0.27,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(34,37,48,0.62)",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "360px",
          boxShadow: "0 12px 38px #000000a6",
          display: "flex",
          flexDirection: "column",
          gap: "1.2em",
          padding: "2.7em 2.2em",
          zIndex: 1,
          backdropFilter: "blur(6px) saturate(160%)",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: ".8em" }}>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            background: "#ef347a",
            color: "#fff",
            border: "none",
            borderRadius: "7px",
            padding: "0.7em 0",
            marginTop: "0.9em",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "0.8em",
  borderRadius: "6px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1.2px solid #50596b",
  fontSize: "1.07em",
  outline: "none",
};

export default Login;
