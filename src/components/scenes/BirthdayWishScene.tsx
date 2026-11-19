import React, { useState, useEffect, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { Fireflies } from "../effects/Fireflies";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";
import gsap from "gsap";

interface BirthdayWishSceneProps {
  onContinue: () => void;
}

const BIRTHDAY_CLIPS: VoiceClip[] = [
  {
    text: "“There. The gift you asked for: from tonight on, you're a vampire. You won't grow older.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-15-There.-The-gift-you-asked-for-from-tonight-on,-y.mp3",
  },
  {
    text: "“Happy birthday, beautiful.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-16-Happy-birthday,-beautiful.mp3",
  },
];

export const BirthdayWishScene: React.FC<BirthdayWishSceneProps> = ({ onContinue }) => {
  const { birthdayWish } = siteContent.scenes;
  const { playClipQueue, registerInteraction } = useAudio();
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const startPlayback = useCallback(() => {
    return playClipQueue(BIRTHDAY_CLIPS, (idx) => {
      setActiveClipIndex(idx);
      if (idx === BIRTHDAY_CLIPS.length - 1) {
        setShowContinue(true);
        gsap.fromTo(
          "#birthday-action-wrap",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    });
  }, [playClipQueue]);

  useEffect(() => {
    // Play the 2 voice clips in sequence with natural pauses and sync captions
    const cancelAudio = startPlayback();

    const fallbackTimer = setTimeout(() => {
      setShowContinue(true);
    }, 11000);

    return () => {
      cancelAudio();
      clearTimeout(fallbackTimer);
    };
  }, [startPlayback]);

  const handleReplay = () => {
    registerInteraction();
    startPlayback();
  };

  return (
    <section className="scene-content" aria-label="Scene 5: Birthday Wish">
      <Fireflies count={16} showHearts={true} />

      <h2 className="scene-title mb-2">
        {birthdayWish.title}
      </h2>

      <div className="editorial-rule" aria-hidden="true" />

      {/* Guide Avatar with synced speech dialogue (Presenting pose) */}
      <VampireGuide
        dialogue={BIRTHDAY_CLIPS[activeClipIndex].text}
        onReplayAudio={handleReplay}
        pose="present"
      />

      <div
        id="birthday-action-wrap"
        className={`z-10 relative transition-opacity duration-700 mt-6 ${showContinue ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <ActionButton onClick={onContinue}>
          {birthdayWish.continueButtonText}
        </ActionButton>
      </div>
    </section>
  );
};
