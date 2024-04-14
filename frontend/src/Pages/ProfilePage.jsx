import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent'; // Ensure the path is correct

const ProfilePage = ({ currentUser, onLogout, onUpdate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data from local storage or cookies
    localStorage.removeItem('token'); // If you're using token-based authentication
    // Clear any other auth-related data or state

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <ProfileComponent currentUser={currentUser} onUpdate={onUpdate} />
      <button style={{ marginTop: '20px', display: 'block', width: '100%', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',  }}
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
