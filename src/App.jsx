import { useState, useMemo } from 'react';
import {
  GraduationCap,
  BookOpen,
  FolderGit2,
  Calendar,
  Search,
  ExternalLink,
  Globe,
  ClipboardCopy,
  Check,
  Cpu,
  ScanEye,
  MapPin,
  Stethoscope,
  Presentation,
  ChevronDown,
  Play,
  Sparkles
} from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';
import ProjectVisual from './components/ProjectVisual';
import ProfileSplat from './components/ProfileSplat';
import CursorTrail from './components/CursorTrail';

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

const ScholarIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

// Full publications dataset
const PUBLICATIONS = [
  {
    id: 1,
    title: "Automated histopathological detection and classification of lung cancer with an image pre-processing pipeline and spatial attention with deep neural networks",
    authors: "Tushar Nayak, Nitila Gokulkrishnan, Krishnaraj Chadaga, Niranjana Sampathila, Hilda Mayrose, Swathi KS",
    venue: "Cogent Engineering",
    year: 2024,
    type: "Journal",
    tags: ["Lung Cancer", "Spatial Attention", "Histopathology"],
    selected: true,
    link: "https://doi.org/10.1080/23311916.2024.2357182",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:zYLM7Y9cAGgC",
    bibtex: `@article{nayak2024automated,
  abbr={lung-cogent},
  title={Automated histopathological detection and classification of lung cancer with an image pre-processing pipeline and spatial attention with deep neural networks},
  author={Nayak, Tushar and Gokulkrishnan, Nitila and Chadaga, Krishnaraj and Sampathila, Niranjana and Mayrose, Hilda and KS, Swathi},
  journal={Cogent Engineering},
  volume={11},
  pages={2357182},
  year={2024},
  publisher={Taylor \\& Francis},
  doi={10.1080/23311916.2024.2357182},
  url={https://doi.org/10.1080/23311916.2024.2357182},
  selected={true}
}`
  },
  {
    id: 2,
    title: "Deep learning based detection of monkeypox virus using skin lesion images",
    authors: "Tushar Nayak, Krishnaraj Chadaga, Niranjana Sampathila, Hilda Mayrose, Nitila Gokulkrishnan, Srikanth Prabhu, Shashikiran Umakanth, et al.",
    venue: "Medicine in Novel Technology and Devices",
    year: 2023,
    type: "Journal",
    tags: ["Monkeypox", "Skin Lesions", "Deep Learning"],
    selected: true,
    link: "https://doi.org/10.1016/j.medntd.2023.100243",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:u-x6o8ySG0sC",
    bibtex: `@article{nayak2023deep,
  abbr={mpox-mintad},
  title={Deep learning based detection of monkeypox virus using skin lesion images},
  author={Nayak, Tushar and Chadaga, Krishnaraj and Sampathila, Niranjana and Mayrose, Hilda and Gokulkrishnan, Nitila and Prabhu, Srikanth and Umakanth, Shashikiran and others},
  journal={Medicine in Novel Technology and Devices},
  volume={18},
  pages={100243},
  year={2023},
  month={June},
  publisher={Elsevier},
  doi={10.1016/j.medntd.2023.100243},
  url={https://doi.org/10.1016/j.medntd.2023.100243}
}`
  },
  {
    id: 3,
    title: "Detection of Monkeypox from skin lesion images using deep learning networks and explainable artificial intelligence",
    authors: "Tushar Nayak, Krishnaraj Chadaga, Niranjana Sampathila, Hilda Mayrose, G Muralidhar Bairy, Srikanth Prabhu, Swathi S Katta, Shashikiran Umakanth",
    venue: "Applied Mathematics in Science and Engineering",
    year: 2023,
    type: "Journal",
    tags: ["Explainable AI (XAI)", "Monkeypox", "Diagnostics"],
    selected: true,
    link: "https://doi.org/10.1080/27690911.2023.2225698",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:9yKSN-GCB0IC",
    bibtex: `@article{nayak2023detection,
  abbr={mpox-amisae},
  title={Detection of Monkeypox from skin lesion images using deep learning networks and explainable artificial intelligence},
  author={Nayak, Tushar and Chadaga, Krishnaraj and Sampathila, Niranjana and Mayrose, Hilda and Bairy, G Muralidhar and Prabhu, Srikanth and Katta, Swathi S and Umakanth, Shashikiran},
  journal={Applied Mathematics in Science and Engineering},
  volume={31},
  pages={2225698},
  year={2023},
  publisher={Taylor \\& Francis},
  doi={10.1080/27690911.2023.2225698},
  url={https://doi.org/10.1080/27690911.2023.2225698}
}`
  },
  {
    id: 4,
    title: "An explainable artificial intelligence integrated system for automatic detection of dengue from images of blood smears using transfer learning",
    authors: "Hilda Mayrose, Niranjana Sampathila, G Muralidhar Bairy, Tushar Nayak, Sushma Belurkar, Kavitha Saravu",
    venue: "IEEE Access",
    year: 2024,
    type: "Journal",
    tags: ["Dengue", "Explainable AI", "Transfer Learning"],
    selected: false,
    link: "https://doi.org/10.1109/ACCESS.2024.3378516",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:IjCSPb-OGe4C",
    bibtex: `@article{mayrose2024explainable,
  abbr={dengue-access},
  title={An explainable artificial intelligence integrated system for automatic detection of dengue from images of blood smears using transfer learning},
  author={Mayrose, Hilda and Sampathila, Niranjana and Bairy, G Muralidhar and Nayak, Tushar and Belurkar, Sushma and Saravu, Kavitha},
  journal={IEEE Access},
  volume={12},
  pages={41750--41762},
  year={2024},
  publisher={IEEE},
  doi={10.1109/ACCESS.2024.3378516},
  url={https://doi.org/10.1109/ACCESS.2024.3378516}
}`
  },
  {
    id: 5,
    title: "Processing and Detection of Lung and Colon Cancer from Histopathological Images using Deep Residual Networks",
    authors: "Tushar Nayak, Niranjana Sampathila, Nitila Gokulkrishnan",
    venue: "IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)",
    year: 2023,
    type: "Conference",
    tags: ["Colon Cancer", "ResNet", "Histopathology"],
    selected: false,
    link: "https://doi.org/10.1109/CONECCT57959.2023.10234757",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:2osOgNQ5qMEC",
    bibtex: `@inproceedings{nayak2023processing,
  abbr={lchist-conecct23},
  title={Processing and Detection of Lung and Colon Cancer from Histopathological Images using Deep Residual Networks},
  author={Nayak, Tushar and Sampathila, Niranjana and Gokulkrishnan, Nitila},
  booktitle={2023 IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)},
  volume={12},
  pages={1--6},
  year={2023},
  organization={IEEE},
  doi={10.1109/CONECCT57959.2023.10234757},
  url={https://doi.org/10.1109/CONECCT57959.2023.10234757}
}`
  },
  {
    id: 6,
    title: "Deep learning approach for detection of Dengue fever from the microscopic images of blood smear",
    authors: "Hilda Mayrose, Niranjana Sampathila, G Muralidhar Bairy, Tushar Nayak, Sushma Belurkar, Kavitha Saravu",
    venue: "Journal of Physics: Conference Series",
    year: 2023,
    type: "Conference",
    tags: ["Dengue Fever", "Microscopic Imaging", "Classification"],
    selected: false,
    link: "https://doi.org/10.1088/1742-6596/2571/1/012005",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:UeHWp8X0CEIC",
    bibtex: `@inproceedings{mayrose2023deep,
  abbr={dengue-aicecs23},
  title={Deep learning approach for detection of Dengue fever from the microscopic images of blood smear},
  author={Mayrose, Hilda and Sampathila, Niranjana and Bairy, G Muralidhar and Nayak, Tushar and Belurkar, Sushma and Saravu, Kavitha},
  booktitle={Journal of Physics: Conference Series},
  volume={2571},
  pages={012005},
  year={2023},
  organization={IOP Publishing},
  doi={10.1088/1742-6596/2571/1/012005},
  url={https://doi.org/10.1088/1742-6596/2571/1/012005}
}`
  },
  {
    id: 7,
    title: "Deep learning-based analysis of blood smear images for detection of acute lymphoblastic leukemia",
    authors: "Nitila Gokulkrishnan, Tushar Nayak, Niranjana Sampathila",
    venue: "IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT)",
    year: 2023,
    type: "Conference",
    tags: ["Leukemia (ALL)", "Blood Smears", "Classification"],
    selected: false,
    link: "https://doi.org/10.1109/CONECCT57959.2023.10234757",
    scholar: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9xUX7NoAAAAJ&citation_for_view=9xUX7NoAAAAJ:qjMakFHDy7sC",
    bibtex: `@inproceedings{gokulkrishnan2023deep,
  abbr={all-conecct23},
  title={Deep learning-based analysis of blood smear images for detection of acute lymphoblastic leukemia},
  author={Gokulkrishnan, Nitla and Nayak, Tushar and Sampathila, Niranjana},
  booktitle={2023 IEEE international conference on electronics, computing and communication technologies (CONECCT)},
  pages={1--5},
  year={2023},
  organization={IEEE}
}`
  },
  {
    id: 8,
    title: "Automated Oral Squamous Cell Carcinoma Detection from Histopathological Images Using Deep Neural Networks",
    authors: "Tushar Nayak, Niranjana Sampathila",
    venue: "Journal of Biomedical Engineering Society of India",
    year: 2023,
    type: "Journal",
    tags: ["OSCC", "Oral Cancer", "Histopathology"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2023oc,
  abbr={nsrtbme-oralcancer},
  author={Nayak, Tushar and Sampathila, Niranjana},
  title={Automated Oral Squamous Cell Carcinoma Detection from Histopathological Images Using Deep Neural Networks},
  journal={Journal of Biomedical Engineering Society of India, Vol. 17},
  year={2023}
}`
  },
  {
    id: 9,
    title: "Binary Detection of Acute Lymphocytic Leukemia Using Blood Smear Images Using Deep Learning Models",
    authors: "Nitila Gokulkrishnan, Tushar Nayak, Niranjana Sampathila, Lavanya Dalmia, Reva Laghate",
    venue: "Journal of Biomedical Engineering Society of India",
    year: 2023,
    type: "Journal",
    tags: ["Leukemia", "Hematology", "Deep Learning"],
    selected: false,
    link: "#",
    bibtex: `@article{nayak2023lk,
  abbr={nsrtbme-leukemia},
  author={Gokulkrishnan, Nitila and Nayak, Tushar and Sampathila, Niranjana and Dalmia, Lavanya and Laghate, Reva},
  title={Binary Detection of Acute Lymphocytic Leukemia Using Blood Smear Images Using Deep Learning Models},
  journal={Journal of Biomedical Engineering Society of India, Vol. 17},
  year={2023}
}`
  }
];

// Full projects dataset
const PROJECTS = [
  {
    id: 1,
    title: "Physics-Informed Endovasculature Deformation Estimation & Registration",
    desc: "Advised by Dr. Kenji Shimada and Rishi Basdeo (CERLAB) in collaboration with UPMC neurosurgeons. Fuses 2D X-ray angiography features and pre-operative 3D centerlines using MorphPINN with a strain-preserving deformation graph system. Deploys custom CUDA-accelerated solvers.",
    category: "3D & Robotics",
    tags: ["Physics-Informed ML", "MorphPINN", "Vascular Registration", "Surgical Robotics"],
    github: "https://github.com/katahar/telesurgery_cerlab/tree/deformation-graph/cv/deformable_registration",
    demo: null,
    highlight: true,
    simLogs: [
      "[MORPHPINN] Loading angiography frames and pre-operative centerlines...",
      "[DEFORMATION] Building strain-preserving graph nodes along the vessel tree...",
      "[PROJECTION] Backprojecting 2D X-ray cues into 3D registration space...",
      "[OPTIMIZER] Updating deformation weights with mechanical constraints...",
      "[SUCCESS] Endovasculature registration locked. Mean target error = 0.74mm."
    ]
  },
  {
    id: 2,
    title: "Spatiotemporal Glioblastoma Evolution Visual Prediction",
    desc: "Advised by Dr. Pulkit Grover, Dr. Aswin Sankaranarayanan, and neurosurgeon Dr. Matthew J. Shepard, MD. Fuses multi-modal MRI sequences (FLAIR, T1, T2, cT1) from the LUMIERE cohort into a continuous-time Neural ODE flow framework for history-conditioned spatiotemporal tumor growth forecasting.",
    category: "Medical Imaging",
    tags: ["Neural ODEs", "Glioblastoma", "LUMIERE Cohort", "SimpleITK"],
    github: "https://github.com/tushar-nayak/glioblastoma-evolution",
    demo: "https://tushar-nayak.github.io/glioblastoma-evolution/",
    highlight: true,
    simLogs: [
      "[LUMIERE] Loading FLAIR, T1, T2, and cT1 sequences...",
      "[CO-REGISTRATION] Aligning multimodal MRI volumes in patient space...",
      "[NEURAL ODE] Fitting continuous-time tumor dynamics from history-conditioned scans...",
      "[FORECAST] Propagating lesion boundary forward 30 days...",
      "[SUCCESS] Glioblastoma evolution forecast complete. Dice Score = 0.885 | IoU = 0.824."
    ]
  },
  {
    id: 18,
    title: "CardiacReconstruction-Evolved: Gaussian Occupancy Cardiac Recovery",
    desc: "Implements sparse 3D cardiac volume recovery from sparse echocardiographic views. Employs stabilized 3D Gaussian occupancy fields, differentiable slice projection supervision, and high-fidelity mesh evaluation for clinical anatomical reconstruction.",
    category: "3D & Robotics",
    tags: ["3D Gaussian Occupancy", "Differentiable Projection", "Sparse Cardiac 3D", "Mesh Evaluation"],
    github: "https://github.com/tushar-nayak/cardiac-reconstruction-evolved",
    demo: "https://tushar-nayak.github.io/cardiac-reconstruction-evolved/",
    highlight: true,
    simLogs: [
      "[ECHO] Loading sparse 2D cardiac views from ultrasound...",
      "[OCCUPANCY] Seeding Gaussian fields across the ventricular volume...",
      "[PROJECTION] Matching slice supervision against echo contours...",
      "[MESH] Extracting a watertight cardiac surface with Marching Cubes...",
      "[SUCCESS] Cardiac recovery completed. Chamfer Distance = 0.92mm."
    ]
  },
  {
    id: 4,
    title: "Few-Shot 2D Echo to 3D Cardiac Reconstruction via Neural Implicit Priors",
    desc: "Course project for Learning for 3D Vision. Fuses Reptile meta-learning and 3D Implicit Neural Representations (INR) with Test-Time Optimization (TTO) to reconstruct high-fidelity patient-specific 3D ventricular shapes from sparse 2D echocardiograms, utilizing SE(3) pose refinement.",
    category: "3D & Robotics",
    tags: ["Reptile Meta-Learning", "Implicit Neural Reps", "Few-Shot 3D", "Cardiac Echo"],
    github: "https://github.com/tushar-nayak/cardiac-volume-reconstruction",
    demo: "https://tushar-nayak.github.io/cardiac-volume-reconstruction/",
    highlight: true,
    simLogs: [
      "[REPTILE] Loading the cardiac shape prior and support echo set...",
      "[TTO] Refining SE(3) pose offsets for sparse 2D views...",
      "[INR] Fitting implicit occupancy to patient-specific ventricular geometry...",
      "[MARCHING CUBES] Converting the field into a surface mesh...",
      "[SUCCESS] Few-shot cardiac reconstruction complete. Volume deviation = 2.1%."
    ]
  },
  {
    id: 10,
    title: "Neural Anisotropic Diffusion for Medical Image Relaxation",
    desc: "Course project for Medical Image Analysis. Unrolls the classical Perona-Malik Partial Differential Equation (PDE) into a differentiable network layer. Employs a context-aware MiniUNet to dynamically predict spatially adaptive diffusion conduction coefficients.",
    category: "Medical Imaging",
    tags: ["PDE Unrolling", "Anisotropic Diffusion", "MiniUNet", "Image Denoising"],
    github: "https://github.com/tushar-nayak/neural-anisotropic-diffusion",
    demo: "https://tushar-nayak.github.io/neural-anisotropic-diffusion/",
    highlight: true,
    simLogs: [
      "[PDE] Loading the noisy MRI slice and initializing diffusion terms...",
      "[UNROLLING] Running edge-preserving diffusion step 1 of 5...",
      "[MINIUNET] Predicting spatially adaptive conduction coefficients...",
      "[FILTER] Denoising in place. PSNR improved from 24.2dB to 38.5dB...",
      "[SUCCESS] MRI relaxation finished. Boundary edges preserved."
    ]
  },
  {
    id: 16,
    title: "SurgiPrompt: Open-Vocabulary Surgical Tool Detection & Tracking",
    desc: "Deploys open-vocabulary detection, segmentation, and tracking of surgical tools in clinical endoscopic and laparoscopic video feeds. Integrates Grounding DINO with Segment Anything 2 (SAM2) for zero-shot text-prompted instrument localized masking.",
    category: "3D & Robotics",
    tags: ["Grounding DINO", "SAM2", "Surgical Vision", "Open-Vocabulary tracking"],
    github: "https://github.com/tushar-nayak/surgi-prompt",
    demo: "https://tushar-nayak.github.io/surgi-prompt/",
    highlight: true,
    simLogs: [
      "[SURGIPROMPT] Loading laparoscopic frames and text prompts...",
      "[GROUNDING DINO] Detecting forceps, graspers, and needle drivers...",
      "[SAM2] Converting detections into surgical tool masks...",
      "[TRACKING] Propagating tool identities through the video sequence...",
      "[SUCCESS] Open-vocabulary tool tracking locked. Mean IoU = 0.892 | FPS = 42.5."
    ]
  },
  {
    id: 13,
    title: "EndoSemantic-Splat",
    desc: "Real-time deformable 3D scene reconstruction pipeline tailored for endoscopic and laparoscopic environments. Fuses sparse point-cloud initialization from depth maps, fast 3D Gaussian Splatting, and CLIP/LSeg-guided open-vocabulary semantic querying.",
    category: "3D & Robotics",
    tags: ["Deformable 3DGS", "Open-Vocabulary VLM", "Surgical Vision", "Real-Time Rendering"],
    github: "https://github.com/tushar-nayak/endo-splat/",
    demo: "https://tushar-nayak.github.io/endo-splat/",
    highlight: false,
    simLogs: [
      "[DEPTH] Initializing sparse depth cloud from the endoscopic scene...",
      "[SPLATTING] Rasterizing deformable Gaussians across the frame...",
      "[VLM] Injecting CLIP/LSeg semantics into the scene representation...",
      "[SEMANTIC] Querying forceps and tissue boundary labels...",
      "[SUCCESS] Endoscopic semantic splat stabilized. Specularity resolved in 4.2ms."
    ]
  },
  {
    id: 19,
    title: "VascularReconstruction: Sparse 3D Coronary Vessel Angiographic Recovery",
    desc: "Research prototype for sparse-view 3D coronary vessel reconstruction from sparse angiographic projections. Fuses explicit 3D Gaussian geometry, differentiable vascular raymarching, and PINN-based hemodynamic regularization to estimate arterial volumes.",
    category: "3D & Robotics",
    tags: ["Gaussian Geometry", "Differentiable Rendering", "Hemodynamics PINN", "Angiography"],
    github: "https://github.com/tushar-nayak/vascular-reconstruction",
    demo: "https://tushar-nayak.github.io/vascular-reconstruction/",
    highlight: false,
    simLogs: [
      "[ANGIOGRAPHY] Loading sparse coronary projections and centerline priors...",
      "[GAUSSIAN] Seeding vessel geometry along the artery tree...",
      "[RAYMARCH] Rendering projections through the vascular volume...",
      "[PINN] Applying flow-aware regularization to the reconstruction...",
      "[SUCCESS] Coronary vessel recovery complete. Mean surface voxel deviation = 0.52mm."
    ]
  },
  {
    id: 17,
    title: "LobeRanger: Gigapixel Multi-Scale Pathology Foundation Network",
    desc: "A prototype Multi-Scale Ordinal Pathology Foundation Network (MOPFN) that pairs 20x and 40x whole-slide pathology images. Preserves both global architectural and local cytologic context using bidirectional cross-attention fusion layers for high-resolution biopsy analysis.",
    category: "Cancer & Pathology",
    tags: ["Foundation Models", "Gigapixel WSI", "Pathology Staging", "Cross-Attention"],
    github: "https://github.com/tushar-nayak/lobe-ranger",
    demo: "https://tushar-nayak.github.io/lobe-ranger/",
    highlight: false,
    simLogs: [
      "[LOBERANGER] Loading paired 20x and 40x whole-slide images...",
      "[ATTENTION] Aligning macro-architecture with high-power cytology patches...",
      "[CLASSIFIER] Fusing cross-attention features into ordinal staging labels...",
      "[SUCCESS] Pathology staging complete. Grade II locked | F1-Score = 0.941."
    ]
  },
  {
    id: 8,
    title: "CTA to Mesh & Point-Cloud Coronary Artery Segmentation",
    desc: "Course project for Image Based Computational Modelling & Analysis. End-to-end 3D deep learning pipeline for automatic coronary artery tree extraction from CT angiography (CTA). Leverages a Residual 3D U-Net backbone, hybrid Dice-BCE loss, and Laplacian mesh smoothing.",
    category: "Medical Imaging",
    tags: ["Residual 3D U-Net", "Marching Cubes", "Laplacian Smoothing", "SimpleITK"],
    github: "https://github.com/tushar-nayak",
    demo: "https://tushar-nayak.github.io/assets/pdf/42640.pdf",
    highlight: false,
    simLogs: [
      "[CTA] Loading the coronary angiography volume and normalizing spacing...",
      "[RES-UNET] Segmenting Left Main, LAD, and downstream branches...",
      "[GEOMETRY] Extracting the coronary surface with Marching Cubes...",
      "[SMOOTHING] Applying Laplacian smoothing and mesh cleanup...",
      "[SUCCESS] Coronary artery mesh exported. Output contains 45,000 vertices."
    ]
  },
  {
    id: 9,
    title: "Attention-augmented Dual-View Mammogram Alignment",
    desc: "Course project for Projects in Biomedical AI. Deep learning pipeline for automatic alignment and BI-RADS classification of dual-view mammograms (Craniocaudal [CC] and Mediolateral Oblique [MLO]). Leverages Spatial Transformer Networks (STNs) for geometric co-registration.",
    category: "Cancer & Pathology",
    tags: ["Spatial Transformer Nets", "CC & MLO Views", "BI-RADS Classification", "Attention Fusion"],
    github: "https://github.com/tushar-nayak/grading-cbisddsm/blob/main/42657A_G3Report",
    demo: "https://github.com/tushar-nayak/grading-cbisddsm/blob/main/42657A_G3Report.pdf",
    highlight: false,
    simLogs: [
      "[MAMMOGRAM] Loading CC and MLO breast views...",
      "[STN] Estimating the alignment transform between views...",
      "[FUSION] Blending cross-view attention over the warped density maps...",
      "[CLASSIFIER] Scoring BI-RADS category from the fused representation...",
      "[SUCCESS] Dual-view alignment complete. BI-RADS 4 predicted | Conf = 0.89."
    ]
  },
  {
    id: 12,
    title: "LungVolSeg: 3D Lung CT Segmentation",
    desc: "High-reproducibility 3D full-volume lung CT segmentation and watertight surface export pipeline utilizing a 3D UNet backbone from MONAI, evaluated on the Zenodo chest CT benchmark. Exports watertight STL and VTK surface meshes.",
    category: "Medical Imaging",
    tags: ["MONAI 3D UNet", "Zenodo Dataset", "STL Surface Export", "Volumetric Analysis"],
    github: "https://github.com/tushar-nayak/lungvolseg",
    demo: "https://tushar-nayak.github.io/lungvolseg/",
    highlight: false,
    simLogs: [
      "[INPUT] Loading the chest CT volume from the Zenodo cohort...",
      "[MONAI] Running 3D UNet inference for lung field segmentation...",
      "[VOXELS] Measuring the segmented volume and boundary quality...",
      "[SURFACE] Generating a watertight mesh with Marching Cubes...",
      "[SUCCESS] Lung surface exported as STL and VTK for downstream use."
    ]
  },
  {
    id: 15,
    title: "DermaSeg: ISIC 2018 Skin Lesion Segmentation",
    desc: "Medical image segmentation and comparative benchmarking framework evaluating classical CNN segmentation models, attention-based architectures (U-Net variants), and lightweight transformers on ISIC 2018 Task 1.",
    category: "Cancer & Pathology",
    tags: ["ISIC 2018", "Skin Lesion Segmentation", "Transformer Backbones", "U-Net Variants"],
    github: "https://github.com/tushar-nayak/derma-seg",
    demo: "https://tushar-nayak.github.io/derma-seg/",
    highlight: false,
    simLogs: [
      "[ISIC] Preprocessing dermoscopy patches from the ISIC 2018 set...",
      "[TRANSFORMER] Comparing attention-based segmentation candidates...",
      "[DEEPLAB] Refining the lesion boundary with dense feature projection...",
      "[SUCCESS] Skin lesion mask generated. Dice score = 0.931."
    ]
  },
  {
    id: 5,
    title: "Multi-Model Oral Squamous Cell Carcinoma Detection",
    desc: "Undergraduate thesis at Biomedical Computing Lab. Tri-modal, multi-stage clinical diagnostic pipeline fusing non-invasive oral lesion macrographs, optical coherence tomography (OCT) scans, and invasive histopathology biopsy images using regularized transfer learning.",
    category: "Cancer & Pathology",
    tags: ["OSCC Detection", "Multi-Modal Fusion", "Oral Cancer", "Histopathology"],
    github: "https://github.com/tushar-nayak",
    demo: null,
    highlight: false,
    simLogs: [
      "[MACROGRAPH] Loading oral lesion images and extracting lesion borders...",
      "[OCT] Scanning epithelial and sub-epithelial thickness variations...",
      "[HISTOPATHOLOGY] Reading cellular atypia from biopsy patches...",
      "[ENSEMBLE] Fusing the three modalities with soft voting...",
      "[SUCCESS] OSCC assessment complete. Accuracy = 97.4%."
    ]
  },
  {
    id: 6,
    title: "Lung & Colon Cancer Detection using Histopathological Imaging",
    desc: "Research at Biomedical Computing Lab. Deploys deep residual networks coupled with unsharp masking and contrast stretching to identify Adenocarcinoma and Squamous Cell Carcinoma from H&E histopathology slides. Published in IEEE CONECCT 2023.",
    category: "Cancer & Pathology",
    tags: ["Deep Residual Nets", "Histopathology", "IEEE CONECCT", "Attention Layers"],
    github: "https://github.com/tushar-nayak",
    demo: null,
    highlight: false,
    simLogs: [
      "[PREPROCESSING] Applying stain normalization and unsharp masking...",
      "[RESNET] Reading histology features across the slide...",
      "[ATTENTION] Localizing malignant clusters in the tissue image...",
      "[SUCCESS] Lung and colon slide classified. Accuracy = 99.7% | F1-Score = 0.994."
    ]
  },
  {
    id: 7,
    title: "Monkeypox Virus Detection Using Skin Lesion Images",
    desc: "Preliminary project at Biomedical Computing Lab. Built robust clinical classification pipelines processing skin lesion macrographs to distinguish Monkeypox from Chickenpox, Measles, and Healthy skin. Utilized deep transfer learning models with LIME and Grad-CAM overlays.",
    category: "Medical Imaging",
    tags: ["Monkeypox", "XAI Diagnostics", "Grad-CAM", "MATLAB Pipelines"],
    github: "https://github.com/tushar-nayak",
    demo: "https://tushar-nayak.github.io/assets/pdf/mpox-binary.pdf",
    highlight: false,
    simLogs: [
      "[INPUT] Loading the skin lesion macrograph and resizing to 224x224...",
      "[RESNET-18] Reading lesion features for anomaly cues...",
      "[GRAD-CAM] Highlighting the blister boundary on the saliency map...",
      "[LIME] Explaining the binary prediction locally...",
      "[SUCCESS] Monkeypox detection complete. Accuracy = 99.49%."
    ]
  },
  {
    id: 14,
    title: "Fungal-Neo: Fungal Morphological Analysis",
    desc: "Deploys a patch-based learning pipeline leveraging ResNet18-based classifiers to perform robust classification of 9 different fungal species from high-resolution microscopic image patches (3600x5760).",
    category: "Medical Imaging",
    tags: ["ResNet18", "Patch-Based Learning", "Fungal Classification", "Microscopy"],
    github: "https://github.com/tushar-nayak/fungal-neo/",
    demo: "https://tushar-nayak.github.io/fungal-neo/",
    highlight: false,
    simLogs: [
      "[MICROSCOPY] Loading the 3600x5760 fungal slide scan...",
      "[PATCHING] Splitting the slide into 224x224 patches...",
      "[RESNET18] Classifying 9 fungal species from local regions...",
      "[ENSEMBLE] Aggregating patch predictions into a slide score...",
      "[SUCCESS] Fungal classification complete. Confidence = 94.8%."
    ]
  },
  {
    id: 11,
    title: "Neural Active Contours",
    desc: "Investigates unrolling classical active contour models (Snakes) directly into differentiable neural network backbones, allowing end-to-end backpropagation of geometric boundary forces (elasticity, stiffness, balloon forces).",
    category: "Medical Imaging",
    tags: ["Active Contours", "Differentiable Snaking", "Geometric Priors", "PyTorch"],
    github: "https://github.com/tushar-nayak/neural-active-contours/",
    demo: "https://tushar-nayak.github.io/neural-active-contours/",
    highlight: false,
    simLogs: [
      "[SNAKE] Loading elastic, tension, and balloon forces...",
      "[ENERGY] Building the boundary energy field...",
      "[DIFFERENTIABLE] Propagating contour coordinates through the model...",
      "[SUCCESS] Active contour converged in 8 iterations. Loss = 0.001."
    ]
  },
  {
    id: 3,
    title: "Neural Correlates Associated to Images for Emotional Response",
    desc: "Course project for Fundamentals of MRI and Neuroimaging Analysis. Maps affective processing of emotional valence (positive/negative/neutral) using a multimodal fMRI workflow on a 3T Siemens Prisma, combining BOLD task-based fMRI, resting-state connectivity, and ASL perfusion.",
    category: "Medical Imaging",
    tags: ["BOLD fMRI", "ASL Perfusion", "3T Siemens Prisma", "SPM12"],
    github: "https://github.com/tushar-nayak",
    demo: "https://tushar-nayak.github.io/assets/pdf/42668.pdf",
    highlight: false,
    simLogs: [
      "[BOLD] Preprocessing the 3T Siemens Prisma fMRI sequence...",
      "[SPM12] Co-registering T1 anatomy to MNI152 space...",
      "[GLM] Fitting the emotional valence response model...",
      "[PERFUSION] Estimating CBF from ASL data...",
      "[SUCCESS] Emotional response contrast mapped successfully."
    ]
  }
];

const TEACHING_COURSES = [
  {
    id: 'ml-bme',
    title: 'Machine Learning in Experimental Biomedical Engineering Research',
    note: 'Previously Clinical Translations of AI',
    term: 'Spring 2026',
    level: 'Graduate students',
    instructor: 'Dr. Newell Washburn',
    department: 'Biomedical Engineering, College of Engineering',
    summary: 'Applications of AI and machine learning for experimental BME data: small tabular datasets, images, spectra, and time series.',
    topics: ['Experimental ML', 'TabPFN', 'Feature Selection', 'Transfer Learning']
  },
  {
    id: 'cv-engineers',
    title: 'Computer Vision for Engineers',
    term: 'Fall 2025',
    level: 'Graduate students',
    instructor: 'Dr. Kenji Shimada',
    department: 'Mechanical Engineering, College of Engineering',
    summary: 'Computer vision from sensor selection and image analysis through motion, 3D reconstruction, point clouds, tracking, and object detection.',
    topics: ['3D Reconstruction', 'Point Clouds', 'Feature Tracking', 'Object Detection']
  },
  {
    id: 'computational-bme',
    title: 'Fundamentals of Computational Biomedical Engineering',
    term: 'Fall 2025',
    level: 'Graduate students',
    instructor: 'Dr. Jason Szafron',
    department: 'Biomedical Engineering, College of Engineering',
    summary: 'A coding bridge for biomedical engineers using MATLAB, Simulink, and Python across modeling, visualization, and machine learning examples.',
    topics: ['MATLAB', 'Simulink', 'ODEs', 'Python']
  },
  {
    id: 'applied-deep-learning',
    title: 'Applied Deep Learning',
    term: 'Spring 2025',
    level: 'Graduate students',
    instructor: 'Dr. Clarence Worrell',
    department: 'Software and Societal Systems, School of Computer Science',
    summary: 'Hands-on deep learning concepts, architectures, and the software engineering realities of building and deploying neural systems.',
    topics: ['Neural Architectures', 'Model Deployment', 'Software Systems', 'Deep Learning Projects']
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
  const [expandedTeachingCourse, setExpandedTeachingCourse] = useState('ml-bme');

  // 3D Scanner widget interactive state
  const [scanCoords, setScanCoords] = useState({ x: 124.52, y: 84.18, z: 9.31 });
  const [scanStatus, setScanStatus] = useState("SYSTEM READY");
  const [widgetClicks, setWidgetClicks] = useState(0);
  const [widgetSpinRate, setWidgetSpinRate] = useState(15);

  // Dynamic algorithm simulator state per project
  const [simulations, setSimulations] = useState({}); // project_id -> { active: bool, logs: array, step: int }

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

  // Separate graduate research, undergraduate research, and technical projects
  const graduateProjects = useMemo(() => {
    return filteredProjects.filter(p => p.id === 1 || p.id === 2);
  }, [filteredProjects]);

  const undergraduateResearchProjects = useMemo(() => {
    return filteredProjects.filter(p => p.id === 5 || p.id === 6 || p.id === 7);
  }, [filteredProjects]);

  const projectProjects = useMemo(() => {
    return filteredProjects.filter(p => p.id !== 1 && p.id !== 2 && p.id !== 5 && p.id !== 6 && p.id !== 7);
  }, [filteredProjects]);

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

  // Reusable Project Card Renderer
  const renderProjectCard = (project) => {
    const currentSim = simulations[project.id];
    return (
      <div
        key={project.id}
        className="glass-panel project-card"
        style={{
          background: project.highlight ? 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.02), rgba(14, 16, 21, 0.8) 75%)' : 'var(--bg-surface-glass)',
          borderColor: currentSim?.active 
            ? 'var(--accent-emerald)' 
            : (project.highlight ? 'rgba(14, 165, 233, 0.12)' : 'var(--border-glow)'),
          boxShadow: currentSim?.active 
            ? '0 0 15px rgba(16, 185, 129, 0.05)' 
            : 'none'
        }}
      >
        <ProjectVisual 
          project={project}
          category={project.category} 
          active={currentSim?.active} 
          id={project.id} 
          style={{ 
            margin: '-2rem -2rem 1.5rem -2rem', 
            borderTopLeftRadius: '15px', 
            borderTopRightRadius: '15px' 
          }} 
        />
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

        {/* Sleek, Integrated Pipeline Simulator Telemetry */}
        <div style={{
          marginTop: 'auto',
          marginBottom: '1rem',
          background: 'rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          padding: '0.65rem 0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: currentSim?.active ? 'var(--accent-emerald)' : 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'monospace' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: currentSim?.active ? 'var(--accent-emerald)' : (currentSim?.logs?.length ? 'var(--primary-cyan)' : 'rgba(255, 255, 255, 0.15)'),
                display: 'inline-block',
                boxShadow: currentSim?.active ? '0 0 6px var(--accent-emerald)' : 'none'
              }}></span>
              {currentSim?.active ? 'SOLVING_ODE...' : (currentSim?.logs?.length ? 'SIMULATION_LOCKED' : 'SOLVER_IDLE')}
            </span>
            <button
              onClick={() => triggerSimulation(project.id, project.simLogs)}
              disabled={currentSim?.active}
              style={{
                background: currentSim?.active ? 'rgba(16, 185, 129, 0.06)' : 'rgba(14, 165, 233, 0.05)',
                border: '1px solid rgba(14, 165, 233, 0.15)',
                color: currentSim?.active ? 'var(--accent-emerald)' : 'var(--primary-cyan)',
                padding: '0.25rem 0.6rem',
                borderRadius: '5px',
                cursor: currentSim?.active ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '500',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                transition: 'all 0.2s'
              }}
            >
              {currentSim?.active ? (
                <>
                  <Sparkles size={8} />
                  SOLVING
                </>
              ) : (
                <>
                  <Play size={8} />
                  RUN_SOLVER
                </>
              )}
            </button>
          </div>

          {/* Console Log Outputs - Collapsible Drawer that slides open ONLY when active or completed logs exist */}
          {currentSim && currentSim.logs.length > 0 && (
            <div style={{
              marginTop: '0.65rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.03)',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              maxHeight: '80px',
              overflowY: 'auto'
            }}>
              {currentSim.logs.map((log, idx) => (
                <div key={idx} style={{
                  color: log.startsWith("[SUCCESS]") ? 'var(--accent-emerald)' : (log.startsWith("[ODE]") ? 'var(--primary-cyan)' : 'var(--text-secondary)'),
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.3'
                }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
            <Github size={14} />
            Repository
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <Globe size={14} />
              Project Page
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Dynamic interactive Canvas Network */}
      <NeuralBackground />
      <CursorTrail />

      {/* Decorative blurred backgrounds */}
      <div className="glow-blur-1"></div>
      <div className="glow-blur-2"></div>

      {/* FLOATING GLASS NAVIGATION HEADER */}
      <header className="site-header" style={{
        position: 'sticky',
        top: '1.5rem',
        zIndex: 50,
        margin: '0 auto',
        maxWidth: '900px',
        padding: '0 1rem',
      }}>
        <div className="site-header-shell" style={{
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
          <div className="site-header-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="site-header-mark" style={{
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
            <span className="site-header-wordmark" style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)'
            }}>
              tushar-nayak <span className="site-header-wordmark-sep" style={{ color: 'var(--primary-cyan)', fontWeight: '500' }}>&&</span> <span className="site-header-wordmark-tail">technologyfoundhere</span>
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="site-header-nav" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {['about', 'projects', 'research', 'teaching', 'timeline'].map((tab) => (
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
                className={`site-header-tab ${activeTab === tab ? 'pulse-glow' : ''}`}
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span className="badge badge-teal">
                  <Stethoscope size={12} style={{ marginRight: '0.25rem' }} />
                  Surgical Robotics
                </span>
                <span className="badge badge-emerald">
                  <Cpu size={12} style={{ marginRight: '0.25rem' }} />
                  Physics-informed AI
                </span>
                <span className="badge">
                  <ScanEye size={12} style={{ marginRight: '0.25rem' }} />
                  3D Vision
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
                Graduate researcher at <span style={{ color: 'var(--primary-cyan)', fontWeight: '500' }}>Carnegie Mellon University</span>
              </p>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '650px', lineHeight: '1.7' }}>
                I'm pursuing a master's in the <span style={{ color: 'var(--text-primary)' }}>Biomedical Engineering</span> department at CMU, advised by <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Prof. Kenji Shimada</span> in the <span style={{ color: 'var(--text-primary)' }}>Computational Engineering &amp; Robotics Lab</span>. My work sits at the intersection of computer vision, differentiable rendering, and physics-based learning for surgical robotics and medical imaging.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="mailto:tusharn@andrew.cmu.edu" className="btn btn-primary">
                  <Mail size={18} />
                  Email
                </a>
                <a href="https://github.com/tushar-nayak" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={18} />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a href="https://scholar.google.com/citations?user=9xUX7NoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <ScholarIcon size={18} />
                  Google Scholar
                </a>
              </div>
            </div>

            {/* Right Column: Sleek Interactive 3D Spatial Grid (Focal Projection Viewport) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                className="glass-panel"
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(10, 11, 14, 0.25)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  cursor: 'crosshair',
                  boxShadow: 'none',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  padding: '0'
                }}
              >
                <ProfileSplat
                  scanCoords={scanCoords}
                  setScanCoords={setScanCoords}
                  scanStatus={scanStatus}
                  setScanStatus={setScanStatus}
                  widgetSpinRate={widgetSpinRate}
                  setWidgetSpinRate={setWidgetSpinRate}
                  widgetClicks={widgetClicks}
                  setWidgetClicks={setWidgetClicks}
                />
              </div>

              {/* Real-time Tracking Info Dashboard Widget */}
              <div className="glass-panel" style={{
                marginTop: '1rem',
                width: '280px',
                padding: '0.85rem 1.25rem',
                borderColor: 'var(--border-glow)',
                background: 'rgba(14, 16, 21, 0.5)',
                borderRadius: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.08em', fontFamily: 'monospace' }}>SPATIAL_RESOLVER_V1</span>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: scanStatus.startsWith("RE-") ? 'var(--primary-cyan)' : 'var(--accent-emerald)', transition: 'background-color 0.3s' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status:</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: '600', fontFamily: 'monospace' }}>{scanStatus}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '0.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>FOCAL_X</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.x}mm</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>FOCAL_Y</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.y}mm</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>DEPTH_Z</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{scanCoords.z}mm</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SHOWCASE SECTION */}
        <section id="projects" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FolderGit2 className="gradient-text" />
              Projects & Demos
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Explore research code, demos, and interactive pipelines.
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

          {/* Graduate Research Section */}
          {graduateProjects.length > 0 && (
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                marginBottom: '1.5rem',
                borderLeft: '3px solid var(--primary-cyan)',
                paddingLeft: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    letterSpacing: '-0.01em',
                    margin: 0
                  }}>Graduate Research</h3>
                  <span className="badge badge-teal" style={{ fontSize: '0.65rem', textTransform: 'uppercase', padding: '0.15rem 0.4rem' }}>
                    Graduate Work
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, opacity: 0.85, maxWidth: '800px', lineHeight: '1.4' }}>
                  Research projects developed with Carnegie Mellon University (CMU CERLAB &amp; Grover Lab) and University of Pittsburgh Medical Center (UPMC) collaborators.
                </p>
              </div>
              
              <div className="project-grid">
                {graduateProjects.map((project) => renderProjectCard(project))}
              </div>
            </div>
          )}

          {/* Section Divider */}
          {graduateProjects.length > 0 && projectProjects.length > 0 && (
            <div style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(0, 242, 254, 0.12), rgba(255, 255, 255, 0.01) 90%)',
              marginBottom: '3rem',
              marginTop: '1.5rem'
            }}></div>
          )}

          {/* Projects Section */}
          {projectProjects.length > 0 && (
            <div>
              {graduateProjects.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  marginBottom: '1.5rem',
                  borderLeft: '3px solid rgba(255, 255, 255, 0.15)',
                  paddingLeft: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    letterSpacing: '-0.01em',
                    margin: 0
                    }}>Projects</h3>
                    <span className="badge" style={{ 
                      fontSize: '0.65rem', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      color: 'var(--text-secondary)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      textTransform: 'uppercase',
                      padding: '0.15rem 0.4rem'
                    }}>
                      Selected Work
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, opacity: 0.85, maxWidth: '800px', lineHeight: '1.4' }}>
                    Interactive 3D computer vision models, medical imaging systems, and surgical tooling.
                  </p>
                </div>
              )}
              
              <div className="project-grid">
                {projectProjects.map((project) => renderProjectCard(project))}
              </div>
            </div>
          )}

          {/* Undergraduate Research Projects Section */}
          {undergraduateResearchProjects.length > 0 && (
            <div style={{ marginTop: '3.5rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                marginBottom: '1.5rem',
                borderLeft: '3px solid var(--accent-emerald)',
                paddingLeft: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    letterSpacing: '-0.01em',
                    margin: 0
                  }}>Undergraduate Research Projects</h3>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem', textTransform: 'uppercase', padding: '0.15rem 0.4rem' }}>
                    Undergraduate
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, opacity: 0.85, maxWidth: '800px', lineHeight: '1.4' }}>
                  Early research work in histopathology, skin lesion analysis, and clinical classification.
                </p>
              </div>

              <div className="project-grid">
                {undergraduateResearchProjects.map((project) => renderProjectCard(project))}
              </div>
            </div>
          )}
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
                  Selected papers and related work in medical computer vision.
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
                      {pub.scholar && (
                        <a
                          href={pub.scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'rgba(0, 242, 254, 0.05)',
                            border: '1px solid rgba(0, 242, 254, 0.15)',
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
                          <ScholarIcon size={14} />
                          Scholar
                        </a>
                      )}
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

        {/* TEACHING SECTION */}
        <section id="teaching" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Presentation className="gradient-text" />
              Teaching
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '720px' }}>
              I have mostly been on the TA side of the classroom so far, plus a few workshops and an open computer vision course in progress.
            </p>
          </div>

          <div className="teaching-layout">
            <div className="glass-panel teaching-spotlight">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <span className="badge badge-emerald">Course Authoring</span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Open Horizon Robotics</h3>
                </div>
                <span className="badge">Open Source</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '640px' }}>
                Building a computer vision course that moves from classical 2D vision into deep learning, 3D vision, geometry, localization and mapping, synthesis, and perception physics.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                {['Classical Vision', '3D Vision', 'Vision Geometry', 'Localization & Mapping', 'Perception Physics'].map((topic) => (
                  <span key={topic} className="badge badge-teal">{topic}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel teaching-spotlight">
              <span className="badge badge-teal">Workshops</span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Manipal Institute of Technology</h3>
              <p style={{ color: 'var(--primary-cyan)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                BioInnovate Technical Workshop Series, IEEE EMBS Student Chapter Manipal
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Led beginner-friendly sessions on signal and image processing, deep learning, microcontrollers, Linux, electronics, programming, and applied research habits.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                The longer learning track also helped junior members move from workshops into lab shadowing and a university symposium study.
              </p>
            </div>
          </div>

          <div className="glass-panel teaching-courses">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-teal">Teaching Assistant</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.85rem' }}>Carnegie Mellon University</h3>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Click a course for the short version.
              </span>
            </div>

            <div className="teaching-course-list">
              {TEACHING_COURSES.map((course) => {
                const isExpanded = expandedTeachingCourse === course.id;

                return (
                  <div key={course.id} className={`teaching-course ${isExpanded ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="teaching-course-toggle"
                      onClick={() => setExpandedTeachingCourse(isExpanded ? null : course.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>
                        <span className="teaching-course-term">{course.term}</span>
                        <span className="teaching-course-title">{course.title}</span>
                        {course.note && <span className="teaching-course-note">{course.note}</span>}
                      </span>
                      <ChevronDown size={18} className="teaching-course-chevron" />
                    </button>

                    {isExpanded && (
                      <div className="teaching-course-details">
                        <p>{course.level} with {course.instructor}. {course.department}.</p>
                        <p>{course.summary}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {course.topics.map((topic) => (
                            <span key={topic} className="badge">{topic}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline" style={{ scrollMarginTop: '8rem', marginBottom: '6rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GraduationCap className="gradient-text" />
              Academic Timeline
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              A quick look at my research and academic path. Click items to expand the details.
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
                      Master's in Biomedical Engineering (Advised by Prof. Kenji Shimada)
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
                    <Calendar size={14} /> 2019 - 2023
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>
                  Published deep diagnostic models mapping skin anomalies (monkeypox), oral malignancies, and blood leukemia indices.
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
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.7' }}>
              I'm open to research collaborations, computer vision ideas, and image-guided robotics projects. Reach out by email or on the platforms below.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyValue: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="mailto:tusharn@andrew.cmu.edu" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
                <Mail size={18} />
                Email
              </a>
              <a href="https://github.com/tushar-nayak" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
                <Github size={18} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a href="https://scholar.google.com/citations?user=9xUX7NoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
                <ScholarIcon size={18} />
                Scholar
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
