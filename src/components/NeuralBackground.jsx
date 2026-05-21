import { useEffect, useRef } from 'react';

const THEME_CONFIG = {
  tron: {
    particleFill: 'rgba(0, 242, 254, 0.4)',
    particleShadow: '#00f2fe',
    linkColor: (opacity) => `rgba(0, 242, 254, ${opacity})`,
    mouseColor: (opacity) => `rgba(0, 245, 160, ${opacity})`
  },
  'liquid-glass': {
    particleFill: 'rgba(244, 249, 255, 0.46)',
    particleShadow: 'rgba(160, 208, 255, 0.92)',
    linkColor: (opacity) => `rgba(182, 220, 255, ${opacity * 0.95})`,
    mouseColor: (opacity) => `rgba(255, 255, 255, ${opacity * 0.82})`
  },
  'google-material': {
    particleFill: 'rgba(124, 168, 255, 0.34)',
    particleShadow: 'rgba(110, 157, 255, 0.7)',
    linkColor: (opacity) => `rgba(124, 168, 255, ${opacity * 0.78})`,
    mouseColor: (opacity) => `rgba(90, 193, 167, ${opacity * 0.74})`
  },
  'microsoft-fluent': {
    particleFill: 'rgba(143, 198, 255, 0.34)',
    particleShadow: 'rgba(136, 184, 255, 0.72)',
    linkColor: (opacity) => `rgba(160, 204, 255, ${opacity * 0.82})`,
    mouseColor: (opacity) => `rgba(118, 211, 255, ${opacity * 0.72})`
  }
};

const NeuralBackground = ({ theme = 'tron' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const palette = THEME_CONFIG[theme] ?? THEME_CONFIG.tron;
    let animationFrameId;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    // Resize handler
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Node particle system configuration
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 8500), 110);
    const particles = [];
    const mouse = { x: null, y: null, radius: 180 };

    class Particle {
      constructor() {
        this.x = Math.random() * viewportWidth;
        this.y = Math.random() * viewportHeight;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8 + 0.9;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > viewportWidth) this.vx = -this.vx;
        if (this.y < 0 || this.y > viewportHeight) this.vy = -this.vy;

        // Mouse hover interaction (gentle attraction/repulsion)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            // Gently push away from mouse
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 0.8;
            this.y -= (dy / distance) * force * 0.8;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = palette.particleFill;
        ctx.shadowBlur = 6;
        ctx.shadowColor = palette.particleShadow;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line drawing
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse movement listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            // Calculate line opacity based on distance
            const opacity = (120 - distance) / 120 * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = palette.linkColor(opacity);
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw connections to mouse if active
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const opacity = (mouse.radius - distance) / mouse.radius * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = palette.mouseColor(opacity);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default NeuralBackground;
