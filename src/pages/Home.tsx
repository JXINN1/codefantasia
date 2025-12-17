import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      // Hero entrance animation with slight delay to ensure DOM is ready
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        delay: 0.1 
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Effects */}
        <div className="hero-bg absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-hero-gradient" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          
          {/* Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-200" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-400" />
          
          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1
            ref={titleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
          >
            <span className="block text-foreground">CODE</span>
            <span className="block text-gradient text-glow-primary">FANTASIA</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            We create tools, workflows, and aesthetics that will define a generation of{' '}
            <span className="text-primary font-medium">AI-powered filmmaking</span>.
          </p>

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
              className="px-8 py-4 border border-border text-foreground font-display font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
            >
              Get in Touch
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-32 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-4">
              The Future of <span className="text-gradient">Filmmaking</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
              Pushing the boundaries of what's possible with AI-generated visuals
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Animation',
                description: 'Revolutionary techniques blending traditional storytelling with cutting-edge AI generation.',
                icon: '🎬',
              },
              {
                title: 'Creative Tools',
                description: 'Custom workflows and tools designed for the next generation of digital creators.',
                icon: '⚡',
              },
              {
                title: 'Visual Excellence',
                description: 'Cinematic quality that pushes the boundaries of AI-generated content.',
                icon: '✨',
              },
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} animation="fade-up" delay={index * 0.1}>
                <div className="group p-8 rounded-xl bg-background border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
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
