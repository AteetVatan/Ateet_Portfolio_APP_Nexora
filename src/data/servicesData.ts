import {
    Bot, Cpu, Database, BarChart3, Workflow, Shield,
    Zap, Rocket, Factory, Gauge,
    Briefcase, Building2, Users,
    Search, FileCode, Hammer, Package, TrendingUp,
    Eye, Binary, Activity, Lock, Ship,
    type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   SERVICES PAGE — Typed Data Arrays
   ═══════════════════════════════════════════ */

// ── Proof Links ──────────────────────────────

export interface ProofLink {
    label: string;
    url: string;
    external: boolean;
}

export const PROOF_LINKS: ProofLink[] = [
    { label: 'Galileo Demo', url: 'https://galileo.masxai.com/', external: true },
    { label: 'AI Clone', url: 'https://ateetclone.masxai.com/', external: true },
    { label: 'GitHub', url: 'https://github.com/AteetVatan', external: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ateet-vatan-bahmani/', external: true },
    { label: 'Email', url: 'mailto:ab@masxai.com', external: false },
    { label: 'Portfolio', url: 'https://ateetai.vercel.app/', external: true },
];

export const CONTACT_EMAIL = 'ab@masxai.com';

// ── Services ─────────────────────────────────

export interface Service {
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
}

export const SERVICES: Service[] = [
    {
        title: 'Agentic AI Systems',
        description: 'End-to-end multi-agent architectures: planning, tool use, memory, guardrails. From prototype to production-grade deployment.',
        icon: Bot,
        tags: ['LangGraph', 'AutoGen', 'CrewAI', 'Tool Use'],
    },
    {
        title: 'LLM Integration & API Engineering',
        description: 'Connect LLMs to your product via clean APIs. Structured outputs, function calling, streaming, retry logic, and cost controls.',
        icon: Cpu,
        tags: ['OpenAI', 'Anthropic', 'Azure', 'REST/gRPC'],
    },
    {
        title: 'RAG / Knowledge Systems',
        description: 'Retrieval-augmented generation pipelines — from basic RAG to hybrid search to GraphRAG. Chunk, embed, retrieve, evaluate.',
        icon: Database,
        tags: ['ChromaDB', 'Pinecone', 'Neo4j', 'Hybrid Search'],
    },
    {
        title: 'LLM Evaluation & LLMOps',
        description: 'Galileo-grade evaluation: hallucination detection, drift monitoring, regression testing. Ship LLMs you can trust.',
        icon: BarChart3,
        tags: ['Galileo', 'RAGAS', 'LangSmith', 'Eval Pipelines'],
    },
    {
        title: 'Data Pipelines & Intelligence Feeds',
        description: 'Ingest, transform, and serve data at scale. ETL/ELT pipelines, real-time feeds, and structured intelligence outputs.',
        icon: Workflow,
        tags: ['Airflow', 'Redis', 'PostgreSQL', 'Streaming'],
    },
    {
        title: 'Production Hardening',
        description: 'Make it reliable: observability, cost controls, circuit breakers, caching, logging, and monitoring for AI systems in production.',
        icon: Shield,
        tags: ['Monitoring', 'Cost Control', 'Logging', 'Reliability'],
    },
];

// ── Packages ─────────────────────────────────

export interface ServicePackage {
    name: string;
    subtitle: string;
    description: string;
    deliverables: string[];
    timeline: string;
    icon: LucideIcon;
}

export const PACKAGES: ServicePackage[] = [
    {
        name: 'Sprint 0',
        subtitle: 'AI System Blueprint',
        description: 'Understand your problem space, define the right AI approach — whether that\'s agents, RAG, fine-tuning, or classic ML — and create a clear execution plan.',
        deliverables: [
            'Problem definition & feasibility analysis',
            'Architecture diagram + tech stack recommendation',
            'Cost model & risk assessment',
            'Sprint plan for MVP',
        ],
        timeline: '1–2 weeks',
        icon: Zap,
    },
    {
        name: 'Sprint 1',
        subtitle: 'AI MVP — Ship Something Real',
        description: 'Build a working AI system that solves a real problem. Not a demo — a deployable MVP with structured outputs, basic guardrails, and measurable results.',
        deliverables: [
            'Working AI system (agents, RAG, LLM pipeline, or hybrid)',
            'API endpoints + structured outputs',
            'Basic evaluation suite',
            'Deployment to staging',
        ],
        timeline: '2–4 weeks',
        icon: Rocket,
    },
    {
        name: 'Sprint 2',
        subtitle: 'Productionization',
        description: 'Harden the MVP for production: reliability, monitoring, cost optimization, security review, and handoff documentation.',
        deliverables: [
            'Production deployment + CI/CD',
            'Monitoring & alerting setup',
            'Cost optimization pass',
            'Documentation + team handoff',
        ],
        timeline: '2–4 weeks',
        icon: Factory,
    },
    {
        name: 'Evaluation Setup',
        subtitle: 'LLM Evaluation & Quality System',
        description: 'Stand up a complete evaluation pipeline for any LLM-powered system: golden datasets, automated scoring, regression tests, and quality monitoring.',
        deliverables: [
            'Evaluation pipeline with golden datasets',
            'Hallucination & quality metrics',
            'Regression test suite',
            'Dashboard + alerting',
        ],
        timeline: '1–3 weeks',
        icon: Gauge,
    },
];

// ── Engagement Models ────────────────────────

export interface EngagementModel {
    title: string;
    description: string;
    details: string[];
    icon: LucideIcon;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
    {
        title: 'Contract / Freelance',
        description: 'B2B contract work. Scoped sprints, clear deliverables, weekly syncs. Ideal for teams that need senior AI engineering without a full-time hire.',
        details: ['Fixed-scope or time-and-materials', 'Weekly progress reports', 'NDA + IP assignment available', 'Remote-first, async-friendly'],
        icon: Briefcase,
    },
    {
        title: 'Employment',
        description: 'Open for high-impact product roles where I can own the AI stack end-to-end. Looking for teams that ship, not committees.',
        details: ['Senior / Staff AI Engineer', 'AI Architect / Tech Lead', 'Product-focused teams preferred', 'Hybrid or remote'],
        icon: Building2,
    },
    {
        title: 'Collaborations & Partnerships',
        description: 'Co-build projects, contribute to open-source, or launch joint ventures. If you\'re building something ambitious in AI, let\'s talk.',
        details: ['Open-source contributions', 'Joint product launches', 'Research collaborations', 'Content & speaking'],
        icon: Users,
    },
];

// ── Process Steps ────────────────────────────

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const PROCESS_STEPS: ProcessStep[] = [
    { number: '01', title: 'Discovery', description: '30-min call. Understand your problem, constraints, and goals.', icon: Search },
    { number: '02', title: 'Spec + Architecture', description: 'Technical spec, architecture diagram, cost model, and sprint plan.', icon: FileCode },
    { number: '03', title: 'Build + Ship', description: 'Iterative sprints with weekly demos. Working software, not slide decks.', icon: Hammer },
    { number: '04', title: 'Handoff', description: 'Documentation, team training, and clean code transfer. You own everything.', icon: Package },
    { number: '05', title: 'Scale', description: 'Optional ongoing support: monitoring, optimization, and feature expansion.', icon: TrendingUp },
];

// ── Principles ───────────────────────────────

export interface Principle {
    title: string;
    description: string;
    icon: LucideIcon;
}

export const PRINCIPLES: Principle[] = [
    { title: 'Truth-First', description: 'Evidence over authority. Every claim backed by data, every decision logged.', icon: Eye },
    { title: 'Determinism', description: 'Schemas, validation, reproducibility. Same input → same output, every time.', icon: Binary },
    { title: 'Production Reality', description: 'Logs, monitoring, cost controls. If it can\'t run at 3 AM without you, it\'s not done.', icon: Activity },
    { title: 'Security by Default', description: 'Input validation, output sanitization, least-privilege access. Not an afterthought.', icon: Lock },
    { title: 'Ship Culture', description: 'Working software over perfect plans. Ship, measure, iterate.', icon: Ship },
];

// ── Fit ──────────────────────────────────────

export const FIT_BULLETS: string[] = [
    'Startups building AI-first products that need to ship fast and iterate',
    'Scale-ups adding AI capabilities to existing platforms',
    'Enterprise teams evaluating or hardening LLM systems for production',
    'Founders who want a technical co-pilot for their AI strategy',
    'Teams stuck in "AI demo mode" who need to cross the production gap',
    'Open-source projects at the intersection of AI and developer tooling',
];

// ── FAQ ──────────────────────────────────────

export interface FaqItem {
    question: string;
    answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'Do you sign NDAs?',
        answer: 'Yes. I sign mutual NDAs before any discovery call where proprietary information is shared. Happy to use your template or mine.',
    },
    {
        question: 'Who owns the IP?',
        answer: 'You do. All code, documentation, and deliverables are fully assigned to you upon completion. I retain no rights to client work.',
    },
    {
        question: 'What\'s your tech stack?',
        answer: 'Python-first: LangChain, LangGraph, AutoGen, FastAPI, PostgreSQL, Redis, ChromaDB, Docker. Frontend when needed: React, TypeScript, Next.js. Cloud: AWS, GCP, Vercel, Railway.',
    },
    {
        question: 'Can you work with our existing codebase?',
        answer: 'Absolutely. I regularly integrate into existing repos, CI/CD pipelines, and team workflows. I follow your coding standards and conventions.',
    },
    {
        question: 'How fast can you start?',
        answer: 'Typically within 1–2 weeks of agreement. Discovery calls can be scheduled within days. If urgency is a factor, let me know upfront.',
    },
    {
        question: 'What if the project scope changes?',
        answer: 'Scope changes happen. I work in sprints specifically so we can re-prioritize at sprint boundaries. No rigid waterfall — we adapt together.',
    },
];
