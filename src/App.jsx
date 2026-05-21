import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  FolderGit2,
  Calendar,
  Layers,
  ArrowUpRight,
  Search,
  ExternalLink,
  ClipboardCopy,
  Check,
  Cpu,
  Eye,
  Sliders,
  ChevronDown,
  MapPin,
  Stethoscope,
  Terminal,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';

// Custom inline SVG replacements for brand/common icons to prevent build resolution errors
const Mail = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Github = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Full publications dataset
const PUBLICATIONS = [
  {
    id: 1,
    title: "Automated histopathological detection and classification of lung cancer with an image pre-processing pipeline and spatial attention with deep neural networks",
    authors: "Tushar Nayak, et al.",
    venue: "IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)",
    year: 2023,
    type: "Conference",
    tags: ["Lung Cancer", "Spatial Attention", "Histopathology"],
    selected: true,
    link: "#",
    bibtex: `@inproceedings{nayak2023lung,
  title={Automated histopathological detection and classification of lung cancer with an image pre-processing pipeline and spatial attention with deep neural networks},
  author={Nayak, Tushar and others},
  booktitle={2023 IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)},
  year={2023}
}`
  },
  {
    id: 2,
    title: "Deep learning based detection of monkeypox virus using skin lesion images",
    authors: "Tushar Nayak, et al.",
    venue: "Journal of Medical Imaging and Health Informatics",
    year: 2023,
    type: "Journal",
    tags: ["Monkeypox", "Skin Lesions", "Deep Learning"],
    selected: true,
    link: "#",
    bibtex: `@article{nayak2023monkeypox,
  title={Deep learning based detection of monkeypox virus using skin lesion images},
  author={Nayak, Tushar and others},
  journal={Journal of Medical Imaging and Health Informatics},
  year={2023}
}`
  },
  {
    id: 3,
    title: "Detection of Monkeypox from skin lesion images using deep learning networks and explainable artificial intelligence",
    authors: "Tushar Nayak, et al.",
    venue: "Clinical Diagnostics & AI Support",
    year: 2023,
    type: "Journal",
    tags: ["Explainable AI (XAI)", "Monkeypox", "Diagnostics"],
    selected: true,
    link: "#",
    bibtex: `@article{nayak2023xai,
  title={Detection of Monkeypox from skin lesion images using deep learning networks and explainable artificial intelligence},
  author={Nayak, Tushar and others},
  journal={Clinical Diagnostics & AI Support},
  year={2023}
}`
  },
  {
    id: 4,
    title: "An explainable artificial intelligence integrated system for automatic detection of dengue from images of blood smears using transfer learning",
    authors: "Tushar Nayak, et al.",
    venue: "Hematology & Diagnostic Computing",
    year: 2023,
    type: "Journal",
    tags: ["Dengue", "Explainable AI", "Transfer Learning"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2023denguexai,
  title={An explainable artificial intelligence integrated system for automatic detection of dengue from images of blood smears using transfer learning},
  author={Nayak, Tushar and others},
  journal={Hematology & Diagnostic Computing},
  year={2023}
}`
  },
  {
    id: 5,
    title: "Processing and Detection of Lung and Colon Cancer from Histopathological Images using Deep Residual Networks",
    authors: "Tushar Nayak, et al.",
    venue: "IEEE Systems Journal / Clinical Computing",
    year: 2023,
    type: "Journal",
    tags: ["Colon Cancer", "ResNet", "Histopathology"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2023resnetlung,
  title={Processing and Detection of Lung and Colon Cancer from Histopathological Images using Deep Residual Networks},
  author={Nayak, Tushar and others},
  journal={IEEE Systems Journal / Clinical Computing},
  year={2023}
}`
  },
  {
    id: 6,
    title: "Deep learning approach for detection of Dengue fever from the microscopic images of blood smear",
    authors: "Tushar Nayak, et al.",
    venue: "Journal of Physics: Conference Series",
    year: 2022,
    type: "Conference",
    tags: ["Dengue Fever", "Microscopic Imaging", "Classification"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2022denguephysics,
  title={Deep learning approach for detection of Dengue fever from the microscopic images of blood smear},
  author={Nayak, Tushar and others},
  journal={Journal of Physics: Conference Series},
  year={2022}
}`
  },
  {
    id: 7,
    title: "Deep learning-based analysis of blood smear images for detection of acute lymphoblastic leukemia",
    authors: "Tushar Nayak, et al.",
    venue: "IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)",
    year: 2023,
    type: "Conference",
    tags: ["Leukemia (ALL)", "Blood Smears", "Classification"],
    selected: false,
    link: "#",
    bibtex: `@inproceedings{nayak2023leukemia,
  title={Deep learning-based analysis of blood smear images for detection of acute lymphoblastic leukemia},
  author={Nayak, Tushar and others},
  booktitle={2023 IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)},
  year={2023}
}`
  },
  {
    id: 8,
    title: "Automated Oral Squamous Cell Carcinoma Detection from Histopathological Images Using Deep Neural Networks",
    authors: "Tushar Nayak, et al.",
    venue: "Diagnostic Oncology & Pathology Computing",
    year: 2023,
    type: "Journal",
    tags: ["OSCC", "Oral Cancer", "Histopathology"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2023oscc,
  title={Automated Oral Squamous Cell Carcinoma Detection from Histopathological Images Using Deep Neural Networks},
  author={Nayak, Tushar and others},
  journal={Diagnostic Oncology & Pathology Computing},
  year={2023}
}`
  },
  {
    id: 9,
    title: "Binary Detection of Acute Lymphocytic Leukemia Using Blood Smear Images Using Deep Learning Models",
    authors: "Tushar Nayak, et al.",
    venue: "Laboratory Hematology and Computing",
    year: 2022,
    type: "Journal",
    tags: ["Leukemia", "Hematology", "Deep Learning"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2022leukemiabinary,
  title={Binary Detection of Acute Lymphocytic Leukemia Using Blood Smear Images Using Deep Learning Models},
  author={Nayak, Tushar and others},
  journal={Laboratory Hematology and Computing},
  year={2022}
}`
  }
];

// Full projects dataset
const PROJECTS = [
  {
    id: 1,
    title: "Physics-Informed Endovasculature Deformation Estimation & Registration",
    desc: "Graduate Thesis project investigating Physics-Informed Neural Networks (PINNs) and Neural Ordinary Differential Equations (Neural ODEs) to quantify deformable vascular displacement from 2D fluoroscopy angiograms and dynamically register it to pre-operative 3D CT angiographs.",
    category: "3D & Robotics",
    tags: ["Physics-Informed ML", "Neural ODEs", "3D Registration", "Robotic Surgery"],
    github: "https://github.com/tushar-nayak/vascular-reconstruction",
    demo: null,
    highlight: true,
    simLogs: [
      "[PINN] Initializing Adam Optimizer. Learning Rate = 1e-4...",
      "[PINN] Loading boundary constraints from CT mesh...",
      "[ODE] Solving spatial deformation field along catheter trajectory...",
      "[ODE] Flow field converging. MSE Loss = 0.0024",
      "[REGISTRATION] Performing 2D projection registration overlay...",
      "[SUCCESS] Vascular deformation registration matched! Target error = 0.82mm."
    ]
  },
  {
    id: 2,
    title: "endo-splat",
    desc: "Real-time, deformable 3D scene reconstruction framework tailored for dynamic surgical environments. Combines Neural Radiance Fields (NeRFs) for parsing complex specular reflections on biological tissues with explicit 3D Gaussian Splatting for sub-millisecond render tracking.",
    category: "3D & Robotics",
    tags: ["3D Gaussian Splatting", "NeRF", "Surgical Robotics", "Real-Time 3D"],
    github: "https://github.com/tushar-nayak/endo-splat",
    demo: null,
    highlight: true,
    simLogs: [
      "[NeRF] Querying coordinate radiance fields for specularity mapping...",
      "[GAUSSIAN] Spawning 120,000 spatial Gaussians over tissue grid...",
      "[SPLATTING] Performing rasterization. Target FPS = 90...",
      "[GAUSSIAN] Computing deformable offsets via dynamic scaling...",
      "[SUCCESS] Scene reconstructed! specularity resolved in 4.2ms."
    ]
  },
  {
    id: 3,
    title: "surgi-prompt",
    desc: "Open-vocabulary surgical tool detection, semantic boundary segmentation, and multi-object tracking in real endoscopic/laparoscopic surgery videos. Integrates text-conditioned vision anchors (Grounding DINO) with sequential mask propagation (Segment Anything 2).",
    category: "3D & Robotics",
    tags: ["SAM2", "Grounding DINO", "Surgical Vision", "Open-Vocabulary"],
    github: "https://github.com/tushar-nayak/surgi-prompt",
    demo: null,
    highlight: true,
    simLogs: [
      "[PROMPT] Loading text prompts: 'forceps', 'grasper', 'needle'...",
      "[DINO] Extracting high-confidence bounding box proposals...",
      "[DINO] Detected 'forceps' [Score: 0.94] at coordinate [0.32, 0.45]...",
      "[SAM2] Enforcing temporal memory queue. Propagating boundary mask...",
      "[SUCCESS] 24 frames tracked. Semantic IoU = 0.912."
    ]
  },
  {
    id: 4,
    title: "cardiac-reconstruction-evolved",
    desc: "Sparse cardiac volume reconstruction utilizing stabilized Gaussian occupancy fields, differentiable slice supervision from limited ultrasound views, and mesh-based surface evaluations for interpretable 3D anatomy recovery.",
    category: "3D & Robotics",
    tags: ["Gaussian Occupancy", "Differentiable Rendering", "Cardiac US"],
    github: "https://github.com/tushar-nayak/cardiac-reconstruction-evolved",
    demo: null,
    highlight: true,
    simLogs: [
      "[GAUSSIAN] Initializing implicit occupancy field mapping...",
      "[ULTRASOUND] Importing CC & MLO 2D slice configurations...",
      "[RENDERER] Projecting slices. Backpropagating voxel difference...",
      "[MESH] Extracting cardiac surface mesh using marching cubes...",
      "[SUCCESS] 3D mesh exported. Volume deviation = 2.4%."
    ]
  },
  {
    id: 5,
    title: "Neural Anisotropic Diffusion for Medical Image Relaxation",
    desc: "Learnable anisotropic diffusion models unrolled as deep networks for high-contrast brain MRI denoising. Features spatially adaptive unrolled PDE conduction weights and optional U-Net guidance for edge-preserving refinement.",
    category: "Medical Imaging",
    tags: ["PDE Denoising", "MRI Relaxation", "Unrolled Nets", "PyTorch"],
    github: "https://github.com/tushar-nayak/neural-anisotropic-diffusion",
    demo: null,
    highlight: false,
    simLogs: [
      "[PDE] Initializing anisotropic diffusion coefficients...",
      "[UNROLLING] Unrolling solver step 1 of 5. Edge-preserving mode...",
      "[UNET] Predicting spatial adaptivity scale parameters...",
      "[FILTER] Denoising. PSNR improved from 24.2dB to 38.5dB...",
      "[SUCCESS] MRI noise filtered. Boundary edges preserved."
    ]
  },
  {
    id: 6,
    title: "lobe-ranger",
    desc: "A prototype multi-scale ordinal pathology foundation network (MOPFN) that fuses 20x and 40x whole-slide pathology scans to preserve architectural (macro) and cytological (micro) tissue contexts via bidirectional cross-attention.",
    category: "Cancer & Pathology",
    tags: ["Pathology Foundation Net", "Whole Slide Imaging", "Cross-Attention"],
    github: "https://github.com/tushar-nayak/lobe-ranger",
    demo: null,
    highlight: true,
    simLogs: [
      "[MACRO] Loading 20x whole slide scan patch matrix...",
      "[MICRO] Extracting 40x cellular scale coordinates...",
      "[CROSS-ATTN] Running bidirectional cross-attention mapping...",
      "[PATHOLOGY] Compiling ordinal severity scales (Grade I - IV)...",
      "[SUCCESS] Patient diagnosis resolved: Grade II, Conf = 0.941."
    ]
  },
  {
    id: 7,
    title: "Spatiotemporal Glioblastoma Evolution Visual Prediction",
    desc: "History-conditioned forecasting of brain tumor growth using 2D/3D Attention U-Nets coupled with Neural ODE flow models. Validated on the full clinical LUMIERE dataset with SimpleITK volumetric co-registration, achieving 46.8% improved boundary prediction accuracy.",
    category: "Medical Imaging",
    tags: ["Neural ODEs", "Glioblastoma", "Attention U-Net", "SimpleITK"],
    github: "https://github.com/tushar-nayak/glioblastoma-evolution",
    demo: null,
    highlight: false,
    simLogs: [
      "[SIMPLEITK] Registering historic timepoints T0, T1, T2...",
      "[ATTN-UNET] Extracting tumor core features...",
      "[ODE] Forecasting spatiotemporal growth tensor forward 30 days...",
      "[SUCCESS] Glioblastoma boundary forecast compiled. Area match IoU = 0.84."
    ]
  },
  {
    id: 8,
    title: "CTA to Mesh Coronary Artery Segmentation",
    desc: "Monolithic pipeline for 3D coronary artery extraction from CT angiographs (CTA) to volumetric meshes and point-clouds. Leverages customized Residual 3D U-Net, MONAI core modules, VTK surface extraction, and marching cubes mesh processing.",
    category: "Medical Imaging",
    tags: ["3D U-Net", "MONAI", "VTK Mesh Export", "Marching Cubes"],
    github: "https://github.com/tushar-nayak/lungvolseg",
    demo: null,
    highlight: false,
    simLogs: [
      "[MONAI] Preprocessing 3D CTA voxels. Scaling spacing...",
      "[RES-3D] segmenting left main & circumflex arteries...",
      "[VTK] Extracting polygonal boundary meshes...",
      "[SUCCESS] marching cubes exported .obj mesh with 45,000 points."
    ]
  },
  {
    id: 9,
    title: "DermaSeg",
    desc: "High-accuracy skin lesion boundary segmentation project evaluated on the ISIC 2018 benchmark. Built around DeepLabV3+ with custom transformer-based backbone models and dense skip connection U-Net variants.",
    category: "Cancer & Pathology",
    tags: ["DeepLabV3+", "Transformers", "ISIC 2018", "Skin Lesions"],
    github: "https://github.com/tushar-nayak/derma-seg",
    demo: null,
    highlight: false,
    simLogs: [
      "[ISIC] Preprocessing dermoscopy image patches...",
      "[TRANSFORMER] Querying self-attention layers on skin pixels...",
      "[DEEPLAB] Performing ASPP dense feature projection...",
      "[SUCCESS] Segmentation boundary mask generated. Dice score = 0.931."
    ]
  },
  {
    id: 10,
    title: "Attention-augmented Mammogram Alignment",
    desc: "Dual-view mammography alignment system that simultaneously parses cranio-caudal (CC) and medio-lateral oblique (MLO) views of the breast to fuse corresponding lesion areas and enhance BI-RADS clinical classification.",
    category: "Cancer & Pathology",
    tags: ["Mammography", "BI-RADS", "Dual-View Fusion", "Mammogram CC/MLO"],
    github: "https://github.com/tushar-nayak/grading-cbisddsm",
    demo: null,
    highlight: false,
    simLogs: [
      "[INPUT] Loading CC View and corresponding MLO View...",
      "[ALIGN] Running affine registration between mammographic projections...",
      "[FUSION] Attending to localized tissue densities across views...",
      "[SUCCESS] BI-RADS assessment: Category 4 (Suspicious), Conf = 0.88."
    ]
  },
  {
    id: 11,
    title: "neural-active-contours",
    desc: "Differentiable snake / active contour model layers unrolled into deep learning backbones. Enables training neural network encoders with explicit structural geometric priors for boundary convergence.",
    category: "Medical Imaging",
    tags: ["Active Contours", "Differentiable Snaking", "Geometric Priors"],
    github: "https://github.com/tushar-nayak/neural-active-contours",
    demo: null,
    highlight: false,
    simLogs: [
      "[SNAKE] Loading elastic, tension, and balloon forces...",
      "[ENCODER] Generating energy fields on biological boundaries...",
      "[DIFFERENTIABLE] Propagating contour coordinates down network...",
      "[SUCCESS] Snake converged in 8 neural iterations. Loss = 0.001."
    ]
  },
  {
    id: 12,
    title: "glass-path",
    desc: "Whole-slide histopathology scanner simulator and diagnostic classifier, validating cell classification pipelines on massive digital tissue slices.",
    category: "Cancer & Pathology",
    tags: ["Histopathology", "Digital Pathology", "Classifier Pipelines"],
    github: "https://github.com/tushar-nayak/glass-path",
    demo: null,
    highlight: false,
    simLogs: [
      "[SIMULATOR] Parsing 8.4 GB whole slide file...",
      "[TILE] Slicing image into 12,000 sub-tiles in memory...",
      "[CELL] Classifying nuclei profiles using ResNet backbone...",
      "[SUCCESS] Cell classification completed. Found 4,231 malignant profiles."
    ]
  },
  {
    id: 13,
    title: "Multi-Model Oral Squamous Cell Carcinoma Detection",
    desc: "Multi-modal model stack analyzing biopsy histopathological imaging and patient clinical parameters to classify early-stage Oral Squamous Cell Carcinoma.",
    category: "Cancer & Pathology",
    tags: ["OSCC Detection", "Biopsy Analysis", "Ensemble Learning"],
    github: "https://github.com/tushar-nayak",
    demo: null,
    highlight: false,
    simLogs: [
      "[PATHOLOGY] Scanning cell keratinization clusters...",
      "[CLINICAL] Parsing demographic risk factor arrays...",
      "[ENSEMBLE] Fusing histopathology CNN scores and risk trees...",
      "[SUCCESS] OSCC likelihood evaluated: 82.4% (Early Stage)."
    ]
  },
  {
    id: 14,
    title: "Neural Correlates of Emotional Imaging",
    desc: "Investigating spatial neural activation profiles and EEG electrode correlates corresponding to visual affective image stimulations.",
    category: "Medical Imaging",
    tags: ["EEG Analysis", "Neural Correlates", "Emotional Diagnostics"],
    github: "https://github.com/tushar-nayak",
    demo: null,
    highlight: false,
    simLogs: [
      "[EEG] Aligning multi-electrode channels: Fp1, Fp2, Cz...",
      "[SIGNAL] Performing Fast Fourier Transform (FFT) noise filters...",
      "[CORRELATE] Mapping alpha/beta power asymmetry to image timelines...",
      "[SUCCESS] Emotion score: Positive valence, activation verified."
    ]
  },
  {
    id: 15,
    title: "Monkeypox Virus XAI Diagnostics",
    desc: "Clinical support skin lesion classification system augmented with explainable artificial intelligence (XAI) overlays (Grad-CAM, SHAP, Integrated Gradients).",
    category: "Medical Imaging",
    tags: ["Explainable AI", "Grad-CAM", "SHAP", "Skin Lesions"],
    github: "https://github.com/tushar-nayak/derma-seg",
    demo: null,
    highlight: false,
    simLogs: [
      "[XAI] Generating Grad-CAM activation heatmap overlay...",
      "[SHAP] Calculating pixel contribution values...",
      "[SUCCESS] Diagnostic support maps exported. Saliency matched."
    ]
  },
  {
    id: 16,
    title: "Fetal Anomaly Ultrasound Diagnostic Support",
    desc: "Ultrasound-based morphological measurement helper, detecting fetal developmental anomalies using transfer learning during ICMR research stint.",
    category: "Medical Imaging",
    tags: ["Ultrasound", "Fetal Morphometrics", "Diagnostic Support"],
    github: "https://github.com/tushar-nayak",
    demo: null,
    highlight: false,
    simLogs: [
      "[ULTRASOUND] Segmenting cerebral ventricle indices...",
      "[CALIPER] Computing morphological diameter measurements...",
      "[SUCCESS] calipers calibrated. Index is within standard deviation."
    ]
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [projectFilter, setProjectFilter] = useState('All');
  const [pubSearch, setPubSearch] = useState('');
  const [pubFilter, setPubFilter] = useState('All'); // 'All' or 'Selected'
  const [pubSort, setPubSort] = useState('year'); // 'year' or 'title'
  const [pubType, setPubType] = useState('All'); // 'All', 'Journal', 'Conference'
  
  // Interactive BibTeX viewer modal state
  const [activeBibPub, setActiveBibPub] = useState(null);
  const [copiedBib, setCopiedBib] = useState(false);

  // Expanded timeline accordion state
  const [expandedTimeline, setExpandedTimeline] = useState(null);

  // 3D Scanner widget interactive state
  const [scanCoords, setScanCoords] = useState({ x: 124.52, y: 84.18, z: 9.31 });
  const [scanStatus, setScanStatus] = useState("SYSTEM READY");
  const [widgetClicks, setWidgetClicks] = useState(0);
  const [widgetSpinRate, setWidgetSpinRate] = useState(15);

  // Dynamic algorithm simulator state per project
  const [simulations, setSimulations] = useState({}); // project_id -> { active: bool, logs: array, step: int }

  // 3D scanner widget hover coordinate generator
  const handleScannerMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 200).toFixed(2);
    const y = ((e.clientY - rect.top) / rect.height * 200).toFixed(2);
    const z = (Math.sin(e.clientX * 0.05) * 50 + 20).toFixed(2);
    setScanCoords({ x, y, z });
    if (Math.random() > 0.85) {
      const statuses = ["SCANNING TARGET...", "ANALYST ACTIVE", "SOLVING ODE...", "CT REGISTRATION...", "SPECULAR REMOVAL..."];
      setScanStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }
  };

  const handleScannerClick = () => {
    setWidgetClicks(prev => prev + 1);
    setWidgetSpinRate(2);
    setScanStatus("RE-CALIBRATING TARGET...");
    setTimeout(() => {
      setWidgetSpinRate(15);
      setScanStatus("CALIBRATION COMPLETE (99.92%)");
    }, 1500);
  };

  // Run Project simulation logs
  const triggerSimulation = (projId, simLogs) => {
    if (simulations[projId]?.active) return; // already active

    // Reset/Initialize state
    setSimulations(prev => ({
      ...prev,
      [projId]: { active: true, logs: [], step: 0 }
    }));

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < simLogs.length) {
        setSimulations(prev => {
          const currentSim = prev[projId];
          if (!currentSim) return prev;
          return {
            ...prev,
            [projId]: {
              ...currentSim,
              logs: [...currentSim.logs, simLogs[currentStep]],
              step: currentStep + 1
            }
          };
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Finished status
          setSimulations(prev => ({
            ...prev,
            [projId]: { ...prev[projId], active: false }
          }));
        }, 1000);
      }
    }, 450);
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === projectFilter);
  }, [projectFilter]);

  // Filter, sort, and process publications
  const filteredPublications = useMemo(() => {
    let result = PUBLICATIONS.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(pubSearch.toLowerCase()) ||
        pub.tags.some(tag => tag.toLowerCase().includes(pubSearch.toLowerCase())) ||
        pub.venue.toLowerCase().includes(pubSearch.toLowerCase());
      
      const matchesFilter = pubFilter === 'All' || (pubFilter === 'Selected' && pub.selected);
      const matchesType = pubType === 'All' || pub.type === pubType;
      
      return matchesSearch && matchesFilter && matchesType;
    });

    // Sort
    return result.sort((a, b) => {
      if (pubSort === 'year') {
        return b.year - a.year; // Latest first
      } else {
        return a.title.localeCompare(b.title); // Alphabetical
      }
    });
  }, [pubSearch, pubFilter, pubSort, pubType]);

  // Copy BibTeX handler
  const handleCopyBibText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <div className="page-container">
      {/* Dynamic interactive Canvas Network */}
      <NeuralBackground />

      {/* Decorative blurred backgrounds */}
      <div className="glow-blur-1"></div>
      <div className="glow-blur-2"></div>

      {/* FLOATING GLASS NAVIGATION HEADER */}
      <header style={{
        position: 'sticky',
        top: '1.5rem',
        zIndex: 50,
        margin: '0 auto',
        maxWidth: '750px',
        padding: '0 1rem',
      }}>
        <div style={{
          background: 'rgba(10, 11, 14, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 242, 254, 0.15)',
          borderRadius: '24px',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
        }}>
          {/* Logo / Initials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--grad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.85rem',
              color: '#000',
              boxShadow: '0 0 10px rgba(0, 242, 254, 0.4)'
            }}>
              TN
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '0.95rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>tushar.vision</span>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            {['about', 'research', 'projects', 'timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  background: activeTab === tab ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  border: activeTab === tab ? '1px solid rgba(0, 242, 254, 0.25)' : '1px solid transparent',
                  color: activeTab === tab ? 'var(--primary-cyan)' : 'var(--text-secondary)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  fontFamily: 'var(--font-heading)'
                }}
                className={activeTab === tab ? 'pulse-glow' : ''}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="content-wrapper" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '6rem' }}>
        
        {/* HERO / BIO SECTION */}
        <section id="about" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '3rem',
            alignItems: 'center'
          }} className="responsive-hero-grid">
            
            {/* Left Column: Brief details */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-teal">
                  <Stethoscope size={12} style={{ marginRight: '0.25rem' }} />
                  Robotic Tele-surgery
                </span>
                <span className="badge badge-emerald">
                  <Cpu size={12} style={{ marginRight: '0.25rem' }} />
                  Physics informed AI
                </span>
              </div>
              
              <h1 style={{ fontSize: '3.75rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                Tushar <span className="gradient-text">Nayak</span>
              </h1>
              
              <p style={{
                fontSize: '1.35rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '400',
                marginBottom: '1.5rem',
                lineHeight: '1.4'
              }}>
                Graduate Researcher at <span style={{ color: 'var(--primary-cyan)', fontWeight: '500' }}>Carnegie Mellon University</span>
              </p>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '650px', lineHeight: '1.7' }}>
                Hey there! I am pursuing a research-oriented Masters in the <span style={{ color: 'var(--text-primary)' }}>Biomedical Engineering</span> department at CMU, advised by <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Prof. Kenji Shimada</span> in the <span style={{ color: 'var(--text-primary)' }}>Steffey Robotics Lab</span>. My focus lies at the intersection of computer vision, differentiable rendering, and physics-based learning models to automate and guide surgical robotics through real-time medical imaging.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="mailto:tusharn@andrew.cmu.edu" className="btn btn-primary">
                  <Mail size={18} />
                  tusharn@andrew.cmu.edu
                </a>
                <a href="https://github.com/tushar-nayak" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={18} />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right Column: Ultra-Interactive 3D Scanning Visual Widget (Medical Target) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                className="glass-panel pulse-glow"
                onMouseMove={handleScannerMouseMove}
                onClick={handleScannerClick}
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(10, 11, 14, 0.4)',
                  borderColor: 'rgba(0, 242, 254, 0.25)',
                  cursor: 'crosshair',
                  boxShadow: '0 0 40px rgba(0, 242, 254, 0.05)',
                  borderRadius: '24px'
                }}
              >
                {/* Custom CSS spinning scanner ring */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(0, 242, 254, 0.3)',
                  animation: `spin ${widgetSpinRate}s linear infinite`,
                  pointerEvents: 'none'
                }} />
                
                <div style={{
                  position: 'absolute',
                  width: '85%',
                  height: '85%',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 245, 160, 0.12)',
                  animation: `spin-reverse ${widgetSpinRate * 0.8}s linear infinite`,
                  pointerEvents: 'none'
                }} />

                {/* Micro target dots */}
                <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-cyan)', top: '15%', left: '15%', boxShadow: '0 0 10px var(--primary-cyan)' }} />
                <div style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', bottom: '15%', right: '15%', boxShadow: '0 0 10px var(--accent-emerald)' }} />
                
                {/* Glowing central target node */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 242, 254, 0.8) 0%, transparent 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0, 242, 254, 0.5)',
                  animation: 'pulse-glow 2.5s infinite ease-in-out',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  <Eye size={22} color="#000" />
                </div>

                {/* Rotating crosshair simulation lines */}
                <div style={{
                  position: 'absolute',
                  width: '2px',
                  height: '110%',
                  background: 'linear-gradient(transparent, var(--primary-cyan), transparent)',
                  transform: 'rotate(45deg)',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '2px',
                  height: '110%',
                  background: 'linear-gradient(transparent, var(--accent-emerald), transparent)',
                  transform: 'rotate(-45deg)',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }} />

                {/* Floating click prompt overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-cyan)',
                  letterSpacing: '0.05em',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 242, 254, 0.15)',
                  pointerEvents: 'none'
                }}>
                  CLICK TO RE-CALIBRATE
                </div>
              </div>

              {/* Real-time Tracking Info Dashboard Widget */}
              <div className="glass-panel" style={{
                marginTop: '1rem',
                width: '280px',
                padding: '0.85rem 1.25rem',
                borderColor: 'var(--border-glow)',
                background: 'rgba(10, 11, 14, 0.7)',
                borderRadius: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>3D SCANNER TELEMETRY</span>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: scanStatus.startsWith("RE-") ? 'var(--primary-cyan)' : 'var(--accent-emerald)', boxShadow: '0 0 10px currentColor' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontWeight: '600', fontFamily: 'var(--font-heading)' }} className="pulse-glow">{scanStatus}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>COORD_X</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.x}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>COORD_Y</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.y}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>COORD_Z</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.z}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* RESEARCH & PUBLICATIONS SECTION */}
        <section id="research" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BookOpen className="gradient-text" />
                  Research & Publications
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                  Investigating AI-assisted clinical diagnosis and medical computer vision.
                </p>
              </div>

              {/* Toggles, Searches and Sort Criteria */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '650px' }}>
                
                {/* Search Input */}
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search publications by title, venue, or keywords..."
                    value={pubSearch}
                    onChange={(e) => setPubSearch(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(10, 11, 14, 0.6)',
                      border: '1px solid var(--border-glow)',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem 0.65rem 2.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-glow)'}
                  />
                </div>

                {/* Filters, Types and Sort Toggles Grid */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  
                  {/* Category Toggle: All vs Selected */}
                  <div style={{ display: 'flex', gap: '0.25rem', background: '#0a0b0e', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    {['All', 'Selected'].map(f => (
                      <button
                        key={f}
                        onClick={() => setPubFilter(f)}
                        style={{
                          background: pubFilter === f ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                          border: 'none',
                          color: pubFilter === f ? 'var(--primary-cyan)' : 'var(--text-secondary)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        {f === 'All' ? 'All Papers' : 'Selected'}
                      </button>
                    ))}
                  </div>

                  {/* Type Filter: All vs Journal vs Conference */}
                  <div style={{ display: 'flex', gap: '0.25rem', background: '#0a0b0e', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    {['All', 'Journal', 'Conference'].map(t => (
                      <button
                        key={t}
                        onClick={() => setPubType(t)}
                        style={{
                          background: pubType === t ? 'rgba(0, 245, 160, 0.08)' : 'transparent',
                          border: 'none',
                          color: pubType === t ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Sort By Toggle: Year vs Title */}
                  <div style={{ display: 'flex', gap: '0.25rem', background: '#0a0b0e', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    {['year', 'title'].map(s => (
                      <button
                        key={s}
                        onClick={() => setPubSort(s)}
                        style={{
                          background: pubSort === s ? 'rgba(79, 172, 254, 0.08)' : 'transparent',
                          border: 'none',
                          color: pubSort === s ? 'var(--primary-teal)' : 'var(--text-secondary)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'var(--transition-fast)',
                          textTransform: 'capitalize'
                        }}
                      >
                        Sort: {s}
                      </button>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Publications Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => (
                  <div key={pub.id} className="pub-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        {pub.selected && <span className="badge badge-emerald">Selected Publication</span>}
                        <span className="badge badge-teal">{pub.type}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={12} /> {pub.year}
                        </span>
                      </div>
                      <h3 className="pub-title">{pub.title}</h3>
                      <p className="pub-authors">{pub.authors}</p>
                      <p className="pub-venue">{pub.venue}</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        {pub.tags.map((tag, idx) => (
                          <span key={idx} style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <button
                        onClick={() => setActiveBibPub(pub)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--text-secondary)',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <ClipboardCopy size={14} />
                        Get BibTeX
                      </button>
                      <a
                        href={pub.link}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--border-glow)',
                          color: 'var(--primary-cyan)',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          textDecoration: 'none',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <ExternalLink size={14} />
                        View
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No publications matched your search terms or filters.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PROJECTS SHOWCASE SECTION */}
        <section id="projects" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FolderGit2 className="gradient-text" />
              Projects Portfolio & Diagnostics Lab
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Interact with the systems below! You can **run mock algorithm diagnostics** directly inside each project card.
            </p>
          </div>

          {/* Project Categories */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {['All', '3D & Robotics', 'Medical Imaging', 'Cancer & Pathology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                style={{
                  background: projectFilter === cat ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.02)',
                  border: projectFilter === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                  color: projectFilter === cat ? '#000' : 'var(--text-secondary)',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: projectFilter === cat ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="project-grid">
            {filteredProjects.map((project) => {
              const currentSim = simulations[project.id];
              return (
                <div
                  key={project.id}
                  className="glass-panel project-card"
                  style={{
                    background: project.highlight ? 'radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.04), rgba(18, 20, 28, 0.75) 75%)' : 'var(--bg-surface-glass)',
                    borderColor: currentSim?.active 
                      ? 'var(--accent-emerald)' 
                      : (project.highlight ? 'rgba(0, 242, 254, 0.3)' : 'var(--border-glow)'),
                    boxShadow: currentSim?.active 
                      ? '0 0 20px rgba(0, 245, 160, 0.15)' 
                      : (project.highlight ? '0 0 20px rgba(0, 242, 254, 0.05)' : 'none')
                  }}
                >
                  <div className="project-card-header">
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                      {project.category}
                    </span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {project.highlight && (
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.desc}</p>

                  {/* INTERACTIVE ALGORITHM SIMULATOR WINDOW (TERMINAL EFFECT) */}
                  <div style={{
                    background: '#07080a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    marginBottom: '1.25rem',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}>
                    {/* Console header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Terminal size={12} />
                        DIAGNOSTICS_LAB_V1
                      </span>
                      <button
                        onClick={() => triggerSimulation(project.id, project.simLogs)}
                        disabled={currentSim?.active}
                        style={{
                          background: currentSim?.active ? 'rgba(0, 245, 160, 0.12)' : 'rgba(0, 242, 254, 0.1)',
                          border: 'none',
                          color: currentSim?.active ? 'var(--accent-emerald)' : 'var(--primary-cyan)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          cursor: currentSim?.active ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: '600',
                          fontSize: '0.65rem'
                        }}
                      >
                        {currentSim?.active ? (
                          <>
                            <Sparkles size={10} className="pulse-glow" />
                            SOLVING...
                          </>
                        ) : (
                          <>
                            <Play size={10} />
                            SIMULATE
                          </>
                        )}
                      </button>
                    </div>

                    {/* Console Log Outputs */}
                    <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '72px' }}>
                      {currentSim && currentSim.logs.length > 0 ? (
                        currentSim.logs.map((log, idx) => (
                          <div key={idx} style={{
                            color: log.startsWith("[SUCCESS]") ? 'var(--accent-emerald)' : (log.startsWith("[ODE]") ? 'var(--primary-teal)' : 'var(--text-secondary)'),
                            whiteSpace: 'pre-wrap'
                          }}>
                            {log}
                          </div>
                        ))
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          Terminal Idle. Click 'SIMULATE' to trigger physics solvers.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={14} />
                      Repository
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GraduationCap className="gradient-text" />
              Academic & Research Timeline
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Tracing my journey across institutions and advisor groups. Click items to toggle detailed breakdowns.
            </p>
          </div>

          <div className="timeline">
            
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div
                className="glass-panel"
                onClick={() => setExpandedTimeline(expandedTimeline === 1 ? null : 1)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Carnegie Mellon University
                      <span className="badge badge-teal">Graduate Research</span>
                    </h3>
                    <p style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>
                      Masters in Biomedical Engineering (Advised by Prof. Kenji Shimada)
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> 2024 - Present
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>
                  Focusing on 2D angiography to 3D CT vascular registration for haptically-assisted endovascular catheters using physics-informed neural solvers and Neural ODE flows.
                </p>

                {(expandedTimeline === 1 || expandedTimeline === null) && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '1rem', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <strong>Key Contributions:</strong> Developed differentiable volumetric slice projection systems to guide neural deformable registrations. Built specular reflection removal overlays using real surgical laparoscopic datasets inside Steffey Lab Scaife Hall.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald">PyTorch</span>
                      <span className="badge badge-emerald">Differentiable Rendering</span>
                      <span className="badge badge-emerald">MONAI Core</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div
                className="glass-panel"
                onClick={() => setExpandedTimeline(expandedTimeline === 2 ? null : 2)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      IIT Hyderabad
                      <span className="badge badge-teal">Research Fellowship</span>
                    </h3>
                    <p style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>
                      Motion Capture & Electromyography Computing Specialist
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> 2023 - 2024
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>
                  Designed algorithmic solvers mapping musculoskeletal loading constraints and multi-channel EMG microvolts to verify exercise postures.
                </p>

                {expandedTimeline === 2 && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '1rem', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <strong>Key Contributions:</strong> Deployed real-time pipelines processing Vicon skeletal tracks to evaluate muscle activation anomalies and predict skeletal strain profiles.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald">EMG Signal Computing</span>
                      <span className="badge badge-emerald">Kinematics</span>
                      <span className="badge badge-emerald">SciPy Stack</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div
                className="glass-panel"
                onClick={() => setExpandedTimeline(expandedTimeline === 3 ? null : 3)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Indian Council of Medical Research
                      <span className="badge badge-teal">Project Associate</span>
                    </h3>
                    <p style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>
                      Fetal Ultrasound Anomaly Diagnostics Researcher
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> 2022 - 2023
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>
                  Trained deep segmentation networks to map fetal anatomical features and automate standard diagnostic measurements on 2D ultrasound scans.
                </p>

                {expandedTimeline === 3 && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '1rem', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <strong>Key Contributions:</strong> Developed automated morphometric estimation overlays running under 150ms per scan, aiding clinicians in standard diagnostics protocols.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald">Medical Ultrasound</span>
                      <span className="badge badge-emerald">Segmentation</span>
                      <span className="badge badge-emerald">XAI</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div
                className="glass-panel"
                onClick={() => setExpandedTimeline(expandedTimeline === 4 ? null : 4)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Manipal Institute of Technology
                      <span className="badge badge-teal">Undergraduate Major</span>
                    </h3>
                    <p style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>
                      B.Tech in Biomedical Engineering, Minor in Data Science (BML Lab researcher)
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> 2018 - 2022
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>
                  Graduated with top marks, publishing deep diagnostic models mapping skin anomalies (monkeypox), oral malignancies, and blood leukemia indices.
                </p>

                {expandedTimeline === 4 && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '1rem', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <strong>Key Contributions:</strong> Advised by Prof. Niranjana S and Dr. Krishnaraj Chadaga at Biomedical Computing Lab. Published 5 clinical computer vision papers inside IEEE/Springer journals.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald">Biomedical Engineering</span>
                      <span className="badge badge-emerald">Pattern Recognition</span>
                      <span className="badge badge-emerald">Data Science Minor</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* CALL TO ACTION & FOOTER SECTION */}
        <section id="contact" style={{ scrollMarginTop: '8rem', marginTop: '6rem' }}>
          <div className="glass-panel" style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.1), var(--bg-surface-glass) 80%)',
            borderColor: 'rgba(0, 242, 254, 0.3)',
            padding: '3rem',
            textAlign: 'center',
            borderRadius: '24px'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
              Let's Connect & <span className="gradient-text">Collaborate</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.7' }}>
              I am always happy to discuss research collaborations, computer vision innovations, or image-guided medical robotics projects. Reach out via email or connect on social platforms!
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyValue: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="mailto:tusharn@andrew.cmu.edu" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
                <Mail size={18} />
                Send an Email
              </a>
              <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
                <Linkedin size={18} />
                LinkedIn Profile
              </a>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500', fontFamily: 'var(--font-heading)' }}>Tushar Nayak</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={12} /> Pittsburgh, PA
                </p>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                &copy; 2026 Tushar Nayak. Powered by React + Vite.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* BibTeX Modal Overlay */}
      {activeBibPub && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '600px',
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--primary-cyan)',
            boxShadow: '0 0 30px rgba(0, 242, 254, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Citation BibTeX</h3>
              <button
                onClick={() => setActiveBibPub(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0 0.5rem',
                  transition: 'var(--transition-fast)'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary-cyan)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                &times;
              </button>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{activeBibPub.title}</p>
            
            <pre style={{
              background: '#07080a',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '1rem',
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: 'var(--primary-cyan)',
              maxHeight: '220px'
            }}>
              {activeBibPub.bibtex}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => handleCopyBibText(activeBibPub.bibtex)}
                style={{
                  background: copiedBib ? 'rgba(0, 245, 160, 0.12)' : 'var(--grad-primary)',
                  border: 'none',
                  color: copiedBib ? 'var(--accent-emerald)' : '#000',
                  fontWeight: '600',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'var(--transition-fast)'
                }}
              >
                {copiedBib ? <Check size={14} /> : <ClipboardCopy size={14} />}
                {copiedBib ? 'Copied to Clipboard' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
