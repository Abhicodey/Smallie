import React, { useEffect, useState, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { WaxSealButton } from "../ui/WaxSealButton";
import { Fireflies } from "../effects/Fireflies";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface GateSceneProps {
  onEnter: () => void;
}

const GATE_CLIPS: VoiceClip[] = [
  {
    text: "“Good evening, beautiful. Funny how one mysterious link and one little click brought you here to me. I'm Damon Rathore, your boyfriend's so-called friend, all the way from Pune. Break the seal whenever you're ready.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-11-Good-evening,-beautiful.-Funny-how-one-mysteriou.mp3",
  },
];

export const GateScene: React.FC<GateSceneProps> = ({ onEnter }) => {
  const { gate } = siteContent.scenes;
  const { playClipQueue, registerInteraction } = useAudio();
  const [caption, setCaption] = useState(GATE_CLIPS[0].text);

  const startPlayback = useCallback(() => {
    return playClipQueue(GATE_CLIPS, (idx) => {
      setCaption(GATE_CLIPS[idx].text);
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
    <section className="scene-content" aria-label="Scene 1: The Gate">
      {/* Background Atmosphere */}
      <Fireflies count={12} showHearts={true} />

      <h1 className="scene-title">
        {siteContent.meta.recipientName}
      </h1>

      <div className="editorial-rule" aria-hidden="true" />

      {/* Charming Vampire Guide: Gate Welcome (Waving pose) */}
      <VampireGuide
        dialogue={caption}
        onReplayAudio={handleReplay}
        pose="wave"
      />

      <p className="scene-narration text-sm tracking-wider uppercase opacity-85 my-4">
        {gate.subtitlePlaceholder}
      </p>

      <WaxSealButton label={gate.enterButtonText} onClick={onEnter} />
    </section>
  );
};
