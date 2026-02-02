import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employerId = localStorage.getItem('employerId');

  useEffect(() => {
    if (!employerId) {
      setError('Please login as an employer first!');
      setLoading(false);
      return;
    }
    fetchMyJobs();
  }, [employerId]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:8080/api/jobs/my-jobs?employerId=${employerId}`);
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.response?.data?.message || 'Failed to load your posted jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/my-jobs/applications/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting?\n\nThis action cannot be undone.')) {
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:8080/api/jobs/delete/${jobId}`);
      alert(res.data || 'Job deleted successfully!');
      setJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Delete failed:', err);
      alert(err.response?.data || 'Failed to delete job.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>My Posted Jobs</div>

      {loading ? (
        <div style={loadingStyle}>Loading your posted jobs...</div>
      ) : error ? (
        <div style={errorStyle}>
          {error}
          <button onClick={fetchMyJobs} style={retryBtnStyle}>Try Again</button>
        </div>
      ) : jobs.length === 0 ? (
        <div style={emptyStyle}>
          <p>You haven't posted any jobs yet.</p>
          <button onClick={() => navigate('/add-job')} style={postJobBtnStyle}>
            Post a New Job
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={headerRowStyle}>
                <th style={headerCellStyle}>Company</th>
                <th style={headerCellStyle}>Logo</th>
                <th style={headerCellStyle}>Job Title</th>
                <th style={headerCellStyle}>Description</th>
                <th style={headerCellStyle}>Category</th>
                <th style={headerCellStyle}>Type</th>
                <th style={headerCellStyle}>Salary</th>
                <th style={headerCellStyle}>Experience</th>
                <th style={headerCellStyle}>Skills</th>
                <th style={headerCellStyle}>Location</th>
                <th style={headerCellStyle}>Posted Date</th>
                <th style={headerCellStyle}>Applications</th>
                <th style={headerCellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={rowStyle}>
                  <td style={cellStyle}>{job.companyName || '—'}</td>
                  <td style={cellStyle}>
                    {job.logo ? (
                      <img src={job.logo} alt={job.companyName || 'Company'} style={logoStyle} onError={(e) => (e.target.style.display = 'none')} />
                    ) : (
                      <div style={logoFallbackStyle}>{(job.companyName || '?').charAt(0).toUpperCase()}</div>
                    )}
                  </td>
                  <td style={cellStyle}>{job.jobTitle || '—'}</td>
                  <td style={{ ...cellStyle, maxWidth: '220px', whiteSpace: 'pre-wrap' }}>
                    {job.jobDescription?.substring(0, 100) || 'No description'}...
                  </td>
                  <td style={cellStyle}>{job.category || '—'}</td>
                  <td style={cellStyle}>{job.type || '—'}</td>
                  <td style={cellStyle}>{job.salary || 'Not disclosed'}</td>
                  <td style={cellStyle}>{job.experience || '—'}</td>
                  <td style={cellStyle}>{job.skills || '—'}</td>
                  <td style={cellStyle}>{job.city || job.location || '—'}</td>
                  <td style={cellStyle}>{job.postedDate || '—'}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 'bold', color: '#28a745' }}>
                    {job.applicationCount || 0}
                    {(job.applicationCount || 0) > 0 && <span style={countLabelStyle}>candidate{(job.applicationCount || 0) !== 1 ? 's' : ''}</span>}
                  </td>
                  <td style={{ ...cellStyle, whiteSpace: 'nowrap', textAlign: 'center' }}>
                    <div style={actionContainerStyle}>
                      <button
                        onClick={() => handleViewApplications(job.id)}
                        disabled={(job.applicationCount || 0) === 0}
                        style={{
                          ...actionBtnStyle,
                          backgroundColor: (job.applicationCount || 0) > 0 ? '#28a745' : '#adb5bd',
                          cursor: (job.applicationCount || 0) > 0 ? 'pointer' : 'not-allowed',
                          opacity: (job.applicationCount || 0) > 0 ? 1 : 0.6,
                        }}
                      >
                        View Applications ({job.applicationCount || 0})
                      </button>

                      <button onClick={() => handleDeleteJob(job.id)} style={{ ...actionBtnStyle, backgroundColor: '#dc3545' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* Styles – unchanged */
const containerStyle = { width: '95%', maxWidth: '1440px', margin: '40px auto', padding: '30px', backgroundColor: '#FFF9E6', borderRadius: '12px', border: '1px solid #ff69b4', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' };
const headerStyle = { backgroundColor: '#ff69b4', color: 'white', padding: '16px', textAlign: 'center', borderRadius: '10px', marginBottom: '30px', fontSize: '1.8rem', fontWeight: 'bold' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const headerRowStyle = { backgroundColor: '#ff69b4', color: 'white' };
const headerCellStyle = { padding: '14px 12px', textAlign: 'left', fontWeight: '600', fontSize: '0.95rem', borderBottom: '2px solid #ffb3d9' };
const cellStyle = { padding: '14px 12px', borderBottom: '1px solid #ffb3d9', verticalAlign: 'middle', fontSize: '0.95rem' };
const rowStyle = { transition: 'background-color 0.2s' };
const actionContainerStyle = { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' };
const actionBtnStyle = { color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '500', minWidth: '130px', cursor: 'pointer' };
const logoStyle = { width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain' };
const logoFallbackStyle = { width: '36px', height: '36px', backgroundColor: '#ff69b4', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' };
const loadingStyle = { textAlign: 'center', padding: '80px 20px', fontSize: '18px', color: '#555' };
const errorStyle = { textAlign: 'center', padding: '80px 20px', color: '#dc3545', fontSize: '18px' };
const retryBtnStyle = { marginTop: '20px', padding: '12px 28px', background: '#ff69b4', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' };
const emptyStyle = { textAlign: 'center', padding: '80px 20px', color: '#555', fontSize: '18px' };
const postJobBtnStyle = { marginTop: '20px', padding: '12px 28px', background: '#ff69b4', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' };
const countLabelStyle = { fontSize: '12px', color: '#555', display: 'block', marginTop: '4px' };

export default MyJobs;
