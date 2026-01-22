import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollBackground.css';

const ScrollBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGeometricShapes = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw rotating hexagons
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * (0.3 + i * 0.1));
        
        const radius = 50 + i * 40;
        const sides = 6;
        
        ctx.strokeStyle = `rgba(78, 205, 196, ${0.15 - i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let j = 0; j <= sides; j++) {
          const angle = (j / sides) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.restore();
      }

      // Draw connecting lines
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * 0.2 + i * (Math.PI * 2 / 3));
        
        ctx.strokeStyle = `rgba(255, 107, 107, ${0.1 + Math.sin(time * 2 + i) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 0);
        ctx.stroke();
        
        // Add small circles at the end
        ctx.fillStyle = `rgba(69, 183, 209, ${0.3 + Math.sin(time * 3 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(200, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      // Floating triangles
      for (let i = 0; i < 8; i++) {
        const x = centerX + Math.sin(time * 0.5 + i) * 300;
        const y = centerY + Math.cos(time * 0.3 + i) * 200;
        const size = 10 + Math.sin(time * 2 + i) * 5;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time + i);
        
        ctx.fillStyle = `rgba(78, 205, 196, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }

      animationId = requestAnimationFrame(drawGeometricShapes);
    };

    resize();
    drawGeometricShapes();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="scroll-background" ref={containerRef}>
      <canvas ref={canvasRef} className="background-canvas" />
      
      <motion.div 
        className="rotating-element"
        style={{ 
          rotate,
          scale,
          opacity
        }}
      >
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="geometric-shape shape-3"></div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + (i * 6)}%`,
            top: `${20 + Math.sin(i) * 60}%`
          }}
        />
      ))}
    </div>
  );
};

export default ScrollBackground;