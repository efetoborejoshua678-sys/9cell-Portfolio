export const personalInfo = {
  name: "Ugen Efetobore Joshua",
  alias: "9CELL",
  title: "Software Engineering Student & Web Developer",
  pitch: "I’m a software engineering student building practical, user-focused web experiences and applications.",
  shortBio: "I'm Ugen Efetobore Joshua, also known as 9CELL, a software engineering student with a growing focus on web development. I build practical projects using Java, JSP, MySQL, HTML, CSS, and JavaScript. I enjoy turning ideas into useful digital experiences and keep expanding my skills through hands-on work. I’m open to freelance projects, collaborations, and opportunities to learn and contribute.",
  location: "Port Harcourt / Warri, Nigeria",
  availability: "Available for Freelance & Software Roles",
  email: "ninecell783@gmail.com",
  whatsapp: "07061891825",
  whatsappUrl: "https://wa.me/2347061891825?text=Hi%20Joshua,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!",
  github: "https://github.com/9cell",
  linkedin: "https://www.linkedin.com/in/ugen-joshua",
  twitter: "https://twitter.com/9cell_dev",
  cvUrl: "/assets/joshua-cv.pdf",
  images: {
    headshot: "/assets/joshua/joshua-headshot.jpg",
    wth: "/assets/joshua/joshua-wth.jpg",
    workspace: "/assets/joshua/joshua-workspace.jpg",
    portrait: "/assets/joshua/joshua-portrait.jpg",
  }
};

export const stats = [
  { label: "Completed Projects", value: "7+", detail: "Live Web & SaaS Apps" },
  { label: "Core Technologies", value: "12+", detail: "Languages & Frameworks" },
  { label: "SIWES Training", value: "Warri Tech Hub", detail: "Real-world engineering" },
  { label: "Client Satisfaction", value: "100%", detail: "Production Deliveries" },
];

export const projects = [
  {
    id: "weather-app",
    title: "Weather Forecast Experience",
    subtitle: "SIWES Real-Time Weather Application",
    category: "SIWES & Tools",
    categoryKey: "siwes",
    featured: true,
    liveUrl: "https://weather-app-siwes.vercel.app",
    githubUrl: "https://github.com/9cell/weather-app-siwes",
    image: "/assets/projects/weather-app.jpg",
    description: "An elegant glassmorphic weather exploration dashboard tracking live meteorological conditions across Nigeria (Port Harcourt, Lagos, Abuja, Calabar). Features a dynamic 5-day temperature curve graph, comprehensive atmospheric metrics (humidity, wind velocity, barometric pressure), and smooth multi-city search.",
    tags: ["React", "Glassmorphism", "REST API", "Chart.js", "Tailwind CSS"],
    highlights: [
      "Dynamic weather curve chart rendering 5-day temperature fluctuations",
      "Interactive multi-city quick switch (Port Harcourt, Lagos, Abuja, Calabar)",
      "Atmospheric breakdown: humidity, wind speed, air pressure, and UV index",
      "Sleek side dock navigation and theme matching outdoor weather states"
    ]
  },
  {
    id: "task-dashboard",
    title: "TaskFlow — Productivity Dashboard",
    subtitle: "Modern SaaS Task & Project Management System",
    category: "Full-Stack & SaaS",
    categoryKey: "saas",
    featured: true,
    liveUrl: "https://9cell-task-dashboard-siwes.vercel.app",
    githubUrl: "https://github.com/9cell/9cell-task-dashboard-siwes",
    image: "/assets/projects/task-dashboard.jpg",
    description: "A clean, modern SaaS task management application designed around the philosophy: 'Make room for the work that matters.' Features real-time task progress metrics (total, completed, in-progress, overdue), interactive calendar scheduling, and instant task creation modals.",
    tags: ["React", "State Management", "Tailwind CSS", "UI/UX", "Vercel"],
    highlights: [
      "Visual project progress tracking with percentage completion arcs",
      "Categorized task streams with status tags, priority markers, and time slots",
      "Integrated monthly calendar widget for deadline management",
      "Clean minimalist design language optimized for focus and productivity"
    ]
  },
  {
    id: "9cell-studio",
    title: "9CELL Dev Studio & Practice",
    subtitle: "Software Development Agency Platform",
    category: "Client & Brand",
    categoryKey: "client",
    featured: true,
    liveUrl: "https://9cell-app-beta.vercel.app",
    githubUrl: "https://github.com/9cell/9cell-app-beta",
    image: "/assets/projects/9cell-studio.jpg",
    description: "Digital presence platform for 9CELL software engineering practice. Built under the motto 'Build interfaces faster and make them useful', this platform showcases development capabilities, service tiers, bespoke engineering packages, and client onboarding workflows.",
    tags: ["Full-Stack", "Dark Cyber Theme", "React", "Branding", "Vercel"],
    highlights: [
      "Futuristic dark developer aesthetic with high-contrast glowing accents",
      "Comprehensive service packages breakdown for businesses and startups",
      "Interactive capabilities matrix and client inquiry funnel",
      "Responsive layout optimized for performance and conversion"
    ]
  },
  {
    id: "wth-booked",
    title: "WTH Booked — Workspace Booking System",
    subtitle: "Warri Tech Hub Coworking Platform",
    category: "SIWES & Tools",
    categoryKey: "siwes",
    featured: true,
    liveUrl: "https://wthbooked.name.ng",
    githubUrl: "https://github.com/9cell/wth-booked",
    image: "/assets/projects/wth-booked.jpg",
    description: "A comprehensive booking and facility management platform deployed for Warri Tech Hub. Streamlines desk reservations, private meeting room schedules, tech training bookings, and community events with role-based access for members and administrators.",
    tags: ["Full-Stack", "Booking Engine", "MySQL", "Authentication", "PHP/JS"],
    highlights: [
      "Real-time desk and meeting room availability booking calendar",
      "Direct integration with Warri Tech Hub physical facilities and training tracks",
      "Membership authentication, reservation passes, and instant confirmation",
      "Administrative dashboard for space utilization and visitor management"
    ]
  },
  {
    id: "campuslife",
    title: "CampusLife — Student Operating System",
    subtitle: "Academic & Campus Rhythm Workspace",
    category: "Full-Stack & SaaS",
    categoryKey: "saas",
    featured: true,
    liveUrl: "https://9cell-campuslife.netlify.app",
    githubUrl: "https://github.com/9cell/9cell-campuslife",
    image: "/assets/projects/campuslife.jpg",
    description: "An editorial-grade student workspace crafted for the daily rhythm of university life. Integrates academic tracking (live GPA calculation, course codes like SEN 301 and CSC 305), upcoming test timers, and personal campus budget management into one private dashboard.",
    tags: ["React", "Vite", "Editorial Design", "Student Workspace", "Netlify"],
    highlights: [
      "All-in-one student dashboard: Semester GPA (4.21), tests, and budget metrics",
      "Course deadline management tailored for computer science & software engineering",
      "Warm cream editorial aesthetic that reduces digital screen fatigue",
      "Interactive calendar and timetable sync for classes and assignments"
    ]
  },
  {
    id: "chef-anwilli",
    title: "Chef Anwilli — Culinary Portfolio",
    subtitle: "Personal Brand for CEO & Master Chef Faith Odiete",
    category: "Client & Brand",
    categoryKey: "client",
    featured: true,
    liveUrl: "https://anwilli.netlify.app/",
    githubUrl: "https://github.com/9cell/chef-anwilli",
    image: "/assets/projects/chef-anwilli.jpg",
    description: "A luxury culinary portfolio built for Chef Faith Odiete, Founder and CEO of Westscott Catering Services. Under the tagline 'Every bite leaves a landmark', the platform highlights signature gourmet dishes, culinary achievements, and direct WhatsApp booking.",
    tags: ["Client Project", "Luxury Dark Theme", "Netlify", "Conversion UI"],
    highlights: [
      "High-contrast luxury dark aesthetic with warm culinary accent tones",
      "Curated signature dish gallery with appetizing presentation cards",
      "Instant WhatsApp booking integration for catering and private chef inquiries",
      "Client story, culinary philosophy, and service credentials"
    ]
  },
  {
    id: "westscott-hub",
    title: "Westscott Catering Hub",
    subtitle: "Catering Marketplace & Event Dining Platform",
    category: "Client & Brand",
    categoryKey: "client",
    featured: false,
    liveUrl: "#",
    statusNote: "Localhost Development / Deployment Ready",
    githubUrl: "https://github.com/9cell/westscott-catering-hub",
    image: "/assets/projects/westscott-hub.jpg",
    description: "A sophisticated catering marketplace connecting event organizers with vetted culinary masters for daily meals, weddings, corporate events, and bespoke private dining. Features caterer discovery, customized menu planning, and instant quotes.",
    tags: ["Full-Stack", "Marketplace", "React", "Localhost", "In Development"],
    highlights: [
      "Vetted caterer discovery engine with event-type filtering",
      "Bespoke event planning interface with guest count calculator",
      "Warm gourmet palette with high-resolution food photography layout",
      "Interactive booking inquiry flow with catering quote generation"
    ]
  }
];

export const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "HTML5", level: "Advanced", icon: "Code2", tag: "Markup" },
      { name: "CSS3 / Tailwind CSS", level: "Advanced", icon: "Palette", tag: "Styling" },
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "FileCode2", tag: "Scripting" },
      { name: "React.js", level: "Proficient", icon: "Atom", tag: "Framework" },
      { name: "Responsive UI/UX", level: "Advanced", icon: "Layout", tag: "Design" },
    ]
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "Java", level: "Proficient", icon: "Coffee", tag: "Core Language" },
      { name: "JSP (JavaServer Pages)", level: "Proficient", icon: "Server", tag: "Enterprise Web" },
      { name: "REST APIs", level: "Proficient", icon: "Network", tag: "Architecture" },
      { name: "Node.js (Learning)", level: "In Progress", icon: "Cpu", tag: "Runtimes" },
    ]
  },
  {
    category: "Databases & Data",
    items: [
      { name: "MySQL", level: "Proficient", icon: "Database", tag: "Relational" },
      { name: "SQL Querying", level: "Proficient", icon: "Terminal", tag: "Queries" },
      { name: "Database Schema Design", level: "Proficient", icon: "FolderTree", tag: "Data Modeling" },
    ]
  },
  {
    category: "Tools & Deployment",
    items: [
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch", tag: "Version Control" },
      { name: "Netlify", level: "Proficient", icon: "Cloud", tag: "Hosting" },
      { name: "Vercel", level: "Proficient", icon: "Zap", tag: "Deployment" },
      { name: "VS Code & CLI", level: "Advanced", icon: "TerminalSquare", tag: "Tooling" },
    ]
  }
];

export const experience = [
  {
    role: "SIWES Software Engineering Intern",
    company: "Warri Tech Hub (WTH)",
    period: "2024 - 2025",
    location: "Warri, Delta State, Nigeria",
    description: "Hands-on industrial training building full-stack web applications and community software infrastructure. Architected and deployed production solutions including the WTH Booked workspace system, Weather forecast application, and TaskFlow management dashboard.",
    achievements: [
      "Engineered the WTH Booked workspace reservation system for tech hub members",
      "Developed responsive frontend interfaces with modern JavaScript and API integrations",
      "Collaborated with senior engineers on database modeling and performance optimization"
    ]
  },
  {
    role: "Software Engineering Student",
    company: "University Academic Program",
    period: "2022 - Present",
    location: "Port Harcourt / Nigeria",
    description: "Pursuing a comprehensive Software Engineering curriculum covering Object-Oriented Programming (Java), Data Structures & Algorithms, Database Management Systems (SQL), Computer Architecture, and Software Lifecycle Methodologies.",
    achievements: [
      "Maintained top academic standing across core engineering modules (SEN 301, CSC 305)",
      "Created CampusLife student operating system to empower campus peers",
      "Active participant in technical student communities and collaborative builds"
    ]
  },
  {
    role: "Freelance Web Developer & UI Designer",
    company: "9CELL Digital Practice",
    period: "2024 - Present",
    location: "Port Harcourt / Remote",
    description: "Delivering custom websites, brand portfolios, and digital tools for local businesses, catering services, and private professionals.",
    achievements: [
      "Designed and deployed Chef Anwilli's luxury culinary portfolio with WhatsApp booking",
      "Constructed Westscott Catering Hub marketplace frontend and service catalog",
      "Specialized in high-conversion landing pages and responsive user interfaces"
    ]
  }
];

export const testimonials = [
  {
    quote: "Joshua's dedication during his SIWES internship at Warri Tech Hub was phenomenal. He builds practical, reliable software and learns new technologies with remarkable speed.",
    author: "Warri Tech Hub Supervisor",
    role: "Technical Lead",
    organization: "Warri Tech Hub"
  },
  {
    quote: "The culinary portfolio Joshua created for Westscott Catering elevated our brand image completely. Clients regularly compliment the website and book straight through WhatsApp.",
    author: "Faith Odiete",
    role: "Founder & Master Chef",
    organization: "Westscott Catering Services"
  }
];
