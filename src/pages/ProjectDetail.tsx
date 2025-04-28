
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Bookmark } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

// Define an interface for Supabase errors
interface SupabaseError extends Error {
  code?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  image_url: string | null;
  github_url: string | null;
  project_url: string | null;
  tech_stack: string[] | null;
  featured: boolean | null;
  category: string | null;
  type: string | null;
  created_at: string;
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Fetch project details from Supabase
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        // Type assertion to access the code property
        const supaError = error as SupabaseError;
        if (supaError.code === 'PGRST116') {
          // PGRST116 is the error code for "no rows returned"
          navigate('/projects', { replace: true });
        }
        throw error;
      }
      
      return data as Project;
    },
  });
  
  // Set page title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Project Details`;
    } else {
      document.title = "Project Details";
    }
  }, [project]);
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Fixed position grid background */}
      <GridBackground />
      
      {/* Mobile navigation will be at the top */}
      <div className="md:hidden">
        <div className="h-16"></div> {/* Space for mobile navigation */}
      </div>
      
      {/* Navigation - desktop: sidebar */}
      <div className="hidden md:block md:fixed md:left-0 md:top-0 md:bottom-0 md:w-60 lg:w-64 z-20">
        <Navigation />
      </div>
      
      {/* Main content - centered with adjusted padding */}
      <main className="flex-grow w-full mx-auto md:ml-60 lg:ml-64 pt-20 md:pt-8 px-4 md:px-8 max-w-7xl">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/projects')}
            className="border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:text-[#00c3ff]" />
            Back to Projects
          </Button>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="cyber-card p-6 space-y-6">
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-32" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
            </div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="terminal-section p-6 text-center">
            <p className="text-red-500 mb-2">Failed to load project details</p>
            <p className="text-[#85a5b3] text-sm">Please try again later or check the project URL</p>
          </div>
        )}
        
        {/* Project details */}
        {project && (
          <div className="space-y-8 pb-12">
            {/* Project header */}
            <div className="cyber-card relative overflow-hidden p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-mono text-white mb-4 leading-tight">
                    {project.title}
                    {project.featured && (
                      <span className="ml-3 inline-block text-xs bg-[#00c3ff] text-black px-2 py-1 rounded-sm align-middle">
                        Featured
                      </span>
                    )}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.category && (
                      <div className="flex items-center text-xs text-[#85a5b3]">
                        <Bookmark className="w-3 h-3 mr-1 text-[#1291c7]" />
                        {project.category}
                      </div>
                    )}
                    {project.type && (
                      <div className="flex items-center text-xs text-[#85a5b3]">
                        <Tag className="w-3 h-3 mr-1 text-[#1291c7]" />
                        {project.type}
                      </div>
                    )}
                    {project.created_at && (
                      <div className="flex items-center text-xs text-[#85a5b3]">
                        <Calendar className="w-3 h-3 mr-1 text-[#1291c7]" />
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </a>
                  )}
                  
                  {project.project_url && (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="default" size="sm" className="bg-[#1291c7] hover:bg-[#00c3ff] text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Project image */}
            {project.image_url && (
              <div className="cyber-card p-0 overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full object-cover h-64 md:h-96"
                />
              </div>
            )}
            
            {/* Project description */}
            <div className="cyber-card p-6">
              <h2 className="text-xl font-mono text-white mb-4 border-b border-[#1e3a4a] pb-2">Project Overview</h2>
              <p className="text-[#85a5b3] whitespace-pre-line">
                {project.description}
              </p>
            </div>
            
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-mono text-white mb-4 border-b border-[#1e3a4a] pb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-sm px-3 py-1 rounded-full 
                              bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tech stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="cyber-card p-6">
                <h2 className="text-xl font-mono text-white mb-4 border-b border-[#1e3a4a] pb-2">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-sm px-3 py-1 rounded-sm 
                              bg-[#0c1824] text-[#00c3ff] border border-[#1e3a4a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <Footer />
      </main>
    </div>
  );
};

export default ProjectDetail;

