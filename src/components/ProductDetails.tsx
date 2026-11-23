import { useState, type FC } from 'react';
import {
  Sparkles,
  Zap,
  Shield,
  Activity,
  CheckCircle2,
  Award,
  Flame,
} from 'lucide-react';

interface ProductDetailsProps {
  onAddToCart?: () => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({
  onAddToCart,
}) => {
  const [selectedPack, setSelectedPack] = useState<'single' | 'pack6' | 'pack12'>('pack6');
  const [activeTab, setActiveTab] = useState<'benefits' | 'nutrition' | 'origin'>('benefits');

  const packs = [
    { id: 'single', name: 'Starter Shot', bottles: '1x 100ml', price: '$3.49', popular: false },
    { id: 'pack6', name: '6-Day Reset', bottles: '6x 100ml', price: '$18.99', popular: true, tag: 'Most Popular' },
    { id: 'pack12', name: 'Immunity Ritual', bottles: '12x 100ml', price: '$34.99', popular: false, tag: 'Best Value' },
  ];

  const nutritionData = [
    { label: 'Energy', value: '18 kcal', rda: '< 1%' },
    { label: 'Vitamin C (Natural Bioavailable)', value: '550 mg', rda: '610%' },
    { label: 'Total Carbohydrates', value: '4.2 g', rda: '1.5%' },
    { label: 'Natural Fruit Sugar', value: '2.8 g', rda: '—' },
    { label: 'Added Refined Sugars', value: '0 g', rda: '0%' },
    { label: 'Potassium (Electrolyte)', value: '180 mg', rda: '5%' },
    { label: 'Polyphenols & Tannins', value: '120 mg', rda: 'High' },
  ];

  return (
    <section id="benefits" className="relative py-28 px-4 sm:px-8 bg-[#09150d] text-emerald-100 overflow-hidden">
      {/* Decorative background foliage ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-lime-400/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles size={14} />
            Ancient Botanical Super-Fruit
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            20x The Vitamin C Of Fresh Oranges.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-300">
              Zero Synthetic Chemicals.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-200/70 leading-relaxed">
            Wild Amla (<span className="italic">Phyllanthus emblica</span>) has been revered for
            over 3,000 years in Ayurveda as the ultimate <span className="text-lime-300 font-semibold">Rasayana</span>—the rejuvenator of vital youth, digestion, and natural vitality.
          </p>
        </div>

        {/* 4 Super Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {[
            {
              metric: '20x',
              label: 'Vitamin C vs Oranges',
              detail: 'Natural L-ascorbic acid protected by tannins from oxidation',
              icon: <Zap className="text-lime-400" size={20} />,
            },
            {
              metric: '2x',
              label: 'Antioxidants vs Acai',
              detail: 'Ultra-high ORAC score scavenging free radicals',
              icon: <Shield className="text-emerald-400" size={20} />,
            },
            {
              metric: '100%',
              label: 'Cold-Pressed Wild',
              detail: 'Never heated, preserving living raw digestive enzymes',
              icon: <Flame className="text-amber-400" size={20} />,
            },
            {
              metric: '0g',
              label: 'Zero Sugar & Additives',
              detail: 'No preservatives, artificial colors, or corn syrup',
              icon: <Activity className="text-teal-300" size={20} />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/20 hover:border-lime-400/40 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/70 border border-emerald-400/30 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-lime-300 transition-colors">
                {item.metric}
              </div>
              <div className="text-xs sm:text-sm font-bold text-lime-400/90 mt-1 uppercase tracking-wider">
                {item.label}
              </div>
              <p className="text-[12px] text-emerald-200/60 mt-2 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Dive Interactive Panel: Benefits / Nutrition / Sacred Origin */}
        <div id="ingredients" className="glass-panel rounded-3xl border border-emerald-500/30 p-6 sm:p-10 mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-6 mb-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider transition-all ${
                  activeTab === 'benefits'
                    ? 'bg-lime-500 text-stone-950 shadow-lg shadow-lime-500/25'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                Super-Benefits
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider transition-all ${
                  activeTab === 'nutrition'
                    ? 'bg-lime-500 text-stone-950 shadow-lg shadow-lime-500/25'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                Lab Nutrition Facts
              </button>
              <button
                onClick={() => setActiveTab('origin')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider transition-all ${
                  activeTab === 'origin'
                    ? 'bg-lime-500 text-stone-950 shadow-lg shadow-lime-500/25'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                Forest Harvest Origin
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-lime-400 font-semibold">
              <Award size={16} />
              <span>Ayush & GMP Certified Raw Facility</span>
            </div>
          </div>

          {/* Tab 1: Benefits */}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center font-black mb-3">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2">Unmatched Immune Defense</h3>
                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  Unlike synthetic ascorbic acid pills that flush out in hours, wild Amla’s polyphenol matrix keeps active Vitamin C circulating in your bloodstream for up to 24 hours.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center font-black mb-3">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2">Gut Microbiome & Digestion</h3>
                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  Natural sour and astringent notes stimulate gastric agni (metabolic fire) and bile secretion, banishing post-meal lethargy and rebalancing intestinal microflora.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
                <div className="w-9 h-9 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center font-black mb-3">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2">Skin Collagen & Hair Glow</h3>
                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  High ellagitannins stimulate type-1 pro-collagen synthesis while inhibiting collagenase enzymes, promoting luminous dermal hydration and strengthening hair roots.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Lab Nutrition Facts */}
          {activeTab === 'nutrition' && (
            <div className="max-w-2xl mx-auto animate-in fade-in">
              <div className="border border-emerald-500/30 rounded-2xl overflow-hidden bg-emerald-950/50">
                <div className="bg-emerald-900/40 px-6 py-4 border-b border-emerald-500/20 flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Serving Size: 1 Bottle (100 ml)</span>
                  <span className="text-xs text-lime-400 font-semibold">100% Pure Plant Formulation</span>
                </div>
                <div className="divide-y divide-emerald-500/10">
                  {nutritionData.map((row, i) => (
                    <div key={i} className="px-6 py-3 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-emerald-200 font-medium">{row.label}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-bold">{row.value}</span>
                        <span className="text-lime-400/80 font-mono text-xs w-12 text-right">{row.rda}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Origin */}
          {activeTab === 'origin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in">
              <div>
                <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                  Western Ghats Protected Biosphere
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-4">
                  Harvested with Reverence from Centuries-Old Wild Trees
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed mb-4">
                  Commercial orchard amlas are plump with chemical fertilizer water. Our amlas are wild-foraged by indigenous forest tribes under fair-trade stewardship in pristine misty cloud forests.
                </p>
                <ul className="space-y-2 text-xs text-emerald-100/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-lime-400 flex-shrink-0" />
                    Zero synthetic pesticides or commercial runoff
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-lime-400 flex-shrink-0" />
                    Cold hydraulic pressing within 6 hours of morning plucking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-lime-400 flex-shrink-0" />
                    Bottled in recyclable, BPA-free UV-shielded PET containers
                  </li>
                </ul>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 aspect-video shadow-2xl">
                <img
                  src="/background2.png"
                  alt="Wild Harvest Waterfall Valley"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <p className="text-xs text-white/90 font-medium">
                    The Sacred Valley Springs where every drop of pure spring water is sourced.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pack Selector & Purchase Box */}
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-lime-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
              Fresh Daily Cold-Chain Delivery
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Select Your Hydration Supply
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {packs.map((pack) => (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack.id as typeof selectedPack)}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
                  selectedPack === pack.id
                    ? 'bg-lime-500/15 border-lime-400 shadow-xl shadow-lime-500/20 scale-[1.02]'
                    : 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-400/40'
                }`}
              >
                {pack.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-lime-400 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow">
                    {pack.tag}
                  </span>
                )}
                <div className="text-sm font-bold text-white mb-1">{pack.name}</div>
                <div className="text-xs text-emerald-200/60 mb-3">{pack.bottles}</div>
                <div className="text-2xl font-black text-lime-300">{pack.price}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-500/20">
            <div className="text-xs text-emerald-200/70 text-center sm:text-left">
              ✓ 100% Satisfaction Guarantee • Ships in insulated chilled eco-packs
            </div>
            <button
              onClick={onAddToCart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-lime-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Add Selected Pack to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
