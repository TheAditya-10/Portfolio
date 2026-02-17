# APST.ME - AI-Native Portfolio

Live: [https://apst.me](https://apst.me)

Personal portfolio for **Aditya Pratap Singh Tomar** built with Next.js, TypeScript, and Tailwind CSS.
The site combines recruiter-friendly storytelling with AI-powered project Q&A, resume-fit analysis, and universal engagement metrics backed by MySQL.

## Highlights

- Multi-page portfolio experience: Home, About, Projects, Experience, Skills, Resume fit.
- AI portfolio assistant with intent-aware responses (`general`, `recruiter`, `tech`, `research`).
- Project-scoped AI chat grounded in each project case-study markdown file.
- Resume role-fit generator from job descriptions (`/api/ai/resume`).
- Universal counters with MySQL:
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
- `mysql2` (server-side metrics storage)
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
  mysql.ts
  metrics-store.ts
data/
  portfolio.json
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

# MySQL (use URL form)
MYSQL_URL=mysql://user:password@host:3306/database

# OR use split variables
# MYSQL_HOST=localhost
# MYSQL_PORT=3306
# MYSQL_USER=root
# MYSQL_PASSWORD=secret
# MYSQL_DATABASE=portfolio

# Optional for managed MySQL with SSL
# MYSQL_SSL=true
```

### 3. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`.

## MySQL Metrics

The app auto-creates required tables on first metrics request:

- `site_counters`
- `project_likes`

Used by:

- `POST /api/profile-views` -> increments global profile views.
- `GET /api/profile-views` -> reads global profile views.
- `GET /api/project-likes?ids=id1,id2` -> fetches shared like counts.
- `POST /api/project-likes` with `{ "projectId": "foresightx" }` -> increments shared likes.

## AI Endpoints

- `POST /api/ai`
  - Portfolio assistant with lightweight retrieval from `data/portfolio.json`.
- `POST /api/ai/project`
  - Project-specific answers using case-study markdown context.
- `POST /api/ai/resume`
  - ATS-friendly role fit output from pasted job description.

## Content Updates

- Update profile/experience/projects/skills data in `data/portfolio.json`.
- Update detailed project context in `data/projects/*.md`.
- Update hero/social/contact content via the same data source + component text.

## Deployment

Production is live at [https://apst.me](https://apst.me).

For Vercel deployment:

1. Import the repository into Vercel.
2. Add environment variables from `.env.local`.
3. Ensure MySQL is reachable from Vercel runtime.
4. Deploy.

## Scripts

- `npm run dev` - start local development server.
- `npm run build` - production build.
- `npm run start` - run production server.
- `npm run lint` - run ESLint (requires eslint installed/configured in environment).

## Notes

- Keep secrets only in `.env.local` or your hosting provider's secret manager.
- Chat history and some UI insights are stored in browser storage for session UX.
- Global counters/likes are server-side in MySQL.
