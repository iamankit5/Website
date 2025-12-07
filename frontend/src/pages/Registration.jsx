import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    semester: '',
    googleMeetEmail: '',
    lecture: 'Lecture-1'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lectures = [
    'Lecture-1',
    'Lecture-2', 
    'Lecture-3',
    'Lecture-4',
    'Lecture-5',
    'Lecture-6'
  ];

  const departments = [
    'Data Science',
    'Computer Science',
    'Information Technology',
    'Mathematics',
    'Statistics',
    'Other'
  ];

  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    if (!formData.googleMeetEmail.trim()) {
      newErrors.googleMeetEmail = 'Google Meet email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.googleMeetEmail)) {
      newErrors.googleMeetEmail = 'Google Meet email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Transform form data to match backend expectations
      const transformedData = {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.googleMeetEmail, // Using Google Meet email as mobile for now
        occupation: `${formData.department} - ${formData.semester}` // Combine department and semester
      };
      
      const response = await api.post('/submit', transformedData);
      
      if (response.data.success) {
        navigate('/success');
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`An error occurred: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-header">
          <h1 className="page-title">Register for Lectures</h1>
          <p className="page-subtitle">Fill in your details to secure your spot</p>
        </div>
        
        <div className="registration-form-container neumorphic">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`form-select futuristic-glow ${errors.department ? 'error' : ''}`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="semester" className="form-label">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className={`form-select futuristic-glow ${errors.semester ? 'error' : ''}`}
                >
                  <option value="">Select Semester</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
                {errors.semester && <span className="error-message">{errors.semester}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="googleMeetEmail" className="form-label">Google Meet Email *</label>
                <input
                  type="email"
                  id="googleMeetEmail"
                  name="googleMeetEmail"
                  value={formData.googleMeetEmail}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.googleMeetEmail ? 'error' : ''}`}
                  placeholder="Enter your Google Meet email"
                />
                {errors.googleMeetEmail && <span className="error-message">{errors.googleMeetEmail}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lecture" className="form-label">Lecture *</label>
                <select
                  id="lecture"
                  name="lecture"
                  value={formData.lecture}
                  onChange={handleChange}
                  className="form-select futuristic-glow"
                >
                  {lectures.map(lecture => (
                    <option key={lecture} value={lecture}>{lecture}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="submit-btn futuristic-glow pulse-animation"
              >
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;