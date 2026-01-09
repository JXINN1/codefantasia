import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
    role: 'CEO', 
    name: 'KWANWOO PARK',
    initial: 'P',
    color: 'from-violet-500 to-fuchsia-500',
    careers: [
      '26년 경력의 글로벌 3D·VFX·대형 미디어 콘텐츠 전문가',
      'WYSIWYG Studios 대표이사 (2016–2024)',
      'Showscan Entertainment (LA) 부사장 역임',
      'DGFX 대표이사 (1996-2000)',
    ],
    projects: [
      'Odysseo by Cavalia 3D 촬영',
      'CES 2014 24K 콘텐츠 – LG Display',
      '아시안 게임·세리에A·IAAF 3D 중계 <대호>, <검사외전> 등 다수 영화 VFX 총괄',
    ]
  },
  { 
    role: 'COO', 
    name: 'TAEGYU SEO',
    initial: 'S',
    color: 'from-cyan-500 to-blue-500',
    careers: [
      'AI 기반 콘텐츠·미디어아트·하이브리드 제작 총괄 전문가',
      'WYSIWYG Studios Creative Director (2018-2024)',
      '<로보카 폴리> TV 미술감독, 애니메이션 제작 및 상품 기획 총괄 (2009-2015)',
      '<아치와 씨팍> Feature Film - 기획/컨셉 디자인 (2001-2006)',
    ],
    projects: [
      '2025 서울 국제 AI 영화제 금상 부천국제영화제 AI 콘퍼런스 초청 강연',
      '영화 〈부산행〉, 〈염력〉 컨셉 디자인 참여',
      '<AR 돈의문>, <기아 360> 등 미디어아트·AR·AI 콘텐츠 기획 및 제작 총괄',
    ]
  },
  { 
    role: 'CTO', 
    name: 'KYUNGTAE CHUNG',
    initial: 'C',
    color: 'from-emerald-500 to-teal-500',
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
    role: 'Director', 
    name: 'JANE KIM',
    initial: 'K',
    color: 'from-rose-500 to-pink-500',
    careers: [
      '콘텐츠·전시·미디어아트 기획 전문 프로듀서',
      'LAMPERS 기획팀 팀장 (2024–2025)',
      'WYSIWYG Studios 프로듀서 (2019–2024)',
      '비유비유 기획팀 책임(2017-2018)',
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
    icon: Layers,
    title: 'AI Content Pipeline',
    subtitle: 'End-to-End Production',
    description: '자체 AI·VFX 파이프라인 기반의 효율적인 스토리텔링 중심 비주얼 콘텐츠 제작',
  },
  {
    icon: Sparkles,
    title: 'Original IP',
    subtitle: 'Character & Story Development',
    description: '스토리·캐릭터 중심의 오리지널 IP 기획 및 개발 역량',
  },
  {
    icon: Zap,
    title: 'AI Technology R&D',
    subtitle: 'Research & Development',
    description: 'AI 콘텐츠 기술 연구·개발 및 실전 적용',
  },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`team-card relative transition-all duration-700 ease-out ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative overflow-hidden rounded-3xl transition-all duration-700 ease-out ${
          isHovered 
            ? 'bg-white shadow-2xl scale-[1.02]' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
        style={{
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {/* Gradient Border Effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 transition-opacity duration-700 ${
            isHovered ? 'opacity-20' : ''
          }`}
        />
        
        {/* Content Container */}
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            {/* Avatar */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg`}>
              <span className="text-2xl font-bold text-white font-display">
                {member.initial}
              </span>
            </div>
            
            {/* Role Badge */}
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r ${member.color} text-white`}>
              {member.role}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            {member.name}
          </h3>

          {/* Minimal Description */}
          <p className="text-slate-600 text-sm mb-6 line-clamp-2">
            {member.careers[0]}
          </p>

          {/* Expandable Details */}
          <div 
            className={`overflow-hidden transition-all duration-700 ease-out ${
              isHovered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-6 border-t border-slate-200 space-y-6">
              {/* Career */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Career</h4>
                <ul className="space-y-2">
                  {member.careers.slice(1).map((career, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${member.color} mt-2 flex-shrink-0`} />
                      {career}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Projects */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Projects</h4>
                <ul className="space-y-2">
                  {member.projects.map((project, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* View More Indicator */}
          <div className={`flex items-center gap-2 mt-4 transition-all duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Hover for more</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom cursor follower
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo(
        '.hero-line',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Vision parallax
      gsap.fromTo(
        '.vision-word',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Expertise cards
      gsap.fromTo(
        '.expertise-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: 'top 75%',
          },
        }
      );

      // Team cards
      gsap.fromTo(
        '.team-card',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 75%',
          },
        }
      );
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white overflow-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-64 h-64 pointer-events-none z-0 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Header />

      {/* Hero Section - Cinematic Typography */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative">
        {/* Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Label */}
            <div className="hero-line overflow-hidden mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-sm text-slate-600 tracking-widest">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                ABOUT US
              </span>
            </div>

            {/* Main Title */}
            <div className="overflow-hidden mb-4">
              <h1 className="hero-line font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-slate-900">
                CREATIVITY
              </h1>
            </div>
            <div className="overflow-hidden mb-4">
              <h1 className="hero-line font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                MEETS AI
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-line mt-12">
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                스토리텔링 중심의 AI 프로덕션으로<br className="hidden sm:block" />
                콘텐츠 산업의 새로운 지평을 열어갑니다
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-slate-500 tracking-widest">SCROLL</span>
            <div className="w-px h-16 bg-gradient-to-b from-violet-500 to-transparent" />
          </div>
        </div>
      </section>

      {/* Vision Section - Minimalist Typography */}
      <section ref={visionRef} className="py-32 md:py-48 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Label */}
            <div className="mb-16">
              <span className="text-xs text-slate-500 tracking-[0.3em] font-medium">01 — VISION</span>
            </div>

            {/* Vision Text - Large Typography */}
            <div className="space-y-4">
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-light text-slate-700 leading-relaxed">
                스토리텔링 중심의
              </p>
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed text-slate-900">
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  크리에이티브 AI 프로덕션
                </span>
                을 통해
              </p>
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-light text-slate-700 leading-relaxed">
                아직 정립되지 않은 AI 콘텐츠 파이프라인의
              </p>
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed text-slate-900">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  새로운 경제
                </span>
                를 구축하고,
              </p>
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-light text-slate-700 leading-relaxed">
                AI 콘텐츠 기술 기반의
              </p>
              <p className="vision-word text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed text-slate-900">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  산업 혁신
                </span>
                을 선도합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Horizontal Cards */}
      <section ref={expertiseRef} className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Label */}
          <div className="mb-16">
            <span className="text-xs text-slate-500 tracking-[0.3em] font-medium">02 — EXPERTISE</span>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {expertiseItems.map((item, index) => (
              <div 
                key={item.title}
                className="expertise-item group"
              >
                <div className="h-full p-8 md:p-10 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-500">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-6 h-6 text-violet-600" />
                  </div>

                  {/* Subtitle */}
                  <span className="text-xs text-slate-500 tracking-wider uppercase block mb-2">
                    {item.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-32 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <span className="text-xs text-slate-500 tracking-[0.3em] font-medium block mb-4">03 — TEAM</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Leadership
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              30년 이상의 VFX, 미디어, 테크놀로지 분야 경험을 바탕으로 
              크리에이티브와 기술의 경계를 확장하는 팀입니다.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark themed like other pages */}
      <section className="py-32 relative bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
              Ready to Create<br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              Let's discuss how we can bring your vision to life with AI-powered filmmaking.
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
