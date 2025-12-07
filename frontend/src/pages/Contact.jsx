import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Get in touch with the organizing team</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Organizing Team</h2>
            
            <div className="contact-person">
              <h3>Convener</h3>
              <p><strong>Rituparna Das</strong></p>
              <p>Asst. Prof. of English & HoD In-Charge, B.Sc Data Science Department</p>
            </div>
            
            <div className="contact-person">
              <h3>Student Coordinators</h3>
              <ul>
                <li>Rajarshi Mahato</li>
                <li>Ankit Mondal</li>
                <li>Chatana Banerjee</li>
                <li>Sreya Chakraborty</li>
              </ul>
            </div>
            
            <div className="contact-details">
              <h3>Contact Information</h3>
              <p><strong>Phone:</strong> Will be published upon confirmation</p>
              <p className="contact-note">
                For queries, contact student coordinators
              </p>
            </div>
          </div>
          
          <div className="contact-map">
            <div className="map-placeholder">
              <h3>Location</h3>
              <p>Calcutta Institute of Science and Management College</p>
              <p>Kolkata, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;