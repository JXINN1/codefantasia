import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroLanding from '@/components/IntroLanding';

export default function Intro() {
  const navigate = useNavigate();

  // If intro already seen, redirect to /home
  useEffect(() => {
    if (sessionStorage.getItem('introSeen') === 'true') {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    navigate('/home', { replace: true });
  };

  // If already seen, render nothing while redirecting
  if (sessionStorage.getItem('introSeen') === 'true') {
    return null;
  }

  return <IntroLanding onComplete={handleIntroComplete} />;
}
