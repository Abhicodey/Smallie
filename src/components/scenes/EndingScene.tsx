import React, { useState, useEffect } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { Fireflies } from "../effects/Fireflies";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface EndingSceneProps {
  onReplay: () => void;
}

const ENDING_CLIPS: VoiceClip[] = [
  {
    text: "“I should let you get back to your birthday. Try not to miss me too much.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-18-I-should-let-you-get-back-to-your-birthday.-Try.mp3",
  },
];

export const EndingScene: React.FC<EndingSceneProps> = ({ onReplay }) => {
  const { ending } = siteContent.scenes;
  const { playClipQueue } = useAudio();
  const [caption, setCaption] = useState(ENDING_CLIPS[0].text);

  useEffect(() => {
    const cancelAudio = playClipQueue(ENDING_CLIPS, (idx) => {
      setCaption(ENDING_CLIPS[idx].text);
    });
    return cancelAudio;
  }, [playClipQueue]);

  return (
    <section className="scene-content" aria-label="Scene 11: Epilogue">
      <Fireflies count={16} showHearts={true} />

      <h1 className="scene-title mb-2">
        {ending.recipientHeading}
      </h1>

      <div className="editorial-rule mb-6" aria-hidden="true" />

      {/* Voice clip spoken caption */}
      <div className="voice-caption-box z-10 relative my-6 max-w-sm mx-auto">
        <p className="scene-narration text-xl md:text-2xl italic font-serif leading-relaxed text-[#F6EBDD]">
          {caption}
        </p>
      </div>

      <p className="scene-hint text-sm tracking-widest text-[#F2C4CF] mb-4 z-10 relative">
        {ending.subline}
      </p>

      <ActionButton onClick={onReplay}>
        {ending.replayButtonText}
      </ActionButton>
    </section>
  );
};
