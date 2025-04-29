/**
 * ContactSection Component
 * 
 * This component renders the full contact section of the portfolio, including:
 * 1. A heading and introductory text
 * 2. Contact information loaded from Supabase database
 * 3. Social media links
 * 4. The contact form
 * 
 * It uses Supabase to fetch contact information like email, phone, and social media profiles.
 */

import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ContactSection: React.FC = () => {
  // State to store contact information fetched from database
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
  });
  
  // Loading state for API data
  const [loading, setLoading] = useState(true);

  // Fetch contact information when component mounts
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        // Query the 'cv' table to get contact information
        const { data, error } = await supabase
          .from('cv')
          .select('email, phone, linkedin, github, twitter')
          .single();
        
        if (error) {
          console.error('Error fetching contact info:', error);
        } else if (data) {
          // Update state with fetched data, keeping empty strings as fallbacks
          setContactInfo({
            ...contactInfo,
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
        // Mark loading as complete, whether successful or not
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <section id="contact" className="py-16 px-6 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="w-full text-center mb-12">
        <h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-4">
          OPEN TO AI <span className="text-[#00c3ff]">ROLES_</span>
        </h2>
        <p className="text-[#85a5b3] max-w-2xl mx-auto text-base">
          I'm actively exploring opportunities in LLM system design, agent-based AI, and full-stack automation engineering. 
          Let's connect if you're hiring or collaborating in this space.
        </p>
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-2 terminal-section">
          <h3 className="font-mono text-xl text-white mb-6">Contact Details</h3>
          
          {/* Show loading indicator while fetching data */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 text-[#00c3ff] animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Website Information
              <div className="flex items-start">
                <div className="mr-4 text-[#00c3ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-mono text-white text-sm mb-1">Website</h4>
                  <p className="text-[#85a5b3] text-sm">
                    <a href="#" className="cyber-link">Not Available</a>
                  </p>
                </div>
              </div> */}
              
              {/* Email Information */}
              <div className="flex items-start">
                <div className="mr-4 text-[#00c3ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-mono text-white text-sm mb-1">Email</h4>
                  <p className="text-[#85a5b3] text-sm">
                    {contactInfo.email ? (
                      <a href={`mailto:${contactInfo.email}`} className="cyber-link">{contactInfo.email}</a>
                    ) : (
                      <span className="text-[#4a5568]">Not Available</span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Phone Information */}
              <div className="flex items-start">
                <div className="mr-4 text-[#00c3ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.9167C22 17.2499 21.9182 17.5833 21.7455 17.9166C21.5727 18.2499 21.3455 18.5651 21.0545 18.8561C20.5727 19.3561 20.0364 19.7106 19.4364 19.9288C18.8455 20.1469 18.2091 20.2561 17.5273 20.2561C16.5455 20.2561 15.5 20.0197 14.4 19.5469C13.3 19.0742 12.2 18.4288 11.1 17.6106C10 16.7924 8.95454 15.8743 7.96363 14.8561C6.98181 13.838 6.09091 12.7742 5.29091 11.6651C4.49999 10.5561 3.86363 9.4561 3.39091 8.3651C2.91818 7.26509 2.68181 6.21963 2.68181 5.21963C2.68181 4.55599 2.78182 3.91963 2.99091 3.32872C3.19999 2.72872 3.54545 2.17417 4.03636 1.67417C4.62727 1.08326 5.27272 0.792358 5.95454 0.792358C6.20909 0.792358 6.46363 0.847267 6.7 0.956176C6.94545 1.06508 7.16363 1.22872 7.34545 1.46054L9.54545 4.52872C9.72727 4.77872 9.85454 5.00599 9.94545 5.22417C10.0364 5.43326 10.0909 5.64235 10.0909 5.83326C10.0909 6.07417 10.0182 6.31508 9.87272 6.54735C9.73636 6.77963 9.54545 7.02054 9.30909 7.26145L8.49999 8.11508C8.39091 8.22417 8.34545 8.35145 8.34545 8.50599C8.34545 8.58326 8.35454 8.65145 8.37272 8.72872C8.39999 8.80599 8.42727 8.86508 8.44545 8.92417C8.62727 9.24235 8.93636 9.65144 9.37272 10.1424C9.81818 10.6333 10.2909 11.1242 10.8 11.6151C11.3 12.1061 11.7818 12.5742 12.2727 13.0197C12.7545 13.456 13.1636 13.756 13.4909 13.9379C13.5409 13.956 13.6 13.9833 13.6727 14.0106C13.7545 14.0379 13.8364 14.0469 13.9273 14.0469C14.0909 14.0469 14.2182 13.9924 14.3273 13.8833L15.1364 13.0924C15.3909 12.8379 15.6364 12.6469 15.8727 12.5197C16.1091 12.3742 16.3364 12.3015 16.5909 12.3015C16.7818 12.3015 16.9818 12.347 17.2 12.4379C17.4182 12.5288 17.6545 12.656 17.9091 12.8288L21.0364 15.0742C21.2727 15.256 21.4364 15.4652 21.5364 15.7015C21.6273 15.9379 21.6818 16.1742 21.6818 16.4288C22 16.5742 22 16.7379 22 16.9167Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-mono text-white text-sm mb-1">Phone</h4>
                  <p className="text-[#85a5b3] text-sm">
                    {contactInfo.phone ? (
                      <a href={`tel:${contactInfo.phone}`} className="cyber-link">{contactInfo.phone}</a>
                    ) : (
                      <span className="text-[#4a5568]">Not Available</span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="pt-6 mt-8 border-t border-[#1e3a4a]">
                <h4 className="font-mono text-white text-sm mb-4">Connect on</h4>
                <div className="flex space-x-4">
                  {/* GitHub Link */}
                  <a 
                    href={contactInfo.github ? contactInfo.github : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 border border-[#1e3a4a] rounded flex items-center justify-center
                         text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff] transition-colors ${!contactInfo.github ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 9 21.49V19.5C9 18.837 9.337 18.2 9.875 17.875C7.375 17.25 6 15.738 6 14C6 12.988 6.5 12.012 7.5 11.25C7.25 10.5 7 9.488 7.5 8.75C7.5 8.75 8.25 8.5 10 9.75C10.731 9.423 11.575 9.25 12.5 9.25C13.425 9.25 14.269 9.423 15 9.75C16.75 8.5 17.5 8.75 17.5 8.75C18 9.488 17.75 10.5 17.5 11.25C18.5 12.012 19 12.988 19 14C19 15.738 17.625 17.25 15.125 17.875C15.663 18.2 16 18.837 16 19.5V21.49C20.135 20.166 23 16.419 23 12C23 6.477 18.523 2 13 2H12Z" fill="currentColor"/>
                    </svg>
                  </a>
                  
                  {/* LinkedIn Link */}
                  <a 
                    href={contactInfo.linkedin ? contactInfo.linkedin : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 border border-[#1e3a4a] rounded flex items-center justify-center
                         text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff] transition-colors ${!contactInfo.linkedin ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5 3.5H3.5C2.4 3.5 1.5 4.4 1.5 5.5V18.5C1.5 19.6 2.4 20.5 3.5 20.5H20.5C21.6 20.5 22.5 19.6 22.5 18.5V5.5C22.5 4.4 21.6 3.5 20.5 3.5ZM8 18.5H5V9.5H8V18.5ZM6.5 8C5.4 8 4.5 7.1 4.5 6C4.5 4.9 5.4 4 6.5 4C7.6 4 8.5 4.9 8.5 6C8.5 7.1 7.6 8 6.5 8ZM19 18.5H16V13.1C16 12.1 15.1 11.2 14.1 11.2C13.1 11.2 12.2 12.1 12.2 13.1V18.5H9.2V9.5H12.2V10.8C12.7 10 13.8 9.4 14.8 9.4C17.1 9.5 19 11.4 19 13.7V18.5Z" fill="currentColor"/>
                    </svg>
                  </a>
                  
                  {/* Twitter Link */}
                  <a 
                    href={contactInfo.twitter ? `https://${contactInfo.twitter}` : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 border border-[#1e3a4a] rounded flex items-center justify-center
                         text-[#85a5b3] hover:text-[#00c3ff] hover:border-[#00c3ff] transition-colors ${!contactInfo.twitter ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 5.89C21.26 6.21 20.46 6.42 19.64 6.53C20.49 6.03 21.14 5.24 21.44 4.3C20.65 4.77 19.77 5.1 18.84 5.28C18.09 4.49 17.02 4 15.85 4C13.58 4 11.75 5.81 11.75 8.04C11.75 8.37 11.78 8.69 11.85 9C8.44 8.83 5.42 7.21 3.39 4.75C3.03 5.37 2.83 6.08 2.83 6.84C2.83 8.27 3.56 9.54 4.66 10.26C3.99 10.25 3.36 10.06 2.82 9.75V9.8C2.82 11.78 4.24 13.44 6.13 13.83C5.76 13.93 5.38 13.98 4.98 13.98C4.7 13.98 4.43 13.95 4.16 13.9C4.71 15.5 6.18 16.69 7.93 16.72C6.55 17.81 4.81 18.46 2.94 18.46C2.6 18.46 2.27 18.44 1.94 18.39C3.71 19.56 5.78 20.24 8 20.24C15.84 20.24 20.11 13.9 20.11 8.36C20.11 8.18 20.11 8 20.1 7.83C20.93 7.26 21.64 6.53 22.19 5.7L22 5.89Z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="lg:col-span-3 terminal-section">
          <h3 className="font-mono text-xl text-white mb-6">Send a Message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
