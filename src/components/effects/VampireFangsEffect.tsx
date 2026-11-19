import React from "react";

interface VampireFangsEffectProps {
  stage: "idle" | "approaching" | "biting" | "bitten";
}

export const VampireFangsEffect: React.FC<VampireFangsEffectProps> = ({ stage }) => {
  return (
    <div
      className={`vampire-fangs-overlay pointer-events-none fixed inset-0 flex flex-col items-center justify-center transition-all duration-700 z-[95] ${
        stage === "approaching" ? "fangs-approaching" : stage === "biting" || stage === "bitten" ? "fangs-biting" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Red ambient misty aura */}
      <div className="absolute inset-0 bg-radial-vampire-aura pointer-events-none transition-opacity duration-500" />

      {/* Realistic, elegant vampire fangs & mouth silhouette */}
      <div className="fangs-container relative flex flex-col items-center select-none">
        <svg
          viewBox="0 0 320 220"
          className="w-[280px] sm:w-[360px] h-auto drop-shadow-[0_0_35px_rgba(186,24,47,0.85)] filter"
        >
          <defs>
            {/* Tooth Ivory Gradient */}
            <linearGradient id="fangIvoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBF2" />
              <stop offset="65%" stopColor="#F6EBDD" />
              <stop offset="90%" stopColor="#E5D7C3" />
              <stop offset="100%" stopColor="#D9243E" />
            </linearGradient>
            {/* Gums / Crimson Shadow */}
            <linearGradient id="gumsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B0813" />
              <stop offset="60%" stopColor="#6E0D1E" />
              <stop offset="100%" stopColor="#4A0814" />
            </linearGradient>
            {/* Blood Gleam */}
            <radialGradient id="bloodGleam" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="60%" stopColor="#B30927" />
              <stop offset="100%" stopColor="#54000F" />
            </radialGradient>
          </defs>

          {/* Upper Jaw / Gums Arch */}
          <path
            d="M 30 70 Q 160 30 290 70 Q 160 10 30 70 Z"
            fill="url(#gumsGrad)"
            opacity="0.9"
          />

          {/* Central Incisors */}
          {/* Central Left */}
          <path
            d="M 136 60 L 157 60 Q 158 84 156 94 L 138 94 Q 135 84 136 60 Z"
            fill="#FFFBF2"
            stroke="#3B0813"
            strokeWidth="1.2"
          />
          {/* Central Right */}
          <path
            d="M 163 60 L 184 60 Q 185 84 182 94 L 164 94 Q 162 84 163 60 Z"
            fill="#FFFBF2"
            stroke="#3B0813"
            strokeWidth="1.2"
          />

          {/* Lateral Incisors */}
          <path
            d="M 112 63 L 132 61 Q 132 80 131 88 L 115 88 Q 112 78 112 63 Z"
            fill="#F6EBDD"
            stroke="#3B0813"
            strokeWidth="1.2"
          />
          <path
            d="M 188 61 L 208 63 Q 208 78 205 88 L 189 88 Q 188 80 188 61 Z"
            fill="#F6EBDD"
            stroke="#3B0813"
            strokeWidth="1.2"
          />

          {/* LEFT ICONIC VAMPIRE FANG */}
          <g className="fang-left">
            <path
              d="M 82 66 Q 96 64 108 64 Q 107 92 101 118 Q 95 142 93 158 Q 90 142 85 116 Q 81 92 82 66 Z"
              fill="url(#fangIvoryGrad)"
              stroke="#54000F"
              strokeWidth="1.5"
            />
            {/* Gleam edge */}
            <path
              d="M 87 72 Q 89 108 93 146"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Crimson droplet on left fang tip */}
            <circle cx="93" cy="158" r="3.2" fill="url(#bloodGleam)" className="blood-drip-left" />
          </g>

          {/* RIGHT ICONIC VAMPIRE FANG */}
          <g className="fang-right">
            <path
              d="M 212 64 Q 224 64 238 66 Q 239 92 235 116 Q 230 142 227 158 Q 225 142 219 118 Q 213 92 212 64 Z"
              fill="url(#fangIvoryGrad)"
              stroke="#54000F"
              strokeWidth="1.5"
            />
            {/* Gleam edge */}
            <path
              d="M 233 72 Q 231 108 227 146"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Crimson droplet on right fang tip */}
            <circle cx="227" cy="158" r="3.2" fill="url(#bloodGleam)" className="blood-drip-right" />
          </g>

          {/* Outer Premolars */}
          <path
            d="M 64 71 L 78 68 Q 80 82 78 92 L 67 92 Z"
            fill="#E5D7C3"
            stroke="#3B0813"
            strokeWidth="1.2"
          />
          <path
            d="M 242 68 L 256 71 Q 253 82 251 92 L 242 92 Z"
            fill="#E5D7C3"
            stroke="#3B0813"
            strokeWidth="1.2"
          />
        </svg>

        {/* Cinematic Bite Vignette / Crimson Heartbeat Flash */}
        <div className="fangs-blood-pulse mt-4 flex items-center justify-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E50926] shadow-[0_0_12px_#FF2E4D] animate-ping" />
          <span className="font-serif tracking-[0.25em] text-xs font-semibold text-[#F2C4CF] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            A Nocturne Embrace
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E50926] shadow-[0_0_12px_#FF2E4D] animate-ping" />
        </div>
      </div>
    </div>
  );
};
