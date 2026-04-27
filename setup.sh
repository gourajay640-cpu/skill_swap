#!/bin/bash

# SkillSwap Setup Script
# This script automates the setup process for both frontend and backend

echo "🚀 SkillSwap Setup Script"
echo "================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node -v)${NC}"

# Check if MongoDB is installed/running
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. You can:"
    echo "   1. Install MongoDB: brew install mongodb-community"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo "   3. Update MONGODB_URI in backend/.env"
fi

# Backend Setup
echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi

cd ..

# Frontend Setup (no dependencies needed for static files)
echo ""
echo -e "${BLUE}Frontend Setup${NC}"
echo -e "${GREEN}✅ Frontend is ready (static files)${NC}"

# Print completion message
echo ""
echo "================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start MongoDB (if not already running):"
echo "   brew services start mongodb-community"
echo ""
echo "2. Start the Backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. In another terminal, start the Frontend server:"
echo "   cd frontend && python -m http.server 8000"
echo ""
echo "4. Open http://localhost:8000 in your browser"
echo ""
echo "For more details, see README.md"
