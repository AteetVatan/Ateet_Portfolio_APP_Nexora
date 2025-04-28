
/**
 * CV utility functions and interfaces
 * 
 * This module provides functionality for CV-related operations including:
 * - Type definitions for CV data
 * - PDF generation and download logic
 * - Utility functions for CV manipulation
 */

// CV data interface - describes the structure of CV data from the database
export interface CVData {
  id: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github?: string;
  twitter?: string;
  summary: string;
  skills: Record<string, string[]>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    dates: string;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    year: number;
  }>;
  certifications: string[];
  languages: Record<string, string>;
  updated_at: string;
  created_at: string;
  version?: string;
  is_active: boolean;
}

/**
 * Opens the CV PDF generation endpoint in a new tab
 * @param e - React mouse event object
 */
export const downloadCV = (e: React.MouseEvent): void => {
  e.preventDefault();
  
  // Use the full Supabase project URL
  window.open('https://bidswcansixttbhmwpkj.functions.supabase.co/generate-cv-pdf', '_blank');
  
  // Log the download attempt for analytics (optional)
  console.log('CV download initiated', new Date().toISOString());
};

/**
 * Default error handler for CV operations
 * @param error - The error object
 */
export const handleCVError = (error: unknown): void => {
  console.error('CV operation failed:', error);
  // Here you could integrate with a toast notification system
  // or other error reporting mechanism
};
