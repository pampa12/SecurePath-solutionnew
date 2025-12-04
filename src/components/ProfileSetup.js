// src/components/ProfileSetup.js
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
    onComplete(); // Mark profile as completed
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f8ff",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: "420px",
          padding: "2em 2.3em",
          borderRadius: "20px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
        }}
      >
        {/* TITLE */}
        <h2 style={{ marginBottom: "1.4em", textAlign: "center" }}>
          Complete Your Profile
        </h2>

        {/* IMAGE UPLOAD */}
        <div style={{ textAlign: "center", marginBottom: "1.2em" }}>
          <label
            style={{
              cursor: "pointer",
              display: "inline-block",
              borderRadius: "50%",
              width: "95px",
              height: "95px",
              background: "#e9eef5",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "0.8em",
              color: "#555",
            }}
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "Upload"
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* FIELD COMPONENT */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "Your Job", name: "job", type: "text" },
          { label: "Industry", name: "industry", type: "text" },
          { label: "Security Level", name: "securityLevel", type: "text" },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "1em" }}>
            <label
              style={{
                fontWeight: 600,
                marginBottom: "6px",
                display: "block",
                color: "#333",
              }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={profile[field.name]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75em",
                borderRadius: "8px",
                border: "1px solid #cdd9ec",
                background: "#f9fbff",
                fontSize: "1em",
              }}
            />
          </div>
        ))}

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#3e95cd",
            color: "#fff",
            padding: "0.8em",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "1.05em",
            border: "none",
            cursor: "pointer",
            marginTop: "1em",
            boxShadow: "0 3px 12px rgba(62,149,205,0.35)",
          }}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
