import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  commands: Array<{
    command: string;
    output: string;
    delay?: number;
  }>;
  className?: string;
  autoPlay?: boolean;
}

export default function Terminal({ commands, className, autoPlay = true }: TerminalProps) {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoPlay || currentCommand >= commands.length) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentCommand(prev => prev + 1);
      }, commands[currentCommand].delay || 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentCommand, commands, autoPlay]);

  return (
    <div className={cn("terminal-window rounded-lg p-6", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-sm font-mono ml-4">sanjay@aws-cloud:~$</span>
      </div>
      
      <div className="font-mono text-left text-sm space-y-2">
        {commands.slice(0, currentCommand + 1).map((cmd, index) => (
          <div key={index}>
            <div className="flex items-center">
              <span className="text-cyber-green">$</span>
              <span className="ml-2">{cmd.command}</span>
            </div>
            <div className={cn(
              "text-gray-300 ml-3",
              index === currentCommand && isTyping ? "typing-effect" : ""
            )}>
              {cmd.output}
            </div>
          </div>
        ))}
        
        {currentCommand < commands.length && (
          <div className="flex items-center">
            <span className="text-cyber-green">$</span>
            <span className="ml-2 animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
