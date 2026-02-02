import { NavLink, useNavigate } from "react-router-dom";
import { FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // "admin", "employer", "employee", or null
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#ff69b4" : "#444",
    marginRight: "20px",
    fontSize: "15px",
    fontWeight: isActive ? "600" : "400",
    whiteSpace: "nowrap",
  });

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem("role");
    localStorage.removeItem("adminId");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("employerId");
    localStorage.removeItem("userName");
    
    navigate("/"); // redirect to home
    window.location.reload(); // refresh to reset state
  };

  return (
    <>
      <style>{`
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .left-section,
        .right-section {
          display: flex;
          align-items: center;
        }

        /* Hamburger menu button */
        .hamburger {
          display: none;
          font-size: 24px;
          cursor: pointer;
          color: #ff69b4;
        }

        .right-section a {
          margin-right: 20px;
        }

        /* Tablet */
        @media (max-width: 992px) {
          .header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .right-section {
            flex-wrap: wrap;
            width: 100%;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }

          .right-section {
            display: ${menuOpen ? "flex" : "none"};
            flex-direction: column;
            width: 100%;
            background-color: #fff3e0;
            padding: 10px 0;
            border-radius: 8px;
          }

          .right-section a {
            margin: 10px 20px;
          }

          .left-section {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <header
        style={{
          backgroundColor: "#FFF9E6",
          padding: "12px 40px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div className="header-container">
          {/* LEFT SIDE: Logo + Portal Name */}
          <div className="left-section">
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <div
                className="logo-circle"
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

            <FaBriefcase color="#ff69b4" style={{ marginRight: "6px" }} />

            <NavLink to="/" style={{ textDecoration: "none" }}>
              <span
                className="portal-title"
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

            {/* LEFT LINKS FOR DEFAULT USERS */}
            {!role && (
              <>
                <NavLink to="/about" style={linkStyle}>
                  About Us
                </NavLink>
                <NavLink to="/contact" style={linkStyle}>
                  Contact Us
                </NavLink>
              </>
            )}

            {/* Hamburger menu button */}
            <div
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          {/* RIGHT SIDE LINKS */}
          <div className="right-section">
            {role === "admin" && (
              <>
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
                <NavLink to="/all-applications" style={linkStyle}>
                  All Job Applications
                </NavLink>
                <NavLink to="/view-employees" style={linkStyle}>
                  View Employees
                </NavLink>
                <NavLink to="/view-employers" style={linkStyle}>
                  View Employers
                </NavLink>
                <NavLink to="/" style={linkStyle} onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            )}

            {role === "employer" && (
              <>
                <NavLink to="/add-job" style={linkStyle}>
                  Add Job
                </NavLink>
                <NavLink to="/my-jobs" style={linkStyle}>
                  My Jobs
                </NavLink>
                <NavLink to="/job-applications" style={linkStyle}>
                  Job Applications
                </NavLink>
                <NavLink to="/" style={linkStyle} onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            )}

            {role === "employee" && (
              <>
                <NavLink to="/applied-jobs" style={linkStyle}>
                  Applied Jobs
                </NavLink>
                <NavLink to="/employee-profile" style={linkStyle}>
                  My Profile
                </NavLink>
                <NavLink to="/" style={linkStyle} onClick={handleLogout}>
                  Logout
                </NavLink>
              </>
            )}

            {!role && (
              <>
                <NavLink to="/register/employer" style={linkStyle}>
                  Register Employer
                </NavLink>
                <NavLink to="/register/employee" style={linkStyle}>
                  Register Employee
                </NavLink>
                <NavLink to="/user/login" style={linkStyle}>
                  Login User
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
