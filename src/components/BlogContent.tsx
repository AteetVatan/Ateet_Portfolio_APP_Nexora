
import React, { useMemo } from 'react';
import { BlogPost } from '@/types';
import { Badge } from './ui/badge';
import { CalendarClock, Clock } from 'lucide-react';
import { marked } from 'marked';
import MermaidDiagram from './MermaidDiagram';

// Configure marked for GFM (tables, strikethrough, etc.)
marked.setOptions({
  gfm: true,
  breaks: true,
});

interface BlogContentProps {
  post: BlogPost;
}

/** Regex to match fenced mermaid code blocks: ```mermaid ... ``` */
const MERMAID_BLOCK_RE = /```mermaid\s*\n([\s\S]*?)```/g;

type ContentSegment =
  | { type: 'text'; value: string }
  | { type: 'mermaid'; value: string };

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Estimate read time
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Convert markdown content to HTML using the marked library
  const formatContent = (content: string): string => {
    return marked.parse(content, { async: false }) as string;
  };

  /**
   * Split content into text and mermaid segments.
   * Mermaid blocks are detected via fenced ```mermaid ``` code blocks.
   */
  const segments: ContentSegment[] = useMemo(() => {
    const result: ContentSegment[] = [];
    const content = post.content;
    let lastIndex = 0;

    // Reset regex state
    MERMAID_BLOCK_RE.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = MERMAID_BLOCK_RE.exec(content)) !== null) {
      // Add text before this mermaid block
      if (match.index > lastIndex) {
        result.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      }
      // Add the mermaid block content (captured group 1)
      result.push({ type: 'mermaid', value: match[1] });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after the last mermaid block
    if (lastIndex < content.length) {
      result.push({ type: 'text', value: content.slice(lastIndex) });
    }

    // If no mermaid blocks found, return the whole content as text
    if (result.length === 0) {
      result.push({ type: 'text', value: content });
    }

    return result;
  }, [post.content]);

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-mono text-white mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6 text-[#85a5b3] text-sm">
          <div className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{estimateReadTime(post.content)}</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-[#0c1824] text-[#4dabce] border-[#1e3a4a]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {post.image_url && (
          <div className="mt-6 mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </header>

      {/* Content — rendered as a mix of formatted HTML and Mermaid diagrams */}
      <div className="prose prose-invert prose-cyber max-w-none">
        {segments.map((segment, i) =>
          segment.type === 'mermaid' ? (
            <MermaidDiagram key={`mermaid-${i}`} chart={segment.value} />
          ) : (
            <div
              key={`text-${i}`}
              dangerouslySetInnerHTML={{ __html: formatContent(segment.value) }}
            />
          )
        )}
      </div>
    </article>
  );
};

export default BlogContent;
