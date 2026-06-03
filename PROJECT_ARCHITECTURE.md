# NEXERGY AI Platform - Project Architecture

## Overview

NEXERGY AI is an **AI-native operational intelligence platform** designed for enterprise-grade industrial automation, predictive analytics, and autonomous execution. The platform provides real-time operational context analysis, digital twin simulation, and intelligent orchestration across multiple industry sectors.

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 | Interactive UI with real-time updates |
| **Styling** | Framer Motion, Recharts | Animations and data visualization |
| **Backend** | Express.js, tRPC 11 | Type-safe API layer |
| **Database** | MySQL/TiDB, Drizzle ORM | Data persistence |
| **Authentication** | Manus OAuth | User authentication & session management |
| **AI Integration** | LLM API (Manus Built-in) | Real-time intelligence analysis |
| **Build Tools** | Vite, TypeScript, Vitest | Development and testing |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     NEXERGY AI Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Frontend (React + Tailwind)              │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ Hero Section (Particles + CTAs)                 │ │   │
│  │  │ Operational Orchestrator (5-Step Flow)          │ │   │
│  │  │ Operational Input (Sector + LLM)                │ │   │
│  │  │ Dashboard (KPIs + Charts)                       │ │   │
│  │  │ Intelligence Layers (5 Modules)                 │ │   │
│  │  │ Trust & Governance (Compliance)                 │ │   │
│  │  │ Platform Architecture (SVG Diagram)             │ │   │
│  │  │ Navigation (Sticky + Scroll-Spy)                │ │   │
│  │  │ Footer (Links + Status)                         │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         tRPC Client (Type-Safe API)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Backend (Express + tRPC)                │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ Auth Router (OAuth, Logout)                     │ │   │
│  │  │ AI Router (LLM Analysis)                        │ │   │
│  │  │ System Router (Health, Notifications)           │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↕                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    External Services & Data Layer                    │   │
│  │  ├─ Manus OAuth (Authentication)                     │   │
│  │  ├─ LLM API (Intelligence Analysis)                  │   │
│  │  ├─ MySQL Database (Persistence)                     │   │
│  │  └─ Storage Service (Files & Assets)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Hero Section (`Hero.tsx`)

The hero section serves as the platform's entry point, featuring:

- **Particle Background Animation**: Canvas-based particle system with neural network-style connections
- **Dynamic Headline**: "NEXERGY AI" with "Operational Intelligence" subtitle
- **Call-to-Action Buttons**: "Experience Orchestrator" and "View Dashboard"
- **Scroll Indicator**: Animated chevron indicating more content below

**Key Features:**
- GPU-accelerated particle animations
- Responsive design for mobile/tablet/desktop
- Smooth scroll-to-section navigation

### 2. Operational Orchestrator (`OperationalOrchestrator.tsx`)

Visualizes the 5-step operational intelligence flow:

1. **Data Ingestion** - Collect operational context
2. **AI Analysis** - Process and understand data
3. **Digital Twin** - Simulate scenarios
4. **Risk & Efficiency** - Evaluate outcomes
5. **Business Unit** - Activate intelligence

**Implementation:**
- SVG-based flow diagram with animated connections
- Color-coded steps (Electric Blue → Neon Green → Purple → Cyan)
- Step cards with descriptions and icons
- Responsive grid layout

### 3. Operational Input (`OperationalInput.tsx`)

Real-time AI-powered intelligence analysis interface:

- **Sector Selector**: Manufacturing, Energy, Logistics, Healthcare, Mining
- **Context Textarea**: Free-form operational scenario input
- **LLM Integration**: Real-time analysis via Manus LLM API
- **Streaming Response**: Markdown-rendered analysis output

**Analysis Output Includes:**
- Operational Status Assessment
- Key Intelligence Findings
- Recommended Actions
- Risk Indicators

### 4. Operational Dashboard (`OperationalDashboard.tsx`)

Real-time metrics and analytics visualization:

**KPI Cards:**
- System Uptime (99.97%)
- Active Agents (247)
- Anomalies Detected (12)
- AI Recommendations (1847)

**Charts:**
- 24h Activity (Line Chart - Recharts)
- Business Unit Performance (Bar Chart - Recharts)
- Active Agents Status (Pie Chart - Recharts)

**Features:**
- Live metric updates (3-second intervals)
- Color-coded status indicators
- Responsive grid layout
- Animated value transitions

### 5. Intelligence Layers (`IntelligenceLayers.tsx`)

Five modular AI capability cards:

| Module | Color | Metrics | Description |
|--------|-------|---------|-------------|
| **NEXERGY INDUSTRIAL** | Electric Blue | Uptime, Efficiency, Downtime | Predictive maintenance |
| **NEXERGY ENERGY** | Neon Green | Efficiency, Consumption, Optimization | Energy intelligence |
| **NEXERGY AGENTS** | Purple | Autonomy, Actions, Decisions | AI orchestration |
| **NEXERGY DIGITAL TWIN** | Cyan | Prediction, Scenarios, Simulation | Predictive modeling |
| **NEXERGY LABS** | Magenta | Innovation, Research, Development | Governance & R&D |

Each card displays live-simulated metrics (60-100% range) with hover animations and glow effects.

### 6. Trust & Governance (`TrustGovernance.tsx`)

Enterprise compliance and transparency framework:

**Compliance Certifications:**
- ISO 42001 AI Management System
- SOC 2 Type II Certification
- GDPR & Data Privacy Compliance
- Industry-specific Regulations

**Transparency & Accountability:**
- Complete Audit Trails
- Decision Explainability
- Blockchain Verification
- Real-time Monitoring

**Real-time Status Indicators:**
- Compliance Status (Active)
- Audit Trail (Recording)
- Blockchain Sync (Synced)
- Security Level (Critical)

### 7. Platform Architecture (`PlatformArchitecture.tsx`)

Dynamic system architecture visualization:

**Data Flow Pipeline:**
```
Data Flow → Intelligence → Automation → Compliance
```

**Four Pillars:**
1. **Real-Time Intelligence** - Live metrics, instant analysis, active monitoring
2. **Predictive Analytics** - Anomaly detection, risk forecasting, optimization
3. **Autonomous Execution** - AI agents, auto-actions, orchestration
4. **Enterprise Governance** - ISO 42001, audit trails, compliance

### 8. Navigation (`Navigation.tsx`)

Sticky header with scroll-spy functionality:

- **Logo**: "NEXERGY AI" branding
- **Navigation Items**: Dashboard, Orchestrator, Analytics, About, Blog, Careers, Docs, API, Support
- **Mobile Menu**: Collapsible hamburger menu
- **Scroll Detection**: Header background appears on scroll
- **Active Section Highlighting**: Current section highlighted in navigation

### 9. Footer (`Footer.tsx`)

Comprehensive footer with links and status:

**Link Categories:**
- **Platform**: Dashboard, Orchestrator, Analytics
- **Company**: About, Blog, Careers
- **Resources**: Docs, API, Support

**System Status Indicators:**
- System Status (Operational)
- Security (Secure)
- Performance (Optimal)

**Legal Links:** Privacy, Terms, Security

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | #00BFFF | Primary accent, highlights |
| Neon Green | #00FF7F | Success, energy metrics |
| Deep Purple | #C800FF | Warnings, secondary accent |
| Cyan | #00FFFF | Tertiary accent, tech elements |
| Deep Black | #0a0e27 | Background |
| Dark Navy | #0f1535 | Card backgrounds |
| Gray | #999999 | Text secondary |

### Typography

- **Headings**: Bold, high contrast (white on dark)
- **Body**: Regular weight, gray-400 for secondary text
- **Technical**: Monospace for code/metrics
- **Font**: System fonts (optimized for web)

### Animation Principles

- **Entrance**: 300-600ms fade + slide
- **Interactions**: 100-200ms scale/color transitions
- **Micro-interactions**: 150-250ms hover effects
- **Easing**: Cubic-bezier for smooth, natural motion
- **GPU Acceleration**: Transform and opacity only

## Data Flow

### Frontend State Management

**React Hooks:**
- `useState` for local component state
- `useEffect` for side effects and animations
- `useRef` for DOM/canvas references
- `useMemo` for expensive computations

**tRPC Integration:**
- `trpc.ai.analyzeLLM.useMutation()` for LLM calls
- `trpc.auth.me.useQuery()` for user authentication
- `trpc.auth.logout.useMutation()` for logout

### Backend Procedures

**Public Procedures:**
- `auth.me` - Get current user
- `auth.logout` - Clear session
- `ai.analyzeLLM` - Analyze operational context

**Protected Procedures:**
- `system.notifyOwner` - Send notifications to owner
- `system.health` - System health check

## Performance Optimizations

1. **Canvas Rendering**: Particle background uses requestAnimationFrame for smooth 60fps
2. **Chart Optimization**: Recharts with memoized data updates
3. **Animation Optimization**: GPU-accelerated transforms (Framer Motion)
4. **Code Splitting**: Lazy-loaded components with React.lazy
5. **Bundle Size**: Tree-shaking and minification via Vite

## Responsive Design

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640px - 1024px | 2-3 column grid |
| Desktop | > 1024px | Full 4-5 column grid |

## Security Considerations

1. **Authentication**: Manus OAuth with secure session cookies
2. **API Security**: tRPC with type-safe procedures
3. **Data Protection**: HTTPS-only communication
4. **Environment Variables**: Secure credential management
5. **CORS**: Configured for same-origin requests

## Future Enhancements

1. **Real-time WebSocket**: Live data streaming
2. **Advanced Analytics**: Machine learning model integration
3. **Custom Dashboards**: User-configurable layouts
4. **Mobile App**: React Native implementation
5. **API Documentation**: OpenAPI/Swagger integration
6. **Advanced Compliance**: Additional certifications (SOX, HIPAA)
7. **Multi-tenant Support**: Organization-level segregation
8. **Advanced Reporting**: PDF export and scheduling

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm check

# Format code
pnpm format
```

### Database Migrations

```bash
# Generate migration
pnpm drizzle-kit generate

# Apply migration
pnpm drizzle-kit migrate
```

### Deployment

The platform is deployed on Manus infrastructure with:
- Automatic HTTPS
- Global CDN
- Auto-scaling
- Built-in monitoring
- One-click rollback

## File Structure

```
nexergy-ai-platform/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── OperationalOrchestrator.tsx
│   │   │   ├── OperationalInput.tsx
│   │   │   ├── OperationalDashboard.tsx
│   │   │   ├── IntelligenceLayers.tsx
│   │   │   ├── TrustGovernance.tsx
│   │   │   ├── PlatformArchitecture.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── ui/ (shadcn/ui components)
│   │   ├── pages/
│   │   │   └── Home.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── public/
├── server/
│   ├── routers.ts
│   ├── db.ts
│   ├── storage.ts
│   └── _core/
│       ├── context.ts
│       ├── llm.ts
│       ├── oauth.ts
│       └── ...
├── drizzle/
│   ├── schema.ts
│   └── migrations/
├── shared/
│   ├── const.ts
│   └── types.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Conclusion

NEXERGY AI Platform represents a modern, enterprise-grade operational intelligence system built with cutting-edge web technologies. The architecture emphasizes type safety, real-time responsiveness, and seamless user experience while maintaining security and scalability standards required for industrial applications.
