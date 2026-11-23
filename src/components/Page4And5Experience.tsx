import { useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PAGE4_CONFIG } from './AboutSection';
import { PAGE5_CONFIG, PAGE5_BOTTLE_LANDING, CURVE_PATH_CONFIG } from './Page5Section';

gsap.registerPlugin(ScrollTrigger);

export const Page4And5Experience: FC = () => {
  // References
  const trackRef = useRef<HTMLDivElement | null>(null);
  const page4Ref = useRef<HTMLElement | null>(null);
  const page5Ref = useRef<HTMLElement | null>(null);
  const bottleContainerRef = useRef<HTMLDivElement | null>(null);
  const bottleFloatRef = useRef<HTMLDivElement | null>(null);

  // Directly read configuration values for instant live updates on code save
  const p4 = PAGE4_CONFIG;
  const p5 = PAGE5_CONFIG;
  const landing = PAGE5_BOTTLE_LANDING;
  const curve = CURVE_PATH_CONFIG;

  const p5PositionClass =
    p5.bgPosition === 'top'
      ? 'object-top'
      : p5.bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const p5FitClass = p5.bgFit === 'contain' ? 'object-contain' : 'object-cover';

  useEffect(() => {
    const page4 = page4Ref.current;
    const page5 = page5Ref.current;
    const bottleContainer = bottleContainerRef.current;
    const bottleFloat = bottleFloatRef.current;

    if (!page4 || !page5 || !bottleContainer) return;

    const ctx = gsap.context(() => {
      // 1. Subtle Ambient Floating Motion when resting on Page 4
      let floatTween: gsap.core.Tween | null = null;
      if (bottleFloat) {
        floatTween = gsap.to(bottleFloat, {
          y: -10,
          rotation: '-=1.0',
          duration: 3.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Calculate total vertical travel distance between Page 4 center and Page 5 center
      const pageHeight = window.innerHeight;
      const totalDeltaY = pageHeight + (landing.y - p4.bottleY);
      const startX = p4.bottleX;
      const endX = landing.x;

      // 2. Master ScrollTrigger Timeline: Smooth Curved Travel from Page 4 to Page 5
      const tlTravel = gsap.timeline({
        scrollTrigger: {
          trigger: page4,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6, // Ultra-buttery smooth scrubbing
          onUpdate: (self) => {
            // Pause ambient float while user is actively scrolling through the curve
            if (floatTween) {
              if (self.progress > 0.05 && self.progress < 0.95) {
                floatTween.pause();
              } else {
                floatTween.play();
              }
            }
          },
        },
      });

      // Set initial Page 4 resting state
      gsap.set(bottleContainer, {
        x: startX,
        y: 0,
        scale: p4.bottleScale,
        rotation: p4.bottleTilt,
        transformOrigin: 'center center',
      });

      // 🌙 Smooth Single Curved Arc Motion (No zig-zags, no snake wiggles):
      // Stage 1 (0% -> 50%): Curves gracefully outward across the screen while descending
      tlTravel.to(bottleContainer, {
        x: (startX + endX) * 0.5 + curve.arcBowX,
        y: totalDeltaY * 0.50,
        scale: (p4.bottleScale + landing.scale) * 0.52,
        rotation: (p4.bottleTilt + landing.tilt) * 0.5,
        duration: 0.5,
        ease: 'power1.inOut',
      });

      // Stage 2 (50% -> 100%): Seamlessly completes the curve and settles softly into her hand!
      tlTravel.to(bottleContainer, {
        x: endX,
        y: totalDeltaY,
        scale: landing.scale,
        rotation: landing.tilt,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    }, trackRef);

    return () => ctx.revert();
  }, [
    p4.bottleX,
    p4.bottleY,
    p4.bottleScale,
    p4.bottleTilt,
    landing.x,
    landing.y,
    landing.scale,
    landing.tilt,
    curve.arcBowX,
  ]);

  return (
    <div ref={trackRef} className="relative w-full bg-black">
      {/* ========================================================================= */}
      {/* 🌲 PAGE 4: RAW CANOPY & WATER BACKGROUND (bg4.png)                        */}
      {/* ========================================================================= */}
      <section
        id="about"
        ref={page4Ref}
        className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black"
      >
        <img
          src="/bg4.png"
          alt="Rainforest Canopy and Water Background"
          className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-150 ${
            p4.bgFit === 'contain' ? 'object-contain' : 'object-cover object-center'
          }`}
          style={{
            transform: `scale(${p4.bgScale})`,
            transformOrigin: 'center center',
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 🍃 PAGE 5: GIRL HOLDING BOTTLE BACKGROUND (bg5.png)                      */}
      {/* ========================================================================= */}
      <section
        id="page5"
        ref={page5Ref}
        className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-[#0a150e]"
      >
        <img
          src="/bg5.png"
          alt="Page 5 Girl Background"
          className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-100 ${p5FitClass} ${p5PositionClass}`}
          style={{
            transform: `translateY(${p5.bgOffsetY}px) scale(${p5.bgScale})`,
            transformOrigin: p5.bgPosition === 'top' ? 'top center' : 'center center',
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 🍾 THE TRAVELING BOTTLE (Moves from Page 4 to Page 5 in a Curved Arc)     */}
      {/* Starts at Page 4 center + bottleY, travels 100vh down into Girl's hand   */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-30"
        style={{
          top: `${p4.bottleY}px`,
        }}
      >
        <div
          ref={bottleContainerRef}
          className="relative will-change-transform flex items-center justify-center"
        >
          <div ref={bottleFloatRef} className="will-change-transform">
            <img
              src="/btm-btl.png"
              alt="Traveling Shake & Gulp Bottle"
              className="w-auto max-h-[82vh] max-w-[90vw] sm:max-w-[520px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
