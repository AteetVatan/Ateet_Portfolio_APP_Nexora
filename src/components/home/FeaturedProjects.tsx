import { ExternalLink, Github } from 'lucide-react'

const featuredProjects = [
    {
        title: 'Project One',
        description: 'A modern web application built with React and TypeScript.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        githubUrl: 'https://github.com/yourusername/project-one',
        liveUrl: 'https://project-one.com',
        image: '/images/project-one.png',
    },
    {
        title: 'Project Two',
        description: 'A full-stack application with real-time features.',
        technologies: ['Next.js', 'PostgreSQL', 'WebSocket', 'Docker'],
        githubUrl: 'https://github.com/yourusername/project-two',
        liveUrl: 'https://project-two.com',
        image: '/images/project-two.png',
    },
    // Add more projects as needed
]

export function FeaturedProjects() {
    return (
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
                    Featured Projects
                </h2>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                    Here are some of my recent projects. Each one was built to solve a specific problem or
                    explore new technologies.
                </p>
            </div>
            <div className="mx-auto grid max-w-[980px] gap-6 sm:grid-cols-2">
                {featuredProjects.map((project) => (
                    <div
                        key={project.title}
                        className="group relative overflow-hidden rounded-lg border bg-background p-6"
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    Source Code
                                </a>
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                    >
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <a
                    href="/projects"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                    View All Projects
                </a>
            </div>
        </section>
    )
} 