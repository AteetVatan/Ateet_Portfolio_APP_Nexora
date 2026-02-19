import React from 'react';

interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface CVEducationProps {
  education: EducationEntry[];
}

const CVEducation: React.FC<CVEducationProps> = ({ education }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '2px solid var(--mono-border)' }}>
            <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--mono-text)' }}>Degree</th>
            <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--mono-text)' }}>Institution</th>
            <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--mono-text)' }}>Year</th>
            <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--mono-text)' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {education?.map((entry, index) => (
            <tr key={index} style={{ borderBottom: '1px solid var(--mono-border)' }}>
              <td className="py-3 px-4" style={{ color: 'var(--mono-text)' }}>{entry.degree}</td>
              <td className="py-3 px-4" style={{ color: 'var(--mono-muted)' }}>{entry.institution}</td>
              <td className="py-3 px-4 font-mono" style={{ color: 'var(--mono-muted)' }}>{entry.year}</td>
              <td className="py-3 px-4" style={{ color: 'var(--mono-muted)' }}>{entry.grade || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CVEducation;
