
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import BlogCard from '../components/BlogCard';
import { useStaticBlogPosts, prefetchAllBlogs } from '../hooks/use-static-blog-posts';
import { MoveRight, Search, Tag } from 'lucide-react';
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

// Prefetch all blogs when this file is loaded
prefetchAllBlogs();

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: posts, isLoading, error } = useStaticBlogPosts();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Pagination
  const postsPerPage = 6;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Set page title
  useEffect(() => {
    document.title = "Blog - Developer Portfolio";
  }, []);

  // Extract all unique tags from posts
  useEffect(() => {
    if (posts) {
      const tagsSet = new Set<string>();
      posts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      setAllTags(Array.from(tagsSet).sort());
    }
  }, [posts]);

  // Filter and paginate posts
  useEffect(() => {
    if (!posts) return;

    let result = [...posts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          (post.summary && post.summary.toLowerCase().includes(query)) ||
          (post.content && post.content.toLowerCase().includes(query))
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter(
        post => post.tags && post.tags.includes(selectedTag)
      );
    }

    // Calculate total pages
    setTotalPages(Math.max(1, Math.ceil(result.length / postsPerPage)));

    // Slice for current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setFilteredPosts(result.slice(startIndex, endIndex));
  }, [posts, searchQuery, selectedTag, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
    setSearchParams(prev => {
      if (prev.get('page')) {
        prev.set('page', '1');
      }
      return prev;
    });
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // First page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Ellipsis after first page
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Ellipsis before last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page (if more than one page)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed position grid background */}
      <GridBackground />

      {/* Navigation - mobile: top bar, desktop: sidebar */}
      <div className="hidden md:block md:fixed md:left-0 md:top-0 md:bottom-0 md:w-60 lg:w-64 z-20">
        <Navigation />
      </div>

      {/* Main content - centered with adjusted padding */}
      <main className="flex-grow w-full max-w-screen-2xl mx-auto md:pl-24 lg:pl-32 pb-20">
        <section className="py-16 px-6 md:px-16 lg:px-24">
          <div className="mb-12">
            <h1 className="font-mono text-3xl md:text-4xl text-white font-bold mb-4">
              THE <span className="text-[#00c3ff]">BLOG_</span>
            </h1>
            <p className="text-[#85a5b3] max-w-xl text-base">
              Technical articles on AI development, best practices, and emerging technologies.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-12 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#85a5b3] h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="bg-[#0c1824] border-[#1e3a4a] pl-9 text-[#a9c2d1]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center text-sm text-[#85a5b3] mr-1">
                  <Tag className="h-4 w-4 mr-1" /> Tags:
                </span>
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`
                      cursor-pointer transition-colors
                      ${selectedTag === tag
                        ? 'bg-[#00c3ff] text-black'
                        : 'bg-[#0c1824] text-[#4dabce] border-[#1e3a4a] hover:border-[#00c3ff]'}
                    `}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="terminal-section p-8 text-center">
              <div className="text-[#85a5b3] font-mono animate-pulse">
                Loading blog posts...
              </div>
            </div>
          ) : error ? (
            <div className="terminal-section p-8 text-center">
              <div className="text-[#ff3e3e] font-mono">
                Error loading blog posts. Please try again later.
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="terminal-section p-8 text-center">
              <div className="text-[#85a5b3] font-mono">
                No blog posts found matching your criteria.
              </div>
              <button
                className="mt-4 text-[#00c3ff] font-mono"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Blog post grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    featured={index === 0 && currentPage === 1}
                  />
                ))}
              </div>

              {/* Pagination */}
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

        <Footer />
      </main>
    </div>
  );
};

export default Blog;
