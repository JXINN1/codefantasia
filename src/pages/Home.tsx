import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';
import showreelVideo from '@/assets/showreel.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero video: starts fullscreen, scroll zooms into frame
      const videoContainer = videoContainerRef.current;
      if (videoContainer) {
        gsap.set(videoContainer, { 
          scale: 1.15, 
          borderRadius: '0px',
          opacity: 1 
        });

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

      // Overlay text fade out on scroll
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

      // CTA entrance
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });

      // Marquee speed linked to scroll
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>CODE FANTASIA</title>
        <meta name="description" content="CODE FANTASIA" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://codefantasia.ai/" />
      </Helmet>
      <Header />

      {/* ── HERO: Fullscreen Video with scroll-zoom effect ── */}
      <section
        ref={heroRef}
        className="relative min-h-[200vh]"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

          {/* Video container */}
          <div
            ref={videoContainerRef}
            className="relative w-full h-full overflow-hidden"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={showreelVideo} type="video/mp4" />
            </video>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.04]" />
          </div>

          {/* Overlay text */}
          <div
            ref={overlayTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          >
            <div className="text-center">
              <p className="font-body text-sm md:text-base uppercase tracking-[0.4em] text-white/60 mb-4">
                AI-Powered Visual Production
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]">
                <span className="block">CODE</span>
                <span className="block bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  FANTASIA
                </span>
              </h1>
            </div>

            {/* Scroll indicator */}
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

      {/* ── MARQUEE SECTION: Dark → Light transition ── */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div
          ref={marqueeRef}
          className="whitespace-nowrap flex gap-8 font-display text-6xl md:text-8xl font-bold text-slate-500/10 select-none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="shrink-0">
              FILM • VFX • AI • STORYTELLING • PRODUCTION •&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ── STATEMENT SECTION: Light theme with scroll-reveal text ── */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <TextReveal
            text="We create cinematic experiences powered by artificial intelligence — pushing the boundaries of visual storytelling for the next generation."
            tag="h2"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-5xl"
            highlightWords={['artificial', 'intelligence', 'cinematic']}
            stagger={0.04}
          />
        </div>
      </section>

      {/* ── CTA SECTION: Dark dramatic ── */}
      <section className="py-40 relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0c0a1d] to-slate-950">
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-float animation-delay-300" />

        <AnimatedSection animation="scale" className="container mx-auto px-6 text-center relative z-10">
          <div ref={ctaRef}>
            <p className="text-violet-400 text-sm uppercase tracking-[0.3em] font-body mb-6">Next Step</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Ready to Create
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Something Amazing
              </span>?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg font-body">
              Let's collaborate on your next AI-powered visual project
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <Link
                  to="/portfolio"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-display font-semibold uppercase tracking-wider rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20"
                >
                  <span className="relative z-10">View Our Work</span>
                  <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display font-semibold uppercase tracking-wider">
                    View Our Work
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 text-white font-display font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10"
                >
                  Get in Touch
                </Link>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
