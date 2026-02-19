import React, { useEffect, useRef } from 'react';
import {
    SOFT_TESTIMONIALS,
    TESTIMONIALS_FOOTER,
    THEME_META,
    type TestimonialTheme,
} from '../data/testimonialsData';

/**
 * SignalsOfTrust — Micro-proof cards grouped by theme
 * Section header with ghost number, themed groups, footer disclaimer
 */

const themeOrder: TestimonialTheme[] = ['enterprise', 'ai-systems', 'quality', 'strategy'];

const SignalsOfTrust: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );

        const revealElements = sectionRef.current?.querySelectorAll('.reveal');
        revealElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const grouped = themeOrder.map((theme) => ({
        theme,
        meta: THEME_META[theme],
        cards: SOFT_TESTIMONIALS.filter((t) => t.theme === theme),
    }));

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto"
            id="signals"
        >
            {/* Section Header */}
            <div className="relative mb-16 reveal">
                <span className="section-number">03</span>
                <div className="section-label">Social Proof</div>
                <h2 className="section-title">
                    Credibility, <span className="highlight">without the fluff</span>
                </h2>
            </div>

            {/* Themed Groups */}
            {grouped.map(({ theme, meta, cards }) => (
                <div key={theme} className="mb-12 reveal">
                    {/* Theme Header */}
                    <div
                        className="flex items-center gap-2 mb-6"
                        style={{ color: 'var(--mono-muted)' }}
                    >
                        {(() => { const Icon = meta.icon; return <Icon size={18} weight="regular" />; })()}
                        <span
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={{ letterSpacing: '0.12em' }}
                        >
                            {meta.label}
                        </span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.map((card, idx) => {
                            // Split on first " -- " to get bold lead + detail
                            const dashIndex = card.text.indexOf(' -- ');
                            const lead = dashIndex > -1 ? card.text.slice(0, dashIndex) : '';
                            const detail = dashIndex > -1 ? card.text.slice(dashIndex + 4) : card.text;

                            return (
                                <div
                                    key={idx}
                                    className="rounded-xl p-5 transition-all duration-300"
                                    style={{
                                        background: 'var(--mono-surface)',
                                        border: '1px solid var(--mono-border)',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    }}
                                >
                                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--mono-text)' }}>
                                        {lead && (
                                            <span className="font-semibold" style={{ color: 'var(--mono-primary)' }}>
                                                {lead}
                                            </span>
                                        )}
                                        {lead && ' - '}
                                        <span style={{ color: 'var(--mono-muted)' }}>{detail}</span>
                                    </p>
                                    {card.attribution && (
                                        <span
                                            className="inline-block mt-3 text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded"
                                            style={{
                                                background: 'rgba(255, 77, 0, 0.08)',
                                                color: 'var(--mono-primary)',
                                            }}
                                        >
                                            - {card.attribution}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Footer Disclaimer */}
            <p
                className="text-center text-[12px] mt-8 reveal"
                style={{ color: 'var(--mono-muted)', opacity: 0.6 }}
            >
                {TESTIMONIALS_FOOTER}
            </p>
        </section>
    );
};

export default SignalsOfTrust;
