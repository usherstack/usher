export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleFullName: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "swd",
    name: "Ebanzer Rao",
    role: "SWD",
    roleFullName: "Software & Web Development",
    bio: "Leads scalable web and software development with a focus on performance, clean architecture, and user-centric solutions.",
    image: "/images/swd.png",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "growth",
    name: "Sakshi Rai",
    role: "GROWTH",
    roleFullName: "Marketing & Scaling",
    bio: "Drives marketing strategies, user acquisition, and business growth using data-driven approaches.",
    image: "/images/growth.png",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "devops",
    name: "Utkarsh Tiwari",
    role: "DEVOPS",
    roleFullName: "Cloud & Infrastructure",
    bio: "Handles cloud systems, CI/CD pipelines, and infrastructure automation to ensure scalability and reliability.",
    image: "/images/devops.png",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "appdev",
    name: "Harsh Srivastava",
    role: "APP DEV",
    roleFullName: "Application Development",
    bio: "Builds high-performance mobile and cross-platform applications with seamless UI and strong backend integration.",
    image: "/images/appdev.png",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "ai-ds",
    name: "Raunak kesarwani",
    role: "AI/DS",
    roleFullName: "AI & Data Solutions",
    bio: "Develops AI models and data-driven systems to automate processes and generate actionable insights.",
    image: "/images/ai-ds.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "uiux",
    name: "Md. Manhar",
    role: "UI/UX",
    roleFullName: "Design & Creative",
    bio: "Designs intuitive interfaces and engaging user experiences with strong visual identity and usability principles.",
    image: "/images/UiUx.png",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];
