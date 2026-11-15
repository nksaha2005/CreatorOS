#!/usr/bin/env bash
# ==============================================================================
# Creator OS — Startup Script
# Starts both FastAPI Backend (:8000) and Next.js Frontend (:3000)
# ==============================================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

# Colors
CYAN='\033[0;36m'
VIOLET='\033[0;35m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${VIOLET}"
echo "  ╔═══════════════════════════════════════════════════════════════╗"
echo "  ║                                                               ║"
echo "  ║     🎬  CREATOR OS — AI Creative Studio & Viral Remixer       ║"
echo "  ║     Multi-Agent Swarm · Gemini 4 Hydrogen · Next.js 14        ║"
echo "  ║                                                               ║"
echo "  ╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Cleanup on exit (Ctrl+C)
cleanup() {
  echo -e "\n${YELLOW}Shutting down Creator OS servers...${NC}"
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [ -n "$FRONTEND_PID" ]; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  echo -e "${GREEN}✓ All services stopped cleanly. Goodbye!${NC}"
  exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# ------------------------------------------------------------------------------
# 1. Backend Setup & Start
# ------------------------------------------------------------------------------
echo -e "${CYAN}▶ Preparing Backend (FastAPI)...${NC}"
cd "$BACKEND_DIR"

# Ensure venv exists
if [ ! -d "venv" ]; then
  echo -e "${YELLOW}Creating Python virtual environment in backend/venv...${NC}"
  python3 -m venv venv
  ./venv/bin/pip install --upgrade pip -q
  ./venv/bin/pip install -r requirements.txt -q
fi

# Ensure .env exists
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    echo -e "${YELLOW}Creating backend/.env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️  Please configure GEMINI_API_KEY in backend/.env if needed.${NC}"
  fi
fi

# Start Backend
echo -e "${GREEN}✓ Starting FastAPI backend on http://localhost:8000${NC}"
./venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# ------------------------------------------------------------------------------
# 2. Frontend Setup & Start
# ------------------------------------------------------------------------------
echo -e "${VIOLET}▶ Preparing Frontend (Next.js 14)...${NC}"
cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Installing frontend dependencies...${NC}"
  npm install
fi

# Ensure .env.local exists
if [ ! -f ".env.local" ]; then
  echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
fi

# Start Frontend
echo -e "${GREEN}✓ Starting Next.js frontend on http://localhost:3000${NC}"
npm run dev &
FRONTEND_PID=$!

# ------------------------------------------------------------------------------
# 3. Ready Banner
# ------------------------------------------------------------------------------
echo ""
echo -e "${GREEN}═════════════════════════════════════════════════════════════════${NC}"
echo -e "🚀 ${GREEN}Creator OS is now LIVE!${NC}"
echo -e "   • Frontend:  ${CYAN}http://localhost:3000${NC}"
echo -e "   • Backend:   ${CYAN}http://localhost:8000${NC}"
echo -e "   • API Docs:  ${CYAN}http://localhost:8000/docs${NC}"
echo -e "   • Health:    ${CYAN}http://localhost:8000/api/health${NC}"
echo -e "${GREEN}═════════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Press Ctrl+C to shut down both servers.${NC}\n"

# Wait for both background processes
wait
