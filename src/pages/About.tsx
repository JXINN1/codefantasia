import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { role: 'CEO', name: 'Kwanwoo Park' },
  { role: 'COO', name: 'Taegyu Seo' },
  { role: 'CTO', name: 'Kyungtae Chung' },
  { role: 'Director', name: 'Jane Kim' },
];

export default function About() {
  const visionRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vision section animation
      gsap.fromTo(
        '.vision-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 80%',
          },
        }
      );

      // What we do cards animation
      gsap.fromTo(
        '.what-we-do-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: whatWeDoRef.current,
            start: 'top 80%',
          },
        }
      );

      // Team cards animation
      gsap.fromTo(
        '.team-card',
        { opacity: 0, scale: 0.9, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 bg-slate-800/10 rounded-full text-sm font-medium text-slate-700 mb-6 tracking-wide">
                ABOUT US
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                CREATIVITY<br />
                <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  MEETS AI
                </span>
              </h1>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12">
                <span className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-sm font-bold text-white mb-6 tracking-wider shadow-lg shadow-violet-500/30">
                  VISION
                </span>
              </div>
            </AnimatedSection>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
              {/* Decorative gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-violet-500 via-transparent to-cyan-500 rounded-3xl -z-10" />
              
              <div className="space-y-8 text-center">
                <p className="vision-text text-xl md:text-2xl lg:text-3xl text-slate-700 leading-relaxed font-medium">
                  스토리텔링 중심의 <span className="bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent font-bold">크리에이티브 AI 프로덕션</span>을 통해
                </p>
                <p className="vision-text text-xl md:text-2xl lg:text-3xl text-slate-700 leading-relaxed font-medium">
                  아직 정립되지 않은 AI 콘텐츠 파이프라인의 <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent font-bold">새로운 경제</span>를 구축하고,
                </p>
                <p className="vision-text text-2xl md:text-3xl lg:text-4xl text-slate-900 font-bold leading-relaxed">
                  AI 콘텐츠 기술 기반의 <span className="bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">산업 혁신</span>을 선도합니다.
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-violet-500/30 rounded-tl-xl" />
              <div className="absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-cyan-500/30 rounded-tr-xl" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-cyan-500/30 rounded-bl-xl" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-violet-500/30 rounded-br-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section - Overlapping Circles */}
      <section ref={whatWeDoRef} className="py-24 relative bg-slate-50/50">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-cyan-500/10 rounded-full text-sm font-semibold text-cyan-600 mb-4 tracking-wider">
                WHAT WE DO
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
                Our Expertise
              </h2>
            </div>
          </AnimatedSection>

          {/* Overlapping Circles Design */}
          <div className="flex justify-center items-center py-16">
            <div className="relative w-full max-w-4xl h-[400px] md:h-[450px]">
              {/* Circle 1 - AI 콘텐츠 제작 */}
              <div className="what-we-do-card absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-violet-500 to-violet-600 shadow-2xl shadow-violet-500/30 flex items-center justify-center group hover:scale-105 transition-transform duration-500 cursor-pointer z-10">
                <div className="text-center px-8">
                  <span className="text-5xl mb-4 block">🎬</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                    AI 콘텐츠 제작
                  </h3>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
              </div>

              {/* Circle 2 - R&D 및 기술 개발 */}
              <div className="what-we-do-card absolute left-1/2 -translate-x-1/2 top-0 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-2xl shadow-cyan-500/30 flex items-center justify-center group hover:scale-105 transition-transform duration-500 cursor-pointer z-20">
                <div className="text-center px-8">
                  <span className="text-5xl mb-4 block">⚙️</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                    R&D 및 기술 개발
                  </h3>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
              </div>

              {/* Circle 3 - 차별화된 콘텐츠 경험 */}
              <div className="what-we-do-card absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-violet-600 via-purple-500 to-cyan-500 shadow-2xl shadow-purple-500/30 flex items-center justify-center group hover:scale-105 transition-transform duration-500 cursor-pointer z-10">
                <div className="text-center px-8">
                  <span className="text-5xl mb-4 block">✨</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
                    차별화된<br />콘텐츠 경험
                  </h3>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-400/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-slate-800/10 rounded-full text-sm font-semibold text-slate-700 mb-4 tracking-wider">
                MEET THE TEAM
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Leadership
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                30년 이상의 VFX, 미디어, 테크놀로지 분야 경험을 바탕으로<br />
                크리에이티브와 기술의 경계를 확장하는 팀입니다.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="team-card group relative bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-violet-200/40 transition-all duration-500 hover:-translate-y-2 text-center overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar Placeholder */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center group-hover:from-violet-200 group-hover:to-cyan-200 transition-all duration-500">
                    <span className="text-4xl text-slate-500 group-hover:text-violet-600 transition-colors duration-500">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full">
                    <span className="text-xs font-bold text-white tracking-wider">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="relative font-display text-lg font-bold text-slate-900">
                  {member.name}
                </h3>

                {/* Decorative Line */}
                <div className="mt-4 h-0.5 w-12 mx-auto bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
