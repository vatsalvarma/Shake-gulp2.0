import { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight } from 'lucide-react';
import { WaterSplashEffect, type WaterSplashRef } from './WaterSplashEffect';
import { soundFx } from '../utils/soundEffects';
import {
  getUiScale,
  projectCoverPoint,
  RESPONSIVE_SCREEN_CONFIG,
  useViewportSize,
} from '../utils/responsiveLayout';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ BOTTLE & SHADOW CONFIGURATION
// You can adjust these coordinates manually here or use the on-screen tuner:
// =========================================================================
export const BOTTLE_CONFIG = {
  // --- PAGE 1 (HERO) BOTTLE POSITION ---
  heroLeft: 77.5,
  heroTopVh: 60.0,

  // --- PAGE 2 (STONE PLATFORM) BOTTLE POSITION ---
  page2Left: 50.0,
  page2TopVh: 154.8,

  // --- PAGE 2 (STONE PLATFORM) SHADOW POSITION & SIZE ---
  page2ShadowTopPercent: 76.5,   // 👈 Shadow Up ↕ Down (increase to move DOWN, decrease to move UP)
  page2ShadowLeftPercent: 50.0,  // 👈 Shadow Left ↔ Right (default 50.0%)
  page2ShadowWidth: 260,         // 👈 Shadow Width in px
  page2ShadowHeight: 46,         // 👈 Shadow Height in px

  // --- BOTTLE SCALE ---
  scale: 1.0,
};

// =========================================================================
// 🌿 EDGE LEAVES SIZING & POSITION CONFIGURATION
// Adjust top & bottom edge leaves sizes and offsets manually here:
// =========================================================================
export const LEAVES_CONFIG = {
  // --- TOP CANOPY LEAVES (LEFT & RIGHT) ---
  topLeavesWidth: 'clamp(280px, 38vw, 560px)',  // 👈 Width/Size (increase to make leaves larger)
  topLeavesTopOffset: '-38px',                   // 👈 Negative value pushes straight cut edge ABOVE the screen
  topLeavesLeftOffset: '-5px',                  // 👈 Negative value pushes left border OFF-SCREEN
  topLeavesRightOffset: '-5px',                 // 👈 Negative value pushes right border OFF-SCREEN
  topLeavesScale: 1.15,                          // 👈 Scale multiplier (e.g. 1.2 for 20% larger)

  // --- BOTTOM-LEFT LEAVES (left22.png) ---
  bottomLeavesWidth: 'clamp(250px, 35vw, 520px)',
  bottomLeavesBottomOffset: '-5px',             // 👈 Pushes straight bottom edge below the screen
  bottomLeavesLeftOffset: '-5px',
};

// =========================================================================
// 🌸 INGREDIENT CIRCLES CONFIGURATION (PAGE 2 RADIAL ORBIT)
// =========================================================================
export const INGREDIENTS_CONFIG = {
  radiusDesktop: 225,           // 👈 Distance of circles from bottle center (desktop px)
  radiusMobile: 155,            // 👈 Distance of circles from bottle center (mobile px)
  orbitCenterTopPercent: 50.5,  // 👈 Move ALL circles UP ↕ DOWN (decrease to move UP, increase to move DOWN)
  orbitCenterLeftPercent: 50.0, // 👈 Move ALL circles LEFT ↔ RIGHT (decrease to move LEFT, increase to move RIGHT)
};

// 5 Ingredient Badges matching the reference image
export const INGREDIENT_BADGES = [
  {
    id: 'energy',
    angle: -96, // Mid-Left
    title: 'ENERGY & VITALITY',
    subtitle: 'Packed Vitamins, Minerals & Proteins',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M7 20h10" />
        <path d="M10 20c0-4.5 2-8 7-9" />
        <path d="M12 11c-3-3-4-7-4-10 4 0 8 1 9 5" />
        <path d="M12 11c-2 0-5 2-6 5" />
      </svg>
    ),
  },
  {
    id: 'nutrient',
    angle: -48, // Upper-Left
    title: 'NUTRIENT DENSE',
    subtitle: 'Supports immune system health',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M10 2v5.5a2.5 2.5 0 0 1-.5 1.5L5.2 16A3 3 0 0 0 7.7 21h8.6a3 3 0 0 0 2.5-5l-4.3-7a2.5 2.5 0 0 1-.5-1.5V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
        <circle cx="10" cy="18" r="0.8" fill="currentColor" />
        <circle cx="14" cy="18" r="0.8" fill="currentColor" />
        <circle cx="12" cy="15" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'immunity',
    angle: 0, // Crown / Top-Center
    title: 'IMMUNITY BOOST',
    subtitle: '100% Wild Organic Amla',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m13 8-4 5h4l-1 5 4-5h-4l1-5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'antioxidant',
    angle: 48, // Upper-Right
    title: 'ANTIOXIDANT RICH',
    subtitle: 'Fights free radicals & stress',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 22V8" />
        <path d="M12 18c4 0 7-2 7-6-3 0-6 1-7 4" />
        <path d="M12 13c-4 0-7-2-7-6 3 0 6 1 7 4" />
        <path d="M12 8c3-3 4-6 4-7-3 0-6 1-7 4" />
        <path d="M12 8c-3-3-4-6-4-7 3 0 6 1 7 4" />
      </svg>
    ),
  },
  {
    id: 'digestive',
    angle: 96, // Mid-Right
    title: 'DIGESTIVE SUPPORT',
    subtitle: 'Promotes gut health & vitality',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
        <path d="M11 3v17" />
        <path d="M7 10c2 1 3 2 4 4" />
        <path d="M15 10c-2 1-3 2-4 4" />
      </svg>
    ),
  },
];

// =========================================================================
// 🎛️ PAGE 2 HERO CARDS CONFIGURATION (Traditional Drinks & Wellness Drinks)
// Adjust positions, text, offsets, and scale anytime:
// =========================================================================
export const PAGE2_HERO_CARDS_CONFIG = {
  // Left Hero Card (Traditional Drinks -> redirects to Jeera Buttermilk):
  leftCardLeftPercent: 6.5, // Distance from left edge of screen (%)
  leftCardTopPercent: 50.0, // Vertical position from top (%)
  leftCardOffsetY: 0, // Fine-tune up (-) or down (+) in px
  leftTitle: 'TRADITIONAL DRINKS',
  leftParaLine1: 'Heritage recipes slow-churned from organic dairy and wild spices.',
  leftParaLine2: 'Pure probiotic buttermilk and restorative lassis for gut health.',
  leftButtonText: 'EXPLORE NOW',
  leftTargetId: 'page7',
  leftDrinkSlug: 'jeera-buttermilk',

  // Right Hero Card (Wellness Drinks -> redirects to Ginger Shot):
  rightCardRightPercent: 6.5, // Distance from right edge of screen (%)
  rightCardTopPercent: 50.0, // Vertical position from top (%)
  rightCardOffsetY: 0, // Fine-tune up (-) or down (+) in px
  rightTitle: 'WELLNESS DRINKS',
  rightParaLine1: 'Cold-pressed botanical elixirs packed with 20x natural Vitamin C.',
  rightParaLine2: 'Wild forest amla shots engineered for immunity and daily vitality.',
  rightButtonText: 'EXPLORE NOW',
  rightTargetId: 'page8',
  rightDrinkSlug: 'ginger-shot',

  // Shared Card Dimensions & Scale:
  cardMaxWidth: 'clamp(260px, 22vw, 340px)',
  cardScale: 1.0, // Scale of the whole card
  buttonScale: 0.80, // 👈 Button Size Multiplier (e.g. 0.85 for 15% smaller, 0.75 for 25% smaller)
};

interface HeroExperienceProps {
  onExploreProduct?: () => void;
  onAddToCart?: () => void;
  onSelectDrink?: (slug: string) => void;
}

export const HeroExperience: FC<HeroExperienceProps> = ({ onSelectDrink }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const page1Ref = useRef<HTMLDivElement | null>(null);
  const page2Ref = useRef<HTMLDivElement | null>(null);
  const bottleRef = useRef<HTMLDivElement | null>(null);
  const bottleImgRef = useRef<HTMLImageElement | null>(null);
  const rockShadowRef = useRef<HTMLDivElement | null>(null);
  const stoneShadowRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const splashRef = useRef<WaterSplashRef | null>(null);
  const orbitContainerRef = useRef<HTMLDivElement | null>(null);
  const orbitLinesRef = useRef<SVGSVGElement | null>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const leavesLeftScrollRef = useRef<HTMLDivElement | null>(null);
  const leavesLeftIntroRef = useRef<HTMLDivElement | null>(null);
  const leavesLeftRef = useRef<HTMLImageElement | null>(null);

  const leavesRightScrollRef = useRef<HTMLDivElement | null>(null);
  const leavesRightIntroRef = useRef<HTMLDivElement | null>(null);
  const leavesRightRef = useRef<HTMLImageElement | null>(null);

  const leavesBottomLeftScrollRef = useRef<HTMLDivElement | null>(null);
  const leavesBottomLeftIntroRef = useRef<HTMLDivElement | null>(null);
  const leavesBottomLeftRef = useRef<HTMLImageElement | null>(null);

  const page2LeftCardRef = useRef<HTMLDivElement | null>(null);
  const page2RightCardRef = useRef<HTMLDivElement | null>(null);

  const hasTriggeredImpact = useRef(false);

  // Live Position & Shadow Coordinates directly from BOTTLE_CONFIG & INGREDIENTS_CONFIG
  const heroLeft = BOTTLE_CONFIG.heroLeft;
  const heroTopVh = BOTTLE_CONFIG.heroTopVh;
  const page2Left = BOTTLE_CONFIG.page2Left;
  const page2TopVh = BOTTLE_CONFIG.page2TopVh;
  const bottleScale = BOTTLE_CONFIG.scale;
  const page2ShadowTop = BOTTLE_CONFIG.page2ShadowTopPercent;
  const page2ShadowLeft = BOTTLE_CONFIG.page2ShadowLeftPercent;
  const page2ShadowWidth = BOTTLE_CONFIG.page2ShadowWidth;
  const page2ShadowHeight = BOTTLE_CONFIG.page2ShadowHeight;

  // Live Page 2 Hero Cards Config
  const {
    leftCardLeftPercent,
    leftCardTopPercent,
    leftCardOffsetY,
    leftTitle,
    leftParaLine1,
    leftParaLine2,
    leftButtonText,
    leftDrinkSlug,
    rightCardRightPercent,
    rightCardTopPercent,
    rightCardOffsetY,
    rightTitle,
    rightParaLine1,
    rightParaLine2,
    rightButtonText,
    rightDrinkSlug,
    cardMaxWidth,
    cardScale,
    buttonScale,
  } = PAGE2_HERO_CARDS_CONFIG;

  // Redirect handler for Page 2 hero card Explore Now buttons -> Drink Detail Page
  const handleDrinkRedirect = (slug: string) => {
    if (onSelectDrink) {
      onSelectDrink(slug);
    } else {
      window.location.hash = `#/drink/${slug}`;
    }
  };

  // Track live viewport dimensions so bottle landings & scale recalculate cleanly across screens
  const { vw, vh } = useViewportSize();
  const uiScale = getUiScale(vw, vh);
  const isMobile = uiScale.isMobile;

  // Live Orbit Radius (kept at configured px inside the scaled orbit wrapper)
  const ingredientRadius = isMobile
    ? INGREDIENTS_CONFIG.radiusMobile
    : INGREDIENTS_CONFIG.radiusDesktop;
  const orbitCenterTop = INGREDIENTS_CONFIG.orbitCenterTopPercent;
  const orbitCenterLeft = INGREDIENTS_CONFIG.orbitCenterLeftPercent;

  // Compute responsive Hero & Page 2 metrics locked to background2.png / background.png (1672x941, posY=0.40).
  // At user's normal reference screen (1536 x 695), every coordinate & size resolves 1:1 with BOTTLE_CONFIG.
  const normPage2Top = page2TopVh > 100 ? page2TopVh - 100 : page2TopVh;
  const { referenceWidth: refW, referenceHeight: refH, smallScreen } = RESPONSIVE_SCREEN_CONFIG;
  const heroMetrics = (() => {
    const startLeftPct = isMobile ? heroLeft - 3 : heroLeft;
    const startTopVh = isMobile ? heroTopVh + 2 : heroTopVh;
    const targetTopVhMobile = normPage2Top + 1;

    if (isMobile) {
      const bottleHeightPx = Math.min(vh * 0.42, vw * 0.85);
      const bottleWidthPx = bottleHeightPx * (291.84 / 320);
      const heroLeftPx = (startLeftPct / 100) * vw;
      const heroCenterYPx = (startTopVh / 100) * vh;
      const p2FootYPx = ((targetTopVhMobile + 23.02) / 100) * vh;
      const p2CenterYPx = p2FootYPx - bottleHeightPx / 2;
      const p2LeftPx = (page2Left / 100) * vw;
      const mobileScale = Math.min(vw / 420, 0.95);

      return {
        bottleWidthPx,
        bottleHeightPx,
        heroLeftPx,
        heroStartTopInPage2Px: heroCenterYPx - vh,
        p2CenterXPx: p2LeftPx,
        p2CenterYPx,
        deltaXPx: p2LeftPx - heroLeftPx,
        deltaYPx: p2CenterYPx - (heroCenterYPx - vh),
        rockLeftPx: heroLeftPx,
        rockTopPx: ((startTopVh + 21) / 100) * vh,
        rockWidthPx: 200 * mobileScale,
        rockHeightPx: 40 * mobileScale,
        shadowLeftPx: p2LeftPx,
        shadowTopPx: (page2ShadowTop / 100) * vh,
        shadowWidthPx: page2ShadowWidth * mobileScale * 0.8,
        shadowHeightPx: page2ShadowHeight * mobileScale * 0.8,
        orbitLeftPx: (orbitCenterLeft / 100) * vw,
        orbitTopPx: (orbitCenterTop / 100) * vh,
        orbitScale: mobileScale,
        leftCardEdgePercent: smallScreen.minSideEdgePercent,
        rightCardEdgePercent: smallScreen.minSideEdgePercent,
        leftCardScale: cardScale * uiScale.sideCardScale,
        rightCardScale: cardScale * uiScale.sideCardScale,
        cardMaxWidthCss: cardMaxWidth,
        heightScale: uiScale.heightScale,
      };
    }

    // Desktop & laptop viewports (>= 768px): project exact reference points via background cover box (1672x941, center 40%)
    const refHeroX = (heroLeft / 100) * refW;
    const refHeroY = (heroTopVh / 100) * refH;
    const refP2CenterX = (page2Left / 100) * refW;
    const refP2FootY = (normPage2Top / 100) * refH + 160; // At 695px, bottle height is 320px -> half = 160px

    const heroProj = projectCoverPoint(vw, vh, 1672, 941, 0.5, 0.4, refHeroX, refHeroY);
    const p2FootProj = projectCoverPoint(vw, vh, 1672, 941, 0.5, 0.4, refP2CenterX, refP2FootY);
    const rockProj = projectCoverPoint(
      vw,
      vh,
      1672,
      941,
      0.5,
      0.4,
      refHeroX,
      ((heroTopVh + 21) / 100) * refH
    );
    const shadowProj = projectCoverPoint(
      vw,
      vh,
      1672,
      941,
      0.5,
      0.4,
      (page2ShadowLeft / 100) * refW,
      (page2ShadowTop / 100) * refH
    );
    const orbitProj = projectCoverPoint(
      vw,
      vh,
      1672,
      941,
      0.5,
      0.4,
      (orbitCenterLeft / 100) * refW,
      (orbitCenterTop / 100) * refH
    );

    const bgScaleRatio = p2FootProj.scaleRatio; // 1.000 at user's normal 1536 x 695 viewport
    const bottleHeightPx = 320 * bgScaleRatio;
    const bottleWidthPx = 291.84 * bgScaleRatio;

    const clampedHeroX = Math.min(Math.max(heroProj.x, vw * 0.14), vw * 0.88);
    const p2CenterYPx = p2FootProj.y - bottleHeightPx / 2;
    const heroStartTopInPage2Px = heroProj.y - vh;

    // Gentle side card edge adjustment for tighter tablet/small-laptop viewports; preserves 6.5% on normal/large screens
    const edgeInsetPct =
      vw < 1380
        ? smallScreen.minSideEdgePercent +
          ((vw - 768) / (1380 - 768)) *
            (leftCardLeftPercent - smallScreen.minSideEdgePercent)
        : leftCardLeftPercent;
    const rightInsetPct =
      vw < 1380
        ? smallScreen.minSideEdgePercent +
          ((vw - 768) / (1380 - 768)) *
            (rightCardRightPercent - smallScreen.minSideEdgePercent)
        : rightCardRightPercent;

    return {
      bottleWidthPx,
      bottleHeightPx,
      heroLeftPx: clampedHeroX,
      heroStartTopInPage2Px,
      p2CenterXPx: p2FootProj.x,
      p2CenterYPx,
      deltaXPx: p2FootProj.x - clampedHeroX,
      deltaYPx: p2CenterYPx - heroStartTopInPage2Px,
      rockLeftPx: clampedHeroX,
      rockTopPx: rockProj.y,
      rockWidthPx: 280 * bgScaleRatio,
      rockHeightPx: 55 * bgScaleRatio,
      shadowLeftPx: shadowProj.x,
      shadowTopPx: shadowProj.y,
      shadowWidthPx: page2ShadowWidth * bgScaleRatio,
      shadowHeightPx: page2ShadowHeight * bgScaleRatio,
      orbitLeftPx: orbitProj.x,
      orbitTopPx: orbitProj.y,
      orbitScale: bgScaleRatio,
      leftCardEdgePercent: edgeInsetPct,
      rightCardEdgePercent: rightInsetPct,
      leftCardScale: cardScale * uiScale.sideCardScale,
      rightCardScale: cardScale * uiScale.sideCardScale,
      cardMaxWidthCss:
        uiScale.isLargeScreen ? `calc(${cardMaxWidth} * ${uiScale.sideCardScale})` : cardMaxWidth,
      heightScale: uiScale.heightScale,
    };
  })();

  // Precalculate badge radial coordinates around center (0, 0)
  const badgeCoordinates = INGREDIENT_BADGES.map((b) => {
    const rad = (b.angle * Math.PI) / 180;
    return {
      x: Math.round(ingredientRadius * Math.sin(rad)),
      y: Math.round(-ingredientRadius * Math.cos(rad)),
    };
  });

  // SVG Arc Path from -82° to +82° around radius
  const arcRadStart = (-82 * Math.PI) / 180;
  const arcRadEnd = (82 * Math.PI) / 180;
  const arcStartX = Math.round(ingredientRadius * Math.sin(arcRadStart));
  const arcStartY = Math.round(-ingredientRadius * Math.cos(arcRadStart));
  const arcEndX = Math.round(ingredientRadius * Math.sin(arcRadEnd));
  const arcEndY = Math.round(-ingredientRadius * Math.cos(arcRadEnd));
  const arcPathD = `M ${arcStartX} ${arcStartY} A ${ingredientRadius} ${ingredientRadius} 0 0 1 ${arcEndX} ${arcEndY}`;

  const lenisRef = useRef<Lenis | null>(null);

  // 1. Mount-only Lenis momentum scroll so resizes never tear down scroll smoothing
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if ((window as unknown as { __lenis?: Lenis }).__lenis === lenis) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  useEffect(() => {
    const page1 = page1Ref.current;
    const page2 = page2Ref.current;
    const bottle = bottleRef.current;
    const bottleImg = bottleImgRef.current;
    const rockShadow = rockShadowRef.current;
    const stoneShadow = stoneShadowRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const leavesLeftScroll = leavesLeftScrollRef.current;
    const leavesLeftIntro = leavesLeftIntroRef.current;
    const leavesLeft = leavesLeftRef.current;

    const leavesRightScroll = leavesRightScrollRef.current;
    const leavesRightIntro = leavesRightIntroRef.current;
    const leavesRight = leavesRightRef.current;

    const leavesBottomLeftScroll = leavesBottomLeftScrollRef.current;
    const leavesBottomLeftIntro = leavesBottomLeftIntroRef.current;
    const leavesBottomLeft = leavesBottomLeftRef.current;

    if (!page1 || !page2 || !bottle || !bottleImg) return;

    const ctx = gsap.context(() => {
    // Initial base placement projected cleanly from Page 1 -> Page 2 landmarks
    gsap.set(bottle, {
      left: heroMetrics.heroLeftPx,
      top: heroMetrics.heroStartTopInPage2Px,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      transformOrigin: '50% 90%',
      force3D: true,
    });

    gsap.set(bottleImg, {
      scale: (isMobile ? 0.85 : 0.98) * bottleScale,
      transformOrigin: '50% 90%',
      force3D: true,
    });

    if (rockShadow) {
      gsap.set(rockShadow, {
        left: heroMetrics.rockLeftPx,
        top: heroMetrics.rockTopPx,
        opacity: 0.85,
        force3D: true,
      });
    }

    gsap.set(stoneShadow, {
      left: heroMetrics.shadowLeftPx,
      opacity: 0.05,
      scale: 0.4,
      force3D: true,
    });

    // Initial state for orbit lines and ingredient badge nodes
    if (orbitLinesRef.current) {
      gsap.set(orbitLinesRef.current, {
        scale: 0.2,
        opacity: 0,
        rotation: -45,
        transformOrigin: '50% 50%',
        force3D: true,
      });
    }

    badgeRefs.current.forEach((badge) => {
      if (badge) {
        gsap.set(badge, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          rotation: -100,
          force3D: true,
        });
      }
    });

    // 🌿 Page Open Intro Animation: Leaves slide in strictly HORIZONTALLY from the sides
    if (leavesLeftIntro && leavesRightIntro) {
      gsap.fromTo(
        leavesLeftIntro,
        { xPercent: -105, y: 0, opacity: 1 },
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      gsap.fromTo(
        leavesRightIntro,
        { xPercent: 105, y: 0, opacity: 1 },
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.22,
        }
      );
    }

    if (leavesBottomLeftIntro) {
      gsap.fromTo(
        leavesBottomLeftIntro,
        { xPercent: -105, y: 0, opacity: 1 },
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.16,
        }
      );
    }

    // 🍃 Ambient Natural Foliage Floating & Swaying Breeze
    if (leavesLeft && leavesRight) {
      gsap.to(leavesLeft, {
        rotation: 2.2,
        y: 8,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(leavesRight, {
        rotation: -2.2,
        y: 8,
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    if (leavesBottomLeft) {
      gsap.to(leavesBottomLeft, {
        rotation: 1.6,
        y: -6,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // =========================================================================
    // 🎬 TIMELINE 1: BOTTLE FALL & LANDING (Page 1 -> Page 2)
    // Runs as user scrolls through Page 1 (scrollY: 0 -> 100vh)
    // Leaves slide away, bottle plunges parabolically, impacts stone platform,
    // squashes, splashes, rebounds, and settles!
    // =========================================================================
    const tlFall = gsap.timeline({
      scrollTrigger: {
        trigger: page1,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.4,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Impact triggered when bottle touches down on the stone platform
          if (progress >= 0.82 && progress <= 0.99) {
            if (!hasTriggeredImpact.current && self.direction > 0) {
              hasTriggeredImpact.current = true;
              soundFx.playImpact();
              if (splashRef.current && page2) {
                const rect = page2.getBoundingClientRect();
                splashRef.current.trigger(
                  rect.width * 0.5,
                  rect.height * (isMobile ? 0.72 : 0.70)
                );
              }
            }
          } else if (progress < 0.65) {
            hasTriggeredImpact.current = false;
          }
        },
      },
    });

    // Fade out scroll indicator and rock shadow at start
    tlFall
      .to(
        scrollIndicator,
        {
          opacity: 0,
          y: 20,
          duration: 0.08,
          ease: 'power1.out',
        },
        0
      )
      .to(
        rockShadow,
        {
          opacity: 0,
          scale: 0.4,
          duration: 0.22,
          ease: 'power1.out',
        },
        0
      );

    // Leaves slide away strictly HORIZONTALLY on scroll down
    if (leavesLeftScroll && leavesRightScroll) {
      tlFall
        .to(
          leavesLeftScroll,
          {
            xPercent: -105,
            y: 0,
            duration: 0.45,
            ease: 'power1.inOut',
          },
          0
        )
        .to(
          leavesRightScroll,
          {
            xPercent: 105,
            y: 0,
            duration: 0.45,
            ease: 'power1.inOut',
          },
          0
        );
    }

    if (leavesBottomLeftScroll) {
      tlFall.to(
        leavesBottomLeftScroll,
        {
          xPercent: -105,
          y: 0,
          duration: 0.45,
          ease: 'power1.inOut',
        },
        0
      );
    }

    // Parabolic Fall from Page 1 rock to Page 2 stone platform
    tlFall
      .to(
        bottle,
        {
          x: heroMetrics.deltaXPx,
          duration: 0.84,
          ease: 'sine.inOut',
        },
        0
      )
      .to(
        bottle,
        {
          y: heroMetrics.deltaYPx,
          duration: 0.84,
          ease: 'power2.in',
        },
        0
      )
      // Aerodynamic stretch as gravity accelerates the bottle down
      .to(
        bottleImg,
        {
          scaleY: 1.05 * bottleScale,
          scaleX: 0.96 * bottleScale,
          duration: 0.84,
          ease: 'power1.in',
        },
        0
      )
      // Stone contact shadow darkens and tightens as bottle approaches
      .to(
        stoneShadow,
        {
          opacity: 0.85,
          scale: 1.0,
          duration: 0.35,
          ease: 'power2.in',
        },
        0.48
      );

    // Impact squash at 0.84
    tlFall
      .to(
        bottleImg,
        {
          scaleY: 0.88 * bottleScale,
          scaleX: 1.14 * bottleScale,
          y: 14,
          duration: 0.04,
          ease: 'power4.in',
        },
        0.84
      )
      .to(
        stoneShadow,
        {
          scaleX: 1.25,
          scaleY: 0.9,
          opacity: 1,
          duration: 0.04,
          ease: 'power4.in',
        },
        0.84
      )
      // Elastic rebound bounce
      .to(
        bottleImg,
        {
          scaleY: 1.04 * bottleScale,
          scaleX: 0.97 * bottleScale,
          y: -14,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.88
      )
      .to(
        stoneShadow,
        {
          scaleX: 0.95,
          scaleY: 0.95,
          opacity: 0.7,
          duration: 0.05,
          ease: 'power2.out',
        },
        0.88
      )
      // Final settle at 0.93
      .to(
        bottleImg,
        {
          scaleY: 1.0 * bottleScale,
          scaleX: 1.0 * bottleScale,
          y: 0,
          duration: 0.04,
          ease: 'bounce.out',
        },
        0.93
      )
      .to(
        stoneShadow,
        {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.92,
          duration: 0.04,
          ease: 'power2.out',
        },
        0.93
      );

    // =========================================================================
    // 🎬 TIMELINE 2: PAGE 2 LOCK & ROTATING INGREDIENT CIRCLES EMERGENCE
    // When Page 2 reaches the top of the viewport, LOCK (PIN) it securely!
    // Bottle remains 100% still on stone platform.
    // 5 Circles rotate and blossom out from behind the bottle on further scroll!
    // Page remains locked until all 5 circles finish and settle completely.
    // Once complete, the pin unlocks and normal scroll takes you to Page 3!
    // =========================================================================
    const tlCircles = gsap.timeline({
      scrollTrigger: {
        trigger: page2,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: 0.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        refreshPriority: 9,
      },
    });

    if (orbitLinesRef.current) {
      tlCircles.to(
        orbitLinesRef.current,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.05
      );
    }

    const staggerStarts = [0.05, 0.1, 0.15, 0.2, 0.25];
    badgeCoordinates.forEach((coord, i) => {
      const badge = badgeRefs.current[i];
      if (badge) {
        tlCircles.to(
          badge,
          {
            x: coord.x,
            y: coord.y,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.28,
            ease: 'back.out(1.2)',
          },
          staggerStarts[i]
        );
      }
    });

    // 🍃 Left & Right Hero Cards Emergence on Page 2
    if (page2LeftCardRef.current) {
      gsap.set(page2LeftCardRef.current, { x: -45, opacity: 0, force3D: true });
      tlCircles.to(
        page2LeftCardRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.12
      );
    }

    if (page2RightCardRef.current) {
      gsap.set(page2RightCardRef.current, { x: 45, opacity: 0, force3D: true });
      tlCircles.to(
        page2RightCardRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.12
      );
    }

    // 🛑 SOLID RESTING HOLD: From 0.53 to 1.0 of the pin, everything is 100% settled & locked!
    // The user has ample scroll distance to view the completed beauty shot.
    // Only after scrolling past 1.0 does the page unpin and normally scroll to Page 3!
    tlCircles.to({}, { duration: 0.47 }, 0.53);
    }, trackRef);

    // Defer global sort + refresh until all sibling sections (Page 4-9) have mounted cleanly
    const syncTriggers = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      lenisRef.current?.resize();
      lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
      ScrollTrigger.update();
    };
    const refreshRafId = requestAnimationFrame(syncTriggers);
    const handleWindowLoad = () => syncTriggers();
    window.addEventListener('load', handleWindowLoad);

    return () => {
      cancelAnimationFrame(refreshRafId);
      window.removeEventListener('load', handleWindowLoad);
      ctx.revert();
    };
  }, [
    vw,
    vh,
    heroLeft,
    heroTopVh,
    page2Left,
    page2TopVh,
    bottleScale,
    page2ShadowTop,
    page2ShadowLeft,
    page2ShadowWidth,
    page2ShadowHeight,
    ingredientRadius,
    orbitCenterTop,
    orbitCenterLeft,
  ]);

  return (
    <div ref={trackRef} className="relative w-full bg-[#07120a]">
      {/* ======================================================== */}
      {/* PAGE 1: HOME / HERO PAGE (100vh) */}
      {/* ======================================================== */}
      <section
        ref={page1Ref}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundPosition: 'center 40%',
          }}
        >
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* 1. Behind: Bottom-Left Edge Foliage (left22.png) - Sits behind top-left leaves */}
          <div
            ref={leavesBottomLeftScrollRef}
            className="absolute z-12 pointer-events-none select-none will-change-transform"
            style={{
              bottom: LEAVES_CONFIG.bottomLeavesBottomOffset,
              left: LEAVES_CONFIG.bottomLeavesLeftOffset,
              width: LEAVES_CONFIG.bottomLeavesWidth,
              height: 'auto',
            }}
          >
            <div
              ref={leavesBottomLeftIntroRef}
              className="w-full h-auto will-change-transform"
            >
              <img
                ref={leavesBottomLeftRef}
                src="/left22.png"
                alt="Rainforest Leaves Bottom Left"
                className="w-full h-auto filter drop-shadow-[0_-12px_24px_rgba(0,0,0,0.55)] will-change-transform"
                style={{ transformOrigin: 'bottom left' }}
              />
            </div>
          </div>

          {/* 2. In Front: Top-Left Hanging Edge Leaves (leaves-left.png) */}
          <div
            ref={leavesLeftScrollRef}
            className="absolute z-16 pointer-events-none select-none will-change-transform"
            style={{
              top: LEAVES_CONFIG.topLeavesTopOffset,
              left: LEAVES_CONFIG.topLeavesLeftOffset,
              width: LEAVES_CONFIG.topLeavesWidth,
              height: 'auto',
            }}
          >
            <div
              ref={leavesLeftIntroRef}
              className="w-full h-auto will-change-transform"
            >
              <img
                ref={leavesLeftRef}
                src="/leaves-left.png"
                alt="Rainforest Leaves Top Left"
                className="w-full h-auto filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] will-change-transform"
                style={{
                  transformOrigin: 'top left',
                  transform: `scale(${LEAVES_CONFIG.topLeavesScale})`,
                }}
              />
            </div>
          </div>

          {/* 3. Top-Right Hanging Edge Leaves */}
          <div
            ref={leavesRightScrollRef}
            className="absolute z-16 pointer-events-none select-none will-change-transform"
            style={{
              top: LEAVES_CONFIG.topLeavesTopOffset,
              right: LEAVES_CONFIG.topLeavesRightOffset,
              width: LEAVES_CONFIG.topLeavesWidth,
              height: 'auto',
            }}
          >
            <div
              ref={leavesRightIntroRef}
              className="w-full h-auto will-change-transform"
            >
              <img
                ref={leavesRightRef}
                src="/leaves-right.png"
                alt="Rainforest Leaves Top Right"
                className="w-full h-auto filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] will-change-transform"
                style={{
                  transformOrigin: 'top right',
                  transform: `scale(${LEAVES_CONFIG.topLeavesScale})`,
                }}
              />
            </div>
          </div>

          {/* Rock Shadow (on Page 1 beneath the bottle on the right rock) */}
          <div
            ref={rockShadowRef}
            className="absolute pointer-events-none z-10 will-change-transform"
            style={{
              left: `${heroMetrics.rockLeftPx}px`,
              top: `${heroMetrics.rockTopPx}px`,
              width: `${heroMetrics.rockWidthPx}px`,
              height: `${heroMetrics.rockHeightPx}px`,
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(ellipse at center, rgba(3, 10, 5, 0.9) 0%, rgba(3, 10, 5, 0.45) 45%, transparent 75%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Animated Scroll Mouse Logo */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
          >
            <div className="w-6 h-10 rounded-full border-2 border-lime-400/60 flex items-start justify-center p-1.5 shadow-lg shadow-lime-400/20 bg-black/40 backdrop-blur-md">
              <div className="w-1.5 h-2.5 rounded-full bg-lime-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PAGE 2: PINNED ON SCROLL (100vh)                         */}
      {/* Contains stone platform, circles (z-20), and bottle (z-30)*/}
      {/* ======================================================== */}
      <section
        ref={page2Ref}
        className="relative w-full h-screen flex items-center justify-center select-none z-20"
      >
        {/* Background & Shadow Container (strictly clipped to 100vh) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/background2.png')",
              backgroundPosition: 'center 40%',
            }}
          >
            {/* Subtle nature lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* Stone Platform Contact Shadow */}
            <div
              ref={stoneShadowRef}
              className="absolute pointer-events-none z-10 will-change-transform"
              style={{
                left: `${heroMetrics.shadowLeftPx}px`,
                top: `${heroMetrics.shadowTopPx}px`,
                width: `${heroMetrics.shadowWidthPx}px`,
                height: `${heroMetrics.shadowHeightPx}px`,
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(ellipse at center, rgba(1, 8, 3, 0.95) 0%, rgba(5, 18, 8, 0.6) 45%, transparent 75%)',
                filter: 'blur(8px)',
              }}
            />

            {/* Water Splash & Ripple Canvas */}
            <WaterSplashEffect ref={splashRef} />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 🌸 INGREDIENT CIRCLES ORBIT (Layer z-20: Behind bottle z-30) */}
        {/* ======================================================== */}
        <div
          ref={orbitContainerRef}
          className="absolute z-20 pointer-events-none select-none will-change-transform"
          style={{
            left: `${heroMetrics.orbitLeftPx}px`,
            top: `${heroMetrics.orbitTopPx}px`,
            width: 0,
            height: 0,
          }}
        >
          <div
            style={{
              transform: `scale(${heroMetrics.orbitScale})`,
              transformOrigin: '0 0',
            }}
          >
          {/* SVG Connecting Arc & Spoke Lines */}
          <svg
            ref={orbitLinesRef}
            className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none will-change-transform"
            style={{
              width: `${ingredientRadius * 2.4}px`,
              height: `${ingredientRadius * 2.4}px`,
              left: 0,
              top: 0,
            }}
            viewBox={`-${ingredientRadius * 1.2} -${ingredientRadius * 1.2} ${ingredientRadius * 2.4} ${ingredientRadius * 2.4}`}
          >
            <defs>
              <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#a3e635" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2" />
              </linearGradient>
              <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Semicircular Connecting Arc Path */}
            <path
              d={arcPathD}
              fill="none"
              stroke="url(#arcGlow)"
              strokeWidth="1.75"
              strokeDasharray="5 5"
              filter="url(#emeraldGlow)"
            />

            {/* 5 Radial Spoke Lines */}
            {badgeCoordinates.map((coord, i) => (
              <g key={`spoke-${i}`}>
                <line
                  x1={0}
                  y1={0}
                  x2={coord.x}
                  y2={coord.y}
                  stroke="rgba(163, 230, 53, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="3.5"
                  fill="#a3e635"
                  filter="url(#emeraldGlow)"
                />
              </g>
            ))}
          </svg>

          {/* 5 Circular Ingredient Badges */}
          {INGREDIENT_BADGES.map((badge, idx) => (
            <div
              key={badge.id}
              ref={(el) => {
                badgeRefs.current[idx] = el;
              }}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto select-none will-change-transform"
            >
              <div className="relative w-[92px] h-[92px] md:w-[108px] md:h-[108px] rounded-full p-[2.5px] bg-gradient-to-b from-lime-400/90 via-emerald-500/40 to-lime-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.75),0_0_24px_rgba(163,230,53,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(163,230,53,0.6)] cursor-pointer group">
                <div className="w-full h-full rounded-full bg-[#051409]/95 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center px-2 py-1 text-center">
                  <div className="w-6 h-6 md:w-7 md:h-7 text-lime-400 mb-0.5 group-hover:scale-110 group-hover:text-lime-300 transition-transform">
                    {badge.icon()}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-white leading-tight">
                    {badge.title}
                  </span>
                </div>
              </div>
              <p className="mt-1.5 text-[8px] md:text-[9.5px] font-medium text-emerald-200/90 text-center max-w-[125px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {badge.subtitle}
              </p>
            </div>
          ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* THE TRAVELING BOTTLE (Layer z-30: In front of circles)  */}
        {/* Starts at Page 1 rock and lands cleanly on Page 2 stone */}
        {/* ======================================================== */}
        <div
          ref={bottleRef}
          className="absolute z-30 pointer-events-none will-change-transform"
          style={{
            width: `${heroMetrics.bottleWidthPx}px`,
            height: `${heroMetrics.bottleHeightPx}px`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              ref={bottleImgRef}
              src="/bottle.png"
              alt="Shake & Gulp AMLA SHOT Bottle"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] select-none pointer-events-none will-change-transform"
              draggable={false}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 🍃 LEFT HERO CARD: TRADITIONAL DRINKS -> JEERA BUTTERMILK */}
        {/* ======================================================== */}
        <div
          ref={page2LeftCardRef}
          className="absolute z-40 hidden md:flex flex-col items-start text-left -translate-y-1/2 pointer-events-auto select-none"
          style={{
            left: `${heroMetrics.leftCardEdgePercent}%`,
            top: `calc(${leftCardTopPercent}% + ${leftCardOffsetY * heroMetrics.heightScale}px)`,
            maxWidth: heroMetrics.cardMaxWidthCss,
          }}
        >
          <div
            className="flex flex-col items-start text-left"
            style={{
              transform: `scale(${heroMetrics.leftCardScale})`,
              transformOrigin: 'left center',
            }}
          >
          {/* Eyebrow Tag */}
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-lime-400 mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Heritage Botanicals
          </span>

          {/* Hero Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-2">
            {leftTitle}
          </h3>

          {/* Glowing Accent Line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-lime-400 via-emerald-300 to-transparent mb-3.5 shadow-[0_0_12px_rgba(163,230,53,0.9)]" />

          {/* 2-Line Paragraph */}
          <div className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-5">
            <p>{leftParaLine1}</p>
            <p className="mt-1 text-emerald-200/80">{leftParaLine2}</p>
          </div>

          {/* Fully Transparent Square Button with White Edge Line & Exclamation Animation */}
          <div
            className="relative group"
            style={{
              transform: `scale(${buttonScale})`,
              transformOrigin: 'left center',
            }}
          >
            {/* Square Outer Pulsing Halo */}
            <div className="absolute -inset-1 border border-white/40 animate-pulse blur-xs pointer-events-none" />
            <div
              className="absolute -inset-2.5 border border-white/20 animate-ping opacity-25 pointer-events-none"
              style={{ animationDuration: '3s' }}
            />

            <button
              onClick={() => handleDrinkRedirect(leftDrinkSlug)}
              className="relative px-7 sm:px-9 py-3 sm:py-3.5 bg-transparent border-2 border-white rounded-none text-white font-black tracking-[0.22em] text-xs sm:text-sm uppercase cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.85)] active:scale-95 flex items-center gap-2.5 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            >
              {/* Shimmer Sheen Sweep on Hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="relative z-10">{leftButtonText}</span>

              {/* Animated Bouncing Exclamation Mark */}
              <span className="relative z-10 inline-flex items-center justify-center">
                <span
                  className="inline-block font-black text-lime-400 group-hover:text-black animate-bounce text-sm sm:text-base drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]"
                  style={{ animationDuration: '0.8s' }}
                >
                  !
                </span>
              </span>

              <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2.5]"
              />
            </button>
          </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 🌿 RIGHT HERO CARD: WELLNESS DRINKS -> GINGER SHOT       */}
        {/* ======================================================== */}
        <div
          ref={page2RightCardRef}
          className="absolute z-40 hidden md:flex flex-col items-end text-right -translate-y-1/2 pointer-events-auto select-none"
          style={{
            right: `${heroMetrics.rightCardEdgePercent}%`,
            top: `calc(${rightCardTopPercent}% + ${rightCardOffsetY * heroMetrics.heightScale}px)`,
            maxWidth: heroMetrics.cardMaxWidthCss,
          }}
        >
          <div
            className="flex flex-col items-end text-right"
            style={{
              transform: `scale(${heroMetrics.rightCardScale})`,
              transformOrigin: 'right center',
            }}
          >
          {/* Eyebrow Tag */}
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-lime-400 mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Potent Elixirs
          </span>

          {/* Hero Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-2">
            {rightTitle}
          </h3>

          {/* Glowing Accent Line */}
          <div className="w-16 h-0.5 bg-gradient-to-l from-lime-400 via-emerald-300 to-transparent ml-auto mb-3.5 shadow-[0_0_12px_rgba(163,230,53,0.9)]" />

          {/* 2-Line Paragraph */}
          <div className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mb-5">
            <p>{rightParaLine1}</p>
            <p className="mt-1 text-emerald-200/80">{rightParaLine2}</p>
          </div>

          {/* Fully Transparent Square Button with White Edge Line & Exclamation Animation */}
          <div
            className="relative group"
            style={{
              transform: `scale(${buttonScale})`,
              transformOrigin: 'right center',
            }}
          >
            {/* Square Outer Pulsing Halo */}
            <div className="absolute -inset-1 border border-white/40 animate-pulse blur-xs pointer-events-none" />
            <div
              className="absolute -inset-2.5 border border-white/20 animate-ping opacity-25 pointer-events-none"
              style={{ animationDuration: '3s' }}
            />

            <button
              onClick={() => handleDrinkRedirect(rightDrinkSlug)}
              className="relative px-7 sm:px-9 py-3 sm:py-3.5 bg-transparent border-2 border-white rounded-none text-white font-black tracking-[0.22em] text-xs sm:text-sm uppercase cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.85)] active:scale-95 flex items-center gap-2.5 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            >
              {/* Shimmer Sheen Sweep on Hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="relative z-10">{rightButtonText}</span>

              {/* Animated Bouncing Exclamation Mark */}
              <span className="relative z-10 inline-flex items-center justify-center">
                <span
                  className="inline-block font-black text-lime-400 group-hover:text-black animate-bounce text-sm sm:text-base drop-shadow-[0_0_8px_rgba(163,230,53,0.9)]"
                  style={{ animationDuration: '0.8s' }}
                >
                  !
                </span>
              </span>

              <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2.5]"
              />
            </button>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};