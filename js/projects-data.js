/**
 * PROJECTS DATA REPOSITORY
 * Detailed case studies for the editorial portfolio showcase.
 */

const projectsData = [
  {
    id: "vanguard-fintech",
    title: "Vanguard Telemetry Engine",
    category: "systems",
    categoryLabel: "High-Throughput Systems",
    year: "2025",
    role: "Lead Systems Architect & Core Engineer",
    summary: "High-frequency streaming telemetry platform processing 45,000+ financial market events/sec with sub-2ms visual rendering latency.",
    thumbnail: "assets/projects/vanguard-fintech.jpg",
    tags: ["Rust", "TypeScript", "WebSockets", "WebAssembly", "Tailored Canvas"],
    metrics: [
      { label: "Rendering Latency", value: "< 1.8ms" },
      { label: "Throughput", value: "45K events/s" },
      { label: "Memory Footprint", value: "-62%" }
    ],
    problem: "Institutional liquidity traders required zero-jitter order book telemetry and risk visualizer across decentralized exchanges without browser UI freezes or thread locking during volatility spikes.",
    solution: "Architected a dual-threaded pipeline offloading raw binary deserialization into WebAssembly workers, paired with a custom GPU-accelerated canvas chart renderer that bypasses DOM reflow bottlenecks completely.",
    architecture: "Event-driven WebSocket stream feeds a RingBuffer in WebWorker -> WASM parses binary protobufs -> OffscreenCanvas blits updates at 60fps locked, maintaining absolute visual consistency and microsecond precision.",
    links: {
      live: "#",
      github: "https://github.com"
    }
  },
  {
    id: "synapse-search",
    title: "Synapse Cognitive Knowledge Graph",
    category: "web",
    categoryLabel: "Intelligent Web Platform",
    year: "2025",
    role: "Full-Stack Engineer & AI Interface Designer",
    summary: "Context-aware enterprise documentation engine pairing vector embeddings with an interactive multi-dimensional semantic graph explorer.",
    thumbnail: "assets/projects/synapse-search.jpg",
    tags: ["Next.js", "Python / FastAPI", "pgvector", "D3.js", "TypeScript"],
    metrics: [
      { label: "Search Accuracy", value: "98.4%" },
      { label: "Query Resolution", value: "140ms" },
      { label: "Engineer Adoption", value: "3,200+" }
    ],
    problem: "Cross-functional engineering departments struggled to navigate 40,000+ scattered API specs, RFCs, and internal architecture documentation across fragmented repositories.",
    solution: "Designed and engineered an automated embedding pipeline with hybrid BM25 + dense vector similarity, visualized through a minimalist interactive D3 force-directed semantic graph.",
    architecture: "FastAPI semantic ingestion worker chunking Markdown/OpenAPI documents into PostgreSQL pgvector, with Next.js App Router providing instant streaming responses and smooth canvas-linked entity exploration.",
    links: {
      live: "#",
      github: "https://github.com"
    }
  },
  {
    id: "aura-design-system",
    title: "Aura Design System & Component Library",
    category: "design-systems",
    categoryLabel: "Design System & Architecture",
    year: "2024",
    role: "Design Technologist & Frontend Lead",
    summary: "Enterprise-grade accessible design system and token management engine unifying 14 product surfaces across web and mobile web.",
    thumbnail: "assets/projects/aura-design-system.jpg",
    tags: ["Design Tokens", "React", "Vanilla CSS", "Storybook", "WCAG AAA"],
    metrics: [
      { label: "Component Count", value: "54+" },
      { label: "Accessibility", value: "WCAG AAA" },
      { label: "Design Debt", value: "-45%" }
    ],
    problem: "Disjointed UI components across 5 autonomous product squads caused inconsistent brand presentation, inaccessible color contrast, and redundant engineering efforts.",
    solution: "Created an immutable design token foundation (Style Dictionary) with zero-runtime CSS custom properties, paired with strict ARIA automated compliance testing and headless React primitives.",
    architecture: "Figma Tokens sync to GitHub Actions -> Style Dictionary compiles platform-specific tokens -> React primitive components distributed via private npm package with 100% test coverage.",
    links: {
      live: "#",
      github: "https://github.com"
    }
  },
  {
    id: "kroma-editorial",
    title: "Kroma Architectural Publication",
    category: "web",
    categoryLabel: "Editorial & Web Experience",
    year: "2024",
    role: "Independent Creative Engineer",
    summary: "Minimalist digital publication platform celebrating modern architecture, industrial design, and typography with sub-second page loads.",
    thumbnail: "assets/projects/kroma-editorial.jpg",
    tags: ["HTML5", "Modern CSS", "JavaScript", "Typography Engine", "Static Site"],
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "First Contentful Paint", value: "0.3s" },
      { label: "Asset Overhead", value: "< 45KB" }
    ],
    problem: "Modern editorial websites are notoriously cluttered with telemetry scripts, slow fonts, disruptive popups, and broken layout shifts that degrade reading focus.",
    solution: "Engineered a zero-dependency, ultra-lightweight editorial engine prioritizing typographic rhythm, baseline grids, subtle fluid responsive scaling, and instant navigation transitions.",
    architecture: "Semantic static generation, pre-baked system font fallbacks with subsetted web fonts, pure CSS grid page layouts, and client-side page pre-fetching.",
    links: {
      live: "#",
      github: "https://github.com"
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { projectsData };
}
