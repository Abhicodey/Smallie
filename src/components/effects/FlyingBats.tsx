import React from "react";

interface FlyingBatsProps {
  count?: number;
  className?: string;
}

export const FlyingBats: React.FC<FlyingBatsProps> = ({ count = 2, className = "" }) => {
  const bats = Array.from({ length: count });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-10 ${className}`} aria-hidden="true">
      {bats.map((_, i) => (
        <div
          key={i}
          className="bat-flyer"
          style={{
            top: `${15 + i * 18}%`,
            animationDelay: `${i * 3.5}s`,
            animationDuration: `${10 + i * 2}s`,
          }}
        >
          <svg viewBox="0 0 40 24" className="w-6 h-4 opacity-40 fill-current text-[#F2C4CF]">
            <path d="M20,10 C16,4 10,4 2,8 C6,13 12,14 17,13 C18,17 22,17 23,13 C28,14 34,13 38,8 C30,4 24,4 20,10 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
