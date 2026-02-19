
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

interface CVCollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

const CVCollapsibleSection: React.FC<CVCollapsibleSectionProps> = ({
  title, icon, isOpen, toggleSection, children
}) => {
  return (
    <Card className="monolith-card relative z-10">
      <CardHeader className="cursor-pointer" onClick={toggleSection}>
        <CardTitle className="flex items-center justify-between" style={{ color: 'var(--mono-text)' }}>
          <div className="flex items-center">
            {icon}
            {title}
          </div>
          {isOpen ?
            <CaretUp className="h-5 w-5" style={{ color: 'var(--mono-primary)' }} /> :
            <CaretDown className="h-5 w-5" style={{ color: 'var(--mono-primary)' }} />
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
