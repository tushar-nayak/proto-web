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
          <rect x="34" y="24" width="116" height="64" rx="8" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <path d="M 56 74 C 74 42, 96 34, 118 40 C 130 44, 138 54, 146 58" stroke="rgba(255,255,255,0.14)" strokeWidth="2.2" fill="none" />
          <rect x="190" y="24" width="116" height="64" rx="8" stroke={strokeColor(active, id)} strokeWidth="1.4" fill="rgba(0,228,255,0.03)" />
          <path d="M 212 72 C 228 42, 250 32, 272 38 C 286 42, 294 54, 302 58" stroke={strokeColor(active, id)} strokeWidth="2.8" fill="none" />
          <line x1="150" y1="56" x2="190" y2="56" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" strokeWidth="1.4" />
          <circle cx="170" cy="56" r="3.4" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <TextLabel x={14} y={18}>ANGIO_2D</TextLabel>
          <TextLabel x={272} y={18} color={primary}>REG_3D_LOCK</TextLabel>
        </BaseFrame>
      );

    case 'vessel-reconstruction':
      return (
        <BaseFrame id={id}>
          <path d="M 64 86 C 86 70, 104 54, 118 36 C 132 20, 152 24, 168 38 C 184 52, 196 70, 220 78 C 246 86, 272 76, 296 44" stroke={strokeColor(active, id)} strokeWidth="3.2" fill="none" />
          <path d="M 116 36 L 92 18 M 168 38 L 168 14 M 220 78 L 246 94" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" />
          {[92, 168, 246].map((x, idx) => (
            <circle key={x} cx={x} cy={[18, 14, 94][idx]} r="3" fill={secondary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          ))}
          <TextLabel x={14} y={18}>RAYMARCH</TextLabel>
          <TextLabel x={252} y={18} color={primary}>PINN_FLOW</TextLabel>
        </BaseFrame>
      );

    case 'cardiac-gaussian':
      return (
        <BaseFrame id={id}>
          <path d="M 126 32 C 104 28, 88 44, 88 66 C 88 88, 104 102, 126 98 C 144 94, 152 80, 156 64 L 156 36 C 146 30, 136 30, 126 32 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.03)" />
          <path d="M 214 32 C 236 28, 252 44, 252 66 C 252 88, 236 102, 214 98 C 196 94, 188 80, 184 64 L 184 36 C 194 30, 204 30, 214 32 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(78,183,255,0.02)" />
          <path d="M 156 40 C 160 50, 164 56, 170 60 C 176 56, 180 50, 184 40" stroke="rgba(255,255,255,0.14)" strokeWidth="1.6" fill="none" />
          {[122, 138, 206, 222].map((x, index) => (
            <circle key={x} cx={x} cy={index < 2 ? 62 + index * 10 : 72 - (index - 2) * 10} r={3.4} fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          ))}
          <path d="M 68 56 C 84 50, 92 44, 100 36" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 272 56 C 256 50, 248 44, 240 36" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <TextLabel x={14} y={18}>GAUSSIAN_FIELD</TextLabel>
          <TextLabel x={238} y={18} color={primary}>ECHO_2D_TO_3D</TextLabel>
        </BaseFrame>
      );

    case 'cardiac-implicit':
      return (
        <BaseFrame id={id}>
          <rect x="82" y="20" width="176" height="76" rx="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.01)" />
          <path d="M 114 76 C 114 48, 138 32, 168 32 C 198 32, 222 48, 222 76" stroke={strokeColor(active, id)} strokeWidth="2.6" fill="none" />
          <path d="M 136 76 C 136 58, 150 48, 168 48 C 186 48, 200 58, 200 76" stroke="rgba(255,255,255,0.16)" strokeWidth="1.8" fill="none" />
          <line x1="168" y1="32" x2="168" y2="76" stroke="rgba(255,255,255,0.16)" strokeDasharray="4 4" />
          <circle cx="168" cy="48" r="5" stroke={primary} strokeWidth="1.2" fill="none" className={active ? 'pulse-scope-active' : ''} />
          <TextLabel x={14} y={18}>INR_PRIOR</TextLabel>
          <TextLabel x={255} y={18} color={primary}>SE3_TTO</TextLabel>
        </BaseFrame>
      );

    case 'surgical-tracking':
      return (
        <BaseFrame id={id}>
          <rect x="54" y="24" width="92" height="56" rx="4" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.03)" />
          <rect x="204" y="38" width="52" height="32" rx="4" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.02)" />
          <path d="M 84 82 L 114 54 L 146 54" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
          <path d="M 146 54 C 166 54, 182 56, 204 54" stroke={strokeColor(active, id)} strokeWidth="2.6" fill="none" />
          <path d="M 214 54 L 238 40" stroke={secondary} strokeWidth="2.2" fill="none" />
          <circle cx="114" cy="54" r="4" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <circle cx="214" cy="54" r="4" fill={secondary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <circle cx="238" cy="40" r="2.8" fill="rgba(255,255,255,0.9)" />
          <TextLabel x={14} y={18}>GROUNDING_DINO</TextLabel>
          <TextLabel x={262} y={18} color={primary}>SAM2_TRACK</TextLabel>
        </BaseFrame>
      );

    case 'endo-splat':
      return (
        <BaseFrame id={id}>
          <ellipse cx="170" cy="60" rx="92" ry="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
          <ellipse cx="170" cy="60" rx="62" ry="18" stroke={strokeColor(active, id)} strokeWidth="2" fill="rgba(0,228,255,0.03)" />
          {[110, 138, 170, 202, 230].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={60 + (index % 2 === 0 ? -6 : 6)}
              r={index === 2 ? 8 : 5}
              fill={index % 2 === 0 ? 'rgba(0,228,255,0.12)' : 'rgba(78,183,255,0.08)'}
              stroke={index % 2 === 0 ? primary : secondary}
              strokeWidth="1"
            />
          ))}
          <path d="M 132 36 L 148 24" stroke="rgba(255,255,255,0.1)" strokeWidth="1.1" />
          <path d="M 208 84 L 224 96" stroke="rgba(255,255,255,0.1)" strokeWidth="1.1" />
          <TextLabel x={14} y={18}>DEFORMABLE_3DGS</TextLabel>
          <TextLabel x={252} y={18} color={primary}>CLIP_LSEG</TextLabel>
        </BaseFrame>
      );

    case 'tumor-forecast':
      return (
        <BaseFrame id={id}>
          <rect x="34" y="24" width="80" height="56" rx="8" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <rect x="130" y="18" width="88" height="64" rx="8" stroke={secondary} strokeWidth="1.2" fill="rgba(78,183,255,0.02)" />
          <rect x="234" y="12" width="74" height="72" rx="8" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.03)" />
          <circle cx="74" cy="52" r="10" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" fill="none" />
          <circle cx="174" cy="50" r="14" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.04)" />
          <circle cx="272" cy="48" r="20" stroke={primary} strokeWidth="1.6" fill="rgba(0,228,255,0.05)" className={active ? 'pulse-scope-active' : ''} />
          <line x1="114" y1="52" x2="130" y2="50" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
          <line x1="218" y1="50" x2="234" y2="48" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
          <TextLabel x={14} y={18}>NEURAL_ODE</TextLabel>
          <TextLabel x={246} y={18} color={primary}>T_PLUS_30D</TextLabel>
        </BaseFrame>
      );

    case 'diffusion-solver':
      return (
        <BaseFrame id={id}>
          <rect x="30" y="20" width="116" height="68" rx="8" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <path d="M 58 74 C 46 64, 46 42, 64 34 C 82 26, 106 30, 118 46 C 130 62, 122 80, 100 84 C 82 88, 66 84, 58 74 Z" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" fill="rgba(255,255,255,0.02)" />
          <path d="M 72 48 L 84 42 L 92 52 L 104 40 L 112 58 L 96 66 L 84 60 L 74 70" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" fill="none" strokeDasharray="2 4" style={{ animation: active ? 'signalDraw 1.2s infinite linear' : 'signalDraw 3.8s infinite linear' }} />
          {[62, 76, 88, 98, 110, 120].map((x, index) => (
            <circle key={x} cx={x} cy={[38, 60, 46, 70, 52, 64][index]} r="1.8" fill="rgba(255,255,255,0.5)" />
          ))}
          <line x1="146" y1="54" x2="186" y2="54" stroke={strokeColor(active, id)} strokeWidth="2.2" strokeDasharray="6 6" style={{ animation: active ? 'laserScan 1.2s infinite linear' : 'laserScan 3.4s infinite linear' }} />
          <rect x="194" y="20" width="116" height="68" rx="8" stroke={strokeColor(active, id)} strokeWidth="1.4" fill="rgba(0,228,255,0.03)" />
          <path d="M 222 74 C 210 64, 210 42, 228 34 C 246 26, 270 30, 282 46 C 294 62, 286 80, 264 84 C 246 88, 230 84, 222 74 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.03)" />
          <path d="M 238 46 C 246 42, 258 42, 266 48 C 272 54, 272 64, 264 68 C 256 72, 244 72, 238 64 C 234 58, 234 50, 238 46 Z" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" fill="none" />
          <path d="M 228 54 H 282" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <TextLabel x={14} y={18}>PERONA_MALIK</TextLabel>
          <TextLabel x={252} y={18} color={primary}>MINI_UNET</TextLabel>
        </BaseFrame>
      );

    case 'cta-segmentation':
      return (
        <BaseFrame id={id}>
          <path d="M 104 60 C 122 38, 144 30, 166 34 C 182 38, 190 52, 206 56 C 224 60, 244 52, 264 34" stroke={strokeColor(active, id)} strokeWidth="2.6" fill="none" />
          <path d="M 104 72 C 126 84, 148 88, 170 82 C 186 78, 198 66, 216 62 C 234 58, 250 62, 266 74" stroke="rgba(255,255,255,0.12)" strokeWidth="1.8" fill="none" />
          <circle cx="166" cy="50" r="10" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.04)" />
          <circle cx="214" cy="60" r="7" stroke={secondary} strokeWidth="1.3" fill="rgba(78,183,255,0.03)" />
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
          <path d="M 96 74 C 82 66, 82 48, 98 42 C 114 36, 132 42, 136 58 C 140 72, 124 84, 108 82 C 102 82, 98 78, 96 74 Z" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.03)" />
          <path d="M 152 80 C 136 66, 138 42, 160 34 C 182 26, 206 38, 206 58 C 206 78, 186 90, 166 88 C 160 88, 156 84, 152 80 Z" stroke={primary} strokeWidth="1.7" fill="rgba(0,228,255,0.03)" className={active ? 'pulse-scope-active' : ''} />
          <path d="M 230 74 C 216 66, 216 48, 232 42 C 248 36, 266 42, 270 58 C 274 72, 258 84, 242 82 C 236 82, 232 78, 230 74 Z" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.03)" />
          <path d="M 118 58 H 220" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 4" />
          <TextLabel x={14} y={18}>BOLD_ASL_GLM</TextLabel>
          <TextLabel x={260} y={18} color={primary}>VALENCE_MAP</TextLabel>
        </BaseFrame>
      );

    case 'active-contour':
      return (
        <BaseFrame id={id}>
          <rect x="78" y="20" width="180" height="80" rx="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <path d="M 112 74 C 112 50, 136 34, 170 34 C 208 34, 236 50, 236 72 C 236 88, 216 92, 184 88 C 164 84, 150 84, 134 86 C 120 86, 112 82, 112 74 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1.6" fill="none" />
          <path d="M 120 70 C 120 52, 140 42, 170 42 C 202 42, 228 54, 228 70 C 228 82, 210 84, 182 82 C 160 80, 148 78, 136 80 C 126 80, 120 78, 120 70 Z" stroke={strokeColor(active, id)} strokeWidth="2.4" fill="none" />
          <circle cx="170" cy="42" r="3" fill={primary} className={active ? 'pulse-node-active' : 'pulse-node'} />
          <TextLabel x={14} y={18}>SNAKE_ENERGY</TextLabel>
          <TextLabel x={242} y={18} color={primary}>CONTOUR_LOCK</TextLabel>
        </BaseFrame>
      );

    case 'skin-diagnostics':
      return (
        <BaseFrame id={id}>
          <rect x="44" y="24" width="116" height="64" rx="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <path d="M 82 42 C 104 30, 130 34, 144 48 C 156 60, 148 80, 128 84 C 104 88, 78 78, 74 60 C 72 52, 76 46, 82 42 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.035)" />
          <circle cx="112" cy="58" r="10" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" fill="none" />
          <rect x="214" y="28" width="92" height="56" rx="8" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.02)" />
          <path d="M 230 42 L 248 42 L 248 60 L 230 60 Z M 254 36 L 290 36 L 290 44 L 254 44 Z M 254 52 L 284 52 L 284 60 L 254 60 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
          <TextLabel x={14} y={18}>GRADCAM_LIME</TextLabel>
          <TextLabel x={250} y={18} color={primary}>MPOX_SCORE</TextLabel>
        </BaseFrame>
      );

    case 'lesion-segmentation':
      return (
        <BaseFrame id={id}>
          <rect x="72" y="20" width="196" height="80" rx="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="rgba(255,255,255,0.015)" />
          <path d="M 112 38 C 142 26, 188 30, 212 46 C 228 58, 222 78, 198 86 C 168 96, 132 92, 114 76 C 100 64, 98 48, 112 38 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" fill="none" />
          <path d="M 126 46 C 148 38, 182 40, 198 52 C 210 60, 206 74, 188 80 C 164 88, 136 84, 124 72 C 116 62, 116 52, 126 46 Z" stroke={strokeColor(active, id)} strokeWidth="2.2" fill="rgba(0,228,255,0.035)" />
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
          <circle cx="84" cy="54" r="3" fill={secondary} />
          <path d="M 236 36 h18 v18 h-18 z M 260 36 h18 v18 h-18 z M 236 60 h18 v18 h-18 z M 260 60 h18 v18 h-18 z" stroke={strokeColor(active, id)} strokeWidth="1.1" fill="none" />
          <TextLabel x={14} y={18}>20X_TO_40X</TextLabel>
          <TextLabel x={224} y={18} color={primary}>CROSS_ATTN</TextLabel>
        </BaseFrame>
      );

    case 'multimodal-oscc':
      return (
        <BaseFrame id={id}>
          <rect x="40" y="34" width="60" height="42" rx="6" stroke={secondary} strokeWidth="1.2" fill="rgba(78,183,255,0.02)" />
          <ellipse cx="170" cy="56" rx="30" ry="24" stroke={primary} strokeWidth="1.2" fill="rgba(0,228,255,0.02)" />
          <rect x="238" y="36" width="60" height="40" rx="6" stroke={secondary} strokeWidth="1.2" fill="rgba(78,183,255,0.02)" />
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
          {[64, 96, 128, 222, 254, 286].map((x, index) => (
            <circle key={x} cx={x} cy={index % 2 === 0 ? 44 : 76} r={index % 2 === 0 ? 8 : 11} stroke={index % 2 === 0 ? secondary : primary} strokeWidth="1.1" fill="rgba(0,228,255,0.02)" />
          ))}
          <rect x="138" y="28" width="64" height="60" stroke={primary} strokeWidth="1.5" fill="rgba(23,255,198,0.03)" />
          <path d="M 150 40 h14 v14 h-14 z M 176 40 h14 v14 h-14 z M 150 62 h14 v14 h-14 z M 176 62 h14 v14 h-14 z" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
          <TextLabel x={14} y={18}>RESNET_H&E</TextLabel>
          <TextLabel x={236} y={18} color={primary}>ADENO_SCC</TextLabel>
        </BaseFrame>
      );

    case 'dual-view-mammo':
      return (
        <BaseFrame id={id}>
          <path d="M 54 72 C 58 46, 82 28, 112 30 C 126 30, 136 42, 138 62 C 140 78, 124 90, 102 90 C 76 88, 58 84, 54 72 Z" stroke={secondary} strokeWidth="1.4" fill="rgba(78,183,255,0.02)" />
          <path d="M 202 72 C 206 46, 230 28, 260 30 C 274 30, 284 42, 286 62 C 288 78, 272 90, 250 90 C 224 88, 206 84, 202 72 Z" stroke={primary} strokeWidth="1.4" fill="rgba(0,228,255,0.025)" />
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
          {[0, 1, 2].map((row) => (
            <circle key={row} cx={98 + row * 68} cy={54 + (row % 2) * 8} r="5" stroke={row % 2 === 0 ? primary : secondary} strokeWidth="1.1" fill="none" />
          ))}
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
