import { supabase } from '../lib/supabase'
import type { Database } from '../types/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type BlogPost = Database['public']['Tables']['blog_posts']['Row']
type CVData = Database['public']['Tables']['cv_data']['Row']

interface PaginationParams {
    page?: number
    limit?: number
}

interface CacheConfig {
    enabled: boolean
    ttl: number // Time to live in milliseconds
}

const DEFAULT_PAGINATION = {
    page: 1,
    limit: 10
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
    enabled: true,
    ttl: 5 * 60 * 1000 // 5 minutes
}

class Cache {
    private static instance: Cache
    private cache: Map<string, { data: any; timestamp: number }>
    private config: CacheConfig

    private constructor(config: CacheConfig) {
        this.cache = new Map()
        this.config = config
    }

    static getInstance(config: CacheConfig = DEFAULT_CACHE_CONFIG): Cache {
        if (!Cache.instance) {
            Cache.instance = new Cache(config)
        }
        return Cache.instance
    }

    get<T>(key: string): T | null {
        if (!this.config.enabled) return null

        const cached = this.cache.get(key)
        if (!cached) return null

        if (Date.now() - cached.timestamp > this.config.ttl) {
            this.cache.delete(key)
            return null
        }

        return cached.data as T
    }

    set(key: string, data: any): void {
        if (!this.config.enabled) return
        this.cache.set(key, { data, timestamp: Date.now() })
    }

    clear(): void {
        this.cache.clear()
    }
}

const cache = Cache.getInstance()

const logger = {
    info: (message: string, data?: any) => {
        console.log(`[INFO] ${message}`, data)
    },
    error: (message: string, error: any) => {
        console.error(`[ERROR] ${message}`, error)
    }
}

async function withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
): Promise<T> {
    let lastError: Error | null = null

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation()
        } catch (error) {
            lastError = error as Error
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
            }
        }
    }

    throw lastError
}

export const supabaseService = {
    // FeaturedProjects
    async getFeaturedProjects(pagination: PaginationParams = DEFAULT_PAGINATION): Promise<{ data: Project[]; total: number }> {
        const cacheKey = `featured-projects-${pagination.page}-${pagination.limit}`
        const cached = cache.get<{ data: Project[]; total: number }>(cacheKey)
        if (cached) return cached

        const { data, error, count } = await withRetry(async () => {
            const { data, error, count } = await supabase
                .from('projects')
                .select('*', { count: 'exact' })
                .eq('featured', true)
                .order('created_at', { ascending: false })
                .range(
                    (pagination.page - 1) * pagination.limit,
                    pagination.page * pagination.limit - 1
                )

            if (error) throw error
            return { data, error, count }
        })

        if (error) {
            logger.error('Failed to fetch featured projects', error)
            throw error
        }

        const result = { data, total: count || 0 }
        cache.set(cacheKey, result)
        return result
    },

    // All Projects 
    async getAllProjects(pagination: PaginationParams = DEFAULT_PAGINATION): Promise<{ data: Project[]; total: number }> {
        const cacheKey = `all-projects-${pagination.page}-${pagination.limit}`
        const cached = cache.get<{ data: Project[]; total: number }>(cacheKey)
        if (cached) return cached

        const { data, error, count } = await withRetry(async () => {
            const { data, error, count } = await supabase
                .from('projects')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(
                    (pagination.page - 1) * pagination.limit,
                    pagination.page * pagination.limit - 1
                )

            if (error) throw error
            return { data, error, count }
        })

        if (error) {
            logger.error('Failed to fetch all projects', error)
            throw error
        }

        const result = { data, total: count || 0 }
        cache.set(cacheKey, result)
        return result
    },

    // Project by ID
    async getProjectById(id: string): Promise<Project> {
        const cacheKey = `project-${id}`
        const cached = cache.get<Project>(cacheKey)
        if (cached) return cached

        const { data, error } = await withRetry(async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return { data, error }
        })

        if (error) {
            logger.error(`Failed to fetch project with id ${id}`, error)
            throw error
        }

        cache.set(cacheKey, data)
        return data
    },

    // Blog Posts
    async getPublishedBlogPosts(pagination: PaginationParams = DEFAULT_PAGINATION): Promise<{ data: BlogPost[]; total: number }> {
        const cacheKey = `published-posts-${pagination.page}-${pagination.limit}`
        const cached = cache.get<{ data: BlogPost[]; total: number }>(cacheKey)
        if (cached) return cached

        const { data, error, count } = await withRetry(async () => {
            const { data, error, count } = await supabase
                .from('blog_posts')
                .select('*', { count: 'exact' })
                .eq('published', true)
                .order('published_at', { ascending: false })
                .range(
                    (pagination.page - 1) * pagination.limit,
                    pagination.page * pagination.limit - 1
                )

            if (error) throw error
            return { data, error, count }
        })

        if (error) {
            logger.error('Failed to fetch published blog posts', error)
            throw error
        }

        const result = { data, total: count || 0 }
        cache.set(cacheKey, result)
        return result
    },

    // Blog Post by Slug
    async getBlogPostBySlug(slug: string): Promise<BlogPost> {
        const cacheKey = `blog-post-${slug}`
        const cached = cache.get<BlogPost>(cacheKey)
        if (cached) return cached

        const { data, error } = await withRetry(async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) throw error
            return { data, error }
        })

        if (error) {
            logger.error(`Failed to fetch blog post with slug ${slug}`, error)
            throw error
        }

        cache.set(cacheKey, data)
        return data
    },

    // CV Data
    async getCVData(): Promise<CVData> {
        const cacheKey = 'cv-data'
        const cached = cache.get<CVData>(cacheKey)
        if (cached) return cached

        const { data, error } = await withRetry(async () => {
            const { data, error } = await supabase
                .from('cv_data')
                .select('*')
                .single()

            if (error) throw error
            return { data, error }
        })

        if (error) {
            logger.error('Failed to fetch CV data', error)
            throw error
        }

        cache.set(cacheKey, data)
        return data
    },

    // Cache management
    clearCache(): void {
        cache.clear()
        logger.info('Cache cleared')
    },

    setCacheConfig(config: Partial<CacheConfig>): void {
        const newConfig = { ...DEFAULT_CACHE_CONFIG, ...config }
        Cache.getInstance(newConfig)
        logger.info('Cache configuration updated', newConfig)
    }
} 