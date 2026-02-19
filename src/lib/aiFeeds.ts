/**
 * AI News Feed Sources
 * Verified working through AllOrigins CORS proxy (2026-02-19)
 */

export interface FeedSource {
    name: string;
    url: string;
    site: string;
}

export const AI_FEEDS: FeedSource[] = [
    // ✅ Verified working
    { name: "OpenAI News", url: "https://openai.com/news/rss.xml", site: "https://openai.com" },
    { name: "Google Blog", url: "https://blog.google/feed/", site: "https://blog.google" },
    { name: "Google AI Research", url: "https://research.google/blog/rss/", site: "https://research.google" },
    { name: "DeepMind Blog", url: "https://deepmind.com/blog/feed/basic", site: "https://deepmind.google" },
    { name: "The Verge — AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", site: "https://www.theverge.com" },
    { name: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/technology-lab", site: "https://arstechnica.com" },
    { name: "TechCrunch — AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", site: "https://techcrunch.com" },
    // ⚠️ Unreliable — may timeout through proxy
    { name: "MIT News — AI", url: "https://news.mit.edu/topic/mitartificial-intelligence2-rss.xml", site: "https://news.mit.edu" },
];
