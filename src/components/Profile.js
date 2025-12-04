import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Profile.css";

export default function Profile() {
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

  // Load profile from localStorage on page load
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (data) setProfile(data);
  }, []);

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

    // Save updated profile to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // Success animation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="profile-edit-container"
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Edit Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="profile-edit-form">

        {/* Profile Image */}
        <div className="profile-edit-image-container">
          <label style={{ cursor: "pointer" }}>
            <img
              src={
                profile.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="profile"
              className="profile-edit-image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <div className="profile-image-text">Change Photo</div>
        </div>

        {/* Form Fields */}
        {[
          ["name", "Full Name"],
          ["email", "Email Address"],
          ["phone", "Phone Number"],
          ["country", "Country"],
          ["job", "Job Title"],
          ["industry", "Industry"],
          ["securityLevel", "Security Awareness Level"],
        ].map(([key, label]) => (
          <div key={key} className="profile-edit-field">
            <label>{label}</label>
            <input
              type="text"
              name={key}
              value={profile[key] || ""}
              onChange={handleChange}
              required={key !== "industry" && key !== "securityLevel"}
            />
          </div>
        ))}

        <button className="profile-save-button">Save Changes</button>

        {saved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="profile-save-success"
          >
            ✔ Profile updated successfully!
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}
