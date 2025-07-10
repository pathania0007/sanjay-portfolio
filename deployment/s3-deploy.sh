#!/bin/bash

# S3 Static Website Deployment Script
# Simple deployment for beginners

echo "🌐 Deploying Sanjay Pathania's Portfolio to S3..."

# Configuration
BUCKET_NAME="sanjay-pathania-portfolio"
REGION="us-east-1"  # Change this to your preferred region

echo "📋 Deployment Configuration:"
echo "   Bucket Name: $BUCKET_NAME"
echo "   Region: $REGION"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first:"
    echo "   curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'"
    echo "   unzip awscliv2.zip"
    echo "   sudo ./aws/install"
    echo ""
    echo "   Then configure it with: aws configure"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "   aws configure"
    echo ""
    echo "   You'll need:"
    echo "   - AWS Access Key ID"
    echo "   - AWS Secret Access Key"
    echo "   - Default region: $REGION"
    echo "   - Default output format: json"
    exit 1
fi

# Build the application
echo "🔨 Building application for production..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed. No 'dist' directory found."
    exit 1
fi

# Create S3 bucket (will fail if it already exists, which is fine)
echo "🪣 Creating S3 bucket..."
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "   Bucket already exists or name taken"

# Enable static website hosting
echo "⚙️  Configuring static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Create bucket policy for public access
echo "🔓 Setting up public access policy..."
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Remove ACL restrictions
echo "🔧 Removing public access blocks..."
aws s3api put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Upload files
echo "📤 Uploading website files..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --cache-control "max-age=31536000" --exclude "*.html"
aws s3 sync dist/ s3://$BUCKET_NAME --delete --cache-control "max-age=0, no-cache, no-store, must-revalidate" --include "*.html"

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your website is now live at:"
echo "   $WEBSITE_URL"
echo ""
echo "📋 What was deployed:"
echo "   ✓ Static website hosting enabled"
echo "   ✓ Public access configured"
echo "   ✓ All website files uploaded"
echo "   ✓ Caching optimized"
echo ""
echo "💡 Next steps (optional):"
echo "   1. Set up CloudFront for better performance"
echo "   2. Add a custom domain name"
echo "   3. Enable HTTPS with SSL certificate"
echo ""

# Cleanup
rm -f bucket-policy.json

echo "🎉 Your AWS Cloud Engineer portfolio is now online!"