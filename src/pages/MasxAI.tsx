
import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { useMasxAiDetails } from '../hooks/use-masx-ai';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowSquareOut, Code, ArrowRight, CalendarBlank, FileText } from '@phosphor-icons/react';
import { Skeleton } from '../components/ui/skeleton';
import { removeReligiousReferences } from '../utils/removeReligiousReferences';

const MasxAI: React.FC = () => {
  const { data: masxAi, isLoading, error } = useMasxAiDetails();

  useEffect(() => {
    const cleanupReferences = async () => {
      const success = await removeReligiousReferences();
      if (success) console.log("Successfully removed religious references");
    };
    cleanupReferences();
  }, []);

  return (
    <PageLayout>
      <SEOHead
        title="MASX AI"
        description="MASX AI, an intelligent AI system built by Ateet Vatan featuring multi-agent architecture and production-grade LLM orchestration."
      />
      <div className="py-20 px-6 md:px-20 max-w-[900px] mx-auto">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-64" />
          </div>
        ) : error || !masxAi ? (
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
              MASX <span className="highlight">AI</span>
            </h1>
            <p style={{ color: 'var(--mono-muted)' }}>Unable to load MASX AI project details. Please try again later.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Header */}
            <section>
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 mr-2" style={{ color: 'var(--mono-primary)' }} />
                <h3 className="text-md font-mono" style={{ color: 'var(--mono-primary)' }}>OVERVIEW</h3>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--mono-text)' }}>
                {masxAi.title}<span className="highlight">.</span>
              </h1>
              {masxAi.tagline && (
                <p className="text-xl md:text-2xl mt-3 font-mono" style={{ color: 'var(--mono-primary)' }}>{masxAi.tagline}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-6">
                {masxAi.timeframe && (
                  <div className="flex items-center text-sm" style={{ color: 'var(--mono-muted)' }}>
                    <CalendarBlank className="h-4 w-4 mr-2" style={{ color: 'var(--mono-primary)' }} />
                    {masxAi.timeframe}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {masxAi.tech_stack?.map((tech, index) => (
                    <span key={index} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="monolith-card p-6">
              <div className="whitespace-pre-line mb-6" style={{ color: 'var(--mono-muted)' }}>
                {masxAi.description || "No description available."}
              </div>
              <Link to="/masx-ai/case-study" className="inline-flex items-center transition-colors"
                style={{ color: 'var(--mono-primary)' }}>
                <span className="mr-2">Read the full case study</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            {/* Mission */}
            <section>
              <h2 className="font-heading text-2xl mb-4" style={{ color: 'var(--mono-text)' }}>The Mission</h2>
              <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                <p className="whitespace-pre-line">{masxAi.mission}</p>
              </div>
            </section>

            {/* Links */}
            <section className="pt-8" style={{ borderTop: '1px solid var(--mono-border)' }}>
              <div className="flex flex-wrap gap-4">
                {masxAi.demo_url && (
                  <a href={masxAi.demo_url} target="_blank" rel="noopener noreferrer">
                    <Button className="btn-primary"><ArrowSquareOut className="mr-2 h-4 w-4" /> Live Demo</Button>
                  </a>
                )}
                {masxAi.github_url && (
                  <a href={masxAi.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }}>
                      <Code className="mr-2 h-4 w-4" /> View Code
                    </Button>
                  </a>
                )}
                <Link to="/masx-ai/case-study">
                  <Button variant="outline" style={{ borderColor: 'var(--mono-border)', color: 'var(--mono-muted)' }}>
                    <FileText className="mr-2 h-4 w-4" /> Case Study
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MasxAI;
