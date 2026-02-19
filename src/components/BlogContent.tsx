import React, { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import MermaidDiagram from './MermaidDiagram';

/**
 * BlogContent — renders blog post markdown with Monolith prose styling.
 * Mermaid code blocks are rendered inline at their correct position.
 */
interface BlogContentProps {
  content: string;
}

/** A sentinel placed where each mermaid block was extracted */
const MERMAID_SENTINEL = '<!--MERMAID_PLACEHOLDER_';

type Segment =
  | { type: 'html'; html: string }
  | { type: 'mermaid'; code: string };

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const segments: Segment[] = useMemo(() => {
    if (!content) return [];

    // 1. Extract mermaid code blocks → replace with sentinel comments
    const diagrams: string[] = [];
    const mermaidRegex = /```mermaid\r?\n([\s\S]*?)```/g;

    const stripped = content.replace(mermaidRegex, (_match, code: string) => {
      const idx = diagrams.length;
      diagrams.push(code.trim());
      return `${MERMAID_SENTINEL}${idx}-->`;
    });

    // 2. Parse remaining markdown → HTML
    const html = marked.parse(stripped);
    if (typeof html !== 'string') return [];

    // 3. Split the HTML on the sentinels to produce interleaved segments
    const parts = html.split(/<!--MERMAID_PLACEHOLDER_(\d+)-->/);
    const result: Segment[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // HTML segment (may be empty between consecutive diagrams)
        if (parts[i].trim()) {
          result.push({ type: 'html', html: parts[i] });
        }
      } else {
        // Mermaid diagram index
        const idx = parseInt(parts[i], 10);
        if (diagrams[idx]) {
          result.push({ type: 'mermaid', code: diagrams[idx] });
        }
      }
    }

    return result;
  }, [content]);

  return (
    <div className="prose prose-monolith max-w-none">
      {segments.map((seg, i) =>
        seg.type === 'html' ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: seg.html }} />
        ) : (
          <MermaidDiagram key={i} chart={seg.code} />
        )
      )}
    </div>
  );
};

export default BlogContent;
