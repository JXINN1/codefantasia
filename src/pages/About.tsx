import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
    role: 'CEO', 
    name: '박관우 (KWANWOO PARK)',
    careers: [
      '26년 경력의 글로벌 3D·VFX·대형 미디어 콘텐츠 전문가',
      'Showscan Entertainment (LA) 부사장 역임',
      'WYSIWYG Studios 대표이사 (2016–2024)',
      'CES·올림픽·월드 스포츠 이벤트 3D 콘텐츠 총괄',
    ],
    projects: [
      'Odysseo by Cavalia 3D 촬영',
      'CES 2014 24K 콘텐츠 – LG Display',
      '아시안 게임·세리에A·IAAF 3D 중계',
      '소녀시대 〈Run Devil Run〉 3D MV',
    ]
  },
  { 
    role: 'COO', 
    name: '서태규 (TAEGYU SEO)',
    careers: [
      'AI 기반 콘텐츠·미디어아트·하이브리드 제작 총괄 전문가',
      '2025 서울 국제 AI 영화제 금상',
      'LA International AI Film Festival BEST Hybrid AI Film',
      'WYSIWYG Studios Creative Director (2018–2024)',
    ],
    projects: [
      '부천국제영화제 AI 콘퍼런스 초청 강연',
      '영화 〈부산행〉, 〈염력〉 컨셉 디자인 참여',
      '〈로보카 폴리〉 미술감독·상품기획 총괄',
      '미디어아트·AR·AI 콘텐츠 기획 및 제작 총괄',
    ]
  },
  { 
    role: 'CTO', 
    name: '정경태 (KYUNGTAE CHUNG)',
    careers: [
      'AI·SW 기술 26년 경력의 국내 탑티어 기술 리더',
      '서강대학교 컴퓨터공학 겸임 교수',
      '시립인천전문대학교 전자상거래학과 초빙 교수',
      '(사)한국공인전자상거래관리사협회 기술이사',
    ],
    projects: [
      '정부·공공·산업 분야 AI·SW 시스템 설계 총괄',
      'AI 플랫폼 · SW 아키텍처 설계',
      '전자상거래 시스템 개발',
      '대규모 시스템 설계 전문',
    ]
  },
  { 
    role: '실장', 
    name: '김슬기 (JANE KIM)',
    careers: [
      '콘텐츠·전시·미디어아트 기획 전문 프로듀서',
      'LAMPERS 기획팀 팀장 (2024–2025)',
      'WYSIWYG Studios 프로듀서 (2019–2024)',
      '극장판 애니메이션·국립박물관·대형 전시 프로젝트 다수',
    ],
    projects: [
      'Paradise City Art Space 전시 기획',
      '국립고궁박물관 디지털 문화유산 콘텐츠',
      '극장판 애니메이션 〈도티와 영원의 탑〉 PD',
      '다수 미디어아트 전시 기획',
    ]
  },
];

const expertiseItems = [
  {
    number: '01',
    title: 'End-to-End AI Content Production Pipeline',
    description: '자체 AI·VFX 파이프라인 기반의 효율적인 스토리텔링 중심 비주얼 콘텐츠 제작',
    detail: '기획부터 제작까지 연결된 자체 파이프라인을 통해, 고품질 AI 비주얼 콘텐츠를 빠르고 안정적으로 구현합니다.',
    gradient: 'from-violet-500 to-purple-600',
    icon: '🎬',
  },
  {
    number: '02',
    title: 'Original IP & Character Development',
    description: '스토리·캐릭터 중심의 오리지널 IP 기획 및 개발 역량',
    detail: '장기 확장이 가능한 세계관, 캐릭터, 스토리를 직접 설계하고 콘텐츠·플랫폼·비즈니스로 확장합니다.',
    gradient: 'from-cyan-500 to-blue-600',
    icon: '✨',
  },
  {
    number: '03',
    title: 'AI Content Technology R&D',
    description: 'AI 콘텐츠 기술 연구·개발 및 실전 적용',
    detail: '영상·이미지·인터랙션을 아우르는 AI 기술을 직접 R&D하고, 실제 상용 콘텐츠에 적용 가능한 솔루션으로 개발합니다.',
    gradient: 'from-rose-500 to-orange-500',
    icon: '⚙️',
  },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="team-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div 
        className={`relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200 transition-all duration-500 z-10 ${
          isHovered ? '-translate-y-24 shadow-2xl shadow-violet-200/50' : ''
        }`}
      >
        {/* Avatar */}
        <div className="mx-auto w-20 h-20 mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-200 to-cyan-200 flex items-center justify-center">
            <span className="text-3xl text-violet-600 font-bold">
              {member.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="text-center mb-3">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-xs font-bold text-white tracking-wider">
            {member.role}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-center font-display text-lg font-bold text-slate-900 mb-4">
          {member.name}
        </h3>

        {/* Profile Button */}
        <div className="text-center">
          <button className="px-4 py-2 text-sm font-semibold text-violet-600 border-2 border-violet-500/30 rounded-full hover:bg-violet-50 transition-colors duration-300">
            Profile
          </button>
        </div>
      </div>

      {/* Career Details - Revealed on Hover */}
      <div 
        className={`absolute top-0 left-0 right-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 pt-28 transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '400px' }}
      >
        <div className="space-y-3">
          <h4 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">경력</h4>
          {member.careers.map((career, i) => (
            <p key={i} className="text-slate-300 text-xs leading-relaxed flex items-start gap-2">
              <span className="text-violet-400 mt-0.5">▸</span>
              {career}
            </p>
          ))}
          
          <h4 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mt-4 mb-2">주요 프로젝트</h4>
          {member.projects.map((project, i) => (
            <p key={i} className="text-slate-400 text-xs leading-relaxed flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              {project}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

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

      // Expertise cards staggered animation
      gsap.fromTo(
        '.expertise-card',
        { opacity: 0, x: -80, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
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

      {/* Our Expertise Section - Staircase Cards */}
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

          {/* Staircase Cards Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              {expertiseItems.map((item, index) => (
                <div 
                  key={item.number}
                  className="expertise-card"
                  style={{ 
                    marginLeft: `${index * 8}%`,
                    maxWidth: '85%'
                  }}
                >
                  <div className="group relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 flex items-center justify-center">
                      <span className={`font-display text-6xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20`}>
                        {item.number}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                        <span className="text-3xl">{item.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-700 font-medium mb-2">
                          {item.description}
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    {/* Hover Line */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} w-0 group-hover:w-full transition-all duration-500`} />
                  </div>
                </div>
              ))}
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
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-32 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-violet-500/50 group-hover:border-violet-400 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300 bg-slate-800/50">
                    <span className="font-display text-xl font-bold text-violet-400">{item.step}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="scale" className="text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Project</span>?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-10 text-lg">
              Let's discuss how we can bring your vision to life with AI-powered filmmaking.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-display font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
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
