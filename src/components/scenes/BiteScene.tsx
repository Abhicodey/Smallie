import React, { useEffect, useState, useCallback } from "react";
import { siteContent } from "../../content/siteContent";
import { FlyingBats } from "../effects/FlyingBats";
import { VampireGuide } from "../ui/VampireGuide";
import { VampireFangsEffect } from "../effects/VampireFangsEffect";
import { useAudio, VoiceClip } from "../../context/AudioContext";

interface BiteSceneProps {
  onBiteComplete: () => void;
  triggerRedFlash: () => void;
}

const BITE_CLIPS: VoiceClip[] = [
  {
    text: "“Relax, Apurva. I'm only here to deliver a gift you've always wanted.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-14-Relax,-Apurva.-I’m-only-here-to-deliver-a-gift-y.mp3",
  },
  {
    text: "“Hold still. This part is quick. The dramatic lighting is complimentary.”",
    audioFile: "Damon-Salvatore-2026-11-19-17-14-Hold-still.-This-part-is-quick.-The-dramatic-lig.mp3",
  },
];

export const BiteScene: React.FC<BiteSceneProps> = ({ onBiteComplete, triggerRedFlash }) => {
  const { bite } = siteContent.scenes;
  const { playClipQueue, playSfx, registerInteraction } = useAudio();
  const [caption, setCaption] = useState(BITE_CLIPS[0].text);
  const [fangStage, setFangStage] = useState<"idle" | "approaching" | "biting">("idle");

  const startPlayback = useCallback(() => {
    let sfxAudio: HTMLAudioElement | null = null;
    let flashTimer: NodeJS.Timeout | null = null;
    let completeTimer: NodeJS.Timeout | null = null;

    const cancelQueue = playClipQueue(
      BITE_CLIPS,
      (idx) => {
        setCaption(BITE_CLIPS[idx].text);
        if (idx === 1) {
          // When 2nd line begins speaking ("Hold still. This part is quick..."), start fangs approaching
          setFangStage("approaching");
        }
      },
      (finishedIdx) => {
        // When 2nd line finishes (via audio onended, or fallback timer if muted/blocked)
        if (finishedIdx === 1) {
          setFangStage("biting");
          sfxAudio = playSfx("vampire-bite-scream.mp3");

          // 500ms bite impact before crimson flash & blackout
          flashTimer = setTimeout(() => {
            triggerRedFlash();
            completeTimer = setTimeout(() => {
              onBiteComplete();
            }, bite.timings.flashDurationMs || 400);
          }, 500);
        }
      }
    );

    return () => {
      cancelQueue();
      if (sfxAudio) {
        sfxAudio.pause();
        sfxAudio = null;
      }
      if (flashTimer) clearTimeout(flashTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [playClipQueue, playSfx, triggerRedFlash, onBiteComplete, bite.timings.flashDurationMs]);

  useEffect(() => {
    const cancelAudio = startPlayback();
    return cancelAudio;
  }, [startPlayback]);

  const handleReplay = () => {
    registerInteraction();
    startPlayback();
  };

  return (
    <section className="scene-content relative overflow-hidden" aria-label="Scene 3: The Bite Moment">
      <FlyingBats count={3} />

      {/* Playful teasing appearance right before the bite */}
      <VampireGuide
        dialogue={caption}
        onReplayAudio={handleReplay}
        pose="tease"
      />

      {/* Dramatic Vampire Fangs Bite Overlay */}
      <VampireFangsEffect stage={fangStage} />

      <div className="editorial-rule my-3" aria-hidden="true" />
    </section>
  );
};
