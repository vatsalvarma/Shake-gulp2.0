import { useEffect, type FC } from 'react';
import {
  DRINKS_DATA,
  DRINK_PAGE_BG,
  FSSAI_LOGO,
  type DrinkData,
} from '../data/drinksData';
import './DrinkDetailPage.css';

interface DrinkDetailPageProps {
  drink: DrinkData;
  onSelectDrink: (slug: string) => void;
  onNavigateHome: (sectionId?: string) => void;
}

export const DrinkDetailPage: FC<DrinkDetailPageProps> = ({
  drink,
  onSelectDrink,
  onNavigateHome,
}) => {
  // Scroll smoothly to top & update page title when drink changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prevTitle = document.title;
    document.title = `${drink.name} – Shake & Gulp`;
    return () => {
      document.title = prevTitle;
    };
  }, [drink.slug, drink.name]);

  // Preload sibling drink bottles and background image silently for instant arrow switching
  useEffect(() => {
    const urls = new Set<string>([
      DRINK_PAGE_BG,
      FSSAI_LOGO,
      ...DRINKS_DATA.map((d) => d.bottleImage),
    ]);
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Keyboard arrow navigation between drinks
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        onSelectDrink(drink.prevSlug);
      } else if (e.key === 'ArrowRight') {
        onSelectDrink(drink.nextSlug);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drink.prevSlug, drink.nextSlug, onSelectDrink]);

  return (
    <div
      className="drink-page-root"
      style={{
        backgroundImage: `url("${DRINK_PAGE_BG}")`,
      }}
    >
      {/* HERO SECTION */}
      <section className="drink-hero drink-container" key={drink.slug}>
        <div className="drink-hero-left">
          <img
            src={drink.bottleImage}
            className="drink-bottle"
            alt={drink.bottleAlt}
          />
        </div>

        <div className="drink-hero-right">
          <h1>{drink.name}</h1>
          <p className="drink-tagline">{drink.tagline}</p>

          <span className="drink-small-label">INGREDIENTS</span>

          <div className="drink-ingredients">
            {drink.ingredients.map((ing, idx) => (
              <div className="drink-ingredient" key={`${ing.image}-${idx}`}>
                <div className="drink-circle">
                  <img src={ing.image} alt={ing.labels[0] || 'Ingredient'} />
                </div>
                {ing.labels.map((label, lIdx) => (
                  <span key={lIdx}>{label}</span>
                ))}
              </div>
            ))}
          </div>

          <div className="drink-special">
            <h2>{drink.specialTitle}</h2>
            {drink.specialParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="drink-info drink-container">
        {drink.infoBlocks.map((block, idx) => (
          <div className="drink-info-block" key={idx}>
            <h3>{block.title}</h3>

            {block.introParagraphs.map((intro, iIdx) => (
              <p key={iIdx} className="drink-intro-p">
                {intro}
              </p>
            ))}

            {block.listItems.length > 0 && (
              <ul className="drink-tick-list drink-two-column">
                {block.listItems.map((item, liIdx) => (
                  <li key={liIdx}>{item}</li>
                ))}
              </ul>
            )}

            {block.bodyParagraphs.map((p, pIdx) => (
              <p key={pIdx} className={p.isNote ? 'note' : undefined}>
                {p.isBold ? <strong>{p.text}</strong> : p.text}
              </p>
            ))}
          </div>
        ))}
      </section>

      {/* SUGGESTIONS SECTION */}
      <section className="drink-suggest drink-container">
        <h2 className="drink-center-title">You May Also Like</h2>
        <div className="drink-center-cards">
          {drink.suggestions.map((item) => (
            <button
              type="button"
              key={item.slug}
              className="drink-card"
              onClick={() => onSelectDrink(item.slug)}
            >
              <img src={item.image} alt={item.label} />
              <p>{item.label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* DRINK PAGE FOOTER */}
      <footer className="drink-custom-footer">
        <div className="drink-footer-container">
          <div className="drink-footer-left">
            <h2>Shake &amp; Gulp</h2>
            <p>Traditional Drinks. Honest Ingredients.</p>
            <img
              src={FSSAI_LOGO}
              alt="FSSAI Logo"
              className="drink-fssai-logo"
            />
          </div>

          <div className="drink-footer-middle">
            <p>
              📍 Address : 1-8-143, New Municipal Colony, Ganeshpuri Colony,
              Dilsukhnagar, Hyderabad
            </p>
            <p>
              📞 Phone Number :{' '}
              <a
                href="tel:+919700159200"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                9700159200
              </a>
            </p>
            <p>
              📧 Email :{' '}
              <a
                href="mailto:info@shakeandgulp.in"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                info@shakeandgulp.in
              </a>
            </p>
          </div>

          <div className="drink-footer-right">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => onNavigateHome()}>• Home</li>
              <li onClick={() => onNavigateHome('page7')}>• Flavours</li>
              <li onClick={() => onNavigateHome('page8')}>• Wellness</li>
              <li onClick={() => onNavigateHome('page9')}>• Read</li>
            </ul>
          </div>
        </div>

        <div className="drink-footer-bottom">
          © Shake &amp; Gulp — Shake Well. Gulp Fresh.
        </div>
      </footer>

      {/* PREV / NEXT NAVIGATION ARROWS */}
      <button
        type="button"
        onClick={() => onSelectDrink(drink.prevSlug)}
        className="drink-nav-arrow drink-nav-arrow-left"
        aria-label="Previous drink"
      >
        &#10094;
      </button>
      <button
        type="button"
        onClick={() => onSelectDrink(drink.nextSlug)}
        className="drink-nav-arrow drink-nav-arrow-right"
        aria-label="Next drink"
      >
        &#10095;
      </button>
    </div>
  );
};

export default DrinkDetailPage;

