
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  image_url: string;
  github_url?: string | null;
  project_url?: string | null;
  tech_stack?: string[] | null;
  featured?: boolean | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  slug,
  tags,
  image_url,
  github_url,
  project_url,
  tech_stack,
  featured
}) => {
  return (
    <div className="cyber-card group overflow-hidden w-full max-w-full flex flex-col h-full">
      <div className="relative w-full h-48 mb-3 overflow-hidden rounded">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent z-10"></div>
        <img 
          src={image_url} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-3 right-3 text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm z-20">
            Featured
          </div>
        )}
      </div>
      
      <h3 className="font-mono text-xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors truncate">
        {title}
      </h3>
      
      <p className="text-[#85a5b3] mb-3 text-sm line-clamp-2 break-words">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.slice(0, 3).map((tag, tagIndex) => (
          <span 
            key={tagIndex} 
            className="text-xs px-2 py-1 rounded-sm 
                     bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-sm 
                         bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]">
            +{tags.length - 3}
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        <Link to={`/projects/${slug}`} className="w-full">
          <Button variant="default" className="w-full bg-[#1291c7] hover:bg-[#00c3ff] text-white">
            View Details
          </Button>
        </Link>
        
        <div className="flex gap-2 w-full mt-2">
          {github_url && (
            <a 
              href={github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
                <Github className="w-4 h-4 mr-2" />
                <span className="truncate">Code</span>
              </Button>
            </a>
          )}
          
          {project_url && (
            <a 
              href={project_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="sm" className="w-full border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="truncate">Demo</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
