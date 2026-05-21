import React, { useEffect, useRef, useState } from 'react';
import profPic from '../assets/prof_pic_color.jpg';

export default function ProfileSplat({
  scanCoords,
  setScanCoords,
  scanStatus,
  setScanStatus,
  widgetSpinRate,
  setWidgetSpinRate,
  widgetClicks,
  setWidgetClicks
}) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // 3D rotation angles (radians)
  const rotationRef = useRef({ x: -0.15, y: -0.45 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const activeFocalPlaneRef = useRef(0); // depth scan offset
  const particlesRef = useRef([]);

  // Load image, downsample to create point-cloud particles
  useEffect(() => {
    const img = new Image();
    img.src = profPic;
    img.crossOrigin = 'anonymous'; // prevent canvas taint issues
    img.onload = () => {
      // Create offscreen canvas for downsampling
      const offscreen = document.createElement('canvas');
      const sampleSize = 65; // 65x65 = 4,225 particles - optimal balance for density and 60fps
      offscreen.width = sampleSize;
      offscreen.height = sampleSize;
      const ctx = offscreen.getContext('2d');
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      
      const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const data = imgData.data;
      const particles = [];
      
      // Map 2D pixels to 3D Gaussian Splat particles with depth extraction
      for (let y = 0; y < sampleSize; y++) {
        for (let x = 0; x < sampleSize; x++) {
          const idx = (y * sampleSize + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          
          if (a > 50) { // filter out background transparency
            // Calculate grayscale/brightness for face relief depth extraction
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            
            // Normalize coordinates from -100 to 100
            const px = ((x / sampleSize) - 0.5) * 180;
            const py = ((y / sampleSize) - 0.5) * 180;
            
            // Generate 3D head relief structure: nose/cheeks pop forward, background recedes
            // Also subtract spherical shape to model face curvature
            const distFromCenter = Math.sqrt(px * px + py * py);
            const baseSphere = Math.max(0, 1 - (distFromCenter / 110));
            const sphereDepth = Math.sqrt(Math.max(0, 80 * 80 - px * px - py * py)) * 0.45;
            
            // Depth Z combines pixel brightness and spherical head model
            const pz = (brightness / 255) * 45 + sphereDepth - 40;
            
            particles.push({
              x: px,
              y: py,
              z: pz,
              r,
              g,
              b,
              originalBrightness: brightness
            });
          }
        }
      }
      particlesRef.current = particles;
      setLoaded(true);
    };
  }, []);

  // Main 3D render loop
  useEffect(() => {
    if (!loaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 1;
      
      // Auto-rotation around Y-axis when not actively dragging
      if (!isDragging) {
        rotationRef.current.y += 0.006 * (15 / widgetSpinRate); // adjusts spin based on calibration status
      }

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw 3D Camera Frustum Box & Coordinate Crosshairs in background
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      // 5x5 digital telemetry dots grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let gx = 1; gx <= 4; gx++) {
        for (let gy = 1; gy <= 4; gy++) {
          ctx.fillRect(gx * 56, gy * 56, 1.5, 1.5);
        }
      }

      // Dynamic Focal Plane scanner sweep (forward/backward depth mapping)
      // Sweeps between Z = -60 and Z = 60
      const sweepRate = widgetSpinRate === 2 ? 0.06 : 0.015;
      const focalPlaneDepth = Math.sin(time * sweepRate) * 55;
      activeFocalPlaneRef.current = focalPlaneDepth;

      // Project particles to 3D camera coordinates & calculate rotated positions
      const projected = [];
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const particles = particlesRef.current;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        
        // 3D rotation formulas
        // Y-axis rotation (Yaw)
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        
        // X-axis rotation (Pitch)
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX; // projected depth

        // Perspective camera projection
        const focalLength = 300;
        const scale = focalLength / (focalLength + z2);
        const screenX = canvas.width / 2 + x1 * scale * 1.15;
        const screenY = canvas.height / 2 + y2 * scale * 1.15;

        // Dynamic Focal Plane check (intersection analysis)
        // Highlights particles near the scanning plane (z2 close to focalPlaneDepth)
        const depthDiff = Math.abs(z2 - focalPlaneDepth);
        const isFocalSlice = depthDiff < 5;
        
        projected.push({
          x: screenX,
          y: screenY,
          z: z2, // keep for Z-buffer depth sorting
          scale,
          color: p,
          isFocalSlice,
          depthDiff
        });
      }

      // Painter's Algorithm: Sort particles by depth (Z-buffer) from back-to-front
      // This is crucial for translucent alpha-blending
      projected.sort((a, b) => b.z - a.z);

      // Render Projected 3D Gaussian Splats
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        // Skip drawing if outside canvas boundaries to save operations
        if (p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) continue;

        // Base Gaussian size based on perspective scale
        const baseRadius = 1.65 * p.scale;
        
        // Anisotropic scaling effect based on depth slice
        let rSize = baseRadius;
        let fillStyle = '';
        
        if (p.isFocalSlice) {
          // Intense emerald neon glow for particles intersected by the focal plane
          const intensity = 1 - (p.depthDiff / 5);
          fillStyle = `rgba(0, 245, 160, ${0.4 + intensity * 0.6})`;
          rSize *= (1 + intensity * 0.8); // stretch Gaussian splat size on focus
        } else {
          // Normal profile rendering using sampled vibrant color coordinates
          const color = p.color;
          fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.75 * p.scale})`;
        }

        // Draw soft Gaussian Ellipse
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        // Slightly oblong ellipses model 3D Gaussian Splat primitives beautifully
        ctx.ellipse(p.x, p.y, rSize * 1.25, rSize * 0.85, rx + ry, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw the Holographic Focal Scanner laser slice (Translucent sliding plane grid)
      // Visualizes active camera focal depth sweeps slicing through head space
      const planeY = canvas.height / 2 + (focalPlaneDepth * Math.cos(rx)) * 1.15;
      
      if (planeY > 40 && planeY < canvas.height - 40) {
        ctx.beginPath();
        ctx.strokeStyle = widgetSpinRate === 2 ? 'rgba(0, 245, 160, 0.45)' : 'rgba(14, 165, 233, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(40, planeY);
        ctx.lineTo(canvas.width - 40, planeY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Glowing laser sweep focal marker pill
        ctx.fillStyle = widgetSpinRate === 2 ? 'rgba(0, 245, 160, 0.8)' : 'rgba(14, 165, 233, 0.5)';
        ctx.beginPath();
        ctx.arc(40, planeY, 3, 0, 2 * Math.PI);
        ctx.arc(canvas.width - 40, planeY, 3, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw standard targeting grid lines (subtle telemetry marks)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 20);
      ctx.lineTo(canvas.width / 2, canvas.height - 20);
      ctx.moveTo(20, canvas.height / 2);
      ctx.lineTo(canvas.width - 20, canvas.height / 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, isDragging, widgetSpinRate]);

  // Drag interaction to rotate the 3D head splat
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setScanStatus("MANUAL_ROTATE_ACTIVE");
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      // Update pitch and yaw based on pixel displacement
      rotationRef.current.y += dx * 0.007;
      rotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.x + dy * 0.007));
      
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
    
    // Generate real-time telemetry coordinates linked to mouse positions on spline
    const relativeX = ((cursorX / rect.width) * 200).toFixed(2);
    const relativeY = ((cursorY / rect.height) * 200).toFixed(2);
    // Depth links dynamically to active focal plane plus cursor displacement
    const relativeZ = (activeFocalPlaneRef.current + (cursorX % 30)).toFixed(2);

    setScanCoords({ x: relativeX, y: relativeY, z: relativeZ });
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setScanStatus("SYSTEM READY");
    }
  };

  const handleSplatClick = (e) => {
    // Only trigger if click wasn't the end of a drag
    if (isDragging) return;

    // Increment widget click count
    setWidgetClicks(prev => prev + 1);
    setWidgetSpinRate(2); // rapid sweep spin rate
    setScanStatus("RE-CALIBRATING FOCAL PLANES...");
    
    // Rotate head rapidly on recalibration
    let elapsed = 0;
    const spinTimer = setInterval(() => {
      elapsed += 50;
      rotationRef.current.y += 0.25;
      if (elapsed >= 1500) {
        clearInterval(spinTimer);
        setWidgetSpinRate(15); // back to slow nominal spin
        setScanStatus("CALIBRATION COMPLETE (99.98%)");
      }
    }, 50);
  };

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 6, 8, 0.4)'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onClick={handleSplatClick}
    >
      {!loaded ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'var(--primary-cyan)'
        }}>
          <div className="pulse-glow" style={{ fontSize: '0.85rem' }}>INITIALIZING GAUSSIAN DATA...</div>
          <div style={{ width: '80px', height: '2px', background: 'rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', height: '100%', width: '30%', background: 'var(--primary-cyan)', animation: 'meshWave 1s infinite linear' }} />
          </div>
        </div>
      ) : (
        <canvas 
          ref={canvasRef} 
          width="280" 
          height="280" 
          style={{ 
            width: '280px', 
            height: '280px', 
            display: 'block' 
          }} 
        />
      )}

      {/* Holographic Calibration overlays */}
      {loaded && (
        <>
          {/* Subtle grid corner indicators */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', width: '8px', height: '8px', borderTop: '1px solid rgba(0, 242, 254, 0.3)', borderLeft: '1px solid rgba(0, 242, 254, 0.3)' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', borderTop: '1px solid rgba(0, 242, 254, 0.3)', borderRight: '1px solid rgba(0, 242, 254, 0.3)' }} />
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '8px', height: '8px', borderBottom: '1px solid rgba(0, 242, 254, 0.3)', borderLeft: '1px solid rgba(0, 242, 254, 0.3)' }} />
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '8px', height: '8px', borderBottom: '1px solid rgba(0, 242, 254, 0.3)', borderRight: '1px solid rgba(0, 242, 254, 0.3)' }} />
          
          {/* Draggable indicator tag */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '18px',
            fontSize: '0.55rem',
            fontFamily: 'monospace',
            color: 'rgba(255, 255, 255, 0.25)',
            letterSpacing: '0.05em',
            pointerEvents: 'none'
          }}>
            [DRAG_TO_ROTATE_3D]
          </div>

          <div style={{
            position: 'absolute',
            bottom: '14px',
            fontSize: '0.62rem',
            fontFamily: 'monospace',
            color: widgetSpinRate === 2 ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            letterSpacing: '0.08em',
            background: 'rgba(15, 17, 24, 0.85)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: widgetSpinRate === 2 ? '0 0 10px rgba(16, 185, 129, 0.15)' : 'none',
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            {widgetSpinRate === 2 ? "CALIBRATING PLANE SWEEP..." : "RE-CALIBRATE FOCAL PLANES"}
          </div>
        </>
      )}
    </div>
  );
}
