import { useState, useRef, useEffect, type FC } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { drinkNameToSlug } from '../data/drinksData';

// =========================================================================
// 🎛️ NAVBAR CONFIGURATION (Adjust Manually Here)
// =========================================================================
export const NAVBAR_CONFIG = {
  // 1. Transparency & Background Opacity:
  bgOpacity: 0.04, // 👈 0.0 = 100% transparent, 0.2 = frosted glass, 0.7 = solid
  bgColor: '255, 255, 255', // 👈 RGB color ('255, 255, 255' = white frost, '0, 0, 0' = dark tint)

  // 2. Frosted Blur:
  blurPx: 26, // 👈 Background blur (0 = crystal clear see-through, 25 = heavy frosted blur)

  // 3. Border Opacity:
  borderOpacity: 0.22, // 👈 0.0 = no border line, 0.35 = sharp visible border

  // 4. Drinks Dropdown & Fullscreen Blur Overlay:
  dropdownBackdropBlurPx: 18, // 👈 Background blur intensity when hovering Drinks
  dropdownBackdropDarkness: 0.14, // 👈 Subtle dark tint behind blurred background (0.0 - 0.4)
  dropdownCardOpacity: 0, // 👈 0 = completely transparent & seamlessly blended (no box edges)
  dropdownCardBlurPx: 0, // 👈 0 = uses fullscreen backdrop blur with zero edge seams
  dropdownCardBorderOpacity: 0, // 👈 0 = no border lines at all
  dropdownTextColor: 'black' as 'black' | 'white', // 👈 Text color inside dropdown items
};

// =========================================================================
// 🍹 DRINKS DROPDOWN MENU DATA (Exact Order)
// =========================================================================
export interface DrinkCategory {
  id: 'traditional' | 'wellness';
  label: string;
  targetId: string;
  items: string[];
}

export const DRINK_CATEGORIES: DrinkCategory[] = [
  {
    id: 'traditional',
    label: 'Traditional Drinks',
    targetId: 'page7',
    items: [
      'Jeera Buttermilk',
      'Masala Buttermilk',
      'Date Buttermilk',
      'Ragi Buttermilk',
      'Sabja Lassi',
      'Buttermilk',
      'Nimbu Sabja',
      'Nimbu Pudina',
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness Drinks',
    targetId: 'page8',
    items: [
      'Ginger Shot',
      'Ginger Turmeric Shot',
      'Amla Shot',
      'Neem Shot',
      'Moringa Shot',
      'Wheatgrass Shot',
      'Barley Drink',
    ],
  },
];

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
  isDrinkPage?: boolean;
  onSelectDrink?: (slug: string) => void;
  onNavigateHome?: (sectionId?: string) => void;
}

export const Navbar: FC<NavbarProps> = ({
  onOpenCart,
  isDrinkPage = false,
  onSelectDrink,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDrinksExpanded, setMobileDrinksExpanded] = useState(false);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<'traditional' | 'wellness' | null>(null);

  // Desktop hover dropdown state
  const [drinksOpen, setDrinksOpen] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrinksOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDrinksEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDrinksOpen(true);
  };

  const handleDrinksLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDrinksOpen(false);
    }, 120);
  };

  const handleDrinkClick = (drinkName: string) => {
    setDrinksOpen(false);
    setMobileMenuOpen(false);
    const slug = drinkNameToSlug(drinkName);
    if (onSelectDrink) {
      onSelectDrink(slug);
    } else {
      window.location.hash = `#/drink/${slug}`;
    }
  };

  const scrollToElementCleanly = (elem: HTMLElement | null) => {
    if (!elem) return;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (target: HTMLElement | number, opts?: { immediate?: boolean }) => void };
    }).__lenis;
    if (lenis) {
      lenis.scrollTo(elem);
    } else {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTargetId = (targetId: string) => {
    setDrinksOpen(false);
    setMobileMenuOpen(false);

    if (isDrinkPage && onNavigateHome) {
      onNavigateHome(targetId);
      return;
    }

    scrollToElementCleanly(document.getElementById(targetId));
  };

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false);
    setDrinksOpen(false);

    if (section === 'home') {
      if (isDrinkPage && onNavigateHome) {
        onNavigateHome();
      } else {
        const lenis = (window as unknown as {
          __lenis?: { scrollTo: (target: HTMLElement | number, opts?: { immediate?: boolean }) => void };
        }).__lenis;
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    if (section === 'drinks') {
      if (isDrinkPage && onNavigateHome) {
        onNavigateHome('drinks');
        return;
      }
      const elem = document.getElementById('drinks') || document.getElementById('benefits');
      if (elem) {
        scrollToElementCleanly(elem);
      } else if (onOpenCart) {
        onOpenCart();
      }
      return;
    }

    if (section === 'read') {
      if (isDrinkPage && onNavigateHome) {
        onNavigateHome('page9');
        return;
      }
      const elem =
        document.getElementById('about') ||
        document.getElementById('page9') ||
        document.getElementById('reviews') ||
        document.getElementById('ingredients');
      scrollToElementCleanly(elem);
      return;
    }

    if (section === 'contact') {
      const elem = document.getElementById('faq') || document.querySelector('footer');
      scrollToElementCleanly(elem as HTMLElement | null);
      return;
    }
  };

  const isLightDropdownText = NAVBAR_CONFIG.dropdownTextColor === 'white';
  const dropdownItemTextClass = isLightDropdownText
    ? 'text-white/95 hover:text-white'
    : 'text-neutral-900 hover:text-black';

  // Seamless borderless transparent style for Drinks dropdown containers
  const dropdownCardStyle = {
    ...(NAVBAR_CONFIG.dropdownCardOpacity > 0
      ? { backgroundColor: `rgba(255, 255, 255, ${NAVBAR_CONFIG.dropdownCardOpacity})` }
      : {}),
    ...(NAVBAR_CONFIG.dropdownCardBlurPx > 0
      ? {
          backdropFilter: `blur(${NAVBAR_CONFIG.dropdownCardBlurPx}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${NAVBAR_CONFIG.dropdownCardBlurPx}px) saturate(180%)`,
        }
      : {}),
    border:
      NAVBAR_CONFIG.dropdownCardBorderOpacity > 0
        ? `1px solid rgba(255, 255, 255, ${NAVBAR_CONFIG.dropdownCardBorderOpacity})`
        : 'none',
    boxShadow: 'none',
  };

  return (
    <>
      {/* Fullscreen Background Blur Overlay when hovering Drinks dropdown */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[45] transition-all duration-300 ease-out pointer-events-none ${
          drinksOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: drinksOpen
            ? `rgba(0, 0, 0, ${NAVBAR_CONFIG.dropdownBackdropDarkness})`
            : 'rgba(0, 0, 0, 0)',
          backdropFilter: drinksOpen ? `blur(${NAVBAR_CONFIG.dropdownBackdropBlurPx}px)` : 'blur(0px)',
          WebkitBackdropFilter: drinksOpen ? `blur(${NAVBAR_CONFIG.dropdownBackdropBlurPx}px)` : 'blur(0px)',
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-4 pb-2">
        {/* Floating Fully Transparent Glass Capsule Bar */}
        <div
          className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto flex items-center justify-between px-7 sm:px-10 py-3 rounded-full transition-all duration-300 relative"
          style={{
            background: `rgba(${NAVBAR_CONFIG.bgColor}, ${NAVBAR_CONFIG.bgOpacity})`,
            backdropFilter: `blur(${NAVBAR_CONFIG.blurPx}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${NAVBAR_CONFIG.blurPx}px) saturate(180%)`,
            border: `1px solid rgba(255, 255, 255, ${NAVBAR_CONFIG.borderOpacity})`,
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

            {/* Drinks Nav Item + Hover Cascading Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDrinksEnter}
              onMouseLeave={handleDrinksLeave}
            >
              <button
                onClick={() => scrollToSection('drinks')}
                aria-expanded={drinksOpen}
                aria-haspopup="true"
                className="text-sm font-bold text-neutral-900 hover:text-black hover:opacity-70 transition-all cursor-pointer py-1"
              >
                Drinks
              </button>

              {/* Horizontal 2-Column Drinks Dropdown (pt-4 invisibly bridges navbar padding gap) */}
              {drinksOpen && (
                <div className="absolute top-full left-[-156px] lg:left-[-165px] pt-4 z-50">
                  <div className="flex flex-row items-start gap-2.5 lg:gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {DRINK_CATEGORIES.map((category) => (
                      <div
                        key={category.id}
                        className="flex flex-col gap-2 w-[174px] lg:w-[194px]"
                      >
                        {/* Top Horizontal Category Header */}
                        <button
                          onClick={() => scrollToTargetId(category.targetId)}
                          className={`w-full rounded-2xl px-4 py-2.5 flex items-center justify-center text-center text-[13px] lg:text-sm font-bold tracking-tight transition-all duration-150 cursor-pointer whitespace-nowrap hover:bg-white/15 ${dropdownItemTextClass}`}
                          style={dropdownCardStyle}
                        >
                          <span>{category.label}</span>
                        </button>

                        {/* Drinks List Directly Beneath Each Category */}
                        <div
                          className="w-full rounded-2xl p-2 flex flex-col gap-0.5 transition-all duration-150"
                          style={dropdownCardStyle}
                        >
                          {category.items.map((drinkName) => (
                            <button
                              key={drinkName}
                              onClick={() => handleDrinkClick(drinkName)}
                              className={`w-full text-left px-3.5 py-2 rounded-xl text-[13px] font-bold ${dropdownItemTextClass} hover:bg-white/15 transition-all duration-150 cursor-pointer whitespace-nowrap`}
                            >
                              {drinkName}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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

        {/* Mobile Drawer (Matching Frosted Glass with Expandable Drinks List) */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-2 w-full max-w-[95%] mx-auto p-5 rounded-3xl flex flex-col gap-2.5 shadow-2xl animate-in fade-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.14)',
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

            {/* Mobile Drinks Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileDrinksExpanded(!mobileDrinksExpanded)}
                className="flex items-center justify-between text-left text-sm font-bold text-neutral-900 hover:text-black py-1.5 transition-colors"
              >
                <span>Drinks</span>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${mobileDrinksExpanded ? 'rotate-90' : ''}`}
                />
              </button>

              {mobileDrinksExpanded && (
                <div className="pl-3 mt-1 flex flex-col gap-1.5 border-l border-black/15">
                  {DRINK_CATEGORIES.map((category) => {
                    const isSubOpen = mobileSubExpanded === category.id;
                    return (
                      <div key={category.id} className="flex flex-col">
                        <button
                          onClick={() =>
                            setMobileSubExpanded(isSubOpen ? null : category.id)
                          }
                          className="flex items-center justify-between text-left text-[13px] font-bold text-neutral-900 py-1.5 px-2 rounded-lg hover:bg-black/5"
                        >
                          <span>{category.label}</span>
                          <ChevronRight
                            size={14}
                            className={`transition-transform duration-200 ${isSubOpen ? 'rotate-90' : ''}`}
                          />
                        </button>

                        {isSubOpen && (
                          <div className="pl-3 py-1 flex flex-col gap-1">
                            {category.items.map((item) => (
                              <button
                                key={item}
                                onClick={() => handleDrinkClick(item)}
                                className="text-left text-xs font-semibold text-neutral-800 hover:text-black py-1 px-2 rounded-md hover:bg-black/5"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

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
    </>
  );
};
