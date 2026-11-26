import { useRef, useEffect, useState, type FC, type MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ PAGE 9 CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const PAGE9_CONFIG = {
  // 1. Move Page 9 UP (in px) - default 0:
  movePage9Up: 0,

  // 2. Background Image Fit & Zoom (bg9.png) - 100% RAW, NO BLACK SHADE:
  bgFit: 'cover' as 'contain' | 'cover',
  bgScale: 1.0,
  bgPosition: 'center' as 'center' | 'top' | 'bottom',
  bgOffsetY: 0, // fine-tune background up/down in px

  // 3. Title Configuration ("LOVE TO READ"):
  titleText: 'LOVE TO READ',
  titleAlign: 'left' as 'left' | 'center' | 'right', // Set to 'left' per user request
  titleTopPercent: 8, // Distance from top of screen (%)
  titleOffsetX: 0, // Fine-tune X (negative moves left, positive moves right) in px
  titleOffsetY: 0, // Fine-tune Y (negative moves up, positive moves down) in px
  showEyebrowPill: false, // Set to true if you want the "JOURNAL & STORIES" mini pill

  // 4. Cards Positioning & Layout (Moved down per request):
  cardsTopPercent: 29, // Distance from top of screen (%) - moved down from 24
  cardsOffsetY: 0, // Fine-tune cards container Y in px (e.g. +20 to move further down)
  cardsScale: 1.0, // Scale multiplier for all cards
  cardGap: 28, // Gap between cards in px (desktop)
  cardBlurPx: 2, // Frosted glass blur in px
  cardBgOpacity: 0.12, // Frosted glass surface opacity (0.05 - 0.25)
  cardBorderOpacity: 9.24, // Frosted border opacity (0.1 - 0.4)

  // 5. 3 Frosted Glass Cards Content:
  cards: [
    {
      id: 1,
      image: '/read-1.jpg',
      tag: 'DAILY ENERGY',
      readTime: '3 MIN READ',
      title: 'Healthy Living',
      description:
        'Discover the power of natural grains and energy boosting drinks that fuel your everyday life.',
      buttonText: 'Read More',
      fullStory: {
        subtitle: 'Unleashing Clean Plant Energy for Modern Lifestyles',
        paragraphs: [
          'In a fast-paced world dominated by synthetic stimulants and sugar crashes, returning to ancestral wellness offers an enduring vitality. Whole, raw grains and fresh botanical cold-presses provide slow-burning complex carbohydrates and enzymes that support cellular respiration.',
          'When paired with adaptogenic botanicals like Amla and Moringa, your body experiences steady focus, balanced hormonal responses, and rapid nutrient absorption throughout your day.',
        ],
      },
    },
    {
      id: 2,
      image: '/read-2.jpg',
      tag: 'SCIENCE & VITALITY',
      readTime: '4 MIN READ',
      title: 'Nutrition Guide',
      description:
        'Understand the benefits of wheat shots and wholesome blends crafted for strength and vitality.',
      buttonText: 'Read More',
      fullStory: {
        subtitle: 'The Micro-Nutrient Symphony Behind Cold-Pressed Shots',
        paragraphs: [
          'Raw sprouted grains and cold-pressed botanical shots preserve living chlorophyll, bioflavonoids, and delicate antioxidants that heat pasteurization routinely destroys. Chlorophyll molecules share a near-identical structure to human hemoglobin, encouraging optimal oxygen delivery to tissues.',
          'Consuming these dense micro-nutrients first thing in the morning gently alkalizes the gut microbiome, sparks sluggish digestion, and fortifies the immune barrier against daily oxidative stressors.',
        ],
      },
    },
    {
      id: 3,
      image: '/read-3.jpg',
      tag: 'COMMUNITY',
      readTime: '5 MIN READ',
      title: 'Wellness Stories',
      description:
        'Real experiences from people who transformed their daily routine with natural energy drinks.',
      buttonText: 'Read More',
      fullStory: {
        subtitle: 'From Afternoon Slumps to Natural Peak Performance',
        paragraphs: [
          '"Replacing my 3 PM iced espresso with a chilled buttermilk shot changed my entire workday stamina," notes Ananya, a software architect from Bangalore. "No jitters, no brain fog, just clean clarity."',
          'Over 14,000 community members have made Shake & Gulp traditional and wellness shots a non-negotiable morning ritual. Read their unfiltered reflections, recipes, and transformation logs.',
        ],
      },
    },
  ],
};

interface CardTiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovered: boolean;
}

export const Page9Section: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Interactive reading modal state
  const [activeStory, setActiveStory] = useState<(typeof PAGE9_CONFIG.cards)[0] | null>(null);

  // 3D Parallax & Glare tracking for cards
  const [cardTilts, setCardTilts] = useState<CardTiltState[]>([
    { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
    { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
    { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  ]);

  const {
    movePage9Up,
    bgFit,
    bgScale,
    bgPosition,
    bgOffsetY,
    titleText,
    titleAlign,
    titleTopPercent,
    titleOffsetX,
    titleOffsetY,
    showEyebrowPill,
    cardsTopPercent,
    cardsOffsetY,
    cardsScale,
    cardGap,
    cardBlurPx,
    cardBgOpacity,
    cardBorderOpacity,
    cards,
  } = PAGE9_CONFIG;

  // Background CSS styles
  const fitClass = bgFit === 'contain' ? 'object-contain' : 'object-cover';
  const positionClass =
    bgPosition === 'top'
      ? 'object-top'
      : bgPosition === 'bottom'
        ? 'object-bottom'
        : 'object-center';

  // 3D Mouse Parallax Move Handler
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardElementsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max +/- 10 deg)
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Specular glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCardTilts((prev) => {
      const updated = [...prev];
      updated[index] = {
        rotateX,
        rotateY,
        glareX,
        glareY,
        isHovered: true,
      };
      return updated;
    });
  };

  const handleMouseLeave = (index: number) => {
    setCardTilts((prev) => {
      const updated = [...prev];
      updated[index] = {
        rotateX: 0,
        rotateY: 0,
        glareX: 50,
        glareY: 50,
        isHovered: false,
      };
      return updated;
    });
  };

  // GSAP ScrollTrigger Entrance & Mind-blowing Text Reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Title Entrance Animation (Letter Stagger + Glow)
      if (titleContainerRef.current) {
        const titleLetters = titleContainerRef.current.querySelectorAll('.title-letter');
        const titlePill = titleContainerRef.current.querySelector('.title-pill');

        const tlTitle = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            refreshPriority: 0,
            invalidateOnRefresh: true,
          },
        });

        if (titlePill) {
          tlTitle.fromTo(
            titlePill,
            { opacity: 0, scale: 0.8, y: -20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
          );
        }

        if (titleLetters.length > 0) {
          tlTitle.fromTo(
            titleLetters,
            {
              opacity: 0,
              y: 40,
              rotateX: -60,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              stagger: 0.04,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.3'
          );
        }
      }

      // 2. 3D Cards Staggered Fly-In Entrance
      const validCards = cardElementsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        const tlCards = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
            refreshPriority: 0,
            invalidateOnRefresh: true,
          },
        });

        // Stagger fly-in with perspective rotation and scale
        tlCards.fromTo(
          validCards,
          {
            opacity: 0,
            y: 90,
            scale: 0.88,
            rotateX: 20,
            rotateY: (index) => (index === 0 ? -12 : index === 2 ? 12 : 0),
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            filter: 'blur(0px)',
            stagger: 0.18,
            duration: 1.1,
            ease: 'power3.out',
          }
        );

        // 3. Card Internal Elements Reveal (Titles, Descriptions, Buttons)
        validCards.forEach((card) => {
          if (!card) return;
          const cardTitle = card.querySelector('.card-reveal-title');
          const cardDesc = card.querySelector('.card-reveal-desc');
          const cardBtn = card.querySelector('.card-reveal-btn');
          const cardImg = card.querySelector('.card-reveal-img');

          if (cardImg) {
            tlCards.fromTo(
              cardImg,
              { scale: 1.15, opacity: 0.4 },
              { scale: 1.0, opacity: 1, duration: 0.9, ease: 'power2.out' },
              '-=0.7'
            );
          }

          if (cardTitle) {
            tlCards.fromTo(
              cardTitle,
              { y: 22, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
              '-=0.7'
            );
          }

          if (cardDesc) {
            tlCards.fromTo(
              cardDesc,
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
              '-=0.5'
            );
          }

          if (cardBtn) {
            tlCards.fromTo(
              cardBtn,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
              '-=0.4'
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Split title characters for individual animation
  const titleLetters = titleText.split('');

  // Title alignment classes
  const titleAlignClass =
    titleAlign === 'right'
      ? 'items-end text-right'
      : titleAlign === 'center'
        ? 'items-center text-center'
        : 'items-start text-left';

  return (
    <section
      id="page9"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen overflow-hidden flex flex-col justify-start items-center select-none bg-black"
      style={{
        marginTop: `-${movePage9Up}px`,
      }}
    >
      {/* ========================================================================= */}
      {/* 🌲 1. RAW BACKGROUND IMAGE (bg9.png - NO BLACK SHADE OVERLAYS)            */}
      {/* ========================================================================= */}
      <img
        src="/bg9.png"
        alt="Page 9 Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${fitClass} ${positionClass}`}
        style={{
          transform: `translateY(${bgOffsetY}px) scale(${bgScale})`,
          transformOrigin: bgPosition === 'top' ? 'top center' : 'center center',
        }}
      />

      {/* ========================================================================= */}
      {/* 📖 2. TOP TITLE: "LOVE TO READ" (Left Aligned per request)                */}
      {/* ========================================================================= */}
      <div
        ref={titleContainerRef}
        className={`absolute z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col pointer-events-auto ${titleAlignClass}`}
        style={{
          top: `${titleTopPercent}%`,
          left: '50%',
          transform: `translateX(-50%) translate(${titleOffsetX}px, ${titleOffsetY}px)`,
        }}
      >
        {/* Optional Eyebrow Pill */}
        {showEyebrowPill && (
          <div className="title-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-widest uppercase mb-2 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            <BookOpen size={13} className="text-lime-300" />
            <span>JOURNAL & STORIES</span>
          </div>
        )}

        {/* Big Bold Headline: "LOVE TO READ" */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] flex flex-wrap gap-x-2">
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className="title-letter inline-block"
              style={{
                display: char === ' ' ? 'inline' : 'inline-block',
                whiteSpace: 'pre',
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.25)',
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* 🧊 3. THREE FROSTED GLASS CARDS CONTAINER                                 */}
      {/* ========================================================================= */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 pointer-events-auto"
        style={{
          marginTop: `${cardsTopPercent}vh`,
          transform: `translateY(${cardsOffsetY}px) scale(${cardsScale})`,
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 items-stretch justify-center"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card, index) => {
            const tilt = cardTilts[index] || {
              rotateX: 0,
              rotateY: 0,
              glareX: 50,
              glareY: 50,
              isHovered: false,
            };

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardElementsRef.current[index] = el;
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300 ease-out select-none cursor-pointer"
                style={{
                  backdropFilter: `blur(${cardBlurPx}px)`,
                  WebkitBackdropFilter: `blur(${cardBlurPx}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${cardBgOpacity})`,
                  border: `1px solid rgba(255, 255, 255, ${cardBorderOpacity})`,
                  boxShadow: tilt.isHovered
                    ? '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 255, 255, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                    : '0 20px 45px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
                    tilt.isHovered ? 1.03 : 1
                  }, ${tilt.isHovered ? 1.03 : 1}, 1)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Dynamic Mouse Glare Specular Highlight */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: tilt.isHovered ? 0.35 : 0,
                    background: `radial-gradient(circle 220px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.6), transparent 70%)`,
                  }}
                />

                {/* Animated Gradient Edge Rim Shimmer on Hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/10 via-transparent to-lime-300/20" />

                {/* CARD UPPER: Image Frame */}
                <div>
                  <div className="card-reveal-img relative w-full aspect-[16/10] sm:aspect-[3/2] rounded-2xl overflow-hidden mb-5 bg-black/40 shadow-inner">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Image Frosted Tag (Read Time) */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                      <Sparkles size={11} className="text-lime-400" />
                      <span>{card.readTime}</span>
                    </div>

                    {/* Bottom subtle shadow inside image */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>

                  {/* CARD TITLE: Centered */}
                  <h3 className="card-reveal-title text-xl sm:text-2xl font-bold text-white text-center tracking-tight mb-2 group-hover:text-lime-200 transition-colors duration-300 drop-shadow-md">
                    {card.title}
                  </h3>

                  {/* CARD DESCRIPTION: Centered */}
                  <p className="card-reveal-desc text-white/80 text-xs sm:text-sm text-center leading-relaxed font-normal mb-6 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* CARD BOTTOM: Centered "Read More" Button */}
                <div className="card-reveal-btn flex justify-center items-center pt-2">
                  <button
                    onClick={() => setActiveStory(card)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-white border border-white/35 bg-white/15 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] active:scale-95 group/btn"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📖 4. FULL STORY READING MODAL (Frosted Glass Overlay)                     */}
      {/* ========================================================================= */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-[#0b170f]/90 border border-white/30 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white overflow-hidden max-h-[90vh] flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-lime-400/20 border border-lime-400/30 text-lime-300 text-xs font-bold tracking-wider uppercase">
                {activeStory.tag}
              </span>
              <span className="text-white/60 text-xs">{activeStory.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {activeStory.title}
            </h3>
            <h4 className="text-sm font-semibold text-lime-300/90 mb-4">
              {activeStory.fullStory.subtitle}
            </h4>

            {/* Modal Image */}
            <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-5 bg-black/50">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Paragraphs */}
            <div className="space-y-3 overflow-y-auto pr-2 text-sm text-white/85 leading-relaxed">
              {activeStory.fullStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/15 flex justify-end">
              <button
                onClick={() => setActiveStory(null)}
                className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase hover:bg-lime-300 transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page9Section;
