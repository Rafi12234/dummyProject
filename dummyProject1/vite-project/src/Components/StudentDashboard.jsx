// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    studentId: 'STU2023001',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    phone: '',
    year: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    department: '',
    year: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Mock event data with dates for proximity check
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        name: 'Tech Conference 2023',
        time: 'Oct 15, 2025 - 10:00 AM to 4:00 PM',
        date: new Date(2023, 9, 15), // October 15, 2023
        seats: 120,
        totalSeats: 200,
        location: 'Main Auditorium',
        poster: 'tech-conference.jpg',
        status: 'upcoming',
        registered: false,
        description: 'Annual technology conference featuring industry leaders and workshops.'
      },
      {
        id: 2,
        name: 'Web Development Workshop',
        time: 'Oct 18, 2023 - 2:00 PM to 5:00 PM',
        date: new Date(2023, 9, 18), // October 18, 2023
        seats: 15,
        totalSeats: 30,
        location: 'Computer Lab 3',
        poster: 'web-dev-workshop.jpg',
        status: 'upcoming',
        registered: true,
        description: 'Hands-on workshop on modern web development techniques and frameworks.'
      },
      {
        id: 3,
        name: 'Hackathon Finals',
        time: 'Oct 20, 2023 - 9:00 AM to 9:00 PM',
        date: new Date(2023, 9, 20), // October 20, 2023
        seats: 0,
        totalSeats: 50,
        location: 'Innovation Center',
        poster: 'hackathon.jpg',
        status: 'ongoing',
        registered: false,
        description: 'Final round of the annual coding competition with exciting prizes.'
      },
      {
        id: 4,
        name: 'AI & Machine Learning Seminar',
        time: 'Oct 25, 2023 - 3:00 PM to 5:00 PM',
        date: new Date(2023, 9, 25), // October 25, 2023
        seats: 45,
        totalSeats: 100,
        location: 'Lecture Hall B',
        poster: 'ai-seminar.jpg',
        status: 'upcoming',
        registered: false,
        description: 'Explore the latest advancements in artificial intelligence and machine learning.'
      },
      {
        id: 5,
        name: 'Cyber Security Workshop',
        time: 'Oct 12, 2023 - 1:00 PM to 4:00 PM',
        date: new Date(2023, 9, 12), // October 12, 2023
        seats: 0,
        totalSeats: 40,
        location: 'Computer Lab 2',
        poster: 'cyber-security.jpg',
        status: 'ongoing',
        registered: false,
        description: 'Learn about cybersecurity best practices and threat prevention techniques.'
      },
      {
        id: 6,
        name: 'Data Science Symposium',
        time: 'Nov 5, 2023 - 9:00 AM to 5:00 PM',
        date: new Date(2023, 10, 5), // November 5, 2023
        seats: 75,
        totalSeats: 150,
        location: 'Conference Hall A',
        poster: 'data-science.jpg',
        status: 'upcoming',
        registered: false,
        description: 'A gathering of data science enthusiasts and experts sharing insights and trends.'
      }
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
    
    // Get registered events
    const registered = mockEvents.filter(event => event.registered);
    setRegisteredEvents(registered);
  }, []);

  // Check if unregister is allowed (more than 2 days away)
  const canUnregister = (eventDate) => {
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    return eventDate > twoDaysFromNow;
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    switch(filter) {
      case 'all':
        setFilteredEvents(events);
        break;
      case 'upcoming':
        setFilteredEvents(events.filter(event => event.status === 'upcoming'));
        break;
      case 'ongoing':
        setFilteredEvents(events.filter(event => event.status === 'ongoing'));
        break;
      case 'registered':
        setFilteredEvents(events.filter(event => event.registered));
        break;
      default:
        setFilteredEvents(events);
    }
  };

  // Handle registration button click
  const handleRegisterClick = (event) => {
    setCurrentEvent(event);
    setFormData({
      name: userInfo.name,
      studentId: userInfo.studentId,
      email: userInfo.email,
      phone: userInfo.phone,
      department: userInfo.department,
      year: userInfo.year
    });
    setShowRegistrationForm(true);
  };

  // Handle unregister
  const handleUnregister = (event) => {
    setCurrentEvent(event);
    setShowUnregisterModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.studentId) errors.studentId = 'Student ID is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.year) errors.year = 'Year of study is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit registration form
  const submitRegistration = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id 
          ? { ...event, seats: event.seats - 1, registered: true } 
          : event
      );
      
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      setShowRegistrationForm(false);
      
      // Update registered events
      const registered = updatedEvents.filter(event => event.registered);
      setRegisteredEvents(registered);
      
      // Update user info with form data
      setUserInfo({
        ...userInfo,
        phone: formData.phone,
        year: formData.year
      });
    }
  };

  // Confirm unregistration
  const confirmUnregister = () => {
    const updatedEvents = events.map(event => 
      event.id === currentEvent.id 
        ? { ...event, seats: event.seats + 1, registered: false } 
        : event
    );
    
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    setShowUnregisterModal(false);
    
    // Update registered events
    const registered = updatedEvents.filter(event => event.registered);
    setRegisteredEvents(registered);
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-users"></i>
            <span>ClubPortal</span>
          </div>
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </div>
          <div className="menu-item">
            <i className="fas fa-calendar-alt"></i>
            <span>My Events</span>
          </div>
          <div className="menu-item">
            <i className="fas fa-user-friends"></i>
            <span>Clubs</span>
          </div>
          <div className="menu-item">
            <i className="fas fa-certificate"></i>
            <span>Certificates</span>
          </div>
          <div className="menu-item">
            <i className="fas fa-history"></i>
            <span>History</span>
          </div>
          <div className="menu-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-details">
              <span className="user-name">{userInfo.name}</span>
              <span className="user-id">{userInfo.studentId}</span>
            </div>
            <button className="user-menu">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="page-title">
            <h1>Student Dashboard</h1>
            <p>Welcome back, {userInfo.name}</p>
          </div>
          <div className="topbar-right">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search events, clubs, posts..." />
            </div>
            <div className="topbar-actions">
              <button className="action-btn">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">3</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">7</span>
              </button>
              <button className="user-profile">
                <div className="profile-image">
                  <i className="fas fa-user"></i>
                </div>
                <span>{userInfo.name}</span>
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon upcoming">
                <i className="fas fa-calendar"></i>
              </div>
              <div className="stat-info">
                <h3>{events.filter(e => e.status === 'upcoming').length}</h3>
                <p>Upcoming Events</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon ongoing">
                <i className="fas fa-running"></i>
              </div>
              <div className="stat-info">
                <h3>{events.filter(e => e.status === 'ongoing').length}</h3>
                <p>Ongoing Events</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon registered">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>{registeredEvents.length}</h3>
                <p>Registered Events</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon clubs">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3>5</h3>
                <p>Your Clubs</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="section-header">
            <h2>Events</h2>
            <div className="event-filters">
              <button 
                className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'} 
                onClick={() => handleFilterChange('all')}
              >
                All Events
              </button>
              <button 
                className={activeFilter === 'upcoming' ? 'filter-btn active' : 'filter-btn'} 
                onClick={() => handleFilterChange('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={activeFilter === 'ongoing' ? 'filter-btn active' : 'filter-btn'} 
                onClick={() => handleFilterChange('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={activeFilter === 'registered' ? 'filter-btn active' : 'filter-btn'} 
                onClick={() => handleFilterChange('registered')}
              >
                Registered Events
              </button>
            </div>
          </div>

          {/* Events Section */}
          <div className="events-section">
            {/* Marquee Container for moving cards */}
            {activeFilter === 'all' && (
              <div className="marquee-container">
                <div className="marquee">
                  {events
                    .filter(event => event.status === 'upcoming' || event.status === 'ongoing')
                    .map(event => (
                      <div key={event.id} className="event-card">
                        <div className="event-poster">
                          <img src={`/assets/${event.poster}`} alt={event.name} />
                          <div className={`event-status ${event.status}`}>
                            {event.status}
                          </div>
                        </div>
                        <div className="event-details">
                          <h3 className="event-name">{event.name}</h3>
                          <p className="event-description">{event.description}</p>
                          <p className="event-time">
                            <i className="fas fa-clock"></i>
                            {event.time}
                          </p>
                          <p className="event-location">
                            <i className="fas fa-map-marker-alt"></i>
                            {event.location}
                          </p>
                          <div className="event-seats">
                            <div className="seats-info">
                              <i className="fas fa-users"></i>
                              <span>{event.seats} of {event.totalSeats} seats left</span>
                            </div>
                            <div className="seats-progress">
                              <div 
                                className="progress-bar" 
                                style={{width: `${(event.seats / event.totalSeats) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="event-actions">
                          {event.registered ? (
                            <button 
                              className={canUnregister(event.date) ? "btn-unregister" : "btn-unregister disabled"}
                              onClick={() => canUnregister(event.date) && handleUnregister(event)}
                              title={canUnregister(event.date) ? "Unregister from this event" : "Cannot unregister within 2 days of event"}
                            >
                              <i className="fas fa-times"></i>
                              {canUnregister(event.date) ? "Unregister" : "Unregister Disabled"}
                            </button>
                          ) : event.seats > 0 ? (
                            <button 
                              className="btn-register"
                              onClick={() => handleRegisterClick(event)}
                            >
                              <i className="fas fa-user-plus"></i>
                              Register Now
                            </button>
                          ) : (
                            <button className="btn-full" disabled>
                              <i className="fas fa-exclamation-circle"></i>
                              Fully Booked
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  }
                  {/* Duplicate for seamless animation */}
                  {events
                    .filter(event => event.status === 'upcoming' || event.status === 'ongoing')
                    .map(event => (
                      <div key={`dup-${event.id}`} className="event-card">
                        <div className="event-poster">
                          <img src={`/assets/${event.poster}`} alt={event.name} />
                          <div className={`event-status ${event.status}`}>
                            {event.status}
                          </div>
                        </div>
                        <div className="event-details">
                          <h3 className="event-name">{event.name}</h3>
                          <p className="event-description">{event.description}</p>
                          <p className="event-time">
                            <i className="fas fa-clock"></i>
                            {event.time}
                          </p>
                          <p className="event-location">
                            <i className="fas fa-map-marker-alt"></i>
                            {event.location}
                          </p>
                          <div className="event-seats">
                            <div className="seats-info">
                              <i className="fas fa-users"></i>
                              <span>{event.seats} of {event.totalSeats} seats left</span>
                            </div>
                            <div className="seats-progress">
                              <div 
                                className="progress-bar" 
                                style={{width: `${(event.seats / event.totalSeats) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="event-actions">
                          {event.registered ? (
                            <button 
                              className={canUnregister(event.date) ? "btn-unregister" : "btn-unregister disabled"}
                              onClick={() => canUnregister(event.date) && handleUnregister(event)}
                              title={canUnregister(event.date) ? "Unregister from this event" : "Cannot unregister within 2 days of event"}
                            >
                              <i className="fas fa-times"></i>
                              {canUnregister(event.date) ? "Unregister" : "Unregister Disabled"}
                            </button>
                          ) : event.seats > 0 ? (
                            <button 
                              className="btn-register"
                              onClick={() => handleRegisterClick(event)}
                            >
                              <i className="fas fa-user-plus"></i>
                              Register Now
                            </button>
                          ) : (
                            <button className="btn-full" disabled>
                              <i className="fas fa-exclamation-circle"></i>
                              Fully Booked
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* Static event grid for filtered views */}
            {activeFilter !== 'all' && (
              <div className="events-grid">
                {filteredEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-poster">
                      <img src={`/assets/${event.poster}`} alt={event.name} />
                      <div className={`event-status ${event.status}`}>
                        {event.status}
                      </div>
                    </div>
                    <div className="event-details">
                      <h3 className="event-name">{event.name}</h3>
                      <p className="event-description">{event.description}</p>
                      <p className="event-time">
                        <i className="fas fa-clock"></i>
                        {event.time}
                      </p>
                      <p className="event-location">
                        <i className="fas fa-map-marker-alt"></i>
                        {event.location}
                      </p>
                      <div className="event-seats">
                        <div className="seats-info">
                          <i className="fas fa-users"></i>
                          <span>{event.seats} of {event.totalSeats} seats left</span>
                        </div>
                        <div className="seats-progress">
                          <div 
                            className="progress-bar" 
                            style={{width: `${(event.seats / event.totalSeats) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="event-actions">
                      {event.registered ? (
                        <button 
                          className={canUnregister(event.date) ? "btn-unregister" : "btn-unregister disabled"}
                          onClick={() => canUnregister(event.date) && handleUnregister(event)}
                          title={canUnregister(event.date) ? "Unregister from this event" : "Cannot unregister within 2 days of event"}
                        >
                          <i className="fas fa-times"></i>
                          {canUnregister(event.date) ? "Unregister" : "Unregister Disabled"}
                        </button>
                      ) : event.seats > 0 ? (
                        <button 
                          className="btn-register"
                          onClick={() => handleRegisterClick(event)}
                        >
                          <i className="fas fa-user-plus"></i>
                          Register Now
                        </button>
                      ) : (
                        <button className="btn-full" disabled>
                          <i className="fas fa-exclamation-circle"></i>
                          Fully Booked
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="modal-overlay">
          <div className="modal registration-form">
            <div className="modal-header">
              <h2>Register for {currentEvent.name}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowRegistrationForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitRegistration}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? 'error' : ''}
                    />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="studentId">Student ID *</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className={formErrors.studentId ? 'error' : ''}
                    />
                    {formErrors.studentId && <span className="error-text">{formErrors.studentId}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : ''}
                    />
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={formErrors.department ? 'error' : ''}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Business Administration">Business Administration</option>
                    </select>
                    {formErrors.department && <span className="error-text">{formErrors.department}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year of Study *</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={formErrors.year ? 'error' : ''}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                    {formErrors.year && <span className="error-text">{formErrors.year}</span>}
                  </div>
                </div>
                
                <div className="form-footer">
                  <p className="form-note">By registering, you agree to our terms and conditions.</p>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowRegistrationForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-confirm"
                  >
                    Complete Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Unregister Modal */}
      {showUnregisterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Unregister from {currentEvent.name}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowUnregisterModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to unregister from this event?</p>
              {!canUnregister(currentEvent.date) && (
                <p className="warning-text">
                  <i className="fas fa-exclamation-triangle"></i>
                  Note: This event is less than 2 days away. Unregistering may not be possible.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowUnregisterModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm"
                onClick={confirmUnregister}
                disabled={!canUnregister(currentEvent.date)}
              >
                Confirm Unregistration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;