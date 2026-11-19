import React, { useState, useEffect, useRef } from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { VampireGuide } from "../ui/VampireGuide";
import { useAudio, VoiceClip } from "../../context/AudioContext";
import { Disc3, Play, Pause, Sparkles } from "lucide-react";

interface MusicRoomSceneProps {
  onContinue: () => void;
}

const MUSIC_ROOM_CLIPS: VoiceClip[] = [
  {
    text: "“A mystery cassette. This house really needs a less obvious hobby.”",
    audioFile: "Damon-Salvatore-2026-11-19-03-22-A-mystery-cassette.-This-house-really-needs-a-le.mp3",
  },
];

export const MusicRoomScene: React.FC<MusicRoomSceneProps> = ({ onContinue }) => {
  const { musicRoom } = siteContent.scenes;
  const { playClipQueue, isMuted, stopAudio, registerInteraction } = useAudio();
  const [caption, setCaption] = useState(MUSIC_ROOM_CLIPS[0].text);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cancelAudio = playClipQueue(MUSIC_ROOM_CLIPS, (idx) => {
      setCaption(MUSIC_ROOM_CLIPS[idx].text);
    });
    return () => {
      cancelAudio();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playClipQueue]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleCassettePlay = () => {
    registerInteraction();
    // Pause any guide voice line so cassette audio is clear
    stopAudio();

    if (!audioRef.current) {
      const audio = new Audio("/assets/audio/mystery-cassette.mp3");
      audio.muted = isMuted;
      audio.onended = () => {
        setIsPlaying(false);
      };
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setRevealed(true);
      }).catch(() => {
        // Fallback if browser blocks
        setIsPlaying(false);
      });
    }
  };

  return (
    <section className="scene-content" aria-label="Scene 8: The Music Room">
      <h2 className="scene-title">{musicRoom.title}</h2>

      <div className="editorial-rule" aria-hidden="true" />

      {/* Guide introduces the mystery cassette (Winking pose) */}
      <VampireGuide
        dialogue={caption}
        pose="wink"
      />

      {/* Playable Mystery Cassette Player */}
      <div className="cassette-visual-shell my-3">
        {/* Handwritten / Unmarked label strip */}
        <div className="cassette-label-strip flex items-center justify-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#7A0F1F] inline-block animate-pulse" />
          <span className="tracking-widest uppercase text-xs font-bold text-[#2B1533]">
            {musicRoom.cassetteLabel}
          </span>
        </div>

        {/* Cassette Spools with Animated Rotation when Playing */}
        <div className="cassette-spools py-2">
          <div className={`cassette-spool ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "2.4s" }}>
            <Disc3 className="w-7 h-7 text-[#F2C4CF]" />
          </div>
          <div className="px-3 flex flex-col items-center">
            <button
              onClick={toggleCassettePlay}
              className="cassette-play-btn flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#7A0F1F] to-[#2B1533] border-2 border-[#E5C388] text-[#F6EBDD] shadow-[0_0_15px_rgba(229,195,136,0.4)] hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pause mystery cassette" : "Play mystery cassette"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current text-[#F6EBDD]" />
              ) : (
                <Play className="w-5 h-5 fill-current text-[#F6EBDD] ml-0.5" />
              )}
            </button>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#E5C388] mt-1.5 font-semibold">
              {isPlaying ? "Playing..." : "Tap to Play"}
            </span>
          </div>
          <div className={`cassette-spool ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "2.4s" }}>
            <Disc3 className="w-7 h-7 text-[#F2C4CF]" />
          </div>
        </div>

        {/* Minimal mystery strip without revealing title or artist */}
        <div className="cassette-meta-strip flex items-center justify-center gap-2 text-xs">
          {revealed ? (
            <span className="inline-flex items-center gap-1.5 text-[#F2C4CF]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C388] animate-pulse" />
              <span>Listen closely... do you recognize this song?</span>
            </span>
          ) : (
            <span className="text-[#C9A66B] font-mono tracking-wider">
              ✦ Mystery Song • Press play to listen ✦
            </span>
          )}
        </div>
      </div>

      <ActionButton onClick={onContinue}>
        {musicRoom.continueButtonText}
      </ActionButton>
    </section>
  );
};
