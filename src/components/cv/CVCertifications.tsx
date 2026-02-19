import React from 'react';
import { Medal } from '@phosphor-icons/react';

interface Certification {
  name: string;
  issuer?: string;
  year?: string;
}

interface CVCertificationsProps {
  certifications: Certification[];
}

const CVCertifications: React.FC<CVCertificationsProps> = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {certifications?.map((cert, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-4 rounded transition-all duration-300"
          style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)' }}
        >
          <Medal className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--mono-primary)' }} />
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--mono-text)' }}>{cert.name}</p>
            {cert.issuer && <p className="text-xs" style={{ color: 'var(--mono-muted)' }}>{cert.issuer}</p>}
            {cert.year && <p className="text-xs font-mono" style={{ color: 'var(--mono-muted)' }}>{cert.year}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CVCertifications;
