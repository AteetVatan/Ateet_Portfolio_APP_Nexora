
import React from 'react';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { MapPin, Calendar } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  location: string;
  year: number;
}

interface CVEducationProps {
  education: Education[];
}

const CVEducation: React.FC<CVEducationProps> = ({ education }) => {
  return (
    <Table>
      <TableBody>
        {education?.map((edu, index) => (
          <TableRow key={index} className="border-b border-[#1e3a4a] hover:bg-[#0a131c]">
            <TableCell className="py-4">
              <div className="font-medium text-[#00c3ff]">{edu.degree}</div>
              <div className="text-[#e4e6e9]">{edu.institution}</div>
              <div className="flex items-center text-[#85a5b3] text-sm mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="mr-4">{edu.location}</span>
                <Calendar className="w-3 h-3 mr-1" />
                <span>{edu.year}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CVEducation;
