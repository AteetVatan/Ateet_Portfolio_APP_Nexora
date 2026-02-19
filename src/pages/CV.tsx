import React, { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, Student, Medal, Translate } from '@phosphor-icons/react';
import { toast } from "@/hooks/use-toast";
import { CVData, downloadCV } from '@/utils/cv';
import PageLayout from '@/components/layout/PageLayout';

import CVProfile from '@/components/cv/CVProfile';
import CVSummary from '@/components/cv/CVSummary';
import CVSkills from '@/components/cv/CVSkills';
import CVCollapsibleSection from '@/components/cv/CVCollapsibleSection';
import CVExperience from '@/components/cv/CVExperience';
import CVEducation from '@/components/cv/CVEducation';
import CVCertifications from '@/components/cv/CVCertifications';
import CVLanguages from '@/components/cv/CVLanguages';
import PageCTA from '@/components/PageCTA';

const CV: React.FC = () => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    experience: true, education: true, certifications: true, languages: true
  });

  useEffect(() => {
    fetchCV();
    console.log("%c👋 Hey there, curious developer!", "font-size: 16px; color: #FF4D00;");
  }, []);

  const fetchCV = async () => {
    try {
      const { data, error } = await supabase.from('cv').select('*').eq('user_name', 'ateet').eq('language', 'en').single();
      if (error) {
        console.error("Error fetching CV:", error);
        toast({ title: "Failed to load CV data", description: "Please try refreshing the page", variant: "destructive" });
      } else {
        setCvData(data as CVData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDownloadCV = (e: React.MouseEvent) => { downloadCV(e); };

  // Transform CVData shapes to match sub-component props
  const transformSkills = (skills: any) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills; // already array format
    // Record<string, string[]> → { category, items }[]
    return Object.entries(skills).map(([category, items]) => ({
      category,
      items: Array.isArray(items) ? items : [],
    }));
  };

  const transformExperience = (experience: any) => {
    if (!experience || !Array.isArray(experience)) return [];
    return experience.map((entry: any) => ({
      company: entry.company || '',
      role: entry.role || entry.title || '',
      duration: entry.duration || entry.dates || '',
      responsibilities: entry.responsibilities || [],
      technologies: entry.technologies || [],
    }));
  };

  const transformEducation = (education: any) => {
    if (!education || !Array.isArray(education)) return [];
    return education.map((entry: any) => ({
      degree: entry.degree || '',
      institution: entry.institution || '',
      year: String(entry.year || ''),
      grade: entry.grade || '',
    }));
  };

  const transformCertifications = (certifications: any) => {
    if (!certifications) return [];
    if (!Array.isArray(certifications)) return [];
    return certifications.map((cert: any) =>
      typeof cert === 'string' ? { name: cert } : cert
    );
  };

  const transformLanguages = (languages: any) => {
    if (!languages) return [];
    if (Array.isArray(languages)) return languages; // already array format
    // Record<string, string> → { name, level }[]
    return Object.entries(languages).map(([name, level]) => ({
      name,
      level: String(level),
    }));
  };

  return (
    <PageLayout>
      <SEOHead
        title="CV"
        description="Download the CV and explore Ateet Vatan's professional experience, skills, and certifications in AI engineering and full-stack development."
      />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse" style={{ color: 'var(--mono-primary)' }}>Loading CV...</div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 py-16 px-6 md:px-16 lg:px-24">
          {cvData && (
            <>
              <CVProfile
                name={cvData.name} title={cvData.title} location={cvData.location}
                phone={cvData.phone} email={cvData.email} linkedin={cvData.linkedin}
                github={cvData.github} twitter={cvData.twitter || ''}
                work_authorization={(cvData as any).work_authorization || ''}
                onDownload={handleDownloadCV}
              />
              <CVSummary summary={cvData.summary} onDownload={handleDownloadCV} />
              <CVSkills skills={transformSkills(cvData.skills)} />
              <CVCollapsibleSection title="Professional Experience"
                icon={<Briefcase className="mr-2 h-5 w-5" style={{ color: 'var(--mono-primary)' }} />}
                isOpen={openSections.experience} toggleSection={() => toggleSection('experience')}>
                <CVExperience experience={transformExperience(cvData.experience)} />
              </CVCollapsibleSection>
              <CVCollapsibleSection title="Education"
                icon={<Student className="mr-2 h-5 w-5" style={{ color: 'var(--mono-primary)' }} />}
                isOpen={openSections.education} toggleSection={() => toggleSection('education')}>
                <CVEducation education={transformEducation(cvData.education)} />
              </CVCollapsibleSection>
              <CVCollapsibleSection title="Certifications"
                icon={<Medal className="mr-2 h-5 w-5" style={{ color: 'var(--mono-primary)' }} />}
                isOpen={openSections.certifications} toggleSection={() => toggleSection('certifications')}>
                <CVCertifications certifications={transformCertifications(cvData.certifications)} />
              </CVCollapsibleSection>
              <CVCollapsibleSection title="Languages"
                icon={<Translate className="mr-2 h-5 w-5" style={{ color: 'var(--mono-primary)' }} />}
                isOpen={openSections.languages} toggleSection={() => toggleSection('languages')}>
                <CVLanguages languages={transformLanguages(cvData.languages)} onDownload={handleDownloadCV} />
              </CVCollapsibleSection>

              {/* CTA */}
              <PageCTA text="Let's connect" />
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default CV;
