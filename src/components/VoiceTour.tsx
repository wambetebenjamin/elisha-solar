"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useUiStore } from "@/lib/store";

const TOUR_SCRIPT =
  "Welcome to Elisha Solar. We help Kenyan homes and businesses cut their electricity bills and get reliable power through solar energy. Get a free site assessment, choose a package that fits your property, and our certified team handles the full installation. Use our savings calculator to see exactly how much you could save. Let us power your future together.";

const PREFERRED_VOICE_HINTS = [
  "en-KE",
  "en-KE-male",
  "kenyan",
  "swahili",
];

const MALE_VOICE_HINTS = [
  "male",
  "daniel",
  "alex",
  "fred",
  "george",
  "james",
  "tom",
  "david",
  "mark",
  "guy",
  "ryan",
];

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) return undefined;

  const byLang = (prefix: string) =>
    voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));

  const kenyan = byLang("en-ke");
  if (kenyan.length > 0) {
    const kenyanMale = kenyan.find((voice) =>
      MALE_VOICE_HINTS.some((hint) => voice.name.toLowerCase().includes(hint)),
    );
    return kenyanMale ?? kenyan[0];
  }

  const fallbackLangs = ["en-gb", "en-us", "en"];
  for (const lang of fallbackLangs) {
    const candidates = byLang(lang);
    if (candidates.length === 0) continue;
    const male = candidates.find((voice) =>
      MALE_VOICE_HINTS.some((hint) => voice.name.toLowerCase().includes(hint)),
    );
    if (male) return male;
    return candidates[0];
  }

  void PREFERRED_VOICE_HINTS;
  return voices[0];
}

export default function VoiceTour() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const bannerOpen = useUiStore((state) => state.cookieBannerOpen);
  const setVoiceTourActive = useUiStore((state) => state.setVoiceTourActive);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setVoiceTourActive(false);
  }, [setVoiceTourActive]);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.lang = "en-KE";

    const voice = pickVoice(voicesRef.current);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setSpeaking(true);
      setStarted(true);
      setFinished(false);
      setVoiceTourActive(true);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setFinished(true);
      setVoiceTourActive(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setVoiceTourActive(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [setVoiceTourActive]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!supported || hasInteracted) return;

    const onFirstInteraction = (event?: Event) => {
      const target = event?.target as HTMLElement | null;
      if (target?.closest("[data-voice-tour]")) {
        setHasInteracted(true);
        return;
      }
      setHasInteracted(true);
      speak();
    };

    const onScroll = () => {
      if (window.scrollY > 80) {
        onFirstInteraction();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true, once: false });
    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [hasInteracted, speak, supported]);

  if (!supported) {
    return null;
  }

  const label = speaking
    ? "Site voice tour, click to mute"
    : finished
      ? "Replay tour"
      : "Site voice tour, click to play";

  const handleClick = () => {
    setHasInteracted(true);
    if (speaking) {
      stop();
      setMuted(true);
      return;
    }
    if (muted) {
      setMuted(false);
    }
    speak();
  };

  return (
    <div
      className="fixed left-6 z-[9998] transition-all duration-300"
      style={{ bottom: bannerOpen ? "calc(24px + 148px)" : "24px" }}
    >
      <div className="group relative" data-voice-tour>
        <span
          role="tooltip"
          id="voice-tour-tooltip"
          className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--dark)] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {speaking ? "Click to mute the tour" : "Hear what this site is about"}
        </span>
        <button
          type="button"
          onClick={handleClick}
          aria-label={label}
          aria-describedby="voice-tour-tooltip"
          aria-pressed={speaking}
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-[var(--primary)]/25 bg-white text-[var(--primary)] shadow-[0_12px_30px_-12px_rgba(26,42,54,0.55)] transition-transform hover:scale-105 ${
            speaking ? "voice-ring-active" : ""
          }`}
        >
          {speaking ? (
            <Volume2 className="h-6 w-6" aria-hidden="true" />
          ) : (
            <VolumeX className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
      {started && (
        <span className="sr-only" aria-live="polite">
          {speaking ? "Voice tour playing" : finished ? "Replay tour available" : ""}
        </span>
      )}
    </div>
  );
}
