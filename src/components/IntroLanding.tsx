import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import logoImage from '@/assets/logo.avif';
import showreelVideo from '@/assets/showreel.mp4';

interface IntroLandingProps {
  onComplete: () => void;
}

export default function IntroLanding({ onComplete }: IntroLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReadyRef = useRef(false);
  const completedRef = useRef(false);

  const transitionOut = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introSeen', 'true');
        onComplete();
      },
    });

    // Logo scales up slightly and fades out
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: 'power3.inOut',
    })
    // Container fades out
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, '-=0.3');
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Entrance: logo fades in
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });
    gsap.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });

    const onCanPlay = () => {
      videoReadyRef.current = true;
      // Give logo at least 1.5s of screen time before transitioning
      setTimeout(() => transitionOut(), 800);
    };

    video.addEventListener('canplaythrough', onCanPlay);
    video.load();

    // Fallback: if video takes too long, transition after 6s
    const fallback = setTimeout(() => {
      if (!completedRef.current) transitionOut();
    }, 6000);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      clearTimeout(fallback);
    };
  }, [transitionOut]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

      {/* Hidden video for preloading */}
      <video
        ref={videoRef}
        src={showreelVideo}
        preload="auto"
        muted
        playsInline
        className="hidden"
      />

      {/* Logo */}
      <img
        ref={logoRef}
        src={logoImage}
        alt="Code Fantasia"
        className="w-[220px] md:w-[320px] lg:w-[380px] h-auto"
      />
    </div>
  );
}
