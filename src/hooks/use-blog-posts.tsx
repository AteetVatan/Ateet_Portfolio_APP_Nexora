
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
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Post not found
          return null;
        }
        console.error("Error fetching blog post:", error);
        throw new Error("Failed to fetch blog post");
      }

      return data;
    },
    enabled: Boolean(slug),
  });
};
