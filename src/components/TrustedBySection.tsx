import React, { useEffect, useRef } from 'react';
import {
    CLIENTS,
    GENERIC_TILES,
    CLIENTS_DISCLAIMER,
} from '../data/testimonialsData';

/**
 * TrustedBySection — Employer logos + enterprise track record
 * Reframed as "Where I've Built" (employer history, not client list)
 */

const TrustedBySection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.15 }
        );

        const revealElements = sectionRef.current?.querySelectorAll('.reveal');
        revealElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 px-6 md:px-20 max-w-[1400px] mx-auto"
            id="trusted-by"
        >
            {/* Section Header */}
            <div className="relative mb-12 reveal">
                <div className="section-label">Track Record</div>
                <h2
                    className="font-heading text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--mono-text)' }}
                >
                    Companies that <span className="highlight">trust my work</span>
                </h2>
            </div>

            {/* Employer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 reveal">
                {CLIENTS.map((client) => (
                    <div
                        key={client.name}
                        className="rounded-xl p-6 transition-all duration-300"
                        style={{
                            background: 'var(--mono-surface)',
                            border: '1px solid var(--mono-border)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
                        }}
                    >
                        {/* Logo + Name row */}
                        <div className="flex items-center gap-3 mb-3">
                            {client.logoUrl && (
                                <img
                                    src={client.logoUrl}
                                    alt={`${client.name} logo`}
                                    className="h-6 w-auto object-contain"
                                    style={{ filter: 'var(--mono-logo-filter, none)', opacity: 0.85 }}
                                />
                            )}
                            <div>
                                <h3
                                    className="font-heading font-bold text-lg leading-tight"
                                    style={{ color: 'var(--mono-text)' }}
                                >
                                    {client.name}
                                </h3>
                                {client.parentCompany && (
                                    <span
                                        className="text-xs"
                                        style={{ color: 'var(--mono-muted)' }}
                                    >
                                        now part of {client.parentCompany}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Role */}
                        <p
                            className="text-sm font-semibold mb-2"
                            style={{ color: 'var(--mono-primary)' }}
                        >
                            {client.role}
                        </p>

                        {/* Description */}
                        <p
                            className="text-sm mb-3"
                            style={{ color: 'var(--mono-muted)' }}
                        >
                            {client.description}
                        </p>

                        {/* Period + Location */}
                        {(client.period || client.location) && (
                            <p
                                className="text-[11px] mt-2"
                                style={{ color: 'var(--mono-muted)', opacity: 0.6 }}
                            >
                                {[client.period, client.location].filter(Boolean).join(' · ')}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Industry Exposure Tiles */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 reveal">
                {GENERIC_TILES.map((tile) => (
                    <span
                        key={tile}
                        className="tag"
                        style={{ fontSize: '12px', padding: '6px 14px' }}
                    >
                        {tile}
                    </span>
                ))}
            </div>

            {/* Disclaimer */}
            <p
                className="text-center text-[11px] reveal"
                style={{ color: 'var(--mono-muted)', opacity: 0.5 }}
            >
                {CLIENTS_DISCLAIMER}
            </p>
        </section>
    );
};

export default TrustedBySection;

