import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Multiple scroll phases - Updated for correct sequence with no overlap
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]); // Initial title
  const phase2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]); // Mission Control partners
  const phase3Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]); // Beyond launch
  const phase4Opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]); // World-class branding
  const phase5Opacity = useTransform(scrollYProgress, [0.9, 0.95, 0.98, 1], [0, 1, 1, 0]); // Clay family text - ensure it disappears
  
  // Hide all Hero content when scrolled past the Hero section
  const heroVisibility = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
  
  const planetRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const planetScale = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
  const sunRotation = useTransform(scrollYProgress, [0.2, 0.5], [0, 360]);
  const sunScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  
  // Rocket appears during phase 2, moves during phase 3
  const rocketY = useTransform(scrollYProgress, [0.2, 0.3], [200, 100]); // Appears from bottom
  const rocketMoveY = useTransform(scrollYProgress, [0.45, 0.6], [100, 50]); // Moves up during phase 3
  
  // Earth appears during phase 3, big in center during phase 5
  const earthY = useTransform(scrollYProgress, [0.45, 0.6], [-200, 100]); // From top during phase 3
  const earthScale = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const earthCenterY = useTransform(scrollYProgress, [0.9, 0.95], [100, 0]); // Center during phase 5
  const earthCenterScale = useTransform(scrollYProgress, [0.9, 0.95], [1, 2]); // Bigger in center

  useEffect(() => {
    // Load Three.js from CDN with better error handling
    if (window.THREE) {
      initThreeJS();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/three@0.128.0/build/three.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('Three.js loaded successfully');
      initThreeJS();
    };
    script.onerror = () => {
      console.error('Failed to load Three.js, falling back to canvas');
      initCanvasFallback();
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initCanvasFallback = () => {
    // Fallback to canvas if Three.js fails to load
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    mountRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);
      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;

      const scrollProgress = scrollYProgress.get();
      const currentSunScale = sunScale.get();
      const currentRocketY = rocketY.get();
      const currentRocketMoveY = rocketMoveY.get();
      const currentEarthY = earthY.get();
      const currentEarthScale = earthScale.get();
      const currentEarthCenterY = earthCenterY.get();
      const currentEarthCenterScale = earthCenterScale.get();

      // Draw improved sun design like in your image - curved horizon
      if (currentSunScale > 0) {
        ctx.save();
        ctx.translate(centerX, canvasHeight);
        ctx.scale(currentSunScale * 3, currentSunScale * 0.4); // Much wider and flatter
        
        const sunRadius = canvasHeight * 0.6;
        
        // Create curved horizon sun like in your image
        const sunGradient = ctx.createRadialGradient(0, 0, sunRadius * 0.3, 0, 0, sunRadius);
        sunGradient.addColorStop(0, '#FFD700'); // Bright yellow center
        sunGradient.addColorStop(0.4, '#FF8C00'); // Orange
        sunGradient.addColorStop(0.7, '#FF4500'); // Red-orange
        sunGradient.addColorStop(0.85, '#9B59B6'); // Purple
        sunGradient.addColorStop(1, '#4A1A5A'); // Dark purple edge
        
        ctx.fillStyle = sunGradient;
        ctx.beginPath();
        ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add bright rim effect
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, sunRadius * 0.95, Math.PI, 0); // Only top arc visible
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.restore();
      }

      // Draw stars
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight * 0.7; // Only in upper area
        const brightness = Math.random() * 0.8 + 0.2;
        const size = Math.random() * 2 + 0.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw much larger planets
      const planetPositions = [
        { x: centerX - 200, y: centerY - 100, size: 80, color: '#B19CD9' }, // Much larger
        { x: centerX + 180, y: centerY - 50, size: 65, color: '#8B4A9C' },
        { x: centerX - 150, y: centerY + 80, size: 50, color: '#E8BFE8' },
        { x: centerX + 220, y: centerY + 60, size: 45, color: '#9B59B6' }
      ];

      planetPositions.forEach(planet => {
        ctx.save();
        ctx.translate(planet.x, planet.y);
        
        const gradient = ctx.createRadialGradient(-planet.size/3, -planet.size/3, 0, 0, 0, planet.size);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.7, '#6B2C7A');
        gradient.addColorStop(1, '#4A1A5A');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, -Math.PI/2, Math.PI/2);
        ctx.fill();
        
        // Glowing crescent edge
        ctx.strokeStyle = '#FF6B9D';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#FF6B9D';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, -Math.PI/2, Math.PI/2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.restore();
      });

      // Draw rocket during phase 2 and 3 - comes from bottom
      if (scrollProgress > 0.2 && scrollProgress < 0.7) {
        const rocketYPos = scrollProgress < 0.45 ? currentRocketY : currentRocketMoveY;
        ctx.save();
        ctx.translate(centerX, centerY + rocketYPos); // Positive Y moves down from center
        drawRocket(ctx);
        ctx.restore();
      }

      // Draw Earth during phase 3 (Beyond launch) - comes from top
      if (scrollProgress > 0.45 && scrollProgress < 0.9) {
        ctx.save();
        ctx.translate(centerX, centerY + currentEarthY); // Negative Y moves up from center
        ctx.scale(currentEarthScale, currentEarthScale);
        drawEarth(ctx, 100); // Medium size Earth
        ctx.restore();
      }

      // Draw big Earth in center during phase 5 (Clay family)
      if (scrollProgress > 0.9) {
        ctx.save();
        ctx.translate(centerX, centerY + currentEarthCenterY);
        ctx.scale(currentEarthCenterScale, currentEarthCenterScale);
        drawEarth(ctx, 150); // Large center Earth
        ctx.restore();
      }

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
  };

  const drawEarth = (ctx, size = 100) => {
    const earthGradient = ctx.createRadialGradient(-size/3, -size/3, 0, 0, 0, size);
    earthGradient.addColorStop(0, '#4A90E2');
    earthGradient.addColorStop(0.3, '#357ABD');
    earthGradient.addColorStop(0.7, '#2E5984');
    earthGradient.addColorStop(1, '#1E3A5F');
    
    ctx.fillStyle = earthGradient;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Continents (scaled with Earth size)
    const continentScale = size / 100;
    ctx.fillStyle = '#228B22';
    
    ctx.beginPath();
    ctx.arc(-25 * continentScale, -15 * continentScale, 18 * continentScale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(30 * continentScale, 8 * continentScale, 12 * continentScale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(-8 * continentScale, 35 * continentScale, 10 * continentScale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(15 * continentScale, -30 * continentScale, 8 * continentScale, 0, Math.PI * 2);
    ctx.fill();
    
    // Atmosphere glow
    ctx.strokeStyle = 'rgba(135, 206, 235, 0.6)';
    ctx.lineWidth = 4 * continentScale;
    ctx.shadowColor = '#87CEEB';
    ctx.shadowBlur = 15 * continentScale;
    ctx.beginPath();
    ctx.arc(0, 0, size + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawRocket = (ctx) => {
    // Rocket body
    const rocketGradient = ctx.createLinearGradient(0, -25, 0, 25);
    rocketGradient.addColorStop(0, '#E8E8E8');
    rocketGradient.addColorStop(0.5, '#CCCCCC');
    rocketGradient.addColorStop(1, '#999999');
    
    ctx.fillStyle = rocketGradient;
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(-6, -8);
    ctx.lineTo(-6, 15);
    ctx.lineTo(6, 15);
    ctx.lineTo(6, -8);
    ctx.closePath();
    ctx.fill();
    
    // Rocket tip
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(-6, -8);
    ctx.lineTo(6, -8);
    ctx.closePath();
    ctx.fill();
    
    // Flame
    const flameGradient = ctx.createLinearGradient(0, 15, 0, 35);
    flameGradient.addColorStop(0, '#FF4500');
    flameGradient.addColorStop(0.5, '#FFD700');
    flameGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
    
    ctx.fillStyle = flameGradient;
    ctx.beginPath();
    ctx.moveTo(-4, 15);
    ctx.lineTo(0, 35);
    ctx.lineTo(4, 15);
    ctx.closePath();
    ctx.fill();
  };

  const initThreeJS = () => {
    if (!window.THREE || !mountRef.current) return;

    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield
    const starGeometry = new window.THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
    }
    
    starGeometry.setAttribute('position', new window.THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new window.THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new window.THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create sun with canvas texture
    const sunGeometry = new window.THREE.SphereGeometry(100, 32, 32);
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 512;
    const sunCtx = sunCanvas.getContext('2d');
    
    // Create sun gradient
    const sunGradient = sunCtx.createRadialGradient(256, 256, 50, 256, 256, 256);
    sunGradient.addColorStop(0, '#FFD700'); // Yellow center
    sunGradient.addColorStop(0.4, '#FF8C00'); // Orange
    sunGradient.addColorStop(0.7, '#FF4500'); // Red-orange
    sunGradient.addColorStop(0.85, '#9B59B6'); // Purple
    sunGradient.addColorStop(1, '#4A1A5A'); // Dark purple
    
    sunCtx.fillStyle = sunGradient;
    sunCtx.fillRect(0, 0, 512, 512);
    
    const sunTexture = new window.THREE.CanvasTexture(sunCanvas);
    const sunMaterial = new window.THREE.MeshBasicMaterial({ map: sunTexture });
    
    const sun = new window.THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, -200, -150);
    sun.scale.set(4, 0.6, 4); // Wide and flat
    scene.add(sun);

    // Create larger planets
    const planets = [];
    const planetData = [
      { size: 20, color: 0x8B4A9C, position: { x: -250, y: 50, z: -80 } },
      { size: 16, color: 0xB19CD9, position: { x: 200, y: -40, z: -60 } },
      { size: 14, color: 0x9B59B6, position: { x: -180, y: -100, z: -70 } },
      { size: 12, color: 0xE8BFE8, position: { x: 280, y: 80, z: -50 } }
    ];

    planetData.forEach((data, index) => {
      const geometry = new window.THREE.SphereGeometry(data.size, 16, 16);
      
      // Create planet canvas texture
      const planetCanvas = document.createElement('canvas');
      planetCanvas.width = 256;
      planetCanvas.height = 256;
      const planetCtx = planetCanvas.getContext('2d');
      
      // Create gradient for planet
      const gradient = planetCtx.createRadialGradient(64, 64, 0, 128, 128, 128);
      gradient.addColorStop(0, `#${data.color.toString(16).padStart(6, '0')}`);
      gradient.addColorStop(0.7, '#6B2C7A');
      gradient.addColorStop(1, '#4A1A5A');
      
      // Draw crescent shape
      planetCtx.fillStyle = gradient;
      planetCtx.beginPath();
      planetCtx.arc(128, 128, 128, -Math.PI/2, Math.PI/2);
      planetCtx.fill();
      
      const planetTexture = new window.THREE.CanvasTexture(planetCanvas);
      const material = new window.THREE.MeshBasicMaterial({ 
        map: planetTexture,
        transparent: true,
        opacity: 0.9
      });
      
      const planet = new window.THREE.Mesh(geometry, material);
      planet.position.set(data.position.x, data.position.y, data.position.z);
      planets.push({ mesh: planet, data: data });
      scene.add(planet);
    });

    // Create Earth
    const earthGeometry = new window.THREE.SphereGeometry(50, 32, 32);
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512;
    earthCanvas.height = 512;
    const earthCtx = earthCanvas.getContext('2d');
    
    // Draw Earth
    earthCtx.fillStyle = '#4A90E2';
    earthCtx.fillRect(0, 0, 512, 512);
    
    // Draw continents
    earthCtx.fillStyle = '#228B22';
    earthCtx.beginPath();
    earthCtx.arc(150, 150, 60, 0, Math.PI * 2);
    earthCtx.fill();
    earthCtx.beginPath();
    earthCtx.arc(350, 200, 40, 0, Math.PI * 2);
    earthCtx.fill();
    earthCtx.beginPath();
    earthCtx.arc(200, 350, 50, 0, Math.PI * 2);
    earthCtx.fill();
    
    const earthTexture = new window.THREE.CanvasTexture(earthCanvas);
    const earthMaterial = new window.THREE.MeshBasicMaterial({ map: earthTexture });
    
    const earth = new window.THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, -600, -80); // Start from top (lower Y value)
    scene.add(earth);

    // Create rocket
    const rocketGroup = new window.THREE.Group();
    
    // Rocket body
    const bodyGeometry = new window.THREE.CylinderGeometry(3, 4, 30, 8);
    const bodyMaterial = new window.THREE.MeshBasicMaterial({ color: 0xcccccc });
    const rocketBody = new window.THREE.Mesh(bodyGeometry, bodyMaterial);
    rocketGroup.add(rocketBody);
    
    // Rocket tip
    const tipGeometry = new window.THREE.ConeGeometry(3, 12, 8);
    const tipMaterial = new window.THREE.MeshBasicMaterial({ color: 0xff6b6b });
    const rocketTip = new window.THREE.Mesh(tipGeometry, tipMaterial);
    rocketTip.position.y = 21;
    rocketGroup.add(rocketTip);
    
    rocketGroup.position.set(0, 400, -50); // Start from bottom (higher Y value)
    scene.add(rocketGroup);

    camera.position.z = 150;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const scrollProgress = scrollYProgress.get();
      const currentPlanetRotation = planetRotation.get();
      const currentPlanetScale = planetScale.get();
      const currentSunRotation = sunRotation.get();
      const currentSunScale = sunScale.get();
      const currentRocketY = rocketY.get();
      const currentRocketMoveY = rocketMoveY.get();
      const currentEarthY = earthY.get();
      const currentEarthScale = earthScale.get();
      const currentEarthCenterY = earthCenterY.get();
      const currentEarthCenterScale = earthCenterScale.get();

      // Animate sun
      sun.rotation.z = currentSunRotation * Math.PI / 180;
      sun.scale.set(currentSunScale * 4, currentSunScale * 0.6, currentSunScale * 4);
      
      // Animate planets
      planets.forEach((planetObj, index) => {
        const planet = planetObj.mesh;
        const data = planetObj.data;
        
        // Orbital rotation
        const orbitAngle = (currentPlanetRotation + index * 60) * Math.PI / 180;
        planet.position.x = data.position.x + Math.cos(orbitAngle) * 60;
        planet.position.y = data.position.y + Math.sin(orbitAngle) * 40;
        
        // Scale planets
        planet.scale.setScalar(currentPlanetScale);
        
        // Rotate planets
        planet.rotation.y = currentPlanetRotation * Math.PI / 180;
      });

      // Animate rocket - comes from bottom
      if (scrollProgress > 0.2 && scrollProgress < 0.7) {
        const rocketYPos = scrollProgress < 0.45 ? currentRocketY : currentRocketMoveY;
        rocketGroup.position.y = 400 - (rocketYPos * 2); // Move up from bottom
        rocketGroup.visible = true;
      } else {
        rocketGroup.visible = false;
      }

      // Animate Earth - comes from top
      if (scrollProgress > 0.45 && scrollProgress < 0.9) {
        earth.position.y = -600 + (currentEarthY + 400) * 2; // Move down from top
        earth.scale.setScalar(currentEarthScale);
        earth.visible = true;
        earth.rotation.y += 0.01;
      } else if (scrollProgress > 0.9) {
        earth.position.y = currentEarthCenterY; // Center position
        earth.scale.setScalar(currentEarthCenterScale * 2);
        earth.visible = true;
        earth.rotation.y += 0.01;
      } else {
        earth.visible = false;
      }

      // Rotate stars
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  };

  // Animation sequence controller
  useEffect(() => {
    const sequence = [
      { delay: 0, phase: 1 },
      { delay: 1200, phase: 2 },
      { delay: 2000, phase: 3 }
    ];

    sequence.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });
  }, []);

  const missionControlLetters = "MISSION CONTROL".split("");
  
  const letterVariants = {
    hidden: { 
      scale: 2.5,
      opacity: 0,
      y: 30,
      rotateX: -45
    },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const subtitleVariants = {
    hidden: {
      scale: 1.8,
      opacity: 0,
      y: -30,
      filter: "blur(10px)"
    },
    fixed: {
      scale: 1.8,
      opacity: 0.9,
      y: -30,
      filter: "blur(2px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    normal: {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  return (
    <section className="hero-extended" ref={containerRef}>
      <div className="hero-visual">
        <motion.div 
          className="hero-visual-inner"
          style={{ opacity: heroVisibility }}
        >
          <div ref={mountRef} className="threejs-container" />
        </motion.div>
      </div>
      
      <div className="container">
        {/* Phase 1: Initial Title */}
        <motion.div 
          className="hero-content phase-1"
          style={{ 
            opacity: useTransform([phase1Opacity, heroVisibility], ([phase, hero]) => phase * hero)
          }}
        >
          <div className="hero-title-section">
            <div className="hero-title-main">
              {missionControlLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="title-letter"
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={animationPhase >= 1 ? "visible" : "hidden"}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
            
            <motion.h2 
              className="hero-subtitle"
              variants={subtitleVariants}
              initial="hidden"
              animate={
                animationPhase >= 3 ? "normal" : 
                animationPhase >= 2 ? "fixed" : "hidden"
              }
            >
              THE HUMAN CREATIVE COMPANY
              <br />
              <span className="gradient-text">FOR THE AI AGE</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Phase 2: First Slide */}
        <motion.div 
          className="hero-content phase-2"
          style={{ 
            opacity: useTransform([phase2Opacity, heroVisibility], ([phase, hero]) => phase * hero)
          }}
        >
          <div className="slide-content">
            <p className="slide-text">
              Mission Control partners with startups to create brands and experiences 
              that turn bold ideas into <span className="accent-text">the next big thing.</span>
            </p>
          </div>
        </motion.div>

        {/* Phase 3: Second Slide */}
        <motion.div 
          className="hero-content phase-3"
          style={{ 
            opacity: useTransform([phase3Opacity, heroVisibility], ([phase, hero]) => phase * hero)
          }}
        >
          <div className="slide-content">
            <p className="slide-text">
              Beyond launch, we offer ongoing support and venture partnerships to{' '}
              <span className="accent-text">help you scale.</span>
            </p>
          </div>
        </motion.div>

        {/* Phase 4: Final Text */}
        <motion.div 
          className="hero-content phase-4"
          style={{ 
            opacity: useTransform([phase4Opacity, heroVisibility], ([phase, hero]) => phase * hero)
          }}
        >
          <div className="final-content">
            <h2 className="final-title">
              WORLD-CLASS BRANDING AND DESIGN<br />
              CRAFTED BY TOP <span className="gradient-text">TALENT</span>, SUPERCHARGED<br />
              BY AI
            </h2>
          </div>
        </motion.div>

        {/* Phase 5: Clay Family Text */}
        <motion.div 
          className="hero-content phase-5"
          style={{ 
            opacity: useTransform([phase5Opacity, heroVisibility], ([phase, hero]) => phase * hero)
          }}
        >
          <div className="clay-content">
            <p className="clay-text">
              Proudly part of the <span className="clay-highlight">Clay</span> family, the agency<br />
              behind brands like Slack, Discover, Snapchat,<br />
              Meta, and Coinbase.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;