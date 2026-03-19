import { useState, useEffect } from 'react';
import IntroLanding from '@/components/IntroLanding';
import Home from '@/pages/Home';

export default function Intro() {
  const [showHome, setShowHome] = useState(
    sessionStorage.getItem('introSeen') === 'true'
  );

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setShowHome(true);
  };

  if (showHome) {
    return <Home />;
  }

  return <IntroLanding onComplete={handleIntroComplete} />;
}
