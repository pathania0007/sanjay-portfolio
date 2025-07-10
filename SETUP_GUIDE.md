# How to Get Your Portfolio from Replit to Your Computer/GitHub

## Step 1: Download Files from Replit (Easiest Method)

### Option A: Download as ZIP
1. **In Replit**: Click the 3 dots menu (⋯) next to your project name
2. **Select "Download as ZIP"**
3. **Save the file** to your computer
4. **Extract the ZIP file** to a folder like `sanjay-portfolio`

### Option B: Clone via Git (if you have Git setup in Replit)
```bash
# In Replit Shell/Console
git init
git add .
git commit -m "Initial portfolio commit"
```

## Step 2: Setup on Your Local Computer

### Prerequisites (Install these first):
1. **Node.js 18+**: Download from https://nodejs.org
2. **Git**: Download from https://git-scm.com
3. **Code Editor**: VS Code (recommended) from https://code.visualstudio.com

### Setup Steps:
```bash
# Navigate to your extracted folder
cd sanjay-portfolio

# Install dependencies
npm install

# Test locally
npm run dev
```

Your website will open at `http://localhost:5000`

## Step 3: Push to GitHub (For AWS Deployment)

### Create GitHub Repository:
1. **Go to GitHub.com** and sign in
2. **Click "New repository"**
3. **Repository name**: `sanjay-pathania-portfolio`
4. **Set to Public** (so AWS can access it)
5. **Click "Create repository"**

### Upload Your Code:
```bash
# In your project folder on your computer
git init
git add .
git commit -m "Initial portfolio commit"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/sanjay-pathania-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to AWS

Now you can use any of the deployment methods:

### Method 1: S3 Static Website
```bash
# Build the website
npm run build

# Deploy to S3 (requires AWS CLI setup)
./deployment/s3-deploy.sh
```

### Method 2: EC2 Full Application
```bash
# On your EC2 instance
git clone https://github.com/YOUR_USERNAME/sanjay-pathania-portfolio.git
cd sanjay-pathania-portfolio
./deployment/ec2-setup.sh
npm install
npm run build
./start.sh
```

## Step 5: Update Your Code Later

### When you make changes:
```bash
# Save changes to GitHub
git add .
git commit -m "Updated portfolio design"
git push

# Deploy updates to AWS
# For S3:
npm run build
./deployment/s3-deploy.sh

# For EC2:
ssh -i "your-key.pem" ec2-user@your-server-ip
cd sanjay-pathania-portfolio
git pull
npm run build
pm2 restart all
```

## Complete File Structure You'll Have:

```
sanjay-pathania-portfolio/
├── client/                    # Frontend React app
├── server/                    # Backend Express server
├── shared/                    # Shared types and schemas
├── deployment/                # AWS deployment scripts
│   ├── ec2-setup.sh          # EC2 automated setup
│   ├── s3-deploy.sh          # S3 deployment script
│   └── QUICK_START.md        # Beginner guide
├── AWS_DEPLOYMENT_GUIDE.md   # Complete deployment guide
├── README.md                 # Project overview
├── package.json              # Dependencies and scripts
└── ... (other config files)
```

## Troubleshooting Common Issues:

### "npm command not found"
- Install Node.js from https://nodejs.org
- Restart your terminal/command prompt

### "git command not found"
- Install Git from https://git-scm.com
- Restart your terminal/command prompt

### "Permission denied" on scripts
```bash
# Make scripts executable
chmod +x deployment/ec2-setup.sh
chmod +x deployment/s3-deploy.sh
```

### "Module not found" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Quick Commands Summary:

```bash
# Setup locally
npm install
npm run dev

# Build for production
npm run build

# Deploy to S3
./deployment/s3-deploy.sh

# Push to GitHub
git add .
git commit -m "Your message"
git push
```

## What Each File Does:

- **client/**: Your React website files
- **server/**: Backend API for contact form
- **deployment/**: Scripts to deploy to AWS
- **AWS_DEPLOYMENT_GUIDE.md**: Step-by-step AWS setup
- **package.json**: Lists all the software your website needs

Now you have everything you need to get your portfolio from Replit to your computer and then to AWS!