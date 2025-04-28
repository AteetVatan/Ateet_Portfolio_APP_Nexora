import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabaseService } from '../services/supabase.service'
import { BlogSearch } from '../components/BlogSearch'
import type { Database } from '../types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [allTags, setAllTags] = useState<string[]>([])
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search')
    const limit = 6

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                setError(null)

                const { data, total } = await supabaseService.getPublishedBlogPosts({ page, limit })
                if (data) {
                    // Apply search filter if search query exists
                    let filteredData = data
                    if (searchQuery) {
                        filteredData = data.filter(post =>
                            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                    }
                    setPosts(filteredData)
                    setTotal(filteredData.length)

                    // Extract unique tags from all posts
                    const tags = new Set<string>()
                    data.forEach(post => {
                        post.tags?.forEach(tag => tags.add(tag))
                    })
                    setAllTags(Array.from(tags))
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch blog posts')
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [page, searchQuery])

    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags?.includes(selectedTag))
        : posts

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-gray-600 mb-8">
                    Thoughts, tutorials, and insights about web development and technology.
                </p>
                <BlogSearch />
            </div>

            {/* Search Results Info */}
            {searchQuery && (
                <div className="mb-8 text-center">
                    <p className="text-gray-600">
                        Showing results for: <span className="font-semibold">{searchQuery}</span>
                    </p>
                    <Link
                        to="/blog"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Clear search
                    </Link>
                </div>
            )}

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm ${!selectedTag
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All Posts
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm ${selectedTag === tag
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {post.cover_image && (
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags?.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold mb-2">
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                </span>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">No posts found matching your criteria.</p>
                    <button
                        onClick={() => {
                            setSelectedTag(null)
                            window.history.pushState({}, '', '/blog')
                        }}
                        className="mt-4 text-blue-600 hover:text-blue-800"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* Pagination */}
            {total > limit && !searchQuery && !selectedTag && (
                <div className="flex justify-center gap-2 mt-8">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {page} of {Math.ceil(total / limit)}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(Math.ceil(total / limit), p + 1))}
                        disabled={page >= Math.ceil(total / limit)}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
} 