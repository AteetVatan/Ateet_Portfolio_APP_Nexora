import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const fullText = 'LLM INTEGRATION & AI AUTOMATION EXPERT';
  const typeDelay = 60; // time in ms between typing each character

  // Typing animation effect
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typeDelay);

      return () => clearTimeout(typingTimer);
    }
  }, [displayedText]);

  // Blinking cursor effect
  useEffect(() => {
    const blinkingCursor = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(blinkingCursor);
  }, []);

  // Handle CV download
  const handleDownloadCV = (lang: string) => {
    window.open(`https://bidswcansixttbhmwpkj.functions.supabase.co/generate-cv-pdf?lang=${lang}&user_name=ateet`, '_blank');
  };

  return (
    <div className="relative flex items-center justify-center min-h-[85vh] px-6 md:px-12">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00c3ff] rounded-full filter blur-[120px] opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#0063f9] rounded-full filter blur-[100px] opacity-5 animate-float" style={{ animationDelay: "-2s" }}></div>

      {/* Hero content - centered container */}
      <div className="relative z-10 animate-on-load w-full max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Profile image - added above the name */}
          <div className="mb-6">
            <Avatar className="w-32 h-32 mt-10 border-2 border-[#1291c7] animate-pulse-glow">
              <AvatarImage src="/uploads/profile_pic.png" alt="Profile" />
              <AvatarFallback className="text-[#00c3ff]">AT</AvatarFallback>
            </Avatar>
          </div>

          <h1 className="font-mono text-5xl sm:text-7xl md:text-8xl font-bold mb-8 text-center">
            <span className="text-white">AT</span>
            <span className="text-[#00c3ff]">EET_</span>
          </h1>

          <div className="font-mono text-sm sm:text-lg text-[#85a5b3] uppercase mb-4 text-center">
            {displayedText}
            <span className={`typing-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>

          {/* CV Download Button - Added right after job title */}
          <div className="flex flex-row items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-[#00c3ff] border-[#1e3a4a] hover:bg-[#1291c7]/20 hover:text-[#00c3ff] mb-8"
              onClick={() => handleDownloadCV('en')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
            {/* CV Download Button - Added right after job title */}
            <div className="w-5"></div>
            <Button
              variant="outline"
              size="sm"
              className="text-[#00c3ff] border-[#1e3a4a] hover:bg-[#1291c7]/20 hover:text-[#00c3ff] mb-8"
              onClick={() => handleDownloadCV('de')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download German CV
            </Button>
          </div>
        </div>

        {/* Expertise badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="skill-tag">LLM Integration</div>
          <div className="skill-tag">AI Automation</div>
          <div className="skill-tag">Multimodal AI</div>
          <div className="skill-tag">Python + C#</div>
        </div>

        {/* Matrix-inspired data streams - purely decorative */}
        <div className="grid grid-cols-4 gap-2 my-12 opacity-90 mx-auto max-w-xl">
          <div className="h-24 overflow-hidden font-mono text-xs text-[#00c3ff] opacity-20">
            <div className="animate-data-stream">
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="my-1">
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}
            </div>
          </div>
          <div className="h-24 overflow-hidden font-mono text-xs text-[#00c3ff] opacity-10" style={{ animationDelay: "-5s" }}>
            <div className="animate-data-stream" style={{ animationDuration: "25s" }}>
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="my-1">
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}
            </div>
          </div>
          <div className="h-24 overflow-hidden font-mono text-xs text-[#00c3ff] opacity-30" style={{ animationDelay: "-10s" }}>
            <div className="animate-data-stream" style={{ animationDuration: "30s" }}>
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="my-1">
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}
            </div>
          </div>
          <div className="h-24 overflow-hidden font-mono text-xs text-[#00c3ff] opacity-15" style={{ animationDelay: "-3s" }}>
            <div className="animate-data-stream" style={{ animationDuration: "22s" }}>
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="my-1">
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA button - now uses Link to navigate to MASX AI page */}
        <div className="mt-8 text-center">
          <Link to="/masx-ai" className="neon-button">
            EXPLORE WORK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
