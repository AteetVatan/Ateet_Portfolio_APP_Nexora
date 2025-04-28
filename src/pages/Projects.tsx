
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import ProjectCard from '../components/ProjectCard';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

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
  
  // Set page title
  useEffect(() => {
    document.title = "Projects - Developer Portfolio";
  }, []);
  
  // Fetch projects from Supabase
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
  
  // Extract unique categories and types for filtering
  const categories = projects 
    ? Array.from(new Set(projects.filter(p => p.category).map(p => p.category))) 
    : [];
  
  const types = projects 
    ? Array.from(new Set(projects.filter(p => p.type).map(p => p.type))) 
    : [];
  
  // Filter projects based on search term and filters
  const filteredProjects = projects 
    ? projects.filter(project => {
        // Filter by search term (title, description, tags)
        const matchesSearch = !searchTerm || 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Filter by category
        const matchesCategory = !selectedCategory || project.category === selectedCategory;
        
        // Filter by type
        const matchesType = !selectedType || project.type === selectedType;
        
        return matchesSearch && matchesCategory && matchesType;
      })
    : [];
  
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
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
      <main className="flex-grow w-full mx-auto md:ml-60 lg:ml-64 pt-20 md:pt-8 px-4 md:px-8 max-w-7xl overflow-x-hidden">
        <div className="terminal-section mb-6 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-mono text-white mb-2 md:mb-4">
            PROJECT <span className="text-[#00c3ff]">SHOWCASE_</span>
          </h1>
          <p className="text-[#85a5b3] max-w-xl text-sm md:text-base">
            A collection of AI, machine learning, and full-stack projects demonstrating
            real-world problem-solving and technical expertise.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#85a5b3]" size={18} />
            <Input 
              type="text"
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0c1824] border-[#1e3a4a] text-[#85a5b3] placeholder:text-[#4a6a7a] focus:border-[#00c3ff]"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {selectedCategory && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="border-[#1e3a4a] text-[#00c3ff] hover:bg-[#0c1824]"
              >
                {selectedCategory} ✕
              </Button>
            )}
            
            {selectedType && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedType(null)}
                className="border-[#1e3a4a] text-[#00c3ff] hover:bg-[#0c1824]"
              >
                {selectedType} ✕
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]"
              aria-label="Filter"
            >
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        {/* Filter pills */}
        {(categories.length > 0 || types.length > 0) && (
          <div className="mb-6">
            {categories.length > 0 && (
              <div className="mb-3">
                <h3 className="text-sm font-mono text-[#85a5b3] mb-2">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button 
                      key={category as string} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCategory(category as string)}
                      className={`border-[#1e3a4a] ${selectedCategory === category 
                        ? 'bg-[#1291c7] text-white border-[#1291c7]' 
                        : 'text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]'}`}
                    >
                      {category as string}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {types.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-[#85a5b3] mb-2">Types:</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button 
                      key={type as string} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedType(type as string)}
                      className={`border-[#1e3a4a] ${selectedType === type 
                        ? 'bg-[#1291c7] text-white border-[#1291c7]' 
                        : 'text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]'}`}
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
              <div key={i} className="cyber-card">
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-full h-16 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-16 h-6" />
                </div>
                <Skeleton className="w-full h-10 mb-2" />
                <div className="flex gap-2">
                  <Skeleton className="w-1/2 h-8" />
                  <Skeleton className="w-1/2 h-8" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="terminal-section p-6 text-center">
            <p className="text-red-500 mb-2">Failed to load projects</p>
            <p className="text-[#85a5b3] text-sm">Please try again later or contact support</p>
          </div>
        )}
        
        {/* No results state */}
        {!isLoading && filteredProjects && filteredProjects.length === 0 && (
          <div className="terminal-section p-6 text-center">
            <p className="text-[#00c3ff] mb-2">No projects found</p>
            <p className="text-[#85a5b3] text-sm">
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
                id={project.id}
                title={project.title}
                description={project.description}
                slug={project.slug}
                tags={project.tags}
                image_url={project.image_url || 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?auto=format&fit=crop&w=800&q=80'}
                github_url={project.github_url}
                project_url={project.project_url}
                tech_stack={project.tech_stack}
                featured={project.featured}
              />
            ))}
          </div>
        )}
        
        <Footer />
      </main>
    </div>
  );
};

export default Projects;
