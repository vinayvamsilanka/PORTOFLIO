import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "education" | "certification";
  title: string;
  organization: string;
  location?: string;
  period?: string;
  description?: string;
  grade?: string;
}

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: "education",
      title: "B.Tech in Computer Science and Engineering",
      organization: "GIET Engineering College",
      location: "Rajamahendravaram",
      period: "2024 - 2027",
      grade: "CGPA: 7.8",
    },
    {
      id: 2,
      type: "certification",
      title: "AI Internship Program",
      organization: "Skill Dzire",
      location: "Hyderabad",
      period: "2024",
      description: "Completed short-term internship program in Artificial Intelligence fundamentals",
    },
    {
      id: 3,
      type: "certification",
      title: "Python & Java Training",
      organization: "ISAN",
      location: "Kakinada",
      period: "2024",
      description: "6-month intensive training program in Python and Java programming",
    },
    {
      id: 4,
      type: "education",
      title: "Diploma in Computer Engineering",
      organization: "KIET",
      location: "Korangi",
      period: "2021 - 2024",
      grade: "Percentage: 81%",
    },
    {
      id: 5,
      type: "education",
      title: "Secondary Education (SSC)",
      organization: "New Horizon English Medium High School",
      location: "Kurmannapalem",
      period: "2021",
      grade: "Score: 584",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  return (
    <section className="page-container relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-primary text-sm font-medium tracking-widest uppercase mb-6">
              Journey
            </span>
            <h2 className="section-title">
              Education &{" "}
              <span className="gradient-text">Experience</span>
            </h2>
            <p className="section-subtitle mx-auto mt-6">
              My academic journey and professional development path
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
              <div className="h-full bg-gradient-to-b from-primary via-accent to-transparent" />
            </div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.type === "education" ? GraduationCap : Award;
                const iconBg = item.type === "education" ? "bg-primary" : "bg-accent";

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={`relative flex items-start gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}
                        style={{
                          boxShadow: item.type === "education" 
                            ? "0 0 30px hsl(var(--primary) / 0.4)"
                            : "0 0 30px hsl(var(--accent) / 0.4)"
                        }}
                      >
                        <Icon className="w-6 h-6 text-background" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 ${
                      isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                    }`}>
                      <motion.div 
                        className="glass-card p-6 hover-glow"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Period badge */}
                        {item.period && (
                          <div className={`flex items-center gap-2 mb-3 ${isEven ? "md:justify-end" : ""}`}>
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">{item.period}</span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>

                        {/* Organization */}
                        <p className="text-muted-foreground font-medium mb-2">
                          {item.organization}
                        </p>

                        {/* Location */}
                        {item.location && (
                          <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-3 ${isEven ? "md:justify-end" : ""}`}>
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                        )}

                        {/* Grade badge */}
                        {item.grade && (
                          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                            item.type === "education"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent"
                          }`}>
                            {item.grade}
                          </span>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
