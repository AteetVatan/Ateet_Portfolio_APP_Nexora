/**
 * rssClient — Frontend-only RSS fetch + parse pipeline
 * No backend or Node modules required. Uses DOMParser + CORS proxy.
 */

import { AI_FEEDS, type FeedSource } from './aiFeeds';

// ─── Types ──────────────────────────────────────────────────

export type NewsItem = {
    source: string;
    sourceUrl: string;
    title: string;
    url: string;
    publishedAt: string; // ISO-ish
    snippet?: string;
    imageUrl?: string;
};

// ─── CORS Proxy Config (multi-proxy fallback) ───────────────

interface ProxyConfig {
    name: string;
    /** Build the proxied URL; `target` is already encoded */
    url: (encodedTarget: string) => string;
}

const PROXY_LIST: ProxyConfig[] = [
    {
        name: 'codetabs',
        url: (t) => `https://api.codetabs.com/v1/proxy?quest=${decodeURIComponent(t)}`,
    },
    {
        name: 'allorigins',
        url: (t) => `https://api.allorigins.win/raw?url=${t}`,
    },
    {
        name: 'corsproxy-org',
        url: (t) => `https://corsproxy.org/?url=${t}`,
    },
];

// Override: if VITE_CORS_PROXY is set, use only that and skip fallback
const ENV_PROXY = import.meta.env.VITE_CORS_PROXY as string | undefined;

// Track which proxy last succeeded so we try it first next time
let lastWorkingIdx = 0;

const DEBUG = import.meta.env.DEV;

function log(...args: unknown[]) {
    if (DEBUG) console.debug('[ai-news]', ...args);
}

// ─── Fetch Helpers ──────────────────────────────────────────

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        const res = await fetch(url, { signal: controller.signal });
        return res;
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Fetch RSS XML with cascading proxy fallback.
 * Tries the last-known-good proxy first, then cycles through the rest.
 */
export async function fetchRssXml(feedUrl: string): Promise<string> {
    // If env override, use only that
    if (ENV_PROXY) {
        return fetchViaProxy(ENV_PROXY + encodeURIComponent(feedUrl), feedUrl);
    }

    const encoded = encodeURIComponent(feedUrl);
    let lastError: unknown;

    // Build ordered list: start with lastWorkingIdx, then the rest
    const ordered = [
        ...PROXY_LIST.slice(lastWorkingIdx),
        ...PROXY_LIST.slice(0, lastWorkingIdx),
    ];

    for (let i = 0; i < ordered.length; i++) {
        const proxy = ordered[i];
        const url = proxy.url(encoded);
        try {
            const text = await fetchViaProxy(url, feedUrl);
            // Remember this proxy as working
            lastWorkingIdx = PROXY_LIST.indexOf(proxy);
            return text;
        } catch (err) {
            log(`✗ proxy ${proxy.name} failed for ${feedUrl}:`, err);
            lastError = err;
        }
    }
    throw lastError;
}

/** Single-proxy fetch with 1 retry */
async function fetchViaProxy(url: string, feedUrl: string): Promise<string> {
    let lastError: unknown;
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            const res = await fetchWithTimeout(url, 8000);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            if (!text.trim().startsWith('<')) {
                throw new Error('Response is not XML');
            }
            return text;
        } catch (err) {
            lastError = err;
            if (attempt === 0) {
                log(`Retry fetch for ${feedUrl}:`, err);
                await new Promise((r) => setTimeout(r, 500));
            }
        }
    }
    throw lastError;
}

// ─── RSS/Atom Parser ────────────────────────────────────────

function stripHtml(html: string): string {
    // Remove HTML tags, decode common entities, trim
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractImageFromXmlItem(item: Element): string | undefined {
    // Priority 1: <enclosure url="..." type="image/...">
    const enclosure = item.querySelector('enclosure');
    if (enclosure) {
        const type = enclosure.getAttribute('type') || '';
        const url = enclosure.getAttribute('url') || '';
        if (type.startsWith('image/') && isValidImageUrl(url)) return url;
        // Some feeds put image in enclosure without type
        if (!type && isValidImageUrl(url) && /\.(jpg|jpeg|png|gif|webp|svg)/i.test(url)) return url;
    }

    // Priority 2: <media:thumbnail url="...">
    const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];
    if (mediaThumbnail) {
        const url = mediaThumbnail.getAttribute('url') || '';
        if (isValidImageUrl(url)) return url;
    }

    // Priority 3: <media:content url="...">
    const mediaContents = item.getElementsByTagName('media:content');
    for (let i = 0; i < mediaContents.length; i++) {
        const mc = mediaContents[i];
        const medium = mc.getAttribute('medium') || '';
        const type = mc.getAttribute('type') || '';
        const url = mc.getAttribute('url') || '';
        if ((medium === 'image' || type.startsWith('image/')) && isValidImageUrl(url)) return url;
        // Fallback: if URL looks like an image
        if (isValidImageUrl(url) && /\.(jpg|jpeg|png|gif|webp|svg)/i.test(url)) return url;
    }

    // Priority 4: <img src="..."> in description HTML
    const desc =
        item.querySelector('description')?.textContent ||
        item.querySelector('content')?.textContent ||
        '';
    const imgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && isValidImageUrl(imgMatch[1])) return imgMatch[1];

    return undefined;
}

function isValidImageUrl(url: string): boolean {
    if (!url) return false;
    // Handle protocol-relative URLs
    if (url.startsWith('//')) return true;
    return url.startsWith('http://') || url.startsWith('https://');
}

function normalizeImageUrl(url: string | undefined): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('//')) return 'https:' + url;
    return url;
}

function parseDate(dateStr: string | null | undefined): string {
    if (!dateStr) return new Date(0).toISOString();
    try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) return d.toISOString();
    } catch {
        // fall through
    }
    return new Date(0).toISOString();
}

export function parseRss(xml: string, source: FeedSource): NewsItem[] {
    const items: NewsItem[] = [];

    try {
        const doc = new DOMParser().parseFromString(xml, 'text/xml');

        // Check for parser error
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
            log(`XML parse error for ${source.name}:`, parseError.textContent);
            return [];
        }

        // Try RSS 2.0 <item> elements
        const rssItems = Array.from(doc.querySelectorAll('item'));

        if (rssItems.length > 0) {
            for (const item of rssItems) {
                const title = item.querySelector('title')?.textContent?.trim();
                const link = item.querySelector('link')?.textContent?.trim();
                if (!title || !link) continue;

                const pubDate =
                    item.querySelector('pubDate')?.textContent ||
                    item.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'date')[0]?.textContent ||
                    null;

                const descEl = item.querySelector('description');
                const snippet = descEl?.textContent ? stripHtml(descEl.textContent) : undefined;

                const imageUrl = normalizeImageUrl(extractImageFromXmlItem(item));

                items.push({
                    source: source.name,
                    sourceUrl: source.site,
                    title,
                    url: link,
                    publishedAt: parseDate(pubDate),
                    snippet: snippet && snippet.length > 0 ? snippet.slice(0, 300) : undefined,
                    imageUrl,
                });
            }
        } else {
            // Try Atom <entry> elements
            const entries = Array.from(doc.querySelectorAll('entry'));
            for (const entry of entries) {
                const title = entry.querySelector('title')?.textContent?.trim();
                // Atom link: <link href="..." rel="alternate"> or first <link href="...">
                let link: string | undefined;
                const links = entry.querySelectorAll('link');
                for (let i = 0; i < links.length; i++) {
                    const l = links[i];
                    const rel = l.getAttribute('rel');
                    const href = l.getAttribute('href');
                    if (href && (!rel || rel === 'alternate')) {
                        link = href;
                        break;
                    }
                }
                if (!link && links.length > 0) {
                    link = links[0].getAttribute('href') || undefined;
                }
                if (!title || !link) continue;

                const pubDate =
                    entry.querySelector('published')?.textContent ||
                    entry.querySelector('updated')?.textContent ||
                    null;

                const summaryEl =
                    entry.querySelector('summary') || entry.querySelector('content');
                const snippet = summaryEl?.textContent
                    ? stripHtml(summaryEl.textContent)
                    : undefined;

                const imageUrl = normalizeImageUrl(extractImageFromXmlItem(entry));

                items.push({
                    source: source.name,
                    sourceUrl: source.site,
                    title,
                    url: link,
                    publishedAt: parseDate(pubDate),
                    snippet: snippet && snippet.length > 0 ? snippet.slice(0, 300) : undefined,
                    imageUrl,
                });
            }
        }
    } catch (err) {
        log(`Failed to parse feed ${source.name}:`, err);
    }

    return items;
}

// ─── Merge & Dedupe ─────────────────────────────────────────

export function mergeDedupeSort(allItems: NewsItem[]): NewsItem[] {
    const seen = new Map<string, NewsItem>();
    for (const item of allItems) {
        // Dedupe by URL
        const key = item.url.replace(/\/$/, '').toLowerCase();
        if (!seen.has(key)) {
            seen.set(key, item);
        }
    }
    // Sort newest first
    return Array.from(seen.values()).sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

// ─── OG Image Enrichment ────────────────────────────────────

const OG_CACHE_KEY = 'ai_news_og_cache_v1';
const OG_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface OgCacheEntry {
    imageUrl: string | null;
    timestamp: number;
}

function getOgCache(): Record<string, OgCacheEntry> {
    try {
        const raw = localStorage.getItem(OG_CACHE_KEY);
        if (!raw) return {};
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

function setOgCache(cache: Record<string, OgCacheEntry>) {
    try {
        localStorage.setItem(OG_CACHE_KEY, JSON.stringify(cache));
    } catch {
        // localStorage full — ignore
    }
}

async function fetchOgImage(articleUrl: string): Promise<string | null> {
    try {
        const proxyUrl = ENV_PROXY
            ? ENV_PROXY + encodeURIComponent(articleUrl)
            : PROXY_LIST[lastWorkingIdx].url(encodeURIComponent(articleUrl));
        const res = await fetchWithTimeout(proxyUrl, 2500);
        if (!res.ok) return null;
        const html = await res.text();

        // og:image
        const ogMatch = html.match(
            /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
        ) || html.match(
            /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
        );
        if (ogMatch && isValidImageUrl(ogMatch[1])) return normalizeImageUrl(ogMatch[1]) || null;

        // twitter:image fallback
        const twMatch = html.match(
            /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
        ) || html.match(
            /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
        );
        if (twMatch && isValidImageUrl(twMatch[1])) return normalizeImageUrl(twMatch[1]) || null;

        return null;
    } catch {
        return null;
    }
}

export async function enrichImages(items: NewsItem[]): Promise<NewsItem[]> {
    const cache = getOgCache();
    const now = Date.now();
    const result = [...items];

    // Only enrich top 10 items that are missing images
    const toEnrich = result
        .filter((item) => !item.imageUrl)
        .slice(0, 10);

    const promises = toEnrich.map(async (item) => {
        const cached = cache[item.url];
        if (cached && now - cached.timestamp < OG_TTL) {
            if (cached.imageUrl) item.imageUrl = cached.imageUrl;
            return;
        }

        const ogImage = await fetchOgImage(item.url);
        cache[item.url] = { imageUrl: ogImage, timestamp: now };
        if (ogImage) item.imageUrl = ogImage;
    });

    await Promise.allSettled(promises);

    // Prune expired cache entries
    const pruned: Record<string, OgCacheEntry> = {};
    for (const [key, entry] of Object.entries(cache)) {
        if (now - entry.timestamp < OG_TTL) {
            pruned[key] = entry;
        }
    }
    setOgCache(pruned);

    return result;
}

// ─── Client Cache (stale-while-revalidate) ──────────────────

const CACHE_KEY = 'ai_news_cache_v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheData {
    updatedAt: number;
    items: NewsItem[];
}

export function getCachedNews(): CacheData | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const data: CacheData = JSON.parse(raw);
        return data;
    } catch {
        return null;
    }
}

export function isCacheFresh(): boolean {
    const cached = getCachedNews();
    if (!cached) return false;
    return Date.now() - cached.updatedAt < CACHE_TTL;
}

function setCachedNews(items: NewsItem[]) {
    try {
        const data: CacheData = { updatedAt: Date.now(), items };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
        // localStorage full — ignore
    }
}

// ─── Main Fetch Pipeline ────────────────────────────────────

export async function fetchAllNews(): Promise<NewsItem[]> {
    const allItems: NewsItem[] = [];
    let successCount = 0;
    let failCount = 0;

    const results = await Promise.allSettled(
        AI_FEEDS.map(async (feed) => {
            try {
                const xml = await fetchRssXml(feed.url);
                const items = parseRss(xml, feed);
                log(`✓ ${feed.name}: ${items.length} items`);
                successCount++;
                return items;
            } catch (err) {
                log(`✗ ${feed.name}:`, err);
                failCount++;
                return [];
            }
        })
    );

    for (const result of results) {
        if (result.status === 'fulfilled') {
            allItems.push(...result.value);
        }
    }

    const merged = mergeDedupeSort(allItems);
    log(`Merged: ${merged.length} items (${successCount} feeds ok, ${failCount} failed)`);

    // Cache results
    setCachedNews(merged);

    return merged;
}
