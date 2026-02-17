# Resume generation

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/theaditya-10s-projects/v0-resume-generation)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/fB9SXiDgos7)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/theaditya-10s-projects/v0-resume-generation](https://vercel.com/theaditya-10s-projects/v0-resume-generation)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/fB9SXiDgos7](https://v0.app/chat/fB9SXiDgos7)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## MySQL Metrics (Views + Likes)

Global counters now use MySQL only:

1. `POST /api/profile-views` increments/reads the shared profile views count.
2. `GET /api/project-likes?ids=...` returns shared like counts.
3. `POST /api/project-likes` increments one project's shared likes.

The API auto-creates these tables on first request:

1. `site_counters`
2. `project_likes`

Add MySQL config in `.env.local` and redeploy:

1. `MYSQL_URL` (or `DATABASE_URL`)  
2. or use `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
