import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import ExpertiseSection from '../components/ExpertiseSection';
import TrustedBySection from '../components/TrustedBySection';
import ProjectShowcase from '../components/ProjectShowcase';
import SignalsOfTrust from '../components/SignalsOfTrust';
import BlogPreview from '../components/BlogPreview';
import AiNewsPreview from '../components/AiNewsPreview';
import ContactSection from '../components/ContactSection';
import PageLayout from '../components/layout/PageLayout';
import startPinging from '../utils/urlPinger';

const Index: React.FC = () => {

  // Start URL pinging
  useEffect(() => {
    startPinging();
  }, []);

  return (
    <PageLayout>
      <SEOHead
        title="Ateet Vatan | AI Engineer, LLM Integration & Agentic AI Systems"
        description="Portfolio of Ateet Vatan, AI engineer specializing in LLM integration, multi-agent architectures, AI workflow automation, and production AI systems."
      />
      <Hero />
      <ExpertiseSection />
      <TrustedBySection />
      <ProjectShowcase />
      <SignalsOfTrust />
      <BlogPreview />
      <AiNewsPreview />
      <ContactSection />
    </PageLayout>
  );
};

export default Index;
