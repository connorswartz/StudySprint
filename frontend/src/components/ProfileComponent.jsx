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

  const handleLogout = () => {
    // Clear user authentication data from local storage or cookies
    localStorage.removeItem('token'); // If you're using token-based authentication
    // Clear any other auth-related data or state

    // Redirect to login page
    navigate('/login');
  };

  // Define the styles inline as per the design in the screenshot
  const styles = {
    container: {
      display: 'flex',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    leftColumn: {
      backgroundColor: 'skyblue',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '35%', // Adjust based on your layout
    },
    rightColumn: {
      padding: '20px',
      backgroundColor: 'black',
      width: '100%', // Adjust based on your layout
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    avatar: {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      marginBottom: '15px',
      // Replace with your user's avatar image URL
      background: "url('path_to_avatar_image') center/cover no-repeat",
    },
    userInfo: {
      marginBottom: '20px',
    },
    input: {
      margin: '10px 0',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      width: 'calc(100% - 16px)', // Full width minus padding
    },
    button: {
      padding: '10px 15px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#555',
      color: 'white',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.rightColumn}>
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
          <button onClick={handleEmailChange} style={styles.button}>Update Email</button>
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handlePasswordChange} style={styles.button}>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
