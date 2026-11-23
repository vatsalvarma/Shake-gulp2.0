import { useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ PAGE 4 BOTTLE & BACKGROUND CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const PAGE4_CONFIG = {
  // Bottle positioning & styling
  bottleX: -330,        // 👈 Left ↔ Right in px (negative: left, positive: right)
  bottleY: 22,          // 👈 Up ↕ Down in px (negative: up, positive: down)
  bottleScale: 0.63,    // 👈 Bottle size multiplier
  bottleTilt: 9.0,      // 👈 Angle in degrees (-8° tilts left, +9° tilts right)

  // Background zoom & fit
  bgScale: 1.0,         // 👈 Background zoom scale (1.0 = normal, 0.9 = zoomed out)
  bgFit: 'cover' as 'cover' | 'contain', // 👈 'cover' fills screen, 'contain' shows 100% full uncropped image
};

// =========================================================================
// 📜 PAGE 4 "ABOUT US" CONTENT & POSITIONING (Adjust Manually Here)
// =========================================================================
export const PAGE4_ABOUT_CONTENT = {
  badge: 'TRADITION • HONEST INGREDIENTS',
  title: 'ABOUT US',

  // 1st Paragraph (Big - From shakeandgulp.in):
  para1:
    'Traditional drinks have been part of our cultural food habits for centuries, crafted from simple, honest ingredients. At Shake & Gulp, we revive time-honored Indian recipes with pure curd, natural seeds, and roasted mountain spices. Made with minimally processed ingredients and zero chemical additives, every sip supports gut digestion, natural hydration, and daily vitality.',

  // 2nd Paragraph (Small 2 lines):
  para2:
    'Ancient Ayurvedic wisdom, bottled fresh for modern life. Shake well, gulp fresh, and taste the timeless purity of tradition.',

  // Fine-tune right-side positioning:
  offsetX: 0,  // in px (negative moves left, positive moves right)
  offsetY: 0,  // in px (negative moves up, positive moves down)
};

interface AboutSectionProps {
  onAddToCart?: () => void;
}

export const AboutSection: FC<AboutSectionProps> = () => {
  // Directly read values from PAGE4_CONFIG for immediate live updates on code save
  const { bottleX, bottleY, bottleScale, bottleTilt, bgScale, bgFit } = PAGE4_CONFIG;

  // Animation Refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const bottleWrapperRef = useRef<HTMLDivElement | null>(null);
  const bottleFloatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation on scroll into view
      if (bottleWrapperRef.current) {
        gsap.fromTo(
          bottleWrapperRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Ambient Continuous Bottle Levitation / Floating Animation
      if (bottleFloatRef.current) {
        gsap.to(bottleFloatRef.current, {
          y: -10,
          rotation: '-=1.0',
          duration: 3.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black"
    >
      {/* ========================================================================= */}
      {/* 🌲 RAW BACKGROUND IMAGE (bg4.png) - NO BLUR, NO GRADIENTS, NO OVERLAYS   */}
      {/* ========================================================================= */}
      <img
        src="/bg4.png"
        alt="Rainforest Canopy and Water Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-150 ${
          bgFit === 'contain' ? 'object-contain' : 'object-cover object-center'
        }`}
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: 'center center',
        }}
      />

      {/* ========================================================================= */}
      {/* 🍾 BOTTLE LAYER (btm-btl.png) - CLEAN, NO TEXT, NO EXTRA CONTENT          */}
      {/* ========================================================================= */}
      <div
        ref={bottleWrapperRef}
        className="relative z-10 flex items-center justify-center will-change-transform pointer-events-none"
        style={{
          transform: `translate(${bottleX}px, ${bottleY}px)`,
        }}
      >
        <div ref={bottleFloatRef} className="will-change-transform">
          <img
            src="/btm-btl.png"
            alt="Shake & Gulp Bottle"
            className="w-auto max-h-[82vh] max-w-[90vw] sm:max-w-[520px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] select-none transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${bottleScale}) rotate(${bottleTilt}deg)`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      </div>
    </section>
  );
};
