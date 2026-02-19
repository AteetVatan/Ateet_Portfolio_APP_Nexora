
import React from 'react';
import { Link } from 'react-router-dom';
import { Robot, FileText, BookOpen } from '@phosphor-icons/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type SubMenuNavProps = {
  activeItem: string;
  handleNavClick: (path: string) => void;
}

const SubMenuNav: React.FC<SubMenuNavProps> = ({ activeItem, handleNavClick }) => {
  return (
    <div className="relative">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="space-x-0 flex-col items-start">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`nav-menu-trigger ${activeItem.startsWith('/masx-ai')
                ? 'nav-menu-trigger-active'
                : 'nav-menu-trigger-inactive'}`}>
              <span className="font-mono text-sm tracking-wider z-10 relative flex items-center">
                <Robot className="mr-2 h-3.5 w-3.5" />
                MASX AI
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[180px] bg-[#0c1824] border border-[#1e3a4a] p-1 z-50">
              <ul className="grid gap-1">
                <li>
                  <Link
                    to="/masx-ai"
                    className={cn("nav-dropdown-item",
                      activeItem === '/masx-ai' ? 'nav-dropdown-item-active' : '')}
                    onClick={() => handleNavClick('/masx-ai')}
                  >
                    <FileText className="mr-2 h-3.5 w-3.5" />
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/masx-ai/case-study"
                    className={cn("nav-dropdown-item",
                      activeItem === '/masx-ai/case-study' ? 'nav-dropdown-item-active' : '')}
                    onClick={() => handleNavClick('/masx-ai/case-study')}
                  >
                    <BookOpen className="mr-2 h-3.5 w-3.5" />
                    Case Study
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SubMenuNav;
