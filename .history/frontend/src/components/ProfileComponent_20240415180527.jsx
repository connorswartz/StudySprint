// ProfileComponent.jsx
import React, { useState } from 'react';

const ProfileComponent = ({ currentUser, onUpdate }) => {
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
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      borderRadius: '5px',
      backgroundColor: '#f5f5f5',
    },
    userInfo: {
      marginBottom: '20px',
    },
    input: {
      margin: '10px 0',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: '100%',
    },
    button: {
      padding: '10px 15px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.userInfo}>Profile Settings</h2>
      <div>
        <strong>Username:</strong> {currentUser?.username || ''}
      </div>
      <div>
        <label>Email:</label>
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
      <div>
        <label>New Password:</label>
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
    </div>
  );
};

export default ProfileComponent;