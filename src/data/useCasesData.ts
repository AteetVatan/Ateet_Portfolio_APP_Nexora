import {
    Headset, Megaphone, Users, Receipt, Scales,
    FirstAidKit, Wrench, Truck, ShieldCheck,
    GitBranch, Article, Binoculars,
} from '@phosphor-icons/react';
import type React from 'react';

type PhosphorIcon = React.ComponentType<any>;

/* ═══════════════════════════════════════════
   SOLUTION BLUEPRINTS — Use Cases by Domain
   ═══════════════════════════════════════════ */

// ── Types ────────────────────────────────────

export interface ProvenBlock {
    label: string;
    link: string; // relative link to project or anchor
}

export interface UseCase {
    id: string;
    domain: string;
    title: string;
    subtitle: string;
    problem: string;
    aiApproach: string;
    impact: string;
    timeToMvp: string;
    costDrivers: string;
    extraNote?: string;
    icon: PhosphorIcon;
    provenBlocks: ProvenBlock[];
}

export interface PowerScenario {
    title: string;
    before: string;
    after: string;
    unlocks: string;
    builtWith: string;
}

// ── Domain Filters ───────────────────────────

export const DOMAIN_FILTERS: string[] = [
    'All',
    'Support',
    'Sales',
    'HR',
    'Finance',
    'Legal',
    'Healthcare',
    'Manufacturing',
    'Logistics',
    'Cybersecurity',
    'Engineering',
    'Content',
    'Strategy',
];

// ── Use Cases ────────────────────────────────

export const USE_CASES: UseCase[] = [
    {
        id: 'support-copilot',
        domain: 'Support',
        title: 'Ticket Triage + Resolution Copilot',
        subtitle: 'Reads tickets, finds the right KB answer, drafts responses, routes to the correct team',
        problem: 'Support teams drown in repetitive tickets. Response times spike. Answers vary wildly depending on who picks up the ticket.',
        aiApproach: 'RAG over your knowledge base, combined with ticket classification, confidence-scored response drafting, and smart routing logic.',
        impact: 'Faster first response, fewer escalations, more consistent answers across your entire support team',
        timeToMvp: '7-14 days',
        costDrivers: 'Ticket volume, KB size, language count',
        extraNote: 'Add an evaluation harness so quality does not drift week-to-week',
        icon: Headset,
        provenBlocks: [
            { label: 'RAG pipeline', link: '/projects/echo-ai' },
            { label: 'Classification + scoring', link: '/projects/galileo-arena' },
            { label: 'Structured outputs', link: '/projects/med-ai' },
        ],
    },
    {
        id: 'ai-sdr',
        domain: 'Sales',
        title: 'AI SDR + Lead Research Briefs',
        subtitle: 'Turns a lead or company URL into a tight brief with personalized outreach angles',
        problem: 'Sales reps spend hours manually researching leads and writing generic outreach. Pipeline moves slowly because prep eats into selling time.',
        aiApproach: 'Web enrichment and summarization pipelines, template-driven personalization, CRM-ready structured output.',
        impact: 'Reps reclaim hours each day, reply rates improve, pipeline velocity increases',
        timeToMvp: '7-10 days',
        costDrivers: 'Number of leads per day, enrichment depth',
        icon: Megaphone,
        provenBlocks: [
            { label: 'Web enrichment + feeds', link: '/projects/masx-hotspots' },
            { label: 'Summarization pipelines', link: '/projects/masx-hotspots' },
            { label: 'Structured extraction', link: '/projects/med-ai' },
        ],
    },
    {
        id: 'cv-screening',
        domain: 'HR',
        title: 'CV Screening + Structured Shortlists',
        subtitle: 'Extracts skills, matches to job descriptions, creates structured shortlists with interview questions',
        problem: 'Recruiters spend 70% of their time on initial screening. Evaluation criteria shift between reviewers. Good candidates get lost in the pile.',
        aiApproach: 'Structured extraction with scoring rubrics, human review flow, bias-awareness logging, and audit trails.',
        impact: 'Dramatically faster screening, more consistent evaluation, auditable decisions',
        timeToMvp: '10-14 days',
        costDrivers: 'Applications per day, rubric complexity',
        extraNote: 'Includes fairness checks and audit logs as a trust and compliance signal',
        icon: Users,
        provenBlocks: [
            { label: 'Structured extraction', link: '/projects/med-ai' },
            { label: 'Scoring rubrics', link: '/projects/galileo-arena' },
            { label: 'Audit trail', link: '/projects/galileo-arena' },
        ],
    },
    {
        id: 'invoice-processing',
        domain: 'Finance',
        title: 'Invoice Processing + Anomaly Detection',
        subtitle: 'Reads invoices, checks PO matches, flags anomalies, prepares approval packets',
        problem: 'Finance teams manually match invoices to POs. Anomalies slip through. Approvals bottleneck at month-end.',
        aiApproach: 'Document parsing combined with rules-based checks, LLM reasoning on exceptions, and a full audit trail.',
        impact: 'Fewer payment errors, faster approvals, lower operational cost',
        timeToMvp: '2-3 weeks',
        costDrivers: 'Document volume, extraction quality needs, integrations',
        icon: Receipt,
        provenBlocks: [
            { label: 'Document parsing', link: '/projects/med-ai' },
            { label: 'Rules + LLM reasoning', link: '/projects/galileo-arena' },
            { label: 'Structured outputs', link: '/projects/med-ai' },
        ],
    },
    {
        id: 'contract-scanner',
        domain: 'Legal',
        title: 'Contract Clause Risk Scanner',
        subtitle: 'Identifies risky or missing clauses, produces redline summaries with citations',
        problem: 'Legal teams review contracts manually. Risky clauses get missed under time pressure. Standards drift across reviewers.',
        aiApproach: 'RAG over your clause library, structured findings with evidence references, consistent review standards.',
        impact: 'Faster review cycles, reduced legal risk, consistent standards across the team',
        timeToMvp: '2-3 weeks',
        costDrivers: 'Contract size, security requirements, review workflow',
        icon: Scales,
        provenBlocks: [
            { label: 'RAG + citations', link: '/projects/echo-ai' },
            { label: 'Structured findings', link: '/projects/galileo-arena' },
            { label: 'Evidence references', link: '/projects/galileo-arena' },
        ],
    },
    {
        id: 'clinical-notes',
        domain: 'Healthcare',
        title: 'Clinical Notes Summarizer + Intake Automation',
        subtitle: 'Turns patient notes into structured summaries with action items',
        problem: 'Clinicians spend too much time on documentation. Notes are inconsistent. Action items get buried in free text.',
        aiApproach: 'Structured extraction with medical NER, template-driven summarization, strict guardrails for clinical content.',
        impact: 'Clinician time saved, better documentation quality, reliable action item tracking',
        timeToMvp: '2-4 weeks',
        costDrivers: 'Compliance and security requirements, languages, note volume',
        extraNote: 'Privacy-first architecture with no sensitive data retention in the AI layer',
        icon: FirstAidKit,
        provenBlocks: [
            { label: 'medAI (direct project)', link: '/projects/med-ai' },
            { label: 'STT + NER pipeline', link: '/projects/med-ai' },
            { label: 'Structured summarization', link: '/projects/med-ai' },
        ],
    },
    {
        id: 'maintenance-copilot',
        domain: 'Manufacturing',
        title: 'Maintenance Copilot (Root Cause + Fix Suggestions)',
        subtitle: 'Reads machine logs and incidents, suggests probable causes and resolution steps',
        problem: 'Maintenance teams depend on tribal knowledge. Experienced engineers leave and take that knowledge with them. Resolution time spikes.',
        aiApproach: 'RAG over manuals and incident history, structured troubleshooting trees, pattern matching on past resolutions.',
        impact: 'Reduced downtime, faster resolution, better knowledge retention across the team',
        timeToMvp: '3-5 weeks',
        costDrivers: 'Data quality, integration with telemetry systems, false-positive tolerance',
        icon: Wrench,
        provenBlocks: [
            { label: 'RAG over docs', link: '/projects/echo-ai' },
            { label: 'Structured reasoning', link: '/projects/galileo-arena' },
            { label: 'Knowledge retrieval', link: '/projects/echo-ai' },
        ],
    },
    {
        id: 'delay-prediction',
        domain: 'Logistics',
        title: 'Delay Prediction + Proactive Customer Alerts',
        subtitle: 'Detects risk signals, predicts delays, triggers proactive alerts before customers notice',
        problem: 'Delays surprise everyone. Customer trust erodes. Operations teams spend their days firefighting instead of preventing.',
        aiApproach: 'Signal ingestion from multiple feeds, clustering and pattern detection, forecasting models, automated alert workflows.',
        impact: 'Fewer SLA breaches, better customer trust, operations shift from reactive to proactive',
        timeToMvp: '3-6 weeks',
        costDrivers: 'Feed volume, forecasting accuracy targets',
        icon: Truck,
        provenBlocks: [
            { label: 'Signal ingestion', link: '/projects/masx-hotspots' },
            { label: 'Clustering + detection', link: '/projects/masx-hotspots' },
            { label: 'Alert workflows', link: '/projects/masx-hotspots' },
        ],
    },
    {
        id: 'soc-copilot',
        domain: 'Cybersecurity',
        title: 'SOC Copilot (Triage + Investigation Summaries)',
        subtitle: 'Summarizes alerts, correlates evidence, produces investigation notes for analysts',
        problem: 'Security analysts are overwhelmed by alert volume. Triage is inconsistent. Investigation context gets lost between shifts.',
        aiApproach: 'Tool-using agent with structured incident reports, safe tool boundaries, human approval gates for any destructive action.',
        impact: 'Faster triage, better analyst throughput, fewer missed signals',
        timeToMvp: '2-4 weeks',
        costDrivers: 'Alert volume, log access patterns',
        extraNote: 'No autonomous destructive actions. Human approval required for all remediation steps.',
        icon: ShieldCheck,
        provenBlocks: [
            { label: 'Agent + tool use', link: '/projects/galileo-arena' },
            { label: 'Structured reports', link: '/projects/galileo-arena' },
            { label: 'Human-in-the-loop', link: '/projects/galileo-arena' },
        ],
    },
    {
        id: 'release-notes',
        domain: 'Engineering',
        title: 'AI Release Notes + Incident Postmortems',
        subtitle: 'Turns PRs and issues into release notes, turns logs into postmortem drafts',
        problem: 'Release notes are an afterthought. Postmortems take days to write. Institutional knowledge about incidents evaporates.',
        aiApproach: 'Structured extraction from repos and logs, RAG on runbooks, template-driven output generation.',
        impact: 'Faster communications, better ops discipline, reduced overhead for engineering teams',
        timeToMvp: '1-2 weeks',
        costDrivers: 'Repo size, trace and log volume',
        icon: GitBranch,
        provenBlocks: [
            { label: 'Structured extraction', link: '/projects/med-ai' },
            { label: 'Template-driven output', link: '/projects/med-ai' },
            { label: 'RAG on docs', link: '/projects/echo-ai' },
        ],
    },
    {
        id: 'content-pipeline',
        domain: 'Content',
        title: 'Publish Pipeline (Summarize, Verify, Post)',
        subtitle: 'Cleans raw articles, validates claims, generates publish-ready content',
        problem: 'Content teams juggle accuracy with speed. Fact-checking is manual and inconsistent. Publishing bottlenecks slow momentum.',
        aiApproach: 'Extraction and summarization, claim verification, image and link validation, consistent voice enforcement.',
        impact: 'Faster content production, better accuracy, consistent brand voice across all outputs',
        timeToMvp: '2-4 weeks',
        costDrivers: 'Article volume, verification depth',
        icon: Article,
        provenBlocks: [
            { label: 'Summarization', link: '/projects/masx-hotspots' },
            { label: 'Verification logic', link: '/projects/galileo-arena' },
            { label: 'Feed processing', link: '/projects/masx-hotspots' },
        ],
    },
    {
        id: 'early-warning',
        domain: 'Strategy',
        title: 'Early Warning System for Risk + Opportunities',
        subtitle: 'Ingests global signals, detects emerging themes, outputs scenarios with confidence scores',
        problem: 'Leadership gets too much information and not enough clarity. Threats emerge slowly then hit fast. Decisions lag behind reality.',
        aiApproach: 'Multi-source signal ingestion, automated clustering, doctrine-based scenario reasoning, explainable confidence scoring.',
        impact: 'Faster decision cycles, fewer blindspots, higher strategic clarity for leadership teams',
        timeToMvp: '4-8 weeks',
        costDrivers: 'Ingestion scale, evaluation and grounding requirements',
        icon: Binoculars,
        provenBlocks: [
            { label: 'MASX-Hotspots (direct project)', link: '/projects/masx-hotspots' },
            { label: 'Signal clustering', link: '/projects/masx-hotspots' },
            { label: 'Scenario forecasting', link: '/projects/masx-hotspots' },
        ],
    },
];

// ── Power Scenarios ──────────────────────────

export const POWER_SCENARIOS: PowerScenario[] = [
    {
        title: 'From chaos tickets to predictable ops',
        before: 'Inconsistent answers, long response times, constant escalation',
        after: 'Auto-triage routes tickets, grounded drafts cite your knowledge base, escalation logic handles edge cases',
        unlocks: 'Your support team focuses on complex cases while routine queries resolve themselves',
        builtWith: 'RAG (EchoAI) + Quality Scoring (Galileo Arena)',
    },
    {
        title: 'Sales teams stop wasting time on research',
        before: 'Manual lead research, generic outreach, low reply rates',
        after: 'AI briefs with personalized angles, CRM-ready notes, enriched company profiles',
        unlocks: 'More meetings booked with less admin work, reps sell instead of researching',
        builtWith: 'Web Enrichment (MASX-Hotspots) + Structured Extraction (medAI)',
    },
    {
        title: 'Leadership gets a daily intelligence brief that actually explains itself',
        before: 'Too much information, no clarity, decisions lag behind events',
        after: 'Signal clustering with scenario forecasts, confidence scores, and evidence links',
        unlocks: 'Faster decisions with fewer blindspots, grounded in real signals not gut feel',
        builtWith: 'Signal Intelligence (MASX-Hotspots) + Evaluation (Galileo Arena)',
    },
];
