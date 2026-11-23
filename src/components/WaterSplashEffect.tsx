import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface WaterSplashRef {
  trigger: (x?: number, y?: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  growth: number;
}

export const WaterSplashEffect = forwardRef<WaterSplashRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    trigger: (customX?: number, customY?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const originX = customX ?? canvas.width / 2;
      const originY = customY ?? canvas.height * 0.7;

      // Spawn droplet particles
      const count = 48;
      const droplets: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // biased upwards and sideways
        const upwardBias = Math.sin(angle) < 0 ? 1.4 : 0.4;
        const speed = (Math.random() * 6 + 2) * upwardBias;

        droplets.push({
          x: originX + (Math.random() - 0.5) * 30,
          y: originY + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed * 1.2,
          vy: Math.sin(angle) * speed * 0.9 - 3.5, // strong upward kick
          radius: Math.random() * 3 + 1.2,
          alpha: 0.95,
          decay: Math.random() * 0.018 + 0.012,
          color: Math.random() > 0.4 ? 'rgba(235, 255, 235, ' : 'rgba(180, 240, 200, ',
        });
      }
      particlesRef.current.push(...droplets);

      // Spawn expanding shockwave ripples
      for (let r = 0; r < 3; r++) {
        setTimeout(() => {
          ripplesRef.current.push({
            x: originX,
            y: originY + 5,
            radius: 8 + r * 6,
            maxRadius: 110 + r * 35,
            alpha: 0.85 - r * 0.2,
            growth: 3.2 + r * 0.8,
          });
        }, r * 80);
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update ripples (perspective ellipses on stone)
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.growth;
        r.alpha -= 0.016;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        // Ellipse to match stone platform angle (flattened in Y)
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 255, 230, ${Math.max(0, r.alpha)})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = 'rgba(160, 240, 180, 0.6)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Render & update droplet particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // Gravity pulling droplets down
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
});

WaterSplashEffect.displayName = 'WaterSplashEffect';
