import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplicationsId = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `http://localhost:8080/api/applications/job/${jobId}`
      );

      setApplications(res.data || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .job-applications-container { padding: 20px !important; margin: 20px auto !important; }
          .job-applications-container table { display: block; width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .job-applications-container table td,
          .job-applications-container table th { white-space: nowrap; }
          .job-applications-container img { max-width: 28px !important; max-height: 28px !important; }
        }
        @media (max-width: 480px) {
          .job-applications-container { padding: 15px !important; margin: 15px auto !important; }
          .job-applications-container header { font-size: 1.3rem !important; }
        }
      `}</style>

      <div className="job-applications-container" style={containerStyle}>
        <div style={headerStyle}>
          Applications for Job #{jobId || '—'}
        </div>

        {loading ? (
          <div style={noDataStyle}>Loading applications...</div>
        ) : error ? (
          <div style={noDataStyle}>{error}</div>
        ) : applications.length === 0 ? (
          <div style={noDataStyle}>
            No applications found for this job.
          </div>
        ) : (
          <table style={tableStyle}>
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
                  <td style={cellStyle}>{app.companyName || '—'}</td>

                  <td style={cellStyle}>
                    {app.companyLogo ? (
                      <img
                        src={app.companyLogo}
                        alt="Logo"
                        style={logoFallbackStyle}
                      />
                    ) : (
                      <div style={logoFallbackStyle}>
                        {(app.companyName || '?').charAt(0)}
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
        )}
      </div>
    </>
  );
};

/* ─── Styles ───────────────────────── */

const containerStyle = {
  width: '95%',
  maxWidth: '1440px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#FFF9E6',
  borderRadius: '12px',
  border: '1px solid #ff69b4',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  overflowX: 'hidden', // prevents horizontal scroll on small screens
};

const headerStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '16px',
  textAlign: 'center',
  borderRadius: '10px',
  marginBottom: '30px',
  fontSize: '1.6rem',
  fontWeight: 'bold',
};

const tableStyle = { width: '100%', borderCollapse: 'collapse' };

const headerRowStyle = { backgroundColor: '#ff69b4', color: 'white' };

const headerCellStyle = {
  padding: '14px 12px',
  textAlign: 'left',
  fontWeight: '600',
};

const cellStyle = {
  padding: '14px 12px',
  borderBottom: '1px solid #ffb3d9',
};

const rowStyle = { transition: 'background-color 0.2s' };

const statusBadgeStyle = (status) => ({
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
  display: 'inline-block',
});

const logoFallbackStyle = {
  width: '36px',
  height: '36px',
  backgroundColor: '#ff69b4',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
};

const noDataStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#666',
  fontSize: '1.15rem',
};

export default JobApplicationsId;
