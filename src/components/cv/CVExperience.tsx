
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

interface CVExperienceProps {
  experiences: Experience[];
}

const CVExperience: React.FC<CVExperienceProps> = ({ experiences }) => {
  return (
    <div className="space-y-6">
      {experiences?.map((exp, index) => (
        <div key={index} className="border-l-2 border-[#1e3a4a] pl-4 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-[#00c3ff]">{exp.title}</h3>
              <p className="text-[#e4e6e9] font-medium">{exp.company}</p>
            </div>
            <div className="flex items-center mt-1 md:mt-0 text-[#85a5b3]">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="mr-3">{exp.location}</span>
              <Calendar className="w-3 h-3 mr-1" />
              <span>{exp.dates}</span>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[#c9cdd1]">
            {exp.responsibilities.map((resp, idx) => (
              <li key={idx} className="pl-2">{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CVExperience;
