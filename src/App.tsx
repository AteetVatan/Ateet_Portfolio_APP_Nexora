// The top level component for the application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Toaster } from 'sonner'
import { HomePage } from './pages/HomePage'

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<div>Projects Page</div>} />
                    <Route path="/blog" element={<div>Blog Page</div>} />
                    <Route path="/cv" element={<div>CV Page</div>} />
                    <Route path="/contact" element={<div>Contact Page</div>} />
                </Routes>
            </MainLayout>
            <Toaster />
        </Router>
    )
}

export default App 