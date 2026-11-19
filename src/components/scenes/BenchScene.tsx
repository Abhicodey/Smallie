import React, { useState, useEffect, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { Fireflies } from "../effects/Fireflies";
import { BenchIllustration } from "../effects/BenchIllustration";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface BenchSceneProps {
  onContinue: () => void;
}

const BENCH_CLIPS: VoiceClip[] = [
  {
    text: "“Snacks, The Vampire Diaries, and life updates. Honestly, eternity could do worse.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-16-Snacks,-The-Vampire-Diaries,-and-life-updates.-H.mp3",
  },
];

export const BenchScene: React.FC<BenchSceneProps> = ({ onContinue }) => {
  const { bench } = siteContent.scenes;
  const { playClipQueue, registerInteraction } = useAudio();
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [caption, setCaption] = useState(BENCH_CLIPS[0].text);

  const startPlayback = useCallback(() => {
    return playClipQueue(BENCH_CLIPS, (idx) => {
      setCaption(BENCH_CLIPS[idx].text);
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
    <section className="scene-content relative" aria-label="Scene 6: The Bench">
      {/* Fireflies and warm atmosphere */}
      <Fireflies count={12} showHearts={true} />

      <h2 className="scene-title z-10 relative">
        {bench.title}
      </h2>

      <div className="editorial-rule z-10 relative" aria-hidden="true" />

      {/* Gentle joke at the bench with voice caption (Idle breathing pose) */}
      <VampireGuide
        dialogue={caption}
        onReplayAudio={handleReplay}
        pose="idle"
      />

      {/* Polaroid-Style Memory Card with Layered Illustrated Night Scene */}
      <div className="polaroid-card my-2 z-10 relative">
        <BenchIllustration />

        {/* Brownie & Ice cream cute accent pill */}
        <div className="dessert-accent-pill-wrap">
          <div className="dessert-accent-pill">
            <span>Warm Fudge Brownie &amp; Vanilla Ice Cream</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F2C4CF]" />
          </div>
        </div>
      </div>

      {/* Expandable Inscription Note with Rounded Cream-Outline button & smooth animation */}
      <div className="w-full max-w-xs mx-auto text-center my-2 z-10 relative flex flex-col items-center">
        <button
          onClick={() => setIsNoteExpanded(!isNoteExpanded)}
          aria-expanded={isNoteExpanded}
          type="button"
          className="btn-outline-cream"
        >
          {isNoteExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#C9A66B]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#C9A66B]" />
          )}
          <span>{bench.expandableNoteHeading}</span>
        </button>

        <div className={`expandable-drawer ${isNoteExpanded ? "expanded" : ""}`}>
          <div className="expandable-drawer-inner">
            <p className="text-sm italic text-[#F6EBDD]">{bench.expandableNoteContent}</p>
          </div>
        </div>
      </div>

      <ActionButton onClick={onContinue}>
        {bench.continueButtonText}
      </ActionButton>
    </section>
  );
};
