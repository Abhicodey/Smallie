import React, { useEffect, useMemo, useState } from "react";
import { siteContent } from "../../content/siteContent";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface BlackoutSceneProps {
  onBlackoutComplete: () => void;
}

const BLACKOUT_CLIPS: VoiceClip[] = [
  {
    text: "“Lights out. Don't panic. Much.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-15-Lights-out.-Don’t-panic.-Much.mp3",
  },
];

export const BlackoutScene: React.FC<BlackoutSceneProps> = ({ onBlackoutComplete }) => {
  const { blackout } = siteContent.scenes;
  const { playClipQueue } = useAudio();
  const [caption, setCaption] = useState(BLACKOUT_CLIPS[0].text);

  useEffect(() => {
    // Play blackout voice clip
    const cancelAudio = playClipQueue(BLACKOUT_CLIPS, (idx) => {
      setCaption(BLACKOUT_CLIPS[idx].text);
    });

    // Pacing matches blackout duration (~4.5s for audio clip to finish)
    const timer = setTimeout(() => {
      onBlackoutComplete();
    }, 4500);

    return () => {
      cancelAudio();
      clearTimeout(timer);
    };
  }, [blackout, onBlackoutComplete, playClipQueue]);

  // 16 carefully placed twinkling stars
  const stars = useMemo(() => [
    { top: "14%", left: "22%", size: 2, delay: "0.2s", dur: "2.8s", color: "#F6EBDD" },
    { top: "18%", left: "68%", size: 1.5, delay: "0.8s", dur: "3.2s", color: "#F2C4CF" },
    { top: "25%", left: "44%", size: 2.5, delay: "1.4s", dur: "2.5s", color: "#C9A66B" },
    { top: "32%", left: "15%", size: 1.5, delay: "0.4s", dur: "3.6s", color: "#F6EBDD" },
    { top: "29%", left: "82%", size: 2, delay: "1.9s", dur: "2.9s", color: "#F6EBDD" },
    { top: "42%", left: "30%", size: 1, delay: "0.6s", dur: "3.1s", color: "#F2C4CF" },
    { top: "48%", left: "75%", size: 2, delay: "1.1s", dur: "2.4s", color: "#C9A66B" },
    { top: "58%", left: "18%", size: 2, delay: "0.9s", dur: "3.5s", color: "#F6EBDD" },
    { top: "62%", left: "55%", size: 1.5, delay: "1.7s", dur: "2.7s", color: "#F2C4CF" },
    { top: "67%", left: "85%", size: 2, delay: "0.3s", dur: "3.0s", color: "#C9A66B" },
    { top: "74%", left: "38%", size: 1.5, delay: "1.5s", dur: "3.3s", color: "#F6EBDD" },
    { top: "79%", left: "65%", size: 2.5, delay: "0.7s", dur: "2.6s", color: "#F6EBDD" },
    { top: "84%", left: "25%", size: 1.5, delay: "1.2s", dur: "3.4s", color: "#C9A66B" },
    { top: "88%", left: "80%", size: 2, delay: "2.0s", dur: "2.9s", color: "#F2C4CF" },
    { top: "20%", left: "52%", size: 1, delay: "0.5s", dur: "3.8s", color: "#F6EBDD" },
  ], []);

  return (
    <section
      className="scene-content w-full h-full flex flex-col items-center justify-center relative blackout-scene-container"
      aria-label="Scene 4: Darkness with Twinkling Stars and Pulsing Ring"
    >
      {/* 12-18 Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {stars.map((star, idx) => (
          <span
            key={idx}
            className="blackout-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDelay: star.delay,
              animationDuration: star.dur,
            }}
          />
        ))}
      </div>

      {/* Soft pulsing ring that slows down over time */}
      <div className="blackout-pulse-ring-wrapper" aria-hidden="true">
        <div className="blackout-pulse-ring" />
        <div className="blackout-pulse-core" />
      </div>

      <p className="scene-narration text-base font-serif italic tracking-wider text-[#F6EBDD] z-10 mt-8 transition-opacity duration-500">
        {caption}
      </p>
    </section>
  );
};
