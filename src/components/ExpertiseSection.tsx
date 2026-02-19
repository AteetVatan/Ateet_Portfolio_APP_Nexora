
import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { Brain, Lightning, Wrench, Cloud } from '@phosphor-icons/react';

/**
 * ExpertiseSection — Monolith horizontal scroll cards
 * Section header with ghost number, 4 scrollable expertise cards
 */

interface Expertise {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  skills: string[];
  display_order: number;
}

const fallbackExpertise: Expertise[] = [
  {
    id: '1', title: 'LLM Integration', icon: Brain,
    description: 'Intelligent agents with semantic search, memory, and real-time reasoning via vector databases and RAG pipelines.',
    skills: ['LangChain', 'AutoGen', 'ChromaDB', 'RAG'], display_order: 1,
  },
  {
    id: '2', title: 'AI Automation', icon: Lightning,
    description: 'Autonomous pipelines with multi-agent systems for end-to-end data processing and strategic alerting.',
    skills: ['Multi-Agent', 'Redis', 'ETL'], display_order: 2,
  },
  {
    id: '3', title: 'Software Engineering', icon: Wrench,
    description: 'Clean code, SOLID principles, TDD, agile methodologies across the full SDLC.',
    skills: ['SOLID', 'TDD', 'CI/CD'], display_order: 3,
  },
  {
    id: '4', title: 'Full-Stack & Cloud', icon: Cloud,
    description: 'Scalable applications with Python, .NET, React, and cloud-native technologies.',
    skills: ['Python', 'React', '.NET', 'AWS', 'Docker'], display_order: 4,
  },
];

const ExpertiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { data: expertise } = useQuery({
    queryKey: ['expertise'],
    queryFn: async () => {
      const { data } = await supabase
        .from('expertise')
        .select('*')
        .order('display_order', { ascending: true });
      return (data && data.length > 0) ? data as Expertise[] : fallbackExpertise;
    },
  });

  const items = expertise || fallbackExpertise;

  // Intersection observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-20 max-w-[1400px] mx-auto"
      id="expertise"
    >
      {/* Section Header */}
      <div className="relative mb-16 reveal">
        <span className="section-number">01</span>
        <div className="section-label">Capabilities</div>
        <h2 className="section-title">
          What I <span className="highlight">Build</span>
        </h2>
      </div>

      {/* Horizontal scroll cards */}
      <div className="expertise-scroll">
        {items.map((item, index) => (
          <div key={item.id} className="expertise-item reveal">
            <div className="expertise-num">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-2xl mb-3 font-heading" style={{ color: 'var(--mono-text)' }}>
              {item.title}
            </h3>
            <p className="text-[15px] mb-5" style={{ color: 'var(--mono-muted)' }}>
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.skills?.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
