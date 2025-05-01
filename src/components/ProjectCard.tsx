import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

// Project data interface
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  image_url: string;
  github_url?: string;
  project_url?: string;
  tech_stack?: string[];
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  slug,
  tags,
  image_url,
  github_url,
  project_url,
  featured
}: ProjectCardProps) => {
  // Helper function to render tags
  const renderTags = (tags: string[]) => {
    const visibleTags = tags.slice(0, 3);
    const remainingCount = tags.length - 3;

    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {visibleTags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-sm bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
          >
            {tag}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="text-xs px-2 py-1 rounded-sm bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="cyber-card group overflow-hidden w-full flex flex-col h-full">
      {/* Project Image */}
      <div className="relative w-full h-48 mb-3 overflow-hidden rounded">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent z-10" />
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

      {/* Project Info */}
      <h3 className="font-mono text-xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors truncate">
        {title}
      </h3>

      <p className="text-[#85a5b3] mb-3 text-sm line-clamp-2 break-words">
        {description}
      </p>

      {/* Tags */}
      {renderTags(tags)}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <Link to={`/projects/${slug}`} className="w-full">
          <Button variant="default" className="w-full bg-[#1291c7] hover:bg-[#00c3ff] text-white">
            View Details
          </Button>
        </Link>

        <div className="flex gap-2 w-full mt-2">
          {github_url && (
            <ActionButton
              href={github_url}
              icon={<Github className="w-4 h-4 mr-2" />}
              label="Code"
            />
          )}

          {project_url && (
            <ActionButton
              href={project_url}
              icon={<ExternalLink className="w-4 h-4 mr-2" />}
              label="Demo"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for action buttons
const ActionButton = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1"
  >
    <Button variant="outline" size="sm" className="w-full border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
      {icon}
      <span className="truncate">{label}</span>
    </Button>
  </a>
);

export default ProjectCard;
