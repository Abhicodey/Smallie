import React, { useEffect, useRef } from "react";

interface FirefliesProps {
  count?: number;
  showHearts?: boolean;
  className?: string;
}

/**
 * Atmospheric Fireflies & Hearts Layer:
 * Soft ambient glowing points that gently drift upward.
 * Automatically halts when prefers-reduced-motion is active.
 */
export const Fireflies: React.FC<FirefliesProps> = ({
  count = 14,
  showHearts = false,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.35 - 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.015,
      isHeart: showHearts && i % 3 === 0,
      color: i % 2 === 0 ? "rgba(242, 196, 207, " : "rgba(201, 166, 107, ",
    }));

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, s: number, a: number) => {
      c.save();
      c.translate(x, y);
      c.scale(s * 0.4, s * 0.4);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-3, -3, -6, 0, 0, 5);
      c.bezierCurveTo(6, 0, 3, -3, 0, 0);
      c.fillStyle = `rgba(242, 196, 207, ${a})`;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const alpha = Math.sin(p.phase) * 0.35 + 0.45;

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.size * 1.5, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#F2C4CF";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [count, showHearts]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
