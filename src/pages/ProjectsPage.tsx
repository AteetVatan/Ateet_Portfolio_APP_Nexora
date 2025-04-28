import { useState } from 'react'
import { Projects } from '../components/Projects'

export const ProjectsPage = () => {
    const [showFeatured, setShowFeatured] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Projects</h1>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showFeatured}
                            onChange={(e) => setShowFeatured(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span>Show Featured Only</span>
                    </label>
                </div>
            </div>
            <Projects featuredOnly={showFeatured} />
        </div>
    )
} 