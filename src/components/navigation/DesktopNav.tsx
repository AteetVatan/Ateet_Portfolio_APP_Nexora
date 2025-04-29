
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import NavItem from './NavItem';
import SubMenuNav from './SubMenuNav';
import SocialLinks from './SocialLinks';

type DesktopNavProps = {
  activeItem: string;
  handleNavClick: (path: string) => void;
  navItems: Array<{ to: string; label: string; }>;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ activeItem, handleNavClick, navItems }) => {
  return (
    <nav className="hidden md:flex flex-col justify-center items-start 
                  h-screen fixed top-3 left-3 z-50 w-60 lg:w-64">
      <div className="terminal-section py-3 px-4 mb-8 text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#1291c7] animate-pulse-glow">
          <Avatar className="w-full h-full">
            <AvatarImage 
              src="/lovable-uploads/df19efdd-57f7-44a2-9200-10b64b580ab3.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="text-[#00c3ff]">AT</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="glow-text text-base mb-1">DEVELOPER_</h2>
        <p className="text-[#85a5b3] text-xs font-mono">Full Stack // AI</p>
      </div>
      
      <div className="flex flex-col mb-4 relative">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            isActive={activeItem === item.to}
            onClick={() => handleNavClick(item.to)}
          />
        ))}
        
        <SubMenuNav activeItem={activeItem} handleNavClick={handleNavClick} />
      </div>
      
      <SocialLinks />
    </nav>
  );
};

export default DesktopNav;
