import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

/**
 * PageCTA — Reusable call-to-action strip for content pages
 * Renders a centered CTA with optional secondary links
 */

interface PageCTAProps {
    /** Primary CTA label */
    text: string;
    /** Link destination (default: /contact) */
    to?: string;
    /** Optional secondary links */
    secondaryLinks?: Array<{ label: string; to: string }>;
}

const PageCTA: React.FC<PageCTAProps> = ({
    text,
    to = '/contact',
    secondaryLinks,
}) => {
    return (
        <div
            className="py-16 flex flex-col items-center gap-4"
            style={{ borderTop: '1px solid var(--mono-border)' }}
        >
            <Link to={to} className="btn-primary inline-flex items-center gap-2">
                {text}
                <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryLinks && secondaryLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 mt-2">
                    {secondaryLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-sm no-underline transition-colors duration-300"
                            style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.color = 'var(--mono-primary)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.color = 'var(--mono-muted)';
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageCTA;
