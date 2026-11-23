import { type FC } from 'react';

// =========================================================================
// 🎛️ PAGE 5 CONFIGURATION (Adjust Manually Here)
// =========================================================================
export const PAGE5_CONFIG = {
  // 1. Image Fit:
  //    'cover'   = fills full 100vh height and screen edge-to-edge properly!
  //    'contain' = fits entire uncropped image
  bgFit: 'cover' as 'contain' | 'cover',

  // 2. Zoom Scale:
  //    1.0 = standard 100vh fit, 0.95 = slightly zoomed out, 1.05 = slightly zoomed in
  bgScale: 1.0,

  // 3. Vertical Anchor / Alignment:
  //    'top' = anchors her hair to the top so it is 100% visible and never cut off!
  //    'center' = centers vertically
  //    'bottom' = anchors to bottom
  bgPosition: 'top' as 'top' | 'center' | 'bottom',

  // 4. Fine-tune Up ↕ Down position (in px):
  //    Negative moves UP (e.g. -20), Positive moves DOWN (e.g. +20)
  bgOffsetY: 0,
};

// =========================================================================
// 🍾 PAGE 5 BOTTLE LANDING POSITION (Girl's Hand)
// Adjust these coordinates to position the bottle exactly in her hand:
// =========================================================================
export const PAGE5_BOTTLE_LANDING = {
  x: 170,               // 👈 Horizontal landing position in px (positive: right, on girl's hand)
  y: 25,                // 👈 Vertical landing position in px relative to Page 5 center
  scale: 0.40,          // 👈 Bottle size to sit naturally in her hand
  tilt: -39.5,          // 👈 Angle in degrees to match her hand grip
};

// =========================================================================
// 🌙 ROUTE: PAGE 4 TO PAGE 5 CURVED SWOOP & ANGLES (Matches Hand-Drawn Sketch)
// =========================================================================
export const ROUTE_4_TO_5_CONFIG = {
  leftSwoopOffset: 45,  // 👈 Left offset during vertical drop along left flank (in px)
  bottomSwoopY: 0.90,   // 👈 Vertical depth of the bottom scoop before climbing (0.80 - 0.95)
  dropAngle: 0.0,       // 👈 Bottle 2: Straight upright as it plunges down left flank (0°)
  turnAngle: -80.0,     // 👈 Bottle 3: Tilts left at the bottom turn (-15° to -25°, negative tilts left)
  climbAngle: -42.0,     // 👈 Bottle 4: Leans forward up the diagonal climb (+25° to +35°, positive tilts right)
  crestAngle: -32.0,    // 👈 Bottle 5: Arches over the crest into hand (-10° to -15°)
  arcBowX: 0,           // 👈 Backward compatibility
};

export const CURVE_PATH_CONFIG = ROUTE_4_TO_5_CONFIG;

// =========================================================================
// 🌿 PAGE 5 "NATURAL INGREDIENTS" CONTENT & POSITIONING (Adjust Manually Here)
// =========================================================================
export const PAGE5_CONTENT = {
  badge: 'PURE BOTANICALS • 100% UNADULTERATED',
  title: 'NATURAL INGREDIENTS',

  // 1st Paragraph (Big):
  para1:
    'Every bottle of Shake & Gulp is churned from fresh farm curd, infused with roasted mountain cumin, hand-plucked mint, and wild botanical herbs. We strictly reject artificial preservatives, synthetic thickeners, and refined sugars—letting the pure healing power of cold-pressed ginger, raw amla, and mineral-rich Himalayan rock salt restore your body naturally.',

  // 2nd Paragraph (Small 2 lines):
  para2:
    'From earth to bottle, uncompromised and honest. Real ingredients you can see, taste, and feel with every gulp.',

  // Fine-tune left-side positioning:
  offsetX: 90, // in px (negative moves left, positive moves right)
  offsetY: 0,   // in px (negative moves up, positive moves down)
};

export const Page5Section: FC = () => {
  const { bgFit, bgScale, bgPosition, bgOffsetY } = PAGE5_CONFIG;

  const positionClass =
    bgPosition === 'top'
      ? 'object-top'
      : bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const fitClass = bgFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <section
      id="page5"
      className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-[#0a150e]"
    >
      <img
        src="/bg5.png"
        alt="Page 5 Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 transition-transform duration-100 ${fitClass} ${positionClass}`}
        style={{
          transform: `translateY(${bgOffsetY}px) scale(${bgScale})`,
          transformOrigin: bgPosition === 'top' ? 'top center' : 'center center',
        }}
      />
    </section>
  );
};
