import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import profilePic from './assets/prof_pic_color.jpg';

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

const PROJECT_PAGE_DETAILS = {
  2: {
    label: 'From Project Page',
    headline: 'Reproducible Neural ODE forecasting on LUMIERE-style longitudinal MRI.',
    summary: 'The published project page reframes this work around a reproducibility checkpoint, tracked cohort aggregates, and a frozen publication rerun protocol rather than a one-off script result.',
    stats: [
      { value: '81', label: 'tracked patient-level runs' },
      { value: '+6.7%', label: 'mean relative improvement' },
      { value: '0.00828', label: 'mean model MSE' },
      { value: '65', label: 'positive-improvement patients' }
    ],
    bullets: [
      'Tracks aggregate outputs in versioned CSV, JSON, and Markdown artifacts instead of hand-copied manuscript prose.',
      'Exports per-run provenance including Python, Torch, NumPy, device resolution, and split-wise metric tables.',
      'Keeps publication work focused on a frozen holdout-aware rerun and regenerated manuscript figures.'
    ]
  },
  18: {
    label: 'From Project Page',
    headline: 'Stabilized Gaussian occupancy fields reconstruct a 3D cardiac label volume with direct mesh diagnostics.',
    summary: 'The page focuses on subject-level reconstruction quality and inspection, comparing predicted and ground-truth marching-cubes surfaces from the same validation sample.',
    stats: [
      { value: '0.966', label: 'sampled accuracy' },
      { value: '0.950', label: 'sampled IoU' },
      { value: '1800', label: 'Gaussians' },
      { value: '600', label: 'fit steps' }
    ],
    bullets: [
      'Represents anatomy with optimized 3D Gaussian occupancy kernels instead of a dense voxel field.',
      'Shows paired prediction and ground-truth interactive mesh viewers for the same validation case.',
      'Frames the result as inspectable reconstruction quality, not a population-level generalization claim.'
    ]
  },
  4: {
    label: 'From Project Page',
    headline: 'Few-shot 3D cardiac reconstruction from sparse 2D echo.',
    summary: 'The project page emphasizes repo-local tracked outputs, interactive 2D and 3D viewers, and a strongest mixed-run overlap result on the MITEA data.',
    stats: [
      { value: '0.8643', label: 'best full-volume Dice' },
      { value: '0.7658', label: 'best full-volume IoU' },
      { value: '536', label: 'repo-local dataset pairs' },
      { value: '6', label: 'featured scans' }
    ],
    bullets: [
      'Uses tracked HTML exports so slice overlays and 3D meshes work directly on GitHub Pages.',
      'Highlights subject-specific viewers for scans 020, 080, 093, 103, 107, and 115.',
      'Presents the strongest overlap as the mixed run without stratifiers.'
    ]
  },
  10: {
    label: 'From Project Page',
    headline: 'A learned Perona-Malik style MRI denoising project with tracked baselines, ablations, and robustness sweeps.',
    summary: 'The page positions the method as a neural PDE denoiser with an interactive results explorer and quantitative comparisons against classical baselines.',
    stats: [
      { value: '24.85 dB', label: 'Neural PDE PSNR' },
      { value: '0.719', label: 'Neural PDE SSIM' },
      { value: '+4.46 dB', label: 'gain vs. NLM baseline' },
      { value: '16', label: 'unrolled PDE steps' }
    ],
    bullets: [
      'Separates abstract, methodology, qualitative analysis, and discussion into a report-like project page.',
      'Uses unrolled anisotropic diffusion steps with learned conduction behavior rather than a fixed denoiser.',
      'Surfaces quantitative gains alongside an interactive explorer instead of only static figures.'
    ]
  },
  16: {
    label: 'From Project Page',
    headline: 'Open-vocabulary surgical tool detection, segmentation, and tracking on real endoscopic and laparoscopic data.',
    summary: 'The public page describes an inference-first real-data pipeline with prompt grounding, SAM2 mask refinement, tracked overlays, and re-grounded video propagation.',
    stats: [
      { value: '0.2139', label: 'bbox mAP' },
      { value: '0.3926', label: 'mean mask IoU' },
      { value: '5.58', label: 'video FPS with re-grounding' },
      { value: '120', label: 'tracked real frames' }
    ],
    bullets: [
      'Grounds prompts like forceps, grasper, catheter, and guidewire into tool proposals before SAM2 refinement.',
      'Reports real Endoscapes subset results rather than synthetic-only evaluation.',
      'Includes playable tracked overlays both with and without periodic re-grounding.'
    ]
  },
  12: {
    label: 'From Project Page',
    headline: 'Real-data full-volume lung CT segmentation pipeline using SimpleITK, MONAI, and VTK.',
    summary: 'The page publishes tracked artifacts from a 25-epoch Zenodo full run and pairs segmentation outputs with airway-centerline tooling for navigation workflows.',
    stats: [
      { value: '25', label: 'training epochs' },
      { value: '20', label: 'prepared cases' },
      { value: '96×128×128', label: 'prepared volume shape' },
      { value: 'CUDA', label: 'run device' }
    ],
    bullets: [
      'Packages NIfTI predictions, STL and VTP meshes, metrics, and a model card as tracked outputs.',
      'Calls out a bimodal performance pattern between cases 001-010 and 011-020.',
      'Includes a separate airway-centerline and routing workflow on top of the lung surface meshes.'
    ]
  },
  15: {
    label: 'From Project Page',
    headline: 'ISIC 2018 lesion segmentation with DeepLabV3 baselines and a custom boundary-aware BA-DeepLabV3.',
    summary: 'The project page explains the segmentation stack as a serious reproducible medical workflow, not just a single model checkpoint.',
    stats: [
      { value: '0.8900', label: 'best validation Dice' },
      { value: '0.8134', label: 'best validation IoU' },
      { value: '0.7598', label: 'best validation threshold Jaccard' },
      { value: '0.7320', label: 'final test threshold Jaccard' }
    ],
    bullets: [
      'Extends plain DeepLabV3 with dynamic ASPP, boundary supervision, uncertainty modeling, and refinement decoding.',
      'Positions ISIC 2018 as a benchmark for comparing U-Net variants, non-U-Net CNNs, and transformer models.',
      'Uses threshold Jaccard to select validation checkpoints for the official lesion-boundary task.'
    ]
  }
};

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

const NEWS_ITEMS = [
  {
    date: 'June 2026',
    text: 'Visiting the Massachusetts Institute of Technology & Worcester Polytechnic Institute this week! At WPI, I\'ll be delivering a seminar session based on my master\'s thesis and recent projects, focusing on the real-time registration and 3D reconstruction of medical imaging data from 2D space.'
  },
  {
    date: 'Spring 2026',
    text: 'Serving as a TA for Machine Learning in Experimental Biomedical Engineering Research at CMU.'
  },
  {
    date: 'Fall 2025',
    text: 'TA for Computer Vision for Engineers and Fundamentals of Computational Biomedical Engineering.'
  },
  {
    date: 'In progress',
    text: 'Building Open Horizon Robotics, a computer vision course that moves from classical vision into robotics.'
  }
];

function App() {
  const [siteTheme, setSiteTheme] = useState(() => {
    if (typeof window === 'undefined') return 'google-material';
    return window.localStorage.getItem('site-theme') === 'linux-terminal'
      ? 'linux-terminal'
      : 'google-material';
  });
  const [activeTab, setActiveTab] = useState('about');
  const [pubSearch, setPubSearch] = useState('');
  const [pubFilter, setPubFilter] = useState('All'); // 'All' or 'Selected'
  const [pubSort, setPubSort] = useState('year'); // 'year' or 'title'
  const [pubType, setPubType] = useState('All'); // 'All', 'Journal', 'Conference'
  
  // Interactive BibTeX viewer modal state
  const [activeBibPub, setActiveBibPub] = useState(null);
  const [copiedBib, setCopiedBib] = useState(false);
  const resolvedTheme = siteTheme || 'google-material';
  const isGoogleMaterial = resolvedTheme === 'google-material';

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const sections = ['about', 'projects', 'research', 'teaching', 'timeline']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveTab(visible[0].target.id);
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleThemeSelect = (nextTheme) => {
    setSiteTheme(nextTheme);
    window.localStorage.setItem('site-theme', nextTheme);
  };

  const toggleTheme = () => {
    handleThemeSelect(isGoogleMaterial ? 'linux-terminal' : 'google-material');
  };

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
  const renderProjectRow = (project) => {
    const detail = PROJECT_PAGE_DETAILS[project.id];
    return (
      <div key={project.id} className="hf-item-row">
        <div className="hf-item-main">
          <div className="hf-item-titleline">
            <h3>{project.title}</h3>
            <span className="hf-item-year">{project.category}</span>
          </div>
          <p>{project.desc}</p>
          <p className="hf-item-detail">
            {detail ? detail.headline : project.simLogs[0]}
          </p>
          <div className="hf-item-tags">
            {project.tags.map((tag) => (
              <span key={`${project.id}-${tag}`}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="hf-item-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer">Repository</a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">Project Page</a>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`page-container theme-${resolvedTheme}`}>
      <header className="hf-header">
        <div className="hf-header-inner">
          <a href="#about" className="hf-brand" aria-label="Home">
            <span className="hf-brand-mark">$ cd /home/tushar/web</span>
            <span className="hf-brand-cursor" aria-hidden="true" />
          </a>

          <nav className="hf-nav" aria-label="Primary">
            {['about', 'projects', 'research', 'teaching', 'timeline'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`hf-nav-link ${activeTab === tab ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {tab}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="hf-theme-toggle"
              aria-label={isGoogleMaterial ? 'Switch to dark mode' : 'Switch to light mode'}
              title={isGoogleMaterial ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isGoogleMaterial ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </nav>
        </div>
      </header>

      <main className="content-wrapper hf-page" style={{ position: 'relative', zIndex: 1, paddingTop: '5.25rem', paddingBottom: '6rem' }}>
        <section id="about" className="hf-hero" style={{ scrollMarginTop: '7rem', marginBottom: '4rem' }}>
          <figure className="hf-profile">
            <img src={profilePic} alt="Tushar Nayak portrait" className="hf-profile-image" />
            <figcaption className="hf-profile-caption">
              <p className="hf-eyebrow">Tushar Nayak</p>
              <h1>Graduate researcher in biomedical engineering and computer vision.</h1>
              <p className="hf-lead">
                I am a graduate researcher at Carnegie Mellon University, advised by Prof. Kenji Shimada in the Computational Engineering &amp; Robotics Lab. My work spans medical imaging, differentiable rendering, and physics-based learning for surgical robotics.
              </p>
              <p className="hf-lead">
                I am interested in clinical computer vision systems that stay reproducible, inspectable, and usable by people outside a narrow research loop.
              </p>
              <p className="hf-profile-links">
                <a href="mailto:tusharn@andrew.cmu.edu">Email</a>
                <a href="https://github.com/tushar-nayak" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://scholar.google.com/citations?user=9xUX7NoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Scholar</a>
              </p>
            </figcaption>
          </figure>
        </section>

        <section id="news" className="hf-news" style={{ scrollMarginTop: '7rem', marginBottom: '4.5rem' }}>
          <div className="hf-section-heading">
            <h2>News</h2>
            <p>Short updates, similar to a compact academic homepage.</p>
          </div>
          <div className="hf-news-box">
            {NEWS_ITEMS.map((item) => (
              <div key={`${item.date}-${item.text}`} className="hf-news-item">
                <strong>{item.date}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" style={{ scrollMarginTop: '8rem', marginBottom: '4.5rem' }}>
          <div className="hf-section-heading">
            <h2>Selected Projects</h2>
            <p>Representative research and course projects. Titles are listed with one-line descriptions and source links.</p>
          </div>

          <div className="hf-listing">
            {PROJECTS.map(renderProjectRow)}
          </div>
        </section>

        {/* RESEARCH & PUBLICATIONS SECTION */}
        <section id="research" style={{ scrollMarginTop: '8rem', marginBottom: '4.5rem' }}>
          <div className="hf-section-heading">
            <h2>Research and Publications</h2>
            <p>Selected papers with title, venue, and links. Search and filters are kept minimal for readability.</p>
          </div>

          <div className="hf-toolbar">
            <input
              type="text"
              placeholder="Search title, venue, or keyword"
              value={pubSearch}
              onChange={(e) => setPubSearch(e.target.value)}
              className="hf-search"
            />
            <div className="hf-switches">
              <button type="button" className={pubFilter === 'All' ? 'is-active' : ''} onClick={() => setPubFilter('All')}>All</button>
              <button type="button" className={pubFilter === 'Selected' ? 'is-active' : ''} onClick={() => setPubFilter('Selected')}>Selected</button>
              <button type="button" className={pubType === 'Journal' ? 'is-active' : ''} onClick={() => setPubType(pubType === 'Journal' ? 'All' : 'Journal')}>Journal</button>
              <button type="button" className={pubType === 'Conference' ? 'is-active' : ''} onClick={() => setPubType(pubType === 'Conference' ? 'All' : 'Conference')}>Conference</button>
              <button type="button" className={pubSort === 'year' ? 'is-active' : ''} onClick={() => setPubSort(pubSort === 'year' ? 'title' : 'year')}>Sort</button>
            </div>
          </div>

          <div className="hf-listing">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub) => (
                <div key={pub.id} className="hf-item-row">
                  <div className="hf-item-main">
                    <div className="hf-item-titleline">
                      <h3>{pub.title}</h3>
                      <span className="hf-item-year">{pub.year}</span>
                    </div>
                    <p>{pub.authors}</p>
                    <p className="hf-item-detail">{pub.venue}</p>
                    <div className="hf-item-tags">
                      {pub.tags.map((tag) => (
                        <span key={`${pub.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hf-item-links">
                    <button type="button" onClick={() => setActiveBibPub(pub)}>BibTeX</button>
                    {pub.scholar && <a href={pub.scholar} target="_blank" rel="noopener noreferrer">Scholar</a>}
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">Link</a>
                  </div>
                </div>
              ))
            ) : (
              <div className="hf-empty">No publications matched your search terms.</div>
            )}
          </div>
        </section>

        <section id="teaching" style={{ scrollMarginTop: '8rem', marginBottom: '4.5rem' }}>
          <div className="hf-section-heading">
            <h2>Teaching</h2>
            <p>Recent teaching and course authoring, summarized in a lightweight list.</p>
          </div>

          <div className="hf-listing">
            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>Open Horizon Robotics</h3>
                  <span className="hf-item-year">Course authoring</span>
                </div>
                <p>Building a computer vision course that moves from classical 2D vision into deep learning, 3D vision, geometry, localization and mapping, synthesis, and perception physics.</p>
              </div>
            </div>

            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>Manipal Institute of Technology</h3>
                  <span className="hf-item-year">Workshop series</span>
                </div>
                <p>Led beginner-friendly sessions on signal and image processing, deep learning, microcontrollers, Linux, electronics, programming, and applied research habits.</p>
              </div>
            </div>

            {TEACHING_COURSES.map((course) => (
              <div key={course.id} className="hf-item-row">
                <div className="hf-item-main">
                  <div className="hf-item-titleline">
                    <h3>{course.title}</h3>
                    <span className="hf-item-year">{course.term}</span>
                  </div>
                  <p>{course.level} with {course.instructor}. {course.department}.</p>
                  <p className="hf-item-detail">{course.summary}</p>
                  <div className="hf-item-tags">
                    {course.topics.map((topic) => (
                      <span key={`${course.id}-${topic}`}>{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline" style={{ scrollMarginTop: '8rem', marginBottom: '4.5rem' }}>
          <div className="hf-section-heading">
            <h2>Academic Timeline</h2>
            <p>Education and research appointments summarized in reverse chronological order.</p>
          </div>

          <div className="hf-listing">
            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>Carnegie Mellon University</h3>
                  <span className="hf-item-year">2024 - Present</span>
                </div>
                <p>Master's in Biomedical Engineering. Advised by Prof. Kenji Shimada.</p>
                <p className="hf-item-detail">Research focus: 2D angiography to 3D CT vascular registration, physics-informed neural solvers, and surgical computer vision.</p>
              </div>
            </div>

            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>IIT Hyderabad</h3>
                  <span className="hf-item-year">2023 - 2024</span>
                </div>
                <p>Research fellowship in motion capture and electromyography computing.</p>
                <p className="hf-item-detail">Built algorithmic solvers for musculoskeletal loading constraints and real-time skeletal analysis.</p>
              </div>
            </div>

            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>Indian Council of Medical Research</h3>
                  <span className="hf-item-year">2022 - 2023</span>
                </div>
                <p>Project associate in fetal ultrasound anomaly diagnostics.</p>
                <p className="hf-item-detail">Trained deep segmentation networks to automate standard diagnostic measurements on 2D ultrasound scans.</p>
              </div>
            </div>

            <div className="hf-item-row">
              <div className="hf-item-main">
                <div className="hf-item-titleline">
                  <h3>Manipal Institute of Technology</h3>
                  <span className="hf-item-year">2019 - 2023</span>
                </div>
                <p>B.Tech in Biomedical Engineering, minor in Data Science.</p>
                <p className="hf-item-detail">Published work in skin anomaly analysis, oral malignancies, and blood leukemia classification.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION & FOOTER SECTION */}
        <section id="contact" style={{ scrollMarginTop: '8rem', marginTop: '5rem' }}>
          <div className="hf-section-heading">
            <h2>Contact</h2>
            <p>Research collaboration and teaching inquiries.</p>
          </div>

          <div className="hf-contact">
            <p>
              Email: <a href="mailto:tusharn@andrew.cmu.edu">tusharn@andrew.cmu.edu</a>
            </p>
            <p>
              Links: <a href="https://github.com/tushar-nayak" target="_blank" rel="noopener noreferrer">GitHub</a>, <a href="https://www.linkedin.com/in/nayaktushar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, <a href="https://scholar.google.com/citations?user=9xUX7NoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Scholar</a>
            </p>
            <p>Pittsburgh, PA</p>
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
