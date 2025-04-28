import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabaseService } from '../services/supabase.service'
import type { Database } from '../types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export const BlogPostDetail = () => {
    const { slug } = useParams<{ slug: string }>()
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return

            try {
                setLoading(true)
                setError(null)

                // Fetch the main post
                const postData = await supabaseService.getBlogPostBySlug(slug)
                setPost(postData)

                // Fetch related posts (posts with at least one matching tag)
                if (postData.tags && postData.tags.length > 0) {
                    const { data: allPosts } = await supabaseService.getPublishedBlogPosts()
                    if (allPosts) {
                        const filteredRelatedPosts = allPosts.filter((p: BlogPost) =>
                            p.id !== postData.id &&
                            p.tags?.some((tag: string) => postData.tags?.includes(tag))
                        ).slice(0, 3)
                        setRelatedPosts(filteredRelatedPosts)
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch blog post')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug])

    const sharePost = (platform: 'twitter' | 'linkedin' | 'facebook') => {
        const url = window.location.href
        const title = post?.title || ''
        const text = post?.excerpt || ''

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        }

        window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Post Not Found</h1>
                <p className="text-gray-600 mb-8">
                    The blog post you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    to="/blog"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Blog
                </Link>
            </div>
        )
    }

    return (
        <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
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
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-between text-gray-500">
                    <span>
                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-4">
                        <button
                            onClick={() => sharePost('twitter')}
                            className="hover:text-blue-400 transition-colors"
                        >
                            Twitter
                        </button>
                        <button
                            onClick={() => sharePost('linkedin')}
                            className="hover:text-blue-400 transition-colors"
                        >
                            LinkedIn
                        </button>
                        <button
                            onClick={() => sharePost('facebook')}
                            className="hover:text-blue-400 transition-colors"
                        >
                            Facebook
                        </button>
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
                <div className="mb-8">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
                {post.content}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map(relatedPost => (
                            <Link
                                key={relatedPost.id}
                                to={`/blog/${relatedPost.slug}`}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {relatedPost.cover_image && (
                                    <img
                                        src={relatedPost.cover_image}
                                        alt={relatedPost.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(relatedPost.published_at || relatedPost.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Back to Blog */}
            <div className="mt-12 text-center">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                    ← Back to Blog
                </Link>
            </div>
        </article>
    )
} 