import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About the Programme</h1>
        </div>
        
        <div className="about-content">
          <section className="about-section">
            <h2>About the Programme</h2>
            <p>
              This development lecture series aims to improve research, technical skill and language efficiency for students. 
              The program is designed to bridge the gap between theoretical knowledge and practical application, providing 
              students with valuable insights from industry experts and academicians in Data Science and Multidisciplinary area..
            </p>
          </section>
          
          <section className="about-section">
            <h2>Organising Department</h2>
            <p>
              B.Sc Data Science Department, Calcutta Institute of Science and Management College
            </p>
            <p>
              The department is committed to providing quality education in data science, combining theoretical 
              foundations with hands-on experience. Our faculty members are dedicated to nurturing the next 
              generation of data scientists and analysts.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Convener</h2>
            <p>
              <strong>Rituparna Das</strong> (Asst. Prof. of English & HoD In-Charge, B.Sc Data Science Department)
            </p>
            <p>
              With extensive experience in both English literature and data science education, Ms. Das brings a 
              unique interdisciplinary perspective to the program. Her vision is to create well-rounded graduates 
              who excel not only in technical skills but also in communication and critical thinking.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;