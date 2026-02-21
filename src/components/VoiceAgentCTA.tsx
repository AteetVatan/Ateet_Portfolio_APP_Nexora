import React from 'react';

/**
 * VoiceAgentCTA — Creative "Talk to my Clone" card
 * Animated soundwave mic icon + gradient CTA + developer badge
 */
const VoiceAgentCTA: React.FC = () => (
    <div className="mb-12 px-6 md:px-20 max-w-[900px] mx-auto">
        <a
            href="https://ateetclone.masxai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="voice-agent-section block no-underline"
            style={{ textDecoration: 'none' }}
        >
            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Animated mic icon with soundwave bars */}
                <div className="voice-agent-mic">
                    <div className="voice-agent-bars">
                        <span /><span /><span /><span /><span />
                    </div>
                </div>

                {/* Text content */}
                <div className="flex-1 text-center sm:text-left">
                    <p
                        className="font-heading text-lg font-bold mb-1"
                        style={{ color: 'var(--mono-text)' }}
                    >
                        I'm busy building<span style={{ color: 'var(--mono-primary)' }}> — my clone isn't.</span>
                    </p>
                    <p className="text-sm mb-4" style={{ color: 'var(--mono-muted)' }}>
                        My AI Clone knows my work, my tech stack, and how I think. Chat or talk to it — it'll answer like I would.
                    </p>

                    {/* CTA button */}
                    <span className="voice-agent-cta">
                        🎙️ Talk or Chat with my AI Clone
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '2px' }}>
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Developer badge */}
            <div className="flex justify-center sm:justify-end mt-5">
                <span className="voice-agent-badge">
                    <span className="voice-agent-badge-dot" />
                    Voice Agent developed by Ateet Bahamani
                </span>
            </div>
        </a>
    </div>
);

export default VoiceAgentCTA;
