import { useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ PAGE 8 CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const PAGE8_CONFIG = {
  // 1. Move Page 8 UP (in px) - default 0:
  movePage8Up: 0,

  // 2. Background Image Fit & Zoom:
  bgFit: 'cover' as 'contain' | 'cover',
  bgScale: 1.0,
  bgPosition: 'center' as 'center' | 'top' | 'bottom',
  bgOffsetY: 0, // fine-tune background up/down in px

  // 3. ScrollTrigger Pinning & Lock Distance:
  //    Generous distance to allow both hand animation and text write-in
  pinDuration: '+=200%',

  // 4. Bottle Landing Size & Alignment (matches bg8 stone ledge perfectly):
  bottleHeightVh: 67.5, // bottle height in vh (matches other bottles in bg8)
  bottleLedgeBottomPercent: 9.8, // distance from bottom of screen to stone ledge
  bottleOffsetX: 5, // fine-tune bottle left (-) or right (+) in px
  bottleOffsetY: 0, // fine-tune bottle up (-) or down (+) in px

  // 5. Hand Proportions & Grip Alignment over Bottle Neck:
  handScaleMultiplier: 2.45, // Hand width relative to bottle width
  handOffsetXPercent: -50.0, // Hand X relative to bottle top-left (%)
  handOffsetYPercent: -80.0, // Hand Y relative to bottle top-left (%)
  handFineTuneX: 0, // Extra fine-tune X for hand in px
  handFineTuneY: 0, // Extra fine-tune Y for hand in px

  // 6. Entry Flight Path (from top-right):
  entryX: '55vw', // Starts off-screen to the right
  entryY: '-70vh', // Starts off-screen above
  entryRotation: 12, // Entry tilt in degrees

  // 7. Exit Retreat Path (Hand lifts away after placing bottle):
  exitX: '50vw', // Hand pulls back toward top-right
  exitY: '-60vh', // Hand lifts up
  exitRotation: 20, // Hand tilt on retreat

  // 8. Center Text & Transparent Button Configuration:
  textTopPercent: 16, // Distance from top of screen (%)
  textOffsetY: 320, // Fine-tune text Up (-) or Down (+) in px
  textScale: 0.99, // Scale multiplier for text & button
  titleText: 'EXPLORE WELLNESS SHOTS', // Text to write on scroll
  buttonText: 'EXPLORE', // Button label
};

export const Page8Section: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bottleGroupRef = useRef<HTMLDivElement | null>(null);
  const bottleRef = useRef<HTMLImageElement | null>(null);
  const handRef = useRef<HTMLImageElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  // Text & Button animation refs
  const centerContentRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const {
    movePage8Up,
    bgFit,
    bgScale,
    bgPosition,
    bgOffsetY,
    pinDuration,
    bottleHeightVh,
    bottleLedgeBottomPercent,
    bottleOffsetX,
    bottleOffsetY,
    handScaleMultiplier,
    handOffsetXPercent,
    handOffsetYPercent,
    handFineTuneX,
    handFineTuneY,
    entryX,
    entryY,
    entryRotation,
    exitX,
    exitY,
    exitRotation,
    textTopPercent,
    textOffsetY,
    textScale,
    titleText,
    buttonText,
  } = PAGE8_CONFIG;

  const positionClass =
    bgPosition === 'top'
      ? 'object-top'
      : bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const fitClass = bgFit === 'contain' ? 'object-contain' : 'object-cover';

  // Smooth scroll down to explore section when button is clicked
  const handleExploreClick = () => {
    const elem = document.getElementById('benefits') || document.getElementById('drinks');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const bottle = bottleRef.current;
    const hand = handRef.current;
    const shadow = shadowRef.current;
    const pill = pillRef.current;
    const text = textRef.current;
    const line = lineRef.current;
    const button = buttonRef.current;

    if (!section || !bottle || !hand) return;

    const ctx = gsap.context(() => {
      // Create master ScrollTrigger timeline that locks/pins Page 8
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinDuration,
          pin: true,
          pinSpacing: true,
          scrub: 0.25,
          anticipatePin: 0,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial State: Hand & Bottle positioned off-screen top-right
      gsap.set(bottle, {
        x: entryX,
        y: entryY,
        rotation: entryRotation,
        force3D: true,
      });

      gsap.set(hand, {
        x: entryX,
        y: entryY,
        rotation: entryRotation,
        opacity: 1,
        force3D: true,
      });

      if (shadow) {
        gsap.set(shadow, {
          opacity: 0,
          scale: 0.4,
          force3D: true,
        });
      }

      // 2. Initial State: Center Text & Button (Hidden initially)
      if (pill) {
        gsap.set(pill, { opacity: 0, y: -15, scale: 0.9 });
      }

      const letterElements = text ? text.querySelectorAll('.letter-char') : [];
      if (letterElements.length > 0) {
        gsap.set(letterElements, {
          opacity: 0,
          y: 20,
          scale: 0.7,
          filter: 'blur(4px)',
          display: 'inline-block',
        });
      }

      if (line) {
        gsap.set(line, { scaleX: 0, opacity: 0 });
      }

      if (button) {
        gsap.set(button, {
          opacity: 0,
          scale: 0.7,
          y: 25,
          filter: 'blur(6px)',
        });
      }

      // =======================================================================
      // PHASE 1: Glide down together from Top-Right into the Center Gap (0.00 -> 0.40)
      // =======================================================================
      tl.to(
        bottle,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        hand,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );

      if (shadow) {
        tl.to(
          shadow,
          {
            opacity: 0.8,
            scale: 1.0,
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        );
      }

      // =======================================================================
      // PHASE 2: Bottle touches down firmly on the stone ledge (0.40 -> 0.46)
      // Satisfying physical contact pause as bottle settles in the lineup
      // =======================================================================
      tl.to(
        bottle,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.06,
          ease: 'none',
        },
        0.4
      );

      // =======================================================================
      // PHASE 3: Hand gently releases and retreats back to Top-Right (0.46 -> 0.58)
      // Bottle stays stationary at the center (0, 0)!
      // =======================================================================
      tl.to(
        hand,
        {
          x: exitX,
          y: exitY,
          rotation: exitRotation,
          opacity: 0,
          duration: 0.12,
          ease: 'power2.in',
        },
        0.46
      );

      // =======================================================================
      // PHASE 4: ON FURTHER SCROLL -> TEXT WRITE-IN & BUTTON REVEAL (0.58 -> 0.82)
      // After hand departs, center text animates in with typewriter letter reveal!
      // =======================================================================
      // 4a. Eyebrow badge / pill fades in
      if (pill) {
        tl.to(
          pill,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.08,
            ease: 'back.out(1.5)',
          },
          0.58
        );
      }

      // 4b. "EXPLORE WELLNESS SHOTS" letter-by-letter writing animation on scroll
      if (letterElements.length > 0) {
        tl.to(
          letterElements,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            stagger: 0.007,
            duration: 0.16,
            ease: 'power2.out',
          },
          0.60
        );
      }

      // 4c. Glowing underline expands horizontally
      if (line) {
        tl.to(
          line,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.1,
            ease: 'power2.out',
          },
          0.68
        );
      }

      // 4d. Eye-catching transparent button with white edge lines pops in
      if (button) {
        tl.to(
          button,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.12,
            ease: 'back.out(1.7)',
          },
          0.72
        );
      }

      // =======================================================================
      // PHASE 5: SOLID RESTING HOLD BUFFER (0.84 -> 1.00)
      // Completed beauty shot sits 100% stationary for silky unpinning to Page 9
      // =======================================================================
      tl.to(
        {},
        {
          duration: 0.16,
        },
        0.84
      );

      // Ensure layout calculations are refreshed
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [
    pinDuration,
    entryX,
    entryY,
    entryRotation,
    exitX,
    exitY,
    exitRotation,
  ]);

  // Derived styles for bottle & hand placement
  // Bottle aspect ratio is 1024 / 1536 (2/3)
  const bottleWidthVh = (bottleHeightVh * (1024 / 1536)).toFixed(2);
  const handWidthVh = (parseFloat(bottleWidthVh) * handScaleMultiplier).toFixed(2);

  // Split title into individual characters for letter-by-letter write-in
  const characters = titleText.split('');

  return (
    <section
      id="page8"
      ref={sectionRef}
      className="relative z-10 w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black"
      style={{
        marginTop: `-${movePage8Up}px`,
      }}
    >
      {/* ========================================================================= */}
      {/* 🌲 RAW BACKGROUND IMAGE (bg8.png)                                         */}
      {/* ========================================================================= */}
      <img
        src="/bg8.png"
        alt="Page 8 Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${fitClass} ${positionClass}`}
        style={{
          transform: `translateY(${bgOffsetY}px) scale(${bgScale})`,
          transformOrigin: bgPosition === 'top' ? 'top center' : 'center center',
        }}
      />

      {/* ========================================================================= */}
      {/* ✨ CENTER WRITE-IN TEXT & FULLY TRANSPARENT BUTTON (Z-INDEX 35)           */}
      {/* ========================================================================= */}
      <div
        ref={centerContentRef}
        className="absolute z-35 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
        style={{
          top: `${textTopPercent}%`,
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${textOffsetY}px)) scale(${textScale})`,
        }}
      >
        {/* Eyebrow Pill */}
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 bg-white/5 backdrop-blur-md text-white/90 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 shadow-[0_0_20px_rgba(255,255,255,0.25)] select-none"
        >
          <Sparkles size={14} className="text-white animate-spin" style={{ animationDuration: '6s' }} />
          <span>100% RAW • COLD-PRESSED BOTANICALS</span>
        </div>

        {/* Headline: "EXPLORE WELLNESS SHOTS" with Letter-by-Letter Write-In */}
        <h2
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] select-none flex flex-wrap justify-center items-center"
        >
          {characters.map((char, i) => (
            <span
              key={i}
              className="letter-char inline-block"
              style={{
                display: char === ' ' ? 'inline' : 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Animated Glowing Underline Accent */}
        <div
          ref={lineRef}
          className="h-[2px] w-36 sm:w-56 bg-gradient-to-r from-transparent via-white to-transparent mt-2 mb-5 shadow-[0_0_15px_rgba(255,255,255,0.85)]"
          style={{ transformOrigin: 'center' }}
        />

        {/* Eye-Catching Button: Fully Transparent with White Outline & Radiant Glow */}
        <div ref={buttonRef} className="relative group mt-1">
          {/* Subtle Outer Pulsing Halo */}
          <div className="absolute -inset-1 rounded-full border border-white/30 animate-pulse blur-xs pointer-events-none" />
          <div
            className="absolute -inset-2.5 rounded-full border border-white/20 animate-ping opacity-25 pointer-events-none"
            style={{ animationDuration: '3s' }}
          />

          <button
            onClick={handleExploreClick}
            className="relative px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-transparent border-2 border-white text-white font-black tracking-[0.24em] text-xs sm:text-sm uppercase cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.85)] active:scale-95 flex items-center gap-3 backdrop-blur-[1px] select-none shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {/* Shimmer Sheen Sweep Animation on Hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">{buttonText}</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2.5]"
            />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🍾 BOTTLE & HAND STAGE CONTAINER (Positioned at Center Gap of Stone Ledge) */}
      {/* ========================================================================= */}
      <div
        ref={bottleGroupRef}
        className="absolute pointer-events-none select-none"
        style={{
          left: `calc(50% + ${bottleOffsetX}px)`,
          bottom: `calc(${bottleLedgeBottomPercent}% + ${bottleOffsetY}px)`,
          width: `${bottleWidthVh}vh`,
          height: `${bottleHeightVh}vh`,
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}
      >
        {/* Contact Shadow on Stone Ledge */}
        <div
          ref={shadowRef}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-black/55 rounded-full blur-sm pointer-events-none z-10"
        />

        {/* 🍾 THE BOTTLE (btl8.png) - Z-INDEX 20 */}
        <img
          ref={bottleRef}
          src="/btl8.png"
          alt="Shake & Gulp Bottle"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
          style={{
            transformOrigin: 'bottom center',
          }}
        />

        {/* ✋ THE HAND (hnd8.png) - HIGHEST Z-INDEX (z-30) */}
        {/* Fingers grip around bottle neck from the left, thumb holds right, arm enters from top-right */}
        <div
          className="absolute pointer-events-none select-none z-30"
          style={{
            left: `${handOffsetXPercent}%`,
            top: `${handOffsetYPercent}%`,
            width: `${handWidthVh}vh`,
            transform: `translate(${handFineTuneX}px, ${handFineTuneY}px)`,
          }}
        >
          <img
            ref={handRef}
            src="/hnd8.png"
            alt="Hand Placing Bottle"
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_15px_22px_rgba(0,0,0,0.45)]"
            style={{
              transformOrigin: 'center center',
            }}
          />
        </div>
      </div>
    </section>
  );
};
export default Page8Section;
