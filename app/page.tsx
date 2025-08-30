"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Next.js App Router용 랜딩 페이지 + 무빙 이펙트 강화 버전
// 파일 경로 제안: app/page.tsx
// 필요 라이브러리: framer-motion (npm i framer-motion)
// Tailwind 사용 전제

export default function Page() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  const heroImage = "\standing.jpg";
  const bookImage = "/paradigm-all.png";
  const bookTitle = "이엠스쿨만의 커리큘럼 [Paradigm]";
  const bookDesc = " 교재 보기";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <ScrollProgress progress={progress} />
      <Header />
      <Hero
        ref={heroRef}
        heroImage={heroImage}
        bookImage={bookImage}
        bookTitle={bookTitle}
        bookDesc={bookDesc}
        yParallax={yParallax}
        scaleParallax={scaleParallax}
      />
      <ValueProps />
      <SystemSection />
      <Tracks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
    />
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500" />
          <span className="text-lg font-semibold tracking-tight"> 이엠스쿨 수학 학원</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a
            href="#system"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("system")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="opacity-80 transition hover:opacity-100"
          >
            무엇이 다른가?
          </a>
          <a
            href="#tracks"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="opacity-80 transition hover:opacity-100"
          >
            어떤 커리큘럼인가?
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="opacity-80 transition hover:opacity-100"
          >
            FAQ
          </a>
        </nav>
        <Magnetic>
          <a
            href="#apply"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-blue-900/30 transition hover:brightness-110"
          >
            무료 상담 하기!
          </a>
        </Magnetic>
      </div>
    </header>
  );
}

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.animate({ transform: `translate(${x * 0.08}px, ${y * 0.08}px)` }, { duration: 150, fill: "forwards" });
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.animate({ transform: `translate(0,0)` }, { duration: 300, fill: "forwards" });
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
};

const GlowBlob = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 1.2 }}
    className={`pointer-events-none absolute blur-3xl ${className}`}
  />
);

const Floating = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 8, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: false, margin: "-80px" }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: false, margin: "-80px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);




const Hero = React.forwardRef<HTMLDivElement, {
  heroImage: string;
  bookImage: string;
  bookTitle?: string;
  bookDesc?: string;
  yParallax: MotionValue<number>;
  scaleParallax: MotionValue<number>;
}>(({ heroImage, bookImage, bookTitle, bookDesc }, ref) => {
  return (
    <section ref={ref} className="relative mx-auto mt-6 max-w-6xl px-4 md:mt-12">
      {/* 배경 글로우 */}
      <GlowBlob className="-top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-blue-600/30" />
      <GlowBlob className="top-40 right-0 h-72 w-72 bg-violet-600/20" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mt-10">
        <div className="md:col-span-2">
        <Floating>
          <h1 className="text-3xl leading-tight md:text-5xl">
            <p><span className="text-2xl font-bold text-blue-400">왜</span> 서울 학생들은 성적이 좋을까?</p>
          </h1>
            <div className="mt-4 max-w-xl text-base text-slate-300 md:text-lg mt-10 space-y-2">
              <p>서울 학생들이 앞서는 건, 특별히 머리가 좋아서가 아닙니다.</p>
              <p>평범한 아이도 성적을 올릴 수 있는 <strong>철저한 관리 구조</strong>가 있었을 뿐입니다.</p>
              <p>이엠스쿨에서 그 방법을 경험해보세요.</p>
          </div>

        

          <div className="mt-8 flex w-full max-w-sm gap-3 mt-10">
            <div className="flex-1">
              <Magnetic>
                <a
                  href="#apply"
                  className="inline-flex h-12 w-40 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:brightness-110"
                >
                  지금 상담 신청
                </a>
              </Magnetic>
            </div>
            <div className="flex-1">
              <Magnetic>
              <a
                href="#system"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("system");
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                  className="inline-flex h-12 w-40 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:brightness-110"
              >
                학습 전략 보기
              </a>
              </Magnetic>
            </div>
          </div>
          {/* 교재 이미지: 버튼 아래, 좌측에서 슬라이드 인 */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 w-full max-w-sm"
          >
            <Magnetic>
            <a
              href="#tracks"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm cursor-pointer transition hover:brightness-110"
            >
              <img
                src={bookImage}
                alt="Paradigm 교재"
                className="aspect-[4/3] w-full h-auto object-cover"
              />
              <div className="border-t border-white/10 p-3">
                <p className="text-sm font-semibold">{bookTitle ?? "교재 정보"}</p>
                <p className="mt-1 text-xs text-slate-300">{bookDesc ?? "설명 내용을 여기에 입력하세요."}</p>
              </div>
            </a>
            </Magnetic>
          </motion.div>
        </Floating>
        </div>

        <div className="relative">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[3/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl"
          >
            <motion.img
              src={heroImage}
              alt="프로필"
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.8 }}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-slate-950/70 p-3 text-sm backdrop-blur">
              <div className="flex flex-col">
                <p className="font-semibold">연세대학교(서울) 기계공학과 재학</p>
                <p className="text-slate-300">고등 수학 내신·수능 전문 관리</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";



function ValueProps() {
  const items = [
    { 
      title: "이엠스쿨만의 커리큘럼 [Paradigm]", 
      desc: "'개념–해부–숙달' 3단계 자체 제작 교재"
    },
    { 
      title: "체계적 학습 과정", 
      desc: "진도–테스트–피드백–과제로\n완결되는 모듈형 수업" 
    },
    { 
      title: "메타인지 관리", 
      desc: "혼자 두지 않고, 학생이 스스로 약점을\n인식하고 보완하도록 돕는 지도" 
    },
    { 
      title: "테스트 결과 리포트", 
      desc: "매주 테스트와 오답 분석 후,\n보완 계획을 학부모님께 공유" 
    },
  ];

  return (
    <section id="system" className="mx-auto max-w-6xl px-4">
      <div className="text-center mb-12 mt-150">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            이엠스쿨은 특별합니다
          </h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <div className="mt-3 mt-10 text-center text-lg md:text-xl text-slate-300 leading-relaxed">
            <p>특별한 아이들만 성적이 오르는 게 아닙니다.</p>
            <p>관리받는 아이들은 달라집니다.</p>
          </div>
        </FadeUp>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {items.map((it, idx) => (
          <FadeUp delay={idx * 0.05} key={it.title}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
              <p className="text-lg font-semibold text-center">{it.title}</p>
              <p className="mt-1 text-sm text-slate-300 text-center mt-5 whitespace-pre-line">{it.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section  className="mx-auto mt-20 max-w-6xl px-4 mt-150">
        <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">성적이 오르는 4단계 관리 루틴</h2>
        <p className="mt-3 text-slate-300  text-lg md:text-xl mt-20 text-center">
          평범한 아이도 성적을 올릴 수 있는 이유는,
          <br />
          모든 학생이 ‘철저한 관리 구조’를 따라가기 때문입니다.
          <br />
          이엠스쿨에서는 다음과 같은 루틴으로 매주 성장을 만듭니다.
        </p>
        </FadeUp>
      <div className="grid grid-cols-1 items-start gap-6 md:[grid-template-columns:1fr_56px_1fr] mt-20">
        <div>
          <FadeUp>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <p className="text-l text-slate-400">이엠스쿨의 4단계 관리 루틴</p>
              <p className="mt-3 text-lg md:text-xl leading-relaxed text-center">반복되는 관리 흐름</p>
              <div className="mt-6 max-w-xl">
                <ol className="space-y-3">
                  {[
                    "진도 관리 → 매주 교재 진도 체크 & 개념 노트 작성",
                    "테스트 → 단원·월간 성취도 확인",
                    "피드백 → 틀린 문제 즉시 오답 관리, 보충 자료 제공",
                    "과제 → 개인별 과제표로 반복 학습 완성",
                  ].map((txt, i, arr) => (
                    <React.Fragment key={txt}>
                      <FadeUp delay={0.05 * i}>
                        <li className="list-none">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm flex items-center justify-center text-center">
                            {txt}
                          </div>
                        </li>
                      </FadeUp>
                      {i < arr.length - 1 && (
                        <div className="flex justify-center">
                          <svg
                            className="h-4 w-4 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </ol>
              </div>
            </div>
          </FadeUp>
        </div>
        <div className="hidden md:flex h-full items-center justify-center self-center">
          <svg className="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <p className="text-l text-slate-400">대표 예시 </p>
              <p className="mt-3 text-lg md:text-xl leading-relaxed text-center">고2 수학Ⅰ 등비수열 단원 예시</p>
              <div className="mt-6 max-w-xl">
                <ol className="space-y-3">
                  {[
                    "수1 등비수열 단원 학습 + 귀납적 정의 개념 노트 작성",
                    "8문항 미니테스트 → 귀납적 정의 문제 취약점 발견",
                    "오답 노트 작성 + 귀납적 정의 보충문제 5문항 제공",
                    "개념복습 20분 + 오답 2회 + 심화 5문제로 100% 목표",
                  ].map((txt, i, arr) => (
                    <React.Fragment key={txt}>
                      <FadeUp delay={0.05 * i}>
                        <li className="list-none">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm flex items-center justify-center text-center">
                            {txt}
                </div>
                        </li>
                      </FadeUp>
                      {i < arr.length - 1 && (
                        <div className="flex justify-center">
                          <svg
                            className="h-4 w-4 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
              </div>
                      )}
                    </React.Fragment>
                  ))}
                </ol>
              </div>
          
            </div>
          </FadeUp>
          </div>
        
      </div>
      <FadeUp>
        <p className="mt-4 text-lg text-slate-300  text-lg md:text-xl text-center mt-20">
          이렇게 매주 4단계 루틴이 반복되며, 평범한 학생도 안정적으로 성적을 끌어올립니다.
        </p>
      </FadeUp>
    </section>
  );
}

function Tracks() {
  const series = [
    {
      title: "Axiom (개념의 본질)",
      desc:
        "수학적 지식의 출발점이 되는 핵심 정의와 원리를 명확하게 제시합니다. 본질에 집중해 흔들리지 않는 기반을 다집니다.",
      img: "/axiom.png",
      alt: "Axiom 교재",
    },
    {
      title: "Dissection (문제의 해부)",
      desc:
        "문제 속 의도와 논리를 해부하듯 분석합니다. 암기를 넘어 구조를 꿰뚫는 통찰로 어떤 유형도 논리적으로 해결합니다.",
      img: "/dissection.png",
      alt: "Dissection 교재",
    },
    {
      title: "Iteration (완전한 숙달)",
      desc:
        "다양한 문제에 개념과 분석을 반복 적용해 지식을 체화합니다. 반복훈련을 통해 흔들리지 않는 실력으로 연결합니다.",
      img: "/iteration.png",
      alt: "Iteration 교재",
    },
  ];
  return (
    <section id="tracks" className="mx-auto mt-20 max-w-6xl px-4 mt-150 scroll-mt-24 md:scroll-mt-32">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">패러다임(Paradigm)</h2>
        <p className="mt-3 text-slate-300 text-center leading-relaxed mt-20 text-lg md:text-xl">
          이엠스쿨의 새로운 수학 커리큘럼 &apos;Paradigm&apos;은 기존의 학습 방식을 뛰어넘는 사고의 전환을 제시합니다.
          <br />학생의 수학 실력과 수학을 대하는 태도가 근본적으로 변화될 것입니다.
        </p>
        <p className="mt-3 text-slate-300 text-center leading-relaxed mt-10 text-lg md:text-xl">
          개념의 본질, 문제의 구조 해부, 완전한 숙달에 이르는 3단계 로드맵으로 수학적 사고를 완성합니다.
        </p>
      </FadeUp>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 mt-5">
        {series.map((s, i) => (
          <FadeUp delay={i * 0.05} key={s.title}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.15 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500"
              />
              <motion.img
                src={s.img}
                alt={s.alt}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="relative mb-4 aspect-[4/3] w-full h-auto rounded-lg border border-white/10 object-contain object-center bg-slate-900/20"
              />
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="relative text-xl font-semibold"
              >
                {s.title}
              </motion.p>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative mt-2 text-lg text-slate-300 leading-relaxed"
              >
                {s.desc}
              </motion.p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { 
      q: "Q1. 다른 학원이나 과외와 무엇이 다른가요? 특별한 점이 있나요?", 
      a: "이엠스쿨의 &apos;Paradigm&apos; 커리큘럼은 단순히 지식을 전달하는 강의가 아닌, 학생의 수학 학습 전체를 설계하고 관리하는 시스템입니다. 문제 풀이 양을 늘리는 방식에서 벗어나 Axiom[개념의 본질] - Dissection[문제의 해부] - Iteration[완전한 숙달]으로 이어지는 3단계 로드맵을 통해 수학적 사고력 자체를 완성합니다. 학생의 성장을 위한 명확한 목표 설정, 체계적인 루틴, 그리고 정기적인 리포트로 학습의 성공 구조를 만들어 나가는 것이 가장 특별한 점입니다."
    },
    { 
      q: "Q2. 중위권 학생인데, 우리 아이도 이 커리큘럼으로 효과를 볼 수 있을까요?", 
      a: "네, 이 &apos;Paradigm&apos; 커리큘럼은 기존의 반복 학습에 지쳐있거나, &apos;왜&apos;라는 질문에 답을 찾지 못해 어려움을 겪는 학생들을 위해 설계되었습니다. &apos;Dissection&apos; 단계에서 문제의 숨은 의도를 파악하고, &apos;Iteration&apos; 단계에서 배운 방식을 체화하는 훈련을 통해, 단편적인 지식이 아닌 스스로 생각하는 힘을 기르게 됩니다. 이 과정은 특히 중위권 학생들의 수학적 잠재력을 끌어올리는 데 매우 효과적입니다."
    },
    { 
      q: "Q3. 교재는 어떻게 사용하나요?", 
      a: "이엠스쿨의 핵심 교재인 &apos;Paradigm&apos; 시리즈(Axiom, Dissection, Iteration)를 기반으로 학생의 수준과 목표에 맞춰 공통 교재 및 개별 맞춤 교재를 혼합하여 사용합니다. 특히, 학생 개인의 취약점을 보강하기 위한 오답 노트와 취약 단원 보강을 가장 중요하게 관리합니다."
    },
  ];
  return (
    <section id="faq" className="mx-auto mt-20 max-w-6xl px-4 mt-100">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">자주 묻는 질문</h2>
      </FadeUp>
      <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 mt-20">
        {faqs.map((f, i) => (
          <FadeUp key={i} delay={i * 0.05}>
            <details className="group p-5 marker:content-none transition-colors hover:bg-white/5 open:bg-white/[0.06] rounded-xl">
              <summary className="cursor-pointer select-none text-lg font-semibold flex items-center justify-between gap-3">
                <span>{f.q}</span>
                <svg
                  className="h-5 w-5 text-slate-300 transition-transform group-open:-rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="mt-3 overflow-hidden text-base leading-relaxed text-slate-300"
              >
                {f.a}
              </motion.p>
            </details>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="apply" className="mx-auto mt-20 max-w-6xl px-4 mt-20">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <FadeUp>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-sm">
            <p className="text-lg font-semibold">상담 신청</p>
            <p className="mt-1 text-sm text-slate-300">전화 또는 카카오톡으로 문의 가능하다.</p>
            <div className="mt-4 space-y-2 text-sm">
              <p>전화: <a href="tel:010-6694-0888" className="underline">010-6694-0888</a></p>
              <p>카카오톡 채널: <a href="https://open.kakao.com/o/scfbu9Oh" className="underline">바로가기</a></p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <p className="text-lg font-semibold text-slate-200">QR 코드</p>
            <div className="mt-4 flex items-center justify-center">
              <motion.img
                alt="QR"
                className="h-40 w-40 rounded-lg border border-white/10"
                src="/em-qr.jpg"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">스마트폰으로 스캔하여 문의 가능.</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10 text-xs text-slate-400">
      <div className="h-px w-full bg-white/10" />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-slate-200">이엠스쿨 수학 학원</p>
          <p className="mt-2 leading-relaxed">철저한 학습관리로 지역 학생들의 인서울을 돕습니다. &apos;Paradigm&apos; 커리큘럼으로 개념·해부·숙달의 3단계 학습을 제공합니다.</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-200">빠른 이동</p>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href="#system"
                onClick={(e) => { e.preventDefault(); document.getElementById("system")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="hover:underline"
              >학습 전략</a>
            </li>
            <li>
              <a
                href="#tracks"
                onClick={(e) => { e.preventDefault(); document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="hover:underline"
              >커리큘럼</a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="hover:underline"
              >FAQ</a>
            </li>
            <li>
              <a
                href="#apply"
                onClick={(e) => { e.preventDefault(); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="hover:underline"
              >상담 신청</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-200">연락처</p>
          <ul className="mt-2 space-y-1">
            <li>전화: <a href="tel:010-6694-0888" className="underline">010-6694-0888</a></li>
            <li>카카오톡: <a href="https://open.kakao.com/o/scfbu9Oh" className="underline" target="_blank" rel="noreferrer">오픈채팅 바로가기</a></li>
            <li>QR: 상단 &apos;상담 신청&apos; 섹션의 QR 이미지를 스캔하세요.</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-4 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} EM School. All rights reserved.</p>
        <p>사업자 정보는 요청 시 제공됩니다.</p>
      </div>
    </footer>
  );
}
