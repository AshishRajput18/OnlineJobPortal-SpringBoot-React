import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewEmployers = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const token = localStorage.getItem("token"); // if JWT used
      const response = await axios.get(
        "http://localhost:8080/api/users/employers",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (Array.isArray(response.data)) {
        const formatted = response.data.map((emp) => ({
          id: emp.id,
          firstName: emp.firstName || "",
          lastName: emp.lastName || "",
          email: emp.email || "",
          contactNo: emp.contactNo || "",
          street: emp.street || "",
          city: emp.city || "",
          pin: emp.pin || "",
          registrationDate: emp.registrationDate || "",
        }));
        setEmployers(formatted);
      } else {
        setEmployers([]);
      }
    } catch (error) {
      console.error("Error fetching employers:", error);
      alert("Failed to load employers");
      setEmployers([]);
    }
  };

  return (
    <>
      {/* Responsive CSS added — logic untouched */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .employers-container {
          overflow-x: hidden;
        }

        .employers-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .employers-table {
          min-width: 800px;
        }

        @media (max-width: 768px) {
          .employers-container {
            padding: 16px !important;
            margin: 20px auto !important;
          }

          .employers-header {
            font-size: 16px !important;
            padding: 10px !important;
          }

          .employers-table th,
          .employers-table td {
            padding: 8px !important;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .employers-container {
            padding: 12px !important;
          }

          .employers-table th,
          .employers-table td {
            font-size: 12px;
          }
        }
      `}</style>

      <div
        className="employers-container"
        style={{
          width: "95%",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          backgroundColor: "#FFF9E6",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ff69b4",
        }}
      >
        {/* Header */}
        <div
          className="employers-header"
          style={{
            backgroundColor: "#ff69b4",
            color: "white",
            padding: "12px",
            textAlign: "center",
            borderRadius: "6px",
            marginBottom: "25px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          All Employers
        </div>

        <div className="employers-table-wrapper">
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="employers-table"
          >
            <thead>
              <tr style={{ backgroundColor: "#ff69b4", color: "white" }}>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  First Name
                </th>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  Last Name
                </th>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  Email
                </th>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  Phone
                </th>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  Address
                </th>
                <th style={{ padding: "12px", fontWeight: 600 }}>
                  Registered
                </th>
              </tr>
            </thead>

            <tbody>
              {employers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                    No Employers Found
                  </td>
                </tr>
              ) : (
                employers.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ padding: 10 }}>{emp.firstName}</td>
                    <td style={{ padding: 10 }}>{emp.lastName}</td>
                    <td
                      style={{
                        padding: 10,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {emp.email}
                    </td>
                    <td style={{ padding: 10 }}>{emp.contactNo}</td>
                    <td
                      style={{
                        padding: 10,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {emp.street}, {emp.city}, {emp.pin}
                    </td>
                    <td style={{ padding: 10 }}>
                      {emp.registrationDate
                        ? new Date(
                            emp.registrationDate
                          ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewEmployers;
