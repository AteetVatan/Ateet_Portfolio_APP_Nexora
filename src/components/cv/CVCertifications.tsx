
import React from 'react';
import { Award } from 'lucide-react';

interface CVCertificationsProps {
  certifications: string[];
}

const CVCertifications: React.FC<CVCertificationsProps> = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {certifications?.map((cert, index) => (
        <div key={index} className="flex items-center bg-[#0a131c] p-3 rounded-md border border-[#1e3a4a] text-white">
          <Award className="text-[#00c3ff] w-5 h-5 mr-3 flex-shrink-0" />
          <span>{cert}</span>
        </div>
      ))}
    </div>
  );
};

export default CVCertifications;
