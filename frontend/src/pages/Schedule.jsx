import React from 'react';
import './Schedule.css';

const Schedule = () => {
  // Sample schedule data
  const scheduleData = [
    {
      lecture: "Lecture-1",
      topic: "Idea to Reality: Bridging the Gap",
      speaker: "Dr. Soumyendu Bhattacharjee",
      date: "11.12.2025",
      time: "12:00 PM",
      mode: "Online (Google Meet)",
      register: "Open"
    }
  ];

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <div className="schedule-header">
          <h1>Lecture Series Schedule</h1>
          <p>Upcoming lectures in the series</p>
        </div>
        
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Lecture No</th>
                <th>Topic</th>
                <th>Speaker</th>
                <th>Date</th>
                <th>Time</th>
                <th>Mode</th>
                <th>Registration</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((lecture, index) => (
                <tr key={index}>
                  <td data-label="Lecture No">{lecture.lecture}</td>
                  <td data-label="Topic">{lecture.topic}</td>
                  <td data-label="Speaker">{lecture.speaker}</td>
                  <td data-label="Date">{lecture.date}</td>
                  <td data-label="Time">{lecture.time}</td>
                  <td data-label="Mode">{lecture.mode}</td>
                  <td data-label="Registration">
                    <span className={`status ${lecture.register.toLowerCase()}`}>
                      {lecture.register}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="schedule-note">
          <p><strong>Note:</strong> More lectures will be announced soon. Please check back regularly for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;