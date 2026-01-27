import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

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
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const magneticRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  
  const [isHovered, setIsHovered] = useState(false);
  const [kitschElements, setKitschElements] = useState<KitschElement[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize particles
  const initParticles = useCallback(() => {
    const chars = ['0', '1', '<', '>', '/', '{', '}', 'CODE', 'const', 'fn', '();', '[]', '==='];
    const particles: Particle[] = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.1 + Math.random() * 0.3,
        size: 10 + Math.random() * 14,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Animate particles on canvas
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
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.x -= (dx / dist) * force * 2;
          particle.y -= (dy / dist) * force * 2;
        }

        // Float upward
        particle.y -= particle.speed;
        particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.5;

        // Reset if out of bounds
        if (particle.y < -50) {
          particle.y = canvas.height + 50;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.font = `${particle.size}px 'Orbitron', monospace`;
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
        
        // Occasional pink particles
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(255, 20, 147, ${particle.opacity})`;
          ctx.fillText(particle.char, particle.x + 2, particle.y + 2);
        }
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
      
      if (dist < 200) {
        const force = (200 - dist) / 200;
        magneticRef.current = {
          x: dx * force * 0.15,
          y: dy * force * 0.15,
        };
        
        gsap.to(logoRef.current, {
          x: magneticRef.current.x,
          y: magneticRef.current.y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(logoRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    }
  }, [isTransitioning]);

  // Handle logo click - spawn kitsch elements
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
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
        x: rect.left + rect.width / 2 + Math.cos(angle) * 100,
        y: rect.top + rect.height / 2 + Math.sin(angle) * 100,
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
              delay: i * 0.05,
              ease: 'back.out(2)',
            }
          );
          
          gsap.to(element, {
            x: Math.cos((i / 8) * Math.PI * 2) * 150,
            y: Math.sin((i / 8) * Math.PI * 2) * 150,
            opacity: 0,
            scale: 1.5,
            duration: 0.8,
            delay: 0.3 + i * 0.05,
            ease: 'power2.out',
            onComplete: () => {
              setKitschElements(prev => prev.filter(k => k.id !== el.id));
            }
          });
        }
      });
    }, 10);

    // Start transition after a brief moment
    setTimeout(() => startTransition(), 600);
  }, [isTransitioning]);

  // Transition to main content
  const startTransition = useCallback(() => {
    if (!logoRef.current || !containerRef.current) return;
    
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        // Store in sessionStorage to skip on refresh
        sessionStorage.setItem('introSeen', 'true');
        onComplete();
      }
    });

    // Create explosion fragments
    const logoText = logoTextRef.current;
    if (logoText) {
      const text = logoText.innerText;
      logoText.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.className = 'explosion-char';
        logoText.appendChild(span);
      });

      const chars = logoText.querySelectorAll('.explosion-char');
      
      // Zoom in and explode
      tl.to(logoRef.current, {
        scale: 3,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(chars, {
        x: () => (Math.random() - 0.5) * window.innerWidth * 2,
        y: () => (Math.random() - 0.5) * window.innerHeight * 2,
        rotation: () => (Math.random() - 0.5) * 720,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
      }, '-=0.2')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.3');
    }
  }, [onComplete]);

  // Glitch effect on hover
  useEffect(() => {
    if (!logoRef.current || isTransitioning) return;

    if (isHovered) {
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });
      
      glitchTl
        .to(logoRef.current, {
          skewX: 2,
          x: magneticRef.current.x + 3,
          filter: 'hue-rotate(90deg)',
          duration: 0.05,
        })
        .to(logoRef.current, {
          skewX: -2,
          x: magneticRef.current.x - 3,
          filter: 'hue-rotate(-90deg)',
          duration: 0.05,
        })
        .to(logoRef.current, {
          skewX: 0,
          x: magneticRef.current.x,
          filter: 'hue-rotate(0deg)',
          duration: 0.05,
        });

      return () => {
        glitchTl.kill();
        gsap.to(logoRef.current, {
          skewX: 0,
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
      { opacity: 0, scale: 0.5, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
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
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-pink-500">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'arrow':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-400 fill-none stroke-2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        );
      case 'code':
        return (
          <span className="text-sm font-mono font-bold text-primary">{'</>'}</span>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none noise-overlay" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10" />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[80px] animate-pulse animation-delay-300" />

      {/* Logo */}
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
            <span 
              className="absolute inset-0 font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-red-500/50 pointer-events-none"
              style={{ transform: 'translate(-4px, -2px)' }}
            >
              CODE FANTASIA
            </span>
            <span 
              className="absolute inset-0 font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-blue-500/50 pointer-events-none"
              style={{ transform: 'translate(4px, 2px)' }}
            >
              CODE FANTASIA
            </span>
          </>
        )}

        {/* Main logo text */}
        <span
          ref={logoTextRef}
          className="relative font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #00ffff 0%, #ff1493 50%, #00ffff 100%)',
            textShadow: isHovered 
              ? '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(255, 20, 147, 0.6)' 
              : '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
        >
          CODE FANTASIA
        </span>

        {/* Subtitle */}
        <p className="text-center mt-4 text-muted-foreground font-mono text-sm tracking-widest uppercase animate-pulse">
          Click to Enter
        </p>

        {/* Decorative corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-pink-400/50" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-pink-400/50" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
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
        className="absolute bottom-8 right-8 text-muted-foreground/50 hover:text-muted-foreground text-sm font-mono tracking-wider transition-colors"
      >
        SKIP →
      </button>
    </div>
  );
}
