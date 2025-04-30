
import React from 'react';

const SocialLinks: React.FC = () => {
  return (
    <div className="mt-auto pb-8 space-y-2">
      <a
        href="https://github.com/AteetVatan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-[#85a5b3] hover:text-[#00c3ff] transition-colors"
      >
        <span className="w-5 h-5 mr-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 16.419 4.865 20.166 9 21.49V19.5C9 18.837 9.337 18.2 9.875 17.875C7.375 17.25 6 15.738 6 14C6 12.988 6.5 12.012 7.5 11.25C7.25 10.5 7 9.488 7.5 8.75C7.5 8.75 8.25 8.5 10 9.75C10.731 9.423 11.575 9.25 12.5 9.25C13.425 9.25 14.269 9.423 15 9.75C16.75 8.5 17.5 8.75 17.5 8.75C18 9.488 17.75 10.5 17.5 11.25C18.5 12.012 19 12.988 19 14C19 15.738 17.625 17.25 15.125 17.875C15.663 18.2 16 18.837 16 19.5V21.49C20.135 20.166 23 16.419 23 12C23 6.477 18.523 2 13 2H12Z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-xs font-mono">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/ateet-vatan-bahmani/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-[#85a5b3] hover:text-[#00c3ff] transition-colors"
      >
        <span className="w-5 h-5 mr-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 3.5H3.5C2.4 3.5 1.5 4.4 1.5 5.5V18.5C1.5 19.6 2.4 20.5 3.5 20.5H20.5C21.6 20.5 22.5 19.6 22.5 18.5V5.5C22.5 4.4 21.6 3.5 20.5 3.5ZM8 18.5H5V9.5H8V18.5ZM6.5 8C5.4 8 4.5 7.1 4.5 6C4.5 4.9 5.4 4 6.5 4C7.6 4 8.5 4.9 8.5 6C8.5 7.1 7.6 8 6.5 8ZM19 18.5H16V13.1C16 12.1 15.1 11.2 14.1 11.2C13.1 11.2 12.2 12.1 12.2 13.1V18.5H9.2V9.5H12.2V10.8C12.7 10 13.8 9.4 14.8 9.4C17.1 9.5 19 11.4 19 13.7V18.5Z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-xs font-mono">LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialLinks;
