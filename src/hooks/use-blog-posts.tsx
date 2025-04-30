
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  tags: string[] | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  published: boolean | null;
  author_id: string | null;
}

// Fetch all blog posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        throw new Error("Failed to fetch blog posts");
      }

      return data || [];
    },
  });
};

// Fetch a single blog post by slug
export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      console.log(`Fetching blog post with slug: "${slug}"`);

      // Log all available posts to debug
      const allPostsResponse = await supabase
        .from("blog_posts")
        .select("slug, title")
        .eq("published", true);

      console.log("Available blog posts:", allPostsResponse.data);

      // Attempt to find the post by trimming slugs to handle whitespace issues
      if (allPostsResponse.data) {
        for (const post of allPostsResponse.data) {
          // Check if the current post's slug (after trimming) matches the requested slug
          if (post.slug.trim() === slug) {
            console.log(`Found matching post after trimming: "${post.slug}"`);

            // If a match is found, fetch the full post data using the exact slug from the database
            const { data: fullPostData, error: fullPostError } = await supabase
              .from("blog_posts")
              .select("*")
              .eq("slug", post.slug)
              .eq("published", true)
              .single();

            if (fullPostError) {
              console.error("Error fetching matched blog post:", fullPostError);
              throw new Error("Failed to fetch blog post");
            }

            console.log("Found blog post:", fullPostData);
            return fullPostData;
          }
        }
      }

      // If no match was found or direct query is preferred
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Post not found
          console.log(`Blog post with slug "${slug}" not found`);
          return null;
        }
        console.error("Error fetching blog post:", error);
        throw new Error("Failed to fetch blog post");
      }

      console.log("Found blog post:", data);
      return data;
    },
    enabled: Boolean(slug),
  });
};