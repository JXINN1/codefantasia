import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import logoImage from '@/assets/logo.avif';
import showreelVideo from '@/assets/showreel.mp4';

interface IntroLandingProps {
  onComplete: () => void;
}

export default function IntroLanding({ onComplete }: IntroLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const gaugeFillRef = useRef<HTMLDivElement>(null);
  const gaugeTextRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const videoReadyRef = useRef(false);
  const fakeProgressRef = useRef(0);
  const animFrameRef = useRef<number>();

  // Simulate loading progress and track actual video readiness
  const startLoading = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Listen for video ready
    const onCanPlay = () => {
      videoReadyRef.current = true;
    };
    video.addEventListener('canplaythrough', onCanPlay);

    // Start loading the video
    video.load();

    // Animate fake progress that speeds up when video is actually ready
    const tick = () => {
      const current = fakeProgressRef.current;
      
      if (videoReadyRef.current) {
        // Video ready — rush to 100
        fakeProgressRef.current = Math.min(100, current + 3);
      } else {
        // Slow fake progress, cap at 85 until video loads
        if (current < 85) {
          fakeProgressRef.current = current + 0.4 + Math.random() * 0.6;
        }
      }

      const rounded = Math.floor(fakeProgressRef.current);
      setProgress(rounded);

      if (rounded >= 100) {
        // Loading complete — trigger transition
        transitionOut();
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const transitionOut = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introSeen', 'true');
        onComplete();
      },
    });

    // Logo + gauge fade up and out
    tl.to([logoRef.current, gaugeRef.current], {
      opacity: 0,
      y: -40,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.05,
    })
    // Container fades
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, '-=0.2');
  }, [onComplete]);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    gsap.set([logoRef.current, gaugeRef.current], { opacity: 0, y: 30 });

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    })
    .to(gaugeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    const cleanup = startLoading();

    return () => {
      tl.kill();
      cleanup?.();
    };
  }, [startLoading]);

  // Update gauge fill width
  useEffect(() => {
    if (gaugeFillRef.current) {
      gaugeFillRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

      {/* Hidden video element for preloading */}
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
        className="w-[220px] md:w-[320px] lg:w-[380px] h-auto mb-12"
      />

      {/* Loading gauge */}
      <div ref={gaugeRef} className="flex flex-col items-center gap-4 w-full max-w-xs">
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-muted/30 rounded-full overflow-hidden">
          <div
            ref={gaugeFillRef}
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-[width] duration-100 ease-out"
            style={{ width: '0%' }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={gaugeTextRef}
          className="font-display text-xs tracking-[0.3em] text-muted-foreground"
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
