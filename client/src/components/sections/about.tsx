import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const stats = [
    { value: "5+", label: "Years", color: "cyber-blue" },
    { value: "50+", label: "Projects", color: "cyber-green" },
    { value: "20+", label: "AWS Services", color: "cyber-purple" },
    { value: "99.9%", label: "Uptime", color: "neon-green" }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-cyber-blue">
            <span className="text-cyber-green">[</span>ABOUT<span className="text-cyber-green">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="holographic rounded-3xl p-8">
            <img 
              src="https://bukimuki.s3.us-east-1.amazonaws.com/Screenshot_2025-07-11-17-25-06-152-edit_com.instagram.android.jpg" 
              alt="Professional headshot" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" 
            />
          </div>
          
          {/* About Content */}
          <div className="space-y-6">
            {/* Terminal Profile */}
            <div className="terminal-window rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-cyber-green font-mono">$</span>
                <span className="font-mono text-sm">cat profile.json</span>
              </div>
              <div className="font-mono text-sm space-y-3 text-gray-300">
                <div><span className="text-cyber-blue">"name":</span> "Sanjay Pathania",</div>
                <div><span className="text-cyber-blue">"role":</span> "AWS Cloud Engineer",</div>
                <div><span className="text-cyber-blue">"experience":</span> "5+ years",</div>
                <div><span className="text-cyber-blue">"location":</span> "HSR Sector 1, Bengaluru",</div>
                <div><span className="text-cyber-blue">"education":</span> "B.Tech Electronics & Communication",</div>
                <div><span className="text-cyber-blue">"certification":</span> "AWS Solution Architect Associate"</div>
              </div>
            </div>
            
            {/* Mission Statement */}
            <Card className="glass-card rounded-xl">
              <CardContent className="p-6">
                <h3 className="font-display text-2xl mb-4 text-cyber-green">Mission Statement</h3>
                <p className="text-gray-300 leading-relaxed">
                  Results-driven AWS Cloud Engineer with over 5 years of experience in designing, implementing, and managing cloud-based infrastructure and services on AWS. Adept at building scalable, secure, and high-availability architectures using core AWS services including EC2, S3, RDS, VPC, IAM, CloudFormation, and Lambda.
                </p>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="neuro-card rounded-xl">
                  <CardContent className="p-4 text-center">
                    <div className={`text-3xl font-bold text-${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
