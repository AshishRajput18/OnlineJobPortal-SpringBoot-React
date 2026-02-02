import React, { useState, useEffect } from "react";
import axios from "axios";

const AddJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    skills: "",
    categoryId: "",
    type: "",
    salary: "",
    experience: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    logo: "",
  });

  const [categories, setCategories] = useState([]);

  // ── FETCH CATEGORIES ─────────────────────────────
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/category/all")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category Fetch Error:", err));
  }, []);

  // ── Convert file to Base64 ────────────────────────
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // ── Handle Input Changes ─────────────────────────
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const base64 = await convertToBase64(files[0]);
      setFormData((prev) => ({ ...prev, [name]: base64 }));
      return;
    }

    if (name === "categoryId") {
      setFormData((prev) => ({ ...prev, [name]: value ? Number(value) : "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ── Submit Form ──────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId) {
      alert("Please select a category!");
      return;
    }

    try {
      const { categoryId, ...jobData } = formData;

      // Get employerId from localStorage
      const employerId = localStorage.getItem("employerId");
      if (!employerId) {
        alert("Employer not logged in!");
        return;
      }

      await axios.post(
        `http://localhost:8080/api/jobs/add?categoryId=${categoryId}&employerId=${employerId}`,
        jobData
      );

      alert("Job Posted Successfully!");

      // Reset form
      setFormData({
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        skills: "",
        categoryId: "",
        type: "",
        salary: "",
        experience: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        logo: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert(
        "Failed to post job. Make sure you are logged in as an employer."
      );
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Add Job</div>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Job Title & Company Name */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Job Title</label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Company Name</label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Row 2: Job Description & Skills */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Skills Required</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Row 3: Category & Job Type */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Job Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        {/* Row 4: Salary & Experience */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Salary Range</label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Salary</option>
              <option>3-6 L</option>
              <option>6-12 L</option>
              <option>12-18 L</option>
              <option>18-25 L</option>
            </select>
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Experience Required</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Experience</option>
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
        </div>

        {/* Row 5: Street & City */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Street</label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Row 6: State & Pincode */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Pincode</label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Row 7: Country & Logo */}
        <div style={rowStyle}>
          <div style={groupStyle}>
            <label style={labelStyle}>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={groupStyle}>
            <label style={labelStyle}>Company Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Post Job
        </button>
      </form>
    </div>
  );
};

/* ── STYLES ── */
const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  backgroundColor: "#FFF9E6",
  border: "1px solid #ff69b4",
};
const headerStyle = {
  backgroundColor: "#ff69b4",
  color: "white",
  padding: "12px",
  textAlign: "center",
  borderRadius: "6px",
  marginBottom: "25px",
  fontWeight: "bold",
  fontSize: "18px",
};
const rowStyle = { display: "flex", gap: "20px", marginBottom: "15px" };
const groupStyle = { flex: 1 };
const labelStyle = { fontWeight: "bold", fontSize: "13px", marginBottom: "5px" };
const inputStyle = { width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" };
const textareaStyle = { ...inputStyle, minHeight: "80px" };
const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#ff69b4",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "600",
};

export default AddJob;
