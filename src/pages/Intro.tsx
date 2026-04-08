import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import IntroLanding from '@/components/IntroLanding';
import Home from '@/pages/Home';

export default function Intro() {
  const [showHome, setShowHome] = useState(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setShowHome(true);
  };

  if (showHome) {
    return <Home />;
  }

  return (
    <>
      <Helmet>
        <title>CODE FANTASIA</title>
        <meta name="description" content="CODE FANTASIA" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://codefantasia.ai/" />
      </Helmet>
      <IntroLanding onComplete={handleIntroComplete} />
    </>
  );
}
