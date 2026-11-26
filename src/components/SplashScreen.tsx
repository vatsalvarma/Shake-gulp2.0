import { useState, useEffect, useRef, type FC } from 'react';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// 🎛️ SPLASH SCREEN CONFIGURATION (Adjust Manually Here)
// Any change made here updates immediately live on screen!
// =========================================================================
export const SPLASH_CONFIG = {
  // 1. Logo Adjustments:
  logoPath: '/Shake-Gulp-Logo.png',
  logoSizePx: 200, // 👈 Logo width & height in px (e.g. 90, 120, 160)
  logoOffsetY: 0, // 👈 Move logo Up (-) or Down (+) in px
  logoGlowIntensity: 0.45, // 👈 Neon glow strength around logo (0.1 - 1.0)
 
  // 2. Spacing:
  gapBetweenLogoAndBarPx: 28, // 👈 Gap (px) between the logo and the fill-up bar

  // 3. Fill-Up Progress Bar Adjustments:
  barWidthPx: 360, // 👈 Width of the progress bar in px (e.g. 280, 360, 440)
  barHeightPx: 7, // 👈 Thickness of the bar in px (e.g. 8, 12, 16)
  barOffsetY: 0, // 👈 Move bar Up (-) or Down (+) in px
  showStatusText: true, // 👈 Set to false to hide "Cold-pressing raw whole grains..."
  showPercentage: true, // 👈 Set to false to hide the "33%" percentage

  // 4. Animation Timing:
  minDisplayTimeMs: 1400, // Minimum duration (ms) for the smooth fill-up bar
  fadeOutDurationMs: 700, // Duration (ms) of the exit curtain fade
  safetyTimeoutMs: 8000, // Safety fallback timeout in case of network stall
};

// Complete list of all active image assets across Pages 1 to 9
export const PRELOAD_IMAGE_URLS: string[] = [
  // Brand Logo
  '/Shake-Gulp-Logo.png',

  // Page 1 & Page 2 (HeroExperience)
  '/background.png',
  '/background2.png',
  '/bottle.png',
  '/foreground3.png',
  '/leaves-left.png',
  '/leaves-right.png',
  '/left22.png',
  '/edge leafs.png',
  '/bee.png',

  // Page 3 (BottleShowcaseSection)
  '/btm-btl.png',
  '/bottle3.1.png',
  '/bottle3.2.png',
  '/bottle3.3.png',
  '/bottle3.4.png',
  '/bg3.1.png',

  // Page 4, 5, 6 (Page4to6Experience)
  '/bg4.png',
  '/bg5.png',
  '/bg6.png',
  '/111.png',

  // Page 7 (Page7Section)
  '/bg7.png',

  // Page 8 (Page8Section)
  '/bg8.png',
  '/btl8.png',
  '/hnd8.png',

  // Page 9 (Page9Section)
  '/bg9.png',
  '/read-1.jpg',
  '/read-2.jpg',
  '/read-3.jpg',
];

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Extracting organic botanicals...');

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const rafIdRef = useRef<number | null>(null);

  // Status message selector based on progress
  const getStatusText = (pct: number) => {
    if (pct < 25) return 'Extracting cold-pressed botanicals...';
    if (pct < 55) return 'Cold-pressing raw whole grains...';
    if (pct < 85) return 'Bottling natural wellness blends...';
    if (pct < 100) return 'Preparing the fresh experience...';
    return 'Harvest ready • Welcome!';
  };

  useEffect(() => {
    // 1. Intercept user scroll input during splash without setting body overflow:hidden
    //    (changing body overflow breaks Chromium scroll restoration & GSAP pin calculations on reload)
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    const preventScrollKeys = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });

    startTimeRef.current = Date.now();
    const totalImages = PRELOAD_IMAGE_URLS.length;
    let loadedCount = 0;

    // 2. Preload all images in parallel
    const handleOneLoaded = () => {
      loadedCount++;
      const realPercent = Math.min(100, Math.round((loadedCount / totalImages) * 100));
      targetProgressRef.current = realPercent;
    };

    PRELOAD_IMAGE_URLS.forEach((url) => {
      const img = new Image();
      img.src = url;
      if (img.complete) {
        handleOneLoaded();
      } else {
        img.onload = handleOneLoaded;
        img.onerror = handleOneLoaded; // Gracefully continue if an asset fails
      }
    });

    // 3. Smooth Butter Progress Animation Loop
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / SPLASH_CONFIG.minDisplayTimeMs);

      // Desired progress based on minimum display time pacing
      const pacedProgress = timeRatio * 100;

      // Actual achievable target: capped by real loaded percentage unless all loaded
      const target =
        loadedCount >= totalImages
          ? Math.max(targetProgressRef.current, pacedProgress)
          : Math.min(targetProgressRef.current, pacedProgress + 10);

      // Smooth lerp towards target
      progressRef.current += (target - progressRef.current) * 0.12;

      // When all images are loaded AND min time elapsed:
      if (loadedCount >= totalImages && elapsed >= SPLASH_CONFIG.minDisplayTimeMs) {
        progressRef.current += (100 - progressRef.current) * 0.25;
        if (progressRef.current >= 99.5) {
          progressRef.current = 100;
          setProgress(100);
          setStatusMessage('Harvest ready • Welcome!');
          triggerCompletion();
          return;
        }
      }

      const currentDisplay = Math.min(100, Math.round(progressRef.current));
      setProgress(currentDisplay);
      setStatusMessage(getStatusText(currentDisplay));

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // 4. Trigger completion and smooth exit
    let exitTimer: ReturnType<typeof setTimeout>;
    const triggerCompletion = () => {
      setIsDone(true);

      // Brief hold at 100% to let user see "Ready"
      exitTimer = setTimeout(() => {
        setIsFadingOut(true);

        setTimeout(() => {
          window.removeEventListener('wheel', preventScroll);
          window.removeEventListener('touchmove', preventScroll);
          window.removeEventListener('keydown', preventScrollKeys);

          // Refresh ScrollTrigger in strict priority order once all preloaded images settle
          requestAnimationFrame(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          });

          if (onComplete) {
            onComplete();
          }
        }, SPLASH_CONFIG.fadeOutDurationMs);
      }, 400);
    };

    // 5. Safety fallback timeout
    const safetyTimer = setTimeout(() => {
      if (!isDone) {
        progressRef.current = 100;
        setProgress(100);
        triggerCompletion();
      }
    }, SPLASH_CONFIG.safetyTimeoutMs);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(safetyTimer);
      clearTimeout(exitTimer);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071109] text-white select-none transition-all ease-out`}
      style={{
        transitionDuration: `${SPLASH_CONFIG.fadeOutDurationMs}ms`,
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Ambient Radial Glow & Soft Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-500/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-lime-400/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Center Brand Identity (Logo Only) */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{
          marginBottom: `${SPLASH_CONFIG.gapBetweenLogoAndBarPx}px`,
        }}
      >
        {/* Logo Container with Ambient Pulse */}
        <div
          className="relative group flex items-center justify-center"
          style={{
            transform: `translateY(${SPLASH_CONFIG.logoOffsetY}px)`,
          }}
        >
          <div
            className="absolute -inset-3 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse"
            style={{ opacity: SPLASH_CONFIG.logoGlowIntensity }}
          />
          <img
            src={SPLASH_CONFIG.logoPath}
            alt="Shake & Gulp Logo"
            className="relative object-contain transition-transform duration-500"
            style={{
              width: `${SPLASH_CONFIG.logoSizePx}px`,
              height: `${SPLASH_CONFIG.logoSizePx}px`,
              filter: `drop-shadow(0 0 30px rgba(163, 230, 53, ${SPLASH_CONFIG.logoGlowIntensity}))`,
            }}
          />
        </div>
      </div>

      {/* Progress Fillup Bar Container */}
      <div
        className="relative z-10 flex flex-col items-center px-6 max-w-full"
        style={{
          transform: `translateY(${SPLASH_CONFIG.barOffsetY}px)`,
        }}
      >
        {/* Outer Frosted Track */}
        <div
          className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-[2px] relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] mb-3"
          style={{
            width: `${SPLASH_CONFIG.barWidthPx}px`,
            maxWidth: '85vw',
            height: `${SPLASH_CONFIG.barHeightPx}px`,
          }}
        >
          {/* Inner Fill Bar */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 relative transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(163, 230, 53, 0.85), 0 0 6px rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Shimmer Light Beam Effect across the bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full -skew-x-12 animate-shimmer" />

            {/* Glowing Tip */}
            {progress > 2 && progress < 100 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[1px] shadow-[0_0_10px_#ffffff]" />
            )}
          </div>
        </div>

        {/* Progress Metrics & Status Text */}
        {(SPLASH_CONFIG.showStatusText || SPLASH_CONFIG.showPercentage) && (
          <div
            className="flex justify-between items-center text-xs text-white/75 font-medium px-1"
            style={{
              width: `${SPLASH_CONFIG.barWidthPx}px`,
              maxWidth: '85vw',
            }}
          >
            {SPLASH_CONFIG.showStatusText ? (
              <div className="flex items-center gap-1.5">
                {isDone ? (
                  <CheckCircle2 size={13} className="text-lime-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping inline-block" />
                )}
                <span className="tracking-wide transition-all duration-300">
                  {statusMessage}
                </span>
              </div>
            ) : <div />}

            {SPLASH_CONFIG.showPercentage && (
              <span className="font-mono font-bold text-white tracking-wider tabular-nums text-sm">
                {progress}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
