import React from "react";
import gsap from "gsap";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      gsap.to(e.currentTarget, {
        scale: 0.96,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
        onComplete: onClick,
      });
    } else {
      onClick();
    }
  };

  return (
    <div className="button-action-wrap">
      <button
        onClick={handleClick}
        disabled={disabled}
        type="button"
        aria-label={ariaLabel || (typeof children === "string" ? children : "Continue")}
        className={`btn-primary focus:outline-none focus:ring-2 focus:ring-[#F2C4CF] ${className}`}
      >
        {children}
      </button>
    </div>
  );
};
