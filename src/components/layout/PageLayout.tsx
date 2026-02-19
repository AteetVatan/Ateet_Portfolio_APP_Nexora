import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';

/**
 * PageLayout — Monolith layout wrapper
 * Top fixed navbar + main content + footer
 */
interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--mono-bg)' }}>
      <Navigation />

      {/* Main content — add top padding for fixed nav */}
      <main className="flex-grow w-full" style={{ paddingTop: '72px' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
