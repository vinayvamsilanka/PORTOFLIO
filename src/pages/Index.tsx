import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const RevealSection = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    className="scroll-mt-20"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
  >
    {children}
  </motion.section>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>
        <RevealSection id="about">
          <About />
        </RevealSection>
        <RevealSection id="skills">
          <Skills />
        </RevealSection>
        <RevealSection id="projects">
          <Projects />
        </RevealSection>
        <RevealSection id="experience">
          <Experience />
        </RevealSection>
        <RevealSection id="contact">
          <Contact />
        </RevealSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
