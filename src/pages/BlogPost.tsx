
import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useParams, useNavigate } from 'react-router-dom';
import BlogContent from '../components/BlogContent';
import { useStaticBlogPost } from '../hooks/use-static-blog-posts';
import { ArrowLeft } from '@phosphor-icons/react';
import { Button } from '../components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '../components/layout/PageLayout';
import { BlogPost as BlogPostType } from '@/types';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: post, isLoading, error } = useStaticBlogPost(slug || '');

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/blog');
  };



  useEffect(() => {
    if (!isLoading && !post && !error) {
      toast({ title: "Blog post not found", description: `The blog post "${slug}" doesn't exist or has been removed.`, variant: "destructive" });
      const redirectTimer = setTimeout(() => navigate('/blog', { replace: true }), 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [post, isLoading, error, navigate, toast, slug]);

  return (
    <PageLayout>
      <SEOHead
        title={post ? `${post.title} | Blog` : 'Blog Post'}
        description={post?.summary || 'Read this blog post by Ateet Vatan on AI engineering and development.'}
        ogType={post ? 'article' : 'website'}
        jsonLd={post ? {
          '@type': 'Article',
          headline: post.title,
          description: post.summary || '',
          datePublished: post.created_at,
          author: { '@type': 'Person', name: 'Ateet Vatan', url: 'https://ateet.masxai.com' },
          publisher: { '@type': 'Person', name: 'Ateet Vatan' },
          mainEntityOfPage: `https://ateet.masxai.com/blog/${slug}`,
        } : undefined}
      />
      <section className="py-20 px-6 md:px-16 lg:px-24 max-w-[900px] mx-auto">
        <div className="mb-8">
          <Button
            variant="link"
            className="inline-flex items-center transition-colors p-0 h-auto"
            style={{ color: 'var(--mono-primary)' }}
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Button>
        </div>

        {isLoading ? (
          <div className="surface-card p-8 text-center">
            <div className="animate-pulse" style={{ color: 'var(--mono-muted)' }}>Loading blog post...</div>
          </div>
        ) : error ? (
          <div className="surface-card p-8 text-center">
            <div style={{ color: 'hsl(var(--destructive))' }}>Error loading blog post. Please try again later.</div>
            <Button className="mt-4 btn-primary" onClick={() => navigate('/blog')}>Return to blog</Button>
          </div>
        ) : post ? (
          <article>
            <header className="mb-10">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm font-mono mb-4" style={{ color: 'var(--mono-muted)' }}>
                <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {post.content && <span>· {Math.ceil(post.content.length / 1500)} min read</span>}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, i: number) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </header>
            <BlogContent content={post.content || ''} />
          </article>
        ) : (
          <div className="surface-card p-8 text-center">
            <div style={{ color: 'hsl(var(--destructive))' }}>Blog post not found</div>
            <Button className="mt-4 btn-primary" onClick={() => navigate('/blog')}>Return to blog</Button>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default BlogPost;
