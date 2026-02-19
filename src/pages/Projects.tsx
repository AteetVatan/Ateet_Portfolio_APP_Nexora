import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { useQuery } from '@tanstack/react-query';
import { Funnel, MagnifyingGlass } from '@phosphor-icons/react';
import { supabase } from '../integrations/supabase/client';
import PageLayout from '../components/layout/PageLayout';
import ProjectCard from '../components/ProjectCard';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import PageCTA from '../components/PageCTA';

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
}

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);



  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  const categories = projects ? Array.from(new Set(projects.filter(p => p.category).map(p => p.category))) : [];
  const types = projects ? Array.from(new Set(projects.filter(p => p.type).map(p => p.type))) : [];

  const filteredProjects = projects ? projects.filter(project => {
    const matchesSearch = !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesType = !selectedType || project.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  }) : [];

  return (
    <PageLayout>
      <SEOHead
        title="Projects"
        description="Explore AI and full-stack projects by Ateet Vatan, from multi-agent systems to production LLM applications."
      />
      <div className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
            Project <span className="highlight">Showcase</span>
          </h1>
          <p className="max-w-xl text-base" style={{ color: 'var(--mono-muted)' }}>
            A collection of AI, machine learning, and full-stack projects demonstrating
            real-world problem-solving and technical expertise.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--mono-muted)' }} size={18} />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{ background: 'var(--mono-surface)', borderColor: 'var(--mono-border)', color: 'var(--mono-text)' }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedCategory && (
              <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}
                style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-primary)' }}>
                {selectedCategory} ✕
              </Button>
            )}
            {selectedType && (
              <Button variant="outline" size="sm" onClick={() => setSelectedType(null)}
                style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-primary)' }}>
                {selectedType} ✕
              </Button>
            )}
            <Button variant="outline" size="icon" aria-label="Filter"
              style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }}>
              <Funnel size={18} />
            </Button>
          </div>
        </div>

        {/* Filter pills */}
        {(categories.length > 0 || types.length > 0) && (
          <div className="mb-6">
            {categories.length > 0 && (
              <div className="mb-3">
                <h3 className="text-sm font-mono mb-2" style={{ color: 'var(--mono-muted)' }}>Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category as string}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(category as string)}
                      style={selectedCategory === category
                        ? { background: 'var(--mono-primary)', color: '#fff', borderColor: 'var(--mono-primary)' }
                        : { borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }
                      }
                    >
                      {category as string}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {types.length > 0 && (
              <div>
                <h3 className="text-sm font-mono mb-2" style={{ color: 'var(--mono-muted)' }}>Types:</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button
                      key={type as string}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedType(type as string)}
                      style={selectedType === type
                        ? { background: 'var(--mono-primary)', color: '#fff', borderColor: 'var(--mono-primary)' }
                        : { borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }
                      }
                    >
                      {type as string}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="monolith-card p-6">
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-full h-16 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-16 h-6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="surface-card p-6 text-center">
            <p className="text-red-500 mb-2">Failed to load projects</p>
            <p className="text-sm" style={{ color: 'var(--mono-muted)' }}>Please try again later or contact support</p>
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredProjects && filteredProjects.length === 0 && (
          <div className="surface-card p-6 text-center">
            <p className="mb-2" style={{ color: 'var(--mono-primary)' }}>No projects found</p>
            <p className="text-sm" style={{ color: 'var(--mono-muted)' }}>
              Try adjusting your search criteria or clearing the filters
            </p>
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && filteredProjects && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                slug={project.slug}
                tags={project.tags}
                imageUrl={project.image_url || undefined}
                techStack={project.tech_stack || undefined}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <PageCTA text="Ready to start your project?" />
      </div>
    </PageLayout>
  );
};

export default Projects;
