
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CVCollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

const CVCollapsibleSection: React.FC<CVCollapsibleSectionProps> = ({
  title,
  icon,
  isOpen,
  toggleSection,
  children
}) => {
  return (
    <Card className="bg-[#0c1824] border-[#1e3a4a] relative z-10">
      <CardHeader className="cursor-pointer" onClick={toggleSection}>
        <CardTitle className="text-[#00c3ff] flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            {title}
          </div>
          {isOpen ? 
            <ChevronUp className="h-5 w-5 text-[#00c3ff]" /> : 
            <ChevronDown className="h-5 w-5 text-[#00c3ff]" />
          }
        </CardTitle>
      </CardHeader>
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <CardContent>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CVCollapsibleSection;
