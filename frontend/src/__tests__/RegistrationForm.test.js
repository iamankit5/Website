// Test script for frontend form validation
// This would typically be run with Jest or a similar testing framework

import { validate } from '../src/components/RegistrationForm';

describe('Registration Form Validation', () => {
  test('should validate correct inputs', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      occupation: 'Student'
    };
    
    const errors = validate(formData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test('should reject empty name', () => {
    const formData = {
      name: '',
      email: 'john@example.com',
      mobile: '1234567890',
      occupation: 'Student'
    };
    
    const errors = validate(formData);
    expect(errors.name).toBe('Name is required');
  });

  test('should reject short name', () => {
    const formData = {
      name: 'Jo',
      email: 'john@example.com',
      mobile: '1234567890',
      occupation: 'Student'
    };
    
    const errors = validate(formData);
    expect(errors.name).toBe('Name must be at least 3 characters');
  });

  test('should reject invalid email', () => {
    const formData = {
      name: 'John Doe',
      email: 'invalid-email',
      mobile: '1234567890',
      occupation: 'Student'
    };
    
    const errors = validate(formData);
    expect(errors.email).toBe('Email address is invalid');
  });

  test('should reject invalid mobile number', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '12345',
      occupation: 'Student'
    };
    
    const errors = validate(formData);
    expect(errors.mobile).toBe('Mobile number must be 10 digits');
  });

  test('should reject empty occupation', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      occupation: ''
    };
    
    const errors = validate(formData);
    expect(errors.occupation).toBe('Please select an occupation');
  });
});