# Quick Start Deployment Guide

## 🚀 EASIEST WAY: Static Website on S3 (5 minutes)

### What you need:
- AWS Account
- This project files

### Step 1: Get AWS Ready (2 minutes)
1. Go to https://aws.amazon.com and sign in
2. Search "IAM" in the top search bar
3. Click "Users" → "Create user"
4. Username: `portfolio-deploy`
5. Attach policies: `AmazonS3FullAccess`
6. Click "Create user"
7. Click on the user → "Security credentials" → "Create access key"
8. Choose "Command Line Interface (CLI)"
9. Copy the Access Key ID and Secret Access Key

### Step 2: Install AWS CLI (1 minute)
```bash
# On Mac
brew install awscli

# On Windows
# Download from: https://aws.amazon.com/cli/

# On Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Step 3: Configure AWS (30 seconds)
```bash
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key  
# Region: us-east-1
# Output format: json
```

### Step 4: Deploy Website (1 minute)
```bash
# Run the deployment script
chmod +x deployment/s3-deploy.sh
./deployment/s3-deploy.sh
```

### Step 5: Done! 🎉
Your website will be live at: `http://sanjay-pathania-portfolio.s3-website-us-east-1.amazonaws.com`

---

## 🖥️ ADVANCED WAY: Full Application on EC2

### What you need:
- AWS Account
- SSH key pair

### Step 1: Launch EC2 Instance (3 minutes)
1. Go to EC2 Dashboard in AWS Console
2. Click "Launch Instance"
3. Name: `sanjay-portfolio`
4. AMI: **Amazon Linux 2023 AMI** (Free tier)
5. Instance type: `t2.micro` (Free tier)
6. Key pair: Create new → Download `.pem` file
7. Security Group:
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere
   - Custom TCP (5000) - Anywhere
8. Click "Launch instance"

### Step 2: Connect to Server (1 minute)
```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ec2-user@YOUR-EC2-IP
```

### Step 3: Run Setup Script (5 minutes)
```bash
# Copy the setup script to your server
# Then run:
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### Step 4: Deploy Your Code (2 minutes)
```bash
# Upload your code (use GitHub or SCP)
git clone https://github.com/YOUR_USERNAME/portfolio.git .
npm install
npm run build
./start.sh
```

### Step 5: Access Your Website
Go to: `http://YOUR-EC2-IP`

---

## 🌐 PROFESSIONAL WAY: With Domain & SSL

### Additional Steps:
1. **Register Domain**: Use Route 53 or any domain registrar
2. **Setup CloudFront**: For global CDN and SSL
3. **Get SSL Certificate**: Free with AWS Certificate Manager
4. **Point Domain**: Update DNS to point to CloudFront

### Estimated Time: 30 minutes
### Cost: ~$12/month (domain) + AWS usage

---

## 📊 Cost Comparison

| Method | Setup Time | Monthly Cost | Features |
|--------|------------|--------------|----------|
| S3 Static | 5 min | $1-5 | Fast, simple, no backend |
| EC2 Full | 15 min | $8-15 | Full app, backend, customizable |
| Professional | 30 min | $15-30 | Custom domain, SSL, CDN |

---

## 🆘 Need Help?

### Common Issues:

**"Access Denied" on S3:**
- Check bucket policy is public
- Verify AWS credentials

**"Connection refused" on EC2:**
- Check security group allows port 80
- Verify instance is running
- Check application logs: `pm2 logs`

**Domain not working:**
- DNS changes take 24-48 hours
- Verify DNS records are correct

### Commands for Troubleshooting:
```bash
# Check application status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart all

# Check system resources
top
df -h

# Test website locally
curl http://localhost:5000
```

---

## 🎯 Recommended Path for Beginners:

1. **Start with S3 Static** - Get online quickly
2. **Learn EC2** - When you need backend features  
3. **Add Domain** - When ready to be professional
4. **Scale up** - As your traffic grows

Choose the option that fits your comfort level and requirements!