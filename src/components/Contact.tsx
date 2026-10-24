import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, Eye, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "lankavinayvamsi@gmail.com",
      href: "mailto:lankavinayvamsi@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 93903•••65",
      href: null,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Visakhapatnam, AP",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-[#0077b5]" },
    { icon: Github, label: "GitHub", href: "#", color: "hover:bg-[#333]" },
    { icon: Mail, label: "Email", href: "mailto:lankavinayvamsi@gmail.com", color: "hover:bg-primary" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
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
              Contact
            </span>
            <h2 className="section-title">
              Let's Work{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="section-subtitle mx-auto mt-6">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-5 gap-8"
          >
            {/* Contact Info - Left Side */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {/* Contact Card */}
              <div className="glass-card p-8 glow">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.div 
                      key={info.label}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <info.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
                    Connect with me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ y: -4 }}
                        className={`p-4 rounded-xl bg-muted text-foreground ${social.color} hover:text-white transition-all duration-300`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resume CTA Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button 
                      type="button"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-5 cursor-pointer group block text-center w-full"
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <Eye className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1">View Resume</h4>
                          <p className="text-xs text-muted-foreground">Preview my CV</p>
                        </div>
                      </div>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[95vw] h-[88vh] p-4 sm:p-6 flex flex-col bg-card/95 backdrop-blur-xl border-border">
                    <DialogHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border pr-8 gap-3 sm:gap-0">
                      <div>
                        <DialogTitle className="text-xl font-bold text-foreground">
                          Vinay Vamsi Lanka — Resume
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                          VAMSI_RESUME_2025
                        </DialogDescription>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="/VAMSI_RESUME_2025.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open</span>
                        </a>
                        <a
                          href="/VAMSI_RESUME_2025.docx"
                          download="VAMSI_RESUME_2025.docx"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Word (.docx)</span>
                        </a>
                        <a
                          href="/VAMSI_RESUME_2025.pdf"
                          download="VAMSI_RESUME_2025.pdf"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </a>
                      </div>
                    </DialogHeader>
                    <div className="flex-1 w-full h-full min-h-0 rounded-lg overflow-hidden border border-border/60 bg-muted/10 mt-3">
                      <iframe
                        src="/VAMSI_RESUME_2025.pdf#toolbar=1"
                        title="Resume - Vinay Vamsi Lanka"
                        className="w-full h-full rounded-lg bg-white"
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <motion.a 
                  href="/VAMSI_RESUME_2025.docx"
                  download="VAMSI_RESUME_2025.docx"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-5 cursor-pointer group block text-center"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Download className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Download</h4>
                      <p className="text-xs text-muted-foreground">VAMSI_RESUME_2025.docx</p>
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 hover-glow">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                  Send a Message
                </h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
