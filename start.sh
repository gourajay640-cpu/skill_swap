#!/bin/bash
# Quick start script for macOS

echo "🚀 Starting SkillSwap Application..."
echo ""

# Start MongoDB
echo "1️⃣  Starting MongoDB..."
brew services start mongodb-community 2>/dev/null || echo "ℹ️  MongoDB might already be running"
sleep 2

# Start Backend
echo ""
echo "2️⃣  Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
sleep 3

# Start Frontend
echo ""
echo "3️⃣  Starting Frontend Server..."
cd ../frontend
python -m http.server 8000 &
FRONTEND_PID=$!
sleep 2

echo ""
echo "================================"
echo "✅ Application Started!"
echo "================================"
echo ""
echo "📱 Frontend: http://localhost:8000"
echo "🔌 Backend API: http://localhost:5000"
echo "📊 Database: MongoDB (local)"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for interrupt
wait

# Cleanup
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
