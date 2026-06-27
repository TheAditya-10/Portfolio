import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  LineChart,
  Rocket,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react"

export const serviceOptions = [
  "AI App Development",
  "Generative AI Development",
  "AI Chatbot Development",
  "RAG Knowledge Base",
  "AI Agent / Copilot",
  "Workflow Automation",
  "SaaS Web App Development",
  "FastAPI Backend Development",
  "MLOps & Deployment",
  "Data Analytics Dashboard",
  "Other / Not Sure",
]

export const servicePackages = [
  {
    title: "AI App Development",
    keywords: "custom AI applications, generative AI apps, AI SaaS development",
    description:
      "End-to-end AI products with clean UX, reliable APIs, model integration, auth, dashboards, and deployment.",
    icon: BrainCircuit,
    deliverables: ["Product scope", "Frontend + backend", "LLM/model integration", "Deployment handoff"],
  },
  {
    title: "AI Chatbot Development",
    keywords: "AI chatbot for website, customer support chatbot, WhatsApp AI chatbot",
    description:
      "Support, sales, and internal chatbots grounded in your business data with source-aware answers.",
    icon: Bot,
    deliverables: ["Chat UI", "Knowledge grounding", "Lead capture", "Admin analytics"],
  },
  {
    title: "RAG Knowledge Systems",
    keywords: "RAG system, knowledge base AI, document search AI",
    description:
      "Private document search and question-answering systems for PDFs, docs, SOPs, support content, and teams.",
    icon: Database,
    deliverables: ["Document ingestion", "Vector search", "Citations", "Evaluation checks"],
  },
  {
    title: "AI Automation Solutions",
    keywords: "business workflow automation, AI agents, process automation",
    description:
      "Automate repetitive work across email, CRM, sheets, reports, document processing, and approvals.",
    icon: Workflow,
    deliverables: ["Workflow map", "Agent actions", "Human approval", "Run monitoring"],
  },
  {
    title: "SaaS & Web App Development",
    keywords: "SaaS development, web app development, MVP development",
    description:
      "Production-minded apps for founders, with roles, subscriptions-ready architecture, dashboards, and APIs.",
    icon: Code2,
    deliverables: ["Next.js UI", "Auth/RBAC", "Database design", "Admin panels"],
  },
  {
    title: "FastAPI Backend Development",
    keywords: "FastAPI developer, backend API development, Python backend",
    description:
      "Scalable Python APIs, integrations, background jobs, database schemas, and secure service architecture.",
    icon: Server,
    deliverables: ["REST APIs", "PostgreSQL/MySQL", "Caching", "Docker-ready code"],
  },
  {
    title: "MLOps & Deployment",
    keywords: "AI deployment, ML pipeline, model monitoring",
    description:
      "Ship models and AI features with repeatable pipelines, evaluation, monitoring, containers, and cloud readiness.",
    icon: Rocket,
    deliverables: ["Docker setup", "CI/CD path", "Metrics", "Deployment docs"],
  },
  {
    title: "Data Dashboards & Analytics",
    keywords: "analytics dashboard, business intelligence dashboard, data science consulting",
    description:
      "Dashboards and forecasting workflows that convert raw data into metrics, alerts, and decisions.",
    icon: LineChart,
    deliverables: ["Data pipeline", "Charts", "KPIs", "Decision reports"],
  },
]

export const productVisuals = [
  {
    title: "AI chatbot and support assistant",
    image: "/ai-chatbot-dashboard.png",
    alt: "AI customer support chatbot dashboard mockup",
    description:
      "A service-ready chatbot experience with tickets, source confidence, support metrics, and handoff context.",
    tags: ["AI Chatbot", "Customer Support", "Lead Capture"],
  },
  {
    title: "AI workflow automation",
    image: "/ai-workflow-automation.png",
    alt: "AI workflow automation dashboard mockup",
    description:
      "Automation flows for CRM, email, reports, and approvals with clear run history and failure visibility.",
    tags: ["AI Agents", "CRM Automation", "Human Approval"],
  },
  {
    title: "RAG knowledge base",
    image: "/rag-knowledge-dashboard.png",
    alt: "RAG knowledge base analytics dashboard mockup",
    description:
      "Document ingestion, semantic search, citations, answer quality checks, and usage analytics in one system.",
    tags: ["RAG", "Vector Search", "Knowledge Base"],
  },
]

export const processSteps = [
  {
    title: "Discover",
    description: "Clarify the business goal, users, data sources, success metrics, and the first useful release.",
  },
  {
    title: "Design",
    description: "Map architecture, prompts, APIs, database schema, user flows, and delivery milestones.",
  },
  {
    title: "Build",
    description: "Ship the core app, backend, AI workflows, testing path, deployment setup, and admin controls.",
  },
  {
    title: "Improve",
    description: "Add observability, feedback loops, evaluation, performance tuning, and next feature iterations.",
  },
]

export const trustPoints = [
  {
    title: "Security-minded architecture",
    description: "Auth, RBAC, data boundaries, server-side secrets, and deployment hygiene are planned from day one.",
    icon: ShieldCheck,
  },
  {
    title: "Measurable AI behavior",
    description: "RAG quality, fallback paths, confidence signals, and usage metrics are built into the product.",
    icon: CheckCircle2,
  },
  {
    title: "Founder-friendly execution",
    description: "You get practical scoping, fast iteration, clear tradeoffs, and deployable code instead of demos only.",
    icon: Rocket,
  },
]

export const clientConfidencePoints = [
  {
    title: "Built for business workflows",
    description:
      "Service pages focus on client problems: support, lead capture, document search, CRM updates, reports, and approvals.",
  },
  {
    title: "Backed by engineering depth",
    description:
      "Your experience in AI, FastAPI, SaaS backends, data systems, and deployment stays visible as evidence behind the service offer.",
  },
  {
    title: "Designed to convert enquiries",
    description:
      "The funnel moves from service keywords to examples, process, proof, FAQ, offer prompt, and a structured enquiry form.",
  },
]

export const faqs = [
  {
    question: "What services can I hire you for?",
    answer:
      "AI app development, generative AI features, chatbots, RAG knowledge bases, AI workflow automation, SaaS web apps, FastAPI backends, dashboards, and deployment support.",
  },
  {
    question: "Can you build a complete MVP?",
    answer:
      "Yes. I can scope, build, and deploy a complete MVP with frontend, backend, database, AI integrations, admin views, and handoff documentation.",
  },
  {
    question: "Do you work with existing products?",
    answer:
      "Yes. I can add AI features, automate workflows, improve backend architecture, connect APIs, or create a knowledge assistant on top of existing data.",
  },
  {
    question: "How do you handle enquiry emails?",
    answer:
      "The enquiry form sends one email to me with your details and one confirmation email to you using server-side SMTP credentials.",
  },
]
