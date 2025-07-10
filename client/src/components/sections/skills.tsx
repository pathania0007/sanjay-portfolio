import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillBar from "@/components/ui/skill-bar";
import type { Skill } from "@shared/schema";

export default function Skills() {
  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });

  const awsSkills = skills.filter(skill => skill.category === "AWS Services");
  const technicalSkills = skills.filter(skill => skill.category === "Technical");
  const programmingSkills = skills.filter(skill => skill.category === "Programming");

  const techCategories = [
    { name: "Infrastructure", icon: "server", color: "cyber-blue" },
    { name: "Security", icon: "shield-alt", color: "cyber-green" },
    { name: "Networking", icon: "network-wired", color: "cyber-purple" },
    { name: "Databases", icon: "database", color: "cyber-blue" },
    { name: "Monitoring", icon: "chart-line", color: "cyber-green" },
    { name: "Automation", icon: "robot", color: "cyber-purple" }
  ];

  if (isLoading) {
    return (
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-cyber-green">
            <span className="text-cyber-blue">[</span>SKILLS<span className="text-cyber-blue">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyber-green to-cyber-blue mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* AWS Services */}
          <Card className="glass-card rounded-2xl">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl mb-6 text-cyber-blue flex items-center">
                <i className="fab fa-aws mr-3 text-3xl aws-icon"></i>
                AWS Services
              </h3>
              <div className="space-y-6">
                {awsSkills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Technical Skills */}
          <Card className="glass-card rounded-2xl">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl mb-6 text-cyber-green flex items-center">
                <i className="fas fa-code mr-3 text-3xl"></i>
                Technical Stack
              </h3>
              
              {/* Technical Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {techCategories.map((category, index) => (
                  <Card key={index} className="neuro-card rounded-xl hover:scale-105 transition-transform cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <i className={`fas fa-${category.icon} text-${category.color} text-2xl mb-2`}></i>
                      <div className="font-mono text-sm">{category.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Technical Skills */}
              <div className="space-y-4 mb-6">
                {technicalSkills.slice(0, 4).map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
              
              {/* Programming Skills Badges */}
              <div className="space-y-3">
                <h4 className="font-mono text-sm font-semibold text-gray-200">Programming & Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {programmingSkills.map((skill) => (
                    <Badge 
                      key={skill.id}
                      variant="outline" 
                      className="px-3 py-1 bg-cyber-blue bg-opacity-20 rounded-full text-xs font-mono border-cyber-blue"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="px-3 py-1 bg-cyber-green bg-opacity-20 rounded-full text-xs font-mono border-cyber-green">
                    CloudFormation
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-cyber-purple bg-opacity-20 rounded-full text-xs font-mono border-cyber-purple">
                    Terraform
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-cyber-blue bg-opacity-20 rounded-full text-xs font-mono border-cyber-blue">
                    Docker
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
