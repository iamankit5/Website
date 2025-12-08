import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    institution: '',
    designation: '',
    whatsappNumber: '',
    lecture: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lectures, setLectures] = useState({});
  const [loading, setLoading] = useState(true);
  const [registrationsClosed, setRegistrationsClosed] = useState(false);

  // Fetch available lectures when component mounts
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await api.get('/lectures');
        setLectures(response.data);
        
        // Set default lecture to the first available one
        const lectureKeys = Object.keys(response.data);
        if (lectureKeys.length > 0) {
          setFormData(prev => ({
            ...prev,
            lecture: lectureKeys[0]
          }));
        } else {
          // No lectures available
          setRegistrationsClosed(true);
        }
      } catch (error) {
        console.error('Error fetching lectures:', error);
        // Fallback to default lectures if API fails
        const defaultLectures = {
          'Lecture-1': { name: 'Lecture 1', status: 'open' }
        };
        setLectures(defaultLectures);
        setFormData(prev => ({
          ...prev,
          lecture: 'Lecture-1'
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

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
    
    // Full Name validation (mandatory)
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Email validation (mandatory, must contain @)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @ symbol';
    } else if (!/\.(gmail|outlook)\./.test(formData.email) && !/@(gmail|outlook)\./.test(formData.email)) {
      newErrors.email = 'Email must be from Gmail or Outlook domain';
    }
    
    // Department validation (mandatory)
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    // Institution validation (mandatory)
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    
    // Designation validation (mandatory)
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    
    // WhatsApp Number validation (mandatory, exactly 10 digits)
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'WhatsApp number must be exactly 10 digits';
    }
    
    // Lecture validation
    if (!formData.lecture) {
      newErrors.lecture = 'Please select a lecture';
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
        mobile: formData.whatsappNumber,
        occupation: `${formData.department} - ${formData.institution} - ${formData.designation}`,
        lecture: formData.lecture
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

  if (loading) {
    return (
      <div className="registration-page">
        <div className="container">
          <div className="registration-header">
            <h1 className="page-title">Register for Lectures</h1>
            <p className="page-subtitle">Loading available lectures...</p>
          </div>
        </div>
      </div>
    );
  }

  if (registrationsClosed) {
    return (
      <div className="registration-page">
        <div className="container">
          <div className="registration-header">
            <h1 className="page-title">Registrations Closed</h1>
            <p className="page-subtitle">Sorry, registrations for all lectures are currently closed.</p>
            <p>Please check back later for upcoming lectures.</p>
          </div>
        </div>
      </div>
    );
  }

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
                  placeholder="Enter your email (Gmail or Outlook)"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.department ? 'error' : ''}`}
                  placeholder="Enter your department"
                />
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="institution" className="form-label">Institution *</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.institution ? 'error' : ''}`}
                  placeholder="Enter your institution"
                />
                {errors.institution && <span className="error-message">{errors.institution}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="designation" className="form-label">Designation *</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.designation ? 'error' : ''}`}
                  placeholder="Enter your designation"
                />
                {errors.designation && <span className="error-message">{errors.designation}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="whatsappNumber" className="form-label">WhatsApp Number *</label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className={`form-input futuristic-glow ${errors.whatsappNumber ? 'error' : ''}`}
                  placeholder="Enter WhatsApp number (10 digits)"
                />
                {errors.whatsappNumber && <span className="error-message">{errors.whatsappNumber}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lecture" className="form-label">Lecture *</label>
                <select
                  id="lecture"
                  name="lecture"
                  value={formData.lecture}
                  onChange={handleChange}
                  className={`form-select futuristic-glow ${errors.lecture ? 'error' : ''}`}
                >
                  <option value="">Select a Lecture</option>
                  {Object.entries(lectures).map(([id, lecture]) => (
                    <option key={id} value={id}>{lecture.name}</option>
                  ))}
                </select>
                {errors.lecture && <span className="error-message">{errors.lecture}</span>}
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