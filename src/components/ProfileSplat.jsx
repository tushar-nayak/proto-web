import { useRef, useState } from 'react';
import profPic from '../assets/prof_pic_color.jpg';

const centerPointer = {
  x: 140,
  y: 140,
  nx: 0,
  ny: 0
};

export default function ProfileSplat({
  setScanCoords,
  setScanStatus,
  setWidgetClicks
}) {
  const stageRef = useRef(null);
  const [pointer, setPointer] = useState(centerPointer);
  const [hovered, setHovered] = useState(false);
  const [depthLocked, setDepthLocked] = useState(false);

  const active = hovered || depthLocked;
  const tiltX = pointer.ny * -8;
  const tiltY = pointer.nx * 10;
  const disparity = depthLocked ? 7 : 4 + Math.abs(pointer.nx) * 2;
  const lensSize = depthLocked ? 156 : 128;
  const lensClip = `circle(${lensSize / 2}px at ${pointer.x}px ${pointer.y}px)`;

  const updatePointer = (event) => {
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, event.clientX - rect.left));
    const y = Math.min(rect.height, Math.max(0, event.clientY - rect.top));
    const nx = ((x / rect.width) - 0.5) * 2;
    const ny = ((y / rect.height) - 0.5) * 2;

    setPointer({ x, y, nx, ny });
    setScanCoords({
      x: ((x / rect.width) * 200).toFixed(2),
      y: ((y / rect.height) * 200).toFixed(2),
      z: ((1 - Math.hypot(nx, ny) / 1.45) * 70).toFixed(2)
    });
  };

  const handlePointerEnter = (event) => {
    setHovered(true);
    setScanStatus(depthLocked ? 'DEPTH LOCK ACTIVE' : 'STEREO DEPTH VIEW');
    updatePointer(event);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setPointer(centerPointer);
    setScanStatus(depthLocked ? 'DEPTH LOCK ACTIVE' : 'SYSTEM READY');
  };

  const handleClick = () => {
    const nextLocked = !depthLocked;
    setDepthLocked(nextLocked);
    setWidgetClicks(prev => prev + 1);
    setScanStatus(nextLocked ? 'DEPTH LOCK ACTIVE' : (hovered ? 'STEREO DEPTH VIEW' : 'SYSTEM READY'));
  };

  return (
    <div
      ref={stageRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={updatePointer}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(5, 6, 8, 0.48)',
        cursor: 'crosshair',
        touchAction: 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '22px',
          transform: `perspective(760px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${pointer.nx * 5}px, ${pointer.ny * 5}px, 0)`,
          transformStyle: 'preserve-3d',
          transition: hovered ? 'transform 90ms ease-out' : 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: active
            ? '0 18px 42px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(0, 242, 254, 0.22)'
            : '0 18px 36px rgba(0, 0, 0, 0.36)'
        }}
      >
        <img
          src={profPic}
          alt="Tushar Nayak"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            transform: 'translateZ(12px) scale(1.02)',
            filter: active ? 'contrast(1.03) saturate(1.04)' : 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: active ? 1 : 0,
            transition: 'opacity 180ms ease'
          }}
        >
          <img
            src={profPic}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              clipPath: lensClip,
              transform: `translate3d(${-disparity}px, ${pointer.ny * -2}px, 28px) scale(1.02)`,
              mixBlendMode: 'screen',
              opacity: 0.6,
              filter: 'sepia(1) saturate(7) hue-rotate(146deg) brightness(1.1)'
            }}
          />
          <img
            src={profPic}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              clipPath: lensClip,
              transform: `translate3d(${disparity}px, ${pointer.ny * 2}px, 30px) scale(1.02)`,
              mixBlendMode: 'screen',
              opacity: 0.48,
              filter: 'sepia(1) saturate(8) hue-rotate(72deg) brightness(1.04)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: lensClip,
              backgroundImage: [
                'linear-gradient(rgba(0, 245, 160, 0.18) 1px, transparent 1px)',
                'linear-gradient(90deg, rgba(0, 242, 254, 0.14) 1px, transparent 1px)'
              ].join(', '),
              backgroundSize: '18px 18px',
              transform: `translate3d(${pointer.nx * 3}px, ${pointer.ny * 3}px, 34px)`
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${pointer.x - lensSize / 2}px`,
              top: `${pointer.y - lensSize / 2}px`,
              border: '1px solid rgba(0, 245, 160, 0.72)',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 24px rgba(0, 242, 254, 0.12), 0 0 20px rgba(0, 245, 160, 0.18)',
              transform: 'translateZ(36px)'
            }}
          />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '12px', left: '12px', width: '8px', height: '8px', borderTop: '1px solid rgba(0, 242, 254, 0.3)', borderLeft: '1px solid rgba(0, 242, 254, 0.3)' }} />
      <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', borderTop: '1px solid rgba(0, 242, 254, 0.3)', borderRight: '1px solid rgba(0, 242, 254, 0.3)' }} />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '8px', height: '8px', borderBottom: '1px solid rgba(0, 242, 254, 0.3)', borderLeft: '1px solid rgba(0, 242, 254, 0.3)' }} />
      <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '8px', height: '8px', borderBottom: '1px solid rgba(0, 242, 254, 0.3)', borderRight: '1px solid rgba(0, 242, 254, 0.3)' }} />
    </div>
  );
}
