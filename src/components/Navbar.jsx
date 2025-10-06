import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <span className="navbar__brand">EXPRESS</span>
      </div>
      <ul className="navbar__links">
        <li>Sale</li>
        <li>New & Featured</li>
        <li>Women</li>
        <li>Men</li>
        <li>Kids</li>
        <li>West End Store</li>
        <li>Customs</li>
      </ul>
      <div className="navbar__icons">
        <button aria-label="Search" className="navbar__icon-btn"><FaSearch /></button>
        <div className="user-dropdown" ref={dropdownRef}>
          <button 
            aria-label="User Profile" 
            className="navbar__icon-btn" 
            onClick={toggleDropdown}
          >
            <FaUser />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="user-email">demo@1digitals.com</div>
              <button 
                className="logout-button" 
                onClick={handleLogoutClick}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
        <button aria-label="Shopping Bag" className="navbar__icon-btn"><FaShoppingBag /></button>
      </div>
    </nav>
  );
};

export default Navbar;
