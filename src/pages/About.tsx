import React, { useEffect } from 'react';
import { useAboutContent } from '../hooks/use-about-content';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const About: React.FC = () => {
  const { data: aboutContent, isLoading, error } = useAboutContent();

  // Set page title
  useEffect(() => {
    document.title = "About Me - Developer Portfolio";
  }, []);
  
  return (
    <PageLayout>
      <div className="min-h-screen py-12 px-6 md:px-12">
        {isLoading ? (
          <div className="terminal-section max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-12 w-2/3 bg-[#1e3a4a]" />
            <Skeleton className="h-6 w-1/2 bg-[#1e3a4a]" />
            <div className="space-y-4 mt-8">
              <Skeleton className="h-4 w-full bg-[#1e3a4a]" />
              <Skeleton className="h-4 w-full bg-[#1e3a4a]" />
              <Skeleton className="h-4 w-3/4 bg-[#1e3a4a]" />
            </div>
          </div>
        ) : error || !aboutContent ? (
          <div className="terminal-section max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-mono text-white mb-4">
              ABOUT <span className="text-[#00c3ff]">ME_</span>
            </h1>
            <p className="text-[#85a5b3]">
              Unable to load profile information. Please try again later.
            </p>
          </div>
        ) : (
          <div className="terminal-section max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-mono text-white mb-2">
                {aboutContent.name} <span className="text-[#00c3ff]">_</span>
              </h1>
              <p className="text-xl text-[#00c3ff] font-mono mb-4">
                {aboutContent.title}
              </p>
              <p className="text-lg text-[#85a5b3]">
                {aboutContent.tagline}
              </p>
            </div>
            
            <div className="prose prose-invert prose-cyan max-w-none mb-12">
              <div className="text-[#85a5b3] whitespace-pre-line" 
                   dangerouslySetInnerHTML={{ __html: aboutContent.bio.replace(/\*\*(.*?)\*\*/g, '<span class="text-[#00c3ff] font-semibold">$1</span>') }} />
            </div>
            
            <div className="mb-12">
              <h2 className="text-xl font-mono text-[#00c3ff] mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {aboutContent.expertise.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-sm rounded-sm 
                             bg-[#0c1824] text-[#85a5b3] border border-[#1e3a4a]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-[#1e3a4a] pt-8 mt-12">
              <div className="text-[#85a5b3] whitespace-pre-line mb-6">
                {aboutContent.cta_footer}
              </div>
              <Link to="/contact">
                <Button className="bg-[#1291c7] hover:bg-[#00c3ff] text-white">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default About;
