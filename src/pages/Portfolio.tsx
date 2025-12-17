import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioCard from '@/components/PortfolioCard';
import AnimatedSection from '@/components/AnimatedSection';

export const portfolioItems = [
  {
    slug: 'prototype-concept-video',
    title: 'PROTOTYPE CONCEPT VIDEO',
    subtitle: 'AI Animation',
    videoUrl: 'https://www.youtube.com/watch?v=iOg9nU_pXhs',
    description: 'A groundbreaking concept video showcasing the potential of AI-generated animation. This piece demonstrates our experimental approach to visual storytelling, blending futuristic aesthetics with cutting-edge AI technology.',
  },
  {
    slug: 'resin-drive-short-film',
    title: 'RESIN DRIVE SHORT FILM',
    subtitle: 'AI Short Film',
    videoUrl: 'https://vimeo.com/1092377931?fl=pl&fe=sh',
    description: 'An atmospheric short film exploring themes of isolation and technology. Created entirely using AI generation tools, this piece pushes the boundaries of what\'s possible in narrative filmmaking.',
  },
  {
    slug: 'voices',
    title: 'VOICES',
    subtitle: 'AI Short Film',
    videoUrl: 'https://vimeo.com/1039905268?fl=pl&fe=sh',
    description: 'A haunting exploration of human connection in the digital age. This AI-generated short film combines experimental visuals with an evocative soundscape to create an immersive viewing experience.',
  },
  {
    slug: 'baek-ayeon-my-universe',
    title: "백아연 'My Universe' (Official MV)",
    subtitle: 'AI Music Video',
    videoUrl: 'https://www.youtube.com/watch?v=igPb1ypyMDE&list=RDigPb1ypyMDE&start_radio=1',
    description: 'Official music video for Baek A-yeon\'s "My Universe". This project demonstrates the seamless integration of AI-generated visuals with traditional music video production, creating a unique visual language.',
  },
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-wider text-secondary border border-secondary/30 rounded-full">
              Our Work
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
              <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Explore our collection of AI-powered visual projects, from experimental animations to full-length short films.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                subtitle={item.subtitle}
                videoUrl={item.videoUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
