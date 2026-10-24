import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, GraduationCap, Target, Zap, Users, Lightbulb } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "7.8", label: "CGPA", suffix: "" },
    { number: "1", label: "Project", suffix: "" },
    { number: "2", label: "Certifications", suffix: "" },
    { number: "2", label: "Languages", suffix: "" },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "B.Tech CSE at GIET Engineering College with strong foundation in programming",
      color: "primary",
    },
    {
      icon: Target,
      title: "Career Focus",
      description: "Building efficient, scalable applications that solve real-world problems",
      color: "accent",
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Always exploring new technologies and industry best practices",
      color: "primary",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Strong communication skills and experience in collaborative environments",
      color: "accent",
    },
    {
      icon: Zap,
      title: "Problem Solver",
      description: "Analytical mindset with a passion for tackling complex challenges",
      color: "primary",
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="page-container relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
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
              About Me
            </span>
            <h2 className="section-title">
              Passionate About Creating{" "}
              <span className="gradient-text">Digital Solutions</span>
            </h2>
            <p className="section-subtitle mx-auto mt-6">
              A dedicated software developer with a strong academic background and hands-on experience 
              in building web applications
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="stat-card"
              >
                <div className="stat-number">
                  {stat.number}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 md:p-10 glow">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                  My Story
                </h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a passionate Computer Science student currently pursuing my B.Tech at{" "}
                    <span className="text-foreground font-medium">GIET Engineering College</span>, 
                    Rajahmundry. My journey in tech started with curiosity and has evolved 
                    into a deep passion for creating impactful digital solutions.
                  </p>
                  <p>
                    With a strong foundation in programming languages like{" "}
                    <span className="text-primary">Python</span>, I've developed hands-on 
                    experience building real-world web applications — including an ML-powered 
                    bus booking platform.
                  </p>
                  <p>
                    I'm currently exploring{" "}
                    <span className="text-accent">Machine Learning</span> and{" "}
                    <span className="text-accent">Generative AI</span>, and seeking a 
                    software development internship to contribute to innovative projects 
                    while gaining real-world software development experience.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="glass-card p-5 hover-glow group"
                >
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${
                    item.color === "primary" 
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground"
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
