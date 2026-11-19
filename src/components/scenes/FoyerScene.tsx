import React, { useState, useEffect, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { Fireflies } from "../effects/Fireflies";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface FoyerSceneProps {
  onContinue: () => void;
}

const FOYER_CLIPS: VoiceClip[] = [
  {
    text: "“Ah, Catherine. I fell for her once. Strange, though... she looks a lot like you.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-16-Ah,-Catherine.-I-fell-for-her-once.-Strange,-tho.mp3",
  },
];

const PRIMARY_PORTRAIT_URL = "/assets/images/apurva_portrait_graded.jpg";
const FALLBACK_PORTRAIT_URL = "/assets/images/portrait-placeholder.svg";

export const FoyerScene: React.FC<FoyerSceneProps> = ({ onContinue }) => {
  const { foyer } = siteContent.scenes;
  const { playClipQueue, registerInteraction } = useAudio();
  const [caption, setCaption] = useState(FOYER_CLIPS[0].text);
  const [isTilted, setIsTilted] = useState(false);
  const [imgSrc, setImgSrc] = useState(PRIMARY_PORTRAIT_URL);

  const startPlayback = useCallback(() => {
    return playClipQueue(FOYER_CLIPS, (idx) => {
      setCaption(FOYER_CLIPS[idx].text);
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

  const handleTapPortrait = () => {
    setIsTilted(true);
    setTimeout(() => {
      setIsTilted(false);
    }, 1200);
  };

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_PORTRAIT_URL) {
      setImgSrc(FALLBACK_PORTRAIT_URL);
    }
  };

  return (
    <section className="scene-content" aria-label="Scene 7: The Foyer">
      <Fireflies count={10} />

      <h2 className="scene-title">{foyer.title}</h2>

      <div className="editorial-rule" aria-hidden="true" />

      {/* Damon presenting the Katherine Pierce portrait with synced voice clip */}
      <VampireGuide
        dialogue={caption}
        onReplayAudio={handleReplay}
        pose="present"
      />

      {/* Portrait Card with 4:5 ratio, soft blush glow, and tap tilt & shimmer */}
      <div
        className={`portrait-card my-2 cursor-pointer ${isTilted ? "portrait-tilted" : ""}`}
        onClick={handleTapPortrait}
        title="Tap to admire portrait"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleTapPortrait();
          }
        }}
      >
        <div className="foyer-portrait-frame">
          <img
            src={imgSrc}
            alt={foyer.portraitAlt}
            className="foyer-portrait-img"
            onError={handleImageError}
          />
          <div className="portrait-shimmer-sweep" aria-hidden="true" />
        </div>

        {/* Clean, elegant plaque focused on Apurva's birthday */}
        <div className="ribbon-plaque">
          <div className="font-semibold text-xs tracking-wider">{foyer.plaqueTitle}</div>
        </div>

        {/* The Vampire Diaries reference caption */}
        {foyer.captionPlaceholder && (
          <p className="scene-narration text-xs italic mt-2.5 mb-1 text-[#F6EBDD]/90">
            {foyer.captionPlaceholder}
          </p>
        )}
      </div>

      <ActionButton onClick={onContinue}>
        {foyer.continueButtonText}
      </ActionButton>
    </section>
  );
};
