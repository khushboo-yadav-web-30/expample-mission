import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FormModal.css';

const FormModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="form-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Form Panel */}
          <motion.div
            className="form-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
          >
            <div className="form-header">
              <h2>Apply to work with us</h2>
              <button className="close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            
            <div className="form-content">
              <p className="form-description">
                We work with a select number of startups each season. 
                <strong> 2 of 5 spots available for Fall 2025.</strong>
              </p>
              
              <p className="form-contact">
                Fill out the form or email us at{' '}
                <a href="mailto:hey@missioncontrol.co">hey@missioncontrol.co</a>
              </p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="project">Tell us about your project or idea</label>
                  <textarea
                    id="project"
                    name="project"
                    rows="4"
                    required
                    className="form-textarea"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary form-submit">
                  Send Application
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FormModal;