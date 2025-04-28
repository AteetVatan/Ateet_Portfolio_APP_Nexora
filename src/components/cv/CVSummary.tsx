import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadCV } from '@/utils/cv';

interface CVSummaryProps {
  summary: string;
  onDownload?: (e: React.MouseEvent) => void;
}

/**
 * CV Summary component - displays professional summary and a download button
 */
const CVSummary: React.FC<CVSummaryProps> = ({ summary, onDownload }) => {
  const handleDownload = (e: React.MouseEvent) => {
    if (onDownload) {
      onDownload(e);
    } else {
      downloadCV(e);
    }
  };

  return (
    <Card className="bg-[#0c1824] border-[#1e3a4a] relative z-10">
      <CardHeader>
        <CardTitle className="text-[#00c3ff] flex items-center">
          <User className="mr-2 h-5 w-5" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[#e4e6e9] leading-relaxed mb-4">
          {summary || "Experienced full stack developer with expertise in modern web technologies and a passion for creating efficient, scalable applications."}
        </p>
        
        {/* Download CV button after summary */}
        <div className="flex justify-end mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-[#00c3ff] border-[#1e3a4a] hover:bg-[#1291c7]/20 hover:text-[#00c3ff]"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVSummary;
