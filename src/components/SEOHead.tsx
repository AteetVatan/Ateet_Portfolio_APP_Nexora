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
}

/**
 * SEOHead — Manages per-page <head> meta tags for SEO.
 * Sets title, meta description, canonical link, Open Graph, and Twitter Card tags.
 */
const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonicalPath, ogImage }) => {
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

        // Canonical
        setLink('canonical', canonical);

        // Open Graph
        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', canonical);
        setMeta('property', 'og:image', image);
        setMeta('property', 'og:type', 'website');

        // Twitter Card
        setMeta('name', 'twitter:title', fullTitle);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', image);
    }, [fullTitle, description, canonical, image]);

    return null;
};

export default SEOHead;
