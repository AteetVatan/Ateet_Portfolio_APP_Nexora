import React, { useEffect, useRef, useState } from 'react';
import SEOHead from '../components/SEOHead';
import PageLayout from '../components/layout/PageLayout';
import {
    PROOF_LINKS, CONTACT_EMAIL,
    SERVICES, CORE_OFFERS, ADD_ONS, ENGAGEMENT_MODELS,
    PROCESS_STEPS, PRINCIPLES, FIT_BULLETS, FAQ_ITEMS,
} from '../data/servicesData';
import { USE_CASES, POWER_SCENARIOS, DOMAIN_FILTERS } from '../data/useCasesData';
import { SERVICE_PILLARS } from '../data/testimonialsData';
import { Envelope, CopySimple, Check, CaretDown, ArrowSquareOut, Star, Diamond } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/**
 * Services — Premium conversion-optimized page
 * Deterministic, typed-data-driven. All sections rendered from servicesData.ts.
 */
const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [expandedOffer, setExpandedOffer] = useState<number | null>(null);
    const [activeDomain, setActiveDomain] = useState('All');

    const filteredUseCases = activeDomain === 'All'
        ? USE_CASES
        : USE_CASES.filter((uc) => uc.domain === activeDomain);



    // Reveal-on-scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const els = sectionRef.current?.querySelectorAll('.reveal');
        els?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback: select text
            const el = document.createElement('textarea');
            el.value = CONTACT_EMAIL;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <PageLayout>
            <SEOHead
                title="AI Services"
                description="AI system development services by Ateet Vatan. Agentic AI, RAG pipelines, LLM fine-tuning, multi-agent architecture, and evaluation setup."
                jsonLd={{
                    '@type': 'ProfessionalService',
                    name: 'Ateet Vatan — AI Engineering Services',
                    description: 'AI system development services: Agentic AI, RAG pipelines, LLM fine-tuning, multi-agent architecture, and evaluation setup.',
                    url: 'https://ateet.masxai.com/services',
                    provider: {
                        '@type': 'Person',
                        name: 'Ateet Vatan',
                        url: 'https://ateet.masxai.com',
                        jobTitle: 'AI Architect / Engineer',
                    },
                    areaServed: 'Worldwide',
                    serviceType: ['AI Consulting', 'LLM Integration', 'Multi-Agent Systems', 'RAG Pipeline Development'],
                }}
            />
            <div ref={sectionRef}>
                {/* ═══ HERO ═══ */}
                <section className="services-hero">
                    <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-36">
                        <div className="reveal">
                            <div className="section-label">Services</div>
                            <h1
                                className="font-heading leading-[1.05] tracking-[-0.03em] mb-6"
                                style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
                            >
                                Build Production-Grade{' '}
                                <span className="highlight">Agentic AI</span>
                            </h1>
                            <p
                                className="max-w-[640px] mb-10 leading-relaxed"
                                style={{
                                    fontSize: 'clamp(16px, 2vw, 20px)',
                                    color: 'var(--mono-muted)',
                                }}
                            >
                                I help businesses cut through the AI noise and build systems
                                that actually work in production. If you need AI that's auditable,
                                reliable, cost-controlled, and shippable, let's talk.
                            </p>

                            {/* Proof Links */}
                            <div className="flex flex-wrap gap-2 mb-10">
                                {PROOF_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target={link.external ? '_blank' : undefined}
                                        rel={link.external ? 'noopener noreferrer' : undefined}
                                        className="proof-chip"
                                    >
                                        {link.label}
                                        {link.external && (
                                            <ArrowSquareOut className="w-3 h-3 ml-1 inline-block opacity-60" />
                                        )}
                                    </a>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4">
                                <a href="#contact" className="btn-primary">
                                    Hire me for a contract
                                </a>
                                <a href="#engagement" className="btn-outline">
                                    Collaborate or Partner
                                </a>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="btn-outline"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                    <Envelope className="w-4 h-4" /> Email me
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ 3 WAYS I DELIVER VALUE ═══ */}
                <section className="py-16 md:py-24 px-6 md:px-20 max-w-[1400px] mx-auto">
                    <div className="relative mb-12 reveal">
                        <div className="section-label">How I Work</div>
                        <h2 className="section-title">
                            Three ways I can <span className="highlight">help you.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
                        {SERVICE_PILLARS.map((pillar) => (
                            <div
                                key={pillar.number}
                                className="rounded-xl p-8 transition-all duration-300"
                                style={{
                                    background: 'var(--mono-surface)',
                                    border: '1px solid var(--mono-border)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                }}
                            >
                                <span
                                    className="text-xs font-semibold uppercase tracking-widest"
                                    style={{ color: 'var(--mono-primary)', letterSpacing: '0.12em' }}
                                >
                                    {pillar.number}
                                </span>
                                <h3
                                    className="font-heading text-2xl font-bold mt-2 mb-1"
                                    style={{ color: 'var(--mono-text)' }}
                                >
                                    {pillar.title}
                                </h3>
                                <p
                                    className="text-sm font-medium mb-3"
                                    style={{ color: 'var(--mono-primary)' }}
                                >
                                    {pillar.verb}
                                </p>
                                <p
                                    className="text-[14px] leading-relaxed"
                                    style={{ color: 'var(--mono-muted)' }}
                                >
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ SERVICES ═══ */}
                <section
                    id="services"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">01</span>
                        <div className="section-label">Capabilities</div>
                        <h2 className="section-title">
                            What I Can <span className="highlight">Build</span> for You
                        </h2>
                    </div>
                    <div className="services-grid reveal">
                        {SERVICES.map((svc) => {
                            const Icon = svc.icon;
                            return (
                                <div key={svc.title} className="monolith-card p-8">
                                    <Icon
                                        className="w-8 h-8 mb-4"
                                        style={{ color: 'var(--mono-primary)' }}
                                    />
                                    <h3
                                        className="text-xl mb-3 font-heading"
                                        style={{ color: 'var(--mono-text)' }}
                                    >
                                        {svc.title}
                                    </h3>
                                    <p
                                        className="text-[14px] mb-4 leading-relaxed"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {svc.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {svc.tags.map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ SOLUTION BLUEPRINTS ═══ */}
                <section
                    id="blueprints"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">02</span>
                        <div className="section-label">Solution Blueprints</div>
                        <h2 className="section-title">
                            AI in <span className="highlight">Your</span> Domain
                        </h2>
                        <p
                            className="max-w-[640px] mt-4 text-[15px] leading-relaxed"
                            style={{ color: 'var(--mono-muted)' }}
                        >
                            Every industry has its own pain points. These blueprints show how the same
                            proven building blocks (RAG, agents, evaluation, signal intelligence) map to
                            your specific domain.
                        </p>
                    </div>

                    {/* Domain Filter Pills */}
                    <div className="blueprint-filters reveal">
                        {DOMAIN_FILTERS.map((domain) => (
                            <button
                                key={domain}
                                className={`blueprint-filter-pill${activeDomain === domain ? ' blueprint-filter-pill--active' : ''
                                    }`}
                                onClick={() => setActiveDomain(domain)}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>

                    {/* Blueprint Cards Grid */}
                    <div className="blueprint-grid reveal">
                        {filteredUseCases.map((uc) => {
                            const Icon = uc.icon;
                            return (
                                <div key={uc.id} className="blueprint-card">
                                    <div className="blueprint-card__header">
                                        <div className="flex items-center gap-2">
                                            <span className="blueprint-card__domain">
                                                <Icon className="w-3.5 h-3.5" />
                                                {uc.domain}
                                            </span>
                                            <span className="blueprint-badge">Blueprint</span>
                                        </div>
                                        <span className="blueprint-card__mvp">{uc.timeToMvp}</span>
                                    </div>

                                    <h3 className="blueprint-card__title">{uc.title}</h3>
                                    <p className="blueprint-card__subtitle">{uc.subtitle}</p>

                                    <div className="blueprint-card__label">The problem</div>
                                    <p className="blueprint-card__text">{uc.problem}</p>

                                    <div className="blueprint-card__label">How I would approach it</div>
                                    <p className="blueprint-card__text">{uc.aiApproach}</p>

                                    <div className="blueprint-card__impact">{uc.impact}</div>

                                    <div className="blueprint-card__cost">
                                        Cost drivers: {uc.costDrivers}
                                    </div>

                                    {uc.extraNote && (
                                        <div className="blueprint-card__note">{uc.extraNote}</div>
                                    )}

                                    <div className="blueprint-card__proven">
                                        <div className="blueprint-card__proven-label">
                                            Proven building blocks
                                        </div>
                                        <div className="blueprint-card__proven-tags">
                                            {uc.provenBlocks.map((block) => (
                                                <Link
                                                    key={block.label}
                                                    to={block.link}
                                                    className="proven-tag"
                                                >
                                                    {block.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Power Scenarios */}
                    <div className="reveal">
                        <h3
                            className="font-heading text-lg mt-16 mb-2"
                            style={{ color: 'var(--mono-text)' }}
                        >
                            What this looks like <span className="highlight">in practice</span>
                        </h3>
                        <p
                            className="text-[14px] mb-6"
                            style={{ color: 'var(--mono-muted)' }}
                        >
                            Three scenarios built from the same proven patterns.
                        </p>
                        <div className="power-scenarios">
                            {POWER_SCENARIOS.map((scenario) => (
                                <div key={scenario.title} className="power-scenario">
                                    <div className="power-scenario__title">{scenario.title}</div>
                                    <div className="power-scenario__row">
                                        <span className="power-scenario__tag power-scenario__tag--before">
                                            Before
                                        </span>
                                        <span className="power-scenario__text">{scenario.before}</span>
                                    </div>
                                    <div className="power-scenario__row">
                                        <span className="power-scenario__tag power-scenario__tag--after">
                                            After
                                        </span>
                                        <span className="power-scenario__text">{scenario.after}</span>
                                    </div>
                                    <div className="power-scenario__unlocks">{scenario.unlocks}</div>
                                    <div className="power-scenario__built-with">
                                        Built with: {scenario.builtWith}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ CORE OFFERS ═══ */}
                <section
                    id="offers"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">03</span>
                        <div className="section-label">Core Offers</div>
                        <h2 className="section-title">
                            What You <span className="highlight">Get</span>
                        </h2>
                        <p
                            className="max-w-[600px] mt-4 text-[15px] leading-relaxed"
                            style={{ color: 'var(--mono-muted)' }}
                        >
                            Five focused engagements, each with a clear scope, timeline, and deliverables.
                            Pick the one that fits where you are right now.
                        </p>
                    </div>

                    {/* Featured Offer (first) */}
                    {CORE_OFFERS.filter((o) => o.featured).map((offer) => {
                        const Icon = offer.icon;
                        return (
                            <div
                                key={offer.name}
                                className="offer-card offer-card--featured reveal"
                            >
                                <div className="offer-card__header">
                                    <div className="flex items-center gap-3">
                                        <div className="offer-card__icon-wrap offer-card__icon-wrap--featured">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'var(--mono-text)' }}>
                                                {offer.name}
                                            </h3>
                                            <span className="text-xs" style={{ color: 'var(--mono-muted)' }}>
                                                {offer.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {offer.badge && (
                                            <span className="offer-badge offer-badge--recommended">
                                                <Star className="w-3.5 h-3.5" weight="fill" /> {offer.badge}
                                            </span>
                                        )}
                                        <span className="offer-timeline">{offer.timeline}</span>
                                    </div>
                                </div>
                                <p
                                    className="text-[15px] leading-relaxed mb-6 max-w-[720px]"
                                    style={{ color: 'var(--mono-muted)' }}
                                >
                                    {offer.description}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--mono-primary)' }}>
                                            Deliverables
                                        </h4>
                                        <ul className="space-y-2">
                                            {offer.deliverables.map((d) => (
                                                <li key={d} className="text-[13px] flex items-start gap-2" style={{ color: 'var(--mono-muted)' }}>
                                                    <span style={{ color: 'var(--mono-primary)', marginTop: '2px' }}>-</span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {offer.idealFor && (
                                        <div>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 mt-4 md:mt-0" style={{ color: 'var(--mono-primary)' }}>
                                                Ideal For
                                            </h4>
                                            <ul className="space-y-2">
                                                {offer.idealFor.map((f) => (
                                                    <li key={f} className="text-[13px] flex items-start gap-2" style={{ color: 'var(--mono-muted)' }}>
                                                        <span style={{ color: 'var(--mono-primary)', marginTop: '2px' }}>✓</span>
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Grid Offers (2-4) */}
                    <div className="offers-grid reveal">
                        {CORE_OFFERS.filter((o) => !o.featured && !o.signature).map((offer, idx) => {
                            const Icon = offer.icon;
                            const globalIdx = CORE_OFFERS.indexOf(offer);
                            const isExpanded = expandedOffer === globalIdx;
                            return (
                                <div
                                    key={offer.name}
                                    className="offer-card offer-card--grid"
                                >
                                    <div className="offer-card__header">
                                        <div className="flex items-center gap-3">
                                            <div className="offer-card__icon-wrap">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading text-lg" style={{ color: 'var(--mono-text)' }}>
                                                    {offer.name}
                                                </h3>
                                                <span className="text-xs" style={{ color: 'var(--mono-muted)' }}>
                                                    {offer.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="offer-timeline">{offer.timeline}</span>
                                    </div>
                                    <p
                                        className="text-[14px] leading-relaxed mb-4"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {offer.description}
                                    </p>

                                    {/* Expand/Collapse */}
                                    <button
                                        onClick={() => setExpandedOffer(isExpanded ? null : globalIdx)}
                                        className="offer-expand-btn"
                                        aria-expanded={isExpanded}
                                    >
                                        <span>{isExpanded ? 'Hide details' : 'View deliverables'}</span>
                                        <CaretDown
                                            className="w-4 h-4 transition-transform duration-300"
                                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
                                        />
                                    </button>

                                    <div
                                        className="offer-details"
                                        style={{
                                            maxHeight: isExpanded ? '500px' : '0',
                                            opacity: isExpanded ? 1 : 0,
                                        }}
                                    >
                                        <div className="pt-4">
                                            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--mono-primary)' }}>
                                                Deliverables
                                            </h4>
                                            <ul className="space-y-2 mb-4">
                                                {offer.deliverables.map((d) => (
                                                    <li key={d} className="text-[13px] flex items-start gap-2" style={{ color: 'var(--mono-muted)' }}>
                                                        <span style={{ color: 'var(--mono-primary)', marginTop: '2px' }}>-</span>
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                            {offer.useCases && (
                                                <div className="flex flex-wrap gap-2">
                                                    {offer.useCases.map((uc) => (
                                                        <span key={uc} className="offer-use-case-pill">{uc}</span>
                                                    ))}
                                                </div>
                                            )}
                                            {offer.idealFor && (
                                                <ul className="space-y-2">
                                                    {offer.idealFor.map((f) => (
                                                        <li key={f} className="text-[13px] flex items-start gap-2" style={{ color: 'var(--mono-muted)' }}>
                                                            <span style={{ color: 'var(--mono-primary)', marginTop: '2px' }}>✓</span>
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Signature Offer (last) */}
                    {CORE_OFFERS.filter((o) => o.signature).map((offer) => {
                        const Icon = offer.icon;
                        return (
                            <div
                                key={offer.name}
                                className="offer-card offer-card--signature reveal"
                            >
                                <div className="offer-card__header">
                                    <div className="flex items-center gap-3">
                                        <div className="offer-card__icon-wrap offer-card__icon-wrap--signature">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'var(--mono-text)' }}>
                                                {offer.name}
                                            </h3>
                                            <span className="text-xs" style={{ color: 'var(--mono-muted)' }}>
                                                {offer.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {offer.badge && (
                                            <span className="offer-badge offer-badge--signature">
                                                <Diamond className="w-3.5 h-3.5" weight="fill" /> {offer.badge}
                                            </span>
                                        )}
                                        <span className="offer-timeline">{offer.timeline}</span>
                                    </div>
                                </div>
                                <p
                                    className="text-[15px] leading-relaxed mb-6 max-w-[720px]"
                                    style={{ color: 'var(--mono-muted)' }}
                                >
                                    {offer.description}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--mono-primary)' }}>
                                            Deliverables
                                        </h4>
                                        <ul className="space-y-2">
                                            {offer.deliverables.map((d) => (
                                                <li key={d} className="text-[13px] flex items-start gap-2" style={{ color: 'var(--mono-muted)' }}>
                                                    <span style={{ color: 'var(--mono-primary)', marginTop: '2px' }}>-</span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {offer.useCases && (
                                        <div>
                                            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 mt-4 md:mt-0" style={{ color: 'var(--mono-primary)' }}>
                                                Use Cases
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {offer.useCases.map((uc) => (
                                                    <span key={uc} className="offer-use-case-pill">{uc}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* ═══ ADD-ONS ═══ */}
                <section
                    className="py-12 md:py-20 px-6 md:px-20 max-w-[1400px] mx-auto"
                >
                    <div className="relative mb-10 reveal">
                        <div className="section-label">Add-ons</div>
                        <h2 className="text-lg md:text-xl font-heading" style={{ color: 'var(--mono-text)' }}>
                            Layer these on <span className="highlight">when they help</span>
                        </h2>
                    </div>
                    <div className="addons-grid reveal">
                        {ADD_ONS.map((addon) => {
                            const Icon = addon.icon;
                            return (
                                <div key={addon.title} className="addon-card">
                                    <Icon className="w-5 h-5 mb-3" style={{ color: 'var(--mono-primary)' }} />
                                    <h4 className="text-sm font-heading mb-1" style={{ color: 'var(--mono-text)' }}>
                                        {addon.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--mono-muted)' }}>
                                        {addon.description}
                                    </p>
                                    <ul className="space-y-1">
                                        {addon.bullets.map((b) => (
                                            <li key={b} className="text-[11px] flex items-start gap-1.5" style={{ color: 'var(--mono-muted)' }}>
                                                <span style={{ color: 'var(--mono-primary)' }}>+</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ ENGAGEMENT MODELS ═══ */}
                <section
                    id="engagement"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">04</span>
                        <div className="section-label">Engagement</div>
                        <h2 className="section-title">
                            How We Can <span className="highlight">Work</span> Together
                        </h2>
                    </div>
                    <div className="services-grid services-grid--3 reveal">
                        {ENGAGEMENT_MODELS.map((model) => {
                            const Icon = model.icon;
                            return (
                                <div key={model.title} className="monolith-card p-8">
                                    <Icon
                                        className="w-8 h-8 mb-4"
                                        style={{ color: 'var(--mono-primary)' }}
                                    />
                                    <h3
                                        className="text-xl mb-3 font-heading"
                                        style={{ color: 'var(--mono-text)' }}
                                    >
                                        {model.title}
                                    </h3>
                                    <p
                                        className="text-[14px] mb-5 leading-relaxed"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {model.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {model.details.map((d) => (
                                            <li
                                                key={d}
                                                className="text-[13px] flex items-start gap-2"
                                                style={{ color: 'var(--mono-muted)' }}
                                            >
                                                <span style={{ color: 'var(--mono-primary)' }}>-</span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ PROCESS ═══ */}
                <section
                    id="process"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">05</span>
                        <div className="section-label">Process</div>
                        <h2 className="section-title">
                            How I <span className="highlight">Work</span>
                        </h2>
                    </div>
                    <div className="process-timeline reveal">
                        {PROCESS_STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.number} className="process-step">
                                    <div className="process-step-number">{step.number}</div>
                                    <Icon
                                        className="w-5 h-5 mb-2"
                                        style={{ color: 'var(--mono-primary)' }}
                                    />
                                    <h3
                                        className="text-base font-heading mb-1"
                                        style={{ color: 'var(--mono-text)' }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        className="text-[13px] leading-relaxed"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {step.description}
                                    </p>
                                    {idx < PROCESS_STEPS.length - 1 && (
                                        <div className="process-connector" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ PRINCIPLES ═══ */}
                <section
                    id="principles"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">06</span>
                        <div className="section-label">Principles</div>
                        <h2 className="section-title">
                            Why <span className="highlight">Me</span>
                        </h2>
                    </div>
                    <div className="services-grid services-grid--principles reveal">
                        {PRINCIPLES.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div key={p.title} className="flex gap-4 items-start">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(255, 77, 0, 0.08)' }}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={{ color: 'var(--mono-primary)' }}
                                        />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-base font-heading mb-1"
                                            style={{ color: 'var(--mono-text)' }}
                                        >
                                            {p.title}
                                        </h3>
                                        <p
                                            className="text-[14px] leading-relaxed"
                                            style={{ color: 'var(--mono-muted)' }}
                                        >
                                            {p.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══ FIT ═══ */}
                <section
                    id="fit"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">07</span>
                        <div className="section-label">Fit Check</div>
                        <h2 className="section-title">
                            Who I'm a <span className="highlight">Fit</span> For
                        </h2>
                    </div>
                    <div className="max-w-[700px] reveal">
                        <ul className="space-y-4">
                            {FIT_BULLETS.map((bullet) => (
                                <li
                                    key={bullet}
                                    className="flex items-start gap-3 text-[15px]"
                                    style={{ color: 'var(--mono-muted)' }}
                                >
                                    <span
                                        className="text-lg leading-none mt-0.5"
                                        style={{ color: 'var(--mono-primary)' }}
                                    >
                                        ✓
                                    </span>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ═══ FAQ ═══ */}
                <section
                    id="faq"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[900px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">08</span>
                        <div className="section-label">FAQ</div>
                        <h2 className="section-title">
                            Common <span className="highlight">Questions</span>
                        </h2>
                    </div>
                    <div className="space-y-2 reveal">
                        {FAQ_ITEMS.map((faq, idx) => (
                            <div key={idx} className="faq-item">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="faq-toggle"
                                    aria-expanded={openFaq === idx}
                                    aria-controls={`faq-answer-${idx}`}
                                >
                                    <span className="text-[15px] font-semibold text-left" style={{ color: 'var(--mono-text)' }}>
                                        {faq.question}
                                    </span>
                                    <CaretDown
                                        className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                                        style={{
                                            color: 'var(--mono-muted)',
                                            transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                                        }}
                                    />
                                </button>
                                <div
                                    id={`faq-answer-${idx}`}
                                    className="faq-answer"
                                    style={{
                                        maxHeight: openFaq === idx ? '200px' : '0',
                                    }}
                                >
                                    <p
                                        className="text-[14px] leading-relaxed pb-4 px-6"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ CONTACT CTA ═══ */}
                <section id="contact" className="services-scroll-target">
                    <div className="contact-split">
                        {/* Left CTA pane */}
                        <div className="contact-left">
                            <h2
                                className="font-heading"
                                style={{
                                    fontSize: 'clamp(32px, 4vw, 48px)',
                                    marginBottom: '16px',
                                }}
                            >
                                Let's build
                                <br />
                                something{' '}
                                <span style={{ opacity: 0.7 }}>production-grade.</span>
                            </h2>
                            <p
                                style={{
                                    opacity: 0.7,
                                    maxWidth: '400px',
                                    marginBottom: '32px',
                                }}
                            >
                                Ready to ship deterministic AI that works at 3 AM? Let's talk.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/contact#send-message"
                                    className="btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                    <Envelope className="w-4 h-4" /> Send Message
                                </Link>
                                <button
                                    onClick={handleCopyEmail}
                                    className="copy-btn"
                                    aria-label="Copy email address"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <CopySimple className="w-4 h-4" /> Copy email
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Right proof links */}
                        <div className="contact-right">
                            <h3
                                className="text-sm font-semibold uppercase tracking-wider mb-6"
                                style={{ color: 'var(--mono-muted)' }}
                            >
                                Proof of Work
                            </h3>
                            {PROOF_LINKS.map((link) => (
                                <div key={link.label} className="contact-item">
                                    <div className="contact-icon">
                                        <ArrowSquareOut
                                            className="w-4 h-4"
                                            style={{ color: 'var(--mono-primary)' }}
                                        />
                                    </div>
                                    <div>
                                        <h4
                                            className="text-sm font-semibold mb-0.5"
                                            style={{ color: 'var(--mono-text)' }}
                                        >
                                            {link.label}
                                        </h4>
                                        <a
                                            href={link.url}
                                            target={link.external ? '_blank' : undefined}
                                            rel={link.external ? 'noopener noreferrer' : undefined}
                                            className="text-sm no-underline"
                                            style={{
                                                color: 'var(--mono-muted)',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {link.url.replace('mailto:', '').replace('https://', '')}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default Services;
