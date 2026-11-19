import React, { useState, useEffect, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { Fireflies } from "../effects/Fireflies";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";
import { Sparkles } from "lucide-react";

interface BalconySceneProps {
  onContinue: () => void;
}

const BALCONY_CLIPS: VoiceClip[] = [
  {
    text: "“The night breeze is crisp here. And look at that: you've made it all the way to the final surprise.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-17-The-night-breeze-is-crisp-here.-And-look-at-that.mp3",
  },
];

export const BalconyScene: React.FC<BalconySceneProps> = ({ onContinue }) => {
  const { balcony } = siteContent.scenes;
  const { playClipQueue, registerInteraction } = useAudio();
  const [caption, setCaption] = useState(BALCONY_CLIPS[0].text);

  const startPlayback = useCallback(() => {
    return playClipQueue(BALCONY_CLIPS, (idx) => {
      setCaption(BALCONY_CLIPS[idx].text);
    });
  }, [playClipQueue]);

  useEffect(() => {
    const cancelAudio = startPlayback();
    return cancelAudio;
  }, [startPlayback]);

  const handleReplay = () => {
    registerInteraction();
    startPlayback();
  };

  return (
    <section className="scene-content" aria-label="Scene 9: The Balcony">
      <Fireflies count={12} showHearts={true} />

      <h2 className="scene-title">{balcony.atmosphereTitle}</h2>

      <div className="editorial-rule" aria-hidden="true" />

      {/* Damon prepares Apurva for the letter, then steps aside (Exit pointing gesture) */}
      <VampireGuide
        dialogue={caption}
        onReplayAudio={handleReplay}
        pose="exit"
      />

      {/* Real Vintage Filigree Locket Pendant on delicate chain (Main interactive trigger to open letter) */}
      <div
        className="pendulum-wrapper"
        onClick={onContinue}
        role="button"
        tabIndex={0}
        aria-label="Open the letter by tapping the pendant locket"
        title="Tap to open the letter"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onContinue();
          }
        }}
      >
        <div className="pendulum-chain" />
        <div className="pendulum-bob-locket">
          <img
            src="/assets/images/pendant_locket_isolated.png"
            alt="Antique Filigree Pendant Locket"
            className="pendulum-locket-img"
          />
          <Sparkles className="w-4 h-4 text-[#FFF2B8] pendant-shimmer-sparkle drop-shadow-[0_0_8px_#E5C388]" />
        </div>
      </div>

      <p className="scene-narration text-lg md:text-xl italic font-serif leading-relaxed max-w-sm my-4">
        {balcony.narrationLine}
      </p>
    </section>
  );
};
