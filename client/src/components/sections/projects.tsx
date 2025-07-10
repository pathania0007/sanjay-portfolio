import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ui/project-card";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  
  const { data: allProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: featuredProjects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });

  const categories = ["all", ...new Set(allProjects.map(p => p.category))];
  
  const filteredProjects = filter === "all" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-cyber-purple">
            <span className="text-cyber-blue">[</span>PROJECTS<span className="text-cyber-blue">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyber-purple to-cyber-green mx-auto"></div>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 glass-card">
            <TabsTrigger value="featured" className="font-mono">Featured</TabsTrigger>
            <TabsTrigger value="all" className="font-mono">All Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className={`font-mono capitalize ${
                    filter === category 
                      ? "bg-cyber-blue text-dark-base" 
                      : "glass-card border-cyber-blue hover:bg-cyber-blue hover:bg-opacity-20"
                  }`}
                >
                  {category === "all" ? "All" : category}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category === "all" ? allProjects.length : allProjects.filter(p => p.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>
            
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="glass-card hover:bg-cyber-purple hover:bg-opacity-20 px-12 py-4 rounded-xl font-mono text-lg transition-all duration-300 border border-cyber-purple"
            onClick={() => window.open('https://github.com/sanjaypathania', '_blank')}
          >
            <i className="fas fa-code-branch mr-3"></i>
            View All {allProjects.length} Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
