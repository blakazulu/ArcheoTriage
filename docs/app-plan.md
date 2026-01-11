# ArcheoTriage - Archaeological Preservation App

## Overview
**ArcheoTriage** (ארכיאו-טריאז') - A mobile-first web app for archaeologists and students to identify artifacts, get preservation guidance, document findings, and learn preservation science.

The name combines "Archaeology" + "Triage" - reflecting the app's core mission: helping field workers quickly assess and prioritize artifact care, just like medical triage prioritizes patient treatment.

## Tech Stack
- **Frontend**: React 19 + Vite 7 + TypeScript 5.9
- **Styling**: Tailwind CSS v4 (RTL support built-in)
- **State**: React Context + useReducer
- **Database**: Firebase (Firestore + Storage)
- **Backend**: Netlify Functions (serverless)
- **AI**: Google Gemini Vision API (artifact identification)
- **i18n**: react-i18next (Hebrew/English)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Hosting**: Netlify

**Important**: Mobile-first BUT must look great on desktop too!

## Core Features

### 1. Field Guide (Artifact Identification & Preservation)
- **Artifact Selector**: Visual cards for each type (Ceramics, Metals, Organic, Textiles, Scrolls)
- **Preservation Instructions**: Step-by-step guide per artifact type
- **Risk Assessment**: Color-coded risk factors (humidity, temperature, light, vibration)
- **Box Specifications**: Detailed specs for each preservation box type
- **Quick Reference**: Swipeable cards for field use

### 2. Documentation & Cataloging
- **Add Finding**: Form with photo upload, artifact type, location, notes
- **Findings List**: Searchable/filterable gallery of documented artifacts
- **Finding Detail**: Full info view with preservation history
- **Export**: Generate PDF report for lab transfer

### 3. Education Hub
- **Lessons**: Interactive cards explaining preservation science
- **Quizzes**: Test knowledge on artifact handling
- **Progress Tracking**: Track completed lessons (stored in DB)

### 4. AI-Powered Identification (Gemini Vision)
- **Photo Capture**: Take or upload photo of artifact
- **AI Analysis**: Gemini Vision identifies artifact type
- **Auto-Suggestion**: Automatically shows relevant preservation guide
- **Confidence Score**: Display how certain the AI is
- **Manual Override**: User can correct if AI is wrong

**Flow:**
1. User taps "Identify Artifact" → Camera opens
2. Photo sent to Gemini Vision API
3. AI returns: artifact type, confidence, risk factors
4. App shows matching preservation guide
5. User can save to findings with AI-generated metadata

### 5. Bilingual Support
- Toggle Hebrew/English in header
- RTL layout for Hebrew
- All content translated

## Database Schema (Firebase Firestore)

```
/findings/{id}
  - artifactType: string
  - title: string
  - description: string
  - location: string
  - photoUrl: string (Firebase Storage URL)
  - preservationMethod: string
  - riskNotes: string
  - aiIdentification: {
      type: string
      confidence: number
      risks: string[]
    }
  - createdAt: timestamp
  - language: 'he' | 'en'

/quizProgress/{sessionId}
  - lessonId: string
  - score: number
  - completedAt: timestamp
```

**Firebase Storage Structure:**
```
/findings/{findingId}/photo.jpg
```

## File Structure

```
adi/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── he.json
│   │   └── en.json
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── BottomNav.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── ArtifactCard.tsx
│   │   ├── PreservationGuide.tsx
│   │   ├── RiskIndicator.tsx
│   │   ├── FindingForm.tsx
│   │   ├── FindingCard.tsx
│   │   ├── LessonCard.tsx
│   │   └── QuizCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Guide.tsx
│   │   ├── ArtifactDetail.tsx
│   │   ├── Identify.tsx           (AI identification page)
│   │   ├── Findings.tsx
│   │   ├── AddFinding.tsx
│   │   ├── FindingDetail.tsx
│   │   ├── Education.tsx
│   │   └── Quiz.tsx
│   ├── data/
│   │   ├── artifacts.ts      (artifact types & preservation data)
│   │   ├── lessons.ts        (educational content)
│   │   └── quizzes.ts        (quiz questions)
│   ├── lib/
│   │   └── firebase.ts        (Firebase config & client)
│   └── hooks/
│       ├── useFindings.ts
│       ├── useQuizProgress.ts
│       └── useArtifactIdentification.ts
├── netlify/
│   └── functions/
│       └── identify.ts        (Gemini API - keeps key server-side)
└── docs/
    └── idea.txt
```

## Implementation Order

### Phase 1: Project Setup ✅ COMPLETED
1. ✅ Initialize Vite + React + TypeScript
2. ✅ Configure Tailwind with RTL support
3. ✅ Setup i18n with Hebrew/English
4. ✅ Create base Layout with Header + BottomNav
5. ✅ Setup React Router

### Phase 2: Field Guide ✅ COMPLETED
1. ✅ Create artifact data structure (from research doc)
2. ✅ Build ArtifactCard component
3. ✅ Build Guide page with artifact grid
4. ✅ Build ArtifactDetail page with preservation steps
5. ✅ Add RiskIndicator component

### Phase 3: Documentation
1. Setup Firebase project (Firestore + Storage)
2. Create Firebase client (`src/lib/firebase.ts`)
3. Build FindingForm with photo upload to Firebase Storage
4. Build Findings list page
5. Build FindingDetail page

### Phase 4: AI Identification
1. Create Netlify Function for Gemini API (`netlify/functions/identify.ts`)
2. Create identification prompt for artifact analysis
3. Build camera/upload component
4. Build Identify page with results display
5. Create `useArtifactIdentification` hook
6. Connect to preservation guide on identification

### Phase 5: Education
1. Create lessons data structure
2. Build LessonCard component
3. Build Education page
4. Create quiz data
5. Build Quiz component with scoring

### Phase 6: Polish & Deploy
1. Add loading states
2. Add error handling
3. Test RTL layout (Hebrew/English)
4. Test desktop layout (sidebar nav, two-column grid)
5. Deploy to Netlify

## UI Design: "Field Kit" Aesthetic

**Concept**: Rugged, utilitarian design inspired by military field medical kits, Pelican cases, and emergency equipment. Professional slate-blue tones with high-visibility orange accents.

**Working prototype**: `docs/ui-prototype.html`

---

### Color System

#### Primary Palette
| CSS Variable | Color | Hex | Usage |
|--------------|-------|-----|-------|
| `--color-slate` | Slate | `#3D5A6C` | Header, nav, buttons |
| `--color-slate-dark` | Slate Dark | `#2C4251` | Header gradient, nav bg |
| `--color-slate-light` | Slate Light | `#4E6B7D` | Hover states |
| `--color-stone` | Stone | `#7A8B8C` | Borders, dividers |
| `--color-stone-light` | Stone Light | `#9AABAC` | Secondary borders |

#### Accent & Background
| CSS Variable | Color | Hex | Usage |
|--------------|-------|-----|-------|
| `--color-signal-orange` | Signal Orange | `#E85D04` | Primary actions, active states |
| `--color-signal-orange-light` | Orange Light | `#F48C42` | Hover states |
| `--color-canvas` | Canvas | `#F5F3EE` | Page background |
| `--color-canvas-dark` | Canvas Dark | `#E8E4DB` | Card backgrounds |

#### Triage Status Colors
| CSS Variable | Color | Hex | Usage |
|--------------|-------|-----|-------|
| `--color-critical` | Red | `#C1121F` | High risk, urgent |
| `--color-warning` | Amber | `#E9A319` | Medium risk, caution |
| `--color-stable` | Steel Blue | `#4A6FA5` | Low risk, stable |
| `--color-info` | Navy | `#1D4E89` | Informational |

---

### Typography

| Use | Font | CSS Variable | Notes |
|-----|------|--------------|-------|
| **Display/Headers** | Black Ops One | `--font-display` | Stencil military style, uppercase |
| **Body (Hebrew)** | Heebo | `--font-body-he` | Clean, readable Hebrew |
| **Body (English)** | Rubik | `--font-body-en` | Matches Heebo weight |

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Rubik:wght@400;500;600;700&family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### Key UI Components

#### Header
- Slate gradient background (`slate` → `slate-dark`)
- Hazard stripe accent at bottom (orange/slate repeating)
- Fixed on desktop, sticky on mobile
- Logo with orange icon + stencil text

#### Artifact Cards
- Canvas background with stone border
- Colored top stripe (4px)
- Hover: border changes to slate, stripe to orange
- Icon in circular stone background
- Risk badge (color-coded pill)

#### Triage Indicators
- Dot + ring system
- Colors: red (critical), amber (warning), steel-blue (stable)
- Used in quick reference cards

#### Navigation
- **Mobile**: Bottom nav bar, dark slate background
- **Desktop**: Left sidebar (80px width)
- Active state: orange color + orange indicator line
- Icons + labels

#### Buttons
- **Primary**: Signal orange background, white text
- **Secondary**: Slate background, white text
- Subtle gradient overlay for depth
- Hover: lift effect (-1px translateY)

#### Risk Tags
- Pill-shaped badges
- Color-coded background (10% opacity) + border + text
- Used for humidity, temperature, shock indicators

---

### Responsive Layout

| Breakpoint | Width | Layout |
|------------|-------|--------|
| **Mobile** | <768px | Single column, bottom nav |
| **Tablet** | 768-1023px | Wider content (900px max), bottom nav |
| **Desktop** | 1024-1399px | Two-column grid, left sidebar nav |
| **Large** | 1400px+ | Three-column artifacts, sticky triage card |
| **Ultra-wide** | 1800px+ | Centered content with sidebar offset |

#### Desktop Layout Details
```
┌─────────────────────────────────────────────────┐
│                    HEADER                        │
├────────┬────────────────────────────────────────┤
│        │  Quick Actions                          │
│  NAV   ├─────────────────┬──────────────────────┤
│  BAR   │  Artifact Grid  │  Triage Reference    │
│        │                 │  (sticky)            │
│        │                 │                      │
└────────┴─────────────────┴──────────────────────┘
```

---

### Design Principles
1. **High contrast** - Readable in outdoor/field conditions
2. **Color-coded severity** - Medical triage system (red/amber/blue)
3. **Quick-scan layouts** - Large touch targets, clear hierarchy
4. **Canvas texture** - Subtle grain background for depth
5. **Stencil typography** - Field kit / military equipment feel
6. **Responsive navigation** - Bottom nav → sidebar on desktop
7. **RTL-ready** - Full Hebrew support with proper layout flip

## Verification
1. Run `npm run dev` and test on mobile viewport
2. Run `npm run dev` and test on desktop (1024px+) - verify sidebar nav
3. Toggle Hebrew/English - verify RTL layout switches correctly
4. Test AI identification - take photo, verify Gemini returns result
5. Add a finding with photo - verify it saves to Firebase
6. Complete a quiz - verify progress saves
7. Test all artifact types have complete preservation instructions
8. Deploy to Netlify and verify production build

## Key Files to Create
1. ✅ `package.json` - dependencies
2. ✅ `src/data/artifacts.ts` - all artifact preservation data from research
3. ✅ `src/i18n/he.json` & `en.json` - translations
4. `src/lib/firebase.ts` - Firebase config & client
5. `netlify/functions/identify.ts` - Gemini API serverless function
6. ✅ `src/pages/Guide.tsx` - main field guide interface
7. ✅ `src/pages/Identify.tsx` - AI identification page (placeholder)

## Environment Variables

**Frontend (.env):**
```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_APP_ID=your_app_id
```

**Netlify Functions (set in Netlify dashboard):**
```env
GEMINI_API_KEY=your_gemini_key
```
