import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Why Mission Control?",
      answer: [
        "Mission Control is a new kind of branding and design agency, born in the AI age and built for ambitious early-stage companies.",
        "We're part of Clay, the team behind brands like Slack, Meta, and Coinbase. We've helped startups grow from seed rounds to unicorn status, so we know what it takes to build a brand people believe in and a product that gets traction.",
        "Our edge is human creativity, delivered by world-class talent through a focused and strategic process. We use AI to automate what can be streamlined and rework the rest of the process to stay sharp and output-focused.",
        "We work across time zones, asynchronously, with creative leadership based in San Francisco."
      ]
    },
    {
      question: "What services do you offer?",
      answer: [
        "We offer comprehensive branding and design services tailored for startups and early-stage companies.",
        "Our services include brand strategy, visual identity design, logo creation, website design and development, UX/UI design, and ongoing brand support.",
        "We also provide specialized services like pitch deck design, product design, and marketing materials to help you scale effectively."
      ]
    },
    {
      question: "How do you work with startups?",
      answer: [
        "We partner with startups through three main engagement models: Launchpad for brand launches, Orbit for ongoing design support, and Alliance for equity partnerships where we invest creative capital.",
        "Our process is designed to be efficient and output-focused, minimizing meetings and maximizing results.",
        "We work asynchronously across time zones to keep projects moving fast while maintaining the highest quality standards."
      ]
    },
    {
      question: "Do you work with early-stage companies?",
      answer: [
        "Absolutely. We specialize in working with startups and early-stage companies, helping them build strong brand foundations that scale as they grow.",
        "We understand the unique challenges of early-stage companies and tailor our approach to fit your budget and timeline.",
        "Our experience with companies from seed to unicorn status means we know how to build brands that grow with you."
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>{faq.question}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="faq-answer-content">
                      <button 
                        className="faq-close"
                        onClick={() => setActiveIndex(null)}
                      >
                        ×
                      </button>
                      {Array.isArray(faq.answer) ? (
                        faq.answer.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;