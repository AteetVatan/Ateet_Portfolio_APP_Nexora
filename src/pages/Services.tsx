import React, { useEffect, useRef, useState } from 'react';
import SEOHead from '../components/SEOHead';
import PageLayout from '../components/layout/PageLayout';
import {
    PROOF_LINKS, CONTACT_EMAIL,
    SERVICES, PACKAGES, ENGAGEMENT_MODELS,
    PROCESS_STEPS, PRINCIPLES, FIT_BULLETS, FAQ_ITEMS,
} from '../data/servicesData';
import { Mail, Copy, Check, ChevronDown, ExternalLink } from 'lucide-react';

/**
 * Services — Premium conversion-optimized page
 * Deterministic, typed-data-driven. All sections rendered from servicesData.ts.
 */
const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);



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
                description="AI system development services by Ateet Vatan — agentic AI, RAG pipelines, LLM fine-tuning, multi-agent architecture, and evaluation setup."
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
                                I build deterministic Agentic AI systems that don't break in
                                production. If you need AI that's auditable, reliable,
                                cost-controlled, and shippable — I can help.
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
                                            <ExternalLink className="w-3 h-3 ml-1 inline-block opacity-60" />
                                        )}
                                    </a>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4">
                                <a href="#contact" className="btn-primary">
                                    Hire me for a contract →
                                </a>
                                <a href="#engagement" className="btn-outline">
                                    Collaborate / Partner
                                </a>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="btn-outline"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                    <Mail className="w-4 h-4" /> Email me
                                </a>
                            </div>
                        </div>
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

                {/* ═══ PACKAGES ═══ */}
                <section
                    id="packages"
                    className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto services-scroll-target"
                    style={{ borderTop: '1px solid var(--mono-border)' }}
                >
                    <div className="relative mb-16 reveal">
                        <span className="section-number">02</span>
                        <div className="section-label">Packages</div>
                        <h2 className="section-title">
                            Clear <span className="highlight">Entry Points</span>
                        </h2>
                    </div>
                    <div className="services-grid services-grid--2 reveal">
                        {PACKAGES.map((pkg) => {
                            const Icon = pkg.icon;
                            return (
                                <div key={pkg.name} className="monolith-card p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon
                                            className="w-6 h-6"
                                            style={{ color: 'var(--mono-primary)' }}
                                        />
                                        <div>
                                            <h3
                                                className="text-lg font-heading"
                                                style={{ color: 'var(--mono-text)' }}
                                            >
                                                {pkg.name}
                                            </h3>
                                            <span
                                                className="text-xs font-mono"
                                                style={{ color: 'var(--mono-primary)' }}
                                            >
                                                {pkg.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                    <p
                                        className="text-[14px] mb-5 leading-relaxed"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        {pkg.description}
                                    </p>
                                    <ul className="space-y-2 mb-5">
                                        {pkg.deliverables.map((d) => (
                                            <li
                                                key={d}
                                                className="text-[13px] flex items-start gap-2"
                                                style={{ color: 'var(--mono-muted)' }}
                                            >
                                                <span style={{ color: 'var(--mono-primary)' }}>→</span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                    <div
                                        className="text-xs font-mono pt-4"
                                        style={{
                                            borderTop: '1px solid var(--mono-border)',
                                            color: 'var(--mono-muted)',
                                        }}
                                    >
                                        Timeline: {pkg.timeline}
                                    </div>
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
                        <span className="section-number">03</span>
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
                                                <span style={{ color: 'var(--mono-primary)' }}>•</span>
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
                        <span className="section-number">04</span>
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
                        <span className="section-number">05</span>
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
                        <span className="section-number">06</span>
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
                        <span className="section-number">07</span>
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
                                    <ChevronDown
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
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                    <Mail className="w-4 h-4" /> Email me
                                </a>
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
                                            <Copy className="w-4 h-4" /> Copy email
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
                                        <ExternalLink
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
