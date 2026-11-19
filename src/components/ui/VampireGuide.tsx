import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export type GuidePose = "wave" | "idle" | "tease" | "wink" | "bow" | "present" | "exit";

interface VampireGuideProps {
  dialogue: string;
  onReplayAudio?: () => void;
  pose?: GuidePose;
  className?: string;
}

const POSE_IMAGE_MAP: Record<GuidePose, string> = {
  wave: "/assets/images/guide/lucien_wave.png",
  idle: "/assets/images/guide/lucien_idle.png",
  tease: "/assets/images/guide/lucien_tease.png",
  wink: "/assets/images/guide/lucien_wink.png",
  bow: "/assets/images/guide/lucien_bow.png",
  present: "/assets/images/guide/lucien_present.png",
  exit: "/assets/images/guide/lucien_exit.png",
};

export const VampireGuide: React.FC<VampireGuideProps> = ({
  dialogue,
  onReplayAudio,
  pose = "idle",
  className = "",
}) => {
  const [currentText, setCurrentText] = useState(dialogue);
  const [isReacting, setIsReacting] = useState(false);

  // Sync dialogue if parent changes (e.g. audio captions progressing)
  React.useEffect(() => {
    setCurrentText(dialogue);
  }, [dialogue]);

  const handleTapGuide = () => {
    if (!onReplayAudio) return;
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 900);
    onReplayAudio();
  };

  const imageSrc = POSE_IMAGE_MAP[pose] || POSE_IMAGE_MAP.idle;
  const isInteractive = Boolean(onReplayAudio);

  return (
    <div
      className={`vampire-guide-root flex flex-col items-center my-3 select-none pointer-events-auto ${className}`}
      style={{ zIndex: 32 }}
    >
      {/* Dialogue Speech Bubble */}
      <div
        className="vampire-speech-bubble relative max-w-[280px] sm:max-w-[320px] pt-3 pb-2.5 px-4 rounded-2xl mb-2 text-left shadow-lg backdrop-blur-md transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(43, 21, 51, 0.95), rgba(26, 11, 32, 0.98))",
          border: "1.5px solid rgba(242, 196, 207, 0.45)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(242, 196, 207, 0.2)",
        }}
        role="region"
        aria-live="polite"
      >
        {/* Character Label: Name and Sparkle Icon neatly aligned */}
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C4CF]" />
          <span className="text-[12px] font-bold tracking-wider text-[#C9A66B] uppercase font-sans">
            Damon
          </span>
        </div>

        <p className="text-[13px] leading-snug font-sans text-[#F6EBDD]/95 font-medium">
          {currentText}
        </p>

        {/* Subtle triangle tail */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "8px solid rgba(26, 11, 32, 0.98)",
          }}
        />
      </div>

      {/* 2D Illustrated Vampire Character */}
      <div
        className={`vampire-avatar-wrap relative ${isInteractive ? "cursor-pointer group" : "cursor-default"} ${isReacting ? "vampire-tap-bounce" : ""}`}
        onClick={isInteractive ? handleTapGuide : undefined}
        title={isInteractive ? "Tap Damon to replay audio" : undefined}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTapGuide();
                }
              }
            : undefined
        }
        aria-label={isInteractive ? "Damon the vampire guide. Tap to replay audio." : undefined}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Damon the vampire guide"
            className={`h-[128px] sm:h-[142px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)] filter transition-transform duration-300 ${isInteractive ? "group-hover:scale-105" : ""}`}
            loading="eager"
          />

          {/* Soft ambient violet-blush glow behind him */}
          <div className="absolute inset-0 rounded-full bg-[#F2C4CF] opacity-15 blur-lg pointer-events-none -z-10" />
        </div>
      </div>
    </div>
  );
};
