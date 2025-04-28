
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Blog categories navigation component
 * Displays links to filtered blog category pages
 */
const BlogCategories: React.FC = () => {
  return (
    <ul className="space-y-2">
      <li>
        <Link to="/blog/category/llm" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">LLM Integration</Link>
      </li>
      <li>
        <Link to="/blog/category/automation" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">AI Automation</Link>
      </li>
      <li>
        <Link to="/blog/category/multimodal" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Multimodal AI</Link>
      </li>
      <li>
        <Link to="/blog/category/python" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">Python Development</Link>
      </li>
      <li>
        <Link to="/blog/category/react" className="text-[#85a5b3] hover:text-[#00c3ff] transition-colors text-sm">React & Frontend</Link>
      </li>
    </ul>
  );
};

export default BlogCategories;
