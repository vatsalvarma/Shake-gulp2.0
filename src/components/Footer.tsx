import { Heart, Shield, Leaf, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050d07] border-t border-emerald-500/20 pt-16 pb-12 px-4 sm:px-8 text-emerald-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-400 p-[2px] shadow-lg shadow-lime-500/20">
                <div className="w-full h-full bg-[#0a180e] rounded-full flex items-center justify-center">
                  <span className="text-lime-400 font-extrabold text-sm">S&G</span>
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                SHAKE & GULP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/70 max-w-sm leading-relaxed">
              Bottling nature’s most potent wild antioxidant elixir. Pure cold-pressed Indian Gooseberry (Amla) harvested by tribal cooperatives in the pristine Western Ghats rainforests.
            </p>
            <div className="flex items-center gap-4 text-xs text-lime-400/90 pt-2 font-medium">
              <span className="flex items-center gap-1">
                <Leaf size={14} /> 100% Wild Sourced
              </span>
              <span className="flex items-center gap-1">
                <Shield size={14} /> Zero Synthetic Heat
              </span>
              <span className="flex items-center gap-1">
                <Heart size={14} /> Fair-Trade Tribal Pact
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/70">
              <li>
                <a href="#benefits" className="hover:text-lime-300 transition-colors">
                  Amla Super-Science
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-lime-300 transition-colors">
                  Sacred Valley Origin
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-lime-300 transition-colors">
                  Customer Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime-300 transition-colors">
                  Storage & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              The Wild Dispatch
            </h4>
            <p className="text-xs text-emerald-200/70 mb-3">
              Receive seasonal harvest alerts and circadian vitality guides.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-lime-400"
              />
              <button className="px-3.5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-stone-950 font-bold transition-all">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-emerald-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-300/50">
          <p>© {new Date().getFullYear()} Shake & Gulp Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for pure daily hydration and living vitality.
          </p>
        </div>
      </div>
    </footer>
  );
};
