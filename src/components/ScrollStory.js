import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStory.css';

const ScrollStory = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Only show ScrollStory content when the section is actually in view
  const sectionInView = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Phase-based opacity controls
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]); // First text
  const phase2Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]); // Connected Across Time
  const phase3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]); // We Are Your A-Team

  // Planet and moon positions
  const moonRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const planetsScale = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);
  const finalPlanetsOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawStars = (ctx, centerX, centerY) => {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * (canvas.width / window.devicePixelRatio);
        const y = Math.random() * (canvas.height / window.devicePixelRatio);
        const brightness = Math.random() * 0.8 + 0.2;
        const size = Math.random() * 2 + 0.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawEarthLikePlanet = (x, y, radius) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Planet gradient (blue to dark)
      const planetGradient = ctx.createRadialGradient(-radius/3, -radius/3, 0, 0, 0, radius);
      planetGradient.addColorStop(0, '#4A90E2');
      planetGradient.addColorStop(0.4, '#2E5984');
      planetGradient.addColorStop(0.8, '#1E3A5F');
      planetGradient.addColorStop(1, '#0A1A2A');
      
      ctx.fillStyle = planetGradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Glowing atmosphere
      ctx.strokeStyle = 'rgba(74, 144, 226, 0.6)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#4A90E2';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, radius + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      ctx.restore();
    };

    const drawOrbitingMoon = (centerX, centerY, orbitRadius, angle, moonSize, color) => {
      const moonX = centerX + Math.cos(angle) * orbitRadius;
      const moonY = centerY + Math.sin(angle) * orbitRadius;
      
      const moonGradient = ctx.createRadialGradient(moonX - moonSize/3, moonY - moonSize/3, 0, moonX, moonY, moonSize);
      moonGradient.addColorStop(0, color);
      moonGradient.addColorStop(1, `${color}40`);
      
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Moon glow
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonSize, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawOrbitPath = (centerX, centerY, radius) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawFinalPlanets = (centerX, centerY) => {
      const planets = [
        { x: centerX - 50, y: centerY - 80, size: 25, color: '#FF6B9D' },
        { x: centerX + 60, y: centerY - 60, size: 30, color: '#4ECDC4' },
        { x: centerX - 40, y: centerY + 70, size: 20, color: '#45B7D1' },
        { x: centerX + 80, y: centerY + 50, size: 35, color: '#9B59B6' }
      ];

      planets.forEach(planet => {
        const gradient = ctx.createRadialGradient(
          planet.x - planet.size/3, 
          planet.y - planet.size/3, 
          0, 
          planet.x, 
          planet.y, 
          planet.size
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, `${planet.color}40`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Planet glow
        ctx.strokeStyle = planet.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      drawStars(ctx, centerX, centerY);

      const currentMoonRotation = moonRotation.get();
      const currentPlanetsScale = planetsScale.get();
      const currentFinalPlanetsOpacity = finalPlanetsOpacity.get();

      // Draw main Earth-like planet
      if (currentPlanetsScale > 0) {
        ctx.save();
        ctx.scale(currentPlanetsScale, currentPlanetsScale);
        drawEarthLikePlanet(centerX, centerY + 50, 80);
        ctx.restore();
      }

      // Draw orbit paths
      if (scrollYProgress.get() > 0.1 && currentPlanetsScale > 0) {
        drawOrbitPath(centerX, centerY + 50, 150);
        drawOrbitPath(centerX, centerY + 50, 200);
        drawOrbitPath(centerX, centerY + 50, 250);
      }

      // Draw orbiting moons
      if (scrollYProgress.get() > 0.2 && currentPlanetsScale > 0) {
        const angle1 = (currentMoonRotation * Math.PI / 180);
        const angle2 = (currentMoonRotation * Math.PI / 180) + Math.PI;
        const angle3 = (currentMoonRotation * 0.7 * Math.PI / 180) + Math.PI / 2;
        
        drawOrbitingMoon(centerX, centerY + 50, 150, angle1, 12, '#FF6B9D');
        drawOrbitingMoon(centerX, centerY + 50, 200, angle2, 15, '#4ECDC4');
        drawOrbitingMoon(centerX, centerY + 50, 250, angle3, 10, '#9B59B6');
      }

      // Draw final clustered planets
      if (currentFinalPlanetsOpacity > 0) {
        ctx.save();
        ctx.globalAlpha = currentFinalPlanetsOpacity;
        drawFinalPlanets(centerX, centerY - 100);
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [moonRotation, planetsScale, finalPlanetsOpacity, scrollYProgress, sectionInView]);

  return (
    <section className="scroll-story" ref={containerRef}>
      <motion.div 
        className="scroll-story-canvas"
        style={{ opacity: sectionInView }}
      >
        <canvas ref={canvasRef} />
      </motion.div>
      
      <div className="container">
        {/* Phase 1: First Description */}
        <motion.div 
          className="story-content phase-1"
          style={{ 
            opacity: useTransform([phase1Opacity, sectionInView], ([phase, section]) => phase * section)
          }}
        >
          <p className="story-text">
            Mission Control is a fully remote team working across time zones to 
            keep projects moving fast and communication sharp through an 
            asynchronous-first model.
          </p>
        </motion.div>

        {/* Phase 2: Connected Across Time */}
        <motion.div 
          className="story-content phase-2"
          style={{ 
            opacity: useTransform([phase2Opacity, sectionInView], ([phase, section]) => phase * section)
          }}
        >
          <h2 className="story-title">
            CONNECTED<br />
            ACROSS TIME
          </h2>
          <p className="story-text">
            Mission Control is a fully remote team working across time zones to 
            keep projects moving fast and communication sharp through an 
            asynchronous-first model.
          </p>
        </motion.div>

        {/* Phase 3: We Are Your A-Team */}
        <motion.div 
          className="story-content phase-3"
          style={{ 
            opacity: useTransform([phase3Opacity, sectionInView], ([phase, section]) => phase * section)
          }}
        >
          <h2 className="story-title">
            WE ARE YOUR<br />
            A-TEAM
          </h2>
          <p className="story-text">
            Our senior team is battle-tested on global brands and has helped 
            shape startups that became household names.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollStory;