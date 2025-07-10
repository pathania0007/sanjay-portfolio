#!/bin/bash

# EC2 Setup Script for Sanjay Pathania's Portfolio
# Run this script on your EC2 instance after connecting

echo "🚀 Setting up Sanjay Pathania's Portfolio on EC2..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2 for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git
echo "📦 Installing Git..."
sudo yum install -y git

# Install Nginx
echo "📦 Installing Nginx..."
sudo yum install -y nginx

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/portfolio
sudo chown -R ec2-user:ec2-user /var/www/portfolio
cd /var/www/portfolio

# Clone repository (you'll need to update this URL)
echo "📥 Cloning repository..."
echo "Please run: git clone YOUR_GITHUB_REPO_URL ."
echo "For now, creating a sample directory structure..."

# Create PM2 ecosystem file
echo "⚙️  Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'sanjay-portfolio',
    script: 'server/index.js',
    cwd: '/var/www/portfolio',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    max_memory_restart: '1G',
    instances: 1,
    exec_mode: 'fork'
  }]
}
EOF

# Create Nginx configuration
echo "⚙️  Creating Nginx configuration..."
sudo tee /etc/nginx/conf.d/portfolio.conf << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Serve static files directly
    location /assets/ {
        alias /var/www/portfolio/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Proxy API requests to Node.js
    location /api/ {
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
    
    # Serve React app for all other routes
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

# Remove default Nginx config
sudo rm -f /etc/nginx/conf.d/default.conf

# Create deployment script
echo "📝 Creating deployment script..."
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying Sanjay Pathania's Portfolio..."

# Pull latest changes
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Restart application
echo "🔄 Restarting application..."
pm2 restart sanjay-portfolio || pm2 start ecosystem.config.js

# Restart Nginx
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment completed!"
echo "🌐 Your website should be available at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
EOF

chmod +x deploy.sh

# Start and enable services
echo "🔄 Starting services..."
sudo systemctl start nginx
sudo systemctl enable nginx

# Create start script
cat > start.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting Sanjay Pathania's Portfolio..."

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo "✅ Application started!"
echo "📊 Check status with: pm2 status"
echo "📝 Check logs with: pm2 logs"
EOF

chmod +x start.sh

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Clone your repository: git clone YOUR_REPO_URL ."
echo "2. Install dependencies: npm install"
echo "3. Build the application: npm run build"
echo "4. Start the application: ./start.sh"
echo "5. Deploy updates: ./deploy.sh"
echo ""
echo "🔗 Useful commands:"
echo "  - Check application status: pm2 status"
echo "  - View logs: pm2 logs"
echo "  - Restart app: pm2 restart sanjay-portfolio"
echo "  - Stop app: pm2 stop sanjay-portfolio"
echo ""
echo "🌐 Your website will be available at:"
echo "   http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"