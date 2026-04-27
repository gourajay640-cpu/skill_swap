#!/bin/bash

# SkillSwap - Installation Verification Script
# This script checks if all dependencies are properly installed

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  SkillSwap Installation Verification   ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Function to check command
check_command() {
    local cmd=$1
    local name=$2
    
    if command -v $cmd &> /dev/null; then
        VERSION=$($cmd --version 2>&1 | head -n 1)
        echo -e "${GREEN}✓${NC} $name: $VERSION"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $name: NOT INSTALLED"
        ((FAILED++))
    fi
}

# Function to check directory
check_directory() {
    local dir=$1
    local name=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $name: Found"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $name: NOT FOUND"
        ((FAILED++))
    fi
}

# Function to check file
check_file() {
    local file=$1
    local name=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $name: Found"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $name: NOT FOUND"
        ((FAILED++))
    fi
}

# Check System Requirements
echo -e "${BLUE}System Requirements${NC}"
echo "─────────────────────────────────────"
check_command "node" "Node.js"
check_command "npm" "npm"
check_command "git" "Git"

# Check MongoDB
echo ""
echo -e "${BLUE}Database${NC}"
echo "─────────────────────────────────────"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB: Installed"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} MongoDB: Not installed locally (can use Atlas)"
fi

# Check Backend Structure
echo ""
echo -e "${BLUE}Backend Structure${NC}"
echo "─────────────────────────────────────"
check_directory "backend" "Backend directory"
check_file "backend/package.json" "Backend package.json"
check_file "backend/server.js" "Backend server.js"
check_file "backend/.env.example" "Backend .env.example"
check_directory "backend/routes" "Backend routes"
check_directory "backend/controllers" "Backend controllers"
check_directory "backend/models" "Backend models"
check_directory "backend/middleware" "Backend middleware"

# Check Frontend Structure
echo ""
echo -e "${BLUE}Frontend Structure${NC}"
echo "─────────────────────────────────────"
check_directory "frontend" "Frontend directory"
check_file "frontend/index.html" "Frontend index.html"
check_file "frontend/dashboard.html" "Frontend dashboard.html"
check_directory "frontend/css" "Frontend CSS"
check_directory "frontend/js" "Frontend JavaScript"
check_file "frontend/css/style.css" "Frontend style.css"
check_file "frontend/js/api.js" "Frontend api.js"
check_file "frontend/js/app.js" "Frontend app.js"
check_file "frontend/js/dashboard.js" "Frontend dashboard.js"

# Check Backend Dependencies
echo ""
echo -e "${BLUE}Backend Dependencies${NC}"
echo "─────────────────────────────────────"

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend node_modules: Installed"
    ((PASSED++))
    
    # Check specific packages
    if [ -f "backend/node_modules/express/package.json" ]; then
        echo -e "${GREEN}✓${NC} Express: Installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Express: NOT INSTALLED"
        ((FAILED++))
    fi
    
    if [ -f "backend/node_modules/mongoose/package.json" ]; then
        echo -e "${GREEN}✓${NC} Mongoose: Installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Mongoose: NOT INSTALLED"
        ((FAILED++))
    fi
    
    if [ -f "backend/node_modules/bcryptjs/package.json" ]; then
        echo -e "${GREEN}✓${NC} bcryptjs: Installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} bcryptjs: NOT INSTALLED"
        ((FAILED++))
    fi
    
    if [ -f "backend/node_modules/jsonwebtoken/package.json" ]; then
        echo -e "${GREEN}✓${NC} JWT: Installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} JWT: NOT INSTALLED"
        ((FAILED++))
    fi
else
    echo -e "${YELLOW}⚠${NC} Backend node_modules: NOT INSTALLED"
    echo "  Run: cd backend && npm install"
fi

# Check Configuration
echo ""
echo -e "${BLUE}Configuration Files${NC}"
echo "─────────────────────────────────────"

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Backend .env: Found"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Backend .env: Not found (copy from .env.example)"
fi

check_file "README.md" "README.md"
check_file "API_DOCUMENTATION.md" "API_DOCUMENTATION.md"
check_file "QUICK_START.md" "QUICK_START.md"
check_file ".gitignore" ".gitignore"

# Check Port Availability
echo ""
echo -e "${BLUE}Port Availability${NC}"
echo "─────────────────────────────────────"

# Check if port 5000 is available
if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 5000 (Backend): Available"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Port 5000 (Backend): In use"
fi

# Check if port 8000 is available
if ! lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 8000 (Frontend): Available"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Port 8000 (Frontend): In use"
fi

# Summary
echo ""
echo "╔════════════════════════════════════════╗"
echo "║           Verification Summary        ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready to run.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. cd backend && npm run dev"
    echo "2. cd frontend && python -m http.server 8000"
    echo "3. Open http://localhost:8000"
else
    echo -e "${YELLOW}⚠ Some checks failed. See above for details.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. Install Node.js from https://nodejs.org/"
    echo "2. Install MongoDB from https://www.mongodb.com/try/download/community"
    echo "3. Run 'npm install' in backend directory"
    echo "4. Copy .env.example to .env in backend"
fi

echo ""
