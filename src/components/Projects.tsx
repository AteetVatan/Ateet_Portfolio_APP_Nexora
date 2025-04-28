import { useEffect, useState } from 'react'
import { supabaseService } from '../services/supabase.service'
import type { Database } from '../types/database.types'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectsProps {
    featuredOnly?: boolean
}

export const Projects = ({ featuredOnly = false }: ProjectsProps) => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 6

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                setError(null)

                const { data, total } = featuredOnly
                    ? await supabaseService.getFeaturedProjects({ page, limit })
                    : await supabaseService.getAllProjects({ page, limit })

                setProjects(data)
                setTotal(total)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch projects')
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [page, featuredOnly])

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>
    }

    if (projects.length === 0) {
        return <div className="text-gray-500 text-center p-4">No projects found</div>
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {project.images?.[0] && (
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies?.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {total > limit && (
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {page} of {Math.ceil(total / limit)}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(Math.ceil(total / limit), p + 1))}
                        disabled={page >= Math.ceil(total / limit)}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
} 