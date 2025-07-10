export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="font-display text-2xl font-bold mb-4 text-cyber-blue">
            <span className="text-cyber-green">&gt;</span> SANJAY.PATHANIA
          </div>
          <p className="text-gray-400 font-mono text-sm mb-6">
            Architecting the future, one cloud at a time.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://linkedin.com/in/sanjaypathania" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-blue transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://github.com/sanjaypathania" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-green transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://twitter.com/sanjaypathania" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-purple transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
              <i className="fab fa-aws text-xl"></i>
            </a>
          </div>
          <div className="text-gray-500 font-mono text-xs">
            © 2024 Sanjay Pathania. Crafted with <span className="text-cyber-blue">AWS</span> & <span className="text-cyber-green">passion</span>.
          </div>
        </div>
      </div>
    </footer>
  );
}
