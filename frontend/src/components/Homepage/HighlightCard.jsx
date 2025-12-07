import React from 'react';
import './HighlightCard.css';
import { useNavigate } from 'react-router-dom';

const HighlightCard = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className="highlight-card">
      <div className="card-header">
        <h3>Upcoming Lecture: Lecture - 1</h3>
      </div>
      <div className="card-content">
        <div className="card-topic">
          <h4>Idea to Reality: Bridging the Gap</h4>
        </div>
        <div className="card-speaker">
          <p><strong>Speaker:</strong> Dr. Soumyendu Bhattacharjee</p>
          <p className="speaker-designation">Principal, Regent Institute of Science and Technology</p>
        </div>
        <div className="card-details">
          <p><strong>Date & Time:</strong> 11.12.2025 at 12:00 PM Onwards</p>
          <p><strong>Mode:</strong> Online | Google Meet</p>
          <p><strong>Certificate:</strong> E-certificate will be provided</p>
        </div>
        <div className="card-deadline">
          <p className="deadline-text">Registration closes on 10.12.2025 at 11:59 PM</p>
        </div>
        <button className="register-button" onClick={handleRegisterClick}>
          Register Now
        </button>
      </div>
    </div>
  );
};

export default HighlightCard;