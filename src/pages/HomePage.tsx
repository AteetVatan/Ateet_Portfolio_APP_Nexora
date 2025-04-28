import { Link } from 'react-router-dom'
import { Projects } from '../components/Projects'

export const HomePage = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Welcome to My Portfolio
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    I'm a passionate developer creating innovative solutions and beautiful web experiences.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/projects"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View My Work
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>

            {/* Featured Projects */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Projects</h2>
                    <Link
                        to="/projects"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        View All Projects →
                    </Link>
                </div>
                <Projects featuredOnly={true} />
            </section>

            {/* Skills Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
                    <p className="text-gray-600">
                        Building responsive and interactive user interfaces with React, TypeScript, and modern CSS.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
                    <p className="text-gray-600">
                        Creating robust APIs and server-side applications with Node.js and various databases.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">DevOps & Cloud</h3>
                    <p className="text-gray-600">
                        Deploying and maintaining applications in cloud environments with CI/CD pipelines.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12 bg-blue-600 text-white rounded-xl">
                <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Have a project in mind? I'd love to hear about it and help bring your ideas to life.
                </p>
                <Link
                    to="/contact"
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-block"
                >
                    Contact Me
                </Link>
            </section>
        </div>
    )
} 