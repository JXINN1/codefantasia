import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';
import aivfxScene from '@/assets/aivfxscene.png';
import originalIp from '@/assets/originalip.jpg';
import originalIp2 from '@/assets/originalip2.png';
import saasImg from '@/assets/saas.jpg';

const services = [
  {
    id: 'ai-vfx',
    title: 'AI VFX',
    subtitle: 'AI-Optimized Film CG',
    description: 'AI 최적화된 영화 CG를 제공할 수 있는 효율적이고 높은 퀄리티의 AI 파이프라인을 구축해 BtoB 서비스를 제공',
    images: [aivfxScene],
    features: ['Efficient AI Pipeline', 'High-Quality CG', 'B2B Services', 'Film Production'],
    gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'original-ip',
    title: 'CODE FANTASIA Original Contents (IP)',
    subtitle: 'Virtual Artist & AI Storytelling',
    description: '버추얼 아티스트 제작 / AI를 활용한 스토리기반의 오리지널 영화 / 애니메이션 / 미디어 콘텐츠 제작',
    images: [originalIp, originalIp2],
    features: ['Virtual Artists', 'Original Films', 'Animation', 'Media Contents'],
    gradient: 'from-violet-500/20 via-pink-500/10 to-transparent',
  },
  {
    id: 'ai-tech',
    title: 'AI Technology Product Development',
    subtitle: 'Software & SaaS Platform',
    description: '프로그램 소프트웨어 개발 / B to B 서비스 / SaaS 플랫폼 개발',
    images: [saasImg],
    features: ['Software Development', 'B2B Services', 'SaaS Platform', 'Custom Solutions'],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  },
];

export default function Service() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-3xl" />

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

      {/* Staggered Services Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.id}
              animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={index * 0.15}
              className="mb-32 last:mb-0"
            >
              <div className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content Side */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-8' : ''}`}>
                  <div className="relative">
                    {/* Number indicator */}
                    <span className="absolute -left-4 -top-8 font-display text-8xl font-black text-primary/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="relative z-10">
                      <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 block">
                        {service.subtitle}
                      </span>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative">
                    {/* Background glow */}
                    <div className={`absolute -inset-8 bg-gradient-to-br ${service.gradient} rounded-3xl blur-2xl`} />
                    
                    {/* Image container with staggered layout */}
                    <div className="relative">
                      {service.images.length === 1 ? (
                        // Single image layout
                        <div className="group relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <img
                            src={service.images[0]}
                            alt={service.title}
                            className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Corner accents */}
                          <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/50 z-20" />
                          <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/50 z-20" />
                          <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/50 z-20" />
                          <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/50 z-20" />
                        </div>
                      ) : (
                        // Double image staggered layout
                        <div className="relative h-[400px] md:h-[500px]">
                          {/* First image - positioned left and up */}
                          <div className="group absolute left-0 top-0 w-[60%] z-10 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                              src={service.images[0]}
                              alt={`${service.title} - 1`}
                              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          
                          {/* Second image - positioned right and down */}
                          <div className="group absolute right-0 bottom-0 w-[55%] z-20 rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                              src={service.images[1]}
                              alt={`${service.title} - 2`}
                              className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Decorative border */}
                            <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl z-30" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 relative overflow-hidden bg-card/50">
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
      <section className="py-20">
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
