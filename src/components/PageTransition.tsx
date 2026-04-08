import { useEffect, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const tl = gsap.timeline();

    // Wipe in
    tl.set(overlay, { scaleY: 0, transformOrigin: 'bottom' })
      .set(content, { opacity: 0 })
      .to(overlay, { scaleY: 1, duration: 0.4, ease: 'power3.inOut' })
      .set(overlay, { transformOrigin: 'top' })
      .to(content, { opacity: 1, duration: 0.01 })
      .to(overlay, { scaleY: 0, duration: 0.4, ease: 'power3.inOut' });

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e1b4b 100%)',
          transform: 'scaleY(0)',
        }}
      />
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
