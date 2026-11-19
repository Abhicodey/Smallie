/**
 * Central content configuration for Apurva's Birthday Experience.
 *
 * Keep all personal memories, messages, audio titles, and links here.
 * Any personal content should be edited in this file only.
 */

export interface GuideDialogue {
  name: string;
  scenes: {
    gate: {
      initial: string;
      tapReactions: string[];
    };
    birthdayWish: {
      initial: string;
      tapReactions: string[];
    };
    bench: {
      initial: string;
      tapReactions: string[];
    };
    musicRoom: {
      initial: string;
      tapReactions: string[];
    };
    balcony: {
      initial: string;
      tapReactions: string[];
    };
    foyer?: {
      initial: string;
      tapReactions: string[];
    };
  };
}

export interface SiteContent {
  meta: {
    recipientName: string;
    title: string;
  };
  guide: GuideDialogue;
  audioPlaceholder: {
    statusLabel: string;
    currentTrackName: string;
  };
  scenes: {
    gate: {
      subtitlePlaceholder: string;
      hintPlaceholder: string;
      enterButtonText: string;
    };
    approach: {
      atmosphereTitle: string;
      narrationLines: string[];
      actionButtonText: string;
    };
    bite: {
      narrationPlaceholder: string;
      subtitledCue: string;
      timings: {
        tensionDurationMs: number;
        flashDurationMs: number;
        blackoutDurationMs: number;
      };
    };
    blackout: {
      cueText: string;
      durationMs: number;
    };
    birthdayWish: {
      title: string;
      sequentialLines: string[];
      continueButtonText: string;
    };
    bench: {
      title: string;
      photoPlaceholderPath: string;
      photoAlt: string;
      captionPlaceholder: string;
      expandableNoteHeading: string;
      expandableNoteContent: string;
      continueButtonText: string;
    };
    foyer: {
      title: string;
      portraitPlaceholderPath: string;
      portraitAlt: string;
      plaqueTitle: string;
      plaqueDate: string;
      captionPlaceholder: string;
      continueButtonText: string;
    };
    musicRoom: {
      title: string;
      cassetteLabel: string;
      songTitlePlaceholder: string;
      artistPlaceholder: string;
      spotifyUrl: string;
      notePlaceholder: string;
      continueButtonText: string;
    };
    balcony: {
      atmosphereTitle: string;
      narrationLine: string;
      continueButtonText: string;
    };
    letter: {
      title: string;
      salutation: string;
      bodyParagraphs: string[];
      signoff: string;
      signature: string;
      continueButtonText: string;
    };
    ending: {
      recipientHeading: string;
      subline: string;
      replayButtonText: string;
    };
  };
}

export const siteContent: SiteContent = {
  meta: {
    recipientName: "Apurva",
    title: "For Apurva | A Nocturne",
  },
  guide: {
    name: "Damon",
    scenes: {
      gate: {
        initial: "Good evening, beautiful. Funny how one mysterious link and one little click brought you here to me. I'm Damon Rathore, your boyfriend's so-called friend, all the way from Pune. Break the seal whenever you're ready.",
        tapReactions: [],
      },
      birthdayWish: {
        initial: "There. The gift you asked for: from tonight on, you're a vampire. You won't grow older.",
        tapReactions: [],
      },
      bench: {
        initial: "Snacks, The Vampire Diaries, and life updates. Honestly, eternity could do worse.",
        tapReactions: [],
      },
      musicRoom: {
        initial: "A mystery cassette. This house really needs a less obvious hobby.",
        tapReactions: [],
      },
      balcony: {
        initial: "The night breeze is crisp here. And look at that: you've made it all the way to the final surprise.",
        tapReactions: [],
      },
      foyer: {
        initial: "Ah, Catherine. I fell for her once. Strange, though... she looks a lot like you.",
        tapReactions: [],
      },
    },
  },
  audioPlaceholder: {
    statusLabel: "Audio",
    currentTrackName: "Nocturne Track",
  },
  scenes: {
    gate: {
      subtitlePlaceholder: "A Nocturne for Apurva",
      hintPlaceholder: "A quiet whisper — tap the seal to enter",
      enterButtonText: "Enter",
    },
    approach: {
      atmosphereTitle: "Moonlit Estate",
      narrationLines: [
        "The iron gates ease open without a sound.",
        "Stone steps rise toward the shadow of the manor.",
      ],
      actionButtonText: "Step Forward",
    },
    bite: {
      narrationPlaceholder: "A sudden stillness in the cold air... an icy glance...",
      subtitledCue: "",
      timings: {
        tensionDurationMs: 1800,
        flashDurationMs: 350,
        blackoutDurationMs: 2200,
      },
    },
    blackout: {
      cueText: "A heartbeat in the quiet dark...",
      durationMs: 2200,
    },
    birthdayWish: {
      title: "Happy Birthday, Apurva",
      sequentialLines: [
        "The shadows part to welcome a rare light.",
        "To another year etched in timeless elegance.",
        "Happy Birthday, Apurva.",
      ],
      continueButtonText: "Continue Within",
    },
    bench: {
      title: "The Misty Garden Bench",
      photoPlaceholderPath: "/assets/images/bench-placeholder.svg",
      photoAlt: "The garden bench under the cypresses",
      captionPlaceholder: "",
      expandableNoteHeading: "Read Inscription",
      expandableNoteContent: "Out here, the most beautiful things are just okayish—sharing snacks, watching The Vampire Diaries, and talking about our lives.",
      continueButtonText: "Enter the Foyer",
    },
    foyer: {
      title: "The Grand Staircase",
      portraitPlaceholderPath: "/assets/images/portrait-placeholder.svg",
      portraitAlt: "Katherine Pierce's portrait in antique frame",
      plaqueTitle: "Happy Birthday, Apurva",
      plaqueDate: "",
      captionPlaceholder: "A familiar face from the old house.",
      continueButtonText: "Follow the Hallway",
    },
    musicRoom: {
      title: "The Music Room",
      cassetteLabel: "Side A • For Apurva",
      songTitlePlaceholder: "???",
      artistPlaceholder: "Mystery Track",
      spotifyUrl: "https://open.spotify.com/track/1fzAuUVbzlhZ1lJAx9PtY6",
      notePlaceholder: "",
      continueButtonText: "Step to the Balcony",
    },
    balcony: {
      atmosphereTitle: "Midnight Air",
      narrationLine: "“The night is young, and the stars keep their vigil for you.”",
      continueButtonText: "Open the letter",
    },
    letter: {
      title: "Sealed Correspondence",
      salutation: "Dearest Apurva,",
      bodyParagraphs: [
        "Do whatever you want and whatever feels right to you. There’s nothing as beautiful as you are—or ever will be, Apurva Pardhan. Take care of yourself, and last but not least, I love you a lottttttttt!",
      ],
      signoff: "With love,",
      signature: "Rajat",
      continueButtonText: "Turn the Final Page",
    },
    ending: {
      recipientHeading: "Apurva",
      subline: "Dedicated to Apurva",
      replayButtonText: "Experience Again",
    },
  },
};
