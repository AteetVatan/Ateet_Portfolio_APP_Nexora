
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
};

const BlogPreview: React.FC = () => {
  // Example blog posts data - would come from a backend API in production
  const [posts] = useState<BlogPost[]>([
    {
      id: "building-rag-systems",
      title: "Building Production-Grade RAG Systems",
      excerpt: "How to develop retrieval-augmented generation systems that scale in enterprise environments",
      date: "2025-03-10",
      category: "LLM",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "langchain-vs-autogen",
      title: "LangChain vs AutoGen: When to Use Each Framework",
      excerpt: "A detailed comparison of two leading LLM frameworks and their use cases",
      date: "2025-02-21",
      category: "LLM",
      readTime: "6 min read"
    },
    {
      id: "multimodal-ai-models",
      title: "The Rise of Multimodal AI Models",
      excerpt: "How combining vision, text, and audio inputs is creating the next generation of AI applications",
      date: "2025-01-18",
      category: "Multimodal AI",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80"
    },
  ]);
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-[#090b10]">
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
        <Link 
          to={`/blog/${posts[0].id}`}
          className="cyber-card group flex flex-col relative overflow-hidden"
        >
          {posts[0].image && (
            <div className="relative w-full h-64 mb-6 overflow-hidden rounded">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent opacity-70 z-10"></div>
              <img 
                src={posts[0].image} 
                alt={posts[0].title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm">
                  {posts[0].category}
                </span>
              </div>
            </div>
          )}
          
          <div className="mb-2 text-xs font-mono text-[#85a5b3] flex items-center">
            <span>{formatDate(posts[0].date)}</span>
            <span className="mx-2">•</span>
            <span>{posts[0].readTime}</span>
          </div>
          
          <h3 className="font-mono text-2xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors">
            {posts[0].title}
          </h3>
          
          <p className="text-[#85a5b3] mb-4">
            {posts[0].excerpt}
          </p>
          
          <span className="cyber-link mt-auto">
            Read Article
          </span>
        </Link>
        
        {/* List of other posts */}
        <div className="space-y-6">
          {posts.slice(1).map(post => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="cyber-card group flex gap-6 p-4 h-auto"
            >
              {post.image && (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              
              <div className="flex flex-col">
                <div className="mb-1 text-xs font-mono text-[#85a5b3] flex items-center">
                  <span className="text-xs font-mono text-black bg-[#00c3ff] px-2 py-0.5 rounded-sm">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <h3 className="font-mono text-lg text-white group-hover:text-[#00c3ff] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-[#85a5b3] text-sm mt-1 line-clamp-2">
                  {post.excerpt}
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
