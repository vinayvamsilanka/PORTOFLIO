import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X, ArrowUpRight, Folder, Code2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  outcomes: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "SmartBus AI — Bus Ticket Booking System",
      description: "A next-generation smart bus ticket booking platform combining Machine Learning, graph-based route optimization and Generative AI for intelligent intercity travel.",
      longDescription: "Developed a responsive web-based Smart Bus Ticket Booking System that combines Machine Learning, graph-based Route Optimization and Generative AI to deliver the fastest, most cost-effective and sustainable intercity bus journeys. Built on a Python Flask backend with JWT-secured REST APIs and SQLAlchemy ORM, the platform integrates Scikit-learn ML models for fare and delay prediction, a Gemini-powered conversational travel assistant, live GPS bus tracking on interactive Leaflet.js maps, and instant UPI payments with auto-generated PDF boarding passes and verifiable QR tickets.",
      techStack: ["Python", "Flask", "Scikit-learn", "Google Gemini", "Leaflet.js", "SQLAlchemy", "JWT Auth", "ReportLab", "HTML5/CSS3/ES6"],
      outcomes: [
        "AI Route Optimizer with graph-based multi-hop split routing for direct and connecting journeys",
        "ML engine predicting fare trends, surge conditions and real-time arrival delays",
        "Gemini-powered conversational AI assistant for natural-language travel planning",
        "Live GPS bus tracking with fleet radar and real-time ETAs on interactive maps",
        "Secure user registration & login with JWT authentication and role-based admin dashboard",
        "Instant UPI payments with auto-generated PDF boarding passes and verifiable QR tickets",
      ],
      githubUrl: "https://github.com/vinayvamsilanka/smartBus",
      liveUrl: "https://smartbus-ai-r4ay.onrender.com/",
      featured: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section className="page-container relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium tracking-widest uppercase mb-6">
              Portfolio
            </span>
            <h2 className="section-title">
              Featured{" "}
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle mx-auto mt-6">
              Real-world applications built with passion and precision
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Featured Project Card */}
            {projects.filter(p => p.featured).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="lg:col-span-2 group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="glass-card overflow-hidden hover-glow cursor-pointer">
                  {/* Project Header Image/Gradient */}
                  <div className="h-64 md:h-80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-muted">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                    </div>
                    
                    {/* Floating elements */}
                    <motion.div 
                      className="absolute top-8 left-8 w-20 h-20 border border-primary/30 rounded-xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute bottom-12 right-12 w-16 h-16 bg-accent/20 rounded-lg"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Folder className="w-20 h-20 text-primary/50 mx-auto mb-4" />
                        <span className="text-2xl font-bold text-primary/70">{project.title.charAt(0)}</span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>View Details</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-primary text-sm font-medium uppercase tracking-wider">Featured Project</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View source on GitHub"
                            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="View live project"
                            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Standard Project Cards */}
            {projects.filter(p => !p.featured).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
              >
                <div className="glass-card p-8 hover-glow cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Folder className="w-7 h-7" />
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View source on GitHub"
                          className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-card max-w-3xl w-full max-h-[85vh] overflow-auto neon-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="h-40 bg-gradient-to-br from-primary/30 via-accent/20 to-muted relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-3 rounded-xl bg-background/80 hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {selectedProject.featured ? "Featured Project" : "Project"}
                </span>
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Repo
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground mt-2 mb-6">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {selectedProject.longDescription}
              </p>

              {/* Tech stack */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-primary rounded-full" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-accent rounded-full" />
                  Key Outcomes
                </h4>
                <ul className="space-y-3">
                  {selectedProject.outcomes.map((outcome, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {outcome}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
