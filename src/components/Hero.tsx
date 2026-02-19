
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { Link } from 'react-router-dom';

/**
 * Hero — Monolith split layout
 * Left: floating portrait, label, giant name, description, two CTAs
 * Right: gradient accent panel (untouched)
 */
const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: heroData } = useQuery({
    queryKey: ['hero-content'],
    queryFn: async () => {
      const { data } = await supabase
        .from('personal_info')
        .select('*')
        .single();
      return data;
    },
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const name = heroData?.name || 'Ateet Bahamani';
  const title = heroData?.title || 'AI Architect / Engineer';
  const tagline = heroData?.tagline || 'Building intelligent systems that think, reason, and act. Specializing in LLM integration, multi-agent architectures, and production AI.';

  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left side — text content with profile portrait */}
      <div className="flex-[0_0_55%] flex flex-col justify-center px-6 py-10 md:px-20 md:py-16">

        {/* Profile Portrait + Label row */}
        <div
          className="flex items-center gap-5 mb-8"
          style={{
            animation: isVisible ? 'fade-in 0.6s forwards' : 'none',
            opacity: 0,
          }}
        >
          {/* Glowing portrait */}
          <div className="hero-portrait-wrapper">
            <div className="hero-portrait-ring" />
            <img
              src="/profile.jpeg"
              alt="Ateet Bahamani"
              className="hero-portrait-img"
            />
          </div>

          {/* Label */}
          <div className="font-mono text-xs uppercase tracking-[0.15em]"
            style={{ color: 'var(--mono-primary)' }}
          >
            {title}
            <br />
            Essen, Germany
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-heading leading-[0.95] tracking-[-0.04em] mb-2"
          style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
        >
          <span className="block overflow-hidden">
            <span
              className="inline-block"
              style={{
                animation: isVisible ? 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                opacity: 0,
                transform: 'translateY(100%)',
              }}
            >
              {name.split(' ')[0]?.toUpperCase() || 'ATEET'}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="inline-block"
              style={{
                animation: isVisible ? 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards' : 'none',
                opacity: 0,
                transform: 'translateY(100%)',
              }}
            >
              {name.split(' ')[1]?.toUpperCase() || 'BAHAMANI'}
              <span style={{ color: 'var(--mono-primary)' }}>_</span>
            </span>
          </span>
        </h1>

        {/* Description */}
        <p
          className="max-w-[480px] my-6 leading-relaxed"
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'var(--mono-muted)',
            animation: isVisible ? 'fade-in 0.8s 0.4s forwards' : 'none',
            opacity: 0,
          }}
        >
          {tagline}
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            animation: isVisible ? 'fade-in 0.8s 0.6s forwards' : 'none',
            opacity: 0,
          }}
        >
          <Link to="/projects" className="btn-primary">
            Explore Projects →
          </Link>
          <a
            href="https://ateetclone.masxai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Talk to Ateet's AI Clone
          </a>
          <a
            href="/files/Ateet.pdf"
            download
            className="btn-outline"
          >
            Download CV ↓
          </a>
        </div>
      </div>

      {/* Right side — gradient photo placeholder */}
      <div className="flex-[0_0_45%] overflow-hidden min-h-[50vh] md:min-h-0">
        <div
          className="w-full h-full flex items-center justify-center font-heading"
          style={{
            background: 'linear-gradient(135deg, #FF4D00 0%, #FF8533 50%, #1A1A1A 100%)',
            fontSize: '200px',
            color: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          A
        </div>
      </div>
    </section>
  );
};

export default Hero;
