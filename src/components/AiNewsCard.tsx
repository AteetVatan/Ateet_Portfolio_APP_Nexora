import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowSquareOut } from '@phosphor-icons/react';
import type { NewsItem } from '../lib/rssClient';

interface AiNewsCardProps {
    item: NewsItem;
}

/** Deterministic gradient from source name for placeholder thumbnails */
function sourceGradient(source: string): string {
    let hash = 0;
    for (let i = 0; i < source.length; i++) {
        hash = source.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 60%, 30%), hsl(${hue2}, 50%, 20%))`;
}

const AiNewsCard: React.FC<AiNewsCardProps> = ({ item }) => {
    const timeAgo = React.useMemo(() => {
        try {
            const d = new Date(item.publishedAt);
            if (isNaN(d.getTime()) || d.getTime() === 0) return '';
            return formatDistanceToNow(d, { addSuffix: true });
        } catch {
            return '';
        }
    }, [item.publishedAt]);

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="ai-news-card monolith-card group"
            style={{
                display: 'flex',
                gap: 0,
                textDecoration: 'none',
                overflow: 'hidden',
                borderRadius: '6px',
            }}
        >
            {/* Thumbnail */}
            <div
                className="ai-news-thumb"
                style={{
                    flex: '0 0 140px',
                    minHeight: '140px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: item.imageUrl ? 'var(--mono-surface)' : sourceGradient(item.source),
                }}
            >
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt=""
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-105"
                        onError={(e) => {
                            // If image fails, show placeholder
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                parent.style.background = sourceGradient(item.source);
                            }
                        }}
                    />
                ) : null}
                {/* Placeholder letter for no-image cards */}
                {!item.imageUrl && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '36px',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.25)',
                            userSelect: 'none',
                        }}
                    >
                        {item.source.charAt(0)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    flex: 1,
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: 0,
                }}
            >
                {/* Source + time */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                    }}
                >
                    <span
                        className="font-mono"
                        style={{
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: 'var(--mono-primary)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {item.source}
                    </span>
                    {timeAgo && (
                        <span
                            className="font-mono ai-news-time"
                            style={{
                                fontSize: '11px',
                                color: 'var(--mono-muted)',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}
                        >
                            {timeAgo}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3
                    className="font-heading"
                    style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: 'var(--mono-text)',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {item.title}
                </h3>

                {/* Snippet */}
                {item.snippet && (
                    <p
                        style={{
                            fontSize: '13px',
                            lineHeight: 1.5,
                            color: 'var(--mono-muted)',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {item.snippet}
                    </p>
                )}

                {/* External link hint */}
                <div
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: 'var(--mono-muted)',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                    }}
                    className="group-hover:opacity-100"
                >
                    <ArrowSquareOut size={12} weight="thin" />
                    <span>Read article</span>
                </div>
            </div>
        </a>
    );
};

export default AiNewsCard;
