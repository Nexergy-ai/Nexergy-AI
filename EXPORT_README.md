# NEXERGY AI — Complete Source Code Export

**Official Repository:** https://github.com/Nexergy-ai/nexergy-ai-web

This is the complete, editable source code for the NEXERGY AI Operational Intelligence Platform.

## Quick Start

```bash
# Clone or download this repository
git clone <repository-url>
cd nexergy-ai-source-export

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

## Framework & Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Express.js + tRPC 11 |
| **Database** | Drizzle ORM (MySQL/TiDB) |
| **UI Components** | shadcn/ui (50+) |
| **Animations** | Framer Motion |
| **Testing** | Vitest |
| **Build** | Vite |
| **Auth** | Manus OAuth |

## Project Structure

```
.
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── orchestrator/        # Operational Orchestrator MVP
│   │   │   │   ├── OperationalInputModule.tsx
│   │   │   │   ├── OrchestratorFlow.tsx
│   │   │   │   └── OrchestratorPage.tsx
│   │   │   ├── ui/                  # 50+ shadcn/ui components
│   │   │   ├── Hero.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── OperationalDashboard.tsx
│   │   │   ├── OperationalOrchestrator.tsx
│   │   │   ├── IntelligenceLayers.tsx
│   │   │   ├── TrustGovernance.tsx
│   │   │   ├── PlatformArchitecture.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── AIChatBox.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── Map.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── ComponentShowcase.tsx
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── public/
│
├── server/                          # Express + tRPC Backend
│   ├── _core/
│   │   ├── index.ts                 # Server entry point
│   │   ├── context.ts               # tRPC context
│   │   ├── trpc.ts                  # tRPC setup
│   │   ├── oauth.ts                 # OAuth integration
│   │   ├── llm.ts                   # LLM integration
│   │   ├── imageGeneration.ts       # Image generation
│   │   ├── voiceTranscription.ts    # Voice transcription
│   │   ├── notification.ts          # Notifications
│   │   ├── map.ts                   # Maps integration
│   │   ├── dataApi.ts               # Data API
│   │   ├── env.ts                   # Environment variables
│   │   ├── cookies.ts               # Cookie handling
│   │   ├── storageProxy.ts          # Storage proxy
│   │   ├── vite.ts                  # Vite integration
│   │   ├── heartbeat.ts             # Scheduled tasks
│   │   ├── systemRouter.ts          # System routes
│   │   └── types/
│   ├── db.ts                        # Database queries
│   ├── routers.ts                   # tRPC procedures
│   ├── storage.ts                   # Storage helpers
│   └── auth.logout.test.ts          # Tests
│
├── shared/                          # Shared Code
│   ├── const.ts
│   ├── types.ts
│   └── _core/
│
├── drizzle/                         # Database
│   ├── schema.ts                    # Database schema
│   ├── relations.ts
│   └── migrations/
│
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── drizzle.config.ts
│   ├── components.json
│   └── .gitignore
│
└── Documentation
    ├── README.md
    ├── PROJECT_ARCHITECTURE.md
    ├── ROADMAP.md
    ├── CONTRIBUTING.md
    └── todo.md
```

## Available Scripts

```bash
# Development
pnpm dev              # Start development server (Vite + Express)
pnpm dev:client       # Start frontend only
pnpm dev:server       # Start backend only

# Building
pnpm build            # Build frontend and backend
pnpm build:client     # Build frontend only
pnpm build:server     # Build backend only

# Production
pnpm start            # Start production server

# Quality
pnpm check            # TypeScript type check
pnpm format           # Format code with Prettier
pnpm test             # Run Vitest tests
pnpm test:watch       # Run tests in watch mode

# Database
pnpm db:push          # Push database migrations
pnpm db:generate      # Generate migration files
```

## Key Features

### Operational Orchestrator
- **Input Module:** Upload operational context and describe problems
- **Classification Engine:** Mocked but intelligent context classification
- **Business Unit Activation:** 5 specialized units
  - NEXERGY INDUSTRIAL (TPM, RCA, OEE, Lean)
  - NEXERGY ENERGY (ISO 50001, ESG, Sustainability)
  - NEXERGY AGENTS (Orchestration, Automation)
  - NEXERGY DIGITAL_TWIN (Simulation, Prediction)
  - NEXERGY LABS (Research, Benchmarking)
- **Agent Deployment:** Visualized agent orchestration
- **Research Pipeline:** Simulated evidence gathering and analysis
- **Triple Impact Analysis:** Economic, Social, Environmental scoring
- **Digital Twin Iteration:** Optimization preview

### Dashboard
- **KPI Cards:** System Uptime, Active Agents, Anomalies, AI Recommendations
- **Charts:** Recharts visualizations (line, bar, pie)
- **Real-time Metrics:** Simulated operational data
- **Business Unit Performance:** Tracking and analytics

### UI/UX
- **Dark Mode:** Neon industrial palette (cyan, green, purple)
- **Animations:** Framer Motion smooth transitions
- **Responsive:** Mobile-first design
- **Components:** 50+ shadcn/ui components
- **Accessibility:** WCAG compliant

## Installation & Setup

### Prerequisites
- Node.js 22+
- pnpm 10+
- (Optional) MySQL/TiDB for database

### Local Development

```bash
# 1. Clone repository
git clone <repository-url>
cd nexergy-ai-source-export

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev

# 4. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# API: http://localhost:3000/api/trpc
```

### Production Build

```bash
# Build
pnpm build

# Start
pnpm start

# Server runs on http://localhost:3000
```

## Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Frontend
VITE_APP_TITLE=NEXERGY AI
VITE_APP_LOGO=https://...

# Backend (optional)
DATABASE_URL=mysql://user:password@localhost/nexergy
JWT_SECRET=your-secret-key
```

### Database Setup

```bash
# Generate migrations
pnpm drizzle-kit generate

# Apply migrations
pnpm db:push
```

## Testing

```bash
# Run all tests
pnpm test

# Run specific test
pnpm test OperationalOrchestrator

# Watch mode
pnpm test:watch

# Coverage
pnpm test --coverage
```

## Architecture

### Frontend Architecture
- **Pages:** Home, Orchestrator, NotFound
- **Components:** Modular, reusable UI components
- **Hooks:** Custom React hooks for state management
- **Contexts:** React contexts for global state
- **Services:** Business logic services (OrchestratorService, etc.)

### Backend Architecture
- **tRPC:** Type-safe RPC procedures
- **Express:** HTTP server
- **Drizzle ORM:** Database abstraction
- **OAuth:** Manus OAuth integration
- **LLM:** Language model integration

### Data Flow
```
User Input
    ↓
Frontend Component
    ↓
tRPC Procedure Call
    ↓
Backend Service
    ↓
Database Query (Drizzle ORM)
    ↓
Response (Type-safe)
    ↓
Frontend Update
```

## Documentation

- **PROJECT_ARCHITECTURE.md** - Detailed system architecture
- **ROADMAP.md** - Future features and milestones
- **CONTRIBUTING.md** - Development guidelines
- **README.md** - Project overview

## Deployment

### Manus Platform
```bash
# Push to GitHub
git push origin main

# Deploy via Manus UI
# Click "Publish" button
```

### Docker (Optional)
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
pnpm dev -- --port 3001
```

### Database Connection Error
```bash
# Check DATABASE_URL in .env.local
# Ensure MySQL/TiDB is running
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

## Contributing

See CONTRIBUTING.md for guidelines.

## Official Repository

**GitHub:** https://github.com/Nexergy-ai/nexergy-ai-web

## License

MIT

## Support

For issues or questions:
1. Check PROJECT_ARCHITECTURE.md
2. Review CONTRIBUTING.md
3. Open issue on GitHub

---

**Export Date:** June 3, 2026
**Framework:** React 19 + Vite + TypeScript
**License:** MIT
