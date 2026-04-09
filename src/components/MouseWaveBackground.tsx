import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface MouseWaveBackgroundProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export default function MouseWaveBackground({ 
  className = '', 
  color = '139, 92, 246',
  opacity = 0.06
}: MouseWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const ripplesRef = useRef<Ripple[]>([]);
  const animRef = useRef<number>(0);
  const lastRippleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      const now = Date.now();
      if (now - lastRippleRef.current > 350) {
        lastRippleRef.current = now;
        ripplesRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: 180 + Math.random() * 120,
          opacity: opacity * 4,
          speed: 1.5 + Math.random() * 1.5,
        });
      }
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouse);

    let time = 0;

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Subtle wave lines (base layer)
      const lineCount = 6;
      const spacing = height / (lineCount + 1);
      for (let i = 0; i < lineCount; i++) {
        const baseY = spacing * (i + 1);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color}, ${opacity * 1.2 * (1 - Math.abs(i - lineCount / 2) / lineCount)})`;
        ctx.lineWidth = 0.8;
        for (let x = 0; x <= width; x += 4) {
          const wave1 = Math.sin(x * 0.004 + time + i * 0.7) * 5;
          const wave2 = Math.sin(x * 0.008 + time * 1.2 + i) * 3;
          // Mouse influence on waves
          let mouseWave = 0;
          if (mx > 0 && my > 0) {
            const dx = x - mx;
            const dy = baseY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 400) * 15;
            mouseWave = Math.sin(x * 0.006 - time * 1.5) * influence;
          }
          const y = baseY + wave1 + wave2 + mouseWave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw ripples on top
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        const progress = r.radius / r.maxRadius;
        r.opacity = opacity * 4 * (1 - progress) * (1 - progress);

        if (r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        for (let ring = 0; ring < 3; ring++) {
          const ringRadius = r.radius - ring * 12;
          if (ringRadius <= 0) continue;
          const ringOpacity = r.opacity * (1 - ring * 0.3);
          ctx.beginPath();
          ctx.arc(r.x, r.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color}, ${ringOpacity})`;
          ctx.lineWidth = 1.5 - ring * 0.4;
          ctx.stroke();
        }
      }

      // Subtle glow at mouse position
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        gradient.addColorStop(0, `rgba(${color}, ${opacity * 1.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      if (ripples.length > 25) {
        ripples.splice(0, ripples.length - 25);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('mousemove', handleMouse);
    };
  }, [color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
