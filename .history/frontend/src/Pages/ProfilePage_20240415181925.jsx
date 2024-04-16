import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';
import NavigationBar from "../components/NavigationBar";
import PropTypes from 'prop-types';
import axios from 'axios';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const navItems = [
    { id: 'Profile', label: 'Profile', path: '/profilepage' },
    { id: 'Home', label: 'Home', path: '/homepage' },
    { id: 'Report', label: 'Report', path: '/performancereport' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdate = async (updateData) => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await axios.patch(`http://localhost:8000/api/users/${userId}/`, updateData);
        // Fetch the updated user data and update the state
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      {currentUser && (
        <ProfileComponent currentUser={currentUser} onUpdate={handleUpdate} />
      )}
      <button
        style={{
          marginTop: '20px',
          display: 'block',
          width: '100%',
          padding: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <NavigationBar navItems={navItems} />
    </div>
  );
};

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default ProfilePage;