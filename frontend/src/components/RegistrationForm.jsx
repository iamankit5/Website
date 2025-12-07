import React, { useState } from 'react';
import { submitRegistration } from '../services/api';
import './RegistrationForm.css';
import logo from '../logo.png'; // Assuming you have a logo file in the src folder

export const validate = (formData) => {
  const newErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  } else if (formData.name.trim().length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    newErrors.name = 'Name should contain only alphabets';
  }

  // Email validation
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email address is invalid';
  }

  // Mobile validation
  if (!formData.mobile) {
    newErrors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    newErrors.mobile = 'Mobile number must be 10 digits';
  }

  // Occupation validation
  if (!formData.occupation) {
    newErrors.occupation = 'Please select an occupation';
  }

  return newErrors;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    occupation: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await submitRegistration(formData);
      
      if (response.success) {
        window.location.href = '/success';
      } else {
        setErrors({ submit: response.message || 'Submission failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: error.message || 'An unknown error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-form-container">
      <div className="registration-form-card">
        <div className="form-header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>College Registration</h2>
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation *</label>
            <select
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={errors.occupation ? 'error' : ''}
            >
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Staff">Staff</option>
              <option value="Guest">Guest</option>
            </select>
            {errors.occupation && <span className="error-message">{errors.occupation}</span>}
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              'Register Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;