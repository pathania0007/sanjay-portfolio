# Sanjay Pathania - AWS Cloud Engineer Portfolio

A cutting-edge cyberpunk-themed portfolio showcasing AWS expertise through 10 interactive cloud projects with 3D visualizations.

## 🚀 Quick Deploy to AWS

### Option 1: Simple S3 Hosting (5 minutes)
```bash
# Build the website
npm run build

# Deploy to S3 (requires AWS CLI configured)
./deployment/s3-deploy.sh
```

### Option 2: Full Application on EC2 (15 minutes)
1. Launch EC2 instance with Amazon Linux 2023 AMI
2. Connect to your instance and run:
```bash
# Run the setup script
./deployment/ec2-setup.sh

# Clone your code and deploy
git clone YOUR_REPO_URL .
npm install
npm run build
./start.sh
```

## 📖 Complete Documentation

- **[AWS Deployment Guide](AWS_DEPLOYMENT_GUIDE.md)** - Complete step-by-step instructions
- **[Quick Start Guide](deployment/QUICK_START.md)** - Beginner-friendly deployment options
- **[Project Architecture](replit.md)** - Technical architecture and setup details

## 🌟 Features

- Cyberpunk design with neon animations
- 10 real AWS cloud projects showcase
- Interactive terminal components
- Skills visualization with progress bars
- Professional timeline of experience
- Contact form with AWS integration
- Three.js 3D visualizations

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **UI**: Radix UI + shadcn/ui + Tailwind CSS
- **3D Graphics**: Three.js for AWS architecture visualizations
- **Animations**: GSAP + Framer Motion

## 📊 Deployment Options & Costs

| Method | Time | Cost/Month | Features |
|--------|------|------------|----------|
| S3 Static | 5 min | $1-5 | Fast, simple |
| EC2 Full | 15 min | $8-15 | Complete app |
| Professional | 30 min | $15-30 | Domain + SSL |

Choose the option that fits your needs and expertise level.

## 🆘 Support

For deployment help, check the troubleshooting section in the [AWS Deployment Guide](AWS_DEPLOYMENT_GUIDE.md) or the [Quick Start Guide](deployment/QUICK_START.md).

---

Built with ❤️ for AWS Cloud Engineers