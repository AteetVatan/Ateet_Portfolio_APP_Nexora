
import React from 'react';
import { BlogPost } from '@/types';
import { Badge } from './ui/badge';
import { CalendarClock, Clock } from 'lucide-react';

interface BlogContentProps {
  post: BlogPost;
}

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

  // Convert newlines to <br> and handle markdown-like formatting
  const formatContent = (content: string) => {
    // First, split by double newlines for paragraphs
    let formatted = content.split('\n\n').map((paragraph, idx) => {
      // Handle headers (markdown style)
      if (paragraph.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold my-6">${paragraph.substring(2)}</h1>`;
      } else if (paragraph.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold my-5">${paragraph.substring(3)}</h2>`;
      } else if (paragraph.startsWith('### ')) {
        return `<h3 class="text-xl font-bold my-4">${paragraph.substring(4)}</h3>`;
      } else if (paragraph.startsWith('- ')) {
        // Handle bullet lists
        const items = paragraph.split('\n- ').map(item =>
          item.startsWith('- ') ? item.substring(2) : item
        );
        return `<ul class="list-disc pl-5 my-4 space-y-2">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
      } else {
        // Regular paragraph with single newlines converted to <br>
        return `<p class="my-4">${paragraph.replace(/\n/g, '<br>')}</p>`;
      }
    }).join('');

    // Bold (**text**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return formatted;
  };

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

      {/* Content */}
      <div
        className="prose prose-invert max-w-none text-[#a9c2d1]"
        dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
      />
    </article>
  );
};

export default BlogContent;
