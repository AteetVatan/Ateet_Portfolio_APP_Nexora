import React from 'react';
import { Download } from 'lucide-react';

interface Language {
  name: string;
  level: string;
}

interface CVLanguagesProps {
  languages: Language[];
  onDownload: (e: React.MouseEvent) => void;
}

const CVLanguages: React.FC<CVLanguagesProps> = ({ languages, onDownload }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.isArray(languages) && languages.map((lang, index) => (
          <div
            key={index}
            className="p-4 rounded text-center transition-all duration-300"
            style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)' }}
          >
            <p className="font-heading font-semibold" style={{ color: 'var(--mono-text)' }}>{lang.name}</p>
            <p className="text-sm font-mono" style={{ color: 'var(--mono-muted)' }}>{lang.level}</p>
          </div>
        ))}
      </div>

      {/* Floating download FAB for mobile */}
      <button
        onClick={onDownload}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 md:hidden"
        style={{ background: 'var(--mono-primary)', color: '#fff' }}
        aria-label="Download CV"
      >
        <Download className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CVLanguages;
