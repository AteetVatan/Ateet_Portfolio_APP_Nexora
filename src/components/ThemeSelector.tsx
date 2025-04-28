
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
const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themeNames } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="neon-button flex items-center gap-2 px-4 py-2 
            text-sm font-mono uppercase 
            transition-all duration-300 
            overflow-hidden z-50"
          aria-label="Select theme"
        >
          {currentTheme.name === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden md:inline">{currentTheme.label}</span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white text-black border border-gray-200 z-50"
      >
        <DropdownMenuRadioGroup 
          value={currentTheme.name} 
          onValueChange={(value) => setTheme(value as ThemeName)}
        >
          {themeNames.map((theme) => {
            // Get theme properties for preview display
            const themeObject = theme === currentTheme.name 
              ? currentTheme 
              : { primaryColor: 'var(--primary)', label: theme };
              
            return (
              <DropdownMenuRadioItem 
                key={theme} 
                value={theme}
                className="flex items-center cursor-pointer 
                  hover:bg-gray-100 
                  text-black 
                  hover:text-blue-600"
              >
                <div className="flex items-center gap-2 w-full">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: themeObject.primaryColor }}
                    aria-hidden="true"
                  />
                  <span>{themeObject.label}</span>
                  {currentTheme.name === theme && (
                    <div className="ml-auto">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
