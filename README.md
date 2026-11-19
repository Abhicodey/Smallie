# Apurva's Birthday Experience — Vite + React Frontend

A private, mobile-first cinematic birthday website structure built with **Vite + React (TypeScript)**. It features a nocturnal Gothic aesthetic (palette: Night `#0B0A0F`, Fog `#1B1722`, Oxblood `#7A0F1F`, Antique Gold `#C9A66B`, and Bone `#E9E2D3`).

All personal memories, photos, letters, voiceover cues, and songs use clearly marked placeholders so they can be filled in later without altering the visual hierarchy or interaction flow.

---

## Selective Library Integration

- **GSAP (`gsap`)**: Drives scene-to-scene transitions (smooth fade & scale), entrance reveals, and text staggering.
- **Vanta.js (`vanta/dist/vanta.fog.min`)**: Adds subtle ambient fog strictly to atmosphere scenes (Scene 2: *Approach* and Scene 6: *Bench*). Provides a zero-overhead static CSS fallback when `prefers-reduced-motion` is active or WebGL is constrained.
- **React Bits**:
  - `TextReveal`: Sequential word-by-word narration fades with blur-to-focus resolution.
  - `SpotlightCard`: Dynamic cursor/touch spotlight that highlights the memory photo (Bench) and framed portrait (Foyer).
  - `RestrainedParticles`: Subtle airborne dust motes catching ambient light.
- **Lenis (`lenis`)**: Scoped specifically to Scene 10 (*The Letter*) inside `LenisScrollContainer` for smooth momentum reading of longer correspondence without overriding site-wide scene navigation.

---

## Project Structure

```
Smallie/
├── index.html                                 # App entry, viewport metadata, Google Fonts
├── public/
│   └── assets/
│       ├── audio/                             # Place future audio/voice recordings here
│       └── images/                            # Place personal photos & portraits here
│           ├── bench-placeholder.svg
│           └── portrait-placeholder.svg
├── src/
│   ├── components/
│   │   ├── effects/
│   │   │   ├── TextReveal.tsx                 # React Bit: Narration text reveal
│   │   │   ├── SpotlightCard.tsx              # React Bit: Touch/cursor spotlight card
│   │   │   ├── RestrainedParticles.tsx        # React Bit: Subtle ambient motes
│   │   │   ├── VantaFog.tsx                   # Vanta.js fog with static fallback
│   │   │   └── LenisScrollContainer.tsx       # Lenis smooth-scroll container
│   │   ├── scenes/
│   │   │   ├── GateScene.tsx                  # 1. Gate (Wax seal enter button)
│   │   │   ├── ApproachScene.tsx              # 2. Approach (Moonlit mansion + Vanta fog)
│   │   │   ├── BiteScene.tsx                  # 3. Bite (Implied vampire moment, red flash)
│   │   │   ├── BlackoutScene.tsx              # 4. Blackout (Short pause before reveal)
│   │   │   ├── BirthdayWishScene.tsx          # 5. Birthday wish (Sequential lines + continue)
│   │   │   ├── BenchScene.tsx                 # 6. Bench (Memory photo + expandable note)
│   │   │   ├── FoyerScene.tsx                 # 7. Foyer (Framed portrait + brass plaque)
│   │   │   ├── MusicRoomScene.tsx             # 8. Music room (Cassette + Spotify placeholder)
│   │   │   ├── BalconyScene.tsx               # 9. Balcony (Moonlit scene + solitary line)
│   │   │   ├── LetterScene.tsx                # 10. Letter (Centered panel + Lenis scroll)
│   │   │   └── EndingScene.tsx                # 11. Ending (Closing line + Replay)
│   │   └── ui/
│   │       ├── ActionButton.tsx               # Touch-friendly primary action button
│   │       ├── WaxSealButton.tsx              # Wax-seal Enter button
│   │       └── AudioControlPlaceholder.tsx    # Non-functional sound status pill
│   ├── content/
│   │   └── siteContent.ts                     # Single source of truth for all content & placeholders
│   ├── styles/
│   │   └── main.css                           # Design tokens, overlays, typography & layout
│   ├── App.tsx                                # Main scene state manager & GSAP transitions
│   └── main.tsx                               # React root
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Where to Replace Placeholders

All personal content is isolated in **`src/content/siteContent.ts`**:

1. **Gate (Scene 1):** `subtitlePlaceholder`, `hintPlaceholder`
2. **Approach (Scene 2):** `atmosphereTitle`, `narrationLines` (array of lines)
3. **Bite (Scene 3):** `narrationPlaceholder`, `subtitledCue` (visible text for future voice clips)
4. **Blackout (Scene 4):** `cueText`
5. **Birthday Wish (Scene 5):** `title`, `sequentialLines` (array of lines revealed one after another)
6. **Bench (Scene 6):** `photoPlaceholderPath` (replace with path in `/assets/images/`), `captionPlaceholder`, `expandableNoteHeading`, `expandableNoteContent`
7. **Foyer (Scene 7):** `portraitPlaceholderPath` (replace with path in `/assets/images/`), `plaqueTitle`, `plaqueDate`, `captionPlaceholder`
8. **Music Room (Scene 8):** `cassetteLabel`, `songTitlePlaceholder`, `artistPlaceholder`, `spotifyUrl`, `notePlaceholder`
9. **Balcony (Scene 9):** `atmosphereTitle`, `narrationLine`
10. **Letter (Scene 10):** `title`, `salutation`, `bodyParagraphs` (array of text paragraphs), `signoff`, `signature`
11. **Ending (Scene 11):** `closingLine`, `subline`
12. **Audio Controls:** `audioPlaceholder.statusLabel` (remains a non-functional indicator until actual sound files are added to `public/assets/audio/`)

---

## Local Development Commands

To run the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Toggle Device Mode in your developer tools to test the mobile-first portrait view.

To verify a production build:
```bash
npm run build
```
