import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent'; // Ensure the path is correct

const ProfilePage = ({ currentUser, onLogout, onUpdate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Implementation needed to clear user session
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <ProfileComponent currentUser={currentUser} onUpdate={onUpdate} />
      <button style={{ marginTop: '20px', display: 'block', width: '10%', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '650px' }}
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
