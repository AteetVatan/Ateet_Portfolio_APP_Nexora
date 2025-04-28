
import React from 'react';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Reusable section component for the footer
 * Displays a title and children content in a consistent format
 */
const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h3 className="font-mono text-white text-sm uppercase mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default FooterSection;
