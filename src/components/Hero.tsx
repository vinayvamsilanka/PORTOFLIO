import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      cursorX.set(clientX - window.innerWidth / 2);
      cursorY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const rotateX = useTransform(cursorYSpring, [-300, 300], [5, -5]);
  const rotateY = useTransform(cursorXSpring, [-500, 500], [-5, 5]);

  
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  const name = "Vinay Vamsi";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-50 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Animated gradient orbs with enhanced animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
          animate={{ 
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px]"
          animate={{ 
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1))"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating geometric shapes with enhanced interactions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[15%] w-24 h-24 border-2 border-primary/40 rounded-2xl backdrop-blur-sm"
          animate={{ 
            rotate: [0, 90, 180, 270, 360], 
            y: [0, -30, 0],
            borderColor: ["hsl(var(--primary) / 0.4)", "hsl(var(--accent) / 0.4)", "hsl(var(--primary) / 0.4)"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-[10%] w-16 h-16 bg-gradient-to-br from-accent/30 to-primary/30 rounded-xl"
          animate={{ 
            rotate: [-360, 0], 
            scale: [1, 1.3, 1],
            borderRadius: ["20%", "50%", "20%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-[15%] w-20 h-20 border-2 border-accent/30 rounded-full"
          animate={{ 
            y: [0, 40, 0], 
            x: [0, -20, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-[20%] w-10 h-10 bg-primary/40 rounded-full"
          animate={{ 
            scale: [1, 2, 1], 
            opacity: [0.4, 0.8, 0.4],
            boxShadow: ["0 0 0px hsl(var(--primary) / 0.5)", "0 0 40px hsl(var(--primary) / 0.5)", "0 0 0px hsl(var(--primary) / 0.5)"]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* New floating elements */}
        <motion.div
          className="absolute top-1/2 left-[5%] w-6 h-6 bg-accent/50 rounded-full"
          animate={{ 
            y: [0, -60, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[8%] w-14 h-14 border border-primary/20 rounded-lg"
          animate={{ 
            rotate: [45, 135, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient line decoration */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), transparent)"
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.6 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      />

      <div className="container relative z-10 px-6">
        <motion.div 
          className="max-w-5xl mx-auto perspective"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="preserve-3d"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Main heading with letter animation */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
                <span className="block text-foreground overflow-hidden">
                  {name.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                      whileHover={{ 
                        scale: 1.2, 
                        color: "hsl(var(--primary))",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
                <motion.span 
                  className="block gradient-text mt-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  Lanka
                </motion.span>
              </h1>
            </motion.div>

            {/* CTA Buttons with enhanced hover effects */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
            >
              <Link to="/projects">
                <motion.div 
                  className="btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="flex items-center gap-2 relative z-10">
                    View My Work
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div 
                  className="btn-outline relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Let's Connect</span>
                </motion.div>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="group flex flex-col items-center gap-3">
            <motion.span 
              className="text-xs text-muted-foreground tracking-[0.3em] uppercase group-hover:text-primary transition-colors"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-7 h-12 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary transition-colors flex justify-center pt-2 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary relative z-10"
              />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
