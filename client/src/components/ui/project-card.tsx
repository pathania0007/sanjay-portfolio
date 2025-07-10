import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`project-card holographic rounded-2xl overflow-hidden ${featured ? 'ring-2 ring-cyber-blue' : ''}`}>
      <CardContent className="p-0">
        {/* Project Image */}
        {project.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 to-transparent" />
            {featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-cyber-blue text-dark-base font-mono">
                  <i className="fas fa-star mr-1"></i>
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}
        
        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl font-bold text-cyber-blue line-clamp-1">
              {project.title}
            </h3>
            <i className={`fas fa-${getProjectIcon(project.category)} text-cyber-green text-xl`}></i>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.awsServices.slice(0, 3).map((service, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs font-mono border-cyber-blue text-cyber-blue"
              >
                {service}
              </Badge>
            ))}
            {project.awsServices.length > 3 && (
              <Badge variant="outline" className="text-xs font-mono border-gray-600 text-gray-400">
                +{project.awsServices.length - 3} more
              </Badge>
            )}
          </div>
          
          {/* Metrics */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              {project.cost && (
                <div className="text-cyber-green font-mono text-sm">
                  Cost: {project.cost}
                </div>
              )}
              {project.savings && (
                <div className="text-neon-green font-mono text-sm">
                  {project.savings}
                </div>
              )}
            </div>
            <Badge 
              variant="outline" 
              className={`font-mono ${getComplexityColor(project.complexity)}`}
            >
              {project.complexity}
            </Badge>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 glass-card border-cyber-blue hover:bg-cyber-blue hover:bg-opacity-20 font-mono"
            >
              <i className="fas fa-eye mr-2"></i>
              View Details
            </Button>
            {project.githubUrl && (
              <Button 
                size="sm" 
                variant="outline"
                className="glass-card border-cyber-green hover:bg-cyber-green hover:bg-opacity-20"
              >
                <i className="fab fa-github"></i>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getProjectIcon(category: string): string {
  const icons: Record<string, string> = {
    "Networking": "network-wired",
    "Serverless": "bolt",
    "Backup & Recovery": "shield-alt",
    "Hybrid Cloud": "globe",
    "High Availability": "expand-arrows-alt",
    "Infrastructure as Code": "code",
    "Cost Optimization": "dollar-sign",
    "Monitoring": "chart-line"
  };
  return icons[category] || "cloud";
}

function getComplexityColor(complexity: string): string {
  const colors: Record<string, string> = {
    "Beginner": "border-cyber-green text-cyber-green",
    "Intermediate": "border-cyber-blue text-cyber-blue",
    "Advanced": "border-cyber-purple text-cyber-purple",
    "Expert": "border-neon-green text-neon-green"
  };
  return colors[complexity] || "border-gray-600 text-gray-400";
}
