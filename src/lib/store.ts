"use client";

import { create } from "zustand";

type UiState = {
  cookieBannerOpen: boolean;
  setCookieBannerOpen: (open: boolean) => void;
  voiceTourActive: boolean;
  setVoiceTourActive: (active: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  cookieBannerOpen: false,
  setCookieBannerOpen: (open) => set({ cookieBannerOpen: open }),
  voiceTourActive: false,
  setVoiceTourActive: (active) => set({ voiceTourActive: active }),
}));
