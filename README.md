# Sanjay Pathania - AWS Cloud Engineer Portfolio

A cutting-edge cyberpunk-themed portfolio showcasing AWS expertise through 10 interactive cloud projects with 3D visualizations.

## 📥 Get Files from Replit First

**Before deploying to AWS, you need to get your files from Replit:**

### Step 1: Download from Replit
1. Click the 3 dots menu (⋯) next to your project name in Replit
2. Select "Download as ZIP"
3. Extract to your computer

### Step 2: Setup Locally
```bash
cd sanjay-portfolio
npm install
npm run dev  # Test locally at http://localhost:5000
```

### Step 3: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/sanjay-pathania-portfolio.git
git push -u origin main
```

**📖 Complete setup guide: [SETUP_GUIDE.md](SETUP_GUIDE.md)**

## 🚀 Deploy to AWS

### Option 1: Simple S3 Hosting (5 minutes)
```bash
npm run build
./deployment/s3-deploy.sh
```

### Option 2: Full Application on EC2 (15 minutes)
```bash
# On EC2 instance
git clone https://github.com/YOUR_USERNAME/sanjay-pathania-portfolio.git
cd sanjay-pathania-portfolio
./deployment/ec2-setup.sh
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