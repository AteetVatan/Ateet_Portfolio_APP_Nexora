
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { CalendarClock, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  // Format date to display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Estimate read time based on content length (rough estimate)
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`cyber-card group flex flex-col overflow-hidden ${featured ? 'col-span-2 row-span-2' : ''
        }`}
    >
      {post.image_url && (
        <div className={`relative w-full overflow-hidden rounded mb-4 ${featured ? 'h-64' : 'h-48'
          }`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent z-10"></div>
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {featured && (
            <div className="absolute top-3 right-3 text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm z-20">
              Featured
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-[#85a5b3] mb-2">
        <div className="flex items-center gap-1">
          <CalendarClock className="w-3 h-3" />
          <span>{formatDate(post.created_at)}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{estimateReadTime(post.content)}</span>
        </div>
      </div>

      <h3 className={`font-mono ${featured ? 'text-2xl' : 'text-xl'
        } text-white mb-2 group-hover:text-[#00c3ff] transition-colors line-clamp-2`}>
        {post.title}
      </h3>

      {post.summary && (
        <p className="text-[#85a5b3] mb-4 text-sm line-clamp-3">
          {post.summary}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {post.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-[#0c1824] text-[#4dabce] border-[#1e3a4a]">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="bg-[#0c1824] text-[#4dabce] border-[#1e3a4a]">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      <div className="cyber-link mt-auto">
        Read Article
      </div>
    </Link>
  );
};

export default BlogCard;
