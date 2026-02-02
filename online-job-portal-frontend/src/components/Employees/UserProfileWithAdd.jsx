import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfileWithAdd = () => {
  const employeeId = localStorage.getItem("employeeId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showQualModal, setShowQualModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);

  const [editingQualIndex, setEditingQualIndex] = useState(null);
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [editingWorkIndex, setEditingWorkIndex] = useState(null);

  const [qualForm, setQualForm] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
  });
  const [skillForm, setSkillForm] = useState({ name: "", experience: "" });
  const [workForm, setWorkForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    experience: "",
  });

  useEffect(() => {
    if (!employeeId) {
      setError("No employee ID found. Please login again.");
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [employeeId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}`);
      console.log("Backend profile data:", res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch failed:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleQualChange = (e) => {
    const { name, value } = e.target;
    setQualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setWorkForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Delete Handlers ───────────────────────────────────────────────
  const deleteQualification = async (qualId) => {
    if (!window.confirm("Delete this qualification?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/qualification/${qualId}`
      );
      await fetchProfile();
      alert("Qualification deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete qualification");
    }
  };

  const deleteSkill = async (skillId) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/skill/${skillId}`
      );
      await fetchProfile();
      alert("Skill deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill");
    }
  };

  const deleteWorkExperience = async (workId) => {
    if (!window.confirm("Delete this work experience?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/work/${workId}`
      );
      await fetchProfile();
      alert("Work experience deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete work experience");
    }
  };

  // ── Download Uploaded Resume (Base64) ─────────────────────────────
  const downloadResume = () => {
    if (!profile?.resume) {
      alert("No resume uploaded yet.");
      return;
    }

    let base64 = profile.resume;

    // If it already has data URI prefix → use directly
    // Otherwise add it (common when stored raw base64)
    if (!base64.startsWith("data:")) {
      base64 = `data:application/pdf;base64,${base64}`;
    }

    const link = document.createElement("a");
    link.href = base64;
    link.download = `${profile.firstName || "profile"}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── Qualification Handlers (add/edit unchanged, just added delete) ─
  const openAddQualModal = () => {
    setQualForm({ degree: "", institution: "", startDate: "", endDate: "" });
    setEditingQualIndex(null);
    setShowQualModal(true);
  };

  const openEditQualModal = (index) => {
    const qual = profile?.qualifications?.[index];
    if (!qual) return;
    setQualForm({
      degree: qual.degree || "",
      institution: qual.institution || "",
      startDate: qual.startDate || "",
      endDate: qual.endDate || "",
    });
    setEditingQualIndex(index);
    setShowQualModal(true);
  };

  const saveQualification = async () => {
    if (!qualForm.degree?.trim()) {
      alert("Degree is required");
      return;
    }

    try {
      const payload = { ...qualForm };

      if (editingQualIndex !== null) {
        const qualId = profile.qualifications[editingQualIndex].id;
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/qualification/${qualId}`,
          payload
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/qualification`,
          { qualifications: [payload] }
        );
      }

      await fetchProfile();
      setShowQualModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save qualification");
    }
  };

  // Skill handlers (similar)
  const openAddSkillModal = () => {
    setSkillForm({ name: "", experience: "" });
    setEditingSkillIndex(null);
    setShowSkillModal(true);
  };

  const openEditSkillModal = (index) => {
    const skill = profile?.skills?.[index];
    if (!skill) return;
    setSkillForm({
      name: skill.name || "",
      experience: skill.experience || "",
    });
    setEditingSkillIndex(index);
    setShowSkillModal(true);
  };

  const saveSkill = async () => {
    if (!skillForm.name?.trim()) {
      alert("Skill name is required");
      return;
    }

    try {
      const payload = { ...skillForm };

      if (editingSkillIndex !== null) {
        const skillId = profile.skills[editingSkillIndex].id;
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/skill/${skillId}`,
          payload
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/skill`,
          { skills: [payload] }
        );
      }

      await fetchProfile();
      setShowSkillModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save skill");
    }
  };

  // Work experience handlers
  const openAddWorkModal = () => {
    setWorkForm({ company: "", position: "", startDate: "", endDate: "", experience: "" });
    setEditingWorkIndex(null);
    setShowWorkModal(true);
  };

  const openEditWorkModal = (index) => {
    const work = profile?.workExperience?.[index];
    if (!work) return;
    setWorkForm({
      company: Array.isArray(work.company) ? work.company[0] || "" : work.company || "",
      position: work.position || "",
      startDate: work.startDate || "",
      endDate: work.endDate || "",
      experience: work.experience || "",
    });
    setEditingWorkIndex(index);
    setShowWorkModal(true);
  };

  const saveWorkExperience = async () => {
    if (!workForm.position?.trim()) {
      alert("Position is required");
      return;
    }

    try {
      const payload = {
        company: workForm.company ? [workForm.company] : [],
        position: workForm.position,
        startDate: workForm.startDate,
        endDate: workForm.endDate || null,
        experience: workForm.experience,
      };

      if (editingWorkIndex !== null) {
        const workId = profile.workExperience[editingWorkIndex].id;
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/work/${workId}`,
          payload
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/employee/${employeeId}/work`,
          { workExperience: [payload] }
        );
      }

      await fetchProfile();
      setShowWorkModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save work experience");
    }
  };

  // ── Modal Component ────────────────────────────────────────────────
  const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div style={modalOverlay} onClick={onClose}>
        <div style={modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={modalHeader}>
            <h3 style={{ margin: 0, color: "white" }}>{title}</h3>
            <button style={closeBtn} onClick={onClose}>×</button>
          </div>
          <div style={{ padding: "20px" }}>{children}</div>
        </div>
      </div>
    );
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: 80 }}>Loading profile...</div>;
  if (error) return <div style={{ textAlign: "center", marginTop: 80, color: "crimson" }}>{error}</div>;
  if (!profile) return <div style={{ textAlign: "center", marginTop: 80 }}>No profile data</div>;

  return (
    <div style={pageWrap}>
      <div style={card}>
        {/* Personal Details, Bio, Links, Avatar – unchanged */}

        <Title text="Personal Detail" />
        <Grid cols={3}>
          <KV k="First Name" v={profile.firstName || "-"} />
          <KV k="Last Name" v={profile.lastName || "-"} />
          <KV k="Email" v={profile.email || "-"} />
          <KV k="Contact" v={profile.contactNo || "-"} />
          <KV k="Address" v={profile.street || "-"} />
          <KV k="" v={[profile.city, profile.state, profile.country].filter(Boolean).join(", ") || "-"} />
          <KV k="Registered" v={profile.registrationDate?.split("T")[0] || "-"} />
        </Grid>

        <Title text="User Profile" />
        <div style={center}>
          <img
            src={profile.avatar || "https://via.placeholder.com/90?text=No+Avatar"}
            alt="avatar"
            style={avatar}
            onError={(e) => (e.target.src = "https://via.placeholder.com/90?text=Error")}
          />
        </div>

        <Grid cols={3}>
          <div>
            <Label>Bio</Label>
            <div style={v}>{profile.bio || "- No bio added -"}</div>
          </div>
          <div>
            <Label>Github</Label>
            <a href={profile.github || "#"} target="_blank" rel="noreferrer" style={link}>
              {profile.github || "-"}
            </a>
          </div>
          <div>
            <Label>LinkedIn</Label>
            <a href={profile.linkedin || "#"} target="_blank" rel="noreferrer" style={link}>
              {profile.linkedin || "-"}
            </a>
          </div>
        </Grid>

        {/* Qualifications with Delete */}
        <Title text="Qualifications" />
        {profile.qualifications?.length > 0 ? (
          profile.qualifications.map((q, i) => (
            <div key={q.id || i} style={itemCard}>
              <Grid cols={2}>
                <KV k="Degree" v={q.degree || "-"} />
                <KV k="Institution" v={q.institution || "-"} />
                <KV k="Start Date" v={q.startDate || "-"} />
                <KV k="End Date" v={q.endDate || "Present"} />
              </Grid>
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button style={editBtn} onClick={() => openEditQualModal(i)}>
                  Edit
                </button>
                <button
                  style={{ ...editBtn, background: "#dc2626" }}
                  onClick={() => deleteQualification(q.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={emptyState}>No qualifications added yet</div>
        )}
        <CenterBtn text="Add Qualification" onClick={openAddQualModal} />

        {/* Skills with Delete */}
        <Title text="Skills" />
        {profile.skills?.length > 0 ? (
          <Grid cols={2}>
            {profile.skills.map((s, i) => (
              <div key={s.id || i} style={itemCard}>
                <KV k={s.name || "-"} v={`${s.experience || "0"} years`} />
                <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                  <button style={editBtn} onClick={() => openEditSkillModal(i)}>
                    Edit
                  </button>
                  <button
                    style={{ ...editBtn, background: "#dc2626" }}
                    onClick={() => deleteSkill(s.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </Grid>
        ) : (
          <div style={emptyState}>No skills added yet</div>
        )}
        <CenterBtn text="Add Skill" onClick={openAddSkillModal} />

        {/* Work Experience with Delete */}
        <Title text="Work Experience" />
        {profile.workExperience?.length > 0 ? (
          profile.workExperience.map((w, i) => (
            <div key={w.id || i} style={itemCard}>
              <Grid cols={2}>
                <div>
                  <Label>Company</Label>
                  <div style={v}>
                    {Array.isArray(w.company) && w.company.length > 0
                      ? w.company.join(", ")
                      : w.company || "-"}
                  </div>
                </div>
                <KV k="Position" v={w.position || "-"} />
                <KV k="Experience" v={w.experience ? `${w.experience} years` : "-"} />
                <div />
                <KV k="Start Date" v={w.startDate || "-"} />
                <KV k="End Date" v={w.endDate || "Present"} />
              </Grid>
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <button style={editBtn} onClick={() => openEditWorkModal(i)}>
                  Edit
                </button>
                <button
                  style={{ ...editBtn, background: "#dc2626" }}
                  onClick={() => deleteWorkExperience(w.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={emptyState}>No work experience added yet</div>
        )}
        <CenterBtn text="Add Work Experience" onClick={openAddWorkModal} />

        {/* Download Real Resume */}
        <div style={{ ...center, marginTop: 40 }}>
          <button style={downloadBtn} onClick={downloadResume}>
            Download Uploaded Resume (PDF)
          </button>
        </div>
      </div>

      {/* Modals – unchanged except close logic simplified */}
      <Modal
        title={editingQualIndex !== null ? "Edit Qualification" : "Add Qualification"}
        isOpen={showQualModal}
        onClose={() => {
          setShowQualModal(false);
          setEditingQualIndex(null);
        }}
      >
        {/* ... qualification form fields ... */}
        <div style={formGroup}>
          <label style={labelStyle}>Degree *</label>
          <input type="text" name="degree" value={qualForm.degree} onChange={handleQualChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Institution</label>
          <input type="text" name="institution" value={qualForm.institution} onChange={handleQualChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Start Date</label>
          <input type="date" name="startDate" value={qualForm.startDate} onChange={handleQualChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>End Date</label>
          <input type="date" name="endDate" value={qualForm.endDate} onChange={handleQualChange} style={inputStyle} />
        </div>
        <div style={buttonGroup}>
          <button style={addBtn} onClick={saveQualification}>
            {editingQualIndex !== null ? "Update" : "Add"}
          </button>
          <button style={closeFormBtn} onClick={() => setShowQualModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Skill Modal – similar structure */}
      <Modal
        title={editingSkillIndex !== null ? "Edit Skill" : "Add Skill"}
        isOpen={showSkillModal}
        onClose={() => {
          setShowSkillModal(false);
          setEditingSkillIndex(null);
        }}
      >
        <div style={formGroup}>
          <label style={labelStyle}>Skill Name *</label>
          <input type="text" name="name" value={skillForm.name} onChange={handleSkillChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Experience (years)</label>
          <input type="number" name="experience" value={skillForm.experience} onChange={handleSkillChange} style={inputStyle} min="0" />
        </div>
        <div style={buttonGroup}>
          <button style={addBtn} onClick={saveSkill}>
            {editingSkillIndex !== null ? "Update" : "Add"}
          </button>
          <button style={closeFormBtn} onClick={() => setShowSkillModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* Work Modal – similar */}
      <Modal
        title={editingWorkIndex !== null ? "Edit Work Experience" : "Add Work Experience"}
        isOpen={showWorkModal}
        onClose={() => {
          setShowWorkModal(false);
          setEditingWorkIndex(null);
        }}
      >
        <div style={formGroup}>
          <label style={labelStyle}>Company</label>
          <input type="text" name="company" value={workForm.company} onChange={handleWorkChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Position *</label>
          <input type="text" name="position" value={workForm.position} onChange={handleWorkChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Experience (years)</label>
          <input type="number" name="experience" value={workForm.experience} onChange={handleWorkChange} style={inputStyle} min="0" />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Start Date</label>
          <input type="date" name="startDate" value={workForm.startDate} onChange={handleWorkChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>End Date</label>
          <input type="date" name="endDate" value={workForm.endDate} onChange={handleWorkChange} style={inputStyle} />
        </div>
        <div style={buttonGroup}>
          <button style={addBtn} onClick={saveWorkExperience}>
            {editingWorkIndex !== null ? "Update" : "Add"}
          </button>
          <button style={closeFormBtn} onClick={() => setShowWorkModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};


// ── Reusable small components ───────────────────────────────────────
const Title = ({ text }) => <div style={sectionTitle}>{text}</div>;
const Grid = ({ cols, children }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
    {children}
  </div>
);
const KV = ({ k: key, v: val }) => (
  <div>
    <div style={k}>{key}</div>
    <div style={v}>{val}</div>
  </div>
);
const Label = ({ children }) => <div style={{ ...k, marginBottom: 6 }}>{children}</div>;
const CenterBtn = ({ text, onClick }) => (
  <div style={center}>
    <button style={smallAddBtn} onClick={onClick}>
      {text}
    </button>
  </div>
);

// ── Styles (unchanged) ──────────────────────────────────────────────
const pageWrap = { minHeight: "100vh", background: "#f6f5ef", padding: 20 };
const card = {
  maxWidth: 780,
  margin: "auto",
  background: "#fff",
  borderRadius: 16,
  padding: 22,
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
};
const sectionTitle = {
  textAlign: "center",
  color: "#e24b66",
  fontWeight: 700,
  fontSize: 16,
  margin: "24px 0 16px",
};
const k = { fontSize: 13, fontWeight: 700, color: "#111" };
const v = { fontSize: 13, color: "#444", lineHeight: 1.4 };
const link = { fontSize: 13, color: "#e24b66", wordBreak: "break-all" };
const avatar = { width: 90, height: 90, borderRadius: "50%", border: "3px solid #e24b66" };
const center = { display: "flex", justifyContent: "center", margin: "12px 0" };
const smallAddBtn = {
  background: "#e24b66",
  color: "#fff",
  border: "none",
  padding: "8px 20px",
  fontSize: 13,
  borderRadius: 6,
  cursor: "pointer",
};
const downloadBtn = {
  background: "#e24b66",
  color: "#fff",
  border: "none",
  padding: "14px 40px",
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};
const editBtn = {
  background: "#6b7280",
  color: "#fff",
  border: "none",
  padding: "6px 16px",
  fontSize: 12,
  borderRadius: 4,
  cursor: "pointer",
  marginTop: 6,
};
const itemCard = { marginBottom: 16, padding: 14, background: "#f9f9f9", borderRadius: 8 };
const emptyState = { textAlign: "center", color: "#999", padding: 20, fontStyle: "italic" };
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalContent = {
  background: "white",
  borderRadius: 12,
  width: "100%",
  maxWidth: 440,
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  overflow: "hidden",
};
const modalHeader = {
  background: "#e24b66",
  color: "white",
  padding: "14px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 18,
  fontWeight: 600,
};
const closeBtn = { background: "none", border: "none", color: "white", fontSize: 32, cursor: "pointer" };
const formGroup = { marginBottom: 18 };
const labelStyle = { display: "block", marginBottom: 6, fontWeight: 600, fontSize: 14, color: "#333" };
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};
const buttonGroup = { display: "flex", gap: 12, marginTop: 24 };
const addBtn = {
  background: "#e24b66",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
  flex: 1,
};
const closeFormBtn = {
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: 6,
  fontWeight: 600,
  cursor: "pointer",
  flex: 1,
};

export default UserProfileWithAdd;