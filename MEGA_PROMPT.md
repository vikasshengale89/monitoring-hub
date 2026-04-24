# AUTO-EXECUTE: Build monitoring-hub End-to-End

> **Paste this ENTIRE prompt into your AI Agent IDE (Antigravity / Cursor).**
> The agent will execute every step from folder structure to deployment.

---

## CHALLENGE DESCRIPTION

Challenge: "The Secure API Proxy & Monitoring Hub"
The Context: Most browsers block direct API calls (CORS). Your goal is to build a "Safe-Pass" application that allows developers to test APIs through a server-side proxy while tracking the health of those APIs.

---

## INSTRUCTIONS FOR AI AGENT

You are building **monitoring-hub** for the Google Antigravity PromptWars hackathon.
The project is already initialized at `projects/monitoring-hub/`.
Read `projects/monitoring-hub/AGENTS.md` for all mandatory coding rules.

Execute ALL the following steps IN ORDER. Do NOT skip any step.
Do NOT ask for confirmation between steps — execute continuously until done.
If a step fails, fix the issue and retry before moving to the next step.

---

### STEP 1: CREATE FOLDER STRUCTURE

Create the folder structure at `projects/monitoring-hub/`.

**Frontend:** Angular 19+ standalone app at `projects/monitoring-hub/frontend/`

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── features/          # One folder per feature — lazy loaded
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── models/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── i18n/
│   │   ├── icons/
│   │   └── images/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css
└── proxy.conf.json
```

**Backend:** Node.js + Express at `projects/monitoring-hub/backend/`

```
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── index.ts
├── tests/
├── .env.example
├── tsconfig.json
└── nodemon.json
```

Create `.gitkeep` in empty folders. Create real files for: `proxy.conf.json`,
`.env.example`, `environment.ts`, `environment.prod.ts`.

Then run:
- `cd projects/monitoring-hub/frontend && ng new monitoring-hub --standalone --style=css --routing --skip-git` (if not already created)
- `cd projects/monitoring-hub/backend && npm init -y`

---

### STEP 2: GENERATE REQUIREMENTS & IMPLEMENTATION PLAN

Read these files first:
1. `templates/requirements_template.md`
2. `templates/implementation_plan_template.md`
3. `.context/conventions.md`
4. `projects/monitoring-hub/AGENTS.md`

**Generate `projects/monitoring-hub/requirements.md`** — Fill ALL sections:
- Full challenge description (from the CHALLENGE DESCRIPTION above)
- At least 10 specific, testable functional requirements
- Non-functional: performance (<2s load), security (XSS, CORS, validation),
  accessibility (WCAG 2.1 AA), responsive design (mobile-first)
- Tech stack: Angular 19 + Node.js/Express + Firebase Hosting (Spark Plan)
- Deliverables checklist, Judging criteria table
- NO placeholders, NO _TBD_, NO _..._

**Generate `projects/monitoring-hub/implementation_plan.md`** — Fill ALL sections:
- Overview, Architecture (ASCII diagram), Data Model (entities + fields + types)
- API Endpoints table (Method, Path /api/v1/..., Purpose, Auth)
- Files to Create (every file, grouped by frontend/backend)
- Dependencies (every npm package with purpose)
- Build Order: Phase 1 (MVP), Phase 2 (Features), Phase 3 (Polish)
- Security checklist, Testing strategy, Time allocation
- NO placeholders anywhere

**WOW FACTOR — Add Phase 4:**
Add ONE impressive feature that makes judges remember this project. Pick the
most visually impactful and fastest to implement from:
- Real-time ambient idle mode with CSS particle animations + event countdown
- Voice-activated navigation via Web Speech API
- Time-of-day adaptive theming with weather-aware backgrounds
Include specific implementation steps in the plan.

---

### STEP 3: EXECUTE PHASE 1 (MVP)

Read `projects/monitoring-hub/implementation_plan.md` and `projects/monitoring-hub/AGENTS.md`.
Execute Phase 1 following ALL rules from AGENTS.md.

Install all dependencies. Build each file. Fix linter issues after each file.

---

### STEP 4: EXECUTE PHASE 2 (FEATURES)

Read `projects/monitoring-hub/implementation_plan.md` and execute Phase 2.
Same rules. Complete ALL listed steps.

---

### STEP 5: EXECUTE PHASE 3 (POLISH) + WOW FACTOR

Execute Phase 3 + Phase 4 (Wow Factor) from `implementation_plan.md`.

After all phases, run quality check:
- Zero linter errors
- No hardcoded secrets
- All components standalone + OnPush
- All routes lazy loaded
- No console.log
- No unused imports

---

### STEP 6: RUN TESTS & FIX ALL ISSUES

Execute:
```bash
cd projects/monitoring-hub/backend && npm test
cd projects/monitoring-hub/frontend && ng test --watch=false
cd projects/monitoring-hub/frontend && ng build --configuration=production
cd projects/monitoring-hub/backend && npm run build
```

Test each API endpoint with curl. Fix every failure immediately and re-test.

Security audit:
- Search all files for hardcoded passwords, secrets, keys, tokens
- Verify .env is gitignored
- Verify CORS and input validation

Do NOT proceed until ALL tests pass and build succeeds.

---

### STEP 7: GENERATE FLOW DOCUMENT

Read all source files in `projects/monitoring-hub/` and generate
`projects/monitoring-hub/FLOW.md` with:
- High-level architecture diagram (ASCII)
- Application startup flow (bootstrap sequence)
- User interaction flows per feature (action → component → service → API → UI update)
- Data flow and state management (Angular signals)
- Route map table (path, component, lazy loaded, guard)
- API contract table (method, path, request, response)
- Security flow (auth, validation, CORS, XSS prevention)
- Build & deploy flow (ng build → firebase deploy)

---

### STEP 8: CONFIGURE FIREBASE HOSTING

Create `projects/monitoring-hub/firebase.json`:
```json
{
  "hosting": {
    "public": "frontend/dist/monitoring-hub/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/**", "destination": "/api/index.html" },
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|svg|png|jpg|jpeg|gif|ico|webp)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "**",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-XSS-Protection", "value": "1; mode=block" }
        ]
      }
    ]
  }
}
```

Create `projects/monitoring-hub/.firebaserc`:
```json
{
  "projects": { "default": "monitoring-hub" }
}
```

Print these commands for the user to deploy manually:
```
Firebase is configured. Run these commands to deploy:
  cd projects/monitoring-hub
  firebase login
  firebase init hosting   # Select existing project or create new
  cd frontend && ng build --configuration=production && cd ..
  firebase deploy --only hosting
```

---

### STEP 9: PREPARE GIT & GITHUB (with SSH Deploy Key)

A deploy key has already been generated at `projects/monitoring-hub/.deploy_key`.

Initialize git and prepare for push:
```bash
cd projects/monitoring-hub
git init
git branch -M main
git add .
git commit -m "feat: monitoring-hub — Angular + Node.js hackathon app for PromptWars"
```

Verify .gitignore covers: node_modules, dist, .angular, .env, .firebase,
.cursor, .context, *.template.*, coverage, .idea, .vscode, *.log,
.deploy_key, .deploy_key.pub

Then print these instructions for the user:

```
GitHub Push Instructions (using SSH deploy key):

1. Create a NEW repository on GitHub:
   - Go to https://github.com/new
   - Name: monitoring-hub
   - Visibility: Public
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. Add the deploy key to the repo:
   - Go to: https://github.com/vikasshengale89/monitoring-hub/settings/keys
   - Click "Add deploy key"
   - Title: "Hackathon Deploy Key"
   - Paste this public key:

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDbkccoqE7yfNrQkTID0OfTBinRI3Rzws4PVvACGlBP4 deploy@monitoring-hub

   - CHECK "Allow write access"
   - Click "Add key"

3. Push the code:
   cd projects/monitoring-hub
   eval "$(ssh-agent -s)"
   ssh-add .deploy_key
   git remote add origin git@github.com:vikasshengale89/monitoring-hub.git
   git push -u origin main
```

---

### STEP 10: GENERATE PRESENTATION README

Generate a competition-ready `projects/monitoring-hub/README.md` with:
- Project tagline (one compelling sentence)
- Demo section (live URL placeholder, screenshot placeholders)
- Problem statement (3-4 sentences, why this matters)
- Feature list (all features, highlight Wow Factor with special callout)
- Tech stack table (Layer | Technology | Why)
- Architecture diagram (ASCII from implementation plan)
- Quick start (clone → install → run — step by step commands)
- Project structure tree with descriptions
- API documentation table
- Security measures list
- Performance optimizations list
- Accessibility compliance (WCAG 2.1 AA, keyboard nav)
- Deployment instructions (Firebase Hosting)
- Future roadmap (3-4 enhancement ideas)
- Markdown badges: Angular, Node.js, Firebase, TypeScript
- Author line: Built for Google Antigravity PromptWars Competition

---

### STEP 11: GENERATE LINKEDIN POST

Generate `projects/monitoring-hub/LINKEDIN_POST.md` with:

**LinkedIn post (1200-1500 chars):**
- Hook (first 2 lines must grab attention — "Just shipped..." or compelling question)
- The challenge: mention Google Antigravity PromptWars by name
- What I built: monitoring-hub in 2-3 sentences + the Wow Factor
- Tech: Angular 19 + Node.js + Firebase (one line)
- Key learning about AI-assisted development
- CTA: GitHub link + live demo link
- Hashtags: #PromptWars #GoogleAntigravity #Angular #Firebase
  #AIAssistedDevelopment #Hackathon #WebDevelopment

**Twitter/X post (280 chars):** Shorter version.

Tone: professional, authentic. Emphasize YOUR skills + AI as productivity multiplier.
Do NOT make it sound like AI wrote everything.

---

## END OF MEGA-PROMPT

When ALL steps are done, print this summary:

```
╔═══════════════════════════════════════════════════════════════════╗
║                monitoring-hub — BUILD COMPLETE                     ║
╠═══════════════════════════════════════════════════════════════════╣
║  Requirements:    projects/monitoring-hub/requirements.md          ║
║  Plan:            projects/monitoring-hub/implementation_plan.md   ║
║  Flow:            projects/monitoring-hub/FLOW.md                  ║
║  README:          projects/monitoring-hub/README.md                ║
║  LinkedIn:        projects/monitoring-hub/LINKEDIN_POST.md         ║
║  Firebase:        projects/monitoring-hub/firebase.json            ║
║  AGENTS.md:       projects/monitoring-hub/AGENTS.md                ║
╠═══════════════════════════════════════════════════════════════════╣
║  MANUAL STEPS REMAINING:                                          ║
║  1. Add deploy key to GitHub repo (see Step 9 output)             ║
║  2. git push -u origin main                                       ║
║  3. firebase login && firebase deploy --only hosting              ║
║  4. Copy LinkedIn post from LINKEDIN_POST.md                      ║
╚═══════════════════════════════════════════════════════════════════╝
```
