import React from 'react';
import { Sun, Moon, Check } from 'lucide-react';
import { useTheme, ThemeName } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * ThemeSelector Component
 * 
 * Provides a dropdown menu for switching between different visual themes/skins.
 * Displays the current theme icon and label, with a list of available themes.
 * Uses the ThemeContext to manage theme state across the application.
 */
const ThemeSelector = () => {
  const { currentTheme, setTheme, themeNames } = useTheme();

  // Helper function to get theme icon
  const ThemeIcon = currentTheme.name === 'light' ? Sun : Moon;

  return (
    <DropdownMenu>
      {/* Theme toggle button */}
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm font-mono uppercase
            bg-transparent border border-[#1291c7] rounded hover:border-[#00c3ff]
            text-[#85a5b3] hover:text-[#00c3ff] transition-all duration-300
            shadow-[0_0_10px_rgba(0,195,255,0.1)] hover:shadow-[0_0_15px_rgba(0,195,255,0.2)]"
          aria-label="Select theme"
        >
          <ThemeIcon className="h-4 w-4" />
          <span className="hidden md:inline">{currentTheme.label}</span>
        </button>
      </DropdownMenuTrigger>

      {/* Theme selection menu */}
      <DropdownMenuContent
        align="end"
        className="w-56 bg-[#0c0e14] border border-[#1291c7] shadow-lg"
      >
        <DropdownMenuRadioGroup
          value={currentTheme.name}
          onValueChange={(value) => setTheme(value as ThemeName)}
        >
          {themeNames.map((theme) => (
            <ThemeOption
              key={theme}
              theme={theme}
              currentTheme={currentTheme}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Separate component for theme options
const ThemeOption = ({ theme, currentTheme }) => {
  const isSelected = currentTheme.name === theme;
  const themeColor = isSelected ? currentTheme.primaryColor : 'var(--primary)';

  return (
    <DropdownMenuRadioItem
      value={theme}
      className="flex items-center cursor-pointer px-3 py-2
        text-[#85a5b3] hover:text-[#00c3ff] hover:bg-[#1e3a4a]
        transition-colors duration-200"
    >
      <div className="flex items-center gap-2 w-full">
        {/* Theme color preview */}
        <div
          className="w-4 h-4 rounded-full border border-[#1291c7]"
          style={{ backgroundColor: themeColor }}
          aria-hidden="true"
        />

        {/* Theme name */}
        <span className="font-mono text-sm">{isSelected ? currentTheme.label : theme}</span>

        {/* Selected indicator */}
        {isSelected && (
          <div className="ml-auto">
            <Check className="h-4 w-4 text-[#00c3ff]" />
          </div>
        )}
      </div>
    </DropdownMenuRadioItem>
  );
};

export default ThemeSelector;
