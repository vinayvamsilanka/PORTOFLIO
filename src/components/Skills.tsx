import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Globe, Brain, Terminal, Layers } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories: SkillCategory[] = [
    {
      title: "Backend & Database",
      icon: Database,
      color: "primary",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "Java", icon: "☕" },
        { name: "C", icon: "⚡" },
        { name: "MongoDB", icon: "🍃" },
        { name: "MySQL", icon: "🗄️" },
        { name: "SQL", icon: "📊" },
      ],
    },
    {
      title: "Front End",
      icon: Globe,
      color: "accent",
      skills: [
        { name: "HTML5", icon: "📄" },
        { name: "CSS3", icon: "🎨" },
        { name: "JavaScript", icon: "✨" },
        { name: "React", icon: "⚛️" },
        { name: "Angular", icon: "🅰️" },
      ],
    },
    {
      title: "Frameworks",
      icon: Layers,
      color: "accent",
      skills: [
        { name: "Flask", icon: "🌶️" },
        { name: "Tkinter", icon: "🪟" },
        { name: "Scikit-learn", icon: "🤖" },
      ],
    },
    {
      title: "Tools & IDEs",
      icon: Terminal,
      color: "primary",
      skills: [
        { name: "VS Code", icon: "💻" },
        { name: "Git", icon: "🔀" },
        { name: "GitHub", icon: "🐙" },
      ],
    },
    {
      title: "Soft Skills",
      icon: Brain,
      color: "accent",
      skills: [
        { name: "Problem Solving", icon: "🧩" },
        { name: "Teamwork", icon: "🤝" },
        { name: "Communication", icon: "💬" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } 
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } 
    },
  };

  return (
    <section className="page-container relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

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
              Technical Skills
            </span>
            <h2 className="section-title">
              My{" "}
              <span className="gradient-text">Expertise</span>
            </h2>
            <p className="section-subtitle mx-auto mt-6">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-card p-6 hover-glow group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    category.color === "primary" 
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
                  }`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={chipVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-colors cursor-default ${
                        category.color === "primary"
                          ? "bg-primary/10 border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50"
                          : "bg-accent/10 border-accent/20 text-muted-foreground hover:text-accent hover:border-accent/50"
                      }`}
                    >
                      <span>{skill.icon}</span>
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
