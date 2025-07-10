import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@shared/schema";

interface SkillBarProps {
  skill: Skill;
  animated?: boolean;
}

export default function SkillBar({ skill, animated = true }: SkillBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && animated) {
      const timer = setTimeout(() => {
        setProgress(skill.proficiency);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!animated) {
      setProgress(skill.proficiency);
    }
  }, [isVisible, skill.proficiency, animated]);

  const getSkillColor = (proficiency: number): string => {
    if (proficiency >= 90) return "from-neon-green to-cyber-green";
    if (proficiency >= 80) return "from-cyber-blue to-cyber-purple";
    if (proficiency >= 70) return "from-cyber-purple to-cyber-blue";
    return "from-gray-600 to-gray-500";
  };

  return (
    <div ref={ref} className="skill-bar space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {skill.icon && (
            <i className={`fas fa-${skill.icon} text-cyber-blue aws-icon`}></i>
          )}
          <span className="font-mono text-sm font-medium">{skill.name}</span>
          {skill.verified && (
            <Badge className="bg-cyber-green bg-opacity-20 text-cyber-green border-cyber-green text-xs">
              <i className="fas fa-check-circle mr-1"></i>
              Verified
            </Badge>
          )}
        </div>
        <span className="font-mono text-sm text-cyber-blue font-bold">
          {progress}%
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.proficiency)} transition-all duration-1000 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
        
        {/* Skill level indicator */}
        <div className="flex justify-between text-xs font-mono text-gray-500 mt-1">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>
    </div>
  );
}
