import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MagneticButton from '@/components/MagneticButton';
import MouseWaveBackground from '@/components/MouseWaveBackground';
import TextReveal from '@/components/TextReveal';
import showreelVideo from '@/assets/showreel.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const videoContainer = videoContainerRef.current;
      if (videoContainer) {
        gsap.set(videoContainer, { scale: 1.15, borderRadius: '0px', opacity: 1 });
        gsap.to(videoContainer, {
          scale: 1,
          borderRadius: '24px',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1.5,
          },
        });
      }

      if (overlayTextRef.current) {
        gsap.to(overlayTextRef.current, {
          opacity: 0,
          y: -60,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '30% top',
            scrub: 1,
          },
        });
      }

      // About section animations
      if (aboutRef.current) {
        const aboutElements = aboutRef.current.querySelectorAll('.about-animate');
        gsap.set(aboutElements, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(aboutElements, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
            });
          },
          once: true,
        });

        // Parallax glow orbs
        gsap.to('.about-orb-1', {
          y: -80,
          scrollTrigger: { trigger: aboutRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        });
        gsap.to('.about-orb-2', {
          y: 60,
          scrollTrigger: { trigger: aboutRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        });
      }

      // Services section
      if (servicesRef.current) {
        const serviceElements = servicesRef.current.querySelectorAll('.service-animate');
        gsap.set(serviceElements, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: servicesRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(serviceElements, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
            });
          },
          once: true,
        });
      }

      // CTA entrance
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
          },
          once: true,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>CODE FANTASIA</title>
        <meta name="description" content="CODE FANTASIA — Next-Generation AI Content Lab" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://codefantasia.ai/" />
      </Helmet>
      <Header />

      {/* ── HERO: Fullscreen Video ── */}
      <section ref={heroRef} className="relative min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div ref={videoContainerRef} className="relative w-full h-full overflow-hidden">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={showreelVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.04]" />
          </div>

          {/* Overlay text */}
          <div ref={overlayTextRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="text-center">
              <h1 className="font-body text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] text-white/80 font-light">
                Next-Generation AI Content Lab
              </h1>
            </div>
            <div className="absolute bottom-12 flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs uppercase tracking-widest font-body">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
                <div className="w-full h-4 bg-white/80 animate-bounce absolute top-0" />
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/20 z-10" />
          <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-white/20 z-10" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-white/20 z-10" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/20 z-10" />
        </div>
      </section>

      {/* ── TRANSITION: Text Reveal ── */}
      <section className="relative py-28 md:py-36 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.04]" />
        <div className="container mx-auto px-6 relative z-10">
          <TextReveal
            text="We craft cinematic visual experiences powered by the limitless potential of artificial intelligence"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white/90 leading-tight tracking-tight text-center max-w-5xl mx-auto"
            highlightWords={['cinematic', 'artificial', 'intelligence']}
            stagger={0.04}
          />
        </div>
      </section>

      {/* ── ABOUT BLOCK: Creativity Meets AI ── */}
      <section ref={aboutRef} className="relative overflow-hidden">
        <div className="relative py-32 md:py-44 bg-slate-950">
          <MouseWaveBackground color="139, 92, 246" opacity={0.05} />
          <div className="about-orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
          <div className="about-orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-[0.06]" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Label */}
              <div className="about-animate mb-10">
                <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 text-xs text-white/50 tracking-[0.25em] uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  About Us
                </span>
              </div>

              {/* Main headline */}
              <h2 className="about-animate font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-3">
                CREATIVITY
              </h2>
              <h2 className="about-animate font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-10">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                  MEETS AI
                </span>
              </h2>

              {/* Thin divider line */}
              <div className="about-animate w-16 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mb-8" />

              {/* Description */}
              <p className="about-animate text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed mb-14 font-body">
                스토리텔링 중심의 AI 프로덕션으로
                <br />
                콘텐츠 산업의 새로운 지평을 열어갑니다
              </p>

              {/* Button */}
              <div className="about-animate">
                <MagneticButton>
                  <Link
                    to="/about"
                    className="group relative inline-flex items-center gap-3 px-10 py-5 border border-white/15 text-white font-display text-sm font-semibold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:border-violet-400/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                  >
                    <span className="relative z-10">More About Us</span>
                    <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES BLOCK ── */}
      <section ref={servicesRef} className="relative py-32 md:py-44 bg-white overflow-hidden">
        <MouseWaveBackground color="100, 100, 140" opacity={0.04} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-slate-100 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Label */}
            <div className="service-animate mb-10">
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate-200 text-xs text-slate-400 tracking-[0.25em] uppercase bg-white/80 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Our Services
              </span>
            </div>

            {/* Headline */}
            <h2 className="service-animate font-display text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Crafting the Future of
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                Visual Storytelling
              </span>
            </h2>

            {/* Divider */}
            <div className="service-animate w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-8" />

            {/* Description */}
            <p className="service-animate text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-14 font-body">
              우리는 AI 기반으로 차세대 비주얼 미디어를 정의할
              <br />
              콘텐츠와 기술을 개발합니다
            </p>

            {/* Button */}
            <div className="service-animate">
              <MagneticButton>
                <Link
                  to="/service"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-display text-sm font-semibold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(15,23,42,0.3)]"
                >
                  <span className="relative z-10">Our Services</span>
                  <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative py-40 overflow-hidden bg-slate-950">
        <MouseWaveBackground color="6, 182, 212" opacity={0.04} />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div ref={ctaRef}>
            <p className="text-violet-400/70 text-xs uppercase tracking-[0.3em] font-body mb-8">Next Step</p>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
              Ready to Create
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Something Amazing
              </span>
              <span className="text-white">?</span>
            </h2>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-8" />

            <p className="text-white/40 max-w-md mx-auto mb-14 text-lg font-body leading-relaxed">
              Let's collaborate on your next AI-powered visual project
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/portfolio"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-display text-sm font-semibold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(139,92,246,0.2)]"
                >
                  <span className="relative z-10">View Our Work</span>
                  <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display text-sm font-semibold uppercase tracking-[0.2em]">
                    View Our Work
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 border border-white/15 text-white font-display text-sm font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:border-violet-400/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
                >
                  Get in Touch
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
