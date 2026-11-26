import { useState, useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { getUiScale, useViewportSize } from '../utils/responsiveLayout';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ PAGE 3 BOTTLE SHOWCASE CONFIGURATION
// You can adjust bottle vertical height, scale, and positioning here:
// =========================================================================
export const PAGE3_CONFIG = {
  bottleBottomPercent: 12.0,   // 👈 Vertical height of bottles (increase to move UP, decrease to move DOWN)
  bottleScale: 0.8,            // 👈 Bottle scale multiplier (e.g. 1.05 for 5% larger)
  bottleWidth: 'clamp(360px, 48vw, 760px)', // 👈 Responsive width of the 3-bottle set
  foregroundBottomOffset: 0,   // 👈 Foreground mossy log vertical offset in px
  orderButtonText: 'GULP THE COOL', // 👈 Change the green button text here!
};

// =========================================================================
// 🍾 BOTTLE SETS DATA
// 4 showcase sets using bottle3.1.png through bottle3.4.png and foreground3.png.
// Optical scales normalize minor PNG padding differences so bottles stay the exact same size.
// =========================================================================
export interface BottleSet {
  id: string;
  name: string;
  titleLine1: string;
  titleLine2: string;
  badge: string;
  subtitle: string;
  bottleImage: string;
  foregroundImage: string;
  description: string;
  visualScale: number;
  verticalAdjustPercent: number;
}

export const BOTTLE_SETS: BottleSet[] = [
  {
    id: 'set-1',
    name: 'SHAKE THE SPICE GULP THE COOL',
    titleLine1: 'SHAKE THE SPICE',
    titleLine2: 'GULP THE COOL',
    badge: 'COLLECTION 01',
    subtitle: 'Buttermilk • Multigrain • Mint Buttermilk',
    bottleImage: '/bottle3.1.png',
    foregroundImage: '/foreground3.png',
    description: 'Slow-churned coastal buttermilk infused with roasted mountain cumin, wild herbs, and Himalayan rock salt.',
    visualScale: 1.0,
    verticalAdjustPercent: 0,
  },
  {
    id: 'set-2',
    name: 'SHAKE THE POWER GULP THE BOOST',
    titleLine1: 'SHAKE THE POWER',
    titleLine2: 'GULP THE BOOST',
    badge: 'COLLECTION 02',
    subtitle: 'Ginger Shot • Turmeric Shot • Barley Shot',
    bottleImage: '/bottle3.2.png',
    foregroundImage: '/foreground3.png',
    description: 'Cold-pressed warming botanicals blending raw ginger, golden turmeric, and wholesome roasted barley.',
    visualScale: 0.91,
    verticalAdjustPercent: -3.2,
  },
  {
    id: 'set-3',
    name: 'SHAKE THE ROOTS GULP THE RITUAL',
    titleLine1: 'SHAKE THE ROOTS',
    titleLine2: 'GULP THE RITUAL',
    badge: 'COLLECTION 03',
    subtitle: 'Healthy Drink • Amla Shot • Moringa',
    bottleImage: '/bottle3.3.png',
    foregroundImage: '/foreground3.png',
    description: 'Ancient Ayurvedic restorative blends engineered to stimulate natural digestion, clear skin radiance, and cellular energy.',
    visualScale: 0.953,
    verticalAdjustPercent: -3.0,
  },
  {
    id: 'set-4',
    name: 'SHAKE THE GOODNESS GULP THE NOURISHMENT',
    titleLine1: 'SHAKE THE GOODNESS',
    titleLine2: 'GULP THE NOURISHMENT',
    badge: 'COLLECTION 04',
    subtitle: 'Moringa • Ragi • Sabja',
    bottleImage: '/bottle3.4.png',
    foregroundImage: '/foreground3.png',
    description: 'Nutrient-dense traditional grains and green superfoods paired with cooling basil seeds for daily vitality.',
    visualScale: 1.01,
    verticalAdjustPercent: 0,
  },
];

interface BottleShowcaseSectionProps {
  onAddToCart?: () => void;
}

export const BottleShowcaseSection: FC<BottleShowcaseSectionProps> = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Position & Alignment directly from PAGE3_CONFIG (adapts gracefully only on mobile or large screens)
  const { vw, vh } = useViewportSize();
  const uiScale = getUiScale(vw, vh);
  const bottleBottom = PAGE3_CONFIG.bottleBottomPercent;
  const bottleScale = PAGE3_CONFIG.bottleScale;
  const responsiveBottleWidth = uiScale.isMobile
    ? 'clamp(260px, 78vw, 380px)'
    : uiScale.isLargeScreen
      ? 'clamp(360px, 48vw, 1280px)'
      : PAGE3_CONFIG.bottleWidth;

  // Persistent GPU-decoded layer refs (never swapped/unmounted, preventing post-transition flash or resize jumps)
  const sectionRef = useRef<HTMLElement | null>(null);
  const bottleLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const woodLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const activeIndexRef = useRef(0);
  const activeWoodSlotRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const totalSets = BOTTLE_SETS.length;
  const currentSet = BOTTLE_SETS[displayIndex];

  // Animate 2-line white headline: Top line enters from LEFT, Bottom line enters from RIGHT
  const playHeadlineIntro = () => {
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    if (!topLine || !bottomLine) return;

    gsap.fromTo(
      topLine,
      { x: -110, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out', overwrite: 'auto' }
    );
    gsap.fromTo(
      bottomLine,
      { x: 110, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, delay: 0.06, ease: 'power3.out', overwrite: 'auto' }
    );
  };

  // Initialize persistent bottle & wood slots on mount, pre-decode PNGs, and bind ScrollTrigger reveal
  useEffect(() => {
    BOTTLE_SETS.forEach((set) => {
      const img = new Image();
      img.src = set.bottleImage;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    });

    bottleLayerRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === 0) {
        gsap.set(el, { xPercent: 0, autoAlpha: 1, zIndex: 21, force3D: true });
      } else {
        gsap.set(el, { xPercent: 100, autoAlpha: 0, zIndex: 20, force3D: true });
      }
    });

    woodLayerRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === 0) {
        gsap.set(el, { xPercent: 0, autoAlpha: 1, zIndex: 31, force3D: true });
      } else {
        gsap.set(el, { xPercent: -100, autoAlpha: 0, zIndex: 30, force3D: true });
      }
    });

    const section = sectionRef.current;
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;
    let trigger: ScrollTrigger | null = null;

    if (section && topLine && bottomLine) {
      gsap.set(topLine, { x: -110, opacity: 0, force3D: true });
      gsap.set(bottomLine, { x: 110, opacity: 0, force3D: true });

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => playHeadlineIntro(),
        onEnterBack: () => playHeadlineIntro(),
        refreshPriority: 6,
      });

      if (trigger.isActive) {
        playHeadlineIntro();
      }
    }

    return () => {
      trigger?.kill();
      activeTimelineRef.current?.kill();
    };
  }, []);

  // =========================================================================
  // 🚀 EDGE-TO-EDGE BOTTLE & WOOD END-TO-END SWITCH ANIMATION
  // Keeps every image permanently decoded on its own layer so when the tween ends
  // at xPercent: 0, nothing remounts, swaps src, clears props, or flashes!
  // =========================================================================
  const animateToSlide = (targetIndex: number, direction: 'next' | 'prev') => {
    const prevIndex = activeIndexRef.current;
    if (isAnimatingRef.current || targetIndex === prevIndex) return;

    const outBottle = bottleLayerRefs.current[prevIndex];
    const inBottle = bottleLayerRefs.current[targetIndex];
    const prevWoodSlot = activeWoodSlotRef.current;
    const nextWoodSlot = prevWoodSlot === 0 ? 1 : 0;
    const outWood = woodLayerRefs.current[prevWoodSlot];
    const inWood = woodLayerRefs.current[nextWoodSlot];
    const topLine = topLineRef.current;
    const bottomLine = bottomLineRef.current;

    if (!outBottle || !inBottle) return;

    isAnimatingRef.current = true;
    setIsAnimating(true);
    soundFx.playWhoosh();

    // Bottle: next -> exits left (-100%), enters right (+100%)
    //         prev -> exits right (+100%), enters left (-100%)
    const exitBottleX = direction === 'next' ? -100 : 100;
    const enterBottleX = direction === 'next' ? 100 : -100;

    // Wood: moves end-to-end edge-to-edge in opposite direction
    const exitWoodX = direction === 'next' ? 100 : -100;
    const enterWoodX = direction === 'next' ? -100 : 100;

    gsap.set(outBottle, { zIndex: 21, autoAlpha: 1, force3D: true });
    gsap.set(inBottle, { xPercent: enterBottleX, zIndex: 22, autoAlpha: 1, force3D: true });

    if (outWood) {
      gsap.set(outWood, { zIndex: 31, autoAlpha: 1, force3D: true });
    }
    if (inWood) {
      gsap.set(inWood, { xPercent: enterWoodX, zIndex: 32, autoAlpha: 1, force3D: true });
    }

    activeTimelineRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // Hide only the off-screen outgoing layers; incoming layer stays put at xPercent: 0!
        gsap.set(outBottle, { autoAlpha: 0, zIndex: 20 });
        gsap.set(inBottle, { zIndex: 21 });
        if (outWood) gsap.set(outWood, { autoAlpha: 0, zIndex: 30 });
        if (inWood) gsap.set(inWood, { zIndex: 31 });

        activeIndexRef.current = targetIndex;
        activeWoodSlotRef.current = nextWoodSlot;
        isAnimatingRef.current = false;
        setIsAnimating(false);
      },
    });
    activeTimelineRef.current = tl;

    // 1. Fade old 2-line white text quickly before switching
    if (topLine && bottomLine) {
      tl.to(
        [topLine, bottomLine],
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        0
      );
    }

    // Update 2-line white text and static bottle names at midpoint
    tl.call(() => setDisplayIndex(targetIndex), undefined, 0.24);

    // 2. Outgoing bottle glides edge-to-edge
    tl.to(
      outBottle,
      {
        xPercent: exitBottleX,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      0
    );

    // 3. Incoming bottle enters edge-to-edge to center
    tl.to(
      inBottle,
      {
        xPercent: 0,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      0
    );

    // 4. Outgoing wood moves edge-to-edge end-to-end
    if (outWood) {
      tl.to(
        outWood,
        {
          xPercent: exitWoodX,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 5. Incoming wood enters edge-to-edge to center
    if (inWood) {
      tl.to(
        inWood,
        {
          xPercent: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 6. Animate new 2-line white headline: top line from LEFT, bottom line from RIGHT
    if (topLine && bottomLine) {
      tl.fromTo(
        topLine,
        { x: -110, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        0.3
      );
      tl.fromTo(
        bottomLine,
        { x: 110, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        0.34
      );
    }
  };

  const switchSlide = (direction: 'next' | 'prev') => {
    const currentIdx = activeIndexRef.current;
    const nextIndex =
      direction === 'next'
        ? (currentIdx + 1) % totalSets
        : (currentIdx - 1 + totalSets) % totalSets;
    animateToSlide(nextIndex, direction);
  };

  return (
    <section
      id="drinks"
      ref={sectionRef}
      className="relative z-10 isolate w-full min-h-screen h-screen overflow-hidden flex items-center justify-center select-none bg-[#0a180e]"
    >
      {/* ======================================================== */}
      {/* 🌲 LAYER 1: BACKGROUND (bg3.1.png) - Layer z-10          */}
      {/* Sunlight filtering through rainforest canopy             */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
        <img
          src="/bg3.1.png"
          alt="Sunlight Rainforest Canopy Background"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle ambient lighting vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 🍾 LAYER 2: BOTTLES (bottle3.1..3.4) - Layer z-20..22    */}
      {/* All 4 sets pre-mounted & optically matched behind wood   */}
      {/* ======================================================== */}
      {BOTTLE_SETS.map((set, idx) => (
        <div
          key={set.id}
          ref={(el) => {
            bottleLayerRefs.current[idx] = el;
          }}
          className="absolute inset-x-0 w-full z-20 pointer-events-none select-none flex items-center justify-center will-change-transform"
          style={{
            bottom: `${bottleBottom}%`,
          }}
        >
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              width: responsiveBottleWidth,
              transform: `translateY(${set.verticalAdjustPercent}%) scale(${bottleScale * set.visualScale})`,
              transformOrigin: 'bottom center',
            }}
          >
            <img
              src={set.bottleImage}
              alt={set.name}
              width={1536}
              height={1024}
              decoding="sync"
              className="w-full h-auto aspect-[3/2] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      ))}

      {/* ======================================================== */}
      {/* 🌿 LAYER 3: FOREGROUND WOOD LOG (foreground3.png) z-30..32*/}
      {/* Mossy log, lemons & fresh citrus in front of bottles     */}
      {/* Moves END-TO-END edge to edge with the switch animation! */}
      {/* ======================================================== */}
      {[0, 1].map((slot) => (
        <div
          key={`wood-slot-${slot}`}
          ref={(el) => {
            woodLayerRefs.current[slot] = el;
          }}
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-30 will-change-transform flex items-end justify-center"
        >
          <img
            src="/foreground3.png"
            alt="Mossy Log & Citrus Foreground"
            decoding="sync"
            className="w-full h-auto min-w-[1100px] md:min-w-full object-cover object-bottom filter drop-shadow-[0_-10px_25px_rgba(0,0,0,0.55)] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      ))}

      {/* ======================================================== */}
      {/* 🏷️ 2-LINE OPPOSITE-SLIDE HEADLINE + STATIC BOTTLE NAMES  */}
      {/* ======================================================== */}
      <div
        className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-center px-4 max-w-3xl w-full pointer-events-none"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight flex flex-col items-center">
          <span
            ref={topLineRef}
            className="block whitespace-nowrap will-change-transform text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            {currentSet.titleLine1}
          </span>
          <span
            ref={bottomLineRef}
            className="block whitespace-nowrap will-change-transform text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.45)]"
          >
            {currentSet.titleLine2}
          </span>
        </h2>

        <p className="mt-1.5 text-xs sm:text-sm font-semibold text-lime-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {currentSet.subtitle}
        </p>
      </div>

      {/* ======================================================== */}
      {/* 🏹 NAVIGATION ARROWS (Left Center & Right Center) z-40    */}
      {/* ======================================================== */}
      {/* Left Arrow Button */}
      <button
        onClick={() => switchSlide('prev')}
        disabled={isAnimating}
        aria-label="Previous Bottle Set"
        className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full glass-panel border border-lime-400/50 flex items-center justify-center text-lime-300 hover:text-white hover:border-lime-300 hover:bg-emerald-950/80 hover:scale-110 active:scale-90 shadow-[0_8px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all cursor-pointer group disabled:opacity-50"
      >
        <ChevronLeft size={30} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={() => switchSlide('next')}
        disabled={isAnimating}
        aria-label="Next Bottle Set"
        className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full glass-panel border border-lime-400/50 flex items-center justify-center text-lime-300 hover:text-white hover:border-lime-300 hover:bg-emerald-950/80 hover:scale-110 active:scale-90 shadow-[0_8px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all cursor-pointer group disabled:opacity-50"
      >
        <ChevronRight size={30} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* ======================================================== */}
      {/* 🔘 SLIDE PAGINATION PILLS (Bottom Center) z-40           */}
      {/* ======================================================== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl">
        {BOTTLE_SETS.map((set, idx) => (
          <button
            key={set.id}
            onClick={() => {
              if (idx === displayIndex || isAnimating) return;
              animateToSlide(idx, idx > displayIndex ? 'next' : 'prev');
            }}
            aria-label={`Jump to ${set.name}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === displayIndex
                ? 'w-7 h-2 bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
