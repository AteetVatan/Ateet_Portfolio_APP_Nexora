import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';


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

const ProjectShowcase: React.FC = () => {

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

  const featuredProjects = (projects ?? []).filter((project) => project.featured);

  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-3">
            KEY <span className="text-[#00c3ff]">PROJECTS_</span>
          </h2>
          <p className="text-[#85a5b3] max-w-xl text-sm md:text-base">
            Featured work showcasing practical applications of AI and full-stack development expertise.
          </p>
        </div>

        <Link to="/projects" className="neon-button mt-4 md:mt-0">
          VIEW ALL PROJECTS
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredProjects.map((project, index) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="cyber-card group hover:cursor-pointer flex flex-col h-full"
          >
            <div className="relative w-full h-40 mb-3 overflow-hidden rounded">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent z-10"></div>
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm z-20">
                Featured
              </div>
            </div>

            <h3 className="font-mono text-xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors">
              {project.title}
            </h3>

            <p className="text-[#85a5b3] mb-3 text-sm line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 rounded-sm 
                         bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
                >
                  {tag}
                </span>
              ))}
              {project.tags?.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-sm 
                               bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}

        {/* "View More" card */}
        <Link
          to="/projects"
          className="border border-dashed border-[#1291c7] rounded p-6 flex flex-col justify-center items-center text-center hover:border-[#00c3ff] transition-colors cursor-pointer h-full"
        >
          <div className="w-14 h-14 rounded-full border border-[#1291c7] flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#1291c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-mono text-[#1291c7] hover:text-[#00c3ff] transition-colors">
            Explore All Projects
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ProjectShowcase;
