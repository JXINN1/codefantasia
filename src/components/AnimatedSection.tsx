import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
}

export default function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 1,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animations: Record<string, gsap.TweenVars> = {
      'fade-up': { opacity: 0, y: 40 },
      'fade-in': { opacity: 0 },
      'scale': { opacity: 0, scale: 0.95 },
      'slide-left': { opacity: 0, x: -40 },
      'slide-right': { opacity: 0, x: 40 },
    };

    gsap.set(section, animations[animation]);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [animation, delay, duration]);

  return (
    <div ref={sectionRef} className={cn(className)}>
      {children}
    </div>
  );
}
