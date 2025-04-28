
import React, { useEffect } from 'react';
import ContactSection from '../components/ContactSection';
import PageLayout from '../components/layout/PageLayout';

/**
 * Contact Page
 * 
 * Displays the contact form and contact information.
 * Uses the PageLayout component for consistent structure.
 */
const Contact: React.FC = () => {
  // Set page title when component mounts
  useEffect(() => {
    document.title = "Contact - Developer Portfolio";
    
    // Analytics tracking could be added here
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-5xl">
          <ContactSection />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
