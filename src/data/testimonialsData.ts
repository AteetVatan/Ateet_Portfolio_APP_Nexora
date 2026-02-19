/* ═══════════════════════════════════════════
   TESTIMONIALS & SOCIAL PROOF DATA
   ═══════════════════════════════════════════ */

import type React from 'react';
import { Buildings, Brain, MagnifyingGlass, Lightning } from '@phosphor-icons/react';

// Phosphor icon component type
type PhosphorIcon = React.ComponentType<any>;

// ── Soft Testimonials (Micro-Proof Cards) ────

export type TestimonialTheme = 'enterprise' | 'ai-systems' | 'quality' | 'strategy';

export interface SoftTestimonial {
    text: string;
    attribution?: string;
    theme: TestimonialTheme;
}

export const THEME_META: Record<TestimonialTheme, { label: string; icon: PhosphorIcon }> = {
    enterprise: { label: 'Enterprise Delivery', icon: Buildings },
    'ai-systems': { label: 'AI Systems Engineering', icon: Brain },
    quality: { label: 'Quality & Governance', icon: MagnifyingGlass },
    strategy: { label: 'Strategic Architecture', icon: Lightning },
};

export const SOFT_TESTIMONIALS: SoftTestimonial[] = [
    // ── Enterprise Delivery ──
    {
        text: 'Enterprise-grade shipper -- migrated 10+ legacy apps to AWS + Angular and delivered 40% lower latency + 60% faster deployment cycles.',
        attribution: 'Ateet',
        theme: 'enterprise',
    },
    {
        text: 'CI/CD obsessed -- built automated pipelines (GitLab, Docker, Azure DevOps) that cut deployment errors and shortened release timelines 60%+.',
        attribution: 'Ateet',
        theme: 'enterprise',
    },
    {
        text: 'Global stakeholder-ready -- delivered platform migrations while aligning teams across 3 continents and leading a 5+ engineer delivery squad.',
        attribution: 'Ateet',
        theme: 'enterprise',
    },
    {
        text: 'Real enterprise exposure -- built analytics platforms serving 20+ global automotive clients across 7 continents (via IHS Markit).',
        attribution: 'Ateet',
        theme: 'enterprise',
    },
    {
        text: "GIS SDK builder -- contributed to Pitney Bowes' MapInfo MapXtreme, building reusable geospatial components and enterprise mapping tools for large-scale GIS systems used worldwide.",
        attribution: 'Ateet',
        theme: 'enterprise',
    },

    // ── AI Systems Engineering ──
    {
        text: 'Healthcare-speed AI -- medAI targets STT partials ≤ 300ms, with strict p95 budgets for summarization + translation.',
        theme: 'ai-systems',
    },
    {
        text: 'Clinical pipeline builder -- real-time clinical intake + documentation flow: STT to medical NER to LLM summarization to translation to report generation.',
        theme: 'ai-systems',
    },
    {
        text: 'Voice + RAG in real time -- EchoAI runs WebSocket audio streaming, local Faster-Whisper with OpenAI fallback, plus RAG memory retrieval.',
        theme: 'ai-systems',
    },
    {
        text: "Built for deterministic output -- \"temperature = 0.0 everywhere\" isn't a slogan. It's enforced in production-grade pipelines.",
        theme: 'ai-systems',
    },

    // ── Quality & Governance ──
    {
        text: 'Quality-control mentality -- built a full LLM evaluation harness with adversarial debate + deterministic scoring.',
        theme: 'quality',
    },
    {
        text: 'Multi-agent evaluation system -- Galileo Arena runs Orthodox, Heretic, Skeptic, Judge, streaming results live via SSE.',
        theme: 'quality',
    },
    {
        text: 'Audit-trail by default -- Galileo Arena stores runs with Postgres persistence for replay + traceability.',
        theme: 'quality',
    },

    // ── Strategic Architecture ──
    {
        text: 'Strategic intelligence builder -- MASX-HOTSPOTS is designed for 24/7 flashpoint detection + multilingual feed generation, combining Google RSS + GDELT.',
        theme: 'strategy',
    },
    {
        text: 'Multilingual scale thinking -- MASX-HOTSPOTS expands queries across 50+ languages via translation pipelines.',
        theme: 'strategy',
    },
    {
        text: 'Systems > demos -- projects ship with Docker, structured contracts, guardrails, and "failure-mode-first" engineering.',
        theme: 'strategy',
    },
    {
        text: "Built in real-world constraints -- low-latency, cost-aware model selection + fallbacks are part of the architecture, not an afterthought.",
        theme: 'strategy',
    },
];

export const TESTIMONIALS_FOOTER =
    'These are outcome-based credibility signals (not third-party quotes). Evidence links are available per project.';

// ── Client / Collaborator Entries ────────────

export interface Client {
    name: string;
    parentCompany?: string;
    role: string;
    description: string;
    quote?: string;
    period?: string;
    location?: string;
    logoUrl?: string;     // public URL or local path to logo
}

export const CLIENTS: Client[] = [
    {
        name: 'IHS Markit',
        parentCompany: 'S&P Global',
        role: 'Senior Software Engineer to Technical Lead',
        description: '13 years of building solutions across every dimension, from cloud-native platform migrations and analytics systems serving 20+ automotive OEMs on 7 continents, to CI/CD automation, cross-continent team leadership, and enterprise-grade delivery at global scale.',
        period: '2011 – 2023 · 13 years',
        location: 'Essen / Leverkusen',
        logoUrl: '/logos/sp-global.svg',
    },
    {
        name: 'Pitney Bowes Software',
        role: 'Software Engineer',
        description: 'Contributed to MapInfo MapXtreme. Built reusable geospatial components, metadata tagging, and spatial retrieval logic for enterprise GIS systems used worldwide.',
        period: 'Mar 2009 – Jul 2011 · 2 yrs 5 mos',
        location: 'Noida, India · On-site',
        logoUrl: '/logos/pitney-bowes.svg',
    },
];

export const GENERIC_TILES: string[] = [
    'Automotive OEMs',
    'Tier-1 Suppliers',
    'Global Analytics Clients',
    'Enterprise GIS',
];

export const CLIENTS_DISCLAIMER =
    'Logos are trademarks of their respective owners, shown to identify former employers. No endorsement is implied.';

// ── Project Context Lines ────────────────────

export interface ProjectContext {
    builtFor: string;
    designedToProve: string;
}

export const PROJECT_CONTEXT: Record<string, ProjectContext> = {
    medai: {
        builtFor: 'Clinical intake + documentation workflows in German-speaking healthcare settings (real-time, latency-guarded).',
        designedToProve: 'Fast STT + medical entity extraction + deterministic summarization + multilingual translation into clean reports.',
    },
    echoai: {
        builtFor: 'Real-time voice-driven agent experiences where memory + retrieval actually matter.',
        designedToProve: 'WebSocket audio + STT fallback + RAG retrieval + autonomous reasoning in one tight pipeline.',
    },
    'galileo-arena': {
        builtFor: 'Teams who need LLM quality controls before shipping to production.',
        designedToProve: 'Adversarial multi-agent evaluation + structured judge output + audit trail.',
    },
    'masx-hotspots': {
        builtFor: 'Analysts and builders who need a structured signal layer for geopolitical + economic flashpoints.',
        designedToProve: 'Multilingual discovery + parallel ingestion + entity-driven feeds (Google RSS + GDELT).',
    },
};

// ── Services "3 Ways" Summary ────────────────

export interface ServicePillar {
    number: string;
    title: string;
    verb: string;
    description: string;
}

export const SERVICE_PILLARS: ServicePillar[] = [
    {
        number: '01',
        title: 'Strategy',
        verb: 'Understand',
        description: 'I put effort into understanding your challenges deeply and help you cut through the AI noise to focus on what truly drives value.',
    },
    {
        number: '02',
        title: 'Build',
        verb: 'Ship',
        description: 'I design, build, and deploy your solution, and deliver a working system in weeks, not months.',
    },
    {
        number: '03',
        title: 'Harden',
        verb: 'Deploy',
        description: 'I make your AI production-grade: monitoring, guardrails, cost controls, and a clean handoff so your team owns it.',
    },
];
