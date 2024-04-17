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
    { id: 'Report', label: 'Performance Report', path: '/performancereport' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdate = async (updateData) => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        if (updateData.type === 'email') {
          await axios.patch(`http://localhost:8000/api/users/${userId}/update_email/`, { email: updateData.value });
        } else if (updateData.type === 'password') {
          await axios.patch(`http://localhost:8000/api/users/${userId}/update_password/`, { password: updateData.value });
        }
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
      <NavigationBar navItems={navItems} />
      <div style={{ marginTop: '60px' }}>
        {currentUser && (
          <ProfileComponent
            currentUser={currentUser}
            onUpdate={handleUpdate}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default ProfilePage;