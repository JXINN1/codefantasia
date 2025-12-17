import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'AI Animation',
    description: 'Transform concepts into stunning animated sequences using the latest AI generation technologies.',
    features: ['Character Animation', 'Motion Design', 'Visual Effects', 'Style Transfer'],
    icon: '🎬',
  },
  {
    title: 'AI Short Films',
    description: 'Complete short film production powered by AI, from storyboarding to final render.',
    features: ['Concept Development', 'Script Visualization', 'AI Generation', 'Post-Production'],
    icon: '🎥',
  },
  {
    title: 'Music Videos',
    description: 'Create visually captivating music videos that push creative boundaries.',
    features: ['Visual Storytelling', 'Synchronized Animation', 'Artistic Direction', 'Color Grading'],
    icon: '🎵',
  },
  {
    title: 'Creative Tools',
    description: 'Custom workflows and tools designed for AI-powered creative production.',
    features: ['Workflow Automation', 'Custom Pipelines', 'Tool Development', 'Training Sessions'],
    icon: '⚡',
  },
];

export default function Service() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/30 rounded-full">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl">
              Crafting the Future of{' '}
              <span className="text-gradient">Visual Storytelling</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              We specialize in AI-powered filmmaking, creating tools and content that define the next generation of visual media.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection 
                key={service.title} 
                animation={index % 2 === 0 ? 'slide-left' : 'slide-right'} 
                delay={index * 0.1}
              >
                <div className="group h-full p-8 md:p-10 rounded-2xl bg-background border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-card flex items-center justify-center text-3xl border border-border group-hover:border-primary/50 transition-colors">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-6 grid grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to bringing your vision to life
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your vision and goals' },
              { step: '02', title: 'Concept', description: 'Developing the creative direction' },
              { step: '03', title: 'Production', description: 'AI-powered creation and iteration' },
              { step: '04', title: 'Delivery', description: 'Final polish and handoff' },
            ].map((item, index) => (
              <AnimatedSection key={item.step} animation="fade-up" delay={index * 0.15}>
                <div className="relative text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <span className="font-display text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scale" className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Let's discuss how we can bring your vision to life with AI-powered filmmaking.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
