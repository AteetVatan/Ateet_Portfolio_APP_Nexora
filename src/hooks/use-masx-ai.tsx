
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MasxAiProject = {
  id: string;
  title: string;
  mission: string;
  architecture: string;
  description?: string;
  tech_stack: string[];
  doctrine_index: any[];
  modules: any[];
  diagram_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
  tagline: string | null;
  timeframe: string | null;
  problem_statement: string | null;
  role_description: string | null;
  key_innovations: Array<{
    feature: string;
    impact: string;
  }> | null;
  architecture_snapshot: string | null;
  challenges: string | null;
  impact: string | null;
  call_to_action: string | null;
};

export const useMasxAiDetails = () => {
  return useQuery<MasxAiProject | null>({
    queryKey: ["masx-ai-details"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("masx_ai")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching MASX AI details:", error);
        return null;
      }

      // Ensure the correct types are used for the returned data
      return {
        ...data,
        doctrine_index: data.doctrine_index || [],
        modules: data.modules || [],
        tech_stack: data.tech_stack || [],
        key_innovations: data.key_innovations || []
      } as MasxAiProject;
    },
  });
};
