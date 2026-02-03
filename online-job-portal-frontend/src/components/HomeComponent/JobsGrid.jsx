import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobsGrid = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Responsive detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const employeeId = localStorage.getItem("employeeId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
    if (employeeId && role === "employee") {
      fetchAppliedJobs();
    }
  }, [employeeId, role]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    }
  };

  const handleApply = async (job) => {
    if (!employeeId && !role) {
      alert("Please login first to apply for jobs!");
      return;
    }

    if (role !== "employee") {
      alert(
        "Only employees can apply for jobs.\n\n" +
        `You are currently logged in as ${role ? role.toUpperCase() : "a user"}.\n` +
        "If you want to apply, please login with an employee account."
      );
      return;
    }

    if (appliedJobs.has(job.id)) {
      alert("You have already applied for this job!");
      return;
    }

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

      alert(res.data);

      if (
        res.data.toLowerCase().includes("submitted") ||
        res.data.toLowerCase().includes("success")
      ) {
        setAppliedJobs(prev => new Set([...prev, job.id]));
        setTimeout(() => navigate("/applied-jobs"), 1200);
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
    return <div style={{ textAlign: "center", padding: "100px" }}>Loading jobs...</div>;

  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", padding: "100px" }}>
        {error}
      </div>
    );

  return (
    <section
      style={{
        backgroundColor: "#FFF9E6",
        padding: isMobile ? "20px 12px 60px" : "40px 20px 80px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: isMobile ? "22px" : "32px",
          color: "#ff69b4",
          marginBottom: "24px",
          fontWeight: "700",
        }}
      >
        Search Jobs here...!!!
      </h2>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 40px",
          background: "white",
          padding: isMobile ? "16px" : "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          border: "2px solid #ffe4e1",
        }}
      >
        <input
          type="text"
          placeholder="Search by job title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: isMobile ? "12px" : "14px",
            fontSize: isMobile ? "14px" : "16px",
            border: "2px solid #ff69b4",
            borderRadius: "12px",
          }}
        />
      </div>

      {selectedJob ? (
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <button
            onClick={() => setSelectedJob(null)}
            style={{
              background: "#f0f0f0",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              marginBottom: "24px",
              fontSize: "15px",
            }}
          >
            ← Back to Job Listings
          </button>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: isMobile ? "18px" : "28px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              border: "2px solid #ffe4e1",
              marginBottom: "32px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <div style={{ flex: 1, minWidth: "320px" }}>
              <h3 style={{ color: "#ff69b4", marginBottom: "16px" }}>
                Company Details
              </h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    selectedJob.companyLogo ||
                    selectedJob.logo ||
                    "https://via.placeholder.com/60"
                  }
                  alt="Company Logo"
                  style={{
                    width: 60,
                    marginRight: 20,
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h4 style={{ margin: 0 }}>
                    {selectedJob.companyName ||
                      selectedJob.company ||
                      "Company Name"}
                  </h4>
                  <p style={{ margin: "6px 0 0", color: "#444" }}>
                    {selectedJob.location ||
                      selectedJob.companyAddress ||
                      "Location not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: "320px" }}>
              <h3 style={{ color: "#ff69b4", marginBottom: "16px" }}>
                Job Details
              </h3>
              <div style={{ lineHeight: 1.6 }}>
                <p><strong>Title:</strong> {selectedJob.jobTitle || selectedJob.title || "—"}</p>
                <p><strong>Category:</strong> {selectedJob.category || selectedJob.jobCategory || "—"}</p>
                <p><strong>Type:</strong> {selectedJob.type || "—"}</p>
                <p><strong>Salary:</strong> {selectedJob.salary || "Not disclosed"}</p>
                <p><strong>Experience:</strong> {selectedJob.experience || selectedJob.exp || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: isMobile ? "18px" : "28px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              border: "2px solid #ffe4e1",
            }}
          >
            <h3 style={{ color: "#ff69b4", marginBottom: "24px" }}>
              Description & Requirements
            </h3>

            <p style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
              {selectedJob.jobDescription || "No description available."}
            </p>

            <div style={{ marginTop: "24px" }}>
              <strong>Required Skills:</strong>
              <p>
                {selectedJob.skills ||
                  selectedJob.requiredSkills ||
                  "Not specified"}
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button
                onClick={() => handleApply(selectedJob)}
                disabled={
                  applyingJobId === selectedJob.id ||
                  isAlreadyApplied(selectedJob.id)
                }
                style={{
                  backgroundColor: isAlreadyApplied(selectedJob.id)
                    ? "#6c757d"
                    : applyingJobId === selectedJob.id
                    ? "#ccc"
                    : "#ff69b4",
                  color: "white",
                  border: "none",
                  padding: "16px 48px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor:
                    applyingJobId === selectedJob.id ||
                    isAlreadyApplied(selectedJob.id)
                      ? "not-allowed"
                      : "pointer",
                  minWidth: isMobile ? "100%" : "220px",
                }}
              >
                {isAlreadyApplied(selectedJob.id)
                  ? "Already Applied"
                  : applyingJobId === selectedJob.id
                  ? "Applying..."
                  : "Apply for Job"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(320px, 1fr))",
            gap: isMobile ? "16px" : "24px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {filteredJobs.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                gridColumn: "1 / -1",
                color: "#666",
                fontSize: "18px",
              }}
            >
              No jobs found matching your search.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: isMobile ? "18px" : "24px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  border: "2px solid #ffe4e1",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={
                      job.companyLogo ||
                      job.logo ||
                      "https://via.placeholder.com/48"
                    }
                    alt="Company Logo"
                    style={{
                      width: 48,
                      height: 48,
                      marginRight: 16,
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>
                      {job.jobTitle || job.title || "Job Title"}
                    </h3>
                    <p style={{ color: "#ff69b4", margin: "4px 0 0" }}>
                      {job.category || job.jobCategory || "Category"}
                    </p>
                  </div>
                </div>

                <p style={{ margin: "8px 0" }}>{job.type || "—"}</p>
                <p style={{ fontWeight: "bold", color: "#ff69b4" }}>
                  {job.salary || "Not specified"}
                </p>
                <p style={{ color: "#555" }}>
                  {job.experience || job.exp || "Experience not specified"}
                </p>

                {isAlreadyApplied(job.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#28a745",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Applied
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default JobsGrid;
