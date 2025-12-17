import { useState, useCallback } from 'react';
import { parseVideoUrl, VideoInfo } from '@/lib/videoUtils';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  url: string;
  title: string;
  className?: string;
  thumbnailOverride?: string;
}

export default function VideoPlayer({ url, title, className, thumbnailOverride }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoInfo = parseVideoUrl(url);

  const handlePlay = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!videoInfo) {
    return (
      <div className={cn('aspect-video bg-card rounded-lg flex items-center justify-center', className)}>
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    );
  }

  const thumbnailUrl = thumbnailOverride || videoInfo.thumbnailUrl;

  return (
    <div className={cn('relative aspect-video rounded-xl overflow-hidden group', className)}>
      {!isLoaded ? (
        // Facade - Static Thumbnail
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail */}
          {!imageError ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center">
              <span className="font-display text-2xl text-muted-foreground">{title}</span>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150 group-hover:scale-175 transition-transform duration-500" />
              
              {/* Play button */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center border-2 border-primary shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Video Info Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider',
              videoInfo.provider === 'youtube' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            )}>
              {videoInfo.provider}
            </span>
          </div>
        </button>
      ) : (
        // Actual Video Player
        <iframe
          src={videoInfo.embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
