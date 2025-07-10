import { projects, skills, experiences, contacts, type Project, type Skill, type Experience, type Contact, type InsertProject, type InsertSkill, type InsertExperience, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Experience
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  // Contact
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private skills: Map<number, Skill>;
  private experiences: Map<number, Experience>;
  private contacts: Map<number, Contact>;
  private currentProjectId: number;
  private currentSkillId: number;
  private currentExperienceId: number;
  private currentContactId: number;

  constructor() {
    this.projects = new Map();
    this.skills = new Map();
    this.experiences = new Map();
    this.contacts = new Map();
    this.currentProjectId = 1;
    this.currentSkillId = 1;
    this.currentExperienceId = 1;
    this.currentContactId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize real projects based on Sanjay's experience
    const sampleProjects: InsertProject[] = [
      {
        title: "Multi-VPC Transit Gateway Architecture",
        description: "Designed, deployed, and managed scalable and highly available infrastructure on AWS using Transit Gateway for centralized connectivity across multiple VPCs and regions.",
        technologies: ["AWS Transit Gateway", "VPC", "Route Tables", "CloudFormation"],
        awsServices: ["Transit Gateway", "VPC", "Route 53", "CloudWatch"],
        cost: "$2,400/month",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true,
        category: "Networking",
        complexity: "Advanced",
        metrics: { "uptime": "99.9%", "regions": 3, "vpcs": 8 }
      },
      {
        title: "Serverless Data Processing Pipeline",
        description: "Implemented serverless solutions with AWS Lambda, API Gateway, DynamoDB, and Step Functions for real-time data processing and analytics.",
        technologies: ["Lambda", "API Gateway", "DynamoDB", "Step Functions"],
        awsServices: ["Lambda", "API Gateway", "DynamoDB", "Step Functions", "S3"],
        cost: "$800/month",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true,
        category: "Serverless",
        complexity: "Intermediate",
        metrics: { "requests_per_day": 1000000, "latency": "100ms" }
      },
      {
        title: "Disaster Recovery & Backup Automation",
        description: "Managed backups, disaster recovery, and high availability architecture across regions using services like S3 versioning, Cross-Region replication, and automated EBS snapshots.",
        technologies: ["S3 Versioning", "AWS Backup", "EBS Snapshots", "Cross-Region Replication"],
        awsServices: ["S3", "AWS Backup", "EBS", "Lambda", "CloudWatch"],
        cost: "$1,200/month",
        savings: "60% cost reduction",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true,
        category: "Backup & Recovery",
        complexity: "Advanced",
        metrics: { "rto": "15 minutes", "rpo": "5 minutes", "backup_frequency": "Daily" }
      },
      {
        title: "Hybrid Cloud VPN Implementation",
        description: "Established connection between ON prem and AWS infra through VPN peering, implementing secure hybrid cloud architecture with Direct Connect.",
        technologies: ["VPN Gateway", "Direct Connect", "BGP Routing", "Customer Gateway"],
        awsServices: ["VPN Gateway", "Direct Connect", "Route 53", "CloudWatch"],
        cost: "$3,600/month",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true,
        category: "Hybrid Cloud",
        complexity: "Expert",
        metrics: { "bandwidth": "10 Gbps", "latency": "10ms", "availability": "99.95%" }
      },
      {
        title: "Load Balancer & Auto Scaling Infrastructure",
        description: "Designed elastic load balancing with Application Load Balancer (ALB), Network Load Balancer (NLB), and Auto Scaling Groups for high availability and cost optimization.",
        technologies: ["ALB", "NLB", "Auto Scaling Groups", "CloudWatch Alarms"],
        awsServices: ["ELB", "EC2", "Auto Scaling", "CloudWatch", "Route 53"],
        cost: "$1,800/month",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true,
        category: "High Availability",
        complexity: "Intermediate",
        metrics: { "auto_scaling_events": 150, "load_balanced_requests": 5000000 }
      },
      {
        title: "CloudFormation Infrastructure as Code",
        description: "Automated infrastructure deployment using AWS CloudFormation templates for consistent, repeatable, and version-controlled infrastructure provisioning.",
        technologies: ["CloudFormation", "YAML", "JSON", "Stack Sets"],
        awsServices: ["CloudFormation", "IAM", "S3", "EC2", "VPC"],
        cost: "Infrastructure cost optimization",
        savings: "40% deployment time reduction",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false,
        category: "Infrastructure as Code",
        complexity: "Intermediate",
        metrics: { "templates": 25, "stacks": 50, "deployment_time": "5 minutes" }
      },
      {
        title: "S3 Lifecycle Management & Cost Optimization",
        description: "Set up Lifecycle management for S3 objects, implementing automated policies to transition objects to cheaper storage classes like S3 Glacier for long-term archiving.",
        technologies: ["S3 Lifecycle Policies", "S3 Glacier", "S3 Deep Archive", "CloudWatch"],
        awsServices: ["S3", "S3 Glacier", "CloudWatch", "Lambda"],
        cost: "Storage optimization",
        savings: "60% storage cost reduction",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false,
        category: "Cost Optimization",
        complexity: "Beginner",
        metrics: { "data_archived": "500TB", "cost_savings": "$12000/year" }
      },
      {
        title: "CloudWatch Monitoring & Alerting System",
        description: "Monitored infrastructure using CloudWatch, CloudTrail, and AWS Config; implemented proactive alerts and log analysis for comprehensive system observability.",
        technologies: ["CloudWatch", "CloudTrail", "AWS Config", "SNS", "Lambda"],
        awsServices: ["CloudWatch", "CloudTrail", "AWS Config", "SNS", "Lambda"],
        cost: "$500/month",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false,
        category: "Monitoring",
        complexity: "Intermediate",
        metrics: { "alerts_configured": 50, "metrics_tracked": 200, "incident_response": "2 minutes" }
      },
      {
        title: "Transit Gateway for VPC Communication",
        description: "Set up of TransitGateway for communication between private Resources in VPC, enabling scalable network architecture across multiple availability zones.",
        technologies: ["Transit Gateway", "VPC Peering", "Route Tables", "Security Groups"],
        awsServices: ["Transit Gateway", "VPC", "EC2", "Route 53"],
        cost: "$1,500/month",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false,
        category: "Networking",
        complexity: "Advanced",
        metrics: { "vpcs_connected": 12, "throughput": "50 Gbps", "latency": "1ms" }
      },
      {
        title: "Multi-Region High Availability Setup",
        description: "Designed and implemented multi-region architecture for high availability and disaster recovery, ensuring business continuity across geographic locations.",
        technologies: ["Multi-Region", "Route 53", "CloudFront", "RDS Cross-Region"],
        awsServices: ["Route 53", "CloudFront", "RDS", "S3", "Lambda@Edge"],
        cost: "$4,200/month",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: false,
        category: "High Availability",
        complexity: "Expert",
        metrics: { "regions": 4, "availability": "99.99%", "rto": "5 minutes" }
      }
    ];

    sampleProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });

    // Initialize skills based on Sanjay's resume
    const sampleSkills: InsertSkill[] = [
      // AWS Services
      { name: "EC2 & VPC", category: "AWS Services", proficiency: 95, icon: "server", verified: true },
      { name: "S3 & CloudFormation", category: "AWS Services", proficiency: 90, icon: "database", verified: true },
      { name: "Lambda & API Gateway", category: "AWS Services", proficiency: 88, icon: "zap", verified: true },
      { name: "RDS & DynamoDB", category: "AWS Services", proficiency: 85, icon: "database", verified: true },
      { name: "Load Balancers (ALB/NLB)", category: "AWS Services", proficiency: 92, icon: "activity", verified: true },
      { name: "Route 53", category: "AWS Services", proficiency: 87, icon: "globe", verified: true },
      { name: "Transit Gateway", category: "AWS Services", proficiency: 90, icon: "network", verified: true },
      { name: "VPN & Direct Connect", category: "AWS Services", proficiency: 85, icon: "shield", verified: true },
      
      // Technical Skills
      { name: "Infrastructure as Code", category: "Technical", proficiency: 88, icon: "code", verified: true },
      { name: "Security & Compliance", category: "Technical", proficiency: 85, icon: "shield-check", verified: true },
      { name: "Networking", category: "Technical", proficiency: 90, icon: "wifi", verified: true },
      { name: "Monitoring & Logging", category: "Technical", proficiency: 87, icon: "bar-chart", verified: true },
      { name: "Automation", category: "Technical", proficiency: 82, icon: "settings", verified: true },
      { name: "Cost Optimization", category: "Technical", proficiency: 85, icon: "dollar-sign", verified: true },
      
      // Programming
      { name: "Python", category: "Programming", proficiency: 75, icon: "code", verified: false },
      { name: "Bash Scripting", category: "Programming", proficiency: 80, icon: "terminal", verified: false },
      { name: "YAML/JSON", category: "Programming", proficiency: 85, icon: "file-text", verified: false },
      { name: "SQL", category: "Programming", proficiency: 70, icon: "database", verified: false },
    ];

    sampleSkills.forEach(skill => {
      const id = this.currentSkillId++;
      this.skills.set(id, { ...skill, id });
    });

    // Initialize experiences based on Sanjay's resume
    const sampleExperiences: InsertExperience[] = [
      {
        company: "JARP",
        position: "AWS Cloud Engineer",
        location: "Noida",
        startDate: "19th Feb 2024",
        endDate: "20th Nov 2024",
        description: "Designed, deployed, and managed scalable and highly available infrastructure on AWS using services like EC2, S3, RDS, Lambda, and VPC. Managed backups, disaster recovery, and high availability architecture across regions using services like S3 versioning, Cross-Region replication. Implemented serverless solutions with AWS Lambda, API Gateway, DynamoDB, and Step Functions. Monitored infrastructure using CloudWatch, CloudTrail, and AWS Config; implemented proactive alerts and log analysis.",
        achievements: [
          "Designed scalable infrastructure on AWS using EC2, S3, RDS, Lambda, VPC",
          "Implemented disaster recovery with 99.9% uptime across regions",
          "Built serverless solutions with Lambda, API Gateway, DynamoDB",
          "Established comprehensive monitoring with CloudWatch and CloudTrail"
        ],
        technologies: ["EC2", "S3", "RDS", "Lambda", "VPC", "CloudWatch", "CloudTrail", "AWS Config"]
      },
      {
        company: "Simplilearn",
        position: "SR Inside Sales Specialist (Cloud Consultant)",
        location: "Bengaluru",
        startDate: "15th Nov 2022",
        endDate: "12th Feb 2024",
        description: "Proactively reach out to potential customers through cold calls, emails, and follow-ups to generate qualified leads. Assess customer needs and recommend tailored cloud solutions based on their requirements. Conduct virtual consultations and product demonstrations to educate customers on cloud program features and benefits. Handle the full sales cycle, from prospecting to closing deals, ensuring an exceptional customer experience.",
        achievements: [
          "Generated qualified leads through strategic outreach campaigns",
          "Assessed customer needs and recommended tailored cloud solutions",
          "Conducted virtual consultations and product demonstrations",
          "Managed full sales cycle with exceptional customer experience"
        ],
        technologies: ["AWS", "Cloud Architecture", "Solution Design", "Customer Consultation"]
      },
      {
        company: "Burfee Solution",
        position: "IT Engineer",
        location: "Jammu",
        startDate: "5th Jan 2018",
        endDate: "24th Aug 2022",
        description: "PROJECT CHENANI NASHRI TUNNEL WAY LIMITED - Managing Microsoft Active Directories and Networking equipments. Managing backup and disaster recovery in AWS CLOUD. S3 Storage Solutions: Set up and optimized S3 buckets for data storage, ensuring reliable and scalable storage solutions for large datasets, while implementing lifecycle policies to automatically transition objects to cheaper storage classes like S3 Glacier for long-term archiving. Snapshots Management: Utilized EBS snapshots to create backup images of EC2 instances, enabling quick recovery and facilitating cloning of environments for testing purposes.",
        achievements: [
          "Managed Microsoft Active Directory and networking equipment",
          "Implemented AWS cloud backup and disaster recovery solutions",
          "Optimized S3 storage with lifecycle policies for cost reduction",
          "Managed EBS snapshots for backup and environment cloning",
          "Achieved 60% cost reduction through storage optimization"
        ],
        technologies: ["Active Directory", "AWS S3", "EBS", "Networking", "Backup & Recovery"]
      }
    ];

    sampleExperiences.forEach(experience => {
      const id = this.currentExperienceId++;
      this.experiences.set(id, { ...experience, id });
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.id - a.id);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.featured).sort((a, b) => b.id - a.id);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => b.proficiency - a.proficiency);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.category === category)
      .sort((a, b) => b.proficiency - a.proficiency);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => b.id - a.id);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.currentExperienceId++;
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      replied: false 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.id - a.id);
  }
}

export const storage = new MemStorage();
