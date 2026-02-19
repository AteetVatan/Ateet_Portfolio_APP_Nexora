
import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import BlogCard from '../components/BlogCard';
import { useStaticBlogPosts, prefetchAllBlogs } from '../hooks/use-static-blog-posts';
import { Search, Tag } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { BlogPost } from '@/types';

prefetchAllBlogs();

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: posts, isLoading, error } = useStaticBlogPosts();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const postsPerPage = 6;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState<number>(1);



  useEffect(() => {
    if (posts) {
      const tagsSet = new Set<string>();
      posts.forEach(post => { if (post.tags) post.tags.forEach(tag => tagsSet.add(tag)); });
      setAllTags(Array.from(tagsSet).sort());
    }
  }, [posts]);

  useEffect(() => {
    if (!posts) return;
    let result = [...posts];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        (post.summary && post.summary.toLowerCase().includes(query)) ||
        (post.content && post.content.toLowerCase().includes(query))
      );
    }
    if (selectedTag) {
      result = result.filter(post => post.tags && post.tags.includes(selectedTag));
    }
    setTotalPages(Math.max(1, Math.ceil(result.length / postsPerPage)));
    const startIndex = (currentPage - 1) * postsPerPage;
    setFilteredPosts(result.slice(startIndex, startIndex + postsPerPage));
  }, [posts, searchQuery, selectedTag, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams(prev => { prev.set('page', page.toString()); return prev; });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
    setSearchParams(prev => { if (prev.get('page')) prev.set('page', '1'); return prev; });
  };

  const renderPaginationItems = () => {
    const items = [];
    items.push(
      <PaginationItem key="first">
        <PaginationLink isActive={currentPage === 1} onClick={() => handlePageChange(1)}>1</PaginationLink>
      </PaginationItem>
    );
    if (currentPage > 3) items.push(<PaginationItem key="e1"><PaginationEllipsis /></PaginationItem>);
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={currentPage === i} onClick={() => handlePageChange(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    if (currentPage < totalPages - 2) items.push(<PaginationItem key="e2"><PaginationEllipsis /></PaginationItem>);
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink isActive={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <PageLayout>
      <SEOHead
        title="Blog"
        description="Technical articles on AI engineering, LLM architecture, and modern full-stack development by Ateet Vatan."
      />
      <section className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
            The <span className="highlight">Blog</span>
          </h1>
          <p className="max-w-xl text-base" style={{ color: 'var(--mono-muted)' }}>
            Technical articles on AI development, best practices, and emerging technologies.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--mono-muted)' }} />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-9"
              style={{ background: 'var(--mono-surface)', borderColor: 'var(--mono-border)', color: 'var(--mono-text)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center text-sm mr-1" style={{ color: 'var(--mono-muted)' }}>
                <Tag className="h-4 w-4 mr-1" /> Tags:
              </span>
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  style={selectedTag === tag
                    ? { background: 'var(--mono-primary)', color: '#fff' }
                    : { background: 'var(--mono-surface)', color: 'var(--mono-muted)', borderColor: 'var(--mono-border)' }
                  }
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="surface-card p-8 text-center">
            <div className="animate-pulse" style={{ color: 'var(--mono-muted)' }}>Loading blog posts...</div>
          </div>
        ) : error ? (
          <div className="surface-card p-8 text-center">
            <div style={{ color: 'hsl(var(--destructive))' }}>Error loading blog posts. Please try again later.</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="surface-card p-8 text-center">
            <div style={{ color: 'var(--mono-muted)' }}>No blog posts found matching your criteria.</div>
            <button
              className="mt-4 font-mono"
              style={{ color: 'var(--mono-primary)' }}
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary || ''}
                  slug={post.slug}
                  imageUrl={post.image_url}
                  tags={post.tags}
                  createdAt={post.created_at}
                  content={post.content}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </section>
    </PageLayout>
  );
};

export default Blog;
