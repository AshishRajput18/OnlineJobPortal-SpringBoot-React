import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      title: "ONLINE JOB PORTAL",
      text:
        "Welcome to our portal for career dreams. Explore jobs, connect with employers, and grow your career.",
    },
    {
      title: "ABOUT US",
      text:
        "Offering opportunities for both employers and employees to achieve their career goals.",
    },
    {
      title: "CONTACT US",
      text:
        "Reach us via email, phone, or support for guidance and assistance.",
    },
    {
      title: "CAREERS",
      text:
        "Join our growing team and help build a platform for career success.",
    },
    {
      title: "LINKS",
      text:
        "Important links, FAQs, and policies for your convenience.",
    },
  ];

  return (
    <footer style={styles.footer}>
      {/* Columns */}
      <div
        style={{
          ...styles.columns,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {columns.map((col, index) => (
          <div
            key={index}
            style={{
              ...styles.column,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <h4 style={styles.heading}>{col.title}</h4>
            <p style={styles.text}>{col.text}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div style={styles.bottomRow}>
        <button
          style={styles.loginButton}
          onClick={() => navigate("/user/login")}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.loginButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor =
              styles.loginButton.backgroundColor)
          }
        >
          <FaBriefcase style={{ marginRight: "6px" }} /> Login
        </button>

        <p style={styles.copyright}>
          © 2026 Online Job Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: "100%",
    backgroundColor: "#FFF9E6",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
    padding: "40px 5%",
    borderTop: "1px solid #eee",
  },
  columns: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  },
  column: {
    flex: "1 1 180px",
    minWidth: "160px",
    textAlign: "left",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#FF69B4",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#444",
    margin: 0,
  },
  bottomRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FF69B4",
    color: "#fff",
    border: "none",
    padding: "10px 26px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
  loginButtonHover: {
    backgroundColor: "#e555a0",
  },
  copyright: {
    fontSize: "12px",
    color: "#444",
    margin: 0,
    textAlign: "center",
  },
};

export default Footer;
