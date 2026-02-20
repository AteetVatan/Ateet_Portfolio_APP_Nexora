/**
 * ContactSection — Monolith split contact layout
 * Left: dark CTA pane / Right: contact items + form
 */

import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import { supabase } from "@/integrations/supabase/client";
import { SpinnerGap, Envelope, GithubLogo, LinkedinLogo, ArrowSquareOut } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';

const ContactSection: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        type CvRow = {
          email: string;
          linkedin: string;
          github: string;
          twitter: string;
          user_name: string;
          language: string;
        };

        const { data, error } = await supabase
          .from<CvRow>('cv')
          .select('email, phone, linkedin, github, twitter, user_name, language')
          .eq('user_name', 'ateet')
          .eq('language', 'en')
          .single();

        if (error) {
          console.error('Error fetching contact info:', error);
        } else if (data) {
          setContactInfo({
            ...contactInfo,
            email: data.email || '',
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

  return (
    <section id="contact">
      {/* Split layout */}
      <div className="contact-split">
        {/* Left CTA pane */}
        <div className="contact-left">
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '16px' }}>
            Let's build<br />something great.
          </h2>
          <p style={{ opacity: 0.7, maxWidth: '400px', marginBottom: '32px' }}>
            Open to AI roles, freelance projects, and collaborations in LLM system design.
          </p>
          <Link to="/contact#send-message" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            Send Message
          </Link>
        </div>

        {/* Right contact items */}
        <div className="contact-right">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <SpinnerGap className="h-8 w-8 animate-spin" style={{ color: 'var(--mono-primary)' }} />
            </div>
          ) : (
            <>
              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon"><Envelope className="w-5 h-5" style={{ color: 'var(--mono-primary)' }} /></div>
                <div>
                  <h4 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--mono-text)' }}>Email</h4>
                  {contactInfo.email ? (
                    <a href={`mailto:${contactInfo.email}`} className="text-sm no-underline" style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}>
                      {contactInfo.email}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: 'var(--mono-muted)' }}>Not Available</span>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <div className="contact-icon"><LinkedinLogo className="w-5 h-5" style={{ color: 'var(--mono-primary)' }} /></div>
                <div>
                  <h4 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--mono-text)' }}>LinkedIn</h4>
                  {contactInfo.linkedin ? (
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}>
                      Connect
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: 'var(--mono-muted)' }}>Not Available</span>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <div className="contact-icon"><GithubLogo className="w-5 h-5" style={{ color: 'var(--mono-primary)' }} /></div>
                <div>
                  <h4 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--mono-text)' }}>GitHub</h4>
                  {contactInfo.github ? (
                    <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}>
                      Repositories
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: 'var(--mono-muted)' }}>Not Available</span>
                  )}
                </div>
              </div>

              {/* AI Clone */}
              <div className="contact-item">
                <div className="contact-icon"><ArrowSquareOut className="w-5 h-5" style={{ color: 'var(--mono-primary)' }} /></div>
                <div>
                  <h4 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--mono-text)' }}>AI Clone</h4>
                  <a href="https://ateetclone.masxai.com/" target="_blank" rel="noopener noreferrer" className="text-sm no-underline" style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}>
                    Talk to my AI
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
