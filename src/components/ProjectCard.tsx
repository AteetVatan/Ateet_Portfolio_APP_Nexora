import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ProjectCard — Monolith project card component
 */
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
  techStack?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  slug,
  techStack,
}) => {
  return (
    <Link
      to={`/projects/${slug}`}
      className="monolith-card group block overflow-hidden"
      style={{ textDecoration: 'none' }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="font-heading text-xl mb-2 transition-colors group-hover:text-[var(--mono-primary)]" style={{ color: 'var(--mono-text)' }}>
          {title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--mono-muted)' }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(techStack || tags || []).slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <span className="project-link">
          View Project →
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
