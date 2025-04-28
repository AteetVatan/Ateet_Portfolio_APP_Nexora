
/**
 * Error handling utility
 * 
 * Provides standardized error handling and logging for the application
 */

import { toast } from "@/components/ui/use-toast";

/**
 * Handles API errors consistently across the application
 * @param error - The error object from the API
 * @param fallbackMessage - A user-friendly message to display if error is undefined
 * @param silent - If true, doesn't show toast notification to user
 * @returns The error object for further processing if needed
 */
export const handleApiError = (
  error: unknown, 
  fallbackMessage = "An unexpected error occurred", 
  silent = false
) => {
  // Determine the error message to display
  let displayMessage = fallbackMessage;
  let technicalDetails = "";
  
  if (error instanceof Error) {
    displayMessage = error.message;
    technicalDetails = error.stack || "";
    
    // Log the full error to console for debugging
    console.error("API Error:", {
      message: error.message,
      stack: error.stack,
      originalError: error
    });
  } else {
    console.error("Unknown API Error:", error);
  }
  
  // Show toast notification unless silent mode is enabled
  if (!silent) {
    toast({
      variant: "destructive",
      title: "Error",
      description: displayMessage,
    });
  }
  
  // Return the error for further handling if needed
  return { error, message: displayMessage, details: technicalDetails };
};

/**
 * Logs non-critical errors or warnings to console
 * @param context - Where the warning occurred
 * @param message - Warning message
 * @param data - Additional data related to the warning
 */
export const logWarning = (context: string, message: string, data?: unknown) => {
  console.warn(`[${context}] ${message}`, data || "");
};
