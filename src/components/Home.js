import React from 'react';
import ScrollBackground from './ScrollBackground';
import Hero from './Hero';
import Services from './Services';
import Features from './Features';
import ScrollStory from './ScrollStory';
import Team from './Team';
import FAQ from './FAQ';
import CallToAction from './CallToAction';
import Footer from './Footer';

const Home = ({ onOpenForm }) => {
  return (
    <>
      <ScrollBackground />
      <Hero />
      <Services />
      <Features />
      <ScrollStory />
      <Team />
      <FAQ />
      <CallToAction onOpenForm={onOpenForm} />
      <Footer />
    </>
  );
};

export default Home;