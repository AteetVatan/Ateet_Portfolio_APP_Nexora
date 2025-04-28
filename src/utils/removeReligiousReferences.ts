
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility function to remove religious references from MASX AI project
 */
export const removeReligiousReferences = async () => {
  try {
    // First get the current description
    const { data: current } = await supabase
      .from("masx_ai")
      .select("id, description, mission, architecture")
      .single();
      
    if (!current) {
      console.error("No MASX AI data found");
      return false;
    }
    
    // Remove the Sanatan values and Hanuman Core references
    const update: any = {};
    
    if (current.description) {
      update.description = current.description.replace(
        /Inspired by Sanātan values and built around the Hanuman Core \(a spiritual-ethical engine derived from Ramayanic principles\), the system balances raw AI intelligence with dharmic discipline\./g, 
        ""
      ).trim();
    }
    
    if (current.mission) {
      update.mission = current.mission.replace(
        /Inspired by Sanātan values and built around the Hanuman Core \(a spiritual-ethical engine derived from Ramayanic principles\), the system balances raw AI intelligence with dharmic discipline\./g, 
        ""
      ).trim();
    }
    
    if (current.architecture) {
      update.architecture = current.architecture.replace(
        /Inspired by Sanātan values and built around the Hanuman Core \(a spiritual-ethical engine derived from Ramayanic principles\), the system balances raw AI intelligence with dharmic discipline\./g, 
        ""
      ).trim();
    }
    
    // Update the records in the database
    const { error } = await supabase
      .from("masx_ai")
      .update(update)
      .eq("id", current.id);
      
    if (error) {
      console.error("Error updating MASX AI details:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in removeReligiousReferences:", error);
    return false;
  }
};
