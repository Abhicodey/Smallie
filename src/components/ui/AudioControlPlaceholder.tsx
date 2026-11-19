import React from "react";
import { siteContent } from "../../content/siteContent";
import { Volume2 } from "lucide-react";

export const AudioControlPlaceholder: React.FC = () => {
  const { audioPlaceholder } = siteContent;

  return (
    <aside
      className="audio-control-placeholder"
      role="status"
      aria-label="Audio player disabled placeholder"
      title="Audio placeholder - actual music tracks will be attached here"
    >
      <Volume2 className="w-3.5 h-3.5 opacity-60 text-[#C9A66B]" />
      <span>{audioPlaceholder.statusLabel}</span>
    </aside>
  );
};
