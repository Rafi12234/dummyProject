import React from 'react';

const EventTable = ({ events, onEdit, onDelete, onToggleStatus }) => {
  const styles = {
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      textAlign: 'left',
      padding: '0.75rem',
      borderBottom: '2px solid #e3e6f0',
      color: '#4e73df',
      fontWeight: '600',
    },
    tableRow: {
      borderBottom: '1px solid #e3e6f0',
    },
    tableCell: {
      padding: '0.75rem',
      fontSize: '0.9rem',
    },
    status: {
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    statusActive: {
      backgroundColor: '#e8f4fd',
      color: '#36b9cc',
    },
    statusCompleted: {
      backgroundColor: '#f0f9eb',
      color: '#1cc88a',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    iconButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4e73df',
      cursor: 'pointer',
      fontSize: '1rem',
    },
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Event Name</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Enrolled</th>
            <th style={styles.tableHeader}>Capacity</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{event.name}</td>
              <td style={styles.tableCell}>{event.date}</td>
              <td style={styles.tableCell}>{event.enrolled}</td>
              <td style={styles.tableCell}>{event.capacity}</td>
              <td style={styles.tableCell}>
                <span style={{
                  ...styles.status,
                  ...(event.status === 'active' ? styles.statusActive : styles.statusCompleted)
                }}>
                  {event.status}
                </span>
              </td>
              <td style={styles.tableCell}>
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.iconButton}
                    onClick={() => onEdit(event)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    style={styles.iconButton}
                    onClick={() => onDelete(event.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button 
                    style={styles.iconButton}
                    onClick={() => onToggleStatus(event.id)}
                  >
                    <i className={`fas fa-${event.status === 'active' ? 'check-circle' : 'undo'}`}></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;