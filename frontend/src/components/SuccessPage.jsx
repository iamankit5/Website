import React from 'react';
import './SuccessPage.css';

const SuccessPage = () => {
  const whatsappLink = "https://wa.me/xxxxxxxxxx?text=Hi%20I%20have%20registered";

  return (
    <div className="success-page-container">
      <div className="success-card">
        <div className="success-icon-container">
          <div className="success-icon">✓</div>
        </div>
        <h2>Thank you for registering!</h2>
        <p>Your registration has been successfully submitted.</p>
        <div className="button-group">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            Join WhatsApp Group
          </a>
          <button 
            onClick={() => window.location.href = '/'}
            className="back-button"
          >
            Register Another User
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;