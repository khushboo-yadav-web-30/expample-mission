import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (index === 0) {
        // First card (LAUNCHPAD) - appears and stays
        gsap.fromTo(card, {
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top center",
            end: "25% center",
            scrub: true,
          },
        });
      } else if (index === 1) {
        // Second card (ORBIT) - slides up and overlaps first card
        gsap.fromTo(card, {
          y: "100vh",
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "25% center",
            end: "50% center",
            scrub: true,
          },
        });
      } else if (index === 2) {
        // Third card (ALLIANCE) - slides up and overlaps both previous cards
        gsap.fromTo(card, {
          y: "100vh",
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "50% center",
            end: "75% center",
            scrub: true,
          },
        });
      }
    });
  }, []);

  const services = [
    {
      title: "LAUNCHPAD",
      subtitle: "FIXED FEE • STARTING AT $37,500",
      description: "Launch your brand or website with a strategy built for liftoff.",
      features: ["+ BRAND STRATEGY", "+ VISUAL IDENTITY", "+ WEB DESIGN", "+ BRAND ASSETS"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "ORBIT", 
      subtitle: "RETAINER • STARTING AT $9,000/MO",
      description: "Ongoing access to world-class design, built to scale with you.",
      features: ["+ FULL-SERVICE DESIGN", "+ UX & PRODUCT", "+ BRAND SUPPORT", "+ WEB UPDATES"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "ALLIANCE",
      subtitle: "EQUITY PARTNERSHIP",
      description: "We invest creative capital in startups we believe in, building the future together.",
      features: ["+ CREATIVE VENTURE CAPITAL", "+ STRATEGIC DESIGN GUIDANCE", "+ EMBEDDED TEAM", "+ NETWORK OPPORTUNITIES"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const ServiceCard = ({ service, index }) => {
    return (
      <div
        className={`service-card service-card-${index}`}
        ref={(el) => (cardsRef.current[index] = el)}
      >
        <div className="service-card-inner" style={{ background: service.gradient }}>
          <div className="service-bg-space">
            <div className="space-gradient"></div>
            <div className="space-orb"></div>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="space-star"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          <div className="service-content">
            <div className="service-header">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>
            </div>
            
            <div className="service-features">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="feature-item"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={wrapperRef} style={{ height: '400vh' }}> {/* Scroll height wrapper */}
      <section id="services" className="services section" ref={containerRef}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            HOW WE ENGAGE
          </motion.h2>
          
          <div className="services-stack">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;