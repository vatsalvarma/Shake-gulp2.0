import { useEffect, useState } from 'react';

// =========================================================================
// 📐 RESPONSIVE SCREEN CONFIG & LANDMARK PROJECTION
// Keeps the user's normal screen (1536 × 695) 100% unchanged while locking
// bottle landings cleanly on smaller screens and larger / zoomed-out screens.
// =========================================================================

export const RESPONSIVE_SCREEN_CONFIG = {
  // Normal Reference Screen (exact viewport where all existing configs look ideal):
  referenceWidth: 1536,
  referenceHeight: 695,

  // Small Screen Guardrail Bounds (laptops < 1380px wide or < 670px tall):
  smallScreen: {
    minUiScale: 0.72,
    minSideCardScale: 0.76,
    maxSideEdgePercent: 6.5,
    minSideEdgePercent: 3.5,
  },

  // Large Screen / High-DPI / 4K / Zoomed-Out Guardrail Bounds (> 1650px wide or > 780px tall):
  largeScreen: {
    maxUiScale: 1.75,
    maxSideCardScale: 1.65,
  },

  // Page 6 Metal Rack Surface Position inside bg6.png (0.0 = top edge, 1.0 = bottom edge):
  // Places the bottle foot squarely on the bottom metal wire rack between the mint leaves.
  page6MetalRack: {
    rackSurfaceYRatio: 0.932,
    referenceLandingY: 95, // Baseline PAGE6_BOTTLE_LANDING.y before relative nudges
  },
} as const;

export interface CoverBox {
  scale: number;
  renderedW: number;
  renderedH: number;
  offsetX: number;
  offsetY: number;
}

/**
 * Computes the exact pixel rectangle that a `bg-cover` / `object-cover`
 * background image occupies inside a `(vw × vh)` viewport.
 */
export function getCoverBox(
  vw: number,
  vh: number,
  imgW: number,
  imgH: number,
  posX: number = 0.5,
  posY: number = 0.5
): CoverBox {
  const scale = Math.max(vw / imgW, vh / imgH);
  const renderedW = imgW * scale;
  const renderedH = imgH * scale;
  return {
    scale,
    renderedW,
    renderedH,
    offsetX: (vw - renderedW) * posX,
    offsetY: (vh - renderedH) * posY,
  };
}

/**
 * Projects a pixel coordinate tuned at the normal screen (1536 × 695)
 * through the background image's natural coordinate space onto ANY viewport `(vw × vh)`.
 * At (vw = 1536, vh = 695), this returns `(refViewportX, refViewportY)` identically.
 */
export function projectCoverPoint(
  vw: number,
  vh: number,
  imgW: number,
  imgH: number,
  posX: number,
  posY: number,
  refViewportX: number,
  refViewportY: number
): { x: number; y: number; scaleRatio: number; box: CoverBox } {
  const { referenceWidth, referenceHeight } = RESPONSIVE_SCREEN_CONFIG;
  const refBox = getCoverBox(referenceWidth, referenceHeight, imgW, imgH, posX, posY);
  const curBox = getCoverBox(vw, vh, imgW, imgH, posX, posY);

  // Convert normal-screen coordinate into normalized image coordinate (source pixels)
  const imgX = (refViewportX - refBox.offsetX) / refBox.scale;
  const imgY = (refViewportY - refBox.offsetY) / refBox.scale;

  // Project back onto the active viewport
  const x = curBox.offsetX + imgX * curBox.scale;
  const y = curBox.offsetY + imgY * curBox.scale;

  return {
    x,
    y,
    scaleRatio: curBox.scale / refBox.scale,
    box: curBox,
  };
}

/**
 * Smooth UI scale multiplier clamped cleanly for small & large screens,
 * returning 1.0 on the normal reference screen (1536 × 695).
 */
export function getUiScale(vw: number, vh: number): {
  widthScale: number;
  heightScale: number;
  sideCardScale: number;
  isSmallScreen: boolean;
  isLargeScreen: boolean;
  isMobile: boolean;
} {
  const { referenceWidth, referenceHeight, smallScreen, largeScreen } = RESPONSIVE_SCREEN_CONFIG;
  const rawW = vw / referenceWidth;
  const rawH = vh / referenceHeight;

  const isMobile = vw < 768;
  const isSmallScreen = !isMobile && (vw < 1380 || vh < 660);
  const isLargeScreen = vw > 1680 || vh > 780;

  const widthScale = Math.min(Math.max(rawW, smallScreen.minUiScale), largeScreen.maxUiScale);
  const heightScale = Math.min(Math.max(rawH, smallScreen.minUiScale), largeScreen.maxUiScale);
  const sideCardScale = Math.min(
    Math.max(rawW, smallScreen.minSideCardScale),
    largeScreen.maxSideCardScale
  );

  return {
    widthScale,
    heightScale,
    sideCardScale,
    isSmallScreen,
    isLargeScreen,
    isMobile,
  };
}

/**
 * React hook returning live viewport dimensions (debounced on resize)
 * so ScrollTrigger & cover-projected landmarks stay synchronized cleanly.
 */
export function useViewportSize(delayMs: number = 120): { vw: number; vh: number } {
  const [viewport, setViewport] = useState<{ vw: number; vh: number }>(() =>
    typeof window !== 'undefined'
      ? { vw: window.innerWidth, vh: window.innerHeight }
      : {
          vw: RESPONSIVE_SCREEN_CONFIG.referenceWidth,
          vh: RESPONSIVE_SCREEN_CONFIG.referenceHeight,
        }
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setViewport({ vw: window.innerWidth, vh: window.innerHeight });
      }, delayMs);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [delayMs]);

  return viewport;
}
