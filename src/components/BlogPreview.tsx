import React from 'react';
import { Link } from 'react-router-dom';
import { useStaticBlogPosts } from "../hooks/use-static-blog-posts";

/**
 * BlogPreview — Monolith blog preview for home page
 * Featured post + secondary posts in clean surface cards
 */
const BlogPreview: React.FC = () => {
  const { data: posts, isLoading } = useStaticBlogPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
        <div style={{ color: 'var(--mono-muted)' }}>Loading posts...</div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
        <div style={{ color: 'var(--mono-muted)' }}>No posts available.</div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
            Latest <span className="highlight">Insights</span>
          </h2>
          <p className="max-w-xl text-base" style={{ color: 'var(--mono-muted)' }}>
            Technical articles on AI development, best practices, and emerging technologies.
          </p>
        </div>

        <Link to="/blog" className="btn-primary mt-6 md:mt-0">
          All Articles →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured post (larger) */}
        {posts[0] && (
          <Link
            to={`/blog/${posts[0].slug}`}
            className="monolith-card group flex flex-col relative overflow-hidden p-0"
          >
            {posts[0].image_url && (
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={posts[0].image_url}
                  alt={posts[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="tag" style={{ background: 'var(--mono-primary)', color: '#fff', borderColor: 'transparent' }}>
                    {posts[0].tags?.[0] || 'Tech'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="mb-2 text-xs font-mono flex items-center" style={{ color: 'var(--mono-muted)' }}>
                <span>{formatDate(posts[0].created_at)}</span>
                <span className="mx-2">•</span>
                <span>{Math.ceil(posts[0].content.length / 1500)} min read</span>
              </div>

              <h3 className="font-heading text-2xl mb-2 transition-colors group-hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
                {posts[0].title}
              </h3>

              <p className="mb-4" style={{ color: 'var(--mono-muted)' }}>
                {posts[0].summary}
              </p>

              <span className="project-link mt-auto">
                Read Article →
              </span>
            </div>
          </Link>
        )}

        {/* List of other posts */}
        <div className="space-y-6">
          {posts.slice(1, 3).map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="monolith-card group flex gap-6 p-4 h-auto"
            >
              {post.image_url && (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <div className="mb-1 text-xs font-mono flex items-center" style={{ color: 'var(--mono-muted)' }}>
                  <span className="tag" style={{ background: 'var(--mono-primary)', color: '#fff', borderColor: 'transparent', fontSize: '10px', padding: '2px 8px' }}>
                    {post.tags?.[0] || 'Tech'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>

                <h3 className="font-heading text-lg transition-colors group-hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
                  {post.title}
                </h3>

                <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--mono-muted)' }}>
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}

          <Link
            to="/blog"
            className="surface-card flex justify-center items-center py-4 transition-colors"
            style={{ borderColor: 'var(--mono-border)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)'; }}
          >
            <span className="font-mono" style={{ color: 'var(--mono-primary)' }}>View All Articles →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
