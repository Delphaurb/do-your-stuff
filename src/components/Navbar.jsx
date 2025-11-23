import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaCalendarAlt, FaThLarge, FaCog, FaWallet } from 'react-icons/fa';

function Navbar() {
  const { theme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    color: isActive(path) ? '#fff' : theme.colors.text,
    backgroundColor: isActive(path) ? theme.colors.primary : 'transparent',
    fontWeight: isActive(path) ? '600' : '500',
    transition: 'all 0.2s ease',
    opacity: isActive(path) ? 1 : 0.7,
  });

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: theme.colors.surface,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid rgba(0,0,0,0.05)`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: theme.colors.text,
          letterSpacing: '-0.5px'
        }}>Do your stuff.</h1>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={navItemStyle('/')}>
          <FaThLarge size={16} />
          <span>Board</span>
        </Link>
        <Link to="/calendar" style={navItemStyle('/calendar')}>
          <FaCalendarAlt size={16} />
          <span>Calendar</span>
        </Link>
        <Link to="/finance" style={navItemStyle('/finance')}>
          <FaWallet size={16} />
          <span>Finance</span>
        </Link>
        <Link to="/settings" style={navItemStyle('/settings')}>
          <FaCog size={16} />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
