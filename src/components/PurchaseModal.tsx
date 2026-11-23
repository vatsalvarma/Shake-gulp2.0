import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessOrder?: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [flavor, setFlavor] = useState('Wild Amla Classic');
  const [plan, setPlan] = useState<'subscribe' | 'onetime'>('subscribe');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const basePrice = 18.99; // for 6-pack
  const discount = plan === 'subscribe' ? 0.15 : 0;
  const unitPrice = basePrice * (1 - discount);
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a3e635', '#34d399', '#fde047'],
    });

    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-lime-400/40 shadow-2xl text-emerald-100 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {isOrdered ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-lime-400 text-stone-950 flex items-center justify-center mb-4 shadow-xl shadow-lime-400/30 animate-bounce">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black text-white">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 max-w-xs">
              Your chilled 6-pack of fresh cold-pressed Wild Amla Shots is being prepped for dispatch!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="glass-pill px-3 py-1 rounded-full text-[10px] uppercase font-bold text-lime-400">
                Fresh Cold-Chain Delivery
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">
              Your Daily Vitality Box
            </h3>

            {/* Product Summary Row */}
            <div className="flex gap-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 mb-5 items-center">
              <div className="w-14 h-20 bg-emerald-900/40 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-emerald-400/20 flex-shrink-0">
                <img src="/bottle.png" alt="Amla Shot" className="h-full object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Shake & Gulp — 6-Pack (100ml)</h4>
                <p className="text-xs text-lime-400 font-semibold">{flavor}</p>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">Cold hydraulic extraction</p>
              </div>
            </div>

            {/* Flavor selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200/80 mb-2">
                Select Recipe Flavor
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Wild Amla Classic', 'Amla + Ginger Honey'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                      flavor === f
                        ? 'bg-lime-500/20 border-lime-400 text-white'
                        : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-200/70'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription toggle */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div
                onClick={() => setPlan('subscribe')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  plan === 'subscribe'
                    ? 'bg-lime-500/20 border-lime-400 shadow-md'
                    : 'bg-emerald-950/40 border-emerald-500/20 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Subscribe & Save</span>
                  <span className="text-[10px] bg-lime-400 text-stone-950 px-1.5 py-0.5 rounded font-black">
                    -15%
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200/70 mt-1">
                  Weekly fresh insulated shipment
                </div>
              </div>

              <div
                onClick={() => setPlan('onetime')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  plan === 'onetime'
                    ? 'bg-lime-500/20 border-lime-400 shadow-md'
                    : 'bg-emerald-950/40 border-emerald-500/20 opacity-70'
                }`}
              >
                <div className="text-xs font-bold text-white">One-Time Trial</div>
                <div className="text-[11px] text-emerald-200/70 mt-1">Single 6-pack delivery</div>
              </div>
            </div>

            {/* Quantity and Total */}
            <div className="flex items-center justify-between border-t border-emerald-500/20 pt-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-200">Boxes:</span>
                <div className="flex items-center border border-emerald-500/30 rounded-xl bg-emerald-950/40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-emerald-300 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-mono font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-emerald-300 hover:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-emerald-200/60 block">Total Due:</span>
                <span className="text-2xl font-black text-lime-300">${totalPrice}</span>
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-lime-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>Complete Chilled Checkout</span>
            </button>

            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-emerald-300/60">
              <span className="flex items-center gap-1">
                <Truck size={12} /> Chilled Shipping
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} /> Carbon-Neutral
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

