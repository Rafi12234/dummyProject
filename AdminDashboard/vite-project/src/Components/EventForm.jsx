import React from 'react';

const EventForm = ({ editingEvent, formData, onSubmit, onCancel, onInputChange }) => {
  const styles = {
    formContainer: {
      backgroundColor: '#f8f9fc',
      borderRadius: '6px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    formTitle: {
      margin: '0 0 1rem 0',
      fontSize: '1.1rem',
      color: '#4e73df',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr auto',
      gap: '1rem',
      alignItems: 'end',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.85rem',
      fontWeight: '500',
    },
    input: {
      padding: '0.5rem',
      border: '1px solid #d1d3e2',
      borderRadius: '4px',
      fontSize: '0.9rem',
    },
    formActions: {
      display: 'flex',
      gap: '0.5rem',
    },
    submitButton: {
      backgroundColor: '#1cc88a',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontWeight: '500',
    },
    cancelButton: {
      backgroundColor: '#e74a3b',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>
        {editingEvent ? 'Edit Event' : 'Create New Event'}
      </h3>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={onInputChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formActions}>
          <button type="submit" style={styles.submitButton}>
            {editingEvent ? 'Update Event' : 'Create Event'}
          </button>
          <button 
            type="button" 
            style={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;