import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-card/50">
      <div className="container px-6">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <span>© {currentYear} Vinay Vamsi Lanka. Built with</span>
          <Heart className="w-4 h-4 text-primary fill-primary" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
