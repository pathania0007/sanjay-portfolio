import { useQuery } from "@tanstack/react-query";
import Timeline from "@/components/ui/timeline";
import type { Experience } from "@shared/schema";

export default function Experience() {
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  });

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading experience...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-neon-green">
            <span className="text-cyber-blue">[</span>TIMELINE<span className="text-cyber-blue">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-green to-cyber-blue mx-auto"></div>
        </div>
        
        <Timeline experiences={experiences} />
      </div>
    </section>
  );
}
