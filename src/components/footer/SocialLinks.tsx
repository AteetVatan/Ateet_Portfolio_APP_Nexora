
import React from 'react';

interface SocialLinksProps {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * Social media links component
 * Displays icons linking to social media profiles
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ github, linkedin, twitter }) => {
  return (
    <div className="flex space-x-3">
      <a 
        href={github ? `https://${github}` : "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-[#85a5b3] hover:text-[#00c3ff] transition-colors ${!github ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 9 21.49V19.5C9 18.837 9.337 18.2 9.875 17.875C7.375 17.25 6 15.738 6 14C6 12.988 6.5 12.012 7.5 11.25C7.25 10.5 7 9.488 7.5 8.75C7.5 8.75 8.25 8.5 10 9.75C10.731 9.423 11.575 9.25 12.5 9.25C13.425 9.25 14.269 9.423 15 9.75C16.75 8.5 17.5 8.75 17.5 8.75C18 9.488 17.75 10.5 17.5 11.25C18.5 12.012 19 12.988 19 14C19 15.738 17.625 17.25 15.125 17.875C15.663 18.2 16 18.837 16 19.5V21.49C20.135 20.166 23 16.419 23 12C23 6.477 18.523 2 13 2H12Z" fill="currentColor"/>
        </svg>
      </a>
      <a 
        href={linkedin ? `https://${linkedin}` : "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-[#85a5b3] hover:text-[#00c3ff] transition-colors ${!linkedin ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5 3.5H3.5C2.4 3.5 1.5 4.4 1.5 5.5V18.5C1.5 19.6 2.4 20.5 3.5 20.5H20.5C21.6 20.5 22.5 19.6 22.5 18.5V5.5C22.5 4.4 21.6 3.5 20.5 3.5ZM8 18.5H5V9.5H8V18.5ZM6.5 8C5.4 8 4.5 7.1 4.5 6C4.5 4.9 5.4 4 6.5 4C7.6 4 8.5 4.9 8.5 6C8.5 7.1 7.6 8 6.5 8ZM19 18.5H16V13.1C16 12.1 15.1 11.2 14.1 11.2C13.1 11.2 12.2 12.1 12.2 13.1V18.5H9.2V9.5H12.2V10.8C12.7 10 13.8 9.4 14.8 9.4C17.1 9.5 19 11.4 19 13.7V18.5Z" fill="currentColor"/>
        </svg>
      </a>
      <a 
        href={twitter ? `https://${twitter}` : "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-[#85a5b3] hover:text-[#00c3ff] transition-colors ${!twitter ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 5.89C21.26 6.21 20.46 6.42 19.64 6.53C20.49 6.03 21.14 5.24 21.44 4.3C20.65 4.77 19.77 5.1 18.84 5.28C18.09 4.49 17.02 4 15.85 4C13.58 4 11.75 5.81 11.75 8.04C11.75 8.37 11.78 8.69 11.85 9C8.44 8.83 5.42 7.21 3.39 4.75C3.03 5.37 2.83 6.08 2.83 6.84C2.83 8.27 3.56 9.54 4.66 10.26C3.99 10.25 3.36 10.06 2.82 9.75V9.8C2.82 11.78 4.24 13.44 6.13 13.83C5.76 13.93 5.38 13.98 4.98 13.98C4.7 13.98 4.43 13.95 4.16 13.9C4.71 15.5 6.18 16.69 7.93 16.72C6.55 17.81 4.81 18.46 2.94 18.46C2.6 18.46 2.27 18.44 1.94 18.39C3.71 19.56 5.78 20.24 8 20.24C15.84 20.24 20.11 13.9 20.11 8.36C20.11 8.18 20.11 8 20.1 7.83C20.93 7.26 21.64 6.53 22.19 5.7L22 5.89Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  );
};

export default SocialLinks;
