import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/users/employee`;

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");

  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    github: "",
    linkedin: "",
    profilePic: null,   // File object
    resume: null,       // File object
    avatarBase64: "",   // Base64 string
    resumeBase64: "",   // Base64 string
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ===== Fetch existing profile =====
  useEffect(() => {
    if (!employeeId) return;

    setLoading(true);
    axios
      .get(`${API_BASE}/${employeeId}`)
      .then((res) => {
        const data = res.data;
        setFormData((prev) => ({
          ...prev,
          bio: data.bio || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          website: data.website || "",
          avatarBase64: data.avatar || "",
          resumeBase64: data.resume || "", // Existing resume Base64
        }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [employeeId]);

  // ===== Handle input change =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ===== Handle file change (avatar/resume) =====
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (name === "profilePic") {
      // Avatar logic (unchanged)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: file,
          avatarBase64: reader.result,
        }));
      };
    } else if (name === "resume") {
      // Convert resume to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Remove the "data:application/pdf;base64," prefix before sending
        const base64String = reader.result.split(",")[1];
        setFormData((prev) => ({
          ...prev,
          resume: file,
          resumeBase64: base64String,
        }));
      };
    }
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bio.trim()) {
      setErrors({ bio: "Bio is required" });
      return;
    }

    if (!employeeId) {
      alert("Employee not logged in");
      return;
    }

    try {
      // Prepare DTO
      const dto = {
        bio: formData.bio,
        github: formData.github,
        linkedin: formData.linkedin,
        website: formData.website,
        avatar: formData.avatarBase64,   // Image
        resume: formData.resumeBase64,   // PDF/Doc Base64
      };

      await axios.put(`${API_BASE}/${employeeId}`, dto);

      alert("Profile updated successfully!");
      navigate("/user-profiles");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed!");
    }
  };

  const profilePicName = useMemo(
    () => formData.profilePic?.name || "No file selected",
    [formData.profilePic]
  );

  const resumeName = useMemo(
    () => formData.resume?.name || "No file selected",
    [formData.resume]
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div style={pageWrapStyle}>
      <div style={cardStyle}>
        <div style={titleBarStyle}>
          Update Profile
          <span
            style={backStyle}
            onClick={() => navigate("/employee-profile")}
          >
            ← Back
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <div style={gridStyle}>
            {/* Bio */}
            <div>
              <label style={labelStyle}>Bio</label>
              <input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.bio && <small style={errorText}>{errors.bio}</small>}
            </div>

            {/* Website */}
            <div>
              <label style={labelStyle}>Website</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Github */}
            <div>
              <label style={labelStyle}>Github</label>
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label style={labelStyle}>LinkedIn</label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Profile Pic */}
            <div>
              <label style={labelStyle}>Profile Pic</label>
              <div style={fileBoxStyle}>
                <label style={fileBtnStyle}>
                  Choose File
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <span style={fileNameStyle}>{profilePicName}</span>
              </div>
              {formData.avatarBase64 && (
                <img
                  src={formData.avatarBase64}
                  alt="avatar-preview"
                  style={{ width: 80, height: 80, marginTop: 10, borderRadius: "50%" }}
                />
              )}
            </div>

            {/* Resume */}
            <div>
              <label style={labelStyle}>Resume</label>
              <div style={fileBoxStyle}>
                <label style={fileBtnStyle}>
                  Choose File
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
                <span style={fileNameStyle}>{resumeName}</span>
              </div>
              {formData.resumeBase64 && (
                <small style={{ display: "block", marginTop: "5px" }}>
                  Resume uploaded ✔
                </small>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "22px" }}>
            <button type="submit" style={submitBtn}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===== Styles ===== */
const pageWrapStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "50px",
  backgroundColor: "#FFF9E6",
};
const cardStyle = {
  width: "800px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
};
const titleBarStyle = {
  background: "#ff69b4",
  color: "#fff",
  padding: "14px",
  textAlign: "center",
  fontWeight: "bold",
  position: "relative",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};
const backStyle = { position: "absolute", right: "15px", top: "14px", cursor: "pointer", fontSize: "13px" };
const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" };
const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#ff69b4" };
const inputStyle = { width: "100%", height: "36px", padding: "6px", border: "1px solid #ff69b4", borderRadius: "6px", outline: "none" };
const fileBoxStyle = { display: "flex", alignItems: "center", border: "1px solid #ff69b4", borderRadius: "6px", height: "36px", overflow: "hidden" };
const fileBtnStyle = { background: "#ffe0f0", padding: "0 12px", cursor: "pointer", height: "100%", display: "flex", alignItems: "center", fontSize: "13px", borderRight: "1px solid #ff69b4" };
const fileNameStyle = { paddingLeft: "10px", fontSize: "13px", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const submitBtn = { background: "#ff69b4", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
const errorText = { color: "red", fontSize: "12px" };

export default UpdateProfileForm;
