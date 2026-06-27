# APST.ME - AI & Software Services

Live: [https://apst.me](https://apst.me)

AI app development and software services website for **Aditya Pratap Singh Tomar** built with Next.js, TypeScript, and Tailwind CSS.
The site combines a service-first funnel with founder proof, AI-powered project Q&A, resume-fit analysis, enquiry email handling, and universal engagement metrics backed by Neon Postgres.

## Highlights

- Service-first homepage for AI apps, chatbots, RAG systems, automation, SaaS, and backend development.
- Founder/portfolio proof sections: About, Projects, Experience, Skills, Resume fit.
- AI portfolio assistant with intent-aware responses (`general`, `recruiter`, `tech`, `research`).
- Project-scoped AI chat grounded in each project case-study markdown file.
- Resume role-fit generator from job descriptions (`/api/ai/resume`).
- SMTP enquiry form that emails both the owner and the visitor.
- Universal counters with Neon Postgres:
  - Global profile views.
  - Global project likes (shared across all users).
- Story mode with guided scroll + narration.
- Theme toggle and responsive UI.
- Vercel analytics integration.

## Tech Stack

- `Next.js 16` (App Router)
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `@neondatabase/serverless` (server-side metrics storage)
- `nodemailer` (server-side enquiry emails)
- `lucide-react`
- `@vercel/analytics`

## Project Structure

```txt
app/
  api/
    ai/
      route.ts
      project/route.ts
      resume/route.ts
    profile-views/route.ts
    project-likes/route.ts
  page.tsx
  about/page.tsx
  projects/page.tsx
  experience/page.tsx
  skills/page.tsx
  resume/page.tsx
components/
  hero-section.tsx
  projects-section.tsx
  ai-chat-widget.tsx
  project-chat.tsx
  intent-tracker.tsx
lib/
  ai-provider.ts
  rag.ts
  portfolio.ts
  postgres.ts
  metrics-store.ts
data/
  portfolio.json
  content/
    projects/projects.json
    certifications/certifications.json
    research/research.json
  projects/*.md
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env.local` and set values:

```env
# AI provider
AI_PROVIDER=gemini
AI_API_KEY=your_api_key
AI_MODEL=gemini-2.5-flash
AI_API_URL=https://generativelanguage.googleapis.com/v1beta

# Neon Postgres metrics
DATABASE_URL=postgresql://user:password@ep-example-pooler.region.aws.neon.tech/dbname?sslmode=require&channel_binding=require

# Optional Postgres resilience settings
# POSTGRES_CONNECT_TIMEOUT_MS=5000
# METRICS_MEMORY_FALLBACK=true
# POSTGRES_RETRY_COOLDOWN_MS=30000

# SMTP enquiry emails
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM="APST Services <your_smtp_username>"
ENQUIRY_TO=aditya.pratap.singh.tomar.1082006@email.com
```

### 3. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Neon Postgres Metrics

The app auto-creates required tables on first metrics request:

- `site_counters`
- `project_likes`

Used by:

- `POST /api/profile-views` -> increments global profile views.
- `GET /api/profile-views` -> reads global profile views.
- `GET /api/project-likes?ids=id1,id2` -> fetches shared like counts.
- `POST /api/project-likes` with `{ "projectId": "foresightx" }` -> increments shared likes.

If Neon Postgres is temporarily unreachable, metrics endpoints can fall back to in-memory counters
(controlled by `METRICS_MEMORY_FALLBACK`, default `true`) and retry DB access after
`POSTGRES_RETRY_COOLDOWN_MS`.

Use the pooled Neon connection string for serverless deployments. In the Neon dashboard, click
**Connect**, enable connection pooling, and copy the `DATABASE_URL` value with `-pooler` in the hostname.

## AI Endpoints

- `POST /api/ai`
  - Portfolio assistant with lightweight retrieval from merged content data.
- `POST /api/ai/project`
  - Project-specific answers using case-study markdown context.
- `POST /api/ai/resume`
  - ATS-friendly role fit output from pasted job description.

## Content Updates

- Update profile/experience/skills/core content in `data/portfolio.json`.
- Update projects in `data/content/projects/projects.json` (`flagship: true` shows on home).
- Update certifications in `data/content/certifications/certifications.json`.
- Add future research in `data/content/research/research.json`.
- Update detailed project context in `data/projects/*.md`.
- Update hero/social/contact content via the same data source + component text.

## Deployment

Production is live at [https://apst.me](https://apst.me).

For Vercel deployment:

1. Import the repository into Vercel.
2. Add environment variables from `.env.local`.
3. Add the Neon pooled `DATABASE_URL` in Vercel project settings.
4. Deploy.

## Scripts

- `npm run dev` - start local development server.
- `npm run build` - production build.
- `npm run start` - run production server.
- `npm run lint` - run ESLint (requires eslint installed/configured in environment).

## Notes

- Keep secrets only in `.env.local` or your hosting provider's secret manager.
- Chat history and some UI insights are stored in browser storage for session UX.
- Global counters/likes are server-side in Neon Postgres.
