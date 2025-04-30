
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types";

// A cache to store pre-fetched blog posts
const blogCache: Record<string, BlogPost> = {};
let allBlogsFetched = false;
let allBlogsPromise: Promise<BlogPost[]> | null = null;

/**
 * Fetches all blog posts and caches them for static-like generation
 */
export async function prefetchAllBlogs(): Promise<BlogPost[]> {
    if (allBlogsPromise) {
        return allBlogsPromise;
    }

    allBlogsPromise = new Promise<BlogPost[]>(async (resolve) => {
        if (allBlogsFetched && Object.keys(blogCache).length > 0) {
            resolve(Object.values(blogCache));
            return;
        }

        console.log("Prefetching all blogs for static generation");
        const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error prefetching blog posts:", error);
            resolve([]);
            return;
        }

        // Store each blog in the cache
        const posts = data || [];
        posts.forEach(post => {
            blogCache[post.slug] = post;
        });

        allBlogsFetched = true;
        resolve(posts);
    });

    return allBlogsPromise;
}

/**
 * Fetches a single blog post by slug from the cache or database
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
    // If the blog is already in the cache, return it
    if (blogCache[slug]) {
        return blogCache[slug];
    }

    // If not in cache, try to fetch it
    console.log(`Fetching blog post with slug: "${slug}"`);

    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (error) {
        // If this specific slug wasn't found, try a case-insensitive search
        // and look for trimmed versions
        const { data: allPosts } = await supabase
            .from("blog_posts")
            .select("slug, title")
            .eq("published", true);

        if (allPosts) {
            // Find a post with a matching slug after trimming
            const matchingPost = allPosts.find(
                post => post.slug.trim() === slug ||
                    post.slug.trim().toLowerCase() === slug.toLowerCase()
            );

            if (matchingPost) {
                const { data: fullPost, error: fullPostError } = await supabase
                    .from("blog_posts")
                    .select("*")
                    .eq("slug", matchingPost.slug)
                    .eq("published", true)
                    .single();

                if (!fullPostError && fullPost) {
                    // Add to cache and return
                    blogCache[slug] = fullPost;
                    return fullPost;
                }
            }
        }

        return null;
    }

    // Cache the result for future use
    if (data) {
        blogCache[slug] = data;
    }

    return data || null;
}

/**
 * Returns all blog post slugs for static path generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
    const posts = await prefetchAllBlogs();
    return posts.map(post => post.slug);
}

/**
 * A hook that returns a statically generated blog post by slug
 */
export const useStaticBlogPost = (slug: string) => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadPost = async () => {
            try {
                setIsLoading(true);
                const data = await fetchBlogBySlug(slug);

                if (isMounted) {
                    setPost(data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setIsLoading(false);
                }
            }
        };

        loadPost();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { data: post, isLoading, error };
};

/**
 * A hook that returns all statically generated blog posts
 */
export const useStaticBlogPosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadPosts = async () => {
            try {
                setIsLoading(true);
                const data = await prefetchAllBlogs();

                if (isMounted) {
                    setPosts(data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setIsLoading(false);
                }
            }
        };

        loadPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data: posts, isLoading, error };
};
