import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabaseService } from '../services/supabase.service'
import type { Database } from '../types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export const BlogSearch = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const navigate = useNavigate()

    // Debounced search function
    const debouncedSearch = useCallback(
        async (searchQuery: string) => {
            if (searchQuery.length < 2) {
                setSuggestions([])
                return
            }

            setIsLoading(true)
            try {
                const { data: posts } = await supabaseService.getPublishedBlogPosts()
                if (posts) {
                    const filtered = posts.filter(post =>
                        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).slice(0, 5)
                    setSuggestions(filtered)
                }
            } catch (error) {
                console.error('Search error:', error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            debouncedSearch(query)
        }, 300)

        return () => clearTimeout(timer)
    }, [query, debouncedSearch])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/blog?search=${encodeURIComponent(query)}`)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (post: BlogPost) => {
        navigate(`/blog/${post.slug}`)
        setQuery('')
        setShowSuggestions(false)
    }

    return (
        <div className="relative w-full max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search blog posts..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && (query.length >= 2) && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul className="py-2">
                            {suggestions.map(post => (
                                <li
                                    key={post.id}
                                    onClick={() => handleSuggestionClick(post)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <div className="font-medium">{post.title}</div>
                                    {post.excerpt && (
                                        <div className="text-sm text-gray-600 truncate">
                                            {post.excerpt}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    )
} 