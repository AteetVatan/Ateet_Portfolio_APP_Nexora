import React from 'react';
import SEOHead from '../components/SEOHead';
import PageLayout from '../components/layout/PageLayout';

/**
 * BusinessCard — Embeds the static business-card.html via an iframe
 * so it keeps its own self-contained styling without conflicting with
 * the portfolio's design system.
 */
const BusinessCard: React.FC = () => {
    return (
        <PageLayout>
            <SEOHead
                title="Business Card | Ateet Bahamani"
                description="Digital business card for Ateet Bahamani, AI engineer, full-stack developer. Scan QR codes to visit the portfolio or talk to the AI clone."
            />
            <section
                className="min-h-screen flex items-center justify-center"
                style={{ paddingTop: '80px', paddingBottom: '40px' }}
            >
                <iframe
                    src="/business-card.html"
                    title="Ateet Bahamani, Business Card"
                    style={{
                        width: '100%',
                        maxWidth: '620px',
                        height: '1100px',
                        border: 'none',
                        borderRadius: '16px',
                        background: 'transparent',
                    }}
                />
            </section>
        </PageLayout>
    );
};

export default BusinessCard;
