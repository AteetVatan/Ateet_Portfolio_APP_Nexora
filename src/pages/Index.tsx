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
import VoiceAgentCTA from '../components/VoiceAgentCTA';

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
        jsonLd={{
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ateet.masxai.com/' },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://ateet.masxai.com/projects' },
            { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://ateet.masxai.com/blog' },
            { '@type': 'ListItem', position: 4, name: 'Services', item: 'https://ateet.masxai.com/services' },
            { '@type': 'ListItem', position: 5, name: 'About', item: 'https://ateet.masxai.com/about' },
            { '@type': 'ListItem', position: 6, name: 'Contact', item: 'https://ateet.masxai.com/contact' },
          ],
        }}
      />
      <Hero />
      <VoiceAgentCTA />
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
