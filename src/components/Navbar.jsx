import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaCalendarAlt, FaThLarge, FaCog, FaWallet } from 'react-icons/fa';

function Navbar() {
  const { theme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full no-underline transition-all duration-200
    ${isActive(path)
      ? 'text-white font-semibold opacity-100'
      : 'font-medium opacity-70 hover:opacity-100'}
  `;

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[70px] flex items-center justify-between px-4 md:px-10 shadow-sm z-50 backdrop-blur-md border-b border-black/5"
      style={{
        backgroundColor: theme.colors.surface,
      }}
    >
      <div className="flex items-center gap-2">
        <h1
          className="text-xl md:text-2xl font-bold tracking-tighter"
          style={{ color: theme.colors.text }}
        >
          Do your stuff.
        </h1>
      </div>

      <div className="flex gap-1 md:gap-2">
        <Link
          to="/"
          className={navItemClass('/')}
          style={{
            backgroundColor: isActive('/') ? theme.colors.primary : 'transparent',
            color: isActive('/') ? '#fff' : theme.colors.text
          }}
        >
          <FaThLarge size={16} />
          <span className="hidden md:inline">Board</span>
        </Link>
        <Link
          to="/calendar"
          className={navItemClass('/calendar')}
          style={{
            backgroundColor: isActive('/calendar') ? theme.colors.primary : 'transparent',
            color: isActive('/calendar') ? '#fff' : theme.colors.text
          }}
        >
          <FaCalendarAlt size={16} />
          <span className="hidden md:inline">Calendar</span>
        </Link>
        <Link
          to="/finance"
          className={navItemClass('/finance')}
          style={{
            backgroundColor: isActive('/finance') ? theme.colors.primary : 'transparent',
            color: isActive('/finance') ? '#fff' : theme.colors.text
          }}
        >
          <FaWallet size={16} />
          <span className="hidden md:inline">Finance</span>
        </Link>
        <Link
          to="/settings"
          className={navItemClass('/settings')}
          style={{
            backgroundColor: isActive('/settings') ? theme.colors.primary : 'transparent',
            color: isActive('/settings') ? '#fff' : theme.colors.text
          }}
        >
          <FaCog size={16} />
          <span className="hidden md:inline">Settings</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
