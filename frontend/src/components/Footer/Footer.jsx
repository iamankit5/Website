import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer neumorphic">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-text">
              Calcutta Institute of Science and Management College<br />
              32, M.N. Road, Kolkata - 700025<br />
              West Bengal, India
            </p>
            <p className="footer-text">
              Email: <a href="mailto:info@cismcollege.ac.in" className="footer-link">info@cismcollege.ac.in</a><br />
              Phone: +91 33 2486-XXXX
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/schedule" className="footer-link">Schedule</a></li>
              <li><a href="/register" className="footer-link">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon futuristic-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="social-icon futuristic-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="social-icon futuristic-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B6932E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Calcutta Institute of Science and Management College. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;