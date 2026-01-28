import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import logoImage from '@/assets/logo.avif';

interface IntroLandingProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  char: string;
  speed: number;
  opacity: number;
  size: number;
}

export default function IntroLanding({ onComplete }: IntroLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const glitchTimelineRef = useRef<gsap.core.Timeline | null>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize subtle particles
  const initParticles = useCallback(() => {
    const chars = ['•', '○', '+', '×'];
    const particles: Particle[] = [];
    
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.15 + Math.random() * 0.25,
        opacity: 0.04 + Math.random() * 0.08,
        size: 6 + Math.random() * 6,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Animate particles
  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          particle.x -= (dx / dist) * force * 1;
          particle.y -= (dy / dist) * force * 1;
        }

        particle.y -= particle.speed;
        particle.x += Math.sin(Date.now() * 0.0003 + particle.y * 0.003) * 0.2;

        if (particle.y < -30) {
          particle.y = canvas.height + 30;
          particle.x = Math.random() * canvas.width;
        }

        ctx.font = `${particle.size}px 'Inter', sans-serif`;
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  }, []);

  // Magnetic cursor effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    
    if (logoRef.current && !isTransitioning) {
      const rect = logoRef.current.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;
      
      const dx = e.clientX - logoX;
      const dy = e.clientY - logoY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        const force = (200 - dist) / 200;
        magneticRef.current = {
          x: dx * force * 0.1,
          y: dy * force * 0.1,
        };
        
        gsap.to(logoRef.current, {
          x: magneticRef.current.x,
          y: magneticRef.current.y,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(logoRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.6)',
        });
      }
    }
  }, [isTransitioning]);

  // Click to transition
  const handleLogoClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Kill hover glitch
    if (glitchTimelineRef.current) {
      glitchTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introSeen', 'true');
        onComplete();
      }
    });

    // Intense glitch before zoom
    tl.to(logoImgRef.current, {
      x: 5,
      filter: 'hue-rotate(30deg) brightness(1.2)',
      duration: 0.05,
    })
    .to(logoImgRef.current, {
      x: -8,
      filter: 'hue-rotate(-30deg) brightness(0.9)',
      duration: 0.05,
    })
    .to(logoImgRef.current, {
      x: 6,
      filter: 'hue-rotate(20deg) brightness(1.1)',
      duration: 0.05,
    })
    .to(logoImgRef.current, {
      x: -4,
      filter: 'hue-rotate(-20deg)',
      duration: 0.05,
    })
    .to(logoImgRef.current, {
      x: 0,
      filter: 'hue-rotate(0deg) brightness(1)',
      duration: 0.05,
    })
    // Zoom in with fade
    .to(logoRef.current, {
      scale: 12,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.9,
      ease: 'power2.in',
    })
    // Fade out container with white overlay
    .to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
    }, '-=0.4')
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
    });
  }, [isTransitioning, onComplete]);

  // Hover glitch effect - subtle shake
  useEffect(() => {
    if (!logoImgRef.current || isTransitioning) return;

    if (isHovered) {
      const tl = gsap.timeline({ repeat: -1 });
      glitchTimelineRef.current = tl;
      
      // Subtle shake/tremble with glitch
      tl.to(logoImgRef.current, {
        x: 2,
        y: -1,
        rotation: 0.5,
        filter: 'hue-rotate(10deg)',
        duration: 0.08,
        ease: 'steps(1)',
      })
      .to(logoImgRef.current, {
        x: -3,
        y: 1,
        rotation: -0.5,
        filter: 'hue-rotate(-15deg)',
        duration: 0.08,
        ease: 'steps(1)',
      })
      .to(logoImgRef.current, {
        x: 1,
        y: -2,
        rotation: 0.3,
        filter: 'hue-rotate(5deg)',
        duration: 0.08,
        ease: 'steps(1)',
      })
      .to(logoImgRef.current, {
        x: -1,
        y: 0,
        rotation: -0.2,
        filter: 'hue-rotate(-5deg)',
        duration: 0.08,
        ease: 'steps(1)',
      })
      .to(logoImgRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        filter: 'hue-rotate(0deg)',
        duration: 0.15,
      })
      .to(logoImgRef.current, {
        duration: 0.3, // Pause before next shake
      });

      return () => {
        tl.kill();
        gsap.to(logoImgRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          filter: 'hue-rotate(0deg)',
          duration: 0.2,
        });
      };
    }
  }, [isHovered, isTransitioning]);

  // Initialize
  useEffect(() => {
    initParticles();
    animateParticles();
    
    window.addEventListener('mousemove', handleMouseMove);

    // Entrance animation
    gsap.fromTo(logoRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (glitchTimelineRef.current) {
        glitchTimelineRef.current.kill();
      }
    };
  }, [initParticles, animateParticles, handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      {/* Logo Container */}
      <div
        ref={logoRef}
        className="relative cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogoClick}
      >
        {/* RGB shift layers on hover */}
        {isHovered && !isTransitioning && (
          <>
            <img 
              src={logoImage}
              alt=""
              className="absolute inset-0 w-[280px] md:w-[400px] lg:w-[480px] h-auto opacity-20 pointer-events-none"
              style={{ transform: 'translate(-2px, -1px)', filter: 'hue-rotate(-40deg) saturate(2)' }}
            />
            <img 
              src={logoImage}
              alt=""
              className="absolute inset-0 w-[280px] md:w-[400px] lg:w-[480px] h-auto opacity-20 pointer-events-none"
              style={{ transform: 'translate(2px, 1px)', filter: 'hue-rotate(40deg) saturate(2)' }}
            />
          </>
        )}

        {/* Main logo */}
        <img
          ref={logoImgRef}
          src={logoImage}
          alt="Code Fantasia"
          className="relative w-[280px] md:w-[400px] lg:w-[480px] h-auto"
        />

        {/* Click hint */}
        <p className={`text-center mt-6 text-sm tracking-widest uppercase transition-opacity duration-300 ${
          isHovered ? 'text-foreground/60' : 'text-muted-foreground/40'
        }`}>
          Click to Enter
        </p>
      </div>

      {/* White overlay for smooth transition */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0"
      />

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem('introSeen', 'true');
          onComplete();
        }}
        className="absolute bottom-8 right-8 text-muted-foreground/30 hover:text-muted-foreground/60 text-xs tracking-wider transition-colors"
      >
        SKIP →
      </button>
    </div>
  );
}
