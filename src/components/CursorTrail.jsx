import { useEffect, useRef } from 'react';

const MAX_POINTS = 22;
const POINT_LIFE = 360;

const THEME_TRAIL = {
  tron: {
    primary: (alpha) => `rgba(0, 228, 255, ${alpha * 0.88})`,
    primaryShadow: 'rgba(0, 228, 255, 0.95)',
    secondary: (alpha) => `rgba(255, 61, 242, ${alpha * 0.34})`,
    secondaryShadow: 'rgba(255, 61, 242, 0.72)'
  },
  'liquid-glass': {
    primary: (alpha) => `rgba(224, 242, 255, ${alpha * 0.92})`,
    primaryShadow: 'rgba(173, 216, 255, 0.9)',
    secondary: (alpha) => `rgba(176, 205, 255, ${alpha * 0.42})`,
    secondaryShadow: 'rgba(200, 225, 255, 0.74)'
  },
  'google-material': {
    primary: (alpha) => `rgba(120, 168, 255, ${alpha * 0.82})`,
    primaryShadow: 'rgba(102, 150, 255, 0.78)',
    secondary: (alpha) => `rgba(88, 201, 175, ${alpha * 0.34})`,
    secondaryShadow: 'rgba(88, 201, 175, 0.62)'
  },
  'microsoft-fluent': {
    primary: (alpha) => `rgba(157, 208, 255, ${alpha * 0.82})`,
    primaryShadow: 'rgba(136, 184, 255, 0.78)',
    secondary: (alpha) => `rgba(146, 226, 255, ${alpha * 0.28})`,
    secondaryShadow: 'rgba(146, 226, 255, 0.56)'
  }
};

function CursorTrail({ theme = 'tron' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (theme === 'liquid-glass') {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const palette = THEME_TRAIL[theme] ?? THEME_TRAIL.tron;
    const points = [];
    let animationFrame = 0;
    let active = false;

    if (!canvas || !context || window.matchMedia('(pointer: coarse)').matches) {
      return undefined;
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rememberPoint = (event) => {
      active = true;
      points.push({ x: event.clientX, y: event.clientY, time: performance.now() });

      if (points.length > MAX_POINTS) {
        points.shift();
      }
    };

    const clearTrail = () => {
      active = false;
      points.length = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const drawTrail = (now) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      while (points.length > 0 && now - points[0].time > POINT_LIFE) {
        points.shift();
      }

      if (active && points.length > 1) {
        context.lineJoin = 'bevel';
        context.lineCap = 'square';

        for (let index = 1; index < points.length; index += 1) {
          const point = points[index];
          const previous = points[index - 1];
          const age = Math.min((now - point.time) / POINT_LIFE, 1);
          const alpha = 1 - age;
          const width = 1 + alpha * 2.8;

          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(point.x, previous.y);
          context.lineTo(point.x, point.y);
          context.strokeStyle = palette.primary(alpha);
          context.lineWidth = width;
          context.shadowColor = palette.primaryShadow;
          context.shadowBlur = 18 * alpha;
          context.stroke();

          context.strokeStyle = palette.secondary(alpha);
          context.lineWidth = Math.max(width * 0.38, 0.8);
          context.shadowColor = palette.secondaryShadow;
          context.shadowBlur = 10 * alpha;
          context.stroke();
        }
      }

      animationFrame = window.requestAnimationFrame(drawTrail);
    };

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(drawTrail);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', rememberPoint);
    window.addEventListener('pointerleave', clearTrail);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', rememberPoint);
      window.removeEventListener('pointerleave', clearTrail);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        pointerEvents: 'none'
      }}
    />
  );
}

export default CursorTrail;
