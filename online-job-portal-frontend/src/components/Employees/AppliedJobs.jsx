import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (!employeeId) {
      setError("Please login first to view your applications.");
      setLoading(false);
      return;
    }
    fetchApplications();
  }, [employeeId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:8080/api/applications/employee/${employeeId}`);
      setApplications(res.data || []);
    } catch (err) {
      console.error("Failed to load applications:", err);
      const msg = err.response?.data?.message || err.response?.data || err.message || "Unknown error";
      setError(`Could not load applications: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (applicationId) => {
    if (!window.confirm("Are you sure you want to cancel this application?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/applications/${applicationId}`);
      alert("Application cancelled successfully!");
      fetchApplications(); // refresh
      setSelectedApplication(null);
    } catch (err) {
      console.error("Cancel failed:", err);
      const msg = err.response?.data?.message || err.response?.data || "Failed to cancel";
      alert(msg);
    }
  };

  const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase().trim();
    if (s.includes("shortlist") || s === "shortlisted") return { backgroundColor: "#28a745", color: "white" };
    if (s.includes("reject") || s === "rejected") return { backgroundColor: "#dc3545", color: "white" };
    if (s.includes("pending") || s === "applied") return { backgroundColor: "#ffc107", color: "black" };
    if (s === "cancelled") return { backgroundColor: "#6c757d", color: "white" };
    return { backgroundColor: "#6c757d", color: "white" };
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "18px" }}>Loading your applications...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "#dc3545", textAlign: "center", padding: "120px 20px", fontSize: "18px" }}>
        {error}
        <br />
        <button
          onClick={fetchApplications}
          style={{
            marginTop: "20px",
            padding: "10px 24px",
            background: "#ff69b4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={pageWrapStyle}>
      <div style={cardStyle}>
        {selectedApplication ? (
          <div>
            <button
              onClick={() => setSelectedApplication(null)}
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
              ← Back to Applied Jobs
            </button>

            <div style={detailCardStyle}>
              <h2 style={{ color: "#ff69b4", textAlign: "center", marginBottom: "24px" }}>
                {selectedApplication.jobTitle || "Job Title"}
              </h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", marginBottom: "32px" }}>
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <h3 style={{ color: "#ff69b4", marginBottom: "16px" }}>Company</h3>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <img
                      src={selectedApplication.companyLogo || "https://via.placeholder.com/64?text=Logo"}
                      alt={selectedApplication.companyName || "Company"}
                      style={{ width: 64, height: 64, borderRadius: "12px", marginRight: 20, objectFit: "contain" }}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=?")}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: "22px" }}>
                        {selectedApplication.companyName || "Company Name"}
                      </h4>
                      <p style={{ margin: "6px 0 0", color: "#555" }}>
                        {selectedApplication.location || "Location not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: "300px" }}>
                  <h3 style={{ color: "#ff69b4", marginBottom: "16px" }}>Application Info</h3>
                  <div style={{ fontSize: "15px", lineHeight: 1.6 }}>
                    {/* Application ID shown FIRST */}
                    <p><strong>Application ID:</strong> {selectedApplication.applicationId || "—"}</p>
                    <p><strong>Applied Date:</strong> {selectedApplication.appliedDate || "—"}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span style={{ ...statusBadgeStyle, ...getStatusStyle(selectedApplication.status) }}>
                        {selectedApplication.status || "Unknown"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div style={jobInfoCardStyle}>
                <h3 style={{ color: "#ff69b4", marginBottom: "16px" }}>Job Information</h3>
                <p><strong>Description:</strong><br />{selectedApplication.jobDescription || "Not available"}</p>
                <p><strong>Category:</strong> {selectedApplication.category || "—"}</p>
                <p><strong>Type:</strong> {selectedApplication.type || "—"}</p>
                <p><strong>Experience:</strong> {selectedApplication.experience || "—"}</p>
                <p><strong>Skills:</strong> {selectedApplication.skills || "Not specified"}</p>
              </div>

              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <button
                  onClick={() => handleCancel(selectedApplication.applicationId)}
                  disabled={!selectedApplication.applicationId || selectedApplication.status?.toLowerCase() === "cancelled"}
                  style={{
                    background: selectedApplication.status?.toLowerCase() === "cancelled" ? "#6c757d" : "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "14px 40px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: (!selectedApplication.applicationId || selectedApplication.status?.toLowerCase() === "cancelled") ? "not-allowed" : "pointer",
                  }}
                >
                  {selectedApplication.status?.toLowerCase() === "cancelled" ? "Already Cancelled" : "Cancel Application"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div style={headerStyle}>My Applied Jobs</div>

            {applications.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <p style={{ color: "#777", fontSize: "18px", marginBottom: "20px" }}>
                  You haven't applied to any jobs yet.
                </p>
                <button
                  onClick={() => navigate("/")} // ← change to your jobs page route
                  style={{
                    background: "#ff69b4",
                    color: "white",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      {/* Application ID is now FIRST column */}
                      <th style={headerCellStyle}>Application ID</th>
                      <th style={headerCellStyle}>Company</th>
                      <th style={headerCellStyle}>Logo</th>
                      <th style={headerCellStyle}>Job Title</th>
                      <th style={headerCellStyle}>Category</th>
                      <th style={headerCellStyle}>Type</th>
                      <th style={headerCellStyle}>Location</th>
                      <th style={headerCellStyle}>Applied Date</th>
                      <th style={headerCellStyle}>Status</th>
                      <th style={headerCellStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.applicationId}
                        style={{ ...rowStyle, cursor: "pointer" }}
                        onClick={() => setSelectedApplication(app)}
                      >
                        {/* Application ID first */}
                        <td style={cellStyle}>{app.applicationId || "—"}</td>
                        <td style={cellStyle}><strong>{app.companyName || "—"}</strong></td>
                        <td style={cellStyle}>
                          <img
                            src={app.companyLogo || "https://via.placeholder.com/32?text=Logo"}
                            alt=""
                            style={{ width: "32px", height: "32px", borderRadius: "6px", objectFit: "contain" }}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/32?text=?")}
                          />
                        </td>
                        <td style={cellStyle}>{app.jobTitle || "—"}</td>
                        <td style={cellStyle}>{app.category || "—"}</td>
                        <td style={cellStyle}>{app.type || "—"}</td>
                        <td style={cellStyle}>{app.location || "—"}</td>
                        <td style={cellStyle}>{app.appliedDate || "—"}</td>
                        <td style={cellStyle}>
                          <span style={{ ...statusBadgeStyle, ...getStatusStyle(app.status) }}>
                            {app.status || "Unknown"}
                          </span>
                        </td>
                        <td style={cellStyle}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (app.status?.toLowerCase() !== "cancelled") {
                                handleCancel(app.applicationId);
                              }
                            }}
                            disabled={!app.applicationId || app.status?.toLowerCase() === "cancelled"}
                            style={{
                              background: app.status?.toLowerCase() === "cancelled" ? "#6c757d" : "#dc3545",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "13px",
                              cursor: (!app.applicationId || app.status?.toLowerCase() === "cancelled") ? "not-allowed" : "pointer",
                              opacity: (!app.applicationId || app.status?.toLowerCase() === "cancelled") ? 0.6 : 1,
                            }}
                          >
                            {app.status?.toLowerCase() === "cancelled" ? "Cancelled" : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ── Styles ────────────────────────────────────────────── */
const pageWrapStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "50px",
  backgroundColor: "#FFF9E6",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  width: "95%",
  maxWidth: "1400px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  border: "1px solid #ff69b4",
  padding: "20px",
  overflowX: "auto",
};

const headerStyle = {
  backgroundColor: "#ff69b4",
  color: "#fff",
  padding: "12px",
  textAlign: "center",
  borderRadius: "6px",
  marginBottom: "20px",
  fontWeight: "bold",
  fontSize: "18px",
};

const detailCardStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  border: "2px solid #ffe4e1",
};

const jobInfoCardStyle = {
  background: "#fff9e6",
  borderRadius: "12px",
  padding: "24px",
  border: "1px solid #ffe4e1",
  marginTop: "20px",
};

const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: "14px" };
const headerCellStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  color: "#ff69b4",
  borderBottom: "2px solid #ff69b4",
  backgroundColor: "#fff9e6",
};

const rowStyle = { borderBottom: "1px solid #ff69b4" };
const cellStyle = { padding: "10px 12px", verticalAlign: "middle" };
const statusBadgeStyle = {
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  display: "inline-block",
};

export default AppliedJobs;