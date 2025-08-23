import { useState } from 'react'
import './App.css'

function App() {
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
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="header-title">Club Management Dashboard</h1>
        <div className="user-info">
          <span className="user-name">Admin User</span>
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav-menu">
            <a href="#" className="nav-item active">
              <i className="fas fa-chart-line nav-icon"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fas fa-calendar-alt nav-icon"></i>
              <span>Events</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fas fa-users nav-icon"></i>
              <span>Students</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fas fa-cog nav-icon"></i>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-1">
                <i className="fas fa-calendar"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalEvents}</h3>
                <p className="stat-label">Total Events</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon stat-icon-2">
                <i className="fas fa-running"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.activeEvents}</h3>
                <p className="stat-label">Active Events</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon stat-icon-3">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalEnrollments}</h3>
                <p className="stat-label">Total Enrollments</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon stat-icon-4">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.avgAttendance}%</h3>
                <p className="stat-label">Avg. Attendance</p>
              </div>
            </div>
          </div>

          {/* Event Management */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Event Management</h2>
              <button 
                className="add-button"
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
              <div className="form-container">
                <h3 className="form-title">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <form onSubmit={handleSubmit} className="event-form">
                  <div className="form-group">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-button">
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Events Table */}
            <div className="table-container">
              <table className="events-table">
                <thead>
                  <tr>
                    <th className="table-header">Event Name</th>
                    <th className="table-header">Date</th>
                    <th className="table-header">Enrolled</th>
                    <th className="table-header">Capacity</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id} className="table-row">
                      <td className="table-cell">{event.name}</td>
                      <td className="table-cell">{event.date}</td>
                      <td className="table-cell">{event.enrolled}</td>
                      <td className="table-cell">{event.capacity}</td>
                      <td className="table-cell">
                        <span className={`status status-${event.status}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <button 
                            className="icon-button"
                            onClick={() => handleEdit(event)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="icon-button"
                            onClick={() => handleDelete(event.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button 
                            className="icon-button"
                            onClick={() => toggleStatus(event.id)}
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
          </div>

          {/* Enrollment Chart */}
          <div className="section">
            <h2 className="section-title">Enrollment Statistics</h2>
            <div className="chart-container">
              <div className="chart">
                {events.map(event => (
                  <div key={event.id} className="chart-bar-container">
                    <div className="chart-bar-label">{event.name}</div>
                    <div className="chart-bar-background">
                      <div 
                        className="chart-bar-fill"
                        style={{
                          width: `${(event.enrolled / event.capacity) * 100}%`,
                          backgroundColor: event.status === 'active' ? '#4e73df' : '#1cc88a'
                        }}
                      ></div>
                    </div>
                    <div className="chart-bar-value">
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
}

export default App;