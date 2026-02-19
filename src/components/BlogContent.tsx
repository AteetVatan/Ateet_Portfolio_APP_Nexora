import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import MermaidDiagram from './MermaidDiagram';

/**
 * BlogContent — renders blog post markdown with Monolith prose styling
 */
interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [mermaidDiagrams, setMermaidDiagrams] = useState<{ id: string; code: string }[]>([]);

  useEffect(() => {
    // Extract mermaid code blocks and replace with placeholders
    const diagrams: { id: string; code: string }[] = [];
    let processed = content;

    const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
    let match;
    let index = 0;

    while ((match = mermaidRegex.exec(content)) !== null) {
      const id = `mermaid-${index}`;
      const code = match[1].trim();
      diagrams.push({ id, code });
      processed = processed.replace(match[0], `<div id="${id}" class="mermaid-placeholder"></div>`);
      index++;
    }

    setMermaidDiagrams(diagrams);

    // Parse remaining markdown
    const html = marked.parse(processed);
    if (typeof html === 'string') {
      setProcessedContent(html);
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-monolith max-w-none"
    >
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />

      {/* Render mermaid diagrams */}
      {mermaidDiagrams.map((diagram) => (
        <MermaidDiagram key={diagram.id} chart={diagram.code} />
      ))}
    </div>
  );
};

export default BlogContent;
