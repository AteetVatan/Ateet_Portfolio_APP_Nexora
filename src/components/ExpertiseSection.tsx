
import React from 'react';

type ExpertiseItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
};

const ExpertiseSection: React.FC = () => {
  const expertiseItems: ExpertiseItem[] = [
    {
      title: "LLM Integration",
      description: "Building advanced applications leveraging large language models through LangChain, AutoGen, and vector databases for semantic search and RAG systems.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5H8C9.10457 10.5 10 11.3954 10 12.5V18.5C10 19.6046 9.10457 20.5 8 20.5H4C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M14 6.5C14 5.39543 14.8954 4.5 16 4.5H20C21.1046 4.5 22 5.39543 22 6.5V12.5C22 13.6046 21.1046 14.5 20 14.5H16C14.8954 14.5 14 13.6046 14 12.5V6.5Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M14 18.5C14 19.6046 14.8954 20.5 16 20.5H20C21.1046 20.5 22 19.6046 22 18.5V17.5C22 16.3954 21.1046 15.5 20 15.5H16C14.8954 15.5 14 16.3954 14 17.5V18.5Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M2 6.5C2 5.39543 2.89543 4.5 4 4.5H8C9.10457 4.5 10 5.39543 10 6.5V7.5C10 8.6046 9.10457 9.5 8 9.5H4C2.89543 9.5 2 8.6046 2 7.5V6.5Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M2 9.5L2 7.5" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M22 15.5L22 13.5" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M10 9.5L10 7.5" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M14 17.5L14 15.5" stroke="#00c3ff" strokeWidth="1.5"/>
        </svg>
      ),
      skills: ["LangChain", "AutoGen", "Pinecone", "ChromaDB", "RAG", "Custom Agents"],
    },
    {
      title: "AI Automation Systems",
      description: "Developing intelligent automation pipelines that leverage AI for data processing, decision making, and autonomous task execution in enterprise environments.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M12 4L12 2" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 12L2 12" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 20L12 22" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M20 12L22 12" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" stroke="#00c3ff" strokeWidth="1.5"/>
        </svg>
      ),
      skills: ["Process Automation", "ML Pipelines", "Decision Systems", "ETL", "Workflow Orchestration", "Python"],
    },
    {
      title: "Multimodal AI Development",
      description: "Building systems that combine text, vision, audio, and spatial intelligence for comprehensive AI applications including the pioneering MASX AI project.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6C15 8.20914 13.2091 10 11 10C8.79086 10 7 8.20914 7 6C7 3.79086 8.79086 2 11 2C13.2091 2 15 3.79086 15 6Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M15 18C15 20.2091 13.2091 22 11 22C8.79086 22 7 20.2091 7 18C7 15.7909 8.79086 14 11 14C13.2091 14 15 15.7909 15 18Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M22 10C22 12.2091 20.2091 14 18 14C15.7909 14 14 12.2091 14 10C14 7.79086 15.7909 6 18 6C20.2091 6 22 7.79086 22 10Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M6 14C8.20914 14 10 12.2091 10 10C10 7.79086 8.20914 6 6 6C3.79086 6 2 7.79086 2 10C2 12.2091 3.79086 14 6 14Z" stroke="#00c3ff" strokeWidth="1.5"/>
        </svg>
      ),
      skills: ["Computer Vision", "NLP", "Speech Recognition", "Multimodal Transformers", "CLIP", "GPT-4 Vision"],
    },
    {
      title: "Full-Stack Development",
      description: "Building robust applications with Python backends and React frontends, creating seamless user experiences with clean, performant code.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6.5C2 4.567 2 3.6 2.654 3C3.309 2.4 4.283 2.4 6.23 2.4H17.77C19.717 2.4 20.691 2.4 21.346 3C22 3.6 22 4.567 22 6.5V15.5C22 17.433 22 18.4 21.346 19C20.691 19.6 19.717 19.6 17.77 19.6H6.23C4.283 19.6 3.309 19.6 2.654 19C2 18.4 2 17.433 2 15.5V6.5Z" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M18 2.4V11" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M6 19.6L6 11" stroke="#00c3ff" strokeWidth="1.5"/>
          <circle cx="6" cy="7" r="1.5" stroke="#00c3ff" strokeWidth="1.5"/>
          <circle cx="18" cy="15" r="1.5" stroke="#00c3ff" strokeWidth="1.5"/>
          <path d="M11 14.5L8.5 12L11 9.5" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 9.5L15.5 12L13 14.5" stroke="#00c3ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      skills: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker", "Git"],
    },
  ];
  
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24">
      <div className="w-full text-center mb-16">
        <h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-4">
          CORE <span className="text-[#00c3ff]">EXPERTISE_</span>
        </h2>
        <p className="text-[#85a5b3] max-w-2xl mx-auto text-base">
          Specialized technical capabilities in cutting-edge AI technologies and full-stack development.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {expertiseItems.map((item, index) => (
          <div 
            key={index} 
            className="terminal-section animate-pulse-glow"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="mr-4 text-[#00c3ff]">
                  {item.icon}
                </div>
                <h3 className="font-mono text-xl text-white">{item.title}</h3>
              </div>
              
              <p className="text-[#85a5b3] mb-6 text-base">
                {item.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
