
import React from 'react';

interface FooterCopyrightProps {
  name: string;
  year: number;
}

/**
 * Footer copyright component
 * Displays copyright information and legal links
 */
const FooterCopyright: React.FC<FooterCopyrightProps> = ({ name, year }) => {
  return (
    <div className="border-t border-[#1e3a4a] pt-6 flex flex-col md:flex-row justify-between items-center">
      <p className="text-[#85a5b3] text-sm mb-4 md:mb-0">
        © {year} {name}. All rights reserved.
      </p>
      
      <div className="flex space-x-6">
        <a href="#" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-xs">
          Privacy Policy
        </a>
        <a href="#" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-xs">
          Terms of Service
        </a>
        <a href="#" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-xs">
          Sitemap
        </a>
      </div>
    </div>
  );
};

export default FooterCopyright;
