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

interface KitschElement {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'arrow' | 'code';
  rotation: number;
}

export default function IntroLanding({ onComplete }: IntroLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const magneticRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  
  const [isHovered, setIsHovered] = useState(false);
  const [kitschElements, setKitschElements] = useState<KitschElement[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize subtle particles for minimal aesthetic
  const initParticles = useCallback(() => {
    const chars = ['•', '○', '+', '×'];
    const particles: Particle[] = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.05 + Math.random() * 0.1,
        size: 8 + Math.random() * 8,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Animate particles on canvas - subtle minimal style
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
        // Mouse influence
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          const force = (120 - dist) / 120;
          particle.x -= (dx / dist) * force * 1.5;
          particle.y -= (dy / dist) * force * 1.5;
        }

        // Float upward slowly
        particle.y -= particle.speed;
        particle.x += Math.sin(Date.now() * 0.0005 + particle.y * 0.005) * 0.3;

        // Reset if out of bounds
        if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle - dark color on light background
        ctx.font = `${particle.size}px 'Inter', sans-serif`;
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  }, []);

  // Handle mouse move for magnetic effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    
    if (logoRef.current && !isTransitioning) {
      const rect = logoRef.current.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;
      
      const dx = e.clientX - logoX;
      const dy = e.clientY - logoY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 250) {
        const force = (250 - dist) / 250;
        magneticRef.current = {
          x: dx * force * 0.12,
          y: dy * force * 0.12,
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
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    }
  }, [isTransitioning]);

  // Handle logo click - spawn kitsch elements
  const handleLogoClick = useCallback(() => {
    if (isTransitioning) return;
    
    const rect = logoRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Spawn kitsch elements
    const types: ('star' | 'arrow' | 'code')[] = ['star', 'arrow', 'code'];
    const newElements: KitschElement[] = [];
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      newElements.push({
        id: Date.now() + i,
        x: rect.left + rect.width / 2 + Math.cos(angle) * 80,
        y: rect.top + rect.height / 2 + Math.sin(angle) * 80,
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * 360,
      });
    }
    
    setKitschElements(prev => [...prev, ...newElements]);

    // Animate kitsch elements out
    setTimeout(() => {
      newElements.forEach((el, i) => {
        const element = document.getElementById(`kitsch-${el.id}`);
        if (element) {
          gsap.fromTo(element, 
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.3,
              delay: i * 0.03,
              ease: 'back.out(2)',
            }
          );
          
          gsap.to(element, {
            x: Math.cos((i / 8) * Math.PI * 2) * 180,
            y: Math.sin((i / 8) * Math.PI * 2) * 180,
            opacity: 0,
            scale: 1.5,
            duration: 0.7,
            delay: 0.25 + i * 0.03,
            ease: 'power2.out',
            onComplete: () => {
              setKitschElements(prev => prev.filter(k => k.id !== el.id));
            }
          });
        }
      });
    }, 10);

    // Start transition
    setTimeout(() => startTransition(), 500);
  }, [isTransitioning]);

  // Transition to main content
  const startTransition = useCallback(() => {
    if (!logoRef.current || !containerRef.current) return;
    
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introSeen', 'true');
        onComplete();
      }
    });

    // Zoom in logo and fade out
    tl.to(logoRef.current, {
      scale: 8,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 0.8,
      ease: 'power3.in',
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
    }, '-=0.3');
  }, [onComplete]);

  // Glitch effect on hover
  useEffect(() => {
    if (!logoImgRef.current || isTransitioning) return;

    if (isHovered) {
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
      
      glitchTl
        .to(logoImgRef.current, {
          x: 3,
          filter: 'hue-rotate(20deg) saturate(1.5)',
          duration: 0.05,
        })
        .to(logoImgRef.current, {
          x: -3,
          filter: 'hue-rotate(-20deg) saturate(1.2)',
          duration: 0.05,
        })
        .to(logoImgRef.current, {
          x: 0,
          filter: 'hue-rotate(0deg) saturate(1)',
          duration: 0.05,
        });

      return () => {
        glitchTl.kill();
        gsap.to(logoImgRef.current, {
          x: 0,
          filter: 'hue-rotate(0deg) saturate(1)',
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
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)', delay: 0.2 }
    );

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initParticles, animateParticles, handleMouseMove]);

  // Render kitsch element based on type
  const renderKitschElement = (el: KitschElement) => {
    switch (el.type) {
      case 'star':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-primary">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'arrow':
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-foreground fill-none stroke-2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        );
      case 'code':
        return (
          <span className="text-xs font-mono font-bold text-foreground">{'</>'}</span>
        );
    }
  };

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

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

      {/* Soft ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      {/* Logo Container */}
      <div
        ref={logoRef}
        className="relative cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogoClick}
      >
        {/* RGB Shift layers (visible on hover) */}
        {isHovered && !isTransitioning && (
          <>
            <img 
              src={logoImage}
              alt=""
              className="absolute inset-0 w-[280px] md:w-[400px] lg:w-[500px] h-auto opacity-30 pointer-events-none"
              style={{ transform: 'translate(-3px, -2px)', filter: 'hue-rotate(-30deg)' }}
            />
            <img 
              src={logoImage}
              alt=""
              className="absolute inset-0 w-[280px] md:w-[400px] lg:w-[500px] h-auto opacity-30 pointer-events-none"
              style={{ transform: 'translate(3px, 2px)', filter: 'hue-rotate(30deg)' }}
            />
          </>
        )}

        {/* Main logo image */}
        <img
          ref={logoImgRef}
          src={logoImage}
          alt="Code Fantasia"
          className="relative w-[280px] md:w-[400px] lg:w-[500px] h-auto drop-shadow-lg"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 30px rgba(0, 200, 200, 0.3))' : 'none',
            transition: 'filter 0.3s ease',
          }}
        />

        {/* Click hint */}
        <p className="text-center mt-8 text-muted-foreground/60 font-body text-sm tracking-widest uppercase">
          Click to Enter
        </p>

        {/* Minimal decorative corners */}
        <div className="absolute -top-6 -left-6 w-6 h-6 border-l border-t border-foreground/10" />
        <div className="absolute -top-6 -right-6 w-6 h-6 border-r border-t border-foreground/10" />
        <div className="absolute -bottom-6 -left-6 w-6 h-6 border-l border-b border-foreground/10" />
        <div className="absolute -bottom-6 -right-6 w-6 h-6 border-r border-b border-foreground/10" />
      </div>

      {/* Kitsch Elements */}
      {kitschElements.map((el) => (
        <div
          key={el.id}
          id={`kitsch-${el.id}`}
          className="fixed pointer-events-none z-50"
          style={{
            left: el.x,
            top: el.y,
            transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
          }}
        >
          {renderKitschElement(el)}
        </div>
      ))}

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem('introSeen', 'true');
          onComplete();
        }}
        className="absolute bottom-8 right-8 text-muted-foreground/40 hover:text-muted-foreground/70 text-xs font-body tracking-wider transition-colors"
      >
        SKIP →
      </button>
    </div>
  );
}
