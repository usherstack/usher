import {
  Code,
  Smartphone,
  Palette,
  BrainCircuit,
  Megaphone,
  Server,
  Shield,
  Globe,
} from "lucide-react";
import React from "react";

// Production Config - Update these for deployment
export const config = {
  // Placeholder URL for demo projects - replace with actual domain in production
  demoUrl: "https://usher.agency",
  // Calendly URL for booking - replace with your actual Calendly link
  calendlyUrl:
    "https://calendly.com/renutkarshbhargav?hide_landing_page_details=1&hide_gdpr_banner=1",
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "High-performance, scalable web applications built with modern frameworks and edge computing.",
    icon: Code,
  },
  {
    id: "app-development",
    title: "App Development",
    description:
      "Native-feeling mobile experiences that run flawlessly across iOS and Android platforms.",
    icon: Smartphone,
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Sleek, futuristic brand identities and interfaces that communicate technical superiority.",
    icon: Palette,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Infusing your products with cutting-edge machine learning and generative AI capabilities.",
    icon: BrainCircuit,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Data-driven growth strategies to amplify your reach and dominate your target market.",
    icon: Megaphone,
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description:
      "Resilient, distributed server architectures designed for maximum uptime and security.",
    icon: Server,
  },
];

// Category structure with sub-categories based on pricing catalog
export type CategoryWithSubcategories = {
  name: string;
  subcategories: string[];
};

export const categoryStructure: Record<string, string[]> = {
  All: [],
  Web: [
    "Custom Website",
    "Static Website",
    "Dynamic Website",
    "E-commerce Website",
    "CMS",
    "Web Application",
    "PWA",
    "Landing Page",
  ],
  App: [
    "Android App",
    "iOS App",
    "Cross-platform",
    "Hybrid App",
    "Custom App",
    "API Integration",
  ],
  Design: [
    "UI Design",
    "UX Design",
    "Wireframing",
    "Prototyping",
    "Logo Design",
    "Social Media Assets",
    "Branding",
    "Dashboard Design",
  ],
  AI: [
    "AI Chatbot",
    "Data Dashboard",
    "Real-time Apps",
    "Microservices",
    "Scalable Systems",
  ],
  Marketing: [
    "Brand Strategy",
    "Social Branding",
    "Content Marketing",
    "Ad Creatives",
    "SEO",
    "Visual Storytelling",
  ],
};

export type Project = {
  id: string;
  title: string;
  category: "Web" | "App" | "Design" | "AI" | "Marketing";
  subcategory?: string;
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "nexus-finance",
    title: "Nexus Finance",
    category: "Web",
    subcategory: "Web Application",
    image: "/images/project1.png",
    description:
      "A decentralized finance dashboard with real-time trading metrics.",
    problem:
      "Existing platforms were too slow and visually cluttered for high-frequency traders.",
    solution:
      "Built a high-performance React application with WebSockets for real-time data streaming and a dark, minimalist UI.",
    result: "Increased user retention by 45% and reduced latency by 300ms.",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Framer Motion",
    ],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "pulse-fitness",
    title: "Pulse Fitness Tracker",
    category: "App",
    subcategory: "Cross-platform",
    image: "/images/project2.png",
    description: "An AI-powered fitness app that adjusts workouts dynamically.",
    problem:
      "Users struggled to maintain workout routines without personal trainers.",
    solution:
      "Integrated a custom machine learning model to adapt workout difficulty based on biometric feedback from wearables.",
    result:
      "Achieved over 100k downloads in the first month with a 4.8-star rating.",
    techStack: ["React Native", "Python", "TensorFlow", "GraphQL"],
    liveUrl: config.demoUrl,
  },
  {
    id: "aethos-ai",
    title: "Aethos AI Platform",
    category: "AI",
    subcategory: "AI Chatbot",
    image: "/images/project3.png",
    description: "An enterprise AI platform for automated customer service.",
    problem: "Customer support costs were scaling linearly with user growth.",
    solution:
      "Deployed a fine-tuned LLM capable of handling 80% of tier 1 support queries with a human-like tone.",
    result:
      "Reduced support costs by 60% while improving customer satisfaction scores.",
    techStack: ["Next.js", "OpenAI API", "Redis", "PostgreSQL"],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "nova-commerce",
    title: "Nova E-Commerce",
    category: "Web",
    subcategory: "E-commerce Website",
    image: "/images/project4.png",
    description: "A headless e-commerce storefront for a luxury tech brand.",
    problem: "The client's monolithic CMS was slow and difficult to update.",
    solution:
      "Migrated to a headless architecture using Shopify and a custom front-end.",
    result:
      "Improved page load times by 400% and increased conversion rate by 22%.",
    techStack: [
      "Next.js",
      "Shopify Storefront API",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: config.demoUrl,
  },
  {
    id: "synapse-analytics",
    title: "Synapse Data Analytics",
    category: "Web",
    subcategory: "Web Application",
    image: "/images/project5.png",
    description: "A powerful data visualization tool for enterprise teams.",
    problem: "Data analysts spent too much time building custom reports.",
    solution:
      "Created an intuitive drag-and-drop dashboard builder with WebGL-powered charts.",
    result: "Saved analysts an average of 15 hours per week.",
    techStack: ["React", "D3.js", "Express", "MongoDB"],
    liveUrl: config.demoUrl,
    githubUrl: "https://github.com",
  },
  {
    id: "quantum-marketing",
    title: "Quantum SaaS Campaign",
    category: "Marketing",
    subcategory: "SEO",
    image: "/images/project6.png",
    description:
      "A comprehensive digital marketing campaign for a B2B SaaS startup.",
    problem: "The client had a great product but zero market visibility.",
    solution:
      "Designed a multi-channel strategy focusing on SEO, content marketing, and targeted LinkedIn ads.",
    result: "Generated 500+ qualified leads and a 300% ROI on ad spend.",
    techStack: ["SEO", "Google Ads", "LinkedIn Ads", "HubSpot", "Figma"],
    liveUrl: config.demoUrl,
  },
  {
    id: "horizon-branding",
    title: "Horizon Identity",
    category: "Design",
    subcategory: "Branding",
    image: "/images/project1.png",
    description: "A complete rebrand for an aerospace engineering firm.",
    problem:
      "The company's image felt dated and didn't reflect their cutting-edge work.",
    solution:
      "Developed a sleek, modern visual identity, including a new logo, typography, and digital assets.",
    result:
      "Successfully repositioned the brand to attract top-tier talent and clients.",
    techStack: ["Illustrator", "Photoshop", "After Effects", "Figma"],
    liveUrl: config.demoUrl,
  },
  {
    id: "omni-ai",
    title: "Omni Vision AI",
    category: "AI",
    subcategory: "Real-time Apps",
    image: "/images/project3.png",
    description:
      "Computer vision system for automated quality control in manufacturing.",
    problem: "Manual inspection was slow and prone to human error.",
    solution:
      "Trained a custom CNN to detect microscopic defects in real-time on the assembly line.",
    result:
      "Achieved 99.9% accuracy, completely eliminating defective product shipments.",
    techStack: ["Python", "PyTorch", "OpenCV", "C++", "React"],
    githubUrl: "https://github.com",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CEO",
    company: "Nexus Finance",
    content:
      "USHER didn't just build us an app; they engineered a competitive advantage. Their technical prowess is unmatched.",
    avatar: "/images/avatar1.png",
  },
  {
    id: "t2",
    name: "Marcus Thorne",
    role: "Lead Engineer",
    company: "Aethos AI",
    content:
      "Working with USHER felt like having an elite strike team embedded in our company. They execute with terrifying precision.",
    avatar: "/images/avatar2.png",
  },
  {
    id: "t3",
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Nova Commerce",
    content:
      "They perfectly balance raw engineering power with an incredible eye for design. Our new platform is a work of art.",
    avatar: "/images/avatar3.png",
  },
];
