export default function ProjectVisual({ category, active, id, style }) {
  // Category-specific high-fidelity SVG graphics with CSS animations
  const renderVisualContent = () => {
    switch (category) {
      case "3D & Robotics":
        return (
          <svg className="w-full h-full" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-3d-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={active ? "#00f5a0" : "#00f2fe"} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4facfe" stopOpacity="0.2" />
              </linearGradient>
              <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Grid base */}
            <rect width="340" height="120" fill="url(#grid-pattern)" />

            {/* Simulated 3D Mesh Wireframe */}
            <g opacity="0.6">
              {/* Vertical wireframe loops */}
              <path 
                d="M 50 60 Q 100 20 170 60 T 290 60" 
                stroke={`url(#grad-3d-${id})`} 
                strokeWidth="1.5" 
                fill="none" 
                style={{
                  animation: active ? 'meshWave 1.5s infinite ease-in-out' : 'meshWave 4s infinite ease-in-out'
                }}
              />
              <path 
                d="M 50 75 Q 100 35 170 75 T 290 75" 
                stroke={`url(#grad-3d-${id})`} 
                strokeWidth="1" 
                fill="none" 
                style={{
                  animation: active ? 'meshWave 1.2s infinite ease-in-out' : 'meshWave 3.5s infinite ease-in-out',
                  animationDelay: '0.5s'
                }}
              />
              <path 
                d="M 50 45 Q 100 5 170 45 T 290 45" 
                stroke={`url(#grad-3d-${id})`} 
                strokeWidth="1" 
                fill="none" 
                style={{
                  animation: active ? 'meshWave 1.8s infinite ease-in-out' : 'meshWave 4.5s infinite ease-in-out',
                  animationDelay: '0.2s'
                }}
              />
              
              {/* Grid Connectors */}
              <line x1="85" y1="42" x2="85" y2="78" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 2" />
              <line x1="135" y1="35" x2="135" y2="85" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 2" />
              <line x1="185" y1="35" x2="185" y2="85" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 2" />
              <line x1="235" y1="42" x2="235" y2="78" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 2" />
            </g>

            {/* Glowing 3D Point Nodes */}
            <g>
              <circle cx="85" cy="52" r="3" fill={active ? "#00f5a0" : "#00f2fe"} className={active ? 'pulse-node-active' : 'pulse-node'} />
              <circle cx="135" cy="45" r="4.5" fill={active ? "#00f5a0" : "#00f2fe"} className={active ? 'pulse-node-active' : 'pulse-node'} style={{ animationDelay: '0.4s' }} />
              <circle cx="185" cy="58" r="3.5" fill={active ? "#00f5a0" : "#4facfe"} className={active ? 'pulse-node-active' : 'pulse-node'} style={{ animationDelay: '0.8s' }} />
              <circle cx="235" cy="48" r="3" fill={active ? "#00f5a0" : "#00f2fe"} className={active ? 'pulse-node-active' : 'pulse-node'} style={{ animationDelay: '1.2s' }} />
            </g>

            {/* Scanning Laser Beam */}
            <line 
              x1="0" 
              y1="10" 
              x2="340" 
              y2="10" 
              stroke={active ? "rgba(0, 245, 160, 0.4)" : "rgba(0, 242, 254, 0.2)"} 
              strokeWidth="2" 
              style={{
                animation: active ? 'laserScan 1s infinite linear' : 'laserScan 3s infinite linear',
                boxShadow: '0 0 8px var(--primary-cyan)'
              }}
            />
          </svg>
        );

      case "Medical Imaging":
        return (
          <svg className="w-full h-full" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-img-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={active ? "#00f5a0" : "#00f2fe"} stopOpacity="0.5" />
                <stop offset="100%" stopColor="#12141c" stopOpacity="0" />
              </linearGradient>
              <pattern id="grid-pattern-img" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Grid base */}
            <rect width="340" height="120" fill="url(#grid-pattern-img)" />

            {/* MRI/fMRI Pulse Signal Waveform */}
            <path
              d={active 
                ? "M 10 60 L 50 60 L 65 30 L 80 90 L 95 60 L 135 60 L 145 15 L 155 105 L 165 60 L 210 60 L 220 40 L 230 80 L 240 60 L 330 60"
                : "M 10 60 L 60 60 L 70 45 L 80 75 L 90 60 L 140 60 L 150 25 L 160 95 L 170 60 L 220 60 L 230 50 L 240 70 L 250 60 L 330 60"
              }
              stroke={active ? "#00f5a0" : "#00f2fe"}
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              style={{
                strokeDasharray: '400',
                strokeDashoffset: '0',
                animation: active ? 'signalDraw 1.5s infinite linear' : 'signalDraw 4s infinite linear'
              }}
            />

            {/* Area gradient under waveform */}
            <path
              d={active 
                ? "M 10 60 L 50 60 L 65 30 L 80 90 L 95 60 L 135 60 L 145 15 L 155 105 L 165 60 L 210 60 L 220 40 L 230 80 L 240 60 L 330 60 L 330 120 L 10 120 Z"
                : "M 10 60 L 60 60 L 70 45 L 80 75 L 90 60 L 140 60 L 150 25 L 160 95 L 170 60 L 220 60 L 230 50 L 240 70 L 250 60 L 330 60 L 330 120 L 10 120 Z"
              }
              fill={`url(#grad-img-${id})`}
              opacity="0.15"
            />

            {/* Clinical Target Scope Reticle */}
            <g transform="translate(150, 60)" opacity="0.8">
              <circle cx="0" cy="0" r="28" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="16" stroke={active ? "#00f5a0" : "#4facfe"} strokeWidth="0.75" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
              <rect x="-4" y="-4" width="8" height="8" stroke={active ? "#00f5a0" : "#00f2fe"} strokeWidth="1" fill="none" className={active ? 'pulse-reticle-active' : ''} />
            </g>

            {/* Floating scanner metrics */}
            <text x="15" y="25" fill="rgba(255, 255, 255, 0.2)" fontSize="7" fontFamily="monospace" letterSpacing="1">
              SYS_REF: MRI_S3T
            </text>
            <text x="270" y="25" fill={active ? "#00f5a0" : "rgba(255, 255, 255, 0.2)"} fontSize="7" fontFamily="monospace" letterSpacing="1">
              {active ? "SAMPLING..." : "STANDBY"}
            </text>
          </svg>
        );

      case "Cancer & Pathology":
        return (
          <svg className="w-full h-full" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern-path" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* Grid base */}
            <rect width="340" height="120" fill="url(#grid-pattern-path)" />

            {/* Microscopic Tissue / Cytology Grid Simulation */}
            <g opacity="0.4">
              <circle cx="50" cy="40" r="12" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
              <circle cx="50" cy="40" r="4" fill="rgba(79, 172, 254, 0.15)" />

              <circle cx="110" cy="80" r="16" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
              <circle cx="110" cy="80" r="5" fill="rgba(79, 172, 254, 0.15)" />

              <circle cx="280" cy="45" r="14" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
              <circle cx="280" cy="45" r="4.5" fill="rgba(79, 172, 254, 0.15)" />

              {/* Multi-nucleated complex cell */}
              <path d="M 180,35 Q 200,20 220,35 Q 235,55 210,75 Q 185,75 170,55 Z" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />
              <circle cx="192" cy="45" r="3.5" fill="rgba(0, 242, 254, 0.12)" />
              <circle cx="208" cy="50" r="3.5" fill="rgba(0, 242, 254, 0.12)" />
            </g>

            {/* Target Highlight Scanning Box */}
            <g transform="translate(160, 20)">
              {/* Corner brackets */}
              <path d="M 0,15 L 0,0 L 15,0" stroke={active ? "#00f5a0" : "#00f2fe"} strokeWidth="1.5" fill="none" />
              <path d="M 65,0 L 80,0 L 80,15" stroke={active ? "#00f5a0" : "#00f2fe"} strokeWidth="1.5" fill="none" />
              <path d="M 80,45 L 80,60 L 65,60" stroke={active ? "#00f5a0" : "#00f2fe"} strokeWidth="1.5" fill="none" />
              <path d="M 15,60 L 0,60 L 0,45" stroke={active ? "#00f5a0" : "#00f2fe"} strokeWidth="1.5" fill="none" />

              {/* Bounding fill */}
              <rect x="0" y="0" width="80" height="60" fill={active ? "rgba(0, 245, 160, 0.04)" : "rgba(0, 242, 254, 0.02)"} />

              {/* Concentric diagnostic lines */}
              <circle cx="40" cy="30" r="22" stroke={active ? "#00f5a0" : "rgba(255, 255, 255, 0.06)"} strokeWidth="0.5" strokeDasharray="2 2" className={active ? 'pulse-scope-active' : ''} />
              
              {/* Real-time attention focus crosshairs */}
              <line x1="40" y1="5" x2="40" y2="55" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
              <line x1="10" y1="30" x2="70" y2="30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
              <circle cx="40" cy="30" r="2" fill={active ? "#00f5a0" : "#00f2fe"} />
            </g>

            {/* Glowing heatmap nodes overlay (attention vectors) */}
            <g opacity={active ? "0.85" : "0.35"}>
              <circle cx="185" cy="45" r="8" fill="rgba(0, 245, 160, 0.15)" filter="blur(2px)" />
              <circle cx="215" cy="55" r="10" fill="rgba(0, 242, 254, 0.15)" filter="blur(2px)" />
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '120px',
      background: 'rgba(7, 8, 12, 0.75)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}>
      {renderVisualContent()}

      {/* Cyberpunk corner brackets on visual card cover */}
      <div style={{ position: 'absolute', top: '4px', left: '4px', width: '4px', height: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '4px', height: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '4px', height: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '4px', height: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }} />
    </div>
  );
}
