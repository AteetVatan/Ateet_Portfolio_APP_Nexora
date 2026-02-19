
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

/**
 * ProjectShowcase — Monolith editorial 50/50 layout
 * Alternating image/text sides with ghost number header
 */

interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  image_url: string;
  tags: string[];
  tech_stack: string[];
}

const ProjectShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { data: projects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true })
        .limit(3);
      return data as Project[] | null;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto"
      id="projects"
    >
      {/* Section Header */}
      <div className="relative mb-16 reveal">
        <span className="section-number">02</span>
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">
          Selected <span className="highlight">Work</span>
        </h2>
      </div>

      {/* Project cards — editorial layout */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`project-editorial reveal ${index % 2 !== 0 ? 'reverse' : ''}`}
        >
          {/* Image side */}
          <div className="project-image">
            <div
              className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-600"
              style={{
                background: project.image_url
                  ? `url(${project.image_url}) center/cover no-repeat`
                  : 'linear-gradient(135deg, var(--mono-surface), rgba(255, 77, 0, 0.05))',
                minHeight: '300px',
              }}
            >
              {!project.image_url && '📊'}
            </div>
          </div>

          {/* Text side */}
          <div className="project-text">
            <h3 className="text-[28px] mb-3 font-heading" style={{ color: 'var(--mono-text)' }}>
              {project.title}
            </h3>
            <p className="text-[15px] mb-5" style={{ color: 'var(--mono-muted)' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {(project.tech_stack || project.tags || []).slice(0, 4).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <Link to={`/projects/${project.slug}`} className="project-link">
              View Project →
            </Link>
          </div>
        </div>
      ))}

      {/* View all link */}
      <div className="text-center mt-12 reveal">
        <Link to="/projects" className="btn-outline inline-block">
          View All Projects →
        </Link>
      </div>
    </section>
  );
};

export default ProjectShowcase;
