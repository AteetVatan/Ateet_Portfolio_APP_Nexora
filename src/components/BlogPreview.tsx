import React from 'react';
import { Link } from 'react-router-dom';
import { useStaticBlogPosts } from "../hooks/use-static-blog-posts";
import { BlogPost } from "@/types";

const BlogPreview: React.FC = () => {
  const { data: posts, isLoading } = useStaticBlogPosts();

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="text-[#85a5b3]">Loading posts...</div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="text-[#85a5b3]">No posts available.</div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 md:px-16 lg:px-24">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-4">
            LATEST <span className="text-[#00c3ff]">INSIGHTS_</span>
          </h2>
          <p className="text-[#85a5b3] max-w-xl text-base">
            Technical articles on AI development, best practices, and emerging technologies.
          </p>
        </div>

        <Link to="/blog" className="neon-button mt-6 md:mt-0">
          ALL ARTICLES
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured post (larger) */}
        {posts[0] && (
          <Link
            to={`/blog/${posts[0].slug}`}
            className="cyber-card group flex flex-col relative overflow-hidden"
          >
            {posts[0].image_url && (
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent opacity-70 z-10"></div>
                <img
                  src={posts[0].image_url}
                  alt={posts[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm">
                    {posts[0].tags?.[0] || 'Tech'}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-2 text-xs font-mono text-[#85a5b3] flex items-center">
              <span>{formatDate(posts[0].created_at)}</span>
              <span className="mx-2">•</span>
              <span>{Math.ceil(posts[0].content.length / 1500)} min read</span>
            </div>

            <h3 className="font-mono text-2xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors">
              {posts[0].title}
            </h3>

            <p className="text-[#85a5b3] mb-4">
              {posts[0].summary}
            </p>

            <span className="cyber-link mt-auto">
              Read Article
            </span>
          </Link>
        )}

        {/* List of other posts */}
        <div className="space-y-6">
          {posts.slice(1, 3).map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="cyber-card group flex gap-6 p-4 h-auto"
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
                <div className="mb-1 text-xs font-mono text-[#85a5b3] flex items-center">
                  <span className="text-xs font-mono text-black bg-[#00c3ff] px-2 py-0.5 rounded-sm">
                    {post.tags?.[0] || 'Tech'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>

                <h3 className="font-mono text-lg text-white group-hover:text-[#00c3ff] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[#85a5b3] text-sm mt-1 line-clamp-2">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}

          <Link
            to="/blog"
            className="terminal-section flex justify-center items-center py-4 hover:border-[#00c3ff] transition-colors"
          >
            <span className="font-mono text-[#00c3ff]">View All Articles</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
