import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

/**
 * Footer — Monolith centered footer
 * Simple, clean design with logo, nav links, social icons, and copyright
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'CV', path: '/cv' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer
      className="text-center py-16 px-6 md:px-12"
      style={{ borderTop: '1px solid var(--mono-border)', color: 'var(--mono-muted)' }}
    >
      {/* Logo */}
      <div className="font-heading font-bold text-[22px] mb-6" style={{ color: 'var(--mono-text)' }}>
        ATEET<span style={{ color: 'var(--mono-primary)' }}>.</span>
      </div>

      {/* Navigation */}
      <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6 mb-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-sm transition-colors duration-300 no-underline"
            style={{ color: 'var(--mono-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--mono-primary)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--mono-muted)'; }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Social icons */}
      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://github.com/AteetVatan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ border: '1px solid var(--mono-border)', color: 'var(--mono-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-muted)';
          }}
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/ateet-vatan-62a4b4172"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ border: '1px solid var(--mono-border)', color: 'var(--mono-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-muted)';
          }}
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://ateetclone.masxai.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ateet's AI Clone"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ border: '1px solid var(--mono-border)', color: 'var(--mono-muted)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-primary)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--mono-border)';
            (e.currentTarget as HTMLElement).style.color = 'var(--mono-muted)';
          }}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-xs" style={{ color: 'var(--mono-muted)' }}>
        © {currentYear} Ateet Vatan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
