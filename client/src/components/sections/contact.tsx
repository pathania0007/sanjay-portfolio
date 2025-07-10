import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertContact } from "@shared/schema";

export default function Contact() {
  const [formData, setFormData] = useState<InsertContact>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // AWS Status Query
  const { data: awsStatus } = useQuery({
    queryKey: ['/api/aws-status'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent Successfully!",
        description: data.message,
        variant: "default",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 text-cyber-blue">
            <span className="text-cyber-green">[</span>CONTACT<span className="text-cyber-green">]</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyber-blue to-cyber-green mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Terminal Contact Info */}
              <div className="terminal-window rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-cyber-green font-mono">$</span>
                  <span className="font-mono text-sm">cat contact_info.json</span>
                </div>
                <div className="font-mono text-sm space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-envelope text-cyber-blue"></i>
                    <span>sanjaypathania0@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-phone text-cyber-green"></i>
                    <span>+91 9906298387</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-map-marker-alt text-cyber-purple"></i>
                    <span>HSR Sector 1, Bengaluru</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-globe text-cyber-blue"></i>
                    <span>www.sanjaypathania.in</span>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <Card className="glass-card rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl mb-4 text-cyber-green">Connect with me</h3>
                  <div className="flex space-x-4">
                    <a href="https://linkedin.com/in/sanjaypathania" target="_blank" rel="noopener noreferrer" className="neuro-card rounded-xl p-4 hover:scale-110 transition-transform">
                      <i className="fab fa-linkedin text-cyber-blue text-2xl"></i>
                    </a>
                    <a href="https://github.com/sanjaypathania" target="_blank" rel="noopener noreferrer" className="neuro-card rounded-xl p-4 hover:scale-110 transition-transform">
                      <i className="fab fa-github text-cyber-green text-2xl"></i>
                    </a>
                    <a href="https://twitter.com/sanjaypathania" target="_blank" rel="noopener noreferrer" className="neuro-card rounded-xl p-4 hover:scale-110 transition-transform">
                      <i className="fab fa-twitter text-cyber-purple text-2xl"></i>
                    </a>
                    <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="neuro-card rounded-xl p-4 hover:scale-110 transition-transform">
                      <i className="fab fa-aws text-neon-green text-2xl"></i>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              {/* AWS Status */}
              <Card className="glass-card rounded-xl">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl mb-4 text-cyber-blue">AWS Status</h3>
                  <div className="space-y-3">
                    {awsStatus ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">Solution Architect</span>
                          <Badge variant="outline" className="text-cyber-green border-cyber-green font-mono text-sm flex items-center">
                            <span className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse-glow"></span>
                            {awsStatus.certification.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">Cloud Infrastructure</span>
                          <Badge variant="outline" className="text-cyber-blue border-cyber-blue font-mono text-sm flex items-center">
                            <span className="w-2 h-2 bg-cyber-blue rounded-full mr-2 animate-pulse-glow"></span>
                            {awsStatus.infrastructure.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">Security Compliance</span>
                          <Badge variant="outline" className="text-neon-green border-neon-green font-mono text-sm flex items-center">
                            <span className="w-2 h-2 bg-neon-green rounded-full mr-2 animate-pulse-glow"></span>
                            {awsStatus.infrastructure.uptime} UPTIME
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 font-mono text-sm">Loading AWS status...</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="glass-card rounded-2xl">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl mb-6 text-cyber-green">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block font-mono text-sm text-gray-300 mb-2">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:outline-none transition-colors"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block font-mono text-sm text-gray-300 mb-2">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="block font-mono text-sm text-gray-300 mb-2">
                      Subject
                    </Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-card border-gray-600">
                        <SelectItem value="aws-consultation">AWS Consultation</SelectItem>
                        <SelectItem value="project-collaboration">Project Collaboration</SelectItem>
                        <SelectItem value="job-opportunity">Job Opportunity</SelectItem>
                        <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block font-mono text-sm text-gray-300 mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={contactMutation.isPending}
                    className="w-full glass-card hover:bg-cyber-green hover:bg-opacity-20 py-3 rounded-lg font-mono transition-all duration-300 border border-cyber-green"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
