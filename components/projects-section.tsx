"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ExternalLink, Heart, PlayCircle, Play, X, Github } from "lucide-react"
import portfolio from "@/data/portfolio.json"
import { ProjectChat } from "@/components/project-chat"

const projects = portfolio.projects

type PreviewState = {
  id: string
  videoUrl: string
  title: string
}

type ProjectsSectionProps = {
  variant?: "featured" | "all" | "hackathon" | "learning"
  title?: string
  subtitle?: string
  sectionId?: string
}

export function ProjectsSection({
  variant = "featured",
  title = "Flagship AI Systems",
  subtitle = "Built for production, evaluated for impact, and documented for trust.",
  sectionId = "projects",
}: ProjectsSectionProps) {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const [seenPreviews, setSeenPreviews] = useState<Record<string, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [likingByProject, setLikingByProject] = useState<Record<string, boolean>>({})
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (variant === "all") return true
        return project.category === variant
      }),
    [variant],
  )
  const projectIdsParam = useMemo(() => filteredProjects.map((project) => project.id).join(","), [filteredProjects])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.sessionStorage.getItem("portfolio:previewed-projects")
    if (stored) {
      try {
        setSeenPreviews(JSON.parse(stored) as Record<string, boolean>)
      } catch {
        setSeenPreviews({})
      }
    }
  }, [])

  useEffect(() => {
    if (!projectIdsParam) return
    let isMounted = true

    async function loadLikes() {
      try {
        const response = await fetch(`/api/project-likes?ids=${encodeURIComponent(projectIdsParam)}`, {
          cache: "no-store",
        })
        if (!response.ok) return
        const payload = (await response.json()) as { likes?: Record<string, number> }
        if (isMounted && payload.likes) {
          setLikeCounts(payload.likes)
        }
      } catch {
        // Keep UI usable even if likes API is temporarily unavailable.
      }
    }

    loadLikes()

    return () => {
      isMounted = false
    }
  }, [projectIdsParam])

  const handleLike = async (projectId: string) => {
    if (likingByProject[projectId]) return

    setLikingByProject((prev) => ({ ...prev, [projectId]: true }))
    try {
      const response = await fetch("/api/project-likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
        cache: "no-store",
      })
      if (!response.ok) return
      const payload = (await response.json()) as { likes?: number }
      const nextLikes = payload.likes
      if (typeof nextLikes === "number") {
        setLikeCounts((prev) => ({ ...prev, [projectId]: nextLikes }))
      }
    } catch {
      // Ignore transient errors without breaking the project cards.
    } finally {
      setLikingByProject((prev) => ({ ...prev, [projectId]: false }))
    }
  }

  const openPreview = (project: (typeof projects)[number]) => {
    setPreview({ id: project.id, videoUrl: project.videoUrl, title: project.title })
    if (typeof window !== "undefined") {
      const next = { ...seenPreviews, [project.id]: true }
      setSeenPreviews(next)
      window.sessionStorage.setItem("portfolio:previewed-projects", JSON.stringify(next))
    }
  }

  return (
    <section id={sectionId} className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <PlayCircle className="h-4 w-4" />
            Hover any card for a video preview
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              likes={likeCounts[project.id] ?? 0}
              liking={Boolean(likingByProject[project.id])}
              onLike={() => handleLike(project.id)}
              onPreviewClick={() => openPreview(project)}
              onPreviewHover={() => openPreview(project)}
              canHoverPreview={!seenPreviews[project.id]}
            />
          ))}
        </div>
      </div>

      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[80vw] max-w-5xl overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 rounded-full border border-border/60 bg-black/60 p-2 text-white transition hover:border-primary/60"
              aria-label="Close video preview"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              title={`${preview.title} preview`}
              className="h-[75vh] w-full"
              src={`${preview.videoUrl}?autoplay=1&mute=0&controls=1&playsinline=1`}
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}

type ProjectCardProps = {
  project: (typeof projects)[number]
  likes: number
  liking: boolean
  onLike: () => Promise<void>
  onPreviewClick: () => void
  onPreviewHover: () => void
  canHoverPreview: boolean
}

function ProjectCard({ project, likes, liking, onLike, onPreviewClick, onPreviewHover, canHoverPreview }: ProjectCardProps) {
  const [bump, setBump] = useState(false)
  const hoverTimerRef = useRef<number | null>(null)

  const handleLike = async () => {
    if (liking) return
    setBump(true)
    window.setTimeout(() => setBump(false), 280)
    await onLike()
  }

  const startHoverTimer = () => {
    if (!canHoverPreview) return
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = window.setTimeout(() => {
      onPreviewHover()
    }, 1000)
  }

  const cancelHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  return (
    <article
      onMouseEnter={startHoverTimer}
      onMouseLeave={cancelHoverTimer}
      onFocus={startHoverTimer}
      onBlur={cancelHoverTimer}
      tabIndex={0}
      className="group relative rounded-2xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary/50"
      data-story={project.id === "foresightx" ? "project-foresightx" : undefined}
    >
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={onPreviewClick}
            className="flex items-center gap-2 text-left text-xl font-semibold text-foreground"
            aria-label={`Play ${project.title} video`}
          >
            {project.title}
            <Play className="h-4 w-4 text-primary" />
          </button>
          <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
          <div className="mt-2 flex items-center gap-2">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                aria-label={`Open live demo for ${project.title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
        <button
          onClick={() => {
            void handleLike()
          }}
          disabled={liking}
          className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          aria-label={`Like ${project.title}`}
        >
          <Heart className={`h-4 w-4 ${bump ? "animate-pulse" : ""}`} />
          {likes}
        </button>
      </div>

      <p className="mt-4 text-sm text-foreground/80">{project.impact}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <ul className="list-disc pl-5">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>

      <ProjectChat projectId={project.id} projectTitle={project.title} />
    </article>
  )
}
