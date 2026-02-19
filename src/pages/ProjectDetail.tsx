
import React from 'react';
import SEOHead from '../components/SEOHead';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Bookmark } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

interface SupabaseError extends Error { code?: string; }

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

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (error) {
        const supaError = error as SupabaseError;
        if (supaError.code === 'PGRST116') navigate('/projects', { replace: true });
        throw error;
      }
      return data as Project;
    },
  });



  return (
    <PageLayout>
      <SEOHead
        title={project ? `${project.title} | Projects` : 'Project Details'}
        description={project?.description?.substring(0, 160) || 'View project details by Ateet Vatan.'}
      />
      <div className="py-20 md:py-32 px-6 md:px-20 max-w-[900px] mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/projects')}
            style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="monolith-card p-6 space-y-6">
            <Skeleton className="w-3/4 h-12" />
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-32" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="surface-card p-6 text-center">
            <p className="text-red-500 mb-2">Failed to load project details</p>
            <p className="text-sm" style={{ color: 'var(--mono-muted)' }}>Please try again later</p>
          </div>
        )}

        {/* Project details */}
        {project && (
          <div className="space-y-8">
            {/* Header */}
            <div className="monolith-card p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl mb-4" style={{ color: 'var(--mono-text)' }}>
                    {project.title}
                    {project.featured && (
                      <span className="ml-3 inline-block text-xs px-2 py-1 rounded-sm align-middle"
                        style={{ background: 'var(--mono-primary)', color: '#fff' }}>
                        Featured
                      </span>
                    )}
                  </h1>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.category && (
                      <div className="flex items-center text-xs" style={{ color: 'var(--mono-muted)' }}>
                        <Bookmark className="w-3 h-3 mr-1" style={{ color: 'var(--mono-primary)' }} />
                        {project.category}
                      </div>
                    )}
                    {project.type && (
                      <div className="flex items-center text-xs" style={{ color: 'var(--mono-muted)' }}>
                        <Tag className="w-3 h-3 mr-1" style={{ color: 'var(--mono-primary)' }} />
                        {project.type}
                      </div>
                    )}
                    {project.created_at && (
                      <div className="flex items-center text-xs" style={{ color: 'var(--mono-muted)' }}>
                        <Calendar className="w-3 h-3 mr-1" style={{ color: 'var(--mono-primary)' }} />
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }}>
                        <Github className="w-4 h-4 mr-2" /> View Code
                      </Button>
                    </a>
                  )}
                  {project.project_url && (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="default" size="sm" className="btn-primary">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Image */}
            {project.image_url && (
              <div className="monolith-card p-0 overflow-hidden">
                <img src={project.image_url} alt={project.title} className="w-full object-cover h-64 md:h-96" />
              </div>
            )}

            {/* Description */}
            <div className="monolith-card p-6">
              <h2 className="font-heading text-xl mb-4 pb-2" style={{ color: 'var(--mono-text)', borderBottom: '1px solid var(--mono-border)' }}>
                Project Overview
              </h2>
              <p className="whitespace-pre-line" style={{ color: 'var(--mono-muted)' }}>
                {project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="monolith-card p-6">
                <h2 className="font-heading text-xl mb-4 pb-2" style={{ color: 'var(--mono-text)', borderBottom: '1px solid var(--mono-border)' }}>Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (<span key={index} className="tag">{tag}</span>))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="monolith-card p-6">
                <h2 className="font-heading text-xl mb-4 pb-2" style={{ color: 'var(--mono-text)', borderBottom: '1px solid var(--mono-border)' }}>Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, index) => (<span key={index} className="tag">{tech}</span>))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProjectDetail;
