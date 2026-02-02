import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

const AdminHeader = () => {
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ff69b4" : "#444",
    marginRight: "20px",
    fontSize: "15px",
    fontWeight: isActive ? "600" : "400",
  });

  // Simulate logout by clearing localStorage
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/user/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#FFF9E6",
        padding: "12px 40px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE (Logo + Title + About/Contact) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Logo clickable */}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#ff69b4",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              JOB
            </div>
          </NavLink>

          {/* Title clickable */}
          <FaBriefcase color="#ff69b4" style={{ marginRight: "6px" }} />
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                color: "#ff69b4",
                fontSize: "18px",
                marginRight: "30px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Online Job Portal
            </span>
          </NavLink>

          {/* Links */}
          <NavLink to="/about" style={linkStyle}>
            About Us
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact Us
          </NavLink>
        </div>

        {/* RIGHT SIDE (Admin Links) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink to="/register/admin" style={linkStyle}>
            Register Admin
          </NavLink>
          <NavLink to="/add-category" style={linkStyle}>
            Add Category
          </NavLink>
          <NavLink to="/all-categories" style={linkStyle}>
            All Categories
          </NavLink>
          <NavLink to="/all-jobs" style={linkStyle}>
            All Jobs
          </NavLink>
          <NavLink to="/all-job-applications" style={linkStyle}>
            All Job Applications
          </NavLink>
          <NavLink to="/view-employees" style={linkStyle}>
            View Employees
          </NavLink>
          <NavLink to="/view-employers" style={linkStyle}>
            View Employers
          </NavLink>
          <span
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              color: "#444",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
