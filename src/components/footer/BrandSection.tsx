
import React from 'react';
import SocialLinks from './SocialLinks';

interface BrandSectionProps {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * Brand section component
 * Displays the brand logo, description and social links
 */
const BrandSection: React.FC<BrandSectionProps> = ({ github, linkedin, twitter }) => {
  return (
    <div>
      <h2 className="font-mono text-xl text-white font-bold mb-4">
        DEV<span className="text-[#00c3ff]">ELOPER_</span>
      </h2>
      <p className="text-[#85a5b3] text-sm mb-4">
        Full-stack developer specialized in AI technologies, creating intelligent solutions for complex problems.
      </p>
      <SocialLinks 
        github={github} 
        linkedin={linkedin} 
        twitter={twitter} 
      />
    </div>
  );
};

export default BrandSection;
