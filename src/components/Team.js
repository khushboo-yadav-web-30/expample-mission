import React from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
  return (
    <section id="team" className="team section">
      <div className="container">
        <motion.div 
          className="team-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="team-header">
            <motion.h2 
              className="team-title"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              We are your <span className="gradient-text">A-team</span>
            </motion.h2>
            <motion.p 
              className="team-description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our senior team is battle-tested on global brands and has helped shape 
              startups that became household names.
            </motion.p>
          </div>

          <div className="team-features">
            <motion.div 
              className="team-feature"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">
                <motion.div 
                  className="icon-circle"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="icon-dot"></div>
                  <div className="icon-dot"></div>
                  <div className="icon-dot"></div>
                </motion.div>
              </div>
              <h3>Connected Across Time</h3>
              <p>Mission Control is a fully remote team working across time zones to keep projects moving fast and communication sharp through an asynchronous-first model.</p>
            </motion.div>

            <motion.div 
              className="team-feature"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">
                <motion.div 
                  className="icon-pulse"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="pulse-ring"></div>
                  <div className="pulse-core"></div>
                </motion.div>
              </div>
              <h3>Battle-Tested Experience</h3>
              <p>Proudly part of the Clay family, the agency behind brands like Slack, Discover, Snapchat, Meta, and Coinbase.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;