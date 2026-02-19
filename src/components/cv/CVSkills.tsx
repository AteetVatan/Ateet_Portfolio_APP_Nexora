import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CVSkillsProps {
  skills: {
    category: string;
    items: string[];
  }[];
}

const CVSkills: React.FC<CVSkillsProps> = ({ skills }) => {
  return (
    <div className="space-y-2">
      {skills?.map((skillGroup, index) => (
        <div key={index} className="rounded p-4" style={{ background: 'var(--mono-surface)', border: '1px solid var(--mono-border)' }}>
          <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--mono-text)' }}>
            {skillGroup.category}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {skillGroup.items?.map((skill, skillIndex) => (
              <span key={skillIndex} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CVSkills;
