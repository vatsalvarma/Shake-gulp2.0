import { useState, useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

// =========================================================================
// 🎛️ PAGE 3 BOTTLE SHOWCASE CONFIGURATION
// You can adjust bottle vertical height, scale, and positioning here:
// =========================================================================
export const PAGE3_CONFIG = {
  bottleBottomPercent: 5.0,   // 👈 Vertical height of bottles (increase to move UP, decrease to move DOWN)
  bottleScale: 1.1,            // 👈 Bottle scale multiplier (e.g. 1.05 for 5% larger)
  bottleWidth: 'clamp(360px, 48vw, 760px)', // 👈 Responsive width of the 3-bottle set
  foregroundBottomOffset: 0,   // 👈 Foreground mossy log vertical offset in px
  orderButtonText: 'GULP THE COOL', // 👈 Change the green button text here!
};

// =========================================================================
// 🍾 BOTTLE SETS DATA
// Copied 3 times with bottle3.1.png and foreground3.png per your instructions.
// Each set contains its own bottles and its own wood/foreground image!
// =========================================================================
export interface BottleSet {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  bottleImage: string;
  foregroundImage: string;
  description: string;
}

export const BOTTLE_SETS: BottleSet[] = [
  {
    id: 'set-1',
    name: 'SHAKE THE SPICE',
    badge: 'COLLECTION 01',
    subtitle: 'Classic Plain • Roasted Jeera • Spiced Masala',
    bottleImage: '/bottle3.1.png',
    foregroundImage: '/foreground3.png',
    description: 'Slow-churned coastal buttermilk infused with roasted mountain cumin, wild herbs, and Himalayan rock salt.',
  },
  {
    id: 'set-2',
    name: 'SHAKE THE SPICE',
    badge: 'COLLECTION 02',
    subtitle: 'Pure Amla • Cold Ginger • Raw Forest Honey',
    bottleImage: '/bottle3.1.png', // Ready for your 2nd bottle image
    foregroundImage: '/foreground3.png', // Wood copied for set 2
    description: 'Cold-pressed wild forest amla packed with 20x Vitamin C, harmonized with raw nectar and warming botanical ginger.',
  },
  {
    id: 'set-3',
    name: 'SHAKE  THE  SPICE',
    badge: 'COLLECTION 03',
    subtitle: 'Tulsi Lime • Moringa Green • Mint Leaf',
    bottleImage: '/bottle3.1.png', // Ready for your 3rd bottle image
    foregroundImage: '/foreground3.png', // Wood copied for set 3
    description: 'Ancient Ayurvedic restorative blends engineered to stimulate natural digestion, clear skin radiance, and cellular energy.',
  },
];

interface BottleShowcaseSectionProps {
  onAddToCart?: () => void;
}

export const BottleShowcaseSection: FC<BottleShowcaseSectionProps> = ({ onAddToCart }) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextDisplayIndex, setNextDisplayIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Position & Alignment directly from PAGE3_CONFIG for instant live updates
  const bottleBottom = PAGE3_CONFIG.bottleBottomPercent;
  const bottleScale = PAGE3_CONFIG.bottleScale;

  // Animation Refs
  const currentBottleRef = useRef<HTMLDivElement | null>(null);
  const incomingBottleRef = useRef<HTMLDivElement | null>(null);
  const currentWoodRef = useRef<HTMLDivElement | null>(null);
  const incomingWoodRef = useRef<HTMLDivElement | null>(null);
  const textInfoRef = useRef<HTMLDivElement | null>(null);
  const slideDirectionRef = useRef<'next' | 'prev'>('next');

  const totalSets = BOTTLE_SETS.length;
  const currentSet = BOTTLE_SETS[displayIndex];
  const incomingSet = nextDisplayIndex !== null ? BOTTLE_SETS[nextDisplayIndex] : null;

  // =========================================================================
  // 🚀 EDGE-TO-EDGE BOTTLE & WOOD END-TO-END SWITCH ANIMATION
  // On click:
  // - Bottle moves right to left edge-to-edge (exit: -100%, enter: +100% -> 0%)
  // - Wood moves left to right edge-to-edge (exit: +100%, enter: -100% -> 0%)
  // - Smooth simultaneous cinematic transition!
  // =========================================================================
  const switchSlide = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    soundFx.playWhoosh();

    slideDirectionRef.current = direction;
    const nextIndex =
      direction === 'next'
        ? (displayIndex + 1) % totalSets
        : (displayIndex - 1 + totalSets) % totalSets;

    setNextDisplayIndex(nextIndex);
  };

  useEffect(() => {
    if (nextDisplayIndex === null) return;

    const currentBottle = currentBottleRef.current;
    const incomingBottle = incomingBottleRef.current;
    const currentWood = currentWoodRef.current;
    const incomingWood = incomingWoodRef.current;
    const textInfo = textInfoRef.current;

    const dir = slideDirectionRef.current;
    // Bottle: next -> exits to left (-100%), enters from right (+100%)
    //         prev -> exits to right (+100%), enters from left (-100%)
    const exitBottleX = dir === 'next' ? -100 : 100;
    const enterBottleX = dir === 'next' ? 100 : -100;

    // Wood: moves end-to-end edge-to-edge
    //       next -> exits to right (+100%), enters from left (-100%)
    //       prev -> exits to left (-100%), enters from right (+100%)
    const exitWoodX = dir === 'next' ? 100 : -100;
    const enterWoodX = dir === 'next' ? -100 : 100;

    if (incomingBottle) {
      gsap.set(incomingBottle, { xPercent: enterBottleX });
    }
    if (incomingWood) {
      gsap.set(incomingWood, { xPercent: enterWoodX });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayIndex(nextDisplayIndex);
        setNextDisplayIndex(null);
        if (currentBottle) gsap.set(currentBottle, { clearProps: 'xPercent' });
        if (currentWood) gsap.set(currentWood, { clearProps: 'xPercent' });
        setIsAnimating(false);
      },
    });

    // 1. Text fade out
    if (textInfo) {
      tl.to(
        textInfo,
        {
          opacity: 0,
          y: dir === 'next' ? -10 : 10,
          duration: 0.25,
          ease: 'power2.out',
        },
        0
      );
    }

    // 2. Outgoing bottle glides edge-to-edge
    if (currentBottle) {
      tl.to(
        currentBottle,
        {
          xPercent: exitBottleX,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 3. Incoming bottle enters edge-to-edge to center
    if (incomingBottle) {
      tl.to(
        incomingBottle,
        {
          xPercent: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 4. Outgoing wood moves edge-to-edge end-to-end
    if (currentWood) {
      tl.to(
        currentWood,
        {
          xPercent: exitWoodX,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 5. Incoming wood enters edge-to-edge to center
    if (incomingWood) {
      tl.to(
        incomingWood,
        {
          xPercent: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // 6. Text fade in with new details
    if (textInfo) {
      tl.fromTo(
        textInfo,
        { opacity: 0, y: dir === 'next' ? 10 : -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.35
      );
    }
  }, [nextDisplayIndex]);

  return (
    <section
      id="drinks"
      className="relative z-30 isolate w-full min-h-screen h-screen overflow-hidden flex items-center justify-center select-none bg-[#0a180e]"
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
      {/* 🍾 LAYER 2: BOTTLES (bottle3.1.png) - Layer z-20         */}
      {/* Sits resting on the mossy log, behind Layer 3 wood       */}
      {/* ======================================================== */}
      {/* Current Active Bottle Set */}
      <div
        ref={currentBottleRef}
        className="absolute inset-x-0 w-full z-20 pointer-events-none select-none flex items-center justify-center will-change-transform"
        style={{
          bottom: `${bottleBottom}%`,
        }}
      >
        <div
          className="relative flex items-center justify-center will-change-transform"
          style={{
            width: PAGE3_CONFIG.bottleWidth,
            transform: `scale(${bottleScale})`,
            transformOrigin: 'bottom center',
          }}
        >
          <img
            src={currentSet.bottleImage}
            alt={currentSet.name}
            className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Incoming Bottle Set (Mounted during transition) */}
      {incomingSet && (
        <div
          ref={incomingBottleRef}
          className="absolute inset-x-0 w-full z-20 pointer-events-none select-none flex items-center justify-center will-change-transform"
          style={{
            bottom: `${bottleBottom}%`,
          }}
        >
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              width: PAGE3_CONFIG.bottleWidth,
              transform: `scale(${bottleScale})`,
              transformOrigin: 'bottom center',
            }}
          >
            <img
              src={incomingSet.bottleImage}
              alt={incomingSet.name}
              className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 🌿 LAYER 3: FOREGROUND WOOD LOG (foreground3.png) z-30   */}
      {/* Mossy log, lemons & fresh citrus in front of bottles     */}
      {/* Moves END-TO-END edge to edge with the switch animation! */}
      {/* ======================================================== */}
      {/* Current Active Wood Log */}
      <div
        ref={currentWoodRef}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-30 will-change-transform flex items-end justify-center"
      >
        <img
          src={currentSet.foregroundImage}
          alt="Mossy Log & Citrus Foreground"
          className="w-full h-auto min-w-[1100px] md:min-w-full object-cover object-bottom filter drop-shadow-[0_-10px_25px_rgba(0,0,0,0.55)] select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Incoming Wood Log (Mounted during transition, moves end-to-end) */}
      {incomingSet && (
        <div
          ref={incomingWoodRef}
          className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-30 will-change-transform flex items-end justify-center"
        >
          <img
            src={incomingSet.foregroundImage}
            alt="Mossy Log & Citrus Foreground Incoming"
            className="w-full h-auto min-w-[1100px] md:min-w-full object-cover object-bottom filter drop-shadow-[0_-10px_25px_rgba(0,0,0,0.55)] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* 🏷️ FLOATING COLLECTION INFO PILL (Layer z-40)             */}
      {/* ======================================================== */}
      <div
        ref={textInfoRef}
        className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-center px-4 max-w-xl pointer-events-none will-change-transform"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-lime-400/40 shadow-xl mb-2.5">
          <Sparkles size={13} className="text-lime-400" />
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-lime-300 uppercase">
            {(incomingSet ?? currentSet).badge}
          </span>
          <span className="text-[10px] text-emerald-300/60">•</span>
          <span className="text-[10px] sm:text-xs font-mono text-emerald-200">
            {(nextDisplayIndex !== null ? nextDisplayIndex : displayIndex) + 1} / {totalSets}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {(incomingSet ?? currentSet).name}
        </h2>

        <p className="mt-1 text-xs sm:text-sm font-semibold text-lime-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {(incomingSet ?? currentSet).subtitle}
        </p>

        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="mt-3 px-4 py-1.5 rounded-full pointer-events-auto bg-lime-400 text-black text-xs font-black uppercase tracking-wider shadow-lg hover:bg-lime-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {PAGE3_CONFIG.orderButtonText}
          </button>
        )}
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
              switchSlide(idx > displayIndex ? 'next' : 'prev');
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
