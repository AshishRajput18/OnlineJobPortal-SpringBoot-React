import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/all`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error loading jobs", err);
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/all-applications/${jobId}`);
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        .jobs-container {
          overflow-x: hidden;
        }
        .jobs-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .jobs-table {
          min-width: 1200px;
        }
        @media (max-width: 1024px) {
          .jobs-container {
            padding: 20px !important;
          }
          .jobs-header {
            font-size: 1.3rem !important;
            padding: 12px !important;
          }
          .jobs-table th,
          .jobs-table td {
            padding: 8px !important;
            font-size: 13px;
          }
        }
        @media (max-width: 768px) {
          .jobs-container {
            padding: 16px !important;
            margin: 20px auto !important;
          }
          .jobs-table th,
          .jobs-table td {
            font-size: 12px;
            padding: 6px !important;
          }
          .jobs-table img {
            width: 28px !important;
            height: 28px !important;
          }
          .applications-btn {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .jobs-container {
            padding: 12px !important;
          }
        }
      `}</style>

      <div style={containerStyle} className="jobs-container">
        <div style={headerStyle} className="jobs-header">All Posted Jobs</div>

        <div className="jobs-table-wrapper">
          <table style={tableStyle} className="jobs-table">
            <thead>
              <tr style={headerRowStyle}>
                <th style={headerCellStyle}>Company</th>
                <th style={headerCellStyle}>Logo</th>
                <th style={headerCellStyle}>Job Title</th>
                <th style={headerCellStyle}>Description</th>
                <th style={headerCellStyle}>Category</th>
                <th style={headerCellStyle}>Type</th>
                <th style={headerCellStyle}>Salary</th>
                <th style={headerCellStyle}>Exp</th>
                <th style={headerCellStyle}>Skills</th>
                <th style={headerCellStyle}>Location</th>
                <th style={headerCellStyle}>Posted</th>
                <th style={headerCellStyle}>Apps</th>
                <th style={headerCellStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={rowStyle}>
                  <td style={cellStyle}>{job.company}</td>

                  <td style={cellStyle}>
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt="logo"
                        style={{ width: "36px", height: "36px", borderRadius: "6px" }}
                      />
                    ) : (
                      <div style={fallbackLogoStyle}>
                        {job.company?.charAt(0)}
                      </div>
                    )}
                  </td>

                  <td style={cellStyle}>{job.title}</td>
                  <td style={cellStyle}>{job.jobDescription}</td>
                  <td style={cellStyle}>{job.jobCategory}</td>
                  <td style={cellStyle}>{job.type}</td>
                  <td style={cellStyle}>{job.salary}</td>
                  <td style={cellStyle}>{job.exp}</td>
                  <td style={cellStyle}>{job.requiredSkills}</td>
                  <td style={cellStyle}>{job.companyAddress}</td>
                  <td style={cellStyle}>{job.datePosted}</td>

                  <td style={{ ...cellStyle, textAlign: "center", fontWeight: "bold" }}>
                    {job.applicants}
                  </td>

                  <td style={cellStyle}>
                    <button
                      onClick={() => handleViewApplications(job.id)}
                      style={applicationsBtnStyle}
                      className="applications-btn"
                      disabled={job.applicants === 0}
                    >
                      View Applications
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

/* ---------------- Styles ---------------- */

const containerStyle = {
  width: "95%",
  maxWidth: "1400px",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "#FFF9E6",
  borderRadius: "12px",
  border: "1px solid #ff69b4",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const headerStyle = {
  backgroundColor: "#ff69b4",
  color: "white",
  padding: "14px",
  textAlign: "center",
  borderRadius: "8px",
  marginBottom: "28px",
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const tableStyle = { width: "100%", borderCollapse: "collapse" };

const headerRowStyle = { backgroundColor: "#ff69b4", color: "white" };

const headerCellStyle = { padding: "12px 10px", textAlign: "left" };

const cellStyle = {
  padding: "12px 10px",
  borderBottom: "1px solid #ffb3d9",
};

const rowStyle = { transition: "background-color 0.18s" };

const applicationsBtnStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const fallbackLogoStyle = {
  width: "36px",
  height: "36px",
  backgroundColor: "#ff69b4",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
};

export default AllJobs;
