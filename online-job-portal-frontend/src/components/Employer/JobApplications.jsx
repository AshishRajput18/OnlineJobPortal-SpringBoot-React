import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateApplicationStatusModal from './UpdateApplicationStatusModal';

const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const employerId = localStorage.getItem('employerId');

  useEffect(() => {
    if (!employerId) {
      setError('Please login as an employer first!');
      setLoading(false);
      return;
    }
    fetchApplications();
  }, [employerId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications/employer/${employerId}`
      );
      setApplications(res.data || []);
    } catch (err) {
      console.error('Failed to load applications:', err);
      const msg =
        err.response?.data?.message ||
        'Failed to load job applications.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'shortlisted':
        return { backgroundColor: '#28a745', color: 'white' };
      case 'pending':
      case 'applied':
        return { backgroundColor: '#ffc107', color: 'black' };
      case 'rejected':
        return { backgroundColor: '#dc3545', color: 'white' };
      case 'cancelled':
        return { backgroundColor: '#6c757d', color: 'white' };
      default:
        return { backgroundColor: '#6c757d', color: 'white' };
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const app = applications[selectedIndex];

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/applications/${app.applicationId}/status`,
        { status: newStatus }
      );

      const updated = [...applications];
      updated[selectedIndex].status = newStatus;
      setApplications(updated);
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/user-profile/${employeeId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: '#dc3545',
          textAlign: 'center',
          padding: '100px',
        }}
      >
        {error}
        <br />
        <button
          onClick={fetchApplications}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#ff69b4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Responsive CSS added — logic untouched */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .applications-container {
          overflow-x: hidden;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .applications-table {
          min-width: 900px;
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

          .applications-table button {
            padding: 5px 8px !important;
            font-size: 11px !important;
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

        {applications.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#555',
            }}
          >
            No applications received yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table style={tableStyle} className="applications-table">
              <thead>
                <tr style={headerRowStyle}>
                  <th style={headerCellStyle}>Company</th>
                  <th style={headerCellStyle}>Logo</th>
                  <th style={headerCellStyle}>Job Title</th>
                  <th style={headerCellStyle}>Category</th>
                  <th style={headerCellStyle}>Type</th>
                  <th style={headerCellStyle}>Employee</th>
                  <th style={headerCellStyle}>Location</th>
                  <th style={headerCellStyle}>Application ID</th>
                  <th style={headerCellStyle}>Applied Date</th>
                  <th style={headerCellStyle}>Status</th>
                  <th style={headerCellStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app.applicationId || index}
                    style={rowStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f8f9fa')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '')
                    }
                  >
                    <td style={cellStyle}>
                      <strong>{app.companyName || '—'}</strong>
                    </td>

                    <td style={cellStyle}>
                      <img
                        src={
                          app.companyLogo ||
                          'https://via.placeholder.com/28?text=Logo'
                        }
                        alt={app.companyName || 'Company'}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '4px',
                          objectFit: 'contain',
                        }}
                        onError={(e) =>
                          (e.target.src =
                            'https://via.placeholder.com/28?text=?')
                        }
                      />
                    </td>

                    <td style={cellStyle}>{app.jobTitle || '—'}</td>
                    <td style={cellStyle}>{app.category || '—'}</td>
                    <td style={cellStyle}>{app.type || '—'}</td>

                    <td
                      style={{
                        ...cellStyle,
                        color: '#007bff',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                      onClick={() =>
                        handleEmployeeClick(app.employeeId)
                      }
                    >
                      {app.employeeName || '—'}
                    </td>

                    <td style={cellStyle}>{app.location || '—'}</td>
                    <td style={cellStyle}>
                      {app.applicationId || '—'}
                    </td>
                    <td style={cellStyle}>
                      {app.appliedDate || '—'}
                    </td>

                    <td style={cellStyle}>
                      <span
                        style={{
                          ...statusBadgeStyle,
                          ...getStatusStyle(app.status),
                        }}
                      >
                        {app.status || 'Unknown'}
                      </span>
                    </td>

                    <td style={cellStyle}>
                      <button
                        style={updateButtonStyle}
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsModalOpen(true);
                        }}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <UpdateApplicationStatusModal
          isOpen={isModalOpen}
          currentStatus={
            selectedIndex !== null
              ? applications[selectedIndex]?.status
              : ''
          }
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleStatusUpdate}
        />
      </div>
    </>
  );
};

/* ================= STYLES ================= */

const containerStyle = {
  width: '95%',
  margin: '40px auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  backgroundColor: '#FFF9E6',
  fontFamily: 'Arial, sans-serif',
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
const headerRowStyle = { backgroundColor: '#ff69b4', color: 'white' };
const headerCellStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600',
};
const rowStyle = { borderBottom: '1px solid #ff69b4' };

const cellStyle = {
  padding: '10px',
  verticalAlign: 'middle',
};

const statusBadgeStyle = {
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600',
};

const updateButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
};

export default JobApplications;
