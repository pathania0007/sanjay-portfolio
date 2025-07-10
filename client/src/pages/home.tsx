import { useEffect } from "react";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import ParticleBackground from "@/components/ui/particle-background";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  useEffect(() => {
    // Console welcome message
    console.log(`
🚀 Welcome to Sanjay Pathania's AWS Portfolio
═══════════════════════════════════════════
🔧 AWS Cloud Engineer | Solution Architect
📧 sanjaypathania0@gmail.com
🌐 www.sanjaypathania.in
═══════════════════════════════════════════
    `);
  }, []);

  return (
    <div className="bg-dark-base text-white font-sans overflow-x-hidden relative">
      {/* Scanning Line Effect */}
      <div className="scan-line"></div>
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
