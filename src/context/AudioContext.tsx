import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

export interface VoiceClip {
  text: string;
  audioFile: string;
}

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  hasUserInteracted: boolean;
  registerInteraction: () => void;
  playClipQueue: (
    clips: VoiceClip[],
    onClipChange?: (index: number) => void,
    onClipEnded?: (index: number) => void
  ) => () => void;
  playSfx: (audioFile: string) => HTMLAudioElement | null;
  stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(isMuted);
  const hasUserInteractedRef = useRef(hasUserInteracted);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted && currentAudioRef.current) {
      currentAudioRef.current.pause();
    }
  }, [isMuted]);

  useEffect(() => {
    hasUserInteractedRef.current = hasUserInteracted;
  }, [hasUserInteracted]);

  const registerInteraction = useCallback(() => {
    if (!hasUserInteractedRef.current) {
      setHasUserInteracted(true);
      hasUserInteractedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const handleGlobalInteraction = () => {
      registerInteraction();
      window.removeEventListener("pointerdown", handleGlobalInteraction);
      window.removeEventListener("keydown", handleGlobalInteraction);
    };

    window.addEventListener("pointerdown", handleGlobalInteraction, { passive: true });
    window.addEventListener("keydown", handleGlobalInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleGlobalInteraction);
      window.removeEventListener("keydown", handleGlobalInteraction);
    };
  }, [registerInteraction]);

  const stopAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.onended = null;
      currentAudioRef.current.onerror = null;
      currentAudioRef.current = null;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      return next;
    });
  }, []);

  const playClipQueue = useCallback(
    (
      clips: VoiceClip[],
      onClipChange?: (index: number) => void,
      onClipEnded?: (index: number) => void
    ): (() => void) => {
      let isCancelled = false;
      let currentIndex = 0;
      let pauseTimeout: NodeJS.Timeout | null = null;

      stopAudio();

      const playNext = () => {
        if (isCancelled || currentIndex >= clips.length) {
          return;
        }

        if (onClipChange) {
          onClipChange(currentIndex);
        }

        const clip = clips[currentIndex];
        const audioPath = `/assets/audio/${clip.audioFile}`;

        // If muted or not yet interacted, wait a bit or advance
        if (isMutedRef.current || !hasUserInteractedRef.current) {
          pauseTimeout = setTimeout(() => {
            if (!isCancelled) {
              const finishedIdx = currentIndex;
              if (onClipEnded) {
                onClipEnded(finishedIdx);
              }
              currentIndex++;
              playNext();
            }
          }, 4500); // Natural timing for reading caption if audio is off
          return;
        }

        const audio = new Audio(audioPath);
        currentAudioRef.current = audio;

        audio.onended = () => {
          if (isCancelled) return;
          const finishedIdx = currentIndex;
          if (onClipEnded) {
            onClipEnded(finishedIdx);
          }
          currentIndex++;
          // Natural pause of 750ms between sequential dialogue lines
          pauseTimeout = setTimeout(() => {
            if (!isCancelled) {
              playNext();
            }
          }, 750);
        };

        audio.onerror = () => {
          // If file missing or format blocked, gracefully continue caption flow
          if (isCancelled) return;
          const finishedIdx = currentIndex;
          if (onClipEnded) {
            onClipEnded(finishedIdx);
          }
          pauseTimeout = setTimeout(() => {
            if (!isCancelled) {
              currentIndex++;
              playNext();
            }
          }, 3500);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy fallback: advance with natural pause
            if (isCancelled) return;
            const finishedIdx = currentIndex;
            if (onClipEnded) {
              onClipEnded(finishedIdx);
            }
            pauseTimeout = setTimeout(() => {
              if (!isCancelled) {
                currentIndex++;
                playNext();
              }
            }, 3500);
          });
        }
      };

      // Slight delay on scene entry before starting voice clip (400ms)
      pauseTimeout = setTimeout(() => {
        playNext();
      }, 400);

      return () => {
        isCancelled = true;
        if (pauseTimeout) clearTimeout(pauseTimeout);
        stopAudio();
      };
    },
    [stopAudio]
  );

  const playSfx = useCallback((audioFile: string): HTMLAudioElement | null => {
    if (isMutedRef.current) return null;
    try {
      const sfx = new Audio(`/assets/audio/${audioFile}`);
      sfx.volume = 0.85;
      const playPromise = sfx.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay blocks
        });
      }
      return sfx;
    } catch {
      return null;
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        hasUserInteracted,
        registerInteraction,
        playClipQueue,
        playSfx,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
