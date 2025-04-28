import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">
                                Portfolio
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                Home
                            </Link>
                            <Link
                                to="/projects"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                Projects
                            </Link>
                            <Link
                                to="/blog"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                Blog
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t mt-8">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-600">
                        © {new Date().getFullYear()} Your Name. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
} 