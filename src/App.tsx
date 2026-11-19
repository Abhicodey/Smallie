import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { SoundToggle } from "./components/ui/SoundToggle";
import { AudioProvider } from "./context/AudioContext";
import { GateScene } from "./components/scenes/GateScene";
import { ApproachScene } from "./components/scenes/ApproachScene";
import { BiteScene } from "./components/scenes/BiteScene";
import { BlackoutScene } from "./components/scenes/BlackoutScene";
import { BirthdayWishScene } from "./components/scenes/BirthdayWishScene";
import { BenchScene } from "./components/scenes/BenchScene";
import { FoyerScene } from "./components/scenes/FoyerScene";
import { MusicRoomScene } from "./components/scenes/MusicRoomScene";
import { BalconyScene } from "./components/scenes/BalconyScene";
import { LetterScene } from "./components/scenes/LetterScene";
import { EndingScene } from "./components/scenes/EndingScene";
import "./styles/main.css";

const TOTAL_SCENES = 11;

export const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const sceneParam = params.get("scene");
    return sceneParam ? Math.max(0, Math.min(10, parseInt(sceneParam, 10))) : 0;
  });
  const [isRedFlashActive, setIsRedFlashActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToScene = useCallback((nextIndex: number) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !containerRef.current) {
      setCurrentSceneIndex(nextIndex);
      return;
    }

    // Smooth romantic crossfade: subtle scale (0.98 -> 1.0) and opacity
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.985,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSceneIndex(nextIndex);
        gsap.to(containerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        });
      },
    });
  }, []);

  const triggerRedFlash = useCallback(() => {
    setIsRedFlashActive(true);
    setTimeout(() => {
      setIsRedFlashActive(false);
    }, 380);
  }, []);

  const handleGoToScene1 = useCallback(() => goToScene(1), [goToScene]);
  const handleGoToScene2 = useCallback(() => goToScene(2), [goToScene]);
  const handleGoToScene3 = useCallback(() => goToScene(3), [goToScene]);
  const handleGoToScene4 = useCallback(() => goToScene(4), [goToScene]);
  const handleGoToScene5 = useCallback(() => goToScene(5), [goToScene]);
  const handleGoToScene6 = useCallback(() => goToScene(6), [goToScene]);
  const handleGoToScene7 = useCallback(() => goToScene(7), [goToScene]);
  const handleGoToScene8 = useCallback(() => goToScene(8), [goToScene]);
  const handleGoToScene9 = useCallback(() => goToScene(9), [goToScene]);
  const handleGoToScene10 = useCallback(() => goToScene(10), [goToScene]);
  const handleGoToScene0 = useCallback(() => goToScene(0), [goToScene]);

  const progressPercentage = (currentSceneIndex / (TOTAL_SCENES - 1)) * 100;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <AudioProvider>
      <div className="app-root relative w-full min-h-screen bg-[#0B0A0F] text-[#F6EBDD]">
        {/* Subtle Texture & Soft Vignette Overlays */}
        <div className="ambient-texture" aria-hidden="true" />
        <div className="ambient-vignette" aria-hidden="true" />

        {/* Bite Red Flash Overlay */}
        <div
          className={`bite-flash-overlay ${isRedFlashActive ? "active" : ""}`}
          aria-hidden="true"
        />

        {/* Clean Sound Toggle */}
        <SoundToggle />

        {/* Thin Blush-and-Gold Progress Bar */}
        <div
          className="scene-progress-bar"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={currentSceneIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_SCENES}
          aria-label="Scene progression"
        />

        {/* Centered Main Viewport */}
        <main
          ref={containerRef}
          className="scene-viewport"
          role="region"
          aria-live="polite"
        >
          {currentSceneIndex === 0 && <GateScene onEnter={handleGoToScene1} />}
          {currentSceneIndex === 1 && (
            <ApproachScene onStepForward={handleGoToScene2} />
          )}
          {currentSceneIndex === 2 && (
            <BiteScene
              onBiteComplete={handleGoToScene3}
              triggerRedFlash={triggerRedFlash}
            />
          )}
          {currentSceneIndex === 3 && (
            <BlackoutScene onBlackoutComplete={handleGoToScene4} />
          )}
          {currentSceneIndex === 4 && (
            <BirthdayWishScene onContinue={handleGoToScene5} />
          )}
          {currentSceneIndex === 5 && (
            <BenchScene onContinue={handleGoToScene6} />
          )}
          {currentSceneIndex === 6 && (
            <FoyerScene onContinue={handleGoToScene7} />
          )}
          {currentSceneIndex === 7 && (
            <MusicRoomScene onContinue={handleGoToScene8} />
          )}
          {currentSceneIndex === 8 && (
            <BalconyScene onContinue={handleGoToScene9} />
          )}
          {currentSceneIndex === 9 && (
            <LetterScene onContinue={handleGoToScene10} />
          )}
          {currentSceneIndex === 10 && (
            <EndingScene onReplay={handleGoToScene0} />
          )}
        </main>
      </div>
    </AudioProvider>
  );
};

export default App;
