// ProfileComponent.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProfileComponent = ({ currentUser, onUpdate, onLogout }) => {
  const [email, setEmail] = useState(currentUser?.email || '');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = () => {
    onUpdate({ type: 'email', value: email });
  };

  const handlePasswordChange = () => {
    onUpdate({ type: 'password', value: newPassword });
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '5px',
      backgroundColor: '#0c1e3f', // Very dark blue background color
      color: '#fff', // White text color
    },
    userInfo: {
      marginBottom: '30px',
    },
    field: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      backgroundColor: '#fff', // White background color for input fields
      color: '#000', // Black text color for input fields
    },
    button: {
      padding: '10px 15px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
    logoutButton: {
      marginTop: '30px',
      padding: '10px 15px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#dc3545',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.userInfo}>Profile Settings</h2>
      <div style={styles.field}>
        <label style={styles.label}>Username:</label>
        <span>{currentUser?.username || ''}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleEmailChange} style={styles.button}>
          Update Email
        </button>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePasswordChange} style={styles.button}>
          Change Password
        </button>
      </div>
      <button style={styles.logoutButton} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

ProfileComponent.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileComponent;