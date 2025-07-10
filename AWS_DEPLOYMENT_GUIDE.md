# Step-by-Step AWS Deployment Guide for Sanjay Pathania's Portfolio

## Overview
This guide will walk you through hosting your complete portfolio website on AWS infrastructure manually, step by step.

## Option 1: Simple Static Website Hosting (Recommended for Beginners)

### Step 1: Build Your Website for Production
```bash
# On your local machine or Replit
npm run build
```
This creates a `dist` folder with all your website files.

### Step 2: Create S3 Bucket for Website Hosting
1. **Login to AWS Console**: Go to https://aws.amazon.com and sign in
2. **Navigate to S3**: Search "S3" in the top search bar
3. **Create Bucket**:
   - Click "Create bucket"
   - Bucket name: `sanjay-pathania-portfolio` (must be unique globally)
   - Region: Choose closest to your users (e.g., `us-east-1` or `ap-south-1` for India)
   - Uncheck "Block all public access"
   - Check the acknowledgment box
   - Click "Create bucket"

### Step 3: Enable Static Website Hosting
1. **Select your bucket** and click on it
2. **Go to Properties tab**
3. **Scroll down to "Static website hosting"**
4. **Click "Edit"**:
   - Enable: "Use this bucket to host a website"
   - Index document: `index.html`
   - Error document: `index.html` (for React routing)
   - Click "Save changes"

### Step 4: Upload Website Files
1. **Go to Objects tab** in your S3 bucket
2. **Click "Upload"**
3. **Add files**: Upload all files from your `dist` folder
4. **Click "Upload"**

### Step 5: Make Files Public
1. **Select all uploaded files** (Ctrl+A or Cmd+A)
2. **Click "Actions" → "Make public"**
3. **Confirm by clicking "Make public"**

### Step 6: Get Your Website URL
1. **Go to Properties tab**
2. **Scroll to "Static website hosting"**
3. **Copy the "Bucket website endpoint"**
4. **Your website is now live!**

---

## Option 2: Full Application with Backend (Advanced)

### Step 1: Choose the Right EC2 Instance
**Recommended AMI**: `Amazon Linux 2023` (Free tier eligible)
**Instance Type**: `t2.micro` (Free tier) or `t3.small` (Better performance)

### Step 2: Launch EC2 Instance
1. **Go to EC2 Dashboard**: Search "EC2" in AWS Console
2. **Click "Launch Instance"**:
   - Name: `sanjay-portfolio-server`
   - AMI: Select "Amazon Linux 2023 AMI"
   - Instance type: `t2.micro` (free tier)
   - Key pair: Create new key pair, download `.pem` file
   - Security group: Create new with these rules:
     - SSH (port 22) - Your IP only
     - HTTP (port 80) - Anywhere
     - HTTPS (port 443) - Anywhere
     - Custom TCP (port 5000) - Anywhere (for your app)
   - Storage: 8GB (default is fine)
   - Click "Launch instance"

### Step 3: Connect to Your Server
```bash
# Download your key pair file and connect
chmod 400 your-key.pem
ssh -i "your-key.pem" ec2-user@your-instance-public-ip
```

### Step 4: Install Required Software on Server
```bash
# Update system
sudo yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Git
sudo yum install -y git

# Verify installations
node --version
npm --version
git --version
```

### Step 5: Clone and Setup Your Application
```bash
# Clone your repository (you'll need to push your code to GitHub first)
git clone https://github.com/YOUR_USERNAME/sanjay-portfolio.git
cd sanjay-portfolio

# Install dependencies
npm install

# Build the application
npm run build

# Create environment file if needed
touch .env
```

### Step 6: Setup Process Manager
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sanjay-portfolio',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 7: Setup Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo yum install -y nginx

# Create Nginx configuration
sudo tee /etc/nginx/conf.d/portfolio.conf << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Option 3: Professional Setup with Domain and SSL

### Step 1: Register Domain (Optional)
1. **Go to Route 53** in AWS Console
2. **Click "Register domain"**
3. **Choose domain name**: `sanjaypathania.com`
4. **Complete registration process**

### Step 2: Setup CloudFront (CDN)
1. **Go to CloudFront** in AWS Console
2. **Click "Create distribution"**:
   - Origin domain: Your S3 bucket or EC2 instance
   - Viewer protocol policy: "Redirect HTTP to HTTPS"
   - Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Click "Create distribution"

### Step 3: SSL Certificate
1. **Go to Certificate Manager**
2. **Click "Request certificate"**:
   - Domain name: `sanjaypathania.com` and `www.sanjaypathania.com`
   - Validation method: DNS validation
   - Click "Request"
3. **Add CNAME records** to your domain's DNS

### Step 4: Connect Domain to CloudFront
1. **Go to Route 53 → Hosted zones**
2. **Select your domain**
3. **Create record**:
   - Record type: A
   - Alias: Yes
   - Route traffic to: CloudFront distribution
   - Choose your distribution

---

## Cost Breakdown (Monthly Estimates)

### Option 1 (S3 Static Website):
- S3 storage: $0.50-2.00
- Data transfer: $1-5
- **Total: $1.50-7/month**

### Option 2 (EC2 + Application):
- EC2 t2.micro: $8.50 (or free with free tier)
- Storage: $1
- Data transfer: $1-5
- **Total: $10.50-14.50/month** (or $2-7 with free tier)

### Option 3 (Professional with Domain):
- Above costs + Domain: $12/year
- CloudFront: $1-10/month
- Certificate Manager: Free
- **Total: $12.50-26.50/month**

---

## Quick Commands Cheat Sheet

### Building and Deploying:
```bash
# Build for production
npm run build

# Upload to S3 (install AWS CLI first)
aws s3 sync dist/ s3://your-bucket-name --delete

# Connect to EC2
ssh -i "key.pem" ec2-user@your-ip

# Update application on EC2
git pull
npm install
npm run build
pm2 restart all
```

### Monitoring:
```bash
# Check application status
pm2 status
pm2 logs

# Check Nginx status
sudo systemctl status nginx

# Check system resources
top
df -h
```

---

## Troubleshooting Common Issues

### Issue 1: Website not loading
- Check S3 bucket permissions (make sure files are public)
- Verify static website hosting is enabled
- Check CloudFront distribution status

### Issue 2: EC2 connection refused
- Verify security group allows your IP on port 22
- Check if EC2 instance is running
- Verify key pair file permissions (chmod 400)

### Issue 3: Application not starting
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check PM2 logs: `pm2 logs`

---

## Security Best Practices

1. **Never commit sensitive data** to Git repositories
2. **Use IAM roles** instead of access keys when possible
3. **Keep security groups restrictive** (only allow necessary ports)
4. **Regular updates**: Keep your AMI and packages updated
5. **Use SSL certificates** for production websites
6. **Enable CloudTrail** for audit logging

---

## Next Steps After Deployment

1. **Set up monitoring** with CloudWatch
2. **Configure automated backups**
3. **Set up alerts** for high traffic or errors
4. **Optimize performance** with CloudFront caching
5. **Add custom domain** and SSL certificate

Would you like me to help you with any specific step or create additional configuration files?