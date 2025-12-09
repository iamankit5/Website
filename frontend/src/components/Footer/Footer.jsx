import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer neumorphic">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><i className="fas fa-envelope"></i> mondal.ankit703@gmail.com</p>
            <p><i className="fas fa-phone"></i> +91 8272922792</p>
            <p><i className="fas fa-map-marker-alt"></i> 24, 1A, Chandi Ghosh Rd, Ashok Nagar, Tollygunge, Kolkata, West Bengal 700040</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#speakers">Speakers</a></li>
              <li><a href="#register">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 CISM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;