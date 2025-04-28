import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
    return (
        <section className="container flex flex-col items-center gap-4 py-20 text-center md:py-32">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
                    Hi, I'm Your Name
                </h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                    A passionate software developer specializing in building exceptional digital experiences.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    to="/projects"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                    to="/contact"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                    Contact Me
                </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Github className="h-6 w-6" />
                </a>
                <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Twitter className="h-6 w-6" />
                </a>
                <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Linkedin className="h-6 w-6" />
                </a>
            </div>
        </section>
    )
} 