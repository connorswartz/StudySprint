import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ navItems }) => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null); // Track the hovered button

  const navbarStyle = {
    backgroundColor: '#242424', // Light grey background
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px 0'
  };

  const buttonStyle = (buttonId) => ({
    backgroundColor: hoveredButton === buttonId ? '#0056b3' : '#007bff', // Change color on hover
    color: 'white',
    fontSize: '1rem', // Larger font size
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    cursor: 'pointer'
  });

  return (
    <div style={navbarStyle}>
      {navItems.map(item => (
        <button
          key={item.id}
          onMouseEnter={() => setHoveredButton(item.id)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => navigate(item.path)}
          style={buttonStyle(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationBar;
