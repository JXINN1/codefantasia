import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  highlightWords?: string[];
}

export default function TextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  stagger = 0.03,
  highlightWords = [],
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.word');

    gsap.set(words, { opacity: 0.15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    tl.to(words, {
      opacity: 1,
      stagger,
      ease: 'none',
    });

    return () => { tl.kill(); };
  }, [stagger]);

  const renderWords = () =>
    text.split(' ').map((word, i) => {
      const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
      return (
        <span
          key={i}
          className={`word inline-block mr-[0.3em] ${isHighlight ? 'bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent' : ''}`}
        >
          {word}
        </span>
      );
    });

  return (
    <div ref={containerRef}>
      <Tag className={className}>{renderWords()}</Tag>
    </div>
  );
}
