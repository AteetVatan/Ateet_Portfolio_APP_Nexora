
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

/**
 * Main Navigation component
 * Renders either the desktop or mobile navigation based on screen size
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveItem(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'HOME' },
    { to: '/cv', label: 'CV' },
    { to: '/projects', label: 'PROJECTS' },
    { to: '/blog', label: 'BLOG' },
    { to: '/about', label: 'ABOUT' },
    { to: '/beyond-the-code', label: 'BEYOND THE CODE' },
    { to: '/contact', label: 'CONTACT' },
  ];

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <DesktopNav
        activeItem={activeItem}
        handleNavClick={handleNavClick}
        navItems={navItems}
      />

      {/* Mobile Navigation */}
      <MobileNav
        activeItem={activeItem}
        handleNavClick={handleNavClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navItems={navItems}
      />
    </>
  );
};

export default Navigation;
