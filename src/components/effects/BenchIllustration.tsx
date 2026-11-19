import React, { useState } from "react";

interface BenchIllustrationProps {
  onBrownieTap?: () => void;
}

export const BenchIllustration: React.FC<BenchIllustrationProps> = () => {
  const [isWobbling, setIsWobbling] = useState(false);

  const handleTapDessert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWobbling(true);
    setTimeout(() => {
      setIsWobbling(false);
    }, 850);
  };

  return (
    <div className="bench-illustration-container relative w-full h-[220px] rounded-lg overflow-hidden select-none">
      {/* Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0717] via-[#1D0C26] to-[#0A050E]" />

      {/* Moon in top-left */}
      <div className="absolute top-4 left-6 w-11 h-11 rounded-full bg-[#F6EBDD] shadow-[0_0_24px_rgba(246,235,221,0.65)] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EAD9C0] to-[#FFF8EE] opacity-90" />
      </div>
      {/* Moon halo */}
      <div className="absolute top-1 left-3 w-16 h-16 rounded-full bg-[#F2C4CF] opacity-15 blur-lg pointer-events-none" />

      {/* Street / Garden Lamp on the Right */}
      <div className="absolute top-6 right-8 flex flex-col items-center pointer-events-none">
        {/* Warm lamp glow */}
        <div className="absolute -top-3 w-28 h-28 rounded-full bg-[#F6D388] opacity-25 blur-xl animate-pulse" />
        {/* Lamp cap & finial */}
        <div className="w-8 h-2.5 bg-[#C9A66B] rounded-t-sm" />
        {/* Glowing glass chamber */}
        <div className="w-6 h-7 bg-[#FFF2B8] rounded-sm shadow-[0_0_18px_#F6D388] flex items-center justify-center border border-[#C9A66B]">
          <div className="w-2 h-3.5 bg-[#FFFDE6] rounded-full blur-[0.5px]" />
        </div>
        {/* Lamp base collar & post */}
        <div className="w-7 h-1.5 bg-[#8A6D3B]" />
        <div className="w-2 h-28 bg-[#1A0D20] border-x border-[#3A1E45]" />
      </div>

      {/* Mist & Ground Silhouette */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#07030A] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-7 bg-[#07030A]" />

      {/* Vector Bench Silhouette */}
      <svg
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[220px] h-[78px] pointer-events-none text-[#23122B]"
        viewBox="0 0 220 78"
        fill="currentColor"
      >
        {/* Backrest rails */}
        <rect x="25" y="10" width="170" height="5" rx="2.5" fill="#2E1838" />
        <rect x="25" y="20" width="170" height="5" rx="2.5" fill="#2E1838" />
        <rect x="25" y="30" width="170" height="5" rx="2.5" fill="#2E1838" />
        {/* Back vertical bars */}
        <line x1="45" y1="8" x2="45" y2="42" stroke="#1A0B20" strokeWidth="4" />
        <line x1="85" y1="8" x2="85" y2="42" stroke="#1A0B20" strokeWidth="4" />
        <line x1="135" y1="8" x2="135" y2="42" stroke="#1A0B20" strokeWidth="4" />
        <line x1="175" y1="8" x2="175" y2="42" stroke="#1A0B20" strokeWidth="4" />
        {/* Seat Plank */}
        <rect x="18" y="42" width="184" height="7" rx="3.5" fill="#3D204A" />
        {/* Legs */}
        <path d="M 32 49 L 26 78 L 33 78 L 37 49 Z" fill="#180A1E" />
        <path d="M 188 49 L 194 78 L 187 78 L 183 49 Z" fill="#180A1E" />
        {/* Armrests */}
        <path d="M 22 43 C 22 28, 30 25, 36 25 L 36 29 C 32 29, 27 32, 27 43 Z" fill="#C9A66B" />
        <path d="M 198 43 C 198 28, 190 25, 184 25 L 184 29 C 188 29, 193 32, 193 43 Z" fill="#C9A66B" />
      </svg>

      {/* 8 to 12 Drifting Fireflies */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="bench-firefly" style={{ top: "25%", left: "18%", animationDelay: "0s", animationDuration: "3.2s" }} />
        <span className="bench-firefly" style={{ top: "45%", left: "28%", animationDelay: "1.2s", animationDuration: "2.8s" }} />
        <span className="bench-firefly" style={{ top: "18%", left: "48%", animationDelay: "0.5s", animationDuration: "3.6s" }} />
        <span className="bench-firefly" style={{ top: "52%", left: "62%", animationDelay: "2.1s", animationDuration: "2.5s" }} />
        <span className="bench-firefly" style={{ top: "35%", left: "82%", animationDelay: "1.7s", animationDuration: "3.1s" }} />
        <span className="bench-firefly" style={{ top: "65%", left: "15%", animationDelay: "0.8s", animationDuration: "3.8s" }} />
        <span className="bench-firefly" style={{ top: "72%", left: "42%", animationDelay: "1.5s", animationDuration: "2.9s" }} />
        <span className="bench-firefly" style={{ top: "28%", left: "70%", animationDelay: "2.4s", animationDuration: "3.3s" }} />
        <span className="bench-firefly" style={{ top: "60%", left: "85%", animationDelay: "0.3s", animationDuration: "2.7s" }} />
        <span className="bench-firefly" style={{ top: "40%", left: "40%", animationDelay: "1.9s", animationDuration: "3.5s" }} />
      </div>

      {/* Small Brownie with Vanilla Ice-Cream Scoop on the Bench Seat */}
      <div
        className={`absolute bottom-[28px] left-[52%] -translate-x-1/2 z-20 cursor-pointer group ${
          isWobbling ? "dessert-wobble-active" : ""
        }`}
        onClick={handleTapDessert}
        title="Tap the brownie!"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleTapDessert(e as unknown as React.MouseEvent);
          }
        }}
      >
        {/* Soft plate */}
        <div className="w-12 h-2 bg-[#F6EBDD] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.6)] mx-auto opacity-95" />
        {/* Brownie block */}
        <div className="relative -mt-2 w-9 h-4 bg-[#3E1B10] border border-[#2B120B] rounded-[2px] mx-auto shadow-sm">
          {/* Fudge shimmer */}
          <div className="w-full h-1 bg-[#5A291A] rounded-t-[1px]" />
          {/* Vanilla Ice-Cream Scoop on top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-5 rounded-full bg-[#FFFBEA] border border-[#F2E5B8] shadow-[0_0_8px_rgba(255,251,234,0.7)] flex items-center justify-center">
            {/* Melting drip */}
            <div className="absolute -bottom-1 left-1.5 w-1.5 h-2 bg-[#FFFBEA] rounded-b-full" />
            {/* Tiny cherry/glint dot */}
            <div className="w-1 h-1 rounded-full bg-[#F2C4CF]" />
          </div>
        </div>
      </div>
    </div>
  );
};
