import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Ateet Vatan';
const BASE_URL = 'https://ateet.masxai.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/icon-og.png`;

interface SEOHeadProps {
    title: string;
    description: string;
    /** Override the canonical path (defaults to current route) */
    canonicalPath?: string;
    ogImage?: string;
    /** Robots directive, e.g. "noindex,nofollow" for 404 pages */
    robots?: string;
    /** OG type override — defaults to "website" */
    ogType?: string;
    /** JSON-LD structured data object(s) to inject into the page */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * SEOHead — Manages per-page <head> meta tags for SEO.
 * Sets title, meta description, canonical link, Open Graph, Twitter Card,
 * robots directive, and injects JSON-LD structured data.
 */
const SEOHead: React.FC<SEOHeadProps> = ({
    title, description, canonicalPath, ogImage, robots, ogType, jsonLd,
}) => {
    const { pathname } = useLocation();
    const canonical = `${BASE_URL}${canonicalPath ?? pathname}`;
    const fullTitle = pathname === '/' ? title : `${title} | ${SITE_NAME}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;

    useEffect(() => {
        document.title = fullTitle;

        const setMeta = (attr: string, key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const setLink = (rel: string, href: string) => {
            let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
            if (!el) {
                el = document.createElement('link');
                el.setAttribute('rel', rel);
                document.head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        // Standard meta
        setMeta('name', 'description', description);

        // Robots
        setMeta('name', 'robots', robots ?? 'index,follow');

        // Canonical
        setLink('canonical', canonical);

        // Open Graph
        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', canonical);
        setMeta('property', 'og:image', image);
        setMeta('property', 'og:type', ogType ?? 'website');
        setMeta('property', 'og:site_name', SITE_NAME);

        // Twitter Card
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', fullTitle);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', image);

        // JSON-LD structured data
        const JSON_LD_ID = 'seo-head-jsonld';
        const existingScript = document.getElementById(JSON_LD_ID);
        if (jsonLd) {
            const data = Array.isArray(jsonLd)
                ? { '@context': 'https://schema.org', '@graph': jsonLd }
                : { '@context': 'https://schema.org', ...jsonLd };

            if (existingScript) {
                existingScript.textContent = JSON.stringify(data);
            } else {
                const script = document.createElement('script');
                script.id = JSON_LD_ID;
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(data);
                document.head.appendChild(script);
            }
        } else if (existingScript) {
            existingScript.remove();
        }
    }, [fullTitle, description, canonical, image, robots, ogType, jsonLd]);

    return null;
};

export default SEOHead;
