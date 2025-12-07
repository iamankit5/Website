import React from 'react';
import './Speakers.css';

const Speakers = () => {
  // Sample speaker data
  const speakersData = [
    {
      name: "Dr. Soumyendu Bhattacharjee",
      designation: "Principal, Regent Institute of Science and Technology",
      sessionTitle: "Idea to Reality: Bridging the Gap",
      bio: "Dr. Soumyendu Bhattacharjee is a renowned academician and researcher with over 20 years of experience in science and technology education. As the Principal of Regent Institute of Science and Technology, he has been instrumental in developing innovative educational programs that bridge the gap between theoretical knowledge and practical application."
    }
  ];

  return (
    <div className="speakers-page">
      <div className="speakers-container">
        <div className="speakers-header">
          <h1>Our Esteemed Speakers</h1>
          <p>Learn from industry experts and academicians</p>
        </div>
        
        <div className="speakers-grid">
          {speakersData.map((speaker, index) => (
            <div className="speaker-card" key={index}>
              <div className="speaker-profile">
                <div className="speaker-placeholder">
                  <span className="speaker-initials">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-designation">{speaker.designation}</p>
                <h4 className="session-title">Session: {speaker.sessionTitle}</h4>
                <p className="speaker-bio">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speakers;