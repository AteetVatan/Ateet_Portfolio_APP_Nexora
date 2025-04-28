
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillCategory {
  [category: string]: string[];
}

interface CVSkillsProps {
  skills: SkillCategory;
}

const CVSkills: React.FC<CVSkillsProps> = ({ skills }) => {
  return (
    <Card className="bg-[#0c1824] border-[#1e3a4a] relative z-10">
      <CardHeader>
        <CardTitle className="text-[#00c3ff]">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills && Object.entries(skills).map(([category, skillSet]) => (
            <div key={category} className="border border-[#1e3a4a] rounded-md p-4 bg-[#0a131c]">
              <h3 className="font-bold text-[#00c3ff] mb-3 text-lg">{category}</h3>
              <div className="flex flex-wrap">
                {skillSet.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-xs bg-[#1e3a4a] text-[#b9dcea] px-2 py-1 rounded m-1 inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVSkills;
