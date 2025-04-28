
import React, { useEffect } from 'react';
import { useMasxAiDetails } from '../hooks/use-masx-ai';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  ExternalLink, 
  Code, 
  Layers, 
  Calendar, 
  Target, 
  User, 
  Lightbulb, 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare, 
  BookOpen
} from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';

const MasxAICaseStudy: React.FC = () => {
  const { data: masxAi, isLoading, error } = useMasxAiDetails();

  useEffect(() => {
    document.title = "MASX AI Case Study - Developer Portfolio";
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
              <div className="grid md:grid-cols-2 gap-8">
                <Skeleton className="h-48 bg-[#1e3a4a]" />
                <Skeleton className="h-48 bg-[#1e3a4a]" />
              </div>
              <Skeleton className="h-64 bg-[#1e3a4a]" />
            </div>
          ) : error || !masxAi ? (
            <div className="terminal-section max-w-lg text-center p-6">
              <h1 className="text-3xl font-mono text-white mb-4">
                MASX <span className="text-[#00c3ff]">AI_</span> Case Study
              </h1>
              <p className="text-[#85a5b3]">
                Unable to load MASX AI project details. Please try again later.
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Project Header */}
              <section className="case-study-header">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-[#00c3ff] mr-2" />
                  <h3 className="text-md text-[#00c3ff] font-mono">CASE STUDY</h3>
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
                    <div className="case-study-timeframe">
                      <Calendar className="h-4 w-4 mr-2 text-[#00c3ff]" />
                      {masxAi.timeframe}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {masxAi.tech_stack?.map((tech, index) => (
                      <span key={index} className="case-study-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </section>
              
              {/* Problem Statement */}
              {masxAi.problem_statement && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <Target className="mr-3 h-5 w-5" /> Problem Statement
                  </h2>
                  <div className="case-study-section">
                    <p>{masxAi.problem_statement}</p>
                  </div>
                </section>
              )}
              
              {/* My Role */}
              {masxAi.role_description && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <User className="mr-3 h-5 w-5" /> My Role
                  </h2>
                  <div className="case-study-section">
                    <div className="whitespace-pre-line">{masxAi.role_description}</div>
                  </div>
                </section>
              )}
              
              {/* Key Innovations */}
              {masxAi.key_innovations && masxAi.key_innovations.length > 0 && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <Lightbulb className="mr-3 h-5 w-5" /> Key Innovations & Outcomes
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {masxAi.key_innovations.map((innovation, index) => (
                      <Card key={index} className="case-study-module">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <p className="text-[#85a5b3] text-base">{innovation.feature}</p>
                            <p className="text-[#00c3ff] text-sm font-mono">{innovation.impact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Architecture */}
              <section>
                <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                  <Layers className="mr-3 h-5 w-5" /> Architecture
                </h2>
                <div className="case-study-section">
                  <p className="whitespace-pre-line">{masxAi.architecture}</p>
                  
                  {masxAi.architecture_snapshot && (
                    <div className="mt-6 pt-6 border-t border-[#1e3a4a]">
                      <h3 className="text-lg text-[#00c3ff] mb-3 font-mono">Architecture Snapshot</h3>
                      <div className="case-study-code">
                        {masxAi.architecture_snapshot}
                      </div>
                    </div>
                  )}
                </div>
              </section>
              
              {/* Modules */}
              {masxAi.modules && masxAi.modules.length > 0 && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <LayoutDashboard className="mr-3 h-5 w-5" /> Core Modules
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {masxAi.modules.map((module: any, index: number) => (
                      <Card key={index} className="case-study-module">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[#85a5b3] font-semibold">{module.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-sm ${
                              module.status === 'completed' ? 'module-status-completed' : 
                              module.status === 'in progress' ? 'module-status-inprogress' : 
                              'module-status-default'
                            }`}>
                              {module.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Challenges */}
              {masxAi.challenges && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5" /> Challenges & Lessons Learned
                  </h2>
                  <div className="case-study-section">
                    <div className="whitespace-pre-line">{masxAi.challenges}</div>
                  </div>
                </section>
              )}
              
              {/* Impact */}
              {masxAi.impact && (
                <section>
                  <h2 className="text-2xl font-mono text-[#00c3ff] mb-4 flex items-center">
                    <TrendingUp className="mr-3 h-5 w-5" /> Impact & Future Scope
                  </h2>
                  <div className="case-study-section">
                    <div className="whitespace-pre-line">{masxAi.impact}</div>
                  </div>
                </section>
              )}
              
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
                  </div>
                  
                  {/* Call to Action */}
                  {masxAi.call_to_action && (
                    <div className="case-study-cta">
                      <div className="flex items-start gap-4">
                        <MessageSquare className="h-6 w-6 text-[#00c3ff] flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-[#85a5b3] mb-4">{masxAi.call_to_action}</p>
                          <a href="/contact">
                            <Button className="bg-[#1291c7] hover:bg-[#00c3ff] text-white">
                              Contact Me
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
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

export default MasxAICaseStudy;
