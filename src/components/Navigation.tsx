
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import { Menu, X } from 'lucide-react';

/**
 * Navigation — Monolith top horizontal nav bar
 * Fixed position, glassmorphic background, logo left, links + toggle right
 */

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'AI News', path: '/ai-news' },
    { label: 'CV', path: '/cv' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Card', path: '/business-card' },
];

const Navigation: React.FC = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav
            aria-label="Main navigation"
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-400"
            style={{
                padding: '16px 48px',
                background: 'var(--mono-nav-bg)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--mono-border)',
            }}
        >
            {/* Logo */}
            <Link to="/" className="no-underline" style={{ textDecoration: 'none' }}>
                <div className="font-heading font-bold text-[22px]" style={{ color: 'var(--mono-text)' }}>
                    ATEET<span style={{ color: 'var(--mono-primary)' }}>.</span>
                </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="text-sm font-medium no-underline transition-colors duration-300"
                        style={{
                            color: isActive(link.path) ? 'var(--mono-text)' : 'var(--mono-muted)',
                            textDecoration: 'none',
                            fontWeight: isActive(link.path) ? 600 : 500,
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive(link.path)) {
                                (e.target as HTMLElement).style.color = 'var(--mono-text)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive(link.path)) {
                                (e.target as HTMLElement).style.color = 'var(--mono-muted)';
                            }
                        }}
                        onClick={() => {
                            if (link.path === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
                <ThemeSelector />
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-3">
                <ThemeSelector />
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--mono-text)' }}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div
                    className="absolute top-full left-0 w-full backdrop-blur-md py-4 md:hidden"
                    style={{
                        background: 'var(--mono-nav-bg)',
                        borderBottom: '1px solid var(--mono-border)',
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="block py-3 px-8 text-sm no-underline transition-colors"
                            style={{
                                color: isActive(link.path) ? 'var(--mono-primary)' : 'var(--mono-muted)',
                                fontWeight: isActive(link.path) ? 600 : 400,
                                textDecoration: 'none',
                                background: isActive(link.path) ? 'rgba(255, 77, 0, 0.06)' : 'transparent',
                            }}
                            onClick={() => {
                                setMobileOpen(false);
                                if (link.path === '/') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
