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
    slug: "custom-ai-development",
    title: "Launch AI Products Faster",
    keywords: "Custom AI Development, AI Developer, LLM Applications",
    description:
      "Turn an AI product idea into a usable application with workflows, dashboards, backend logic, and deployment handled end to end.",
    icon: BrainCircuit,
    deliverables: ["Faster MVP launch", "Clear product scope", "Production handoff"],
  },
  {
    slug: "ai-chatbot-development",
    title: "AI Chatbots That Reduce Support Costs",
    keywords: "AI Chatbot Development, Generative AI Developer, AI Consultant",
    description:
      "Build assistants that answer customer questions, qualify leads, reduce repeated conversations, and improve response time.",
    icon: Bot,
    deliverables: ["24/7 answers", "Lead capture", "Support automation"],
  },
  {
    slug: "rag-systems",
    title: "Turn Company Knowledge Into an AI Assistant",
    keywords: "RAG Systems, knowledge base AI, document search AI",
    description:
      "Create searchable AI knowledge bases from documents, SOPs, FAQs, product docs, and internal data for your team or customers.",
    icon: Database,
    deliverables: ["Faster answers", "Source citations", "Less manual lookup"],
  },
  {
    slug: "ai-automation",
    title: "Automate Manual Workflows",
    keywords: "AI Automation, AI agents, business process automation",
    description:
      "Replace repetitive work in documents, reports, CRM updates, emails, and operations with reliable AI-assisted automation.",
    icon: Workflow,
    deliverables: ["Less manual work", "Faster operations", "Human approvals"],
  },
  {
    slug: "saas-product-development",
    title: "Build SaaS Features Your Users Can Trust",
    keywords: "SaaS development, web app development, MVP development",
    description:
      "Ship practical product features with authentication, dashboards, database design, admin tools, and polished user flows.",
    icon: Code2,
    deliverables: ["User workflows", "Admin controls", "Scalable foundation"],
  },
  {
    slug: "fastapi-backend-development",
    title: "Scalable Backend Systems That Grow With Your Business",
    keywords: "FastAPI Developer, Python Backend Developer, backend API development",
    description:
      "Develop secure APIs, authentication, databases, integrations, and backend infrastructure designed for long-term scale.",
    icon: Server,
    deliverables: ["Secure APIs", "PostgreSQL", "Reliable integrations"],
  },
  {
    slug: "ai-production-deployment",
    title: "Move AI From Demo to Production",
    keywords: "AI deployment, ML pipeline, model monitoring",
    description:
      "Deploy AI systems with containers, evaluation, monitoring, fallback paths, and a setup your business can maintain.",
    icon: Rocket,
    deliverables: ["Deployment path", "Monitoring", "Maintainable setup"],
  },
  {
    slug: "data-dashboards",
    title: "Make Business Data Easier to Act On",
    keywords: "analytics dashboard, business intelligence dashboard, data science consulting",
    description:
      "Turn raw data into dashboards, forecasts, and decision-ready reports that help your team move faster.",
    icon: LineChart,
    deliverables: ["Clear KPIs", "Useful dashboards", "Decision reports"],
  },
]

export type ServicePackage = (typeof servicePackages)[number]

export const serviceLandingDetails: Record<
  string,
  {
    hero: string
    clientQuestion: string
    painPoints: string[]
    outcomes: string[]
    delivery: string[]
    bestFor: string[]
  }
> = {
  "custom-ai-development": {
    hero:
      "Build a focused AI product around the workflow your users already care about, then ship it with backend, database, and deployment included.",
    clientQuestion: "Can this become a real product instead of another AI demo?",
    painPoints: [
      "You have an AI idea but no clear first version.",
      "Your team needs a working product before hiring a full engineering team.",
      "The product needs frontend, backend, AI logic, and deployment handled together.",
    ],
    outcomes: [
      "A usable MVP with the core workflow in place.",
      "A practical architecture that can grow after launch.",
      "Clear tradeoffs around model choice, cost, latency, and data handling.",
    ],
    delivery: ["Product scope", "AI workflow", "Backend APIs", "Database setup", "Deployment path"],
    bestFor: ["Startup MVPs", "AI SaaS features", "Founder-led product experiments"],
  },
  "ai-chatbot-development": {
    hero:
      "Create an AI assistant that answers repeated questions, captures leads, and gives your users faster support without adding more manual work.",
    clientQuestion: "Can a chatbot reduce support load without hurting user trust?",
    painPoints: [
      "Your team answers the same questions every day.",
      "Leads arrive with missing context and need manual qualification.",
      "Your users need support outside your team's working hours.",
    ],
    outcomes: [
      "An assistant trained around your service, product, or support flow.",
      "Lead capture and escalation when human follow-up is needed.",
      "Fallbacks and source-aware answers so the chatbot behaves responsibly.",
    ],
    delivery: ["Chat UI", "Knowledge setup", "Lead capture", "Admin handoff", "Analytics"],
    bestFor: ["Customer support", "Website lead qualification", "Internal help desks"],
  },
  "rag-systems": {
    hero:
      "Turn documents, SOPs, FAQs, and product knowledge into a searchable AI assistant with citations and retrieval quality in mind.",
    clientQuestion: "Can our knowledge base answer questions without people digging through files?",
    painPoints: [
      "Important knowledge is scattered across PDFs, docs, tickets, or spreadsheets.",
      "Team members waste time searching for the right answer.",
      "Customers or staff need answers with source context, not unsupported guesses.",
    ],
    outcomes: [
      "A RAG system that retrieves relevant context before generating answers.",
      "Source citations and fallback behavior for higher confidence.",
      "A maintainable ingestion flow for adding new documents over time.",
    ],
    delivery: ["Document ingestion", "Vector search", "Answer generation", "Source citations", "Quality checks"],
    bestFor: ["Company knowledge bases", "Support docs", "Policy and SOP search"],
  },
  "ai-automation": {
    hero:
      "Replace repetitive operational work with reliable AI-assisted workflows for documents, reporting, CRM updates, and internal processes.",
    clientQuestion: "Which manual workflow can we remove first?",
    painPoints: [
      "Your team repeats the same document, email, or reporting tasks.",
      "Manual handoffs slow down sales, operations, or support.",
      "You need automation with human approval points, not uncontrolled agents.",
    ],
    outcomes: [
      "A clear automation map from trigger to output.",
      "AI-assisted steps for extraction, summarization, classification, or drafting.",
      "Human review where accuracy and business risk matter.",
    ],
    delivery: ["Workflow mapping", "AI steps", "Integrations", "Approval gates", "Run history"],
    bestFor: ["Operations teams", "CRM workflows", "Document-heavy businesses"],
  },
  "saas-product-development": {
    hero:
      "Ship SaaS features with authentication, dashboards, admin controls, and user workflows that feel ready for real customers.",
    clientQuestion: "Can this feature be shipped cleanly without creating future product debt?",
    painPoints: [
      "Your product needs a new feature but the scope is unclear.",
      "User, admin, and backend workflows need to work together.",
      "The first version must be clean enough to maintain after launch.",
    ],
    outcomes: [
      "A focused feature build with the user workflow, backend, and database aligned.",
      "Admin visibility for the parts your team needs to manage.",
      "Deployment and handoff that make iteration easier.",
    ],
    delivery: ["User flows", "Auth", "Dashboards", "Admin tools", "Database design"],
    bestFor: ["SaaS MVPs", "Internal tools", "Founder-led product teams"],
  },
  "fastapi-backend-development": {
    hero:
      "Build secure Python backends, APIs, authentication, databases, and integrations that can support real product usage.",
    clientQuestion: "Will the backend hold up when users and features grow?",
    painPoints: [
      "Your frontend or AI feature needs a reliable API layer.",
      "Database, auth, and integrations are becoming hard to manage.",
      "You need a backend that is understandable after the first launch.",
    ],
    outcomes: [
      "FastAPI services designed around product workflows.",
      "PostgreSQL-backed data models, auth patterns, and clean API boundaries.",
      "A foundation ready for monitoring, deployment, and future features.",
    ],
    delivery: ["FastAPI APIs", "PostgreSQL schema", "Auth", "Integrations", "Deployment"],
    bestFor: ["AI apps", "SaaS backends", "API rebuilds"],
  },
  "ai-production-deployment": {
    hero:
      "Take an AI prototype into production with deployment, monitoring, evaluation, fallback behavior, and maintainable infrastructure.",
    clientQuestion: "Can this AI system be trusted after launch?",
    painPoints: [
      "The prototype works locally but has no reliable deployment path.",
      "Model behavior, latency, cost, and errors are not visible enough.",
      "Your business needs fallback paths when AI confidence is low.",
    ],
    outcomes: [
      "A deployment setup that fits the product and budget.",
      "Evaluation and monitoring paths for AI behavior.",
      "Clear operations guidance for maintaining the system after launch.",
    ],
    delivery: ["Deployment setup", "Monitoring", "Evaluation", "Fallbacks", "Documentation"],
    bestFor: ["AI MVPs", "Model-backed features", "Internal AI tools"],
  },
  "data-dashboards": {
    hero:
      "Turn raw data into dashboards, forecasts, and reports your team can use to make faster business decisions.",
    clientQuestion: "Can our data become something the team actually uses?",
    painPoints: [
      "Data exists but decisions still depend on manual spreadsheets.",
      "Important metrics are hard to track across tools.",
      "Reports take too long to prepare and are difficult to repeat.",
    ],
    outcomes: [
      "Dashboards focused on the decisions your team needs to make.",
      "Cleaner data pipelines and repeatable reporting.",
      "Forecasts or analytics that are easier to explain to stakeholders.",
    ],
    delivery: ["KPI mapping", "Data pipeline", "Dashboard UI", "Forecasting", "Reports"],
    bestFor: ["Founder dashboards", "Operations reporting", "Analytics MVPs"],
  },
}

export function getServicePackageBySlug(slug: string) {
  return servicePackages.find((service) => service.slug === slug)
}

export function getServiceLandingDetail(slug: string) {
  return serviceLandingDetails[slug]
}

export const leadMagnet = {
  title: "Free AI Automation Audit",
  eyebrow: "Lead Magnet",
  description:
    "Share one workflow that takes too much manual effort. I will map where AI can help, what should stay human-reviewed, and what a first useful version could include.",
  bullets: ["One workflow review", "Automation opportunity map", "Suggested first build scope"],
}

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
