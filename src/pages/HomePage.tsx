import { HeroSection } from '../components/home/HeroSection'
import { AboutSection } from '../components/home/AboutSection'
import { FeaturedProjects } from '../components/home/FeaturedProjects'

export function HomePage() {
    return (
        <div className="space-y-20">
            <HeroSection />
            <AboutSection />
            <FeaturedProjects />
        </div>
    )
} 