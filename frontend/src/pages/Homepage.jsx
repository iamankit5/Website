import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title pulse-animation">
            Research, Skill, and Language Efficiency Development Lecture Series
          </h1>
          <h2 className="hero-subtitle">
            Organised by B.Sc Data Science Department
          </h2>
          <p className="hero-college">
            Calcutta Institute of Science and Management College, Kolkata, India
          </p>
          <div className="hero-buttons">
            <a href="/register" className="btn primary-btn futuristic-glow">
              Register Now
            </a>
            <a href="/schedule" className="btn secondary-btn futuristic-glow">
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Highlight Card */}
      <section className="highlight-section container">
        <div className="highlight-card neumorphic">
          <div className="highlight-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="highlight-content">
            <h3 className="highlight-title">Important Notice</h3>
            <p className="highlight-text">
              Registrations are now open for our upcoming lecture series. Limited seats available!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">Why Attend?</h2>
        <div className="features-grid">
          <div className="feature-card neumorphic">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="feature-title">Expert Speakers</h3>
            <p className="feature-description">
              Learn from industry experts and academics in data science and research.
            </p>
          </div>
          
          <div className="feature-card neumorphic">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="feature-title">Interactive Sessions</h3>
            <p className="feature-description">
              Engage in hands-on workshops and interactive learning experiences.
            </p>
          </div>
          
          <div className="feature-card neumorphic">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="feature-title">Networking</h3>
            <p className="feature-description">
              Connect with peers and professionals in the data science community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;