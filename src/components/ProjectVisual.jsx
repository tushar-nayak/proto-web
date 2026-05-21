const VISUAL_TYPES = {
  1: 'vessel-registration',
  19: 'vessel-reconstruction',
  18: 'cardiac-gaussian',
  4: 'cardiac-implicit',
  16: 'surgical-tracking',
  13: 'endo-splat',
  2: 'tumor-forecast',
  10: 'diffusion-solver',
  8: 'cta-segmentation',
  12: 'lung-volume',
  3: 'fmri-valence',
  11: 'active-contour',
  7: 'skin-diagnostics',
  15: 'lesion-segmentation',
  17: 'gigapixel-pathology',
  5: 'multimodal-oscc',
  6: 'histology-classifier',
  9: 'dual-view-mammo',
  14: 'fungal-patches'
};

function TextLabel({ x, y, children, color = 'rgba(255,255,255,0.22)', size = 7, anchor = 'start' }) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontFamily="monospace"
      letterSpacing="1"
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

function BaseFrame({ id, children }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`accent-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4eb7ff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`active-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#17ffc6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00e4ff" stopOpacity="0.18" />
        </linearGradient>
        <pattern id={`grid-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.025)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="340" height="120" fill={`url(#grid-${id})`} />
      <line x1="0" y1="82" x2="340" y2="82" stroke="rgba(0, 228, 255, 0.07)" strokeWidth="1" />
      {children}
    </svg>
  );
}

function strokeColor(active, id) {
  return active ? `url(#active-${id})` : `url(#accent-${id})`;
}

function renderVisualContent(project, category, active, id) {
  const visualType = VISUAL_TYPES[id] ?? category;
  const primary = active ? '#17ffc6' : '#00e4ff';
  const secondary = active ? '#9dffe4' : '#4eb7ff';

  switch (visualType) {
    case 'vessel-registration':
      return (
        <BaseFrame id={id}>
          <path d="M 26 74 C 66 28, 110 42, 138 56 C 164 68, 196 72, 232 52 C 258 38, 290 26, 316 22" stroke={strokeColor(active, id)} strokeWidth="3" fill="none" />
          <path d="M 26 88 C 66 42, 110 56, 138 70 C 164 82, 196 86, 232 66 C 258 52, 290 40, 316 36" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 5" fill="none" />
          {[48, 84, 136, 224, 276].map((x, index) => (
            <circle key={x} cx={x} cy={index % 2 === 0 ? 57 : 69} r={index === 2 ? 4 : 3} fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          ))}
          <line x1="0" y1="28" x2="340" y2="28" stroke={active ? 'rgba(23,255,198,0.4)' : 'rgba(0,228,255,0.24)'} strokeWidth="2" style={{ animation: active ? 'laserScan 1s infinite linear' : 'laserScan 3s infinite linear' }} />
          <TextLabel x={14} y={18}>ANGIO_2D</TextLabel>
          <TextLabel x={272} y={18} color={primary}>REG_3D_LOCK</TextLabel>
        </BaseFrame>
      );

    case 'vessel-reconstruction':
      return (
        <BaseFrame id={id}>
          <path d="M 42 92 C 76 72, 98 60, 114 42 C 128 26, 150 22, 172 34 C 192 46, 196 68, 214 76 C 236 86, 260 76, 292 44" stroke={strokeColor(active, id)} strokeWidth="3" fill="none" />
          <path d="M 112 44 L 82 22" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <path d="M 150 30 L 148 8" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <path d="M 206 72 L 236 96" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          {[82, 148, 236, 292].map((x, index) => (
            <circle key={x} cx={x} cy={[22, 8, 96, 44][index]} r="2.8" fill={secondary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          ))}
          <TextLabel x={14} y={18}>RAYMARCH</TextLabel>
          <TextLabel x={252} y={18} color={primary}>PINN_FLOW</TextLabel>
        </BaseFrame>
      );

    case 'cardiac-gaussian':
      return (
        <BaseFrame id={id}>
          <ellipse cx="170" cy="62" rx="74" ry="40" stroke={strokeColor(active, id)} strokeWidth="2" fill="rgba(0,228,255,0.04)" />
          <ellipse cx="170" cy="62" rx="46" ry="25" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" />
          {[118, 136, 154, 172, 190, 208, 224].map((x, index) => (
            <circle key={x} cx={x} cy={56 + (index % 2 === 0 ? -10 : 10)} r={index % 3 === 0 ? 4.2 : 3} fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          ))}
          <path d="M 74 60 C 96 46, 112 42, 126 42" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 214 42 C 230 42, 246 48, 266 64" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <TextLabel x={14} y={18}>GAUSSIAN_FIELD</TextLabel>
          <TextLabel x={238} y={18} color={primary}>ECHO_2D_TO_3D</TextLabel>
        </BaseFrame>
      );

    case 'cardiac-implicit':
      return (
        <BaseFrame id={id}>
          <path d="M 88 76 C 90 42, 120 24, 168 24 C 222 24, 248 50, 248 76 C 248 92, 232 100, 212 100 C 192 100, 182 88, 168 82 C 154 88, 144 100, 124 100 C 104 100, 88 92, 88 76 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.03)" />
          <path d="M 92 34 L 246 34" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <path d="M 104 52 L 236 52" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <path d="M 118 70 L 222 70" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <circle cx="170" cy="60" r="6" stroke={primary} strokeWidth="1.2" fill="none" className={active ? 'pulse-scope-active' : ''} />
          <TextLabel x={14} y={18}>INR_PRIOR</TextLabel>
          <TextLabel x={255} y={18} color={primary}>SE3_TTO</TextLabel>
        </BaseFrame>
      );

    case 'surgical-tracking':
      return (
        <BaseFrame id={id}>
          <rect x="64" y="26" width="74" height="48" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.03)" />
          <rect x="190" y="40" width="58" height="34" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.02)" />
          <path d="M 102 50 L 218 57" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" strokeWidth="1.2" />
          <path d="M 138 52 C 160 56, 174 58, 190 58" stroke={strokeColor(active, id)} strokeWidth="2.4" fill="none" />
          <circle cx="102" cy="50" r="3.5" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <circle cx="218" cy="57" r="3.5" fill={secondary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <TextLabel x={14} y={18}>GROUNDING_DINO</TextLabel>
          <TextLabel x={262} y={18} color={primary}>SAM2_TRACK</TextLabel>
        </BaseFrame>
      );

    case 'endo-splat':
      return (
        <BaseFrame id={id}>
          {[96, 126, 156, 186, 216, 246].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={60 + (index % 2 === 0 ? -8 : 8)}
              r={index % 3 === 0 ? 8 : 5}
              fill={index % 2 === 0 ? 'rgba(0,228,255,0.13)' : 'rgba(78,183,255,0.1)'}
              stroke={index % 2 === 0 ? primary : secondary}
              strokeWidth="1"
            />
          ))}
          <path d="M 82 60 C 118 38, 214 38, 260 60" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
          <path d="M 82 60 C 118 82, 214 82, 260 60" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" fill="none" />
          <TextLabel x={14} y={18}>DEFORMABLE_3DGS</TextLabel>
          <TextLabel x={252} y={18} color={primary}>CLIP_LSEG</TextLabel>
        </BaseFrame>
      );

    case 'tumor-forecast':
      return (
        <BaseFrame id={id}>
          <path d="M 36 80 C 88 74, 126 66, 164 54 C 208 40, 252 28, 306 22" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <path d="M 36 92 C 90 86, 132 74, 172 60 C 220 42, 262 34, 308 28" stroke={strokeColor(active, id)} strokeWidth="3" fill="none" />
          <circle cx="98" cy="73" r="10" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.04)" />
          <circle cx="168" cy="59" r="14" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.05)" className={active ? 'pulse-scope-active' : ''} />
          <circle cx="254" cy="40" r="18" stroke={primary} strokeWidth="1.6" fill="rgba(23,255,198,0.04)" />
          <TextLabel x={14} y={18}>NEURAL_ODE</TextLabel>
          <TextLabel x={246} y={18} color={primary}>T_PLUS_30D</TextLabel>
        </BaseFrame>
      );

    case 'diffusion-solver':
      return (
        <BaseFrame id={id}>
          <path d="M 22 60 L 68 60 L 82 42 L 96 76 L 112 52 L 154 52 L 170 36 L 188 82 L 208 58 L 316 58" stroke={strokeColor(active, id)} strokeWidth="2.3" fill="none" style={{ strokeDasharray: '400', animation: active ? 'signalDraw 1.4s infinite linear' : 'signalDraw 4s infinite linear' }} />
          <path d="M 30 84 C 90 72, 140 76, 206 64 C 246 58, 276 62, 314 58" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" fill="none" />
          <TextLabel x={14} y={18}>PERONA_MALIK</TextLabel>
          <TextLabel x={252} y={18} color={primary}>MINI_UNET</TextLabel>
        </BaseFrame>
      );

    case 'cta-segmentation':
      return (
        <BaseFrame id={id}>
          <ellipse cx="156" cy="58" rx="34" ry="18" stroke={strokeColor(active, id)} strokeWidth="2" fill="rgba(0,228,255,0.04)" />
          <ellipse cx="192" cy="56" rx="28" ry="15" stroke={secondary} strokeWidth="1.8" fill="rgba(78,183,255,0.02)" />
          <path d="M 210 54 C 228 50, 244 42, 262 28" stroke={primary} strokeWidth="2" fill="none" />
          <path d="M 148 56 C 130 54, 110 48, 88 34" stroke="rgba(255,255,255,0.14)" strokeWidth="1.4" fill="none" />
          <TextLabel x={14} y={18}>CTA_VOLUME</TextLabel>
          <TextLabel x={230} y={18} color={primary}>MESH_EXPORT</TextLabel>
        </BaseFrame>
      );

    case 'lung-volume':
      return (
        <BaseFrame id={id}>
          <path d="M 122 28 C 98 32, 86 52, 88 74 C 90 92, 108 102, 128 98 C 144 94, 152 82, 156 66 L 156 34 C 146 28, 136 26, 122 28 Z" stroke={strokeColor(active, id)} strokeWidth="2" fill="rgba(0,228,255,0.03)" />
          <path d="M 218 28 C 242 32, 254 52, 252 74 C 250 92, 232 102, 212 98 C 196 94, 188 82, 184 66 L 184 34 C 194 28, 204 26, 218 28 Z" stroke={strokeColor(active, id)} strokeWidth="2" fill="rgba(0,228,255,0.03)" />
          <line x1="170" y1="26" x2="170" y2="96" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
          <TextLabel x={14} y={18}>LUNG_CT_3D</TextLabel>
          <TextLabel x={258} y={18} color={primary}>MONAI_UNET</TextLabel>
        </BaseFrame>
      );

    case 'fmri-valence':
      return (
        <BaseFrame id={id}>
          <circle cx="106" cy="60" r="18" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.03)" />
          <circle cx="170" cy="60" r="22" stroke={primary} strokeWidth="1.6" fill="rgba(0,228,255,0.03)" className={active ? 'pulse-scope-active' : ''} />
          <circle cx="238" cy="60" r="18" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.03)" />
          <path d="M 88 60 H 256" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <TextLabel x={14} y={18}>BOLD_ASL_GLM</TextLabel>
          <TextLabel x={260} y={18} color={primary}>VALENCE_MAP</TextLabel>
        </BaseFrame>
      );

    case 'active-contour':
      return (
        <BaseFrame id={id}>
          <path d="M 94 74 C 94 42, 126 28, 168 28 C 216 28, 248 46, 248 74 C 248 92, 226 102, 186 98 C 170 96, 156 92, 142 92 C 110 92, 94 86, 94 74 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" fill="none" />
          <path d="M 100 70 C 100 46, 128 36, 168 36 C 210 36, 242 50, 242 72 C 242 88, 222 94, 188 90 C 170 88, 156 84, 142 84 C 116 84, 100 82, 100 70 Z" stroke={strokeColor(active, id)} strokeWidth="2.3" fill="none" />
          <circle cx="168" cy="36" r="3" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <TextLabel x={14} y={18}>SNAKE_ENERGY</TextLabel>
          <TextLabel x={242} y={18} color={primary}>CONTOUR_LOCK</TextLabel>
        </BaseFrame>
      );

    case 'skin-diagnostics':
      return (
        <BaseFrame id={id}>
          <path d="M 98 34 C 122 18, 166 22, 200 34 C 228 44, 242 74, 220 90 C 196 108, 136 106, 106 88 C 80 72, 74 48, 98 34 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.035)" />
          <path d="M 128 44 C 146 36, 176 36, 194 46 C 208 54, 208 72, 190 80 C 170 90, 134 88, 120 76 C 108 66, 110 50, 128 44 Z" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" />
          <rect x="232" y="28" width="72" height="48" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.02)" />
          <TextLabel x={14} y={18}>GRADCAM_LIME</TextLabel>
          <TextLabel x={250} y={18} color={primary}>MPOX_SCORE</TextLabel>
        </BaseFrame>
      );

    case 'lesion-segmentation':
      return (
        <BaseFrame id={id}>
          <path d="M 112 32 C 140 18, 190 22, 216 40 C 236 54, 236 82, 210 92 C 180 104, 132 100, 108 80 C 92 66, 94 44, 112 32 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
          <path d="M 118 38 C 144 26, 186 30, 208 44 C 226 56, 222 78, 200 86 C 172 96, 134 92, 116 76 C 102 64, 102 48, 118 38 Z" stroke={strokeColor(active, id)} strokeWidth="2.3" fill="rgba(0,228,255,0.035)" />
          <TextLabel x={14} y={18}>ISIC_2018</TextLabel>
          <TextLabel x={246} y={18} color={primary}>MASK_DICE</TextLabel>
        </BaseFrame>
      );

    case 'gigapixel-pathology':
      return (
        <BaseFrame id={id}>
          <rect x="40" y="26" width="86" height="56" stroke={secondary} strokeWidth="1.3" fill="rgba(78,183,255,0.02)" />
          <rect x="214" y="18" width="92" height="64" stroke={primary} strokeWidth="1.5" fill="rgba(0,228,255,0.025)" />
          <line x1="126" y1="54" x2="214" y2="50" stroke="rgba(255,255,255,0.14)" strokeDasharray="4 4" />
          <circle cx="84" cy="54" r="9" stroke="rgba(255,255,255,0.12)" strokeWidth="1.1" fill="none" />
          <circle cx="258" cy="50" r="14" stroke={strokeColor(active, id)} strokeWidth="1.3" fill="none" className={active ? 'pulse-scope-active' : ''} />
          <TextLabel x={14} y={18}>20X_TO_40X</TextLabel>
          <TextLabel x={224} y={18} color={primary}>CROSS_ATTN</TextLabel>
        </BaseFrame>
      );

    case 'multimodal-oscc':
      return (
        <BaseFrame id={id}>
          <rect x="40" y="34" width="60" height="42" stroke={secondary} strokeWidth="1.2" fill="rgba(78,183,255,0.02)" />
          <rect x="140" y="28" width="60" height="54" stroke={primary} strokeWidth="1.2" fill="rgba(0,228,255,0.02)" />
          <rect x="238" y="36" width="60" height="40" stroke={secondary} strokeWidth="1.2" fill="rgba(78,183,255,0.02)" />
          <path d="M 100 55 H 140 M 200 55 H 238" stroke="rgba(255,255,255,0.14)" strokeDasharray="4 4" />
          <TextLabel x={46} y={28}>MACRO</TextLabel>
          <TextLabel x={156} y={22}>OCT</TextLabel>
          <TextLabel x={246} y={30}>H&E</TextLabel>
          <TextLabel x={14} y={18}>TRI_MODAL_FUSION</TextLabel>
        </BaseFrame>
      );

    case 'histology-classifier':
      return (
        <BaseFrame id={id}>
          {[72, 116, 162, 214, 264].map((x, index) => (
            <circle key={x} cx={x} cy={index % 2 === 0 ? 46 : 74} r={index % 2 === 0 ? 11 : 15} stroke={index % 2 === 0 ? secondary : primary} strokeWidth="1.2" fill="rgba(0,228,255,0.02)" />
          ))}
          <rect x="138" y="28" width="64" height="60" stroke={primary} strokeWidth="1.5" fill="rgba(23,255,198,0.03)" />
          <TextLabel x={14} y={18}>RESNET_H&E</TextLabel>
          <TextLabel x={236} y={18} color={primary}>ADENO_SCC</TextLabel>
        </BaseFrame>
      );

    case 'dual-view-mammo':
      return (
        <BaseFrame id={id}>
          <rect x="54" y="28" width="84" height="58" rx="14" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.02)" />
          <rect x="202" y="28" width="84" height="58" rx="14" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.025)" />
          <path d="M 138 57 C 160 42, 182 42, 202 57" stroke="rgba(255,255,255,0.14)" strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
          <TextLabel x={80} y={22}>CC</TextLabel>
          <TextLabel x={232} y={22}>MLO</TextLabel>
          <TextLabel x={14} y={18}>STN_ALIGN</TextLabel>
          <TextLabel x={240} y={18} color={primary}>BI-RADS</TextLabel>
        </BaseFrame>
      );

    case 'fungal-patches':
      return (
        <BaseFrame id={id}>
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={88 + col * 34}
                y={24 + row * 22}
                width="22"
                height="14"
                stroke={(row + col) % 2 === 0 ? primary : secondary}
                strokeWidth="1"
                fill="rgba(0,228,255,0.02)"
              />
            ))
          )}
          <TextLabel x={14} y={18}>PATCH_224</TextLabel>
          <TextLabel x={244} y={18} color={primary}>9_SPECIES</TextLabel>
        </BaseFrame>
      );

    case '3D & Robotics':
    case 'Medical Imaging':
    case 'Cancer & Pathology':
    default:
      return (
        <BaseFrame id={id}>
          <path d="M 50 60 Q 100 20 170 60 T 290 60" stroke={strokeColor(active, id)} strokeWidth="1.8" fill="none" style={{ animation: active ? 'meshWave 1.5s infinite ease-in-out' : 'meshWave 4s infinite ease-in-out' }} />
          <circle cx="135" cy="45" r="4" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <circle cx="210" cy="58" r="3" fill={secondary} className={active ? 'pulse-node-active' : 'pulse-node'} />
        </BaseFrame>
      );
  }
}

export default function ProjectVisual({ project, category, active, id, style }) {

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
      {renderVisualContent(project, category, active, id)}

      {/* Cyberpunk corner brackets on visual card cover */}
      <div style={{ position: 'absolute', top: '4px', left: '4px', width: '4px', height: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '4px', height: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '4px', height: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }} />
      <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '4px', height: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }} />
    </div>
  );
}
