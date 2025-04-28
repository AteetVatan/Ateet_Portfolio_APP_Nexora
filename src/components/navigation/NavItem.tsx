
import React from 'react';
import { Link } from 'react-router-dom';

type NavItemProps = {
  to: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
      onClick={onClick}
    >
      <span className="font-mono text-sm tracking-wider z-10 relative">
        {label}
      </span>
      {isActive && (
        <>
          <span className="nav-item-marker-left"></span>
          <span className="nav-item-marker-right"></span>
        </>
      )}
    </Link>
  );
};

export default NavItem;
