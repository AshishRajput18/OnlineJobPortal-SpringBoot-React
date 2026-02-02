import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

const UserProfile = () => {
  const { employeeId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employeeId) {
      setError("No employee ID provided in URL");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        // Adjust endpoint to match your backend (two common patterns shown)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}`);
        // If your backend uses query param → use this instead:
        // const res = await axios.get(`http://localhost:8080/api/users/employee?employeeId=${employeeId}`);

        console.log("Profile data:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        setError(err.response?.data?.message || "Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [employeeId]);

  // ── Download stored base64 resume (preferred if resume is already uploaded) ──
  const downloadStoredResume = () => {
    if (!profile?.resume) {
      alert("No resume found in profile.");
      return;
    }

    let base64 = profile.resume.trim();

    // Add data URI prefix if missing
    if (!base64.startsWith("data:")) {
      // Most common mime types - adjust if you know it's different
      base64 = `data:application/pdf;base64,${base64}`;
    }

    const link = document.createElement("a");
    link.href = base64;
    link.download = `${profile.firstName || "profile"}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "1.2rem" }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "120px 20px", color: "#dc2626", fontSize: "1.2rem" }}>{error}</div>;
  }

  if (!profile) {
    return <div style={{ textAlign: "center", padding: "120px 20px", fontSize: "1.2rem" }}>No profile data available</div>;
  }

  // Safe derived values
  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "—";
  const fullAddress = [profile.street, profile.city, profile.state, profile.country, profile.pincode]
    .filter(Boolean)
    .join(", ") || "—";

  const companyName =
    profile.workExperience?.[0]?.company?.length > 0
      ? profile.workExperience[0].company.join(", ")
      : profile.workExperience?.[0]?.company || "—";

  return (
    <div style={pageWrap}>
      <div style={card}>
        {/* Personal Details */}
        <div style={sectionTitle}>Personal Details</div>
        <div style={grid3}>
          <KV label="First Name" value={profile.firstName || "—"} />
          <KV label="Last Name" value={profile.lastName || "—"} />
          <KV label="Full Name" value={fullName} />
          <KV label="Email" value={profile.email || "—"} />
          <KV label="Contact" value={profile.contactNo || "—"} />
          <KV label="Address" value={fullAddress} />
          <KV label="Registered" value={profile.registrationDate?.split("T")?.[0] || "—"} />
        </div>

        {/* Avatar */}
        <div style={center}>
          <img
            src={profile.avatar || "https://via.placeholder.com/110?text=AVATAR"}
            alt="Profile avatar"
            style={avatar}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/110?text=Error";
              e.target.onerror = null;
            }}
          />
        </div>

        {/* Bio + Links */}
        <div style={linksGrid}>
          <div>
            <Label>Bio</Label>
            <div style={bioText}>{profile.bio || "No bio provided"}</div>
          </div>
          <div>
            <Label>GitHub</Label>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {profile.github || "—"}
            </a>
          </div>
          <div>
            <Label>LinkedIn</Label>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {profile.linkedin || "—"}
            </a>
          </div>
          <div>
            <Label>Website</Label>
            <a href={profile.website} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {profile.website || "—"}
            </a>
          </div>
        </div>

        {/* Qualifications */}
        <div style={sectionTitle}>Qualifications</div>
        {profile.qualifications?.length > 0 ? (
          profile.qualifications.map((q) => (
            <div key={q.id} style={itemCard}>
              <div style={grid2}>
                <KV label="Degree" value={q.degree || "—"} />
                <KV label="Institution" value={q.institution || "—"} />
                <KV label="Start Date" value={q.startDate?.split("T")?.[0] || "—"} />
                <KV label="End Date" value={q.endDate?.split("T")?.[0] || "Present"} />
              </div>
            </div>
          ))
        ) : (
          <div style={empty}>No qualifications added yet.</div>
        )}

        {/* Skills */}
        <div style={sectionTitle}>Skills</div>
        {profile.skills?.length > 0 ? (
          <div style={grid2}>
            {profile.skills.map((s) => (
              <div key={s.id} style={skillTag}>
                <strong>{s.name}</strong> • {s.experience ? `${s.experience} yrs` : "—"}
              </div>
            ))}
          </div>
        ) : (
          <div style={empty}>No skills listed.</div>
        )}

        {/* Work Experience */}
        <div style={sectionTitle}>Work Experience</div>
        {profile.workExperience?.length > 0 ? (
          profile.workExperience.map((exp) => (
            <div key={exp.id} style={itemCard}>
              <div style={gridExperience}>
                <div>
                  <Label>Company</Label>
                  <div style={valueStyle}>
                    {Array.isArray(exp.company) ? exp.company.join(", ") : exp.company || "—"}
                  </div>
                </div>
                <KV label="Position" value={exp.position || "—"} />
                <KV label="Start Date" value={exp.startDate?.split("T")?.[0] || "—"} />
                <KV label="End Date" value={exp.endDate?.split("T")?.[0] || "Present"} />
                <KV label="Experience" value={exp.experience ? `${exp.experience} years` : "—"} />
              </div>
            </div>
          ))
        ) : (
          <div style={empty}>No work experience added yet.</div>
        )}

        {/* Resume Download */}
        <div style={{ ...center, marginTop: "50px" }}>
          <button style={downloadBtn} onClick={downloadStoredResume}>
            Download Resume (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Reusable Components ──────────────────────────────────────── */
const KV = ({ label, value }) => (
  <div>
    <div style={labelStyle}>{label}</div>
    <div style={valueStyle}>{value}</div>
  </div>
);

const Label = ({ children }) => <div style={{ ...labelStyle, marginBottom: 4 }}>{children}</div>;

/* ── Styles ───────────────────────────────────────────────────── */
const pageWrap = { minHeight: "100vh", background: "#f8f9fa", padding: "30px 20px" };
const card = {
  maxWidth: 860,
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: 16,
  padding: "32px",
  boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  textAlign: "center",
  color: "#e24b66",
  fontWeight: 700,
  fontSize: 20,
  margin: "40px 0 24px",
};

const grid3 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 };
const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 };
const gridExperience = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 };
const linksGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, margin: "30px 0" };

const labelStyle = { fontSize: 14, fontWeight: 600, color: "#222" };
const valueStyle = { fontSize: 14, color: "#444", lineHeight: 1.5 };
const bioText = { fontSize: 14.5, color: "#333", lineHeight: 1.6, whiteSpace: "pre-wrap" };
const linkStyle = { color: "#e24b66", textDecoration: "none", fontSize: 14 };
const linkStyleHover = { ...linkStyle, textDecoration: "underline" }; // optional :hover in real css

const avatar = {
  width: 110,
  height: 110,
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #e24b66",
};

const center = { display: "flex", justifyContent: "center", margin: "25px 0" };
const itemCard = { background: "#f9fafb", borderRadius: 10, padding: 18, marginBottom: 16 };
const skillTag = {
  background: "#fef2f2",
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 14,
  border: "1px solid #fecaca",
};

const empty = { textAlign: "center", color: "#777", fontStyle: "italic", padding: "30px 0" };

const downloadBtn = {
  background: "#e24b66",
  color: "white",
  border: "none",
  padding: "14px 48px",
  fontSize: 16,
  fontWeight: 600,
  borderRadius: 8,
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(226,75,102,0.3)",
};

export default UserProfile;