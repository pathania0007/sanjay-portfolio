import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Terminal from "@/components/ui/terminal";

export default function Hero() {
  const terminalCommands = [
    { command: "whoami", output: "AWS Cloud Engineer | Solution Architect", delay: 1000 },
    { command: "cat experience.txt", output: "5+ Years | AWS Certified | Cloud Infrastructure Specialist", delay: 1500 },
    { command: 'echo "Welcome to my digital realm"', output: "Designing scalable cloud architectures...", delay: 2000 }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative grid-background pt-20">
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
          <Terminal 
            commands={terminalCommands}
            className="mb-8"
            autoPlay={true}
          />
          
          <h1 className="font-display text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyber-blue via-cyber-purple to-neon-green bg-clip-text text-transparent animate-glow">
            SANJAY PATHANIA
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Crafting the future of cloud infrastructure with <span className="text-cyber-blue">AWS</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="neuro-card rounded-xl px-4 py-2 flex items-center space-x-2 bg-transparent border-cyber-blue">
              <i className="fab fa-aws text-cyber-blue text-xl aws-icon"></i>
              <span className="font-mono text-sm">Solution Architect</span>
            </Badge>
            <Badge className="neuro-card rounded-xl px-4 py-2 flex items-center space-x-2 bg-transparent border-cyber-green">
              <i className="fas fa-cloud text-cyber-green text-xl aws-icon"></i>
              <span className="font-mono text-sm">Cloud Engineer</span>
            </Badge>
            <Badge className="neuro-card rounded-xl px-4 py-2 flex items-center space-x-2 bg-transparent border-cyber-purple">
              <i className="fas fa-shield-alt text-cyber-purple text-xl aws-icon"></i>
              <span className="font-mono text-sm">Security Expert</span>
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="glass-card hover:bg-cyber-blue hover:bg-opacity-20 px-8 py-3 rounded-xl font-mono transition-all duration-300 border border-cyber-blue"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <i className="fas fa-rocket mr-2"></i>
              Explore Projects
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="glass-card hover:bg-cyber-green hover:bg-opacity-20 px-8 py-3 rounded-xl font-mono transition-all duration-300 border border-cyber-green"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <i className="fas fa-download mr-2"></i>
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
