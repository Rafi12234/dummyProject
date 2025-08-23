import React, { useState } from 'react';
import StatsCard from './StatsCard';
import EventTable from './EventTable';
import EventForm from './EventForm';

const ClubAdminDashboard = () => {
  // Mock data for events
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2023', date: '2023-10-15', enrolled: 125, capacity: 200, status: 'active' },
    { id: 2, name: 'Web Development Workshop', date: '2023-09-20', enrolled: 45, capacity: 50, status: 'completed' },
    { id: 3, name: 'AI & Machine Learning Seminar', date: '2023-11-05', enrolled: 78, capacity: 100, status: 'active' },
    { id: 4, name: 'Cybersecurity Training', date: '2023-08-10', enrolled: 32, capacity: 40, status: 'completed' },
    { id: 5, name: 'Data Science Bootcamp', date: '2023-12-01', enrolled: 92, capacity: 120, status: 'active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    capacity: ''
  });

  // Stats data
  const stats = {
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'active').length,
    totalEnrollments: events.reduce((sum, event) => sum + event.enrolled, 0),
    avgAttendance: Math.round(events.reduce((sum, event) => sum + (event.enrolled / event.capacity * 100), 0) / events.length)
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData, enrolled: editingEvent.enrolled, status: editingEvent.status }
          : event
      ));
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = {
        id: events.length + 1,
        ...formData,
        enrolled: 0,
        status: 'active'
      };
      setEvents([...events, newEvent]);
    }
    setFormData({ name: '', date: '', capacity: '' });
    setShowForm(false);
  };

  // Start editing an event
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      capacity: event.capacity
    });
    setShowForm(true);
  };

  // Delete an event
  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Toggle event status
  const toggleStatus = (id) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, status: event.status === 'active' ? 'completed' : 'active' }
        : event
    ));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Club Management Dashboard</h1>
        <div style={styles.userInfo}>
          <span style={styles.userName}>Admin User</span>
          <div style={styles.userAvatar}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <nav style={styles.nav}>
            <a href="#" style={styles.navItem}>
              <i className="fas fa-chart-line" style={styles.navIcon}></i>
              <span>Dashboard</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fas fa-calendar-alt" style={styles.navIcon}></i>
              <span>Events</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fas fa-users" style={styles.navIcon}></i>
              <span>Students</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fas fa-cog" style={styles.navIcon}></i>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Statistics Cards */}
          <div style={styles.statsGrid}>
            <StatsCard 
              icon="fas fa-calendar" 
              value={stats.totalEvents} 
              label="Total Events" 
              color="#4e73df" 
            />
            <StatsCard 
              icon="fas fa-running" 
              value={stats.activeEvents} 
              label="Active Events" 
              color="#36b9cc" 
            />
            <StatsCard 
              icon="fas fa-user-graduate" 
              value={stats.totalEnrollments} 
              label="Total Enrollments" 
              color="#1cc88a" 
            />
            <StatsCard 
              icon="fas fa-chart-pie" 
              value={`${stats.avgAttendance}%`} 
              label="Avg. Attendance" 
              color="#f6c23e" 
            />
          </div>

          {/* Event Management */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Event Management</h2>
              <button 
                style={styles.addButton}
                onClick={() => {
                  setEditingEvent(null);
                  setFormData({ name: '', date: '', capacity: '' });
                  setShowForm(true);
                }}
              >
                <i className="fas fa-plus"></i> Add New Event
              </button>
            </div>

            {/* Event Form */}
            {showForm && (
              <EventForm
                editingEvent={editingEvent}
                formData={formData}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
                onInputChange={handleInputChange}
              />
            )}

            {/* Events Table */}
            <EventTable 
              events={events}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />
          </div>

          {/* Enrollment Chart */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Enrollment Statistics</h2>
            <div style={styles.chartContainer}>
              <div style={styles.chart}>
                {events.map(event => (
                  <div key={event.id} style={styles.chartBarContainer}>
                    <div style={styles.chartBarLabel}>{event.name}</div>
                    <div style={styles.chartBarBackground}>
                      <div 
                        style={{
                          ...styles.chartBarFill,
                          width: `${(event.enrolled / event.capacity) * 100}%`,
                          backgroundColor: event.status === 'active' ? '#4e73df' : '#1cc88a'
                        }}
                      ></div>
                    </div>
                    <div style={styles.chartBarValue}>
                      {event.enrolled}/{event.capacity} ({Math.round((event.enrolled / event.capacity) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fc',
    minHeight: '100vh',
    color: '#5a5c69',
  },
  header: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#4e73df',
    margin: 0,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  userName: {
    fontWeight: '500',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4e73df',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  content: {
    display: 'flex',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    minHeight: 'calc(100vh - 80px)',
    padding: '1.5rem 0',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
  },
  navItem: {
    padding: '1rem 1.5rem',
    textDecoration: 'none',
    color: '#5a5c69',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s',
  },
  navIcon: {
    width: '20px',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    padding: '1.5rem 2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#4e73df',
    margin: 0,
  },
  addButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  chartContainer: {
    marginTop: '1.5rem',
  },
  chart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chartBarContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  chartBarLabel: {
    width: '200px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  chartBarBackground: {
    flex: 1,
    height: '20px',
    backgroundColor: '#eaecf4',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  chartBarValue: {
    width: '150px',
    textAlign: 'right',
    fontSize: '0.85rem',
    color: '#858796',
  },
};

export default ClubAdminDashboard;