
import React, { useEffect } from 'react';
import { useMasxAiDetails } from '../hooks/use-masx-ai';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Code, 
  ArrowRight, 
  Calendar, 
  FileText
} from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { removeReligiousReferences } from '../utils/removeReligiousReferences';
import { useToast } from '@/hooks/use-toast';

const MasxAI: React.FC = () => {
  const { data: masxAi, isLoading, error } = useMasxAiDetails();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "MASX AI - Developer Portfolio";
    
    // Execute the removal of religious references
    const cleanupReferences = async () => {
      const success = await removeReligiousReferences();
      if (success) {
        console.log("Successfully removed religious references");
      }
    };
    
    cleanupReferences();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <GridBackground />
      
      <div className="hidden md:block md:fixed md:left-0 md:top-0 md:bottom-0 md:w-60 lg:w-64 z-20">
        <Navigation />
      </div>
      
      <main className="flex-grow w-full max-w-screen-2xl mx-auto md:pl-24 lg:pl-32">
        <div className="min-h-screen py-12 px-6 md:px-12">
          {isLoading ? (
            <div className="space-y-8 max-w-4xl mx-auto">
              <Skeleton className="h-12 w-3/4 bg-[#1e3a4a]" />
              <Skeleton className="h-6 w-1/2 bg-[#1e3a4a]" />
              <Skeleton className="h-64 bg-[#1e3a4a]" />
            </div>
          ) : error || !masxAi ? (
            <div className="terminal-section max-w-lg text-center p-6">
              <h1 className="text-3xl font-mono text-white mb-4">
                MASX <span className="text-[#00c3ff]">AI_</span>
              </h1>
              <p className="text-[#85a5b3]">
                Unable to load MASX AI project details. Please try again later.
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Project Header */}
              <section className="text-center md:text-left">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-[#00c3ff] mr-2" />
                  <h3 className="text-md text-[#00c3ff] font-mono">OVERVIEW</h3>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono text-white">
                  {masxAi.title} <span className="text-[#00c3ff]">_</span>
                </h1>
                {masxAi.tagline && (
                  <p className="text-xl md:text-2xl text-[#00c3ff] mt-3 font-mono">
                    {masxAi.tagline}
                  </p>
                )}
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                  {masxAi.timeframe && (
                    <div className="flex items-center text-[#85a5b3] text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-[#00c3ff]" />
                      {masxAi.timeframe}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {masxAi.tech_stack?.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-sm 
                        bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Project Description */}
              <section className="text-[#85a5b3] bg-[#0c1824] border border-[#1e3a4a] p-6 rounded-md">
                <div className="whitespace-pre-line mb-6">
                  {masxAi.description || "No description available."}
                </div>
                
                <Link to="/masx-ai/case-study" className="inline-flex items-center text-[#00c3ff] hover:text-white transition-colors">
                  <span className="mr-2">Read the full case study</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
              
              {/* Mission */}
              <section>
                <h2 className="text-2xl font-mono text-[#00c3ff] mb-4">The Mission</h2>
                <div className="text-[#85a5b3] bg-[#0c1824] border border-[#1e3a4a] p-6 rounded-md">
                  <p className="whitespace-pre-line">{masxAi.mission}</p>
                </div>
              </section>
              
              {/* Links and Call to Action */}
              <section className="pt-8 border-t border-[#1e3a4a]">
                <div className="flex flex-col space-y-6">
                  {/* Project Links */}
                  <div className="flex flex-wrap gap-4">
                    {masxAi.demo_url && (
                      <a href={masxAi.demo_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" className="bg-[#1291c7] hover:bg-[#00c3ff] text-white">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Button>
                      </a>
                    )}
                    
                    {masxAi.github_url && (
                      <a href={masxAi.github_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
                          <Code className="mr-2 h-4 w-4" /> View Code
                        </Button>
                      </a>
                    )}
                    
                    <Link to="/masx-ai/case-study">
                      <Button variant="outline" className="border-[#1e3a4a] text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff]">
                        <FileText className="mr-2 h-4 w-4" /> Case Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MasxAI;
