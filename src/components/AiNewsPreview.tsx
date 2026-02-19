import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RssSimple } from '@phosphor-icons/react';
import AiNewsCard from './AiNewsCard';
import {
    fetchAllNews,
    enrichImages,
    getCachedNews,
    isCacheFresh,
    type NewsItem,
} from '../lib/rssClient';

const PREVIEW_COUNT = 6;

/**
 * AiNewsPreview — Compact AI News section for the home page.
 * Shows latest PREVIEW_COUNT articles with a "View All" link.
 */
const AiNewsPreview: React.FC = () => {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const enrichingRef = useRef(false);

    const loadNews = useCallback(async (showLoading = false) => {
        if (showLoading) setLoading(true);
        setError(false);

        try {
            const newsItems = await fetchAllNews();
            if (newsItems.length === 0) setError(true);
            setItems(newsItems.slice(0, PREVIEW_COUNT));

            // Non-blocking OG image enrichment
            if (!enrichingRef.current) {
                enrichingRef.current = true;
                enrichImages(newsItems.slice(0, PREVIEW_COUNT))
                    .then((enriched) => setItems([...enriched]))
                    .catch(() => { })
                    .finally(() => { enrichingRef.current = false; });
            }
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const cached = getCachedNews();
        if (cached && cached.items.length > 0) {
            setItems(cached.items.slice(0, PREVIEW_COUNT));
            setLoading(false);
            if (!isCacheFresh()) loadNews(false);
            else loadNews(false); // revalidate in background
        } else {
            loadNews(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Don't render if both errored AND no items
    if (error && items.length === 0 && !loading) return null;

    return (
        <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <h2
                            className="font-heading text-3xl md:text-4xl font-bold"
                            style={{ color: 'var(--mono-text)' }}
                        >
                            AI <span className="highlight">News</span>
                        </h2>
                        <span className="ai-news-pulse" title="Live feed" />
                    </div>
                    <p className="max-w-xl text-base" style={{ color: 'var(--mono-muted)' }}>
                        Live headlines from the world of artificial intelligence.
                    </p>
                </div>
                <Link to="/ai-news" className="btn-primary mt-6 md:mt-0">
                    All Headlines
                </Link>
            </div>

            {/* Loading skeleton */}
            {loading && items.length === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
                        <div
                            key={i}
                            className="ai-news-skeleton monolith-card"
                            style={{
                                display: 'flex',
                                overflow: 'hidden',
                                borderRadius: '6px',
                                height: '140px',
                            }}
                        >
                            <div
                                className="shimmer"
                                style={{
                                    flex: '0 0 120px',
                                    background: 'var(--mono-border)',
                                }}
                            />
                            <div
                                style={{
                                    flex: 1,
                                    padding: '14px 18px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <div className="shimmer" style={{ height: '12px', width: '70px', borderRadius: '4px', background: 'var(--mono-border)' }} />
                                <div className="shimmer" style={{ height: '14px', width: '90%', borderRadius: '4px', background: 'var(--mono-border)' }} />
                                <div className="shimmer" style={{ height: '14px', width: '65%', borderRadius: '4px', background: 'var(--mono-border)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* News cards */}
            {items.length > 0 && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {items.map((item, i) => (
                            <AiNewsCard key={`${item.url}-${i}`} item={item} />
                        ))}
                    </div>

                    {/* "View All" footer link */}
                    <div className="mt-6">
                        <Link
                            to="/ai-news"
                            className="surface-card flex justify-center items-center py-4 transition-colors"
                            style={{ borderColor: 'var(--mono-border)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)'; }}
                        >
                            <RssSimple size={14} weight="light" style={{ marginRight: '8px', color: 'var(--mono-primary)' }} />
                            <span className="font-mono" style={{ color: 'var(--mono-primary)' }}>View All Headlines</span>
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default AiNewsPreview;
