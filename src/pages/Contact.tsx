
import React from 'react';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import ContactForm from '../components/ContactForm';
import PageLayout from '../components/layout/PageLayout';

/**
 * Contact Page
 * 
 * Displays the contact form and contact information.
 * Uses the PageLayout component for consistent structure.
 */
const Contact: React.FC = () => {

  return (
    <PageLayout>
      <SEOHead
        title="Contact"
        description="Get in touch with Ateet Vatan for AI consulting, LLM integration, agentic system development, and freelance engineering services."
      />
      <div className="min-h-screen flex flex-col items-center justify-center py-16 gap-16">
        <div className="w-full max-w-5xl">
          <ContactSection />
        </div>
        <div className="w-full max-w-2xl px-6">
          <h3 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--mono-text)' }}>
            Send a Message
          </h3>
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;

