import React from 'react';
import { Link } from 'react-router-dom';

// Props for the navigation item
type NavItemProps = {
  to: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ to, label, isActive, onClick }: NavItemProps) => {
  // Base styles for the nav item
  const baseStyles = "px-4 py-2 my-1 block transition-all duration-300 font-mono text-sm relative";

  // Text color based on active state
  const textColor = isActive ? "text-[#00c3ff] font-bold" : "text-[#85a5b3] hover:text-[#b9dcea]";

  return (
    <Link
      to={to}
      className={`${baseStyles} ${textColor}`}
      onClick={onClick}
    >
      {/* Navigation text */}
      <span className="relative z-10">
        {label}
      </span>

      {/* Active state indicators */}
      {isActive && (
        <>
          {/* Left blue line */}
          <span className="absolute left-0 top-0 h-full w-0.5 bg-[#00c3ff] rounded-full shadow-[0_0_8px_#00c3ff]" />
          {/* Right dot */}
          <span className="absolute -right-2 top-1/2 h-1 w-1 rounded-full bg-[#00c3ff] shadow-[0_0_8px_#00c3ff] -translate-y-1/2" />
        </>
      )}
    </Link>
  );
};

export default NavItem;
