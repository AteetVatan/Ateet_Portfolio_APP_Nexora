import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BlogCard — Monolith blog card component
 */
interface BlogCardProps {
  title: string;
  summary: string;
  slug: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  content?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  summary,
  slug,
  imageUrl,
  tags,
  createdAt,
  content,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const readTime = content ? Math.ceil(content.length / 1500) : 3;

  return (
    <Link
      to={`/blog/${slug}`}
      className="monolith-card group block overflow-hidden"
      style={{ textDecoration: 'none' }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {tags && tags[0] && (
            <div className="absolute top-4 left-4 z-10">
              <span className="tag" style={{ background: 'var(--mono-primary)', color: '#fff', borderColor: 'transparent' }}>
                {tags[0]}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center text-xs font-mono mb-3 gap-2" style={{ color: 'var(--mono-muted)' }}>
          <span>{formatDate(createdAt)}</span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>

        <h3 className="font-heading text-xl mb-2 transition-colors group-hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
          {title}
        </h3>

        <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--mono-muted)' }}>
          {summary}
        </p>

        <span className="project-link">
          Read Article
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
