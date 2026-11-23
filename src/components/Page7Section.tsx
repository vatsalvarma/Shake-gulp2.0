import { type FC } from 'react';
import { ArrowRight } from 'lucide-react';

// =========================================================================
// 🎛️ PAGE 7 CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const PAGE7_CONFIG = {
  // 1. Move Page 7 UP (in px) - set to 0 by default:
  movePage7Up: 0,

  // 2. Image Fit:
  //    'cover'   = fills screen edge-to-edge seamlessly
  //    'contain' = fits full image inside viewport
  bgFit: 'cover' as 'contain' | 'cover',

  // 3. Zoom Scale:
  bgScale: 1.0,

  // 4. Vertical Anchor / Alignment:
  bgPosition: 'center' as 'center' | 'top' | 'bottom',

  // 5. Fine-tune Up ↕ Down position of the image inside Page 7 (in px):
  bgOffsetY: 0,

  // =======================================================================
  // 🎛️ 2 "EXPLORE NOW!" SQUARE BUTTONS CONFIGURATION
  // Matches the two red boxes beside the "Shake & Gulp" flask logo
  // =======================================================================
  // 6. Vertical Position from Top (%):
  buttonsTopPercent: 36.5, // Aligns horizontally with the "Shake & Gulp" logo
  buttonsOffsetY: 0, // Fine-tune Up (-) or Down (+) in px

  // 7. Horizontal Positions (% from left):
  leftButtonLeftPercent: 26.0, // Left button position (under "Traditional")
  rightButtonLeftPercent: 74.0, // Right button position (under "Drinks")

  // 8. Button Scale & Size:
  buttonScale: 0.80, // Overall scale multiplier for both buttons
  buttonText: 'EXPLORE NOW', // Text inside the button
};

export const Page7Section: FC = () => {
  const {
    movePage7Up,
    bgFit,
    bgScale,
    bgPosition,
    bgOffsetY,
    buttonsTopPercent,
    buttonsOffsetY,
    leftButtonLeftPercent,
    rightButtonLeftPercent,
    buttonScale,
    buttonText,
  } = PAGE7_CONFIG;

  const positionClass =
    bgPosition === 'top'
      ? 'object-top'
      : bgPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const fitClass = bgFit === 'contain' ? 'object-contain' : 'object-cover';

  // Smooth scroll down to next page when clicked
  const handleExploreClick = () => {
    const elem = document.getElementById('page8') || document.getElementById('benefits');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="page7"
      className="relative z-10 w-full h-screen min-h-screen overflow-hidden flex items-center justify-center select-none bg-black"
      style={{
        marginTop: `-${movePage7Up}px`,
      }}
    >
      {/* ========================================================================= */}
      {/* 🌲 RAW BACKGROUND IMAGE (bg7.png)                                         */}
      {/* ========================================================================= */}
      <img
        src="/bg7.png"
        alt="Page 7 Background"
        className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${fitClass} ${positionClass}`}
        style={{
          transform: `translateY(${bgOffsetY}px) scale(${bgScale})`,
          transformOrigin: bgPosition === 'top' ? 'top center' : 'center center',
        }}
      />

      {/* ========================================================================= */}
      {/* 🔲 BUTTON 1 (LEFT SQUARE BUTTON - UNDER "TRADITIONAL")                     */}
      {/* ========================================================================= */}
      <div
        className="absolute z-30 pointer-events-auto"
        style={{
          top: `${buttonsTopPercent}%`,
          left: `${leftButtonLeftPercent}%`,
          transform: `translate(-50%, calc(-50% + ${buttonsOffsetY}px)) scale(${buttonScale})`,
        }}
      >
        <div className="relative group">
          {/* Square Outer Pulsing Halo */}
          <div className="absolute -inset-1 border border-white/40 animate-pulse blur-xs pointer-events-none" />
          <div
            className="absolute -inset-2.5 border border-white/20 animate-ping opacity-25 pointer-events-none"
            style={{ animationDuration: '3s' }}
          />

          {/* Fully Transparent Square Button with White Edge Line */}
          <button
            onClick={handleExploreClick}
            className="relative px-7 sm:px-9 py-3 sm:py-3.5 bg-transparent border-2 border-white rounded-none text-white font-black tracking-[0.22em] text-xs sm:text-sm uppercase cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.85)] active:scale-95 flex items-center gap-2.5 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.35)]"
          >
            {/* Shimmer Sheen Sweep on Hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">{buttonText}</span>

            {/* Eye-Catching Animated Exclamation Mark */}
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

      {/* ========================================================================= */}
      {/* 🔲 BUTTON 2 (RIGHT SQUARE BUTTON - UNDER "DRINKS")                         */}
      {/* ========================================================================= */}
      <div
        className="absolute z-30 pointer-events-auto"
        style={{
          top: `${buttonsTopPercent}%`,
          left: `${rightButtonLeftPercent}%`,
          transform: `translate(-50%, calc(-50% + ${buttonsOffsetY}px)) scale(${buttonScale})`,
        }}
      >
        <div className="relative group">
          {/* Square Outer Pulsing Halo */}
          <div className="absolute -inset-1 border border-white/40 animate-pulse blur-xs pointer-events-none" />
          <div
            className="absolute -inset-2.5 border border-white/20 animate-ping opacity-25 pointer-events-none"
            style={{ animationDuration: '3s' }}
          />

          {/* Fully Transparent Square Button with White Edge Line */}
          <button
            onClick={handleExploreClick}
            className="relative px-7 sm:px-9 py-3 sm:py-3.5 bg-transparent border-2 border-white rounded-none text-white font-black tracking-[0.22em] text-xs sm:text-sm uppercase cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.85)] active:scale-95 flex items-center gap-2.5 backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.35)]"
          >
            {/* Shimmer Sheen Sweep on Hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            <span className="relative z-10">{buttonText}</span>

            {/* Eye-Catching Animated Exclamation Mark */}
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
    </section>
  );
};
export default Page7Section;
