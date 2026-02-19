
import React from 'react';
import SEOHead from '../components/SEOHead';
import { useMasxAiDetails } from '../hooks/use-masx-ai';
import PageLayout from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  ArrowSquareOut, Code, Stack, CalendarBlank, Crosshair, User, Lightbulb,
  SquaresFour, Warning, TrendUp, ChatCircle, BookOpen
} from '@phosphor-icons/react';
import { Skeleton } from '../components/ui/skeleton';

const MasxAICaseStudy: React.FC = () => {
  const { data: masxAi, isLoading, error } = useMasxAiDetails();



  const SectionHeading = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <h2 className="font-heading text-2xl mb-4 flex items-center" style={{ color: 'var(--mono-text)' }}>
      <Icon className="mr-3 h-5 w-5" style={{ color: 'var(--mono-primary)' }} />
      {children}
    </h2>
  );

  return (
    <PageLayout>
      <SEOHead
        title="MASX AI Case Study"
        description="In-depth case study of the MASX AI system, architecture, implementation, challenges, and outcomes by Ateet Vatan."
      />
      <div className="py-20 px-6 md:px-20 max-w-[900px] mx-auto">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid md:grid-cols-2 gap-8"><Skeleton className="h-48" /><Skeleton className="h-48" /></div>
            <Skeleton className="h-64" />
          </div>
        ) : error || !masxAi ? (
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-4" style={{ color: 'var(--mono-text)' }}>
              MASX <span className="highlight">AI</span> Case Study
            </h1>
            <p style={{ color: 'var(--mono-muted)' }}>Unable to load MASX AI project details.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Header */}
            <section>
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 mr-2" style={{ color: 'var(--mono-primary)' }} />
                <h3 className="text-md font-mono" style={{ color: 'var(--mono-primary)' }}>CASE STUDY</h3>
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
                  {masxAi.tech_stack?.map((tech, index) => (<span key={index} className="tag">{tech}</span>))}
                </div>
              </div>
            </section>

            {masxAi.problem_statement && (
              <section>
                <SectionHeading icon={Crosshair}>Problem Statement</SectionHeading>
                <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                  <p>{masxAi.problem_statement}</p>
                </div>
              </section>
            )}

            {masxAi.role_description && (
              <section>
                <SectionHeading icon={User}>My Role</SectionHeading>
                <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                  <div className="whitespace-pre-line">{masxAi.role_description}</div>
                </div>
              </section>
            )}

            {masxAi.key_innovations && masxAi.key_innovations.length > 0 && (
              <section>
                <SectionHeading icon={Lightbulb}>Key Innovations & Outcomes</SectionHeading>
                <div className="grid md:grid-cols-2 gap-4">
                  {masxAi.key_innovations.map((innovation, index) => (
                    <Card key={index} className="monolith-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <p className="text-base" style={{ color: 'var(--mono-muted)' }}>{innovation.feature}</p>
                          <p className="text-sm font-mono" style={{ color: 'var(--mono-primary)' }}>{innovation.impact}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section>
              <SectionHeading icon={Stack}>Architecture</SectionHeading>
              <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                <p className="whitespace-pre-line">{masxAi.architecture}</p>
                {masxAi.architecture_snapshot && (
                  <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--mono-border)' }}>
                    <h3 className="font-heading text-lg mb-3" style={{ color: 'var(--mono-text)' }}>Architecture Snapshot</h3>
                    <pre className="font-mono text-sm p-4 rounded overflow-x-auto" style={{ background: 'var(--mono-bg)', color: 'var(--mono-muted)' }}>
                      {masxAi.architecture_snapshot}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {masxAi.modules && masxAi.modules.length > 0 && (
              <section>
                <SectionHeading icon={SquaresFour}>Core Modules</SectionHeading>
                <div className="grid md:grid-cols-2 gap-4">
                  {masxAi.modules.map((module: any, index: number) => (
                    <Card key={index} className="monolith-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold" style={{ color: 'var(--mono-muted)' }}>{module.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-sm"
                            style={{
                              background: module.status === 'completed' ? 'rgba(34, 197, 94, 0.15)' :
                                module.status === 'in progress' ? 'rgba(255, 77, 0, 0.15)' : 'rgba(139, 134, 128, 0.15)',
                              color: module.status === 'completed' ? '#22c55e' :
                                module.status === 'in progress' ? 'var(--mono-primary)' : 'var(--mono-muted)',
                            }}>
                            {module.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {masxAi.challenges && (
              <section>
                <SectionHeading icon={Warning}>Challenges & Lessons Learned</SectionHeading>
                <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                  <div className="whitespace-pre-line">{masxAi.challenges}</div>
                </div>
              </section>
            )}

            {masxAi.impact && (
              <section>
                <SectionHeading icon={TrendUp}>Impact & Future Scope</SectionHeading>
                <div className="monolith-card p-6" style={{ color: 'var(--mono-muted)' }}>
                  <div className="whitespace-pre-line">{masxAi.impact}</div>
                </div>
              </section>
            )}

            <section className="pt-8" style={{ borderTop: '1px solid var(--mono-border)' }}>
              <div className="flex flex-col space-y-6">
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
                </div>
                {masxAi.call_to_action && (
                  <div className="monolith-card p-6">
                    <div className="flex items-start gap-4">
                      <ChatCircle className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: 'var(--mono-primary)' }} />
                      <div>
                        <p className="mb-4" style={{ color: 'var(--mono-muted)' }}>{masxAi.call_to_action}</p>
                        <a href="/contact"><Button className="btn-primary">Contact Me</Button></a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MasxAICaseStudy;
