import React, { useEffect, useState } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { VantaFog } from "../effects/VantaFog";
import { Fireflies } from "../effects/Fireflies";
import { FlyingBats } from "../effects/FlyingBats";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface ApproachSceneProps {
  onStepForward: () => void;
}

const APPROACH_CLIPS: VoiceClip[] = [
  {
    text: "“There you are. I was beginning to think the house had scared you off.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-12-There-you-are.-I-was-beginning-to-think-the-hous.mp3",
  },
  {
    text: "“I have to say, your eyes look lovely in this light. And you keep tapping me for attention? Careful, Apurva, I might start thinking you enjoy following my instructions. You're a very well-behaved guest.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-13-I-have-to-say,-your-eyes-look-lovely-in-this-lig.mp3",
  },
];

export const ApproachScene: React.FC<ApproachSceneProps> = ({ onStepForward }) => {
  const { approach } = siteContent.scenes;
  const { playClipQueue } = useAudio();
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  useEffect(() => {
    const cancel = playClipQueue(APPROACH_CLIPS, (idx) => {
      setActiveClipIndex(idx);
    });
    return cancel;
  }, [playClipQueue]);

  return (
    <section className="scene-content relative" aria-label="Scene 2: The Approach">
      {/* Vanta.js fog applied strictly to Approach scene */}
      <VantaFog />
      <Fireflies count={14} />
      <FlyingBats count={2} />

      <h2 className="scene-title z-10 relative">
        {approach.atmosphereTitle}
      </h2>

      <div className="editorial-rule z-10 relative" aria-hidden="true" />

      {/* Spoken Dialogue Caption Box */}
      <div className="voice-caption-box z-10 relative my-4 max-w-md mx-auto">
        <p className="scene-narration text-lg md:text-xl font-serif italic text-[#F6EBDD] transition-opacity duration-500">
          {APPROACH_CLIPS[activeClipIndex].text}
        </p>
      </div>

      <ActionButton onClick={onStepForward}>
        {approach.actionButtonText}
      </ActionButton>
    </section>
  );
};
