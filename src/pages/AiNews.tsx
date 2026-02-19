import React, { useEffect, useState, useCallback, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import { formatDistanceToNow } from 'date-fns';
import { RssSimple, ArrowsClockwise } from '@phosphor-icons/react';
import PageLayout from '../components/layout/PageLayout';
import AiNewsCard from '../components/AiNewsCard';
import {
    fetchAllNews,
    enrichImages,
    getCachedNews,
    isCacheFresh,
    type NewsItem,
} from '../lib/rssClient';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const TIME_TICK_INTERVAL = 30_000; // 30 seconds

const AiNews: React.FC = () => {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [timeNow, setTimeNow] = useState(Date.now());
    const [error, setError] = useState(false);
    const enrichingRef = useRef(false);



    // Core fetch function
    const loadNews = useCallback(async (showLoading = false) => {
        if (showLoading) setLoading(true);
        setError(false);

        try {
            const newsItems = await fetchAllNews();
            if (newsItems.length === 0 && items.length === 0) {
                setError(true);
            }
            setItems(newsItems);
            setLastUpdated(new Date());

            // Non-blocking OG image enrichment
            if (!enrichingRef.current) {
                enrichingRef.current = true;
                enrichImages(newsItems)
                    .then((enriched) => {
                        setItems([...enriched]);
                    })
                    .catch(() => { })
                    .finally(() => {
                        enrichingRef.current = false;
                    });
            }
        } catch {
            // If we have cached items, keep showing them
            if (items.length === 0) setError(true);
        } finally {
            setLoading(false);
        }
    }, [items.length]);

    // Initial load: use cache if fresh, then revalidate
    useEffect(() => {
        const cached = getCachedNews();
        if (cached && cached.items.length > 0) {
            setItems(cached.items);
            setLastUpdated(new Date(cached.updatedAt));
            setLoading(false);

            // If cache is fresh, still revalidate in background
            if (isCacheFresh()) {
                loadNews(false);
            } else {
                loadNews(false);
            }
        } else {
            loadNews(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => loadNews(false), REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [loadNews]);

    // Time-ago tick every 30s (no refetch, just re-render)
    useEffect(() => {
        const interval = setInterval(() => setTimeNow(Date.now()), TIME_TICK_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // Format "Updated X ago"
    const updatedAgo = React.useMemo(() => {
        if (!lastUpdated) return null;
        try {
            return formatDistanceToNow(lastUpdated, { addSuffix: true });
        } catch {
            return null;
        }
        // Re-calc on timeNow tick
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastUpdated, timeNow]);

    return (
        <PageLayout>
            <SEOHead
                title="AI News"
                description="Live AI news feed curated by Ateet Vatan. Latest updates on LLMs, agents, and AI research from top sources."
            />
            <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <h1
                            className="font-heading text-3xl md:text-4xl font-bold"
                            style={{ color: 'var(--mono-text)' }}
                        >
                            AI <span className="highlight">News</span>
                        </h1>
                        <span className="ai-news-pulse" title="Live feed" />
                    </div>

                    <div
                        className="flex flex-wrap items-center gap-4"
                        style={{ color: 'var(--mono-muted)' }}
                    >
                        <p className="text-base m-0">
                            Latest from the world of artificial intelligence, auto-refreshed.
                        </p>
                        {updatedAgo && (
                            <span
                                className="font-mono text-xs flex items-center gap-1.5"
                                title={lastUpdated?.toLocaleString() || ''}
                                style={{ color: 'var(--mono-muted)', opacity: 0.7 }}
                            >
                                <ArrowsClockwise size={12} />
                                Updated {updatedAgo}
                            </span>
                        )}
                    </div>
                </div>

                {/* Loading skeleton */}
                {loading && items.length === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="ai-news-skeleton monolith-card"
                                style={{
                                    display: 'flex',
                                    overflow: 'hidden',
                                    borderRadius: '6px',
                                    height: '156px',
                                }}
                            >
                                <div
                                    className="shimmer"
                                    style={{
                                        flex: '0 0 140px',
                                        background: 'var(--mono-border)',
                                    }}
                                />
                                <div
                                    style={{
                                        flex: 1,
                                        padding: '16px 20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}
                                >
                                    <div
                                        className="shimmer"
                                        style={{
                                            height: '12px',
                                            width: '80px',
                                            borderRadius: '4px',
                                            background: 'var(--mono-border)',
                                        }}
                                    />
                                    <div
                                        className="shimmer"
                                        style={{
                                            height: '16px',
                                            width: '90%',
                                            borderRadius: '4px',
                                            background: 'var(--mono-border)',
                                        }}
                                    />
                                    <div
                                        className="shimmer"
                                        style={{
                                            height: '16px',
                                            width: '70%',
                                            borderRadius: '4px',
                                            background: 'var(--mono-border)',
                                        }}
                                    />
                                    <div
                                        className="shimmer"
                                        style={{
                                            height: '12px',
                                            width: '60%',
                                            borderRadius: '4px',
                                            background: 'var(--mono-border)',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && items.length === 0 && !loading && (
                    <div
                        className="surface-card p-8 text-center"
                        style={{ maxWidth: '500px', margin: '0 auto' }}
                    >
                        <RssSimple
                            size={40}
                            weight="light"
                            style={{ color: 'var(--mono-muted)', margin: '0 auto 16px' }}
                        />
                        <p
                            className="font-heading text-lg mb-2"
                            style={{ color: 'var(--mono-text)' }}
                        >
                            Couldn't load news feeds
                        </p>
                        <p className="text-sm mb-4" style={{ color: 'var(--mono-muted)' }}>
                            The news proxy might be temporarily unavailable. Please try again.
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => loadNews(true)}
                            style={{ borderRadius: '4px', fontSize: '13px' }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* News cards */}
                {items.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {items.map((item, i) => (
                            <AiNewsCard key={`${item.url}-${i}`} item={item} />
                        ))}
                    </div>
                )}

                {/* Subtle footer info */}
                {items.length > 0 && (
                    <p
                        className="font-mono text-center mt-12"
                        style={{
                            fontSize: '11px',
                            color: 'var(--mono-muted)',
                            opacity: 0.5,
                        }}
                    >
                        {items.length} articles from {new Set(items.map((i) => i.source)).size} sources
                        · auto-refreshes every 5 minutes
                    </p>
                )}
            </section>
        </PageLayout>
    );
};

export default AiNews;
