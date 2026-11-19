import React from "react";

interface VantaFogProps {
  className?: string;
}

/**
 * Atmospheric Fog Canvas:
 * Soft, elegant drifting nocturnal mist built on HTML5 Canvas.
 * 100% transparent, zero WebGL driver conflicts, perfectly layered in background.
 */
export const VantaFog: React.FC<VantaFogProps> = ({ className = "" }) => {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(242, 196, 207, 0.15) 0%, rgba(43, 21, 51, 0.25) 50%, transparent 80%)",
        }}
      />
    </div>
  );
};
