import {
    Robot, Cpu, Database, ChartBar, GitBranch, ShieldCheck,
    Lightning, RocketLaunch, Factory, Gauge,
    Briefcase, Buildings, UsersThree,
    MagnifyingGlass, FileCode, Hammer, Package, TrendUp,
    Eye, Binary, Pulse, Lock, Boat,
    Compass, BookOpenText, GearSix,
    ChartLineUp, Headset, SquaresFour, ShieldWarning,
} from '@phosphor-icons/react';
import type React from 'react';

// Phosphor icon component type (replaces LucideIcon)
type PhosphorIcon = React.ComponentType<any>;

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
    icon: PhosphorIcon;
    tags: string[];
}

export const SERVICES: Service[] = [
    {
        title: 'Agentic AI Systems',
        description: 'End-to-end multi-agent architectures: planning, tool use, memory, guardrails. From prototype to production-grade deployment.',
        icon: Robot,
        tags: ['LangGraph', 'AutoGen', 'CrewAI', 'Tool Use'],
    },
    {
        title: 'LLM Integration & API Engineering',
        description: 'Connect LLMs to your product via clean APIs. Structured outputs, function calling, streaming, retry logic, and cost controls.',
        icon: Cpu,
        tags: ['OpenAI', 'Anthropic', 'Azure', 'REST, gRPC'],
    },
    {
        title: 'RAG and Knowledge Systems',
        description: 'Retrieval-augmented generation pipelines. From basic RAG to hybrid search to GraphRAG. Chunk, embed, retrieve, evaluate.',
        icon: Database,
        tags: ['ChromaDB', 'Pinecone', 'Neo4j', 'Hybrid Search'],
    },
    {
        title: 'LLM Evaluation & LLMOps',
        description: 'Galileo-grade evaluation: hallucination detection, drift monitoring, regression testing. Ship LLMs you can trust.',
        icon: ChartBar,
        tags: ['Galileo', 'RAGAS', 'LangSmith', 'Eval Pipelines'],
    },
    {
        title: 'Data Pipelines & Intelligence Feeds',
        description: 'Ingest, transform, and serve data at scale. ETL and ELT pipelines, real-time feeds, and structured intelligence outputs.',
        icon: GitBranch,
        tags: ['Airflow', 'Redis', 'PostgreSQL', 'Streaming'],
    },
    {
        title: 'Production Hardening',
        description: 'Make it reliable: observability, cost controls, circuit breakers, caching, logging, and monitoring for AI systems in production.',
        icon: ShieldCheck,
        tags: ['Monitoring', 'Cost Control', 'Logging', 'Reliability'],
    },
];

// ── Core Offers ──────────────────────────────

export interface CoreOffer {
    name: string;
    subtitle: string;
    badge?: string;
    description: string;
    deliverables: string[];
    timeline: string;
    idealFor?: string[];
    useCases?: string[];
    icon: PhosphorIcon;
    featured?: boolean;
    signature?: boolean;
}

export const CORE_OFFERS: CoreOffer[] = [
    {
        name: 'AI System Audit + Blueprint',
        subtitle: 'Best first step',
        badge: 'Recommended',
        description: 'A concrete plan to ship safely and fast. I review your current stack, map the risks, model the costs, and hand you a build roadmap from MVP to scale.',
        deliverables: [
            'Architecture review (current stack, bottlenecks, what breaks at scale)',
            'Threat model (prompt injection, data leakage, tool misuse)',
            'Cost and latency budget + performance plan',
            'Build roadmap (MVP to v1 to scale)',
        ],
        timeline: '3-5 days',
        idealFor: [
            'Teams who already started building and feel "it works... but not reliably"',
            'Founders who need investor-grade technical direction',
        ],
        icon: Compass,
        featured: true,
    },
    {
        name: 'RAG / Knowledge Copilot Launch Kit',
        subtitle: 'Docs to answers, with citations and control',
        description: 'Turn your internal docs and data into a grounded assistant that cites its sources and stays within bounds.',
        deliverables: [
            'Ingestion pipeline (docs to chunking to embeddings to storage)',
            'Retrieval tuning (filters, rerank, hybrid search)',
            'Grounded responses with citations and structured outputs',
            'Evaluation set + regression tests so quality does not drift',
        ],
        timeline: '7-14 days',
        useCases: [
            'Internal knowledge assistant',
            'Support copilot',
            'Policy / SOP assistant',
            'Research assistant',
        ],
        icon: BookOpenText,
    },
    {
        name: 'Agent Automation Sprint',
        subtitle: 'Workflow to autonomous execution',
        description: 'Replace manual ops work with a tool-using agent that actually stays on track. State machine architecture, least-privilege tool access, human-in-the-loop where it matters.',
        deliverables: [
            'Agent workflow (LangGraph-style state machine or orchestrated pipeline)',
            'Tool layer (DB, API, browser, external services) with least privilege',
            'Human-in-the-loop approvals + fallback paths',
            'Observability: runs, failures, retries, cost tracking',
        ],
        timeline: '2-3 weeks',
        useCases: [
            'Ticket triage + response drafting',
            'Onboarding automation',
            'Report generation',
            'Compliance workflows',
        ],
        icon: GearSix,
    },
    {
        name: 'LLM Evaluation + Benchmark Harness',
        subtitle: 'Quality control for AI',
        description: 'Stop guessing which model or prompt is "better". Get a benchmark suite, automated grading, regression gates, and a leaderboard that compares quality vs cost vs latency.',
        deliverables: [
            'Benchmark suite (test cases + gold references)',
            'Automatic grading + manual review hooks',
            'Prompt and model regression gates (CI-friendly)',
            'Leaderboard: quality vs cost vs latency',
        ],
        timeline: '7-12 days',
        idealFor: [
            'Teams shipping LLM features who need stable quality over time',
            'Orgs evaluating multiple models or providers',
        ],
        icon: Gauge,
    },
    {
        name: 'Forecasting / Signal Intelligence MVP',
        subtitle: 'Ingest, reason, forecast',
        badge: 'Signature Offer',
        description: 'Ingest real-world signals, cluster and summarize them, then produce explainable forecasts with confidence scores and narrative reasoning.',
        deliverables: [
            'Signal ingestion (news, RSS, APIs) + dedup + clustering',
            'Summaries + entity extraction + structured storage',
            'Forecast pipeline (scenarios, confidence, "why" narrative)',
            'Dashboard view (latest signals, hotspots, forecast history)',
        ],
        timeline: '3-5 weeks (varies by scope)',
        useCases: [
            'Risk intelligence',
            'Geopolitical monitoring',
            'Market monitoring',
            'Operational risk alerts',
        ],
        icon: ChartLineUp,
        signature: true,
    },
];

// ── Add-ons ──────────────────────────────────

export interface AddOn {
    title: string;
    description: string;
    bullets: string[];
    icon: PhosphorIcon;
}

export const ADD_ONS: AddOn[] = [
    {
        title: 'Production Hardening (LLMOps)',
        description: 'Make it run at 3 AM without you.',
        bullets: ['Tracing and metrics', 'Budget controls and caching', 'Rate limits, retries, fallbacks'],
        icon: Factory,
    },
    {
        title: 'Security and Governance',
        description: 'Not an afterthought. Built in from day one.',
        bullets: ['Prompt injection defenses', 'Tool sandboxing and audit logs', 'Data handling policies'],
        icon: ShieldWarning,
    },
    {
        title: 'Multimodal Capabilities',
        description: 'When voice, vision, or mixed media adds real value.',
        bullets: ['Voice agents (STT/TTS)', 'Image embeddings and search', 'Multimodal RAG'],
        icon: Headset,
    },
    {
        title: 'Dashboards and Control Centers',
        description: 'See what your agents are doing, what they cost, and whether they are improving.',
        bullets: ['Agent runs and cost tracking', 'Evaluation results', 'Approval workflows'],
        icon: SquaresFour,
    },
];

// ── Engagement Models ────────────────────────

export interface EngagementModel {
    title: string;
    description: string;
    details: string[];
    icon: PhosphorIcon;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
    {
        title: 'Contract or Freelance',
        description: 'B2B contract work. Scoped sprints, clear deliverables, weekly syncs. Ideal for teams that need senior AI engineering without a full-time hire.',
        details: ['Fixed-scope or time-and-materials', 'Weekly progress reports', 'NDA + IP assignment available', 'Remote-first, async-friendly'],
        icon: Briefcase,
    },
    {
        title: 'Employment',
        description: 'Open for high-impact product roles where I can own the AI stack end-to-end. Looking for teams that ship, not committees.',
        details: ['Senior or Staff AI Engineer', 'AI Architect or Tech Lead', 'Product-focused teams preferred', 'Hybrid or remote'],
        icon: Buildings,
    },
    {
        title: 'Collaborations & Partnerships',
        description: 'Co-build projects, contribute to open-source, or launch joint ventures. If you\'re building something ambitious in AI, let\'s talk.',
        details: ['Open-source contributions', 'Joint product launches', 'Research collaborations', 'Content & speaking'],
        icon: UsersThree,
    },
];

// ── Process Steps ────────────────────────────

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    icon: PhosphorIcon;
}

export const PROCESS_STEPS: ProcessStep[] = [
    { number: '01', title: 'Discovery', description: '30-45 min call. I learn your goal, constraints, and data reality.', icon: MagnifyingGlass },
    { number: '02', title: 'Blueprint', description: 'Scope, success metrics, architecture, and risks. You know exactly what you are getting.', icon: FileCode },
    { number: '03', title: 'Build Sprint', description: 'Deliver working software + tests + observability. Weekly demos, not slide decks.', icon: Hammer },
    { number: '04', title: 'Handoff', description: 'Docs, runbooks, and a next-step roadmap. You own everything.', icon: Package },
];

// ── Principles ───────────────────────────────

export interface Principle {
    title: string;
    description: string;
    icon: PhosphorIcon;
}

export const PRINCIPLES: Principle[] = [
    { title: 'Truth-First', description: 'Evidence over authority. Every claim backed by data, every decision logged.', icon: Eye },
    { title: 'Determinism', description: 'Schemas, validation, reproducibility. Same input, same output, every time.', icon: Binary },
    { title: 'Production Reality', description: 'Logs, monitoring, cost controls. If it can\'t run at 3 AM without you, it\'s not done.', icon: Pulse },
    { title: 'Security by Default', description: 'Input validation, output sanitization, least-privilege access. Not an afterthought.', icon: Lock },
    { title: 'Ship Culture', description: 'Working software over perfect plans. Ship, measure, iterate.', icon: Boat },
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
        answer: 'Scope changes happen. I work in sprints specifically so we can re-prioritize at sprint boundaries. No rigid waterfall. We adapt together.',
    },
];
