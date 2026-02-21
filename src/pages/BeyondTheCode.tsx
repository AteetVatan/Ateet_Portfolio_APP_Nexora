import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageLayout from '../components/layout/PageLayout';

/* ═══════════════════════════════════════════
   BEYOND THE CODE — Marathon Runner's Story
   ═══════════════════════════════════════════ */

// ── Race Data ──
const races = [
    {
        title: 'Berlin Marathon',
        location: 'Berlin, Germany',
        tagline: 'Where legends are forged on the flattest, fastest course in the world.',
        description:
            'Running through the Brandenburg Gate — every stride echoing with the history of world records. Berlin isn\'t just a marathon; it\'s a pilgrimage for runners who dare to dream of their personal best.',
        images: [
            '/hobbies/berlin_marathon.jpg',
            '/hobbies/berlin_marathon1.jpg',
            '/hobbies/berlin_marathon2.jpg',
        ],
        stats: { distance: '42.195 km', elevation: '~40m', finishers: '45,000+' },
    },
    {
        title: 'Chandigarh Marathon',
        location: 'Chandigarh, India',
        tagline: 'The city beautiful. The race raw.',
        description:
            'Chandigarh\'s wide boulevards and the crisp Himalayan air create the perfect backdrop for pushing limits. This race is personal — running through the streets of home, where every cheer is from someone who knows your name.',
        images: [
            '/hobbies/chandigarh_marathon.jpg',
            '/hobbies/chandigarh_marathon1.jpg',
            '/hobbies/chandigarh_marathon2.jpg',
        ],
        stats: { distance: '21.1 km', elevation: '~25m', finishers: '10,000+' },
    },
    {
        title: 'Balynesse Marathon',
        location: 'Bali, Indonesia',
        tagline: 'Paradise is earned, one kilometre at a time.',
        description:
            'Running through rice terraces, ancient temples, and coastal roads with the Indian Ocean breeze as your pacer. Bali strips away everything — just you, the road, and the horizon.',
        images: [
            '/hobbies/Balynesse_marathon.jpg',
            '/hobbies/Balynesse_marathon1.jpg',
            '/hobbies/Balynesse_marathon2.jpg',
        ],
        stats: { distance: '42.195 km', elevation: '~300m', finishers: '5,000+' },
    },
    {
        title: 'Düsseldorf Challenge',
        location: 'Düsseldorf, Germany',
        tagline: 'Rhineland grit. No excuses.',
        description:
            'The Düsseldorf challenge along the Rhine is a test of mental fortitude — flat, fast, and unforgiving. The crowd energy along the Königsallee pushes you to dig deeper than you thought possible.',
        images: [
            '/hobbies/dusseldorf_challenge.jpg',
            '/hobbies/dusseldorf_challenge1.jpg',
            '/hobbies/dusseldorf_challenge2.jpg',
        ],
        stats: { distance: '42.195 km', elevation: '~35m', finishers: '15,000+' },
    },
];

const lifestyleImages = [
    { src: '/hobbies/daily_morning.jpg', caption: 'The 4 AM alarm never gets easier. You just get tougher.' },
    { src: '/hobbies/ready_for_the_challenge.jpg', caption: 'Locked in. Laced up. Ready to suffer.' },
    { src: '/hobbies/with_challenger.jpg', caption: 'Iron sharpens iron — the best rivals become brothers.' },
    { src: '/hobbies/chill.jpg', caption: 'Recovery is earned, not given.' },
    { src: '/hobbies/in_valley.jpg', caption: 'When the trail calls, you answer.' },
    { src: '/hobbies/Mulheim.jpg', caption: 'The Rhine never stops flowing. Neither do I.' },
];

const familyImages = [
    { src: '/hobbies/family.jpg', caption: 'The reason behind every finish line.' },
    { src: '/hobbies/famlily1.jpg', caption: 'My unwavering support crew.' },
    { src: '/hobbies/family2.jpg', caption: 'They make the miles worth it.' },
    { src: '/hobbies/family3.jpg', caption: 'Home is where the heart is.' },
    { src: '/hobbies/family4.jpg', caption: 'Everything I do is for them.' },
];

// ── Scroll Reveal Hook ──
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('btc-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        const children = el.querySelectorAll('.btc-reveal');
        children.forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, []);
    return ref;
}

// ── Animated Stat Card (self-contained: counter + tilt + single ref) ──
const StatCard: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
    const numericMatch = value.match(/^(\d+)/);
    const numericPart = numericMatch ? parseInt(numericMatch[1]) : 0;
    const suffix = value.replace(/^\d+/, '');

    const ref = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    // Intersection Observer — trigger counter on scroll into view
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Animate the count from 0 to target
    useEffect(() => {
        if (!hasStarted || numericPart === 0) return;
        let current = 0;
        const duration = 2200;
        const step = numericPart / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= numericPart) {
                setCount(numericPart);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [hasStarted, numericPart]);

    // 3D tilt on mouse move — skip on touch-only devices
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Don't add tilt on touch-only devices (saves memory & event listeners)
        if (window.matchMedia('(hover: none)').matches) return;
        const intensity = 10;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
        };
        const onLeave = () => {
            el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        };
        // passive: true → allows browser to optimize scroll on iOS
        el.addEventListener('mousemove', onMove, { passive: true });
        el.addEventListener('mouseleave', onLeave, { passive: true });
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="btc-stat-card btc-reveal"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="btc-stat-card__glow" />
            <span className="btc-stat-card__value">
                {numericPart > 0 ? count : ''}{suffix}
            </span>
            <span className="btc-stat-card__label">{label}</span>
        </div>
    );
};

// ─────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────
const BeyondTheCode: React.FC = () => {
    const containerRef = useScrollReveal();

    return (
        <PageLayout>
            <SEOHead
                title="Beyond the Code"
                description="Marathon runner, endurance challenger, relentless competitor. Discover the person behind the engineer — Ateet Vatan's world of running and resilience."
            />

            <div ref={containerRef} className="btc-page">
                {/* ═══ SECTION 1 — HERO ═══ */}
                <section className="btc-hero">
                    <div className="btc-hero__overlay" />
                    <div className="btc-hero__particles" aria-hidden="true">
                        {[...Array(20)].map((_, i) => (
                            <span key={i} className="btc-particle" style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 6}s`,
                                animationDuration: `${4 + Math.random() * 4}s`,
                            }} />
                        ))}
                    </div>
                    <div className="btc-hero__content btc-reveal">
                        <span className="btc-hero__label">THE CHALLENGER'S JOURNAL</span>
                        <h1 className="btc-hero__title">
                            Beyond the<span className="highlight"> Code</span><span className="highlight">.</span>
                        </h1>
                        <p className="btc-hero__subtitle">
                            Every line of code I write is fueled by the same discipline that carries me across
                            finish lines. Running isn't a hobby — it's a philosophy.
                        </p>
                        <div className="btc-hero__scroll-hint">
                            <span>Scroll to explore</span>
                            <div className="btc-hero__arrow" />
                        </div>
                    </div>
                </section>

                {/* ═══ SECTION 2 — MANIFESTO + STATS ═══ */}
                <section className="btc-manifesto btc-reveal">
                    <div className="btc-manifesto__inner">
                        <div className="btc-manifesto__text">
                            <h2 className="font-heading text-2xl md:text-3xl mb-4" style={{ color: 'var(--mono-text)' }}>
                                The Runner's <span className="highlight">Manifesto</span>
                            </h2>
                            <p style={{ color: 'var(--mono-muted)', lineHeight: 1.8, fontSize: '16px' }}>
                                I don't run to escape. I run to confront — the doubt, the pain, the voice that says "stop."
                                Marathons taught me that the body gives up long before the mind does. In software and on the
                                road, the only limit is the one you accept.
                            </p>
                            <blockquote className="btc-quote">
                                "The miracle isn't that I finished. The miracle is that I had the courage to start."
                            </blockquote>
                        </div>
                        <div className="btc-stats-grid">
                            {[
                                { value: '10+', label: 'Marathons Conquered' },
                                { value: '4', label: 'Countries Raced' },
                                { value: '3000+', label: 'Kilometres of Grit' },
                                { value: '4 AM', label: 'Daily Wake-Up Call' },
                            ].map((stat, i) => (
                                <StatCard key={i} value={stat.value} label={stat.label} delay={i * 120} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ SECTION 3 — RACE STORIES ═══ */}
                <section className="btc-section">
                    <div className="btc-section__header btc-reveal">
                        <span className="section-label">RACE CHRONICLES</span>
                        <h2 className="font-heading text-2xl md:text-4xl" style={{ color: 'var(--mono-text)' }}>
                            Every Race Tells a <span className="highlight">Story</span>
                        </h2>
                    </div>

                    {races.map((race, idx) => (
                        <div key={idx} className={`btc-race btc-reveal ${idx % 2 === 1 ? 'btc-race--reverse' : ''}`}>
                            {/* Animated accent line */}
                            <div className="btc-race__accent-line" />

                            {/* Image gallery side */}
                            <div className="btc-race__gallery">
                                <div className="btc-race__gallery-main">
                                    <img src={race.images[0]} alt={race.title} loading="lazy" />
                                    <div className="btc-race__gallery-shine" />
                                </div>
                                <div className="btc-race__gallery-stack">
                                    <img src={race.images[1]} alt={`${race.title} moment`} loading="lazy" />
                                    <img src={race.images[2]} alt={`${race.title} finish`} loading="lazy" />
                                </div>
                            </div>

                            {/* Text side */}
                            <div className="btc-race__info">
                                <span className="btc-race__number">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h3 className="btc-race__title">{race.title}</h3>
                                <p className="btc-race__location">{race.location}</p>
                                <p className="btc-race__tagline">{race.tagline}</p>
                                <p className="btc-race__desc">{race.description}</p>
                                <div className="btc-race__stats">
                                    {Object.entries(race.stats).map(([key, val]) => (
                                        <div key={key} className="btc-race__stat-pill">
                                            <span className="btc-race__stat-key">{key}</span>
                                            <span className="btc-race__stat-val">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ═══ SECTION 4 — THE DAILY GRIND ═══ */}
                <section className="btc-section">
                    <div className="btc-section__header btc-reveal">
                        <span className="section-label">THE DAILY GRIND</span>
                        <h2 className="font-heading text-2xl md:text-4xl" style={{ color: 'var(--mono-text)' }}>
                            Built Through <span className="highlight">Consistency</span>
                        </h2>
                        <p className="btc-section__subtitle">
                            Race day is 1% of the journey. The other 99% is the unglamorous, unwitnessed daily work.
                        </p>
                    </div>

                    <div className="btc-lifestyle-grid btc-reveal">
                        {lifestyleImages.map((img, i) => (
                            <div key={i} className="btc-lifestyle-card" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="btc-lifestyle-card__img-wrap">
                                    <img src={img.src} alt={img.caption} loading="lazy" />
                                    <div className="btc-lifestyle-card__shimmer" />
                                </div>
                                <p className="btc-lifestyle-card__caption">{img.caption}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ SECTION 5 — MY ANCHOR ═══ */}
                <section className="btc-section btc-anchor-section">
                    <div className="btc-section__header btc-reveal">
                        <span className="section-label">MY ANCHOR</span>
                        <h2 className="font-heading text-2xl md:text-4xl" style={{ color: 'var(--mono-text)' }}>
                            The People Behind the <span className="highlight">Finish Line</span>
                        </h2>
                        <p className="btc-section__subtitle">
                            Behind every runner is a family that believes. They don't just watch from the sidelines
                            — they carry you when you can't carry yourself.
                        </p>
                    </div>

                    <div className="btc-family-grid btc-reveal">
                        {familyImages.map((img, i) => (
                            <div
                                key={i}
                                className={`btc-family-card ${i === 0 ? 'btc-family-card--large' : ''}`}
                            >
                                <img src={img.src} alt={img.caption} loading="lazy" />
                                <div className="btc-family-card__overlay">
                                    <p>{img.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ SECTION 6 — CTA ═══ */}
                <section className="btc-cta btc-reveal">
                    <div className="btc-cta__inner">
                        <div className="btc-cta__gradient-border" />
                        <h2 className="font-heading text-2xl md:text-3xl mb-3" style={{ color: 'var(--mono-text)' }}>
                            The same discipline that conquers marathons<span className="highlight"> builds world-class software.</span>
                        </h2>
                        <p style={{ color: 'var(--mono-muted)', marginBottom: '28px', fontSize: '16px' }}>
                            If you want a partner who doesn't quit — on the road or on your project — let's talk.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link to="/contact" className="btn-primary">Let's Build Together</Link>
                            <Link to="/projects" className="btn-outline">View My Work</Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default BeyondTheCode;
