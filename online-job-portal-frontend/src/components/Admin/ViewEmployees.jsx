import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/users/employees'
      );
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to load employees');
    }
  };

  return (
    <>
      {/* Responsive CSS — logic untouched */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .employees-container {
          overflow-x: hidden;
        }

        .employees-table-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .employees-table {
          min-width: 800px;
        }

        @media (max-width: 768px) {
          .employees-container {
            padding: 16px !important;
            margin: 20px auto !important;
          }

          .employees-header {
            font-size: 16px !important;
            padding: 10px !important;
          }

          .employees-table th,
          .employees-table td {
            padding: 8px !important;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .employees-container {
            padding: 12px !important;
          }

          .employees-table th,
          .employees-table td {
            font-size: 12px;
          }
        }
      `}</style>

      <div
        className="employees-container"
        style={{
          width: '95%',
          margin: '40px auto',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          backgroundColor: '#FFF9E6',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #ff69b4',
        }}
      >
        {/* Header */}
        <div
          className="employees-header"
          style={{
            backgroundColor: '#ff69b4',
            color: 'white',
            padding: '12px',
            textAlign: 'center',
            borderRadius: '6px',
            marginBottom: '25px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          All Employees
        </div>

        <div className="employees-table-wrapper">
          <table style={tableStyle} className="employees-table">
            <thead>
              <tr style={headerRowStyle}>
                <th style={headerCellStyle}>First Name</th>
                <th style={headerCellStyle}>Last Name</th>
                <th style={headerCellStyle}>Email Id</th>
                <th style={headerCellStyle}>Phone No</th>
                <th style={headerCellStyle}>Address</th>
                <th style={headerCellStyle}>Registration Date</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: 'center', padding: '20px' }}
                  >
                    No Employees Found
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    style={rowStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f8f9fa')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = '')
                    }
                  >
                    <td style={wrapCellStyle}>{employee.firstName}</td>
                    <td style={wrapCellStyle}>{employee.lastName}</td>
                    <td style={wrapCellStyle}>{employee.email}</td>
                    <td style={wrapCellStyle}>{employee.contactNo}</td>
                    <td style={wrapCellStyle}>
                      {employee.street}, {employee.city}, {employee.pin}
                    </td>
                    <td style={wrapCellStyle}>
                      {employee.registrationDate
                        ? new Date(
                            employee.registrationDate
                          ).toLocaleString()
                        : ''}
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

/* Styles unchanged */
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
};

const headerRowStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
};

const headerCellStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600',
};

const rowStyle = {
  borderBottom: '1px solid #ff69b4',
};

const wrapCellStyle = {
  padding: '10px',
  verticalAlign: 'middle',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
};

export default ViewEmployees;
