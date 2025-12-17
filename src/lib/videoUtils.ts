export type VideoProvider = 'youtube' | 'vimeo' | 'unknown';

export interface VideoInfo {
  provider: VideoProvider;
  id: string;
  embedUrl: string;
  thumbnailUrl: string;
}

export function parseVideoUrl(url: string): VideoInfo | null {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      const id = match[1];
      return {
        provider: 'youtube',
        id,
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      };
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/video\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      const id = match[1];
      return {
        provider: 'vimeo',
        id,
        embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`,
        thumbnailUrl: `https://vumbnail.com/${id}.jpg`,
      };
    }
  }

  return null;
}

export function getProviderIcon(provider: VideoProvider): string {
  switch (provider) {
    case 'youtube':
      return '▶';
    case 'vimeo':
      return '▷';
    default:
      return '▶';
  }
}
