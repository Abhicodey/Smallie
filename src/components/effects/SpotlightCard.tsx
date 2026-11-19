import React, { useRef, useState, useEffect } from "react";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
}

/**
 * SpotlightCard React Bit:
 * Focuses a restrained, soft candlelight/golden spotlight following touch/cursor.
 */
export const SpotlightCard: React.FC<SpotlightProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(201, 166, 107, 0.15)",
  size = 280,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    // Default soft center glow on mobile if no pointer movement
    setPosition({ x: 150, y: 150 });
    setOpacity(0.6);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.75)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-out z-10"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
};
