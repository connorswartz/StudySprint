import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavigationBar = ({ navItems }) => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  const navbarStyle = {
    backgroundColor: '#242424',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '10px',
    zIndex: 999,
  };

  const buttonStyle = (buttonId) => ({
    backgroundColor: hoveredButton === buttonId ? '#0056b3' : '#004777',
    color: 'white',
    fontSize: '1rem',
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    cursor: 'pointer',
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