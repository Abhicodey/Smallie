import React from "react";
import { siteContent } from "../../content/siteContent";
import { ActionButton } from "../ui/ActionButton";
import { LenisScrollContainer } from "../effects/LenisScrollContainer";

interface LetterSceneProps {
  onContinue: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ onContinue }) => {
  const { letter } = siteContent.scenes;

  return (
    <section className="scene-content" aria-label="Scene 10: The Letter">
      {/* Rounded Cream & Plum Letter Card */}
      <div className="letter-panel-card my-2">
        <h2 style={{
          textAlign: "center",
          fontFamily: "var(--font-serif)",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--color-cream)",
          marginBottom: "10px",
        }}>
          {letter.title}
        </h2>

        <div className="editorial-rule mb-4" aria-hidden="true" />

        <LenisScrollContainer maxHeight="55vh" className="pr-2 custom-scrollbar">
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "var(--color-blush)",
            marginBottom: "14px",
          }}>
            {letter.salutation}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {letter.bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  lineHeight: "1.7",
                  color: "rgba(246, 235, 221, 0.95)",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ textAlign: "right", marginTop: "24px" }}>
            <p style={{ fontSize: "0.92rem", fontStyle: "italic", color: "var(--color-blush-muted)" }}>
              {letter.signoff}
            </p>
            <p style={{
              fontSize: "1rem",
              fontFamily: "var(--font-serif)",
              color: "var(--color-cream)",
              fontWeight: 700,
              marginTop: "4px",
            }}>
              {letter.signature}
            </p>
          </div>
        </LenisScrollContainer>
      </div>

      <ActionButton onClick={onContinue}>
        {letter.continueButtonText}
      </ActionButton>
    </section>
  );
};
