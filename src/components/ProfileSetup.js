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

    // Save profile to localStorage to mark it as completed
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("profileCompleted", "true");

    onComplete(); // redirect to dashboard
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "3em auto",
        padding: "2em",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>
        Complete Your Profile
      </h2>

      {/* Profile photo */}
      <div style={{ textAlign: "center", marginBottom: "1.4em" }}>
        <img
          src={profile.profileImage || "https://via.placeholder.com/80"}
          alt="profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: ".6em",
          }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <input
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={profile.country}
          onChange={handleChange}
        />

        <input
          name="job"
          placeholder="Your Job"
          value={profile.job}
          onChange={handleChange}
        />

        <input
          name="industry"
          placeholder="Industry (optional)"
          value={profile.industry}
          onChange={handleChange}
        />

        <select
          name="securityLevel"
          value={profile.securityLevel}
          onChange={handleChange}
        >
          <option value="">Security Awareness Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#3e95cd",
            color: "#fff",
            padding: "0.8em",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          SAVE PROFILE
        </button>
      </form>
    </div>
  );
}

