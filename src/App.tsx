// The top level component for the application
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProjectsPage } from './pages/ProjectsPage'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostDetail } from './pages/BlogPostDetail'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog/:slug" element={<BlogPostDetail />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App 