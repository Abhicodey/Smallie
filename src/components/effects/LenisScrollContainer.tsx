import React, { useRef } from "react";

interface LenisScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

/**
 * LetterScrollContainer:
 * Clean, native momentum scrolling container that guarantees full touch, trackpad,
 * and mousewheel responsiveness without blocking parent document flow.
 */
export const LenisScrollContainer: React.FC<LenisScrollContainerProps> = ({
  children,
  className = "",
  maxHeight = "48vh",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto overscroll-contain ${className}`}
      style={{
        maxHeight,
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
    >
      <div className="pb-2">{children}</div>
    </div>
  );
};
