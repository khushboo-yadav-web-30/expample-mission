import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = ({ onOpenForm }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    onOpenForm();
  };

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <nav className="nav">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="gradient-text">Mission Control</span>
          </motion.div>
          
          <div className="nav-links">
            <motion.button 
              onClick={handleGetStartedClick}
              className="get-in-touch-btn"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="btn-content"
                variants={{
                  hover: { scale: 1.02 }
                }}
              >
                <span>GET IN TOUCH</span>
                <div className="arrow-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;