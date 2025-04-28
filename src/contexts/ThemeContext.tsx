
/**
 * Theme Context
 * 
 * This context provides theme (skin) management for the entire application.
 * It allows switching between different visual themes while maintaining the same functionality.
 * 
 * Features:
 * - Multiple predefined themes (cyber, minimal, neon, etc.)
 * - Theme persistence using localStorage
 * - Easy theme switching through a ThemeSelector component
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define available themes
export type ThemeName = 'cyber' | 'minimal' | 'neon' | 'dark' | 'light';

// Theme properties for each skin
export interface ThemeProperties {
  name: ThemeName;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  backgroundImage?: string;
}

// Available themes (skins)
export const themes: Record<ThemeName, ThemeProperties> = {
  cyber: {
    name: 'cyber',
    label: 'Cyberpunk',
    primaryColor: '#00c3ff',
    secondaryColor: '#1291c7',
    backgroundColor: '#0c0e14',
    textColor: '#85a5b3',
    accentColor: 'rgba(0, 195, 255, 0.75)',
    backgroundImage: 'radial-gradient(circle at 40% 40%, rgba(0, 115, 165, 0.06) 0%, transparent 70%), radial-gradient(circle at 60% 60%, rgba(0, 195, 255, 0.04) 0%, transparent 60%)'
  },
  minimal: {
    name: 'minimal',
    label: 'Minimal',
    primaryColor: '#1e88e5',
    secondaryColor: '#0d47a1',
    backgroundColor: '#121212',
    textColor: '#e0e0e0',
    accentColor: 'rgba(30, 136, 229, 0.6)',
    backgroundImage: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
  },
  neon: {
    name: 'neon',
    label: 'Neon',
    primaryColor: '#ff00ff',
    secondaryColor: '#00ffff',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff',
    accentColor: 'rgba(255, 0, 255, 0.6)',
    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 0, 255, 0.05) 0%, transparent 70%), radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.05) 0%, transparent 70%)'
  },
  dark: {
    name: 'dark',
    label: 'Dark Mode',
    primaryColor: '#bb86fc',
    secondaryColor: '#3700b3',
    backgroundColor: '#121212',
    textColor: '#e0e0e0',
    accentColor: 'rgba(187, 134, 252, 0.6)',
    backgroundImage: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
  },
  light: {
    name: 'light',
    label: 'Light Mode',
    primaryColor: '#6200ee',
    secondaryColor: '#3700b3',
    backgroundColor: '#f5f5f5',
    textColor: '#121212',
    accentColor: 'rgba(98, 0, 238, 0.6)',
    backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
  }
};

// Context interface
interface ThemeContextType {
  currentTheme: ThemeProperties;
  setTheme: (theme: ThemeName) => void;
  themeNames: ThemeName[];
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes.cyber,
  setTheme: () => {},
  themeNames: Object.keys(themes) as ThemeName[]
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  // Get saved theme from localStorage or use 'cyber' as default
  const [currentTheme, setCurrentTheme] = useState<ThemeProperties>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme as ThemeName] 
      ? themes[savedTheme as ThemeName] 
      : themes.cyber;
  });

  // Change theme function
  const setTheme = (themeName: ThemeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      localStorage.setItem('theme', themeName);
      
      // Show toast notification
      toast({
        title: "Theme Changed",
        description: `Switched to ${themes[themeName].label} theme`,
      });
    }
  };

  // Apply theme CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables based on current theme
    root.style.setProperty('--primary', currentTheme.primaryColor);
    root.style.setProperty('--secondary', currentTheme.secondaryColor);
    root.style.setProperty('--background', currentTheme.backgroundColor);
    root.style.setProperty('--foreground', currentTheme.textColor);
    root.style.setProperty('--accent', currentTheme.accentColor);
    
    // Apply background properties
    document.body.style.backgroundColor = currentTheme.backgroundColor;
    if (currentTheme.backgroundImage) {
      document.body.style.backgroundImage = currentTheme.backgroundImage;
    }
    
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme,
      themeNames: Object.keys(themes) as ThemeName[]
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
