import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h3 style={styles.title}>Personal Details</h3>

        <div style={styles.grid}>
          <div><b>First Name:</b> {profile.firstName || "N/A"}</div>
          <div><b>Last Name:</b> {profile.lastName || "N/A"}</div>
          <div><b>Email:</b> {profile.email || "N/A"}</div>
          <div><b>Contact:</b> {profile.contactNo || "N/A"}</div>

          <div style={{ gridColumn: "1 / -1" }}>
            <b>Address:</b>{" "}
            {`${profile.street || ""}, ${profile.city || ""} – ${profile.pin || ""}`}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <b>Registered:</b>{" "}
            {profile.registrationDate
              ? new Date(profile.registrationDate).toLocaleDateString()
              : "N/A"}
          </div>
        </div>

        <h3 style={styles.title}>User Profile</h3>

        <div style={styles.profileBox}>
          <p>Profile Not Updated</p>

          <button
            style={styles.linkBtn}
            onClick={() => navigate("/update-profile")}
          >
            Click here to update profile
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFF9E6",
    paddingTop: "60px",
  },
  card: {
    maxWidth: "480px",
    width: "100%",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    color: "#ff69b4",
    margin: "15px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    fontSize: "14px",
  },
  profileBox: {
    textAlign: "center",
    padding: "20px",
    border: "2px dashed #ff69b4",
    borderRadius: "10px",
    marginTop: "10px",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#ff69b4",
    cursor: "pointer",
    textDecoration: "underline",
    display: "block",
    margin: "10px auto",
    fontSize: "14px",
  },
  downloadBtn: {
    marginTop: "10px",
    padding: "8px 14px",
    background: "#ff69b4",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default EmployeeProfile;
