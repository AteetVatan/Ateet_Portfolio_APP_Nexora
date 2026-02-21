import React from 'react';
import { useAboutContent } from '../hooks/use-about-content';
import { Skeleton } from '../components/ui/skeleton';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageLayout from '../components/layout/PageLayout';
import PageCTA from '../components/PageCTA';

const About: React.FC = () => {
  const { data: aboutContent, isLoading, error } = useAboutContent();



  return (
    <PageLayout>
      <SEOHead
        title="About"
        description="Learn about Ateet Vatan's background in AI engineering, LLM systems, multi-agent architectures, and full-stack development."
      />
      <div className="min-h-screen py-20 px-6 md:px-20 max-w-[900px] mx-auto">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-4 mt-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : error || !aboutContent ? (
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
              About <span className="highlight">Me</span>
            </h1>
            <p style={{ color: 'var(--mono-muted)' }}>
              Unable to load profile information. Please try again later.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-12">
              <h2 className="font-heading text-xl mb-4" style={{ color: 'var(--mono-text)' }}>
                My Vision<span className="highlight">.</span>
              </h2>
              <video
                className="w-full rounded-lg"
                style={{ border: '1px solid var(--mono-border)' }}
                controls
                preload="metadata"
              >
                <source src="/videos/vision.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mb-12">
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--mono-text)' }}>
                {aboutContent.name}<span className="highlight">.</span>
              </h1>
              <p className="text-xl font-mono mb-4" style={{ color: 'var(--mono-primary)' }}>
                {aboutContent.title}
              </p>
              <p className="text-lg" style={{ color: 'var(--mono-muted)' }}>
                {aboutContent.tagline}
              </p>
            </div>

            <div className="prose prose-monolith max-w-none mb-12">
              <div style={{ color: 'var(--mono-muted)' }} className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: aboutContent.bio.replace(/\*\*(.*?)\*\*/g, '<span style="color: var(--mono-primary); font-weight: 600;">$1</span>') }} />
            </div>



            <div className="mb-12">
              <h2 className="font-heading text-xl mb-4" style={{ color: 'var(--mono-text)' }}>Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {aboutContent.expertise.map((skill, index) => (
                  <span key={index} className="tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-12" style={{ borderTop: '1px solid var(--mono-border)' }}>
              <div className="whitespace-pre-line mb-6" style={{ color: 'var(--mono-muted)' }}>
                {aboutContent.cta_footer}
              </div>
              <Link to="/contact" className="btn-primary inline-block">
                Let's build something together
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default About;
