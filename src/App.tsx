// The top level component for the application
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center">Ateet Portfolio</h1>
                    <p className="text-center mt-4">Coming soon...</p>
                </main>
            </div>
        </Router>
    )
}

export default App 