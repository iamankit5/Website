import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch all lectures status when component mounts
  useEffect(() => {
    const fetchLecturesStatus = async () => {
      try {
        const response = await api.get('/lectures/status');
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures status:', error);
        alert('Error fetching lectures status');
      } finally {
        setLoading(false);
      }
    };

    fetchLecturesStatus();
  }, []);

  const toggleLectureStatus = async (lectureId) => {
    const currentStatus = lectures[lectureId].status;
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    
    setUpdating(true);
    
    try {
      // In a real app, this would be a PUT/PATCH request to update the lecture status
      // For now, we'll just update the local state to simulate the functionality
      setLectures(prev => ({
        ...prev,
        [lectureId]: {
          ...prev[lectureId],
          status: newStatus
        }
      }));
      
      alert(`Lecture ${lectures[lectureId].name} is now ${newStatus}`);
    } catch (error) {
      console.error('Error updating lecture status:', error);
      alert('Error updating lecture status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-header">
            <h1 className="page-title">Admin Panel</h1>
            <p className="page-subtitle">Loading lecture statuses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Manage lecture registrations</p>
        </div>
        
        <div className="admin-content">
          <div className="lectures-management neumorphic">
            <h2>Lecture Status Management</h2>
            <div className="lectures-list">
              {Object.entries(lectures).map(([id, lecture]) => (
                <div key={id} className="lecture-item">
                  <div className="lecture-info">
                    <h3>{lecture.name}</h3>
                    <span className={`status-badge ${lecture.status}`}>
                      {lecture.status.toUpperCase()}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleLectureStatus(id)}
                    disabled={updating}
                    className={`status-toggle-btn ${lecture.status}`}
                  >
                    {updating ? 'Updating...' : (lecture.status === 'open' ? 'Close Registration' : 'Open Registration')}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="admin-instructions neumorphic">
            <h3>Instructions</h3>
            <ul>
              <li>Click "Close Registration" to prevent new registrations for a lecture</li>
              <li>Click "Open Registration" to allow new registrations for a lecture</li>
              <li>When all lectures are closed, the registration page will show "Registrations Closed"</li>
              <li>The registration page only shows open lectures in the dropdown</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;