
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadCV } from '@/utils/cv';

interface CVLanguagesProps {
  languages: {
    [language: string]: string;
  };
  onDownload?: (e: React.MouseEvent) => void;
}

/**
 * CV Languages component - displays language proficiency levels
 */
const CVLanguages: React.FC<CVLanguagesProps> = ({ languages, onDownload }) => {
  const handleDownload = (e: React.MouseEvent) => {
    if (onDownload) {
      onDownload(e);
    } else {
      downloadCV(e);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {languages && Object.entries(languages).map(([language, level]) => (
          <div key={language} className="flex justify-between items-center bg-[#0a131c] p-3 rounded-md border border-[#1e3a4a] text-white">
            <span className="font-medium text-[#b9dcea]">{language}</span>
            <span className="text-[#00c3ff]">{level}</span>
          </div>
        ))}
      </div>

      {/* Floating download button - fixed at bottom right */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <Button 
          size="icon" 
          className="rounded-full h-12 w-12 bg-[#00c3ff] text-white hover:bg-[#00c3ff]/80 shadow-lg"
          onClick={handleDownload}
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CVLanguages;
