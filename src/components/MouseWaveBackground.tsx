import { useEffect, useRef } from 'react';

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
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

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
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouse);

    let time = 0;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw subtle wave lines
      const lineCount = 6;
      const spacing = height / (lineCount + 1);

      for (let i = 0; i < lineCount; i++) {
        const baseY = spacing * (i + 1);
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color}, ${opacity * (1 - Math.abs(i - lineCount / 2) / lineCount)})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += 3) {
          // Distance from mouse influences wave amplitude
          const dx = x - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 400) * 25;

          const wave1 = Math.sin(x * 0.005 + time + i * 0.8) * 8;
          const wave2 = Math.sin(x * 0.01 + time * 1.3 + i) * 4;
          const mouseWave = Math.sin(x * 0.008 - time * 2) * influence;
          
          const y = baseY + wave1 + wave2 + mouseWave;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // Subtle radial glow at mouse position
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        gradient.addColorStop(0, `rgba(${color}, ${opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
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
