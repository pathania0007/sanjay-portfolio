import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Experience } from "@shared/schema";

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  const getTimelineColor = (index: number): string => {
    const colors = ["cyber-blue", "cyber-green", "cyber-purple", "neon-green"];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-blue to-neon-green"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            const color = getTimelineColor(index);
            
            return (
              <div key={experience.id} className="flex items-center">
                {/* Left side content */}
                <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'order-2 pl-8'}`}>
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h3 className={`font-display text-xl font-bold text-${color} mb-2`}>
                        {experience.position}
                      </h3>
                      <p className={`text-${color === 'cyber-blue' ? 'cyber-green' : 'cyber-blue'} font-mono text-sm mb-2`}>
                        {experience.company}
                      </p>
                      <div className="text-gray-400 text-sm mb-3 font-mono">
                        {experience.startDate} - {experience.endDate || 'Present'} | {experience.location}
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        {experience.description}
                      </p>
                      
                      {/* Achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-mono text-sm font-semibold text-gray-200">Key Achievements:</h4>
                          <ul className="text-xs text-gray-400 space-y-1">
                            {experience.achievements.slice(0, 3).map((achievement, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className={`text-${color} mt-1`}>▸</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Technologies */}
                      {experience.technologies && experience.technologies.length > 0 && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-1">
                            {experience.technologies.slice(0, 4).map((tech, idx) => (
                              <Badge 
                                key={idx}
                                variant="outline" 
                                className={`text-xs font-mono border-${color} text-${color}`}
                              >
                                {tech}
                              </Badge>
                            ))}
                            {experience.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs font-mono border-gray-600 text-gray-400">
                                +{experience.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline Node */}
                <div className="relative z-10">
                  <div className={`w-6 h-6 bg-${color} rounded-full border-4 border-dark-base shadow-lg`}>
                    <div className={`w-full h-full bg-${color} rounded-full animate-pulse-glow`}></div>
                  </div>
                </div>
                
                {/* Right side (empty or reversed) */}
                <div className={`w-1/2 ${isEven ? 'order-2' : 'pr-8'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
