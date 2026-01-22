import React from 'react';
import { motion } from 'framer-motion';
import './CallToAction.css';

const CallToAction = ({ onOpenForm }) => {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="cta-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            NOW ACCEPTING<br />
            SELECT NEW CLIENTS
          </motion.h2>
          
          <motion.p 
            className="cta-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            2 of 5 spots available for Fall 2025
          </motion.p>
          
          <motion.button 
            className="start-mission-btn"
            onClick={onOpenForm}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="btn-content"
              variants={{
                hover: { scale: 1.02 }
              }}
            >
              <span>START YOUR MISSION</span>
              <div className="arrow-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;