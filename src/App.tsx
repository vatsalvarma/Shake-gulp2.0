import { useState } from 'react';
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

export function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleExploreProduct = () => {
    const elem = document.getElementById('drinks') || document.getElementById('benefits');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071109] text-white selection:bg-lime-500 selection:text-black">
      {/* 🌿 Fullscreen Botanical Image Preloader Splash Screen */}
      {!isAppReady && (
        <SplashScreen onComplete={() => setIsAppReady(true)} />
      )}

      {/* Glossy Header Navigation */}
      <Navbar onOpenCart={() => setIsModalOpen(true)} cartCount={cartCount} />

      {/* GSAP + Lenis Master Pinned Scroll Canvas */}
      <main>
        {/* Page 1 (Hero) & Page 2 (Stone Platform with Rotating Ingredient Circles) */}
        <HeroExperience
          onAddToCart={handleAddToCart}
          onExploreProduct={handleExploreProduct}
        />

        {/* 🍾 Page 3: 3D Multi-Layer Bottle Showcase with Switch Animation */}
        <BottleShowcaseSection onAddToCart={handleAddToCart} />

        {/* 🌿 Page 4, 5 & 6: Bottle Multi-Stage Curved Journey into Fridge */}
        <Page4to6Experience />

        {/* 🍃 Page 7: Raw Background Image (bg7.png) */}
        <Page7Section />

        {/* 🍃 Page 8: Raw Background Image (bg8.png) */}
        <Page8Section />

        {/* 📖 Page 9: Love to Read Frosted Glass Cards (bg9.png) */}
        <Page9Section />
      </main>

      {/* Sustainable Brand Footer */}
      <Footer />

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
