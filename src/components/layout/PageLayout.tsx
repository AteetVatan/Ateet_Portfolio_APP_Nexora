
import React, { ReactNode } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import GridBackground from '../GridBackground';
import ThemeSelector from '../ThemeSelector';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable page layout component
 * 
 * Provides consistent structure for all pages with:
 * - Grid background for cyberpunk aesthetic
 * - Desktop sidebar navigation
 * - Theme selector
 * - Main content area with proper spacing
 * - Footer
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Grid background for cyberpunk aesthetic */}
      <GridBackground />
      
      {/* Desktop sidebar navigation */}
      <div className="hidden md:block md:fixed md:left-0 md:top-0 md:bottom-0 md:w-60 lg:w-64 z-20">
        <Navigation />
      </div>
      
      {/* Theme selector - fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>
      
      {/* Main content */}
      <main className={`flex-grow w-full max-w-screen-2xl mx-auto md:pl-24 lg:pl-32 ${className}`}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default PageLayout;
