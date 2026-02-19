import React from 'react';

interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies?: string[];
}

interface CVExperienceProps {
  experience: ExperienceEntry[];
}

const CVExperience: React.FC<CVExperienceProps> = ({ experience }) => {
  return (
    <div className="space-y-6">
      {experience?.map((entry, index) => (
        <div key={index} className="relative pl-6" style={{ borderLeft: '2px solid var(--mono-border)' }}>
          <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full" style={{ background: 'var(--mono-primary)' }} />
          <h4 className="font-heading text-lg" style={{ color: 'var(--mono-text)' }}>{entry.role}</h4>
          <p className="text-sm mb-2" style={{ color: 'var(--mono-primary)' }}>{entry.company}</p>
          <p className="text-xs mb-3 font-mono" style={{ color: 'var(--mono-muted)' }}>{entry.duration}</p>
          <ul className="space-y-1">
            {entry.responsibilities?.map((item, i) => (
              <li key={i} className="text-sm" style={{ color: 'var(--mono-muted)' }}>{item}</li>
            ))}
          </ul>
          {entry.technologies && entry.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {entry.technologies.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CVExperience;
