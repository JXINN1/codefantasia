import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import AnimatedSection from '@/components/AnimatedSection';
import { portfolioItems } from './Portfolio';

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioItems.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground">Project Not Found</h1>
          <p className="mt-4 text-muted-foreground">The project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="mt-8 inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg"
          >
            Back to Portfolio
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Find adjacent projects for navigation
  const currentIndex = portfolioItems.findIndex((item) => item.slug === slug);
  const prevProject = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Video Section */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up">
            <VideoPlayer
              url={project.videoUrl}
              title={project.title}
              className="shadow-2xl shadow-primary/10"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up" delay={0.1}>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/30 rounded-full">
                {project.subtitle}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                {project.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </AnimatedSection>

            {/* Project Details */}
            <AnimatedSection animation="fade-up" delay={0.2} className="mt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl bg-card border border-border/50">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Category</span>
                  <p className="mt-1 font-medium text-foreground">{project.subtitle}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Studio</span>
                  <p className="mt-1 font-medium text-foreground">Code Fantasia</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Tools</span>
                  <p className="mt-1 font-medium text-foreground">AI Generation</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Year</span>
                  <p className="mt-1 font-medium text-foreground">2024</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group flex-1 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Previous</span>
                <p className="mt-2 font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {prevProject.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <Link
              to="/portfolio"
              className="flex items-center justify-center px-8 py-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-sm text-muted-foreground">View All Projects</span>
            </Link>

            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group flex-1 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 text-right"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Next</span>
                <p className="mt-2 font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
