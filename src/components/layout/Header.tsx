import { Link } from 'react-router-dom'
import { ThemeToggle } from '../theme/ThemeToggle'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold">Ateet</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            to="/projects"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/blog"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/cv"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            CV
                        </Link>
                        <Link
                            to="/contact"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
} 