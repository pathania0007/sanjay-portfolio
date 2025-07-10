# Sanjay Pathania - AWS Cloud Engineer Portfolio

## Overview

This is a modern, cyberpunk-themed portfolio website for Sanjay Pathania, an AWS Cloud Engineer with 5+ years of experience. The application showcases projects, skills, experience, and provides contact functionality through an interactive, futuristic interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with a clear separation between client and server:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom cyberpunk theme variables
- **3D Graphics**: Three.js integration for AWS architecture visualizations

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with route-based organization
- **Development**: Hot reloading with Vite middleware integration

## Key Components

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless connection
- **Schema**: Centralized schema definitions in `/shared/schema.ts`
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations

### UI Components
- **Design System**: shadcn/ui components with cyberpunk customization
- **Theme**: Dark-mode cyberpunk aesthetic with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animations**: Custom CSS animations for cyberpunk effects

### Core Features
1. **Project Showcase**: Interactive project cards with filtering and categorization
2. **Skills Visualization**: Animated skill bars with proficiency indicators
3. **Experience Timeline**: Professional experience display
4. **Contact System**: Form-based contact with validation
5. **3D Visualizations**: AWS architecture diagrams using Three.js

## Data Flow

### Client-Server Communication
1. Client makes API requests using TanStack Query
2. Express server handles routes through `/api/*` endpoints
3. Storage layer abstracts data access (currently using in-memory storage)
4. Server responds with JSON data for client consumption

### Component Data Flow
1. Page components fetch data using React Query hooks
2. Data flows down through props to presentational components
3. Form submissions trigger mutations that update server state
4. Query cache automatically invalidates and refetches updated data

## External Dependencies

### Production Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Libraries**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Validation**: Zod for runtime type validation
- **3D Graphics**: Three.js for AWS architecture visualizations

### Development Dependencies
- **TypeScript**: Type safety across the stack
- **Vite**: Development server and build tool
- **ESBuild**: Fast production bundling for server code
- **Drizzle Kit**: Database schema management and migrations

### Fonts and Assets
- **Typography**: Google Fonts (JetBrains Mono, Inter, Orbitron)
- **Icons**: Font Awesome for consistent iconography
- **Images**: Unsplash for placeholder content

## Deployment Strategy

### Deployment Options Available

1. **Simple S3 Static Hosting** (Beginner-friendly)
   - Cost: $1-5/month
   - Setup time: 5 minutes
   - Features: Fast, simple, no backend features
   - Use case: Portfolio showcase without contact form

2. **EC2 Full Application** (Advanced)
   - Cost: $8-15/month (or free with AWS free tier)
   - Setup time: 15 minutes
   - Features: Complete application with backend
   - Use case: Full portfolio with contact form and dynamic features

3. **Professional Setup** (Production-ready)
   - Cost: $15-30/month
   - Setup time: 30 minutes
   - Features: Custom domain, SSL, CDN
   - Use case: Professional portfolio for business

### Build Process
1. **Client Build**: Vite bundles React app to `/dist/public`
2. **Server Build**: ESBuild compiles TypeScript server to `/dist`
3. **Assets**: Static assets copied to distribution directory

### AWS Deployment Files Created
- `AWS_DEPLOYMENT_GUIDE.md`: Comprehensive step-by-step deployment guide
- `deployment/ec2-setup.sh`: Automated EC2 server setup script
- `deployment/s3-deploy.sh`: Automated S3 static website deployment script
- `deployment/QUICK_START.md`: Beginner-friendly quick start guide

### Recommended AMI for EC2
- **Amazon Linux 2023 AMI** (Free tier eligible)
- Instance type: `t2.micro` (Free tier) or `t3.small` (Better performance)
- Includes automated setup scripts for Node.js, PM2, and Nginx

### Environment Configuration
- **Development**: Local development with hot reloading
- **Production**: Node.js server serving static files and API routes
- **Database**: Currently using in-memory storage (easily switchable to PostgreSQL)

### Performance Optimizations
- Server-side static file serving for production
- Efficient data management with in-memory storage
- Client-side caching with TanStack Query
- Optimized bundle splitting with Vite
- CloudFront CDN integration for global performance

The application is designed to be deployed on AWS infrastructure with three different approaches based on user expertise and requirements.