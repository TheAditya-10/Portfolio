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
    title: "Launch AI Products Faster",
    keywords: "Custom AI Development, AI Developer, LLM Applications",
    description:
      "Turn an AI product idea into a usable application with workflows, dashboards, backend logic, and deployment handled end to end.",
    icon: BrainCircuit,
    deliverables: ["Faster MVP launch", "Clear product scope", "Production handoff"],
  },
  {
    title: "AI Chatbots That Reduce Support Costs",
    keywords: "AI Chatbot Development, Generative AI Developer, AI Consultant",
    description:
      "Build assistants that answer customer questions, qualify leads, reduce repeated conversations, and improve response time.",
    icon: Bot,
    deliverables: ["24/7 answers", "Lead capture", "Support automation"],
  },
  {
    title: "Turn Company Knowledge Into an AI Assistant",
    keywords: "RAG Systems, knowledge base AI, document search AI",
    description:
      "Create searchable AI knowledge bases from documents, SOPs, FAQs, product docs, and internal data for your team or customers.",
    icon: Database,
    deliverables: ["Faster answers", "Source citations", "Less manual lookup"],
  },
  {
    title: "Automate Manual Workflows",
    keywords: "AI Automation, AI agents, business process automation",
    description:
      "Replace repetitive work in documents, reports, CRM updates, emails, and operations with reliable AI-assisted automation.",
    icon: Workflow,
    deliverables: ["Less manual work", "Faster operations", "Human approvals"],
  },
  {
    title: "Build SaaS Features Your Users Can Trust",
    keywords: "SaaS development, web app development, MVP development",
    description:
      "Ship practical product features with authentication, dashboards, database design, admin tools, and polished user flows.",
    icon: Code2,
    deliverables: ["User workflows", "Admin controls", "Scalable foundation"],
  },
  {
    title: "Scalable Backend Systems That Grow With Your Business",
    keywords: "FastAPI Developer, Python Backend Developer, backend API development",
    description:
      "Develop secure APIs, authentication, databases, integrations, and backend infrastructure designed for long-term scale.",
    icon: Server,
    deliverables: ["Secure APIs", "PostgreSQL", "Reliable integrations"],
  },
  {
    title: "Move AI From Demo to Production",
    keywords: "AI deployment, ML pipeline, model monitoring",
    description:
      "Deploy AI systems with containers, evaluation, monitoring, fallback paths, and a setup your business can maintain.",
    icon: Rocket,
    deliverables: ["Deployment path", "Monitoring", "Maintainable setup"],
  },
  {
    title: "Make Business Data Easier to Act On",
    keywords: "analytics dashboard, business intelligence dashboard, data science consulting",
    description:
      "Turn raw data into dashboards, forecasts, and decision-ready reports that help your team move faster.",
    icon: LineChart,
    deliverables: ["Clear KPIs", "Useful dashboards", "Decision reports"],
  },
]

export const whyWorkWithMe = [
  {
    title: "Production Ready",
    description: "Built with scalable architecture, maintainable code, clean deployment paths, and real users in mind.",
    icon: Rocket,
  },
  {
    title: "Business First",
    description: "Every solution starts with your workflow, your users, and the business problem you need solved.",
    icon: CheckCircle2,
  },
  {
    title: "Modern AI Expertise",
    description: "Focused on LLM applications, RAG systems, FastAPI backends, AI automation, and production-grade systems.",
    icon: BrainCircuit,
  },
  {
    title: "Long-Term Partnership",
    description: "Support does not stop at deployment. Your product can keep improving as usage, data, and priorities change.",
    icon: ShieldCheck,
  },
]

export const projectCaseStudies: Record<
  string,
  {
    problem: string
    solution: string
    businessImpact: string
  }
> = {
  foresightx: {
    problem:
      "Financial workflows need reliable forecasting, monitoring, and repeatable model updates instead of one-off notebooks.",
    solution:
      "Built a cloud-ready forecasting platform with APIs, automated retraining, drift checks, and deployment workflows.",
    businessImpact:
      "Makes market signals easier to monitor and gives teams a foundation for faster data-backed decisions.",
  },
  "ecg-insight": {
    problem:
      "Healthcare teams need faster diagnostic support without forcing patients and clinicians into disconnected tools.",
    solution:
      "Built an AI-assisted ECG interpretation and telehealth workflow with inference, patient flows, and consultation features.",
    businessImpact:
      "Improves speed of review, keeps diagnostic context in one place, and creates a path for remote care experiences.",
  },
  intellihire: {
    problem:
      "Recruiters spend too much time screening resumes, preparing interviews, and converting conversations into structured insights.",
    solution:
      "Built an LLM-powered interview workflow that creates adaptive questions, evaluates answers, and produces recruiter-ready analytics.",
    businessImpact:
      "Reduces repetitive screening work and gives hiring teams a faster way to compare candidates.",
  },
  "Career-Copilot": {
    problem:
      "Job seekers need resume tailoring and ATS alignment, but doing it manually for every role is slow and inconsistent.",
    solution:
      "Built an AI resume and job-matching workflow that analyzes job descriptions and generates role-specific improvements.",
    businessImpact:
      "Helps users move faster from job discovery to application with more relevant, targeted resumes.",
  },
  Visioninspect: {
    problem:
      "Industrial inspection teams need a faster way to identify defects without relying only on manual visual review.",
    solution:
      "Built a prompt-conditioned computer vision pipeline for drywall crack and seam segmentation with tracked experiments.",
    businessImpact:
      "Creates a repeatable inspection workflow that can reduce manual review time and improve defect visibility.",
  },
}

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
    title: "Built around business workflows",
    description:
      "The work starts with the bottleneck you want removed: support, lead capture, document search, CRM updates, reports, or approvals.",
  },
  {
    title: "Backed by engineering depth",
    description:
      "AI systems, FastAPI backends, SaaS products, data workflows, and deployment experience stay visible as evidence behind the service offer.",
  },
  {
    title: "Designed for useful decisions",
    description:
      "You can see the services, examples, process, proof, and enquiry path before deciding whether to start a project conversation.",
  },
]

export const faqs = [
  {
    question: "What services can I hire you for?",
    answer:
      "You can hire me as an AI Consultant, Generative AI Developer, FastAPI Developer, or Python Backend Developer for AI app development, chatbots, RAG systems, LLM applications, automation, SaaS products, dashboards, and deployment support.",
  },
  {
    question: "Can you build a complete MVP?",
    answer:
      "Yes. I can scope, build, and deploy a complete MVP with frontend, backend, database, AI integrations, admin views, and handoff documentation so your first version is usable, not just presentable.",
  },
  {
    question: "Do you work with existing products?",
    answer:
      "Yes. I can add custom AI development to an existing product, automate workflows, improve backend architecture, connect APIs, or create a RAG assistant on top of your existing data.",
  },
  {
    question: "How do you handle enquiry emails?",
    answer:
      "The enquiry form sends one email to me with your details and one confirmation email to you using server-side SMTP credentials.",
  },
]
