import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 glass-card transition-all duration-300",
      isScrolled ? "backdrop-blur-md" : "backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-display text-xl font-bold text-cyber-blue">
            <span className="text-cyber-green">&gt;</span> SANJAY.PATHANIA
          </div>
          
          <div className="hidden md:flex space-x-8 font-mono text-sm">
            <a href="#home" className="hover:text-cyber-blue transition-colors duration-300">./home</a>
            <a href="#about" className="hover:text-cyber-blue transition-colors duration-300">./about</a>
            <a href="#projects" className="hover:text-cyber-blue transition-colors duration-300">./projects</a>
            <a href="#skills" className="hover:text-cyber-blue transition-colors duration-300">./skills</a>
            <a href="#contact" className="hover:text-cyber-blue transition-colors duration-300">./contact</a>
          </div>
          
          <div className="text-cyber-green font-mono text-sm">
            [ONLINE] <span className="animate-pulse-glow">●</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
