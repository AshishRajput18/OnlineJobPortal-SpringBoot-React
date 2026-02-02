import React, { useState, useEffect } from 'react';

const UpdateApplicationStatusModal = ({
  isOpen,
  onClose,
  onUpdate,
  currentStatus,
}) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(currentStatus || '');
  }, [currentStatus]);

  if (!isOpen) return null;

  const statuses = ['Pending', 'Shortlisted', 'Rejected', 'Cancelled'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status) return;
    onUpdate(status);
    onClose();
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <span>Update Application Status</span>
          <button onClick={onClose} style={closeIconStyle}>×</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={bodyStyle}>
          <label style={labelStyle}>Application Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div style={{ textAlign: 'center', marginTop: '22px' }}>
            <button type="submit" style={updateButtonStyle}>
              Update Status
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={footerStyle}>
          <button onClick={onClose} style={closeButtonStyle}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const backdropStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: '#FFF9E6',
  width: '420px',
  borderRadius: '10px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  overflow: 'hidden',
  fontFamily: 'Arial, sans-serif',
  border: '1px solid #ff69b4',
};

const headerStyle = {
  backgroundColor: '#ff69b4',
  color: 'white',
  padding: '14px 18px',
  fontSize: '18px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const closeIconStyle = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '22px',
  cursor: 'pointer',
};

const bodyStyle = {
  padding: '22px',
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '14px',
  marginBottom: '8px',
  display: 'block',
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const updateButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
};

const footerStyle = {
  padding: '12px 18px',
  borderTop: '1px solid #eee',
  textAlign: 'right',
};

const closeButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  padding: '6px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
};

export default UpdateApplicationStatusModal;
