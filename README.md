# 🌐 tushar-nayak && technologyfoundhere

A futuristic, highly interactive, and visually stunning web console showcasing **Tushar Nayak's** research portfolio in **Image-Guided Robotic Surgery** and **3D Computer Vision** at Carnegie Mellon University (CMU).

Developed with a high-contrast glowing cyberpunk medical-console design, this website rejects static layouts in favor of real-time math-driven interactive visualizers, simulation logs, and holographic telemetry dashboards.

---

## 🌟 Interactive Core Features

### 1. Holographic 3D Gaussian Splat & Focal Plane Scanner (`src/components/ProfileSplat.jsx`)
Replacing standard static image profiles, the hero section features a real-time **3D Gaussian Splat Point Cloud** of Tushar's color portrait, rendered natively on an HTML5 Canvas at 60 FPS:
* **3D Depth Relief Extraction**: On load, the profile image (`prof_pic_color.jpg`) is downsampled to an optimized grid of particles. The algorithm extracts pixel-level color coordinates and calculates depth `Z` by combining relative luma brightness (luma formula: `0.299*R + 0.587*G + 0.114*B`) with a spherical curvature head model. This yields a volumetric 3D face structure in space (nose, cheeks, and forehead pop forward; eyes and background shadows recede).
* **Click & Drag 3D Orbit**: Users can click and drag anywhere on the canvas to rotate the face in 3D (pitch and yaw) using trigonometric camera projection matrices. If left idle, it returns to a slow, nominal standby rotation.
* **Painter's Algorithm (Depth Buffer Sorting)**: To enable flawless alpha-transparency blending of overlapping particles, the points array is sorted back-to-front by projected depth every frame before rendering.
* **Splat Oblong Ellipses**: Points are drawn as soft, translucent ellipses aligned to the rotational axis, mimicking real Gaussian Splat primitives.
* **Focal Plane Laser Slice**: A green translucent laser plane sweeps back and forth through the depth of your face. Splats that intersect this active focal coordinate dynamically expand and illuminate in glowing emerald green (`#00f5a0`).
* **Active Telemetry Hookup**: Moving the cursor over the canvas instantly updates your dashboard's coordinates panel with live Cartesian `X`, `Y`, and depth `Z` numbers. Clicking the recalibrate button spins the head rapidly, cycles diagnostics, and locks with a completed status.

### 2. Interactive Neural Canvas Network (`src/components/NeuralBackground.jsx`)
Provides an ambient, high-density particle network drifting dynamically behind the console panels:
* **Attraction-Repulsion Physics**: Moving the cursor over the background exerts a gravitational field that repels particles smoothly.
* **Dynamic Linking Vectors**: Nearest-neighbor nodes within proximity form translucent connector lines. If the mouse is close, the cursor connects to nearby nodes with bright **neon green laser lines**, simulating real-time robotic instrument tracking vectors.

### 3. Procedural Project Visuals & Simulation Solvers (`src/components/ProjectVisual.jsx` & `src/App.jsx`)
Each of the 19 project cards features a custom animated vector graphic tailored to its medical/robotic category, fully integrated with a live mock pipeline terminal:
* **Category Visualizations**:
  * **3D & Robotics**: Coordinate grids, animated wireframe mesh waves, point-cloud node arrays, and vertical scanning laser lines.
  * **Medical Imaging**: Real-time MRI BOLD signal wave sweeps, digital scope ticks, and target reticle crosshairs.
  * **Cancer & Pathology**: Microscopic cytology cells, deep attention heatmaps, and bounding-box diagnostic scopes.
* **RUN_SOLVER Interactivity**: Clicking the diagnostic button on a card triggers a multi-step console log simulation (e.g. running NeRF optimizers, marching cubes, or segmentation loops). The visual header is linked directly to this state: active runs instantly **speed up the wave loops, accelerate laser sweeps, and glow components in intense emerald green**, visualizing real-time pipeline execution.

### 4. Publications Filtering & Citation modal
* **Dynamic Filtering**: Sorts publications instantly by year or title, filters by Journal vs. Conference, and includes a live text search.
* **BibTeX Modal**: Clicking citations opens a copyable BibTeX modal panel with click-to-copy feedback indices.

---

## 🛠 Technology Stack

1. **Framework Core**: React + Vite (non-interactive build takes just 150ms).
2. **Graphics Engine**: HTML5 Canvas with custom 2D context perspective math (no bulky Three.js dependencies, keeping the site extremely lightweight).
3. **Styling**: Custom CSS variables mapping deep space obsidian backgrounds (`#050608`), neon cyan (`#00f2fe`), and emerald green (`#00f5a0`) accents.
4. **Icons**: Optimized custom inline SVGs to prevent bundler resolution errors.

---

## 🚀 Execution & Command Architecture

### Local Development Server
To launch the hot-reloading local console:
```bash
npm run dev
```

### Production Bundling
To compile the site into static production assets:
```bash
npm run build
```

This compiles a clean standalone HTML, custom CSS, and a compressed JS bundle inside `dist/`, including automated hashing of the color profile photo asset.
