import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

const JobsGrid = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Get login information from localStorage
  const employeeId = localStorage.getItem("employeeId");
  const role = localStorage.getItem("role"); // expected values: "employee", "employer", "admin"

  // Breakpoints
  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 768;
  const isSmallDesktop = width > 768 && width <= 1024;

  // Responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return '1fr';
    if (isTablet) return 'repeat(2, 1fr)';
    if (isSmallDesktop) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  useEffect(() => {
    fetchJobs();
    // Only fetch applied jobs if the user is an employee
    if (employeeId && role === "employee") {
      fetchAppliedJobs();
    }
  }, [employeeId, role]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/all`);
      setJobsData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error loading jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/applications/employee/${employeeId}`);
      const appliedJobIds = res.data.map(app => app.jobId);
      setAppliedJobs(new Set(appliedJobIds));
    } catch (err) {
      console.error("Failed to load applied jobs status:", err);
      // Don't block UI — just proceed without pre-check
    }
  };

  const handleApply = async (job) => {
    // 1. Not logged in at all
    if (!employeeId && !role) {
      alert("Please login first to apply for jobs!");
      return;
    }

    // 2. Logged in but NOT an employee
    if (role !== "employee") {
      alert(
        "Only employees can apply for jobs.\n\n" +
        `You are currently logged in as ${role ? role.toUpperCase() : "a user"}.\n` +
        "If you want to apply, please login with an employee account."
      );
      return;
    }

    // 3. Already applied (only checked for employees)
    if (appliedJobs.has(job.id)) {
      alert("You have already applied for this job!");
      return;
    }

    // 4. Confirm
    if (!window.confirm(`Apply for "${job.jobTitle || job.title || 'this job'}"?`)) return;

    setApplyingJobId(job.id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications/apply`,
        null,
        {
          params: {
            employeeId: employeeId,
            jobId: job.id,
          },
        }
      );

      alert(res.data); // e.g. "Application submitted successfully!"

      if (res.data.toLowerCase().includes("submitted") || res.data.toLowerCase().includes("success")) {
        // Update local state so button disables immediately
        setAppliedJobs(prev => new Set([...prev, job.id]));
        setTimeout(() => {
          navigate("/applied-jobs");
        }, 1200);
      }
    } catch (err) {
      console.error("Apply failed:", err);
      const msg = err.response?.data || "Failed to apply. Please try again.";
      alert(msg);
    } finally {
      setApplyingJobId(null);
    }
  };

  const isAlreadyApplied = (jobId) => appliedJobs.has(jobId);

  const filteredJobs = jobsData.filter(
    (job) =>
      (job.jobTitle || job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: isMobile ? '16px' : '18px',
        color: '#555'
      }}>
        Loading jobs...
      </div>
    );

  if (error)
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: isMobile ? '15px' : '17px',
        color: 'red',
        textAlign: 'center',
        padding: '0 16px'
      }}>
        {error}
      </div>
    );

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '16px 12px' : isTablet ? '24px 18px' : '32px 24px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%'
    }}>

      {/* Search Input */}
      <div style={{ marginBottom: isMobile ? '18px' : '24px' }}>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#ff69b4',
          fontWeight: '600',
          marginBottom: '8px',
          marginLeft: '2px'
        }}>
          Search Jobs here...!!!
        </p>
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: isMobile ? '12px 14px' : '14px',
            fontSize: isMobile ? '14px' : '16px',
            border: '2px solid #ff69b4',
            borderRadius: '12px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {selectedJob ? (
        /* ──────────── JOB DETAIL VIEW ──────────── */
        <div style={{ boxSizing: 'border-box' }}>

          {/* Back Button */}
          <button
            onClick={() => setSelectedJob(null)}
            style={{
              background: '#f0f0f0',
              border: 'none',
              padding: isMobile ? '8px 14px' : '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '24px',
              fontSize: isMobile ? '14px' : '15px'
            }}
          >
            ← Back to Job Listings
          </button>

          {/* Company Details Card */}
          <div style={{
            background: 'linear-gradient(135deg, #ff69b4, #ff85c2)',
            borderRadius: '16px',
            padding: isMobile ? '18px 16px' : '24px',
            marginBottom: '20px',
            color: 'white',
            boxSizing: 'border-box'
          }}>
            <h2 style={{
              margin: '0 0 4px 0',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              Company Details
            </h2>
            <h3 style={{
              margin: '8px 0 4px 0',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700'
            }}>
              {selectedJob.companyName || selectedJob.company || 'Company Name'}
            </h3>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '13px' : '14px',
              opacity: 0.9
            }}>
              {selectedJob.location || selectedJob.companyAddress || 'Location not specified'}
            </p>
          </div>

          {/* Job Details Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '18px 16px' : '24px',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '2px solid #ffe4e1',
            boxSizing: 'border-box'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              color: '#ff69b4',
              fontSize: isMobile ? '17px' : '20px',
              borderBottom: '2px solid #ffe4e1',
              paddingBottom: '10px'
            }}>
              Job Details
            </h3>

            {/* Responsive: stack on mobile, 2-col grid on tablet+, then wrap */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '10px 0' : '12px 24px'
            }}>
              {[
                { label: 'Title', value: selectedJob.jobTitle || selectedJob.title || '—' },
                { label: 'Category', value: selectedJob.category || selectedJob.jobCategory || '—' },
                { label: 'Type', value: selectedJob.type || '—' },
                { label: 'Salary', value: selectedJob.salary || 'Not disclosed' },
                { label: 'Experience', value: selectedJob.experience || selectedJob.exp || 'Not specified' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600', color: '#555', fontSize: isMobile ? '13px' : '14px' }}>
                    {item.label}:
                  </span>
                  <span style={{ color: '#333', fontSize: isMobile ? '13px' : '14px' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Requirements Card */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '18px 16px' : '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '2px solid #ffe4e1',
            boxSizing: 'border-box'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              color: '#ff69b4',
              fontSize: isMobile ? '17px' : '20px',
              borderBottom: '2px solid #ffe4e1',
              paddingBottom: '10px'
            }}>
              Description & Requirements
            </h3>
            <p style={{
              color: '#444',
              lineHeight: '1.6',
              fontSize: isMobile ? '13px' : '14px',
              margin: '0 0 16px 0'
            }}>
              {selectedJob.jobDescription || 'No description available.'}
            </p>
            <p style={{
              fontWeight: '600',
              color: '#555',
              fontSize: isMobile ? '13px' : '14px',
              margin: '0 0 6px 0'
            }}>
              Required Skills:
            </p>
            <p style={{
              color: '#444',
              fontSize: isMobile ? '13px' : '14px',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {selectedJob.skills || selectedJob.requiredSkills || "Not specified"}
            </p>
          </div>

          {/* Apply Button — full width on mobile */}
          <div style={{
            textAlign: isMobile ? 'center' : 'left',
            paddingBottom: isMobile ? '24px' : '0'
          }}>
            <button
              onClick={() => handleApply(selectedJob)}
              disabled={applyingJobId === selectedJob.id || isAlreadyApplied(selectedJob.id)}
              style={{
                backgroundColor: isAlreadyApplied(selectedJob.id)
                  ? '#6c757d'
                  : applyingJobId === selectedJob.id
                    ? '#ccc'
                    : '#ff69b4',
                color: 'white',
                border: 'none',
                padding: isMobile ? '16px 0' : '16px 48px',
                borderRadius: '12px',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 'bold',
                cursor: (applyingJobId === selectedJob.id || isAlreadyApplied(selectedJob.id))
                  ? 'not-allowed'
                  : 'pointer',
                minWidth: isMobile ? '100%' : '220px',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box'
              }}
            >
              {isAlreadyApplied(selectedJob.id)
                ? 'Already Applied'
                : applyingJobId === selectedJob.id
                  ? 'Applying...'
                  : 'Apply for Job'}
            </button>
          </div>
        </div>

      ) : (
        /* ──────────── JOB LISTING GRID ──────────── */
        <div>
          {filteredJobs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#888',
              fontSize: isMobile ? '15px' : '17px',
              marginTop: '48px',
              padding: '0 12px'
            }}>
              No jobs found matching your search.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: getGridColumns(),
              gap: isMobile ? '16px' : isTablet ? '20px' : '24px'
            }}>
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: isMobile ? '18px 16px' : '24px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    border: '2px solid #ffe4e1',
                    cursor: 'pointer',
                    position: 'relative',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  {/* Job Title */}
                  <h3 style={{
                    margin: 0,
                    fontSize: isMobile ? '17px' : '19px',
                    color: '#333',
                    fontWeight: '700',
                    paddingRight: isAlreadyApplied(job.id) ? '70px' : '0'
                  }}>
                    {job.jobTitle || job.title || 'Job Title'}
                  </h3>

                  {/* Category */}
                  <span style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#ff69b4',
                    fontWeight: '600'
                  }}>
                    {job.category || job.jobCategory || 'Category'}
                  </span>

                  {/* Type */}
                  <span style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#666'
                  }}>
                    {job.type || '—'}
                  </span>

                  {/* Salary */}
                  <span style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#444',
                    fontWeight: '500'
                  }}>
                    💰 {job.salary || 'Not specified'}
                  </span>

                  {/* Experience */}
                  <span style={{
                    fontSize: isMobile ? '12px' : '13px',
                    color: '#888'
                  }}>
                    {job.experience || job.exp || 'Experience not specified'}
                  </span>

                  {/* Already Applied Badge */}
                  {isAlreadyApplied(job.id) && (
                    <span style={{
                      position: 'absolute',
                      top: isMobile ? '12px' : '16px',
                      right: isMobile ? '12px' : '16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: isMobile ? '11px' : '12px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      ✓ Applied
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsGrid;