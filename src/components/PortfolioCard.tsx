import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { parseVideoUrl } from '@/lib/videoUtils';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category?: string;
  videoUrl: string;
  thumbnailOverride?: string;
  index: number;
}

export default function PortfolioCard({ 
  slug, 
  title, 
  subtitle, 
  category,
  videoUrl, 
  thumbnailOverride,
  index 
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoInfo = parseVideoUrl(videoUrl);
  const thumbnailUrl = thumbnailOverride || videoInfo?.thumbnailUrl;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <Link
        to={`/portfolio/${slug}`}
        className="block group relative overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
              <span className="font-display text-lg text-muted-foreground">{title}</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center border border-primary shadow-lg">
              <svg 
                className="w-6 h-6 text-primary-foreground ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Provider Badge */}
          {videoInfo && (
            <div className="absolute top-3 right-3">
              <span className={cn(
                'px-2 py-1 rounded text-xs font-medium uppercase tracking-wider backdrop-blur-sm',
                videoInfo.provider === 'youtube' 
                  ? 'bg-red-500/30 text-red-300 border border-red-500/40' 
                  : 'bg-blue-500/30 text-blue-300 border border-blue-500/40'
              )}>
                {videoInfo.provider}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {category && (
            <span className="inline-block px-2 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-600 rounded border border-violet-500/30">
              {category}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          
          {/* Hover Line */}
          <div className="mt-4 h-0.5 w-0 bg-neon-gradient group-hover:w-full transition-all duration-500 rounded-full" />
        </div>
      </Link>
    </div>
  );
}
