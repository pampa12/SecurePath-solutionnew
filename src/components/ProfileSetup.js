import React, { useState } from "react";
import "./ProfileSetup.css";

export default function ProfileSetup({ onComplete }) {
    const [profile, setProfile] = useState({
        fullName: "",
        dob: "",
        country: "",
        email: "",
        phone: "",
        backupEmail: "",
        occupation: "",
        industry: "",
        monitoring: "Monthly",
        twoFactor: true,
        emailAlerts: true,
        smsAlerts: true,
        biometric: false,
        profilePhoto: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile({
            ...profile,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({
                ...profile,
                profilePhoto: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save to local storage
        localStorage.setItem("userProfile", JSON.stringify(profile));
        localStorage.setItem("profileCompleted", "true");

        onComplete();
    };

    return (
        <div className="profile-setup-wrapper">
            <img src="/logo.png" alt="Background Logo" className="profile-bg-logo" />

            <div className="profile-card">

                <h2>Profile Setup</h2>
                <p className="subtitle">Increase security & personalize your account</p>

                {/* PROFILE PHOTO */}
                <div className="id-upload-section">
                    <label htmlFor="photoUpload">
                        <img
                            src={
                                profile.profilePhoto ||
                                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            }
                            alt="Profile Preview"
                            className="id-preview"
                        />
                    </label>

                    <input
                        id="photoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                    />

                    <p className="upload-text">Upload Profile Photo</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Date of Birth</label>
                    <input
                        name="dob"
                        type="date"
                        value={profile.dob}
                        onChange={handleChange}
                        required
                    />

                    <label>Country of Residence</label>
                    <input
                        name="country"
                        value={profile.country}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Backup Email (Optional)</label>
                    <input
                        name="backupEmail"
                        type="email"
                        value={profile.backupEmail}
                        onChange={handleChange}
                    />

                    <label>Occupation</label>
                    <input
                        name="occupation"
                        value={profile.occupation}
                        onChange={handleChange}
                    />

                    <label>Industry</label>
                    <select
                        name="industry"
                        value={profile.industry}
                        onChange={handleChange}
                    >
                        <option value="">Select Industry</option>
                        <option>Finance & Banking</option>
                        <option>Technology</option>
                        <option>Retail</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Transportation</option>
                        <option>Other</option>
                    </select>

                    <label>Monitoring Frequency</label>
                    <select
                        name="monitoring"
                        value={profile.monitoring}
                        onChange={handleChange}
                    >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>

                    {/* SECURITY SETTINGS */}
                    <h3 className="section-title">Security Settings</h3>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="twoFactor"
                            checked={profile.twoFactor}
                            onChange={handleChange}
                        />
                        Enable Two-Factor Authentication
                    </label>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="emailAlerts"
                            checked={profile.emailAlerts}
                            onChange={handleChange}
                        />
                        Email alerts for suspicious activity
                    </label>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="smsAlerts"
                            checked={profile.smsAlerts}
                            onChange={handleChange}
                        />
                        SMS alerts for high-risk transactions
                    </label>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="biometric"
                            checked={profile.biometric}
                            onChange={handleChange}
                        />
                        Enable biometric login (Face ID / Fingerprint)
                    </label>

                    <button type="submit" className="save-btn">
                        Save & Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
