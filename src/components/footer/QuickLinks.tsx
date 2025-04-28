
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Quick links navigation component 
 * Displays a list of links to main pages
 */
const QuickLinks: React.FC = () => {
  return (
    <ul className="space-y-2">
      <li>
        <Link to="/" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Home</Link>
      </li>
      <li>
        <Link to="/projects" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Projects</Link>
      </li>
      <li>
        <Link to="/blog" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Blog</Link>
      </li>
      <li>
        <Link to="/masx-ai" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">MASX AI</Link>
      </li>
      <li>
        <Link to="/about" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">About</Link>
      </li>
      <li>
        <Link to="/contact" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Contact</Link>
      </li>
    </ul>
  );
};

export default QuickLinks;
