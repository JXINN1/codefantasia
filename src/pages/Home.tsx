import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import showreelVideo from '@/assets/showreel.mp4';



gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(videoRef.current, { opacity: 0, y: 60 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      // Hero entrance animation with slight delay to ensure DOM is ready
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.1 
      });

      tl.to(videoRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

      // Parallax effect on scroll
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      >
        {/* Background Effects - Light background for logo visibility */}
        <div className="hero-bg absolute inset-0">
          {/* Light Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-white" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-grid opacity-10" />
          
          {/* Soft colored orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl animate-float animation-delay-200" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl animate-float animation-delay-400" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">

          {/* Showreel Video with Cinematic Frame */}
          <div
            ref={videoRef}
            className="relative w-full max-w-5xl mx-auto"
          >
            {/* Outer cinematic frame */}
            <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-2xl blur-sm" />
            <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-xl" />
            
            {/* Main video container */}
            <div className="relative bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
              {/* Top bar - cinema style */}
              <div className="flex items-center justify-between px-4 py-2 bg-background/80 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground tracking-wider">CODE FANTASIA SHOWREEL 2025</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-mono">LIVE</span>
                </div>
              </div>
              
              {/* Video */}
              <div className="relative aspect-video">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={showreelVideo} type="video/mp4"/>
                </video>
                
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10" />
                
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
              </div>
              
              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-background/80 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">4K UHD</span>
                  <span className="text-xs font-mono text-muted-foreground">60 FPS</span>
                </div>
                <span className="text-xs font-mono text-primary">AI POWERED FILMMAKING</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/portfolio"
              className="group relative px-8 py-4 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 bg-slate-800 text-white font-display font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-slate-700 hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        
        <AnimatedSection animation="scale" className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Create <span className="text-gradient">Something Amazing</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Let's collaborate on your next AI-powered visual project
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            Start a Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>

      <Footer />
    </main>
  );
}
