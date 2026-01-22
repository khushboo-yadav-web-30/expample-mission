import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Logo and Description */}
          <div className="footer-main">
            <motion.h1 
              className="footer-logo"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              MISSION CONTROL
            </motion.h1>
            <motion.p 
              className="footer-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A branding agency and creative capital partner<br />
              for high-growth startups
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div 
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a href="#" className="social-link">INSTAGRAM</a>
            <a href="#" className="social-link">FACEBOOK</a>
            <a href="#" className="social-link">LINKEDIN</a>
            <a href="#" className="social-link">X</a>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-left">
            <p>© Mission Control Company 2025</p>
          </div>
          <div className="footer-bottom-center">
            <p>San Francisco, CA — Planet Earth</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;