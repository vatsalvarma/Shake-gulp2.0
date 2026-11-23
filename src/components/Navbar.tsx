import { useState, type FC } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar: FC<NavbarProps> = ({ onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section === 'drinks') {
      const elem = document.getElementById('drinks') || document.getElementById('benefits');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (onOpenCart) {
        onOpenCart();
      }
      return;
    }

    if (section === 'read') {
      const elem = document.getElementById('about') || document.getElementById('reviews') || document.getElementById('ingredients');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (section === 'contact') {
      const elem = document.getElementById('faq') || document.querySelector('footer');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-4 pb-2">
      {/* Floating Fully Transparent Glass Capsule Bar */}
      <div
        className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto flex items-center justify-between px-7 sm:px-10 py-3 rounded-full transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Left: Brand Logo + Typography */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group select-none"
        >
          <img
            src="/Shake-Gulp-Logo.png"
            alt="Shake & Gulp Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-black font-extrabold tracking-wider text-sm sm:text-base uppercase leading-none">
            SHAKE & GULP
          </span>
        </a>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          <button
            onClick={() => scrollToSection('home')}
            className="text-sm font-bold text-neutral-900 hover:text-black hover:opacity-70 transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('drinks')}
            className="text-sm font-bold text-neutral-900 hover:text-black hover:opacity-70 transition-all cursor-pointer"
          >
            Drinks
          </button>
          <button
            onClick={() => scrollToSection('read')}
            className="text-sm font-bold text-neutral-900 hover:text-black hover:opacity-70 transition-all cursor-pointer"
          >
            Read
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-bold text-neutral-900 hover:text-black hover:opacity-70 transition-all cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-black hover:opacity-75 transition-opacity"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} className="stroke-[2.5]" /> : <Menu size={22} className="stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Matching Fully Transparent Glass) */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-2 w-full max-w-[95%] mx-auto p-5 rounded-3xl flex flex-col gap-3.5 shadow-2xl animate-in fade-in slide-in-from-top-2"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.25)',
          }}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="text-left text-sm font-bold text-neutral-900 hover:text-black py-1.5 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('drinks')}
            className="text-left text-sm font-bold text-neutral-900 hover:text-black py-1.5 transition-colors"
          >
            Drinks
          </button>
          <button
            onClick={() => scrollToSection('read')}
            className="text-left text-sm font-bold text-neutral-900 hover:text-black py-1.5 transition-colors"
          >
            Read
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left text-sm font-bold text-neutral-900 hover:text-black py-1.5 transition-colors"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
