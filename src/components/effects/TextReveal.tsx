import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

/**
 * TextReveal:
 * Crisp, clean typography fade. Avoids muddy CSS blur filters.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0.2,
  as: Tag = "p",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        delay,
        duration: 0.9,
        ease: "power2.out",
      }
    );
  }, [text, delay]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {text}
    </Tag>
  );
};
