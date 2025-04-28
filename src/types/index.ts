
/**
 * Project-wide type definitions
 */

/**
 * CV data types
 */
export * from '@/utils/cv';

/**
 * Project interface
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  project_url?: string;
  github_url?: string;
  category?: string;
  tags?: string[];
  tech_stack?: string[];
  created_at: string;
  updated_at: string;
  featured: boolean;
  type?: string;
}

/**
 * Blog post interface
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  image_url?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
  author_id?: string;
}

/**
 * Contact form submission interface
 */
export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
