import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis-like smooth scroll with native CSS
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
