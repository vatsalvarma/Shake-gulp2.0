import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { HeroExperience } from './components/HeroExperience';
import { BottleShowcaseSection } from './components/BottleShowcaseSection';
import { Page4to6Experience } from './components/Page4to6Experience';
import { Page7Section } from './components/Page7Section';
import { Page8Section } from './components/Page8Section';
import { Page9Section } from './components/Page9Section';
import { Footer } from './components/Footer';
import { PurchaseModal } from './components/PurchaseModal';
import { DrinkDetailPage } from './components/DrinkDetailPage';
import { getDrinkBySlug } from './data/drinksData';

gsap.registerPlugin(ScrollTrigger);

function parseDrinkSlugFromHash(hash: string): string | null {
  const match = hash.match(/^#\/drink\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

export function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [activeDrinkSlug, setActiveDrinkSlug] = useState<string | null>(() =>
    parseDrinkSlugFromHash(window.location.hash)
  );
  const pendingScrollTargetRef = useRef<string | null>(null);
  const savedHomeScrollYRef = useRef<number | null>(null);
  const prevDrinkSlugRef = useRef<string | null>(activeDrinkSlug);

  useEffect(() => {
    const handleHashChange = () => {
      const nextSlug = parseDrinkSlugFromHash(window.location.hash);
      // Save current Home scroll offset before browser forward/hash change into a Drink page
      if (!prevDrinkSlugRef.current && nextSlug) {
        savedHomeScrollYRef.current = window.scrollY;
      }
      prevDrinkSlugRef.current = nextSlug;
      setActiveDrinkSlug(nextSlug);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // When returning from a Drink Page to Home, wait for GSAP ScrollTriggers & Lenis
  // to sort/refresh all pin spacers BEFORE restoring scroll position or scrolling to target section.
  useEffect(() => {
    if (activeDrinkSlug) return;

    const targetId = pendingScrollTargetRef.current;
    const savedY = savedHomeScrollYRef.current;
    pendingScrollTargetRef.current = null;

    if (!targetId && savedY === null) return;

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis?.resize();

      if (targetId) {
        const elem = document.getElementById(targetId);
        if (elem) {
          if (lenis) {
            lenis.scrollTo(elem, { immediate: false });
          } else {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }
        savedHomeScrollYRef.current = null;
      } else if (savedY !== null) {
        // Returning via browser Back button: restore saved Home position cleanly
        savedHomeScrollYRef.current = null;
        if (lenis) {
          lenis.scrollTo(savedY, { immediate: true, force: true });
        } else {
          window.scrollTo({ top: savedY, behavior: 'auto' });
        }
        ScrollTrigger.update();
      }
    }, 140);

    return () => clearTimeout(timer);
  }, [activeDrinkSlug]);

  const navigateToDrink = (slug: string) => {
    if (!activeDrinkSlug) {
      savedHomeScrollYRef.current = window.scrollY;
    }
    prevDrinkSlugRef.current = slug;
    window.location.hash = `#/drink/${slug}`;
    setActiveDrinkSlug(slug);
  };

  const navigateHome = (sectionId?: string) => {
    if (sectionId) {
      pendingScrollTargetRef.current = sectionId;
    } else {
      pendingScrollTargetRef.current = null;
      savedHomeScrollYRef.current = 0;
    }
    // Always reset window scroll synchronously before Home mounts so pin spacers initialize cleanly
    window.scrollTo({ top: 0, behavior: 'auto' });
    prevDrinkSlugRef.current = null;
    if (window.location.hash.startsWith('#/drink/')) {
      window.location.hash = '#/';
    }
    setActiveDrinkSlug(null);
  };

  const activeDrink = activeDrinkSlug ? getDrinkBySlug(activeDrinkSlug) : undefined;

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleExploreProduct = () => {
    const elem = document.getElementById('drinks') || document.getElementById('benefits');
    if (elem) {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(elem);
      } else {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#071109] text-white selection:bg-lime-500 selection:text-black">
      {/* 🌿 Fullscreen Botanical Image Preloader Splash Screen */}
      {!isAppReady && (
        <SplashScreen onComplete={() => setIsAppReady(true)} />
      )}

      {/* Glossy Header Navigation */}
      <Navbar
        onOpenCart={() => setIsModalOpen(true)}
        cartCount={cartCount}
        isDrinkPage={Boolean(activeDrink)}
        onSelectDrink={navigateToDrink}
        onNavigateHome={navigateHome}
      />

      {activeDrink ? (
        <main>
          <DrinkDetailPage
            drink={activeDrink}
            onSelectDrink={navigateToDrink}
            onNavigateHome={navigateHome}
          />
        </main>
      ) : (
        <>
          {/* GSAP + Lenis Master Pinned Scroll Canvas */}
          <main>
            {/* Page 1 (Hero) & Page 2 (Stone Platform with Rotating Ingredient Circles) */}
            <HeroExperience
              onAddToCart={handleAddToCart}
              onExploreProduct={handleExploreProduct}
              onSelectDrink={navigateToDrink}
            />

            {/* 🍾 Page 3: 3D Multi-Layer Bottle Showcase with Switch Animation */}
            <BottleShowcaseSection onAddToCart={handleAddToCart} />

            {/* 🌿 Page 4, 5 & 6: Bottle Multi-Stage Curved Journey into Fridge */}
            <Page4to6Experience />

            {/* 🍃 Page 7: Raw Background Image (bg7.png) */}
            <Page7Section onSelectDrink={navigateToDrink} />

            {/* 🍃 Page 8: Raw Background Image (bg8.png) */}
            <Page8Section onSelectDrink={navigateToDrink} />

            {/* 📖 Page 9: Love to Read Frosted Glass Cards (bg9.png) */}
            <Page9Section />
          </main>

          {/* Sustainable Brand Footer */}
          <Footer />
        </>
      )}

      {/* Interactive Quick-Order Drawer */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccessOrder={() => setCartCount(0)}
      />
    </div>
  );
}

export default App;
