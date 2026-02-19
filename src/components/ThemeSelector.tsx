import React from 'react';
import { Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * ThemeSelector — Simple dark/light toggle button for the Monolith nav bar
 */
const ThemeSelector: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-base cursor-pointer transition-all duration-300 hover:border-[var(--mono-primary)]"
      style={{
        border: '1px solid var(--mono-border)',
        background: 'var(--mono-surface)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4" style={{ color: 'var(--mono-text)' }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: 'var(--mono-text)' }} />
      )}
    </button>
  );
};

export default ThemeSelector;
