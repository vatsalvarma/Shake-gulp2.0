import { type FC } from 'react';

// =========================================================================
// 🎛️ PAGE 6 CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const PAGE6_CONFIG = {
  // 1. Move Page 6 UP (in px) - set to 0 so it doesn't overlap or shorten Page 5:
  movePage6Up: 0,

  // 2. Image Fit:
  //    'cover'   = fills screen edge-to-edge seamlessly
  //    'contain' = fits full image inside viewport
  bgFit: 'cover' as 'contain' | 'cover',

  // 3. Zoom Scale:
  bgScale: 1.0,

  // 4. Vertical Anchor / Alignment:
  bgPosition: 'top' as 'center' | 'top' | 'bottom',

  // 5. Fine-tune Up ↕ Down position of the image inside Page 6 (in px):
  bgOffsetY: 0,
};

// =========================================================================
// 🍾 PAGE 6 BOTTLE LANDING POSITION (Center of Fridge Shelf)
// Adjust these coordinates to position the large bottle on the fridge rack:
// =========================================================================
export const PAGE6_BOTTLE_LANDING = {
  x: 10,         // 👈 Center horizontally on the fridge shelf in px from center
  y: 95,         // 👈 Vertical position in px from center (rests on bottom metal rack)
  scale: 0.78,   // 👈 Large bottle size in foreground (matching reference photo)
  tilt: 0.0,     // 👈 Upright angle in degrees
};

// =========================================================================
// 🌙 ROUTE: PAGE 5 TO PAGE 6 CURVED SWOOP & ANGLES (Matches Hand-Drawn Sketch)
// =========================================================================
export const ROUTE_5_TO_6_CONFIG = {
  rightSwoopOffset: 65,  // 👈 How far right it hugs along the right side when leaving her hand (in px)
  exitHandAngle: -10.0,  // 👈 Angle leaving girl's hand down the right flank (-15° to -5°)
  midwayDiveAngle: 40.0, // 👈 Angle midway down curve into Page 6 (+35° to +45°, cap top-right)
  arcBowX: 0,            // 👈 Backward compatibility
};

export const PAGE5_TO_6_CURVE = ROUTE_5_TO_6_CONFIG;

// =========================================================================
// 🧊 PAGE 6 "WHY US" CONTENT & POSITIONING (Adjust Manually Here)
// =========================================================================
export const PAGE6_CONTENT = {
  badge: 'THE SHAKE & GULP PROMISE',
  title: 'WHY US',

  // 👈 Left Side Item 1 (Slides from Left):
  leftItem1Title: 'SLOW-CHURNED PURITY',
  leftItem1Para:
    'Churned fresh from authentic probiotic farm curd with zero synthetic stabilizers, chemical additives, or refined sugars.',

  // 👈 Left Side Item 2 (Slides from Left):
  leftItem2Title: 'GUT HEALTH & DIGESTION',
  leftItem2Para:
    'Infused with roasted mountain cumin and cooling mint to stimulate natural digestive enzymes and ease bloating after meals.',

  // 👉 Right Side Item 1 (Slides from Right):
  rightItem1Title: 'COLD-PRESSED VITALITY',
  rightItem1Para:
    'Botanical ginger, raw forest amla, and Himalayan rock salt deliver unmatched natural electrolytes and immune defense.',

  // 👉 Right Side Item 2 (Slides from Right):
  rightItem2Title: 'UNCOMPROMISED FRESHNESS',
  rightItem2Para:
    'No artificial shelf-life extenders. Pure, raw, and honest: Shake well, gulp fresh, and nourish your body naturally.',

  // Fine-tuning offsets:
  offsetX: 0,
  offsetY: 0,
};

export const Page6Section: FC = () => {
  const { movePage6Up, bgFit, bgScale, bgPosition, bgOffsetY } = PAGE6_CONFIG;

  const positionClass =
    bgPosition === 'top'
      ? 'object-top'
      : bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const fitClass = bgFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <section
      id="page6"
      className="relative z-10 w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black transition-all duration-150"
      style={{
        marginTop: `-${movePage6Up}px`,
      }}
    >
      {/* ========================================================================= */}
      {/* 🌲 RAW BACKGROUND IMAGE (bg6.png) - NO TEXT, NO OVERLAYS, NO BLUR         */}
      {/* ========================================================================= */}
      <img
        src="/bg6.png"
        alt="Page 6 Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-100 ${fitClass} ${positionClass}`}
        style={{
          transform: `translateY(${bgOffsetY}px) scale(${bgScale})`,
          transformOrigin: bgPosition === 'top' ? 'top center' : 'center center',
        }}
      />
    </section>
  );
};
