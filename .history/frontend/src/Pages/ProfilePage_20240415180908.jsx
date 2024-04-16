// ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';
import NavigationBar from "../components/NavigationBar";
import PropTypes from 'prop-types';

const ProfilePage = ({ currentUser, onUpdate }) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'Profile', label: 'Profile', path: '/profilepage' },
    { id: 'Home', label: 'Home', path: '/homepage' },
    { id: 'Report', label: 'Report', path: '/performancereport' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <ProfileComponent currentUser={currentUser} onUpdate={onUpdate} />
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
  onUpdate: PropTypes.func.isRequired,
};

export default ProfilePage;