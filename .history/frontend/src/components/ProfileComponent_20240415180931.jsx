// ProfileComponent.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    // ... (styles remain the same)
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

ProfileComponent.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileComponent;