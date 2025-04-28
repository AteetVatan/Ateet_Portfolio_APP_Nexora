
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogContent from '../components/BlogContent';
import { useBlogPostBySlug } from '../hooks/use-blog-posts';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '../components/layout/PageLayout';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    data: post, 
    isLoading, 
    error, 
    isError 
  } = useBlogPostBySlug(slug || '');
  
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/blog');
  };
  
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Blog`;
    } else {
      document.title = "Blog Post - Developer Portfolio";
    }
  }, [post]);
  
  useEffect(() => {
    if (!isLoading && !post && !isError) {
      toast({
        title: "Blog post not found",
        description: "The blog post you're looking for doesn't exist or has been removed.",
        variant: "destructive",
      });
      navigate('/blog', { replace: true });
    }
  }, [post, isLoading, isError, navigate, toast]);
  
  return (
    <PageLayout>
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="mb-8">
          <Button 
            variant="link" 
            className="inline-flex items-center text-[#00c3ff] hover:text-[#00c3ff]/80 transition-colors p-0 h-auto"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Button>
        </div>
        
        {isLoading ? (
          <div className="terminal-section p-8 text-center">
            <div className="text-[#85a5b3] font-mono animate-pulse">
              Loading blog post...
            </div>
          </div>
        ) : error ? (
          <div className="terminal-section p-8 text-center">
            <div className="text-[#ff3e3e] font-mono">
              Error loading blog post. Please try again later.
            </div>
            <Button 
              className="mt-4 bg-[#1291c7] hover:bg-[#00c3ff] text-white"
              onClick={() => navigate('/blog')}
            >
              Return to blog
            </Button>
          </div>
        ) : post ? (
          <BlogContent post={post} />
        ) : null}
      </section>
    </PageLayout>
  );
};

export default BlogPost;
