import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute, registerInteraction } = useAudio();

  const handleToggle = () => {
    registerInteraction();
    toggleMute();
  };

  return (
    <button
      onClick={handleToggle}
      className="sound-toggle-btn"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      title={isMuted ? "Unmute audio" : "Mute audio"}
      type="button"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-[#F2C4CF]" />
      ) : (
        <Volume2 className="w-5 h-5 text-[#E5C388]" />
      )}
    </button>
  );
};
