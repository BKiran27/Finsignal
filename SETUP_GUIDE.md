# Complete Setup Guide for FinSignal Capital

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- Supabase account (free tier works)
- Anthropic API key

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file (use the existing one or create new)
cp .env .env.local

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your credentials to backend/.env:
SUPABASE_URL=https://igvyfmrxklqkylbjlzce.supabase.co
SUPABASE_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=3001
NODE_ENV=development
```

### 3. Start Backend Server

```bash
# From backend directory
npm run dev
```

The backend will run on `http://localhost:3001`

### 4. Access the Application

1. Open `http://localhost:5173` in your browser
2. Create an account or sign in
3. Start using the dashboard!

## ✨ Features Available

### Dashboard (📊)
- Market indices (NIFTY 50, SENSEX, etc.)
- Top gainers and losers
- AI market intelligence
- Portfolio performance
- Economic indicators
- Sector heatmap
- High conviction AI picks

### Research (🔬)
- Stock analysis
- Investment recommendations
- AI-powered insights

### Additional Pages
- **Screener** (🎯) - Stock screening tools
- **Holdings** (💼) - Portfolio management
- **Risk** (⚠️) - Risk assessment
- **Allocator** (⚖️) - Asset allocation
- **Advisor** (💡) - Financial advisor

## 🔧 API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

### Investment Analysis
```
POST http://localhost:3001/api/ai/investment-analysis
Body: {
  "ticker": "AAPL",
  "analysisType": "full-stock-analysis",
  "context": "optional context"
}
```

### Budget Analysis
```
POST http://localhost:3001/api/ai/budget-analysis
Body: {
  "income": 50000,
  "expenses": {
    "rent": 15000,
    "food": 5000,
    "utilities": 2000
  },
  "goals": "optional goals"
}
```

## 📝 Architecture

### Frontend (React + TypeScript)
- Vite for fast builds
- TailwindCSS for styling
- React Router for navigation
- Supabase for auth

### Backend (Express + TypeScript)
- Express.js server
- Anthropic Claude API integration
- CORS enabled for frontend communication
- Environment-based configuration

## 🐛 Troubleshooting

### "Cannot reach backend"
1. Ensure backend is running: `npm run dev` in `backend/` directory
2. Check if `http://localhost:3001/api/health` returns 200
3. Verify CORS is configured correctly

### "API Key errors"
1. Check your `.env` files have correct keys
2. Ensure Anthropic API key is active
3. Verify Supabase credentials

### Port already in use
- Frontend: Change PORT in `vite.config.ts`
- Backend: Change PORT in `backend/.env`

## 📚 Next Steps

1. **Customize Dashboard**: Modify `src/pages/DashboardPage.tsx`
2. **Add More Analysis Types**: Update `backend/src/index.ts`
3. **Connect Real Market Data**: Integrate stock APIs (BSE, NSE, Alpha Vantage)
4. **Deploy**: Use Vercel (frontend) and Railway/Render (backend)

## 📄 License

MIT

---

**Happy analyzing! 🚀**
