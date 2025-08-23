import React from 'react';

const StatsCard = ({ icon, value, label, color }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: 'white',
        backgroundColor: color,
      }}>
        <i className={icon}></i>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 0.25rem 0',
          color: '#5a5c69',
        }}>{value}</h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#858796',
          margin: 0,
          textTransform: 'uppercase',
          fontWeight: '600',
        }}>{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;