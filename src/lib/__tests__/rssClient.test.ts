/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { parseRss, mergeDedupeSort, type NewsItem } from '../rssClient';

// ─── Fixture XML ────────────────────────────────────────────

const RSS_WITH_ENCLOSURE = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Article with Enclosure</title>
      <link>https://example.com/article-1</link>
      <pubDate>Mon, 10 Feb 2025 10:00:00 GMT</pubDate>
      <description>This is a test article with an enclosure image.</description>
      <enclosure url="https://example.com/img1.jpg" type="image/jpeg" length="12345"/>
    </item>
  </channel>
</rss>`;

const RSS_WITH_MEDIA_THUMBNAIL = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Article with Media Thumbnail</title>
      <link>https://example.com/article-2</link>
      <pubDate>Tue, 11 Feb 2025 10:00:00 GMT</pubDate>
      <description>This article has a media:thumbnail.</description>
      <media:thumbnail url="https://example.com/thumb.jpg"/>
    </item>
  </channel>
</rss>`;

const RSS_NO_IMAGE = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Article without Image</title>
      <link>https://example.com/article-3</link>
      <pubDate>Wed, 12 Feb 2025 10:00:00 GMT</pubDate>
      <description>No image tags here.</description>
    </item>
  </channel>
</rss>`;

const ATOM_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Atom Feed</title>
  <entry>
    <title>Atom Article</title>
    <link href="https://example.com/atom-1" rel="alternate"/>
    <published>2025-02-13T10:00:00Z</published>
    <summary>This is an Atom feed entry.</summary>
  </entry>
</feed>`;

const RSS_WITH_HTML_DESCRIPTION = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Article with HTML in Description</title>
      <link>https://example.com/article-4</link>
      <pubDate>Thu, 13 Feb 2025 10:00:00 GMT</pubDate>
      <description><![CDATA[<p>Hello <strong>world</strong> &amp; friends</p>]]></description>
    </item>
  </channel>
</rss>`;

const FEED_SOURCE = { name: 'Test Source', url: 'https://example.com/feed', site: 'https://example.com' };

// ─── parseRss Tests ─────────────────────────────────────────

describe('parseRss', () => {
    it('extracts enclosure image from RSS item', () => {
        const items = parseRss(RSS_WITH_ENCLOSURE, FEED_SOURCE);
        expect(items).toHaveLength(1);
        expect(items[0].title).toBe('Article with Enclosure');
        expect(items[0].url).toBe('https://example.com/article-1');
        expect(items[0].imageUrl).toBe('https://example.com/img1.jpg');
        expect(items[0].source).toBe('Test Source');
    });

    it('extracts media:thumbnail image from RSS item', () => {
        const items = parseRss(RSS_WITH_MEDIA_THUMBNAIL, FEED_SOURCE);
        expect(items).toHaveLength(1);
        expect(items[0].imageUrl).toBe('https://example.com/thumb.jpg');
    });

    it('returns undefined imageUrl when no image tags present', () => {
        const items = parseRss(RSS_NO_IMAGE, FEED_SOURCE);
        expect(items).toHaveLength(1);
        expect(items[0].imageUrl).toBeUndefined();
    });

    it('parses Atom feed entries', () => {
        const items = parseRss(ATOM_FEED, FEED_SOURCE);
        expect(items).toHaveLength(1);
        expect(items[0].title).toBe('Atom Article');
        expect(items[0].url).toBe('https://example.com/atom-1');
        expect(items[0].snippet).toBe('This is an Atom feed entry.');
    });

    it('strips HTML from description', () => {
        const items = parseRss(RSS_WITH_HTML_DESCRIPTION, FEED_SOURCE);
        expect(items).toHaveLength(1);
        expect(items[0].snippet).toBe('Hello world & friends');
    });

    it('sets source and sourceUrl from feed metadata', () => {
        const items = parseRss(RSS_NO_IMAGE, FEED_SOURCE);
        expect(items[0].source).toBe('Test Source');
        expect(items[0].sourceUrl).toBe('https://example.com');
    });

    it('returns empty array for invalid XML', () => {
        const items = parseRss('not xml at all', FEED_SOURCE);
        expect(items).toEqual([]);
    });
});

// ─── mergeDedupeSort Tests ──────────────────────────────────

describe('mergeDedupeSort', () => {
    it('deduplicates items by URL', () => {
        const items: NewsItem[] = [
            { source: 'A', sourceUrl: 'https://a.com', title: 'Item 1', url: 'https://example.com/1', publishedAt: '2025-02-10T10:00:00Z' },
            { source: 'B', sourceUrl: 'https://b.com', title: 'Item 1 Dupe', url: 'https://example.com/1', publishedAt: '2025-02-10T10:00:00Z' },
            { source: 'A', sourceUrl: 'https://a.com', title: 'Item 2', url: 'https://example.com/2', publishedAt: '2025-02-11T10:00:00Z' },
        ];
        const result = mergeDedupeSort(items);
        expect(result).toHaveLength(2);
    });

    it('deduplicates URLs with trailing slash differences', () => {
        const items: NewsItem[] = [
            { source: 'A', sourceUrl: 'https://a.com', title: 'Item', url: 'https://example.com/article/', publishedAt: '2025-02-10T10:00:00Z' },
            { source: 'B', sourceUrl: 'https://b.com', title: 'Item Dupe', url: 'https://example.com/article', publishedAt: '2025-02-10T10:00:00Z' },
        ];
        const result = mergeDedupeSort(items);
        expect(result).toHaveLength(1);
    });

    it('sorts newest first', () => {
        const items: NewsItem[] = [
            { source: 'A', sourceUrl: 'https://a.com', title: 'Old', url: 'https://example.com/old', publishedAt: '2025-01-01T10:00:00Z' },
            { source: 'A', sourceUrl: 'https://a.com', title: 'New', url: 'https://example.com/new', publishedAt: '2025-02-15T10:00:00Z' },
            { source: 'A', sourceUrl: 'https://a.com', title: 'Mid', url: 'https://example.com/mid', publishedAt: '2025-02-01T10:00:00Z' },
        ];
        const result = mergeDedupeSort(items);
        expect(result[0].title).toBe('New');
        expect(result[1].title).toBe('Mid');
        expect(result[2].title).toBe('Old');
    });

    it('handles empty array', () => {
        expect(mergeDedupeSort([])).toEqual([]);
    });
});
