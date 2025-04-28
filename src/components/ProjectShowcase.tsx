
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
};

const ProjectShowcase: React.FC = () => {
  // Example projects data - would come from a backend API in a real app
  const [projects] = useState<Project[]>([
    {
      id: "masx-ai",
      title: "MASX AI",
      description: "Multimodal AI system integrating vision, text, and spatial understanding for advanced search and content generation applications.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80",
      tags: ["Multimodal AI", "Computer Vision", "React", "Python"],
      featured: true,
    },
    {
      id: "langchain-agent",
      title: "Custom LangChain Agent Framework",
      description: "Developed a flexible framework for creating task-specific AI agents with memory, tool integration, and failover mechanisms.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      tags: ["LangChain", "LLM", "Agent Development", "Python"],
      featured: true,
    },
    {
      id: "vector-db-solution",
      title: "Enterprise Vector Database Solution",
      description: "Scalable similarity search infrastructure for semantic content retrieval with customizable filtering.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      tags: ["Vector Search", "Pinecone", "FastAPI", "Postgres"],
      featured: false,
    },
  ]);
  
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-3">
            KEY <span className="text-[#00c3ff]">PROJECTS_</span>
          </h2>
          <p className="text-[#85a5b3] max-w-xl text-sm md:text-base">
            Featured work showcasing practical applications of AI and full-stack development expertise.
          </p>
        </div>
        
        <Link to="/projects" className="neon-button mt-4 md:mt-0">
          VIEW ALL PROJECTS
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredProjects.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="cyber-card group hover:cursor-pointer flex flex-col h-full"
          >
            <div className="relative w-full h-40 mb-3 overflow-hidden rounded">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] to-transparent z-10"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 text-xs font-mono bg-[#00c3ff] text-black px-2 py-1 rounded-sm z-20">
                Featured
              </div>
            </div>
            
            <h3 className="font-mono text-xl text-white mb-2 group-hover:text-[#00c3ff] transition-colors">
              {project.title}
            </h3>
            
            <p className="text-[#85a5b3] mb-3 text-sm line-clamp-2">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span 
                  key={tagIndex} 
                  className="text-xs px-2 py-1 rounded-sm 
                         bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-sm 
                               bg-[#0c1824] text-[#4dabce] border border-[#1e3a4a]">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
        
        {/* "View More" card */}
        <Link 
          to="/projects" 
          className="border border-dashed border-[#1291c7] rounded p-6 flex flex-col justify-center items-center text-center hover:border-[#00c3ff] transition-colors cursor-pointer h-full"
        >
          <div className="w-14 h-14 rounded-full border border-[#1291c7] flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#1291c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="font-mono text-[#1291c7] hover:text-[#00c3ff] transition-colors">
            Explore All Projects
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ProjectShowcase;
