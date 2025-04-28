
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MasxAiProject } from "./use-masx-ai";

/**
 * Hook to update MASX AI project details
 */
export const useUpdateMasxAi = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updateData: Partial<MasxAiProject>) => {
      const { data, error } = await supabase
        .from("masx_ai")
        .update(updateData)
        .eq("id", updateData.id)
        .select()
        .single();
        
      if (error) {
        console.error("Error updating MASX AI details:", error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch the MASX AI data
      queryClient.invalidateQueries({ queryKey: ["masx-ai-details"] });
    }
  });
};
