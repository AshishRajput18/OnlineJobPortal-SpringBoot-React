import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications/all`
      );

      if (Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status = "") => {
    switch (status.toLowerCase()) {
      case 'shortlisted':
        return { backgroundColor: '#28a745', color: 'white' };
      case 'pending':
        return { backgroundColor: '#ffc107', color: 'black' };
      case 'rejected':
        return { backgroundColor: '#dc3545', color: 'white' };
      default:
        return { backgroundColor: '#6c757d', color: 'white' };
    }
  };

  return (
    <>
      {/* Responsive styles added — logic untouched */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .applications-container {
          overflow-x: hidden;
        }

        .applications-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .applications-table {
          min-width: 1100px;
        }

        @media (max-width: 768px) {
          .applications-container {
            padding: 16px !important;
            margin: 20px auto !important;
          }

          .applications-header {
            font-size: 16px !important;
            padding: 10px !important;
          }

          .applications-table th,
          .applications-table td {
            padding: 8px !important;
            font-size: 13px;
          }

          .applications-table img {
            width: 24px !important;
            height: 24px !important;
          }
        }

        @media (max-width: 480px) {
          .applications-container {
            padding: 12px !important;
          }

          .applications-table th,
          .applications-table td {
            font-size: 12px;
          }
        }
      `}</style>

      <div style={containerStyle} className="applications-container">
        <div style={headerStyle} className="applications-header">
          All Applications
        </div>

        <div className="applications-table-wrapper">
          <table style={tableStyle} className="applications-table">
            <thead>
              <tr style={headerRowStyle}>
                <th style={headerCellStyle}>Company Name</th>
                <th style={headerCellStyle}>Logo</th>
                <th style={headerCellStyle}>Job Title</th>
                <th style={headerCellStyle}>Category</th>
                <th style={headerCellStyle}>Type</th>
                <th style={headerCellStyle}>Employee Name</th>
                <th style={headerCellStyle}>Location</th>
                <th style={headerCellStyle}>Application ID</th>
                <th style={headerCellStyle}>Applied Date</th>
                <th style={headerCellStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: 20 }}>
                    Loading...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: 20 }}>
                    No Applications Found
                  </td>
                </tr>
              ) : (
                applications.map((app, index) => (
                  <tr key={index} style={rowStyle}>
                    <td style={wrapCellStyle}>
                      <strong>{app.companyName}</strong>
                    </td>

                    <td style={wrapCellStyle}>
                      {app.companyLogo ? (
                        <img
                          src={app.companyLogo}
                          alt="logo"
                          style={{ width: 28, height: 28 }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td style={wrapCellStyle}>{app.jobTitle}</td>
                    <td style={wrapCellStyle}>{app.category}</td>
                    <td style={wrapCellStyle}>{app.type}</td>
                    <td style={wrapCellStyle}>{app.employeeName}</td>
                    <td style={wrapCellStyle}>{app.location}</td>
                    <td style={wrapCellStyle}>{app.applicationId}</td>
                    <td style={wrapCellStyle}>{app.appliedDate}</td>

                    <td style={wrapCellStyle}>
                      <span
                        style={{
                          ...statusBadgeStyle,
                          ...getStatusStyle(app.status),
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

/* Styles */
const containerStyle = {
  width: '95%',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  backgroundColor: '#FFF9E6',
  border: '1px solid #ff69b4',
};

const headerStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '12px',
  textAlign: 'center',
  borderRadius: '6px',
  marginBottom: '25px',
  fontWeight: 'bold',
  fontSize: '18px',
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' };

const headerRowStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
};

const headerCellStyle = {
  padding: '12px',
  textAlign: 'left',
};

const rowStyle = {
  borderBottom: '1px solid #ff69b4',
};

const wrapCellStyle = {
  padding: '10px',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
  minWidth: '80px',
  textAlign: 'center',
  display: 'inline-block'
};

export default AllApplications;
