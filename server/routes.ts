import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (_req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.get("/api/skills/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const skills = await storage.getSkillsByCategory(category);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills by category" });
    }
  });

  // Experience routes
  app.get("/api/experiences", async (_req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ 
        message: "Message sent successfully! I'll get back to you soon.",
        contact: { id: contact.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // AWS status simulation
  app.get("/api/aws-status", async (_req, res) => {
    try {
      const status = {
        certification: {
          status: "CERTIFIED",
          title: "AWS Solution Architect Associate",
          expires: "2025-12-31",
          verified: true
        },
        infrastructure: {
          status: "OPERATIONAL",
          uptime: "99.9%",
          regions: 3,
          services: 20
        },
        security: {
          status: "COMPLIANT",
          score: 95,
          lastAudit: "2024-01-15"
        }
      };
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AWS status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
