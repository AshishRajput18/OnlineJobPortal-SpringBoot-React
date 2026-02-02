import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AllApplicationsId = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/applications/job/${jobId}`
      );
      setApplications(res.data || []);
    } catch (error) {
      console.error("Error fetching applications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        .applications-container { overflow-x: hidden; }
        .applications-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .applications-table { min-width: 1100px; }
        @media (max-width: 1024px) {
          .applications-container { padding: 20px !important; }
          .applications-header { font-size: 1.3rem !important; padding: 12px !important; }
          .applications-table th,
          .applications-table td { padding: 8px !important; font-size: 13px; }
          .applications-table img { width: 28px !important; height: 28px !important; }
        }
        @media (max-width: 768px) {
          .applications-container { padding: 16px !important; margin: 20px auto !important; }
          .applications-table th,
          .applications-table td { font-size: 12px; padding: 6px !important; }
        }
        @media (max-width: 480px) {
          .applications-container { padding: 12px !important; }
        }
      `}</style>

      <div style={containerStyle} className="applications-container">
        <div style={headerStyle} className="applications-header">
          Applications for Job ID: {jobId}
        </div>

        {loading ? (
          <div style={noDataStyle}>Loading...</div>
        ) : applications.length === 0 ? (
          <div style={noDataStyle}>
            No applications found for this job.
          </div>
        ) : (
          <div className="applications-table-wrapper">
            <table style={tableStyle} className="applications-table">
              <thead>
                <tr style={headerRowStyle}>
                  <th style={headerCellStyle}>Company</th>
                  <th style={headerCellStyle}>Logo</th>
                  <th style={headerCellStyle}>Job Title</th>
                  <th style={headerCellStyle}>Category</th>
                  <th style={headerCellStyle}>Type</th>
                  <th style={headerCellStyle}>Applicant</th>
                  <th style={headerCellStyle}>Location</th>
                  <th style={headerCellStyle}>Application ID</th>
                  <th style={headerCellStyle}>Applied Date</th>
                  <th style={headerCellStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} style={rowStyle}>
                    <td style={cellStyle}>{app.companyName}</td>

                    <td style={cellStyle}>
                      {app.companyLogo ? (
                        <img
                          src={app.companyLogo}
                          alt="logo"
                          style={{ width: 36, height: 36 }}
                        />
                      ) : (
                        <div style={logoFallbackStyle}>
                          {app.companyName?.charAt(0)}
                        </div>
                      )}
                    </td>

                    <td style={cellStyle}>{app.jobTitle}</td>
                    <td style={cellStyle}>{app.category}</td>
                    <td style={cellStyle}>{app.type}</td>
                    <td style={cellStyle}>{app.employeeName}</td>
                    <td style={cellStyle}>{app.location}</td>
                    <td style={cellStyle}>{app.applicationId}</td>
                    <td style={cellStyle}>{app.appliedDate}</td>

                    <td style={cellStyle}>
                      <span style={statusBadgeStyle(app.status)}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* Styles */
const containerStyle = {
  width: '95%',
  maxWidth: '1400px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#FFF9E6',
  borderRadius: '12px',
  border: '1px solid #ff69b4',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const headerStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
  borderRadius: '8px',
  marginBottom: '28px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' };

const headerRowStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
};

const headerCellStyle = { padding: '12px', textAlign: 'left' };

const cellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ffb3d9',
};

const rowStyle = {
  borderBottom: '1px solid #ffd6eb',
};

const statusBadgeStyle = (status = "") => ({
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  color: 'white',
  backgroundColor:
    status === 'Shortlisted' ? '#28a745' :
    status === 'Pending' ? '#ffc107' :
    status === 'Rejected' ? '#dc3545' :
    '#6c757d',
});

const logoFallbackStyle = {
  width: 36,
  height: 36,
  backgroundColor: '#ff69b4',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
};

const noDataStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#555',
};

export default AllApplicationsId;
