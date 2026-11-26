import { useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PAGE4_CONFIG, PAGE4_ABOUT_CONTENT } from './AboutSection';
import { PAGE5_CONFIG, PAGE5_BOTTLE_LANDING, ROUTE_4_TO_5_CONFIG, PAGE5_CONTENT } from './Page5Section';
import { PAGE6_CONFIG, PAGE6_BOTTLE_LANDING, ROUTE_5_TO_6_CONFIG, PAGE6_CONTENT } from './Page6Section';
import {
  getUiScale,
  projectCoverPoint,
  RESPONSIVE_SCREEN_CONFIG,
  useViewportSize,
} from '../utils/responsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const Page4to6Experience: FC = () => {
  // References
  const trackRef = useRef<HTMLDivElement | null>(null);
  const page4Ref = useRef<HTMLElement | null>(null);
  const page5Ref = useRef<HTMLElement | null>(null);
  const page6Ref = useRef<HTMLElement | null>(null);
  const bottleContainerRef = useRef<HTMLDivElement | null>(null);
  const bottleFloatRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const page5TextRef = useRef<HTMLDivElement | null>(null);
  const page6ContainerRef = useRef<HTMLDivElement | null>(null);

  // Read configuration values for instant live updates on save
  const p4 = PAGE4_CONFIG;
  const aboutContent = PAGE4_ABOUT_CONTENT;
  const p5 = PAGE5_CONFIG;
  const p5Content = PAGE5_CONTENT;
  const p6 = PAGE6_CONFIG;
  const p6Content = PAGE6_CONTENT;
  const landing5 = PAGE5_BOTTLE_LANDING;
  const route4to5 = ROUTE_4_TO_5_CONFIG;
  const landing6 = PAGE6_BOTTLE_LANDING;
  const route5to6 = ROUTE_5_TO_6_CONFIG;

  const p5PositionClass =
    p5.bgPosition === 'top'
      ? 'object-top'
      : p5.bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';
  const p5FitClass = p5.bgFit === 'contain' ? 'object-contain' : 'object-cover';

  const p6PositionClass =
    p6.bgPosition === 'top'
      ? 'object-top'
      : p6.bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';
  const p6FitClass = p6.bgFit === 'contain' ? 'object-contain' : 'object-cover';

  // Track viewport size cleanly so bottle curve & Page 6 metal rack landing stay locked across all screens
  const { vw, vh } = useViewportSize();
  const uiScale = getUiScale(vw, vh);

  // Project normal-screen reference positions (1536 x 695) onto active screen via each background's cover box.
  // Page 6 bottle foot anchors directly onto the metal wire rack inside bg6.png across every screen size.
  const flowMetrics = (() => {
    const { referenceWidth: refW, referenceHeight: refH, page6MetalRack } = RESPONSIVE_SCREEN_CONFIG;
    const { widthScale, heightScale, sideCardScale, isMobile } = uiScale;

    const baseBottleHeightPx = isMobile ? Math.min(vh * 0.68, vw * 0.85) : vh * 0.82;

    if (isMobile) {
      const mobileRefH = refH * 0.82;
      const mobileScaleFactor = Math.min(vw / 440, 0.92);
      const targetH4 = p4.bottleScale * mobileRefH * mobileScaleFactor;
      const targetH5 = landing5.scale * mobileRefH * mobileScaleFactor;
      const targetH6 = Math.min(landing6.scale * mobileRefH * mobileScaleFactor, vh * 0.58);

      const rackBottomY = Math.min(page6MetalRack.rackSurfaceYRatio * vh, vh * 0.945);
      const centerY6 = rackBottomY - targetH6 / 2;

      return {
        baseBottleHeightPx,
        widthScale,
        heightScale,
        sideCardScale,
        curveScaleX: Math.min(vw / 500, 0.85),
        isMobile,
        offsetX4: Math.max(Math.min((p4.bottleX / refW) * vw * 1.4, vw * 0.25), -vw * 0.24),
        offsetY4: (p4.bottleY / refH) * vh,
        scale4: targetH4 / baseBottleHeightPx,
        offsetX5: Math.max(Math.min((landing5.x / refW) * vw * 1.5, vw * 0.26), -vw * 0.26),
        offsetY5: vh + (landing5.y / refH) * vh,
        scale5: targetH5 / baseBottleHeightPx,
        offsetX6: (landing6.x / refW) * vw,
        offsetY6: 2 * vh - p6.movePage6Up + (centerY6 - vh / 2),
        scale6: targetH6 / baseBottleHeightPx,
      };
    }

    // Desktop & laptop viewports (>= 768px):
    // 1. Page 4 resting spot on bg4.png (1672x941, center)
    const p4Proj = projectCoverPoint(
      vw,
      vh,
      1672,
      941,
      0.5,
      0.5,
      refW / 2 + p4.bottleX,
      refH / 2 + p4.bottleY
    );
    const x4Clamped = Math.min(Math.max(p4Proj.x, vw * 0.12), vw * 0.88);
    const targetH4 = p4.bottleScale * (0.82 * refH) * p4Proj.scaleRatio;

    // 2. Page 5 hand grip spot on bg5.png (1881x836, top-anchored)
    const p5Proj = projectCoverPoint(
      vw,
      vh,
      1881,
      836,
      0.5,
      0.0,
      refW / 2 + landing5.x,
      refH / 2 + landing5.y
    );
    const x5Clamped = Math.min(Math.max(p5Proj.x, vw * 0.12), vw * 0.88);
    const targetH5 = landing5.scale * (0.82 * refH) * p5Proj.scaleRatio;

    // 3. Page 6 metal rack landing spot on bg6.png (1899x828, top-anchored)
    // Foot lands squarely on the bottom metal rack surface between the mint leaves.
    const rackRefY =
      page6MetalRack.rackSurfaceYRatio * refH +
      (landing6.y - page6MetalRack.referenceLandingY);
    const p6Proj = projectCoverPoint(
      vw,
      vh,
      1899,
      828,
      0.5,
      0.0,
      refW / 2 + landing6.x,
      rackRefY
    );
    const x6Clamped = Math.min(Math.max(p6Proj.x, vw * 0.12), vw * 0.88);
    const targetH6 = Math.min(
      landing6.scale * (0.82 * refH) * p6Proj.scaleRatio,
      vh * 0.68
    );
    const rackBottomInPage6 = Math.min(p6Proj.y, vh * 0.945);
    const centerY6 = rackBottomInPage6 - targetH6 / 2;

    return {
      baseBottleHeightPx,
      widthScale,
      heightScale,
      sideCardScale,
      curveScaleX: p5Proj.scaleRatio,
      isMobile,
      offsetX4: x4Clamped - vw / 2,
      offsetY4: p4Proj.y - vh / 2,
      scale4: targetH4 / baseBottleHeightPx,
      offsetX5: x5Clamped - vw / 2,
      offsetY5: vh + (p5Proj.y - vh / 2),
      scale5: targetH5 / baseBottleHeightPx,
      offsetX6: x6Clamped - vw / 2,
      offsetY6: 2 * vh - p6.movePage6Up + (centerY6 - vh / 2),
      scale6: targetH6 / baseBottleHeightPx,
    };
  })();

  useEffect(() => {
    const page4 = page4Ref.current;
    const page5 = page5Ref.current;
    const page6 = page6Ref.current;
    const bottleContainer = bottleContainerRef.current;
    const bottleFloat = bottleFloatRef.current;

    if (!page4 || !page5 || !page6 || !bottleContainer) return;

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

      const {
        offsetX4,
        offsetY4,
        scale4,
        offsetX5,
        offsetY5,
        scale5,
        offsetX6,
        offsetY6,
        scale6,
        curveScaleX,
      } = flowMetrics;

      // Scroll Reveal for Page 4 "ABOUT US" text: slide in from right one by one
      if (aboutTextRef.current) {
        const revealItems = aboutTextRef.current.querySelectorAll('.reveal-item');
        gsap.fromTo(
          revealItems,
          {
            opacity: 0,
            x: 90, // 👈 Slide in from the right
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            stagger: 0.22, // 👈 One by one sequence
            ease: 'power3.out',
            scrollTrigger: {
              trigger: page4,
              start: 'top 70%',
              toggleActions: 'play reverse play reverse',
              refreshPriority: 5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Scroll Reveal for Page 5 "NATURAL INGREDIENTS" text: slide in from LEFT one by one
      if (page5TextRef.current && page5) {
        const p5RevealItems = page5TextRef.current.querySelectorAll('.p5-reveal-item');
        gsap.fromTo(
          p5RevealItems,
          {
            opacity: 0,
            x: -90, // 👈 Slide in from the LEFT
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            stagger: 0.22, // 👈 One by one sequence
            ease: 'power3.out',
            scrollTrigger: {
              trigger: page5,
              start: 'top 70%',
              toggleActions: 'play reverse play reverse',
              refreshPriority: 5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const dy4to5 = offsetY5 - offsetY4;
      const dy5to6 = offsetY6 - offsetY5;

      // Set initial Page 4 resting state with hardware acceleration
      gsap.set(bottleContainer, {
        x: offsetX4,
        y: offsetY4,
        scale: scale4,
        rotation: p4.bottleTilt,
        transformOrigin: 'center center',
        force3D: true,
      });

      // =========================================================================
      // 🎬 SINGLE UNIFIED MASTER TIMELINE: Page 4 -> Page 5 -> Page 6
      // =========================================================================
      let isFloatActive = true;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: page4,
          start: 'top top',
          endTrigger: page6,
          end: 'top top',
          scrub: 0.3,
          refreshPriority: 5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bottleFloat && floatTween) {
              if (self.progress > 0.03 && isFloatActive) {
                isFloatActive = false;
                floatTween.pause();
                gsap.to(bottleFloat, { y: 0, rotation: 0, duration: 0.2, overwrite: 'auto' });
              } else if (self.progress <= 0.03 && !isFloatActive) {
                isFloatActive = true;
                floatTween.play();
              }
            }
          },
        },
      });

      // Total timeline duration: 10.0 units
      // -------------------------------------------------------------------------
      // 🌙 PHASE 1: PAGE 4 -> PAGE 5 TRAVEL (Total: 4.4 units)
      // -------------------------------------------------------------------------
      // Step 1: Plunge down along the left flank into Page 5 (0.00 -> 1.20)
      masterTl.to(bottleContainer, {
        x: offsetX4 - route4to5.leftSwoopOffset * curveScaleX,
        y: offsetY4 + dy4to5 * 0.38,
        scale: (scale4 + scale5) * 0.54,
        rotation: route4to5.dropAngle,
        duration: 1.2,
        ease: 'power1.in',
      });

      // Step 2: Bottom-left turn, banking into the bottom curve (1.20 -> 2.10)
      masterTl.to(bottleContainer, {
        x: offsetX4 + 35 * curveScaleX,
        y: offsetY4 + dy4to5 * route4to5.bottomSwoopY,
        scale: (scale4 + scale5) * 0.49,
        rotation: route4to5.turnAngle,
        duration: 0.9,
        ease: 'none',
      });

      // Step 3: Diagonal climb across middle of Page 5 (2.10 -> 3.20)
      masterTl.to(bottleContainer, {
        x: (offsetX4 + offsetX5) * 0.22,
        y: offsetY4 + dy4to5 * 0.75,
        scale: (scale4 + scale5) * 0.45,
        rotation: route4to5.climbAngle,
        duration: 1.1,
        ease: 'none',
      });

      // Step 4: Arching over the crest / wave peak before hand (3.20 -> 3.80)
      masterTl.to(bottleContainer, {
        x: offsetX5 * 0.72,
        y: offsetY4 + dy4to5 * 0.88,
        scale: (scale4 + scale5) * 0.43,
        rotation: route4to5.crestAngle,
        duration: 0.6,
        ease: 'none',
      });

      // Step 5: Fits snugly into girl's hand on Page 5 (3.80 -> 4.40)
      masterTl.to(bottleContainer, {
        x: offsetX5,
        y: offsetY5,
        scale: scale5,
        rotation: landing5.tilt,
        duration: 0.6,
        ease: 'power1.out',
      });

      // -------------------------------------------------------------------------
      // ✋ PHASE 2: RESTING HOLD IN GIRL'S HAND (4.40 -> 5.60)
      // Keeps bottle 100% stationary in her hand while viewing Page 5!
      // -------------------------------------------------------------------------
      masterTl.to(bottleContainer, {
        x: offsetX5,
        y: offsetY5,
        scale: scale5,
        rotation: landing5.tilt,
        duration: 1.2,
        ease: 'none',
      });

      // -------------------------------------------------------------------------
      // 🧊 PHASE 3: PAGE 5 -> PAGE 6 TRAVEL & WHY US REVEAL (Total: 4.4 units)
      // -------------------------------------------------------------------------
      // Step 6: Leaves girl's hand, hugs down along the right side (5.60 -> 6.80)
      masterTl.to(bottleContainer, {
        x: offsetX5 + route5to6.rightSwoopOffset * curveScaleX,
        y: offsetY5 + dy5to6 * 0.35,
        scale: (scale5 + scale6) * 0.48,
        rotation: route5to6.exitHandAngle,
        duration: 1.2,
        ease: 'power1.in',
      });

      // Step 7: Sweeps down and inward toward center of Page 6 (6.80 -> 8.00)
      masterTl.to(bottleContainer, {
        x: (offsetX5 + offsetX6) * 0.5 + 35 * curveScaleX,
        y: offsetY5 + dy5to6 * 0.72,
        scale: (scale5 + scale6) * 0.55,
        rotation: route5to6.midwayDiveAngle,
        duration: 1.2,
        ease: 'none',
      });

      // Step 8: Touchdown directly on Page 6 metal fridge rack, upright (8.00 -> 8.80)
      // 🍾 BOTTLE LANDING ANIMATION IS 100% COMPLETE HERE!
      masterTl.to(bottleContainer, {
        x: offsetX6,
        y: offsetY6,
        scale: scale6,
        rotation: landing6.tilt,
        duration: 0.8,
        ease: 'power1.out',
      });

      // Step 9: AFTER BOTTLE LAND ANIMATION COMPLETES:
      // Bottle rests parked on metal rack while on continued scroll:
      //  - Top-left title "WHY US" reveals
      //  - 2 paragraphs slide in from LEFT
      //  - 2 paragraphs slide in from RIGHT (8.80 -> 10.00)
      masterTl.to(
        bottleContainer,
        {
          x: offsetX6,
          y: offsetY6,
          scale: scale6,
          rotation: landing6.tilt,
          duration: 1.2,
          ease: 'none',
        },
        'whyUsReveal'
      );

      if (page6ContainerRef.current) {
        const titleEls = page6ContainerRef.current.querySelectorAll('.why-us-title');
        const leftEls = page6ContainerRef.current.querySelectorAll('.why-us-left');
        const rightEls = page6ContainerRef.current.querySelectorAll('.why-us-right');

        masterTl.fromTo(
          titleEls,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          'whyUsReveal'
        );

        masterTl.fromTo(
          leftEls,
          { opacity: 0, x: -90 },
          { opacity: 1, x: 0, duration: 1.1, stagger: 0.16, ease: 'power2.out' },
          'whyUsReveal'
        );

        masterTl.fromTo(
          rightEls,
          { opacity: 0, x: 90 },
          { opacity: 1, x: 0, duration: 1.1, stagger: 0.16, ease: 'power2.out' },
          'whyUsReveal'
        );
      }
    }, trackRef);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [
    vw,
    vh,
    p4.bottleX,
    p4.bottleY,
    p4.bottleScale,
    p4.bottleTilt,
    landing5.x,
    landing5.y,
    landing5.scale,
    landing5.tilt,
    route4to5.leftSwoopOffset,
    route4to5.bottomSwoopY,
    route4to5.dropAngle,
    route4to5.turnAngle,
    route4to5.climbAngle,
    route4to5.crestAngle,
    landing6.x,
    landing6.y,
    landing6.scale,
    landing6.tilt,
    route5to6.rightSwoopOffset,
    route5to6.exitHandAngle,
    route5to6.midwayDiveAngle,
    p6.movePage6Up,
    aboutContent.offsetX,
    aboutContent.offsetY,
    p5Content.offsetX,
    p5Content.offsetY,
    p6Content.offsetX,
    p6Content.offsetY,
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

        {/* 📜 ABOUT US CONTENT (Positioned on the Right Side per Sketch) */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-end pointer-events-none">
          <div
            ref={aboutTextRef}
            className="max-w-[560px] w-full text-left pointer-events-auto"
            style={{
              transform: `translate(${
                flowMetrics.isMobile ? 0 : aboutContent.offsetX * flowMetrics.widthScale
              }px, ${aboutContent.offsetY * flowMetrics.heightScale}px) scale(${
                flowMetrics.isMobile ? 1 : flowMetrics.sideCardScale
              })`,
              transformOrigin: 'right center',
            }}
          >
            {/* Tagline / Botanical Badge */}
            <div className="reveal-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/15 border border-lime-500/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-lime-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                {aboutContent.badge}
              </span>
            </div>

            {/* Hero Title */}
            <h2 className="reveal-item text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5 font-sans drop-shadow-md">
              {aboutContent.title}
            </h2>

            {/* 1st Paragraph (Big - From shakeandgulp.in) */}
            <p className="reveal-item text-sm sm:text-base lg:text-lg text-emerald-50/90 leading-relaxed font-light mb-4 drop-shadow-sm">
              {aboutContent.para1}
            </p>

            {/* Subtle Glowing Divider */}
            <div className="reveal-item w-16 h-[2px] bg-gradient-to-r from-lime-400 to-transparent mb-4" />

            {/* 2nd Paragraph (Small 2 lines) */}
            <p className="reveal-item text-xs sm:text-sm text-lime-300/85 font-medium tracking-wide uppercase leading-snug drop-shadow-sm">
              {aboutContent.para2}
            </p>
          </div>
        </div>
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

        {/* 🌿 NATURAL INGREDIENTS CONTENT (Positioned on the Left Side) */}
        <div className="relative z-10 w-full h-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-start pointer-events-none">
          <div
            ref={page5TextRef}
            className="max-w-[490px] lg:max-w-[520px] w-full text-left pointer-events-auto"
            style={{
              transform: `translate(${
                flowMetrics.isMobile ? 0 : p5Content.offsetX * flowMetrics.widthScale
              }px, ${p5Content.offsetY * flowMetrics.heightScale}px) scale(${
                flowMetrics.isMobile ? 1 : flowMetrics.sideCardScale
              })`,
              transformOrigin: 'left center',
            }}
          >
            {/* Tagline / Botanical Badge */}
            <div className="p5-reveal-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d3b17]/10 border border-[#0d3b17]/25 backdrop-blur-md mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1e6126] animate-pulse" />
              <span className="text-[#0d3b17] font-mono text-xs uppercase tracking-[0.2em] font-bold">
                {p5Content.badge}
              </span>
            </div>

            {/* Hero Title */}
            <h2 className="p5-reveal-item text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-5 font-sans drop-shadow-[0_4px_12px_rgba(13,59,23,0.5)]">
              {p5Content.title}
            </h2>

            {/* 1st Paragraph (Big - Pure Botanicals in Clean White) */}
            <p className="p5-reveal-item text-sm sm:text-base lg:text-lg text-white font-medium leading-relaxed mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              {p5Content.para1}
            </p>

            {/* Subtle Divider */}
            <div className="p5-reveal-item w-16 h-[2.5px] bg-gradient-to-r from-[#0d3b17] to-transparent mb-4" />

            {/* 2nd Paragraph (Small 2 lines in Dark Botanical Green) */}
            <p className="p5-reveal-item text-xs sm:text-sm text-[#144f20] font-black tracking-wide uppercase leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
              {p5Content.para2}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧊 PAGE 6: GIRL REACHING INTO FRIDGE BACKGROUND (bg6.png)                 */}
      {/* ========================================================================= */}
      <section
        id="page6"
        ref={page6Ref}
        className="relative z-10 w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black transition-all duration-150"
        style={{
          marginTop: `-${p6.movePage6Up}px`,
        }}
      >
        <img
          src="/bg6.png"
          alt="Page 6 Fridge Background"
          className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-100 ${p6FitClass} ${p6PositionClass}`}
          style={{
            transform: `translateY(${p6.bgOffsetY}px) scale(${p6.bgScale})`,
            transformOrigin: p6.bgPosition === 'top' ? 'top center' : 'center center',
          }}
        />

        {/* 🧊 PAGE 6: "WHY US" CONTENT (Top Left Title + 2 Left Paras + 2 Right Paras) */}
        <div ref={page6ContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {/* Top Left Title */}
          <div
            className="absolute top-6 sm:top-10 lg:top-12 left-6 sm:left-10 lg:left-14 text-left pointer-events-auto"
            style={{
              transform: `scale(${flowMetrics.isMobile ? 0.92 : flowMetrics.sideCardScale})`,
              transformOrigin: 'top left',
            }}
          >
            <div className="why-us-title inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/15 border border-lime-500/30 backdrop-blur-md mb-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-lime-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                {p6Content.badge}
              </span>
            </div>
            <h2 className="why-us-title text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
              {p6Content.title}
            </h2>
          </div>

          {/* 👈 2 Paras from Left (Beside the Bottle - Clean Text Only, No Black Card) */}
          <div
            className="hidden sm:flex absolute left-6 sm:left-10 lg:left-14 top-[56%] -translate-y-1/2 max-w-[310px] sm:max-w-[360px] flex-col gap-6 text-left pointer-events-auto"
            style={{
              transform: `scale(${flowMetrics.sideCardScale})`,
              transformOrigin: 'left center',
            }}
          >
            {/* Left Para 1 */}
            <div className="why-us-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                <span className="text-lime-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {p6Content.leftItem1Title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {p6Content.leftItem1Para}
              </p>
            </div>

            {/* Left Para 2 */}
            <div className="why-us-left">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                <span className="text-lime-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {p6Content.leftItem2Title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {p6Content.leftItem2Para}
              </p>
            </div>
          </div>

          {/* 👉 2 Paras from Right (Beside the Bottle - Clean Text Only, No Black Card) */}
          <div
            className="hidden sm:flex absolute right-6 sm:right-10 lg:right-14 top-[56%] -translate-y-1/2 max-w-[310px] sm:max-w-[360px] flex-col gap-6 text-left pointer-events-auto"
            style={{
              transform: `scale(${flowMetrics.sideCardScale})`,
              transformOrigin: 'right center',
            }}
          >
            {/* Right Para 1 */}
            <div className="why-us-right">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                <span className="text-lime-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {p6Content.rightItem1Title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {p6Content.rightItem1Para}
              </p>
            </div>

            {/* Right Para 2 */}
            <div className="why-us-right">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                <span className="text-lime-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {p6Content.rightItem2Title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                {p6Content.rightItem2Para}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🍾 THE TRAVELING BOTTLE (Hardware accelerated, ultra-smooth)              */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-30"
      >
        <div
          ref={bottleContainerRef}
          className="relative will-change-transform flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            ref={bottleFloatRef}
            className="will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <img
              src="/btm-btl.png"
              alt="Traveling Shake & Gulp Bottle"
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
              style={{
                height: `${flowMetrics.baseBottleHeightPx}px`,
                width: 'auto',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
