import React from "react";
import gsap from "gsap";

interface WaxSealButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const WaxSealButton: React.FC<WaxSealButtonProps> = ({
  label,
  onClick,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      const el = e.currentTarget;
      // Wobble and crack-open scale animation with heart bounce
      gsap.timeline({ onComplete: onClick })
        .to(el, { rotation: -6, duration: 0.08 })
        .to(el, { rotation: 6, duration: 0.08 })
        .to(el, { rotation: -3, duration: 0.06 })
        .to(el, { rotation: 0, scale: 1.12, duration: 0.15, ease: "back.out(2)" })
        .to(el, { scale: 0.92, opacity: 0.8, duration: 0.2 });
    } else {
      onClick();
    }
  };

  return (
    <div className="wax-seal-wrapper">
      <button
        onClick={handleClick}
        aria-label={`${label} the nocturnal experience`}
        type="button"
        className={`wax-seal-btn group focus:outline-none focus:ring-2 focus:ring-[#F2C4CF] ${className}`}
      >
        <div className="wax-seal-inner">
          <span>{label}</span>
        </div>
      </button>
    </div>
  );
};
