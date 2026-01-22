import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: "Focused on Output",
      description: "We use a strategic approach built for quality and efficiency. It's a system meaning, it's a system, which means we can design more in a strategic way.",
      icon: "target"
    },
    {
      title: "Built to Scale",
      description: "Built with a focused project and grow the ongoing support of a creative world-class team with the ability to grow with the business needs.",
      icon: "hexagon"
    },
    {
      title: "Accelerated with AI",
      description: "We use AI to streamline the process so we then can focus on what matters most: creating custom brands and products that work.",
      icon: "chart"
    }
  ];

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'target':
        return (
          <div className="feature-icon target-icon">
            <div className="target-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
              <div className="ring ring-4"></div>
              <div className="target-center"></div>
            </div>
          </div>
        );
      case 'hexagon':
        return (
          <div className="feature-icon hexagon-icon">
            <div className="hexagon-grid">
              <div className="hex hex-1"></div>
              <div className="hex hex-2"></div>
              <div className="hex hex-3"></div>
              <div className="hex hex-4"></div>
              <div className="hex hex-5"></div>
              <div className="hex hex-6"></div>
              <div className="hex hex-7"></div>
              <div className="hex-center">✦</div>
            </div>
          </div>
        );
      case 'chart':
        return (
          <div className="feature-icon chart-icon">
            <div className="chart-container">
              <div className="chart-bars">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
                <div className="bar bar-6"></div>
                <div className="bar bar-7"></div>
                <div className="bar bar-8"></div>
                <div className="bar bar-9"></div>
                <div className="bar bar-10"></div>
                <div className="bar bar-11"></div>
                <div className="bar bar-12"></div>
              </div>
              <div className="chart-arrow">▲</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="features">
      <div className="features-container">
        <motion.div 
          className="features-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="features-title">
            REVOLUTIONIZING<br />
            DESIGN SERVICES
          </h2>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                {renderIcon(feature.icon)}
                <p className="feature-description">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;