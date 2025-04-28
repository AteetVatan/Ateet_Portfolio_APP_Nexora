
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AboutContent = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  expertise: string[];
  cta_footer: string;
  created_at: string;
  updated_at: string;
};

export const useAboutContent = () => {
  return useQuery<AboutContent | null>({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching about content:", error);
        return null;
      }

      return data as AboutContent;
    },
  });
};
