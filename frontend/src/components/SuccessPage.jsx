import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const whatsappLink = "https://chat.whatsapp.com/FdhHvznH4BH3fynJntnavF";

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
            onClick={() => navigate('/')}
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