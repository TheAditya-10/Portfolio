# Dynamic Resume Portfolio App

Dynamic Resume Portfolio App is a production-style Next.js system that converts resume data into deployable public portfolio pages.

## Workflow
- Guided wizard: upload, edit, choose template, preview, and deploy.
- Resume editor supports autosave and extraction confidence hints.
- Job match and resume enhancement flow uses n8n first with automatic fallback.

## Architecture
- Next.js App Router with route handlers for parsing, upload, deploy, and public portfolio routes.
- Shared portfolio renderer powers both preview mode and public profile pages.
- TypeScript and Tailwind CSS with Framer Motion for responsive UI and transitions.
- Centralized API/client utilities for consistent data flow across steps.

## Trade-offs
- Chose a step-based UX to reduce drop-off instead of compressing all actions into one page.
- Kept template extensibility explicit, which adds code structure overhead but improves maintainability.
- Included workflow fallback logic to improve reliability when automation endpoints are unavailable.

## Why these choices
- Candidates need fast iteration from raw resume to publishable portfolio.
- Recruiters benefit from consistent, publicly shareable portfolio output.
- Reliability in AI-assisted job-match features matters more than experimental complexity.
