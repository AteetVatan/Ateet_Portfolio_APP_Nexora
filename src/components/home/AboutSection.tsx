import { Code2, Database, Layout, Server } from 'lucide-react'

const skills = [
    {
        title: 'Frontend Development',
        icon: Layout,
        description: 'Building responsive and interactive user interfaces with React, TypeScript, and modern CSS.',
    },
    {
        title: 'Backend Development',
        icon: Server,
        description: 'Creating robust server-side applications and APIs using Node.js, Python, and various frameworks.',
    },
    {
        title: 'Database Management',
        icon: Database,
        description: 'Designing and optimizing database schemas, writing efficient queries, and ensuring data integrity.',
    },
    {
        title: 'Problem Solving',
        icon: Code2,
        description: 'Analyzing complex problems and implementing efficient solutions with clean, maintainable code.',
    },
]

export function AboutSection() {
    return (
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
                    About Me
                </h2>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                    I'm a full-stack developer with a passion for creating elegant solutions to complex problems.
                    With expertise in both frontend and backend technologies, I build applications that are
                    performant, scalable, and user-friendly.
                </p>
            </div>
            <div className="mx-auto grid max-w-[980px] gap-6 sm:grid-cols-2">
                {skills.map((skill) => (
                    <div
                        key={skill.title}
                        className="relative overflow-hidden rounded-lg border bg-background p-6"
                    >
                        <div className="flex h-[180px] flex-col justify-between">
                            <div className="space-y-2">
                                <skill.icon className="h-10 w-10 text-primary" />
                                <h3 className="font-bold">{skill.title}</h3>
                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
} 