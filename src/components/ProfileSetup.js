import React, { useState } from "react";

export default function ProfileSetup({ onComplete }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    job: "",
    industry: "",
    securityLevel: "",
    profileImage: null,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data (TEMP: use localStorage until backend is ready)
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("profileCompleted", "true");

    setSaved(true);

    setTimeout(() => {
      onComplete(); // redirect to dashboard
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f5fa",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "18px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Complete Your Profile
        </h2>

        {/* Profile Image */}
        <div style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          <label style={{ cursor: "pointer" }}>
            <img
              src={
                profile.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="profile"
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #ddd",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            Upload Image
          </div>
        </div>

        {/* Form Fields */}
        {[
          ["name", "Full Name"],
          ["email", "Email Address"],
          ["phone", "Phone Number"],
          ["country", "Country"],
          ["job", "Your Job"],
          ["industry", "Industry"],
          ["securityLevel", "Security Awareness Level"],
        ].map(([key, label]) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.3rem" }}>
              {label}
            </label>
            <input
              type="text"
              name={key}
              value={profile[key]}
              onChange={handleChange}
              required={key !== "industry" && key !== "securityLevel"}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.9rem",
            background: "#3e95cd",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>

        {saved && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.7rem",
              background: "#d8f7d3",
              color: "#2d7a32",
              textAlign: "center",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            ✔ Profile Saved — Redirecting…
          </div>
        )}
      </form>
    </div>
  );
}
