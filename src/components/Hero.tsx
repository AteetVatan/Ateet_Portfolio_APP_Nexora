
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { Link } from 'react-router-dom';

/**
 * Hero — High-impact, client-benefit-first layout
 * Big value proposition → personal intro → stats → CTAs
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
  const title = heroData?.title || 'AI Architect and Engineer';

  const impactStats = [
    { value: '15+', label: 'Years Enterprise' },
    { value: '20+', label: 'Global Clients' },
    { value: '7', label: 'Continents Served' },
  ];

  return (
    <section id="hero" className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left side — text content with profile portrait */}
      <div className="flex-[0_0_55%] flex flex-col justify-center px-6 py-10 md:px-20 md:py-16">

        {/* Profile Portrait + Label row */}
        <div
          className="flex items-center gap-5 mb-6"
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

        {/* ═══ BIG IMPACT HEADLINE ═══ */}
        <h1
          className="font-heading leading-[1.0] tracking-[-0.03em] mb-4"
          style={{ fontSize: 'clamp(32px, 5.5vw, 64px)' }}
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
              Turn AI from buzzword
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
              into <span style={{ color: 'var(--mono-primary)' }}>business value.</span>
            </span>
          </span>
        </h1>

        {/* ═══ AI CLONE CTA ═══ */}
        <div
          style={{
            animation: isVisible ? 'fade-in 0.8s 0.35s forwards' : 'none',
            opacity: 0,
            marginBottom: '8px',
          }}
        >
          <a
            href="https://ateetclone.masxai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="voice-agent-cta"
          >
            🎙️ Talk or Chat with my AI Clone
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '2px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* ═══ PERSONAL INTRO ═══ */}
        <p
          className="max-w-[520px] my-5 leading-relaxed"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--mono-muted)',
            animation: isVisible ? 'fade-in 0.8s 0.4s forwards' : 'none',
            opacity: 0,
          }}
        >
          <span style={{ color: 'var(--mono-text)', fontWeight: 600 }}>
            Hi – I'm {name.split(' ')[0]}.
          </span>{' '}
          I help businesses cut through the AI hype and build systems that actually
          ship to production. From multi-agent architectures to real-time LLM pipelines,
          if it needs to work in the real world, I can build it.
        </p>

        {/* ═══ IMPACT STATS ═══ */}
        <div
          className="flex flex-wrap gap-6 mb-8"
          style={{
            animation: isVisible ? 'fade-in 0.8s 0.5s forwards' : 'none',
            opacity: 0,
          }}
        >
          {impactStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: 'var(--mono-primary)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[11px] uppercase tracking-widest mt-1"
                style={{ color: 'var(--mono-muted)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ═══ CTAs ═══ */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            animation: isVisible ? 'fade-in 0.8s 0.6s forwards' : 'none',
            opacity: 0,
          }}
        >
          <Link to="/contact" className="btn-primary">
            Let's build something
          </Link>
          <Link to="/projects" className="btn-outline">
            See my work
          </Link>
        </div>
      </div>

      {/* Right side — gradient accent */}
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

