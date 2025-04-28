
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

// Import our modular footer components
import FooterSection from './footer/FooterSection';
import BrandSection from './footer/BrandSection';
import QuickLinks from './footer/QuickLinks';
import BlogCategories from './footer/BlogCategories';
import ContactInfo from './footer/ContactInfo';
import FooterCopyright from './footer/FooterCopyright';

/**
 * Footer component
 * Displays the site footer with multiple sections: brand, navigation, and contact
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    twitter: '',
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('cv')
          .select('email, phone, linkedin, github, twitter')
          .single();
        
        if (error) {
          console.error('Error fetching contact info:', error);
        } else if (data) {
          setContactInfo({
            email: data.email || '',
            phone: data.phone || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            twitter: data.twitter || '',
          });
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);
  
  /**
   * Handles the CV download button click
   */
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://bidswcansixttbhmwpkj.functions.supabase.co/generate-cv-pdf', '_blank');
  };
  
  return (
    <footer>
      <div className="pt-12 pb-6 px-6 md:px-16 lg:px-24 border-t border-[#1e3a4a]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <BrandSection 
            github={contactInfo.github}
            linkedin={contactInfo.linkedin}
            twitter={contactInfo.twitter}
          />
          
          {/* Quick links */}
          <FooterSection title="Quick Links">
            <QuickLinks />
          </FooterSection>
          
          {/* Blog categories */}
          <FooterSection title="Blog Categories">
            <BlogCategories />
          </FooterSection>
          
          {/* Contact information */}
          <FooterSection title="Contact">
            <ContactInfo 
              email={contactInfo.email}
              phone={contactInfo.phone}
              onDownloadCV={handleDownloadCV}
            />
          </FooterSection>
        </div>
        
        {/* Copyright and legal */}
        <FooterCopyright 
          name="Ateet Vatan Bahmani"
          year={currentYear}
        />
      </div>
    </footer>
  );
};

export default Footer;
