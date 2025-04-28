import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, GraduationCap, Award, Languages } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { CVData, downloadCV } from '@/utils/cv';
import PageLayout from '@/components/layout/PageLayout';

// Import our CV components
import CVProfile from '@/components/cv/CVProfile';
import CVSummary from '@/components/cv/CVSummary';
import CVSkills from '@/components/cv/CVSkills';
import CVCollapsibleSection from '@/components/cv/CVCollapsibleSection';
import CVExperience from '@/components/cv/CVExperience';
import CVEducation from '@/components/cv/CVEducation';
import CVCertifications from '@/components/cv/CVCertifications';
import CVLanguages from '@/components/cv/CVLanguages';

/**
 * CV Component - Displays a professional CV/resume with interactive sections
 */
const CV: React.FC = () => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    experience: true,
    education: true,
    certifications: true,
    languages: true
  });

  useEffect(() => {
    document.title = "Developer - CV";
    fetchCV();
    
    // Add console log for debugging
    console.log("%c👋 Hey there, curious developer!", "font-size: 16px; color: #00c3ff;");
    console.log("%cFeel free to check out how this CV page was built!", "font-size: 14px;");
  }, []);

  /**
   * Fetch CV data from the Supabase database
   */
  const fetchCV = async () => {
    try {
      const { data, error } = await supabase
        .from('cv')
        .select('*')
        .single();

      if (error) {
        console.error("Error fetching CV:", error);
        toast({
          title: "Failed to load CV data",
          description: "Please try refreshing the page",
          variant: "destructive"
        });
      } else {
        setCvData(data as CVData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle visibility of CV sections
   */
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  /**
   * Handle CV download request
   * @param e - React mouse event
   */
  const handleDownloadCV = (e: React.MouseEvent) => {
    downloadCV(e);
  };

  return (
    <PageLayout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-[#00c3ff]">Loading CV...</div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 py-16 px-6 md:px-16 lg:px-24">
          {cvData && (
            <>
              <CVProfile 
                name={cvData.name} 
                title={cvData.title}
                location={cvData.location}
                phone={cvData.phone}
                email={cvData.email}
                linkedin={cvData.linkedin}
                onDownload={handleDownloadCV}
              />

              <CVSummary summary={cvData.summary} onDownload={handleDownloadCV} />
              
              <CVSkills skills={cvData.skills} />
              
              <CVCollapsibleSection 
                title="Professional Experience"
                icon={<Briefcase className="mr-2 h-5 w-5" />}
                isOpen={openSections.experience}
                toggleSection={() => toggleSection('experience')}
              >
                <CVExperience experiences={cvData.experience} />
              </CVCollapsibleSection>
              
              <CVCollapsibleSection 
                title="Education"
                icon={<GraduationCap className="mr-2 h-5 w-5" />}
                isOpen={openSections.education}
                toggleSection={() => toggleSection('education')}
              >
                <CVEducation education={cvData.education} />
              </CVCollapsibleSection>
              
              <CVCollapsibleSection 
                title="Certifications"
                icon={<Award className="mr-2 h-5 w-5" />}
                isOpen={openSections.certifications}
                toggleSection={() => toggleSection('certifications')}
              >
                <CVCertifications certifications={cvData.certifications} />
              </CVCollapsibleSection>
              
              <CVCollapsibleSection 
                title="Languages"
                icon={<Languages className="mr-2 h-5 w-5" />}
                isOpen={openSections.languages}
                toggleSection={() => toggleSection('languages')}
              >
                <CVLanguages 
                  languages={cvData.languages} 
                  onDownload={handleDownloadCV}
                />
              </CVCollapsibleSection>
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default CV;
