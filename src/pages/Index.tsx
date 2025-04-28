
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ExpertiseSection from '../components/ExpertiseSection';
import ProjectShowcase from '../components/ProjectShowcase';
import BlogPreview from '../components/BlogPreview';
import ContactSection from '../components/ContactSection';
import PageLayout from '../components/layout/PageLayout';

const Index: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = "Developer - Full Stack Developer & AI Engineer";
  }, []);
  
  return (
    <PageLayout>
      <Hero />
      <ExpertiseSection />
      <ProjectShowcase />
      <BlogPreview />
      <ContactSection />
    </PageLayout>
  );
};

export default Index;
