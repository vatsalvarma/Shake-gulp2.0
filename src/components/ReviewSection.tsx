import { useState, type FC } from 'react';
import { Star, ChevronDown, CheckCircle } from 'lucide-react';

export const ReviewSection: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reviews = [
    {
      name: 'Dr. Priya Varma',
      role: 'Ayurvedic Practitioner & Biohacker',
      rating: 5,
      review:
        'The bioavailability of cold-pressed wild amla with natural tannins makes all the difference. My morning patients report steady, sustained cognitive alertness and digestion improvement within 4 days.',
      verified: true,
      time: '3 days ago',
    },
    {
      name: 'Marcus K.',
      role: 'Endurance Runner',
      rating: 5,
      review:
        'The hit of tartness followed by the subtle soothing wild honey note is incredible. I swapped my synthetic pre-workout for Shake & Gulp. No jittery caffeine crash, just pure clean mountain energy.',
      verified: true,
      time: '1 week ago',
    },
    {
      name: 'Ananya S.',
      role: 'Holistic Nutritionist',
      rating: 5,
      review:
        'I appreciate that it is truly zero heat treated. The live enzymes are fully active and you can taste the raw vitality. My skin complexion has never looked this clear and luminous.',
      verified: true,
      time: '2 weeks ago',
    },
  ];

  const faqs = [
    {
      q: 'How and when should I drink the Shake & Gulp Amla Shot?',
      a: 'For peak absorption, drink one 100ml shot first thing in the morning on an empty stomach or 20 minutes before breakfast. Give it a gentle shake to remix the natural amla pulp and mountain spring water before gulping!',
    },
    {
      q: 'Why is wild amla 20x more potent than standard citrus fruits?',
      a: 'Wild Indian gooseberry contains a unique molecular complex of ascorbic acid bound to emblicanin-A and emblicanin-B polyphenols. These natural tannins protect the Vitamin C from degradation by light, heat, or gastric acid.',
    },
    {
      q: 'Does it need to be refrigerated?',
      a: 'Because Shake & Gulp is raw and 100% cold-pressed without chemical preservatives, please keep refrigerated between 2°C – 6°C. It stays fresh for 30 days unopened in your fridge.',
    },
    {
      q: 'Is there any added sugar or artificial sweeteners?',
      a: 'Zero refined sugars, zero erythritol, and zero artificial sweeteners. The mild pleasant sweetness comes naturally from a micro-infusion of raw, unpasteurized wild Himalayan honey.',
    },
  ];

  return (
    <section id="reviews" className="py-24 px-4 sm:px-8 bg-[#071109] text-emerald-100">
      <div className="max-w-7xl mx-auto">
        {/* Social Proof Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full glass-pill text-amber-300 text-xs font-bold mb-3 shadow">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="ml-1 text-white">4.92 / 5.0</span>
            <span className="text-emerald-300/60">• 3,840+ Verified Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loved By Thousands of Daily Health Ritualists
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="glass-panel p-7 rounded-3xl border border-emerald-500/20 hover:border-lime-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, starI) => (
                    <Star key={starI} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="border-t border-emerald-500/20 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle size={14} className="text-lime-400 fill-lime-400/20" />
                    )}
                  </h4>
                  <span className="text-[11px] text-emerald-200/60">{rev.role}</span>
                </div>
                <span className="text-[10px] text-emerald-300/50">{rev.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
              Clear Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-emerald-500/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-lime-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-lime-400 transition-transform duration-300 flex-shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-emerald-200/80 leading-relaxed border-t border-emerald-500/10 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
