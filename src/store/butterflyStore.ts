import { create } from 'zustand';
import type { Settings, RippleEvent, SettingKey, Mutation } from '../types/butterfly';
import { DEFAULT_SETTINGS } from '../types/butterfly';

interface ButterflyStore {
  settings: Settings;
  rippleHistory: RippleEvent[];
  activeRipple: RippleEvent | null;
  isRippling: boolean;
  updateSetting: (key: SettingKey, value: Settings[SettingKey]) => void;
  applyMutations: (triggeredBy: SettingKey, mutations: Mutation[]) => void;
  clearActiveRipple: () => void;
}

export const useButterflyStore = create<ButterflyStore>((set) => ({
  settings: DEFAULT_SETTINGS,
  rippleHistory: [],
  activeRipple: null,
  isRippling: false,

  updateSetting: (key, value) => {
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    }));
  },

  applyMutations: (triggeredBy, mutations) => {
    const rippleEvent: RippleEvent = {
      id: `ripple-${Date.now()}`,
      triggeredBy,
      mutations,
      timestamp: Date.now(),
    };

    set((state) => {
      const newSettings = { ...state.settings };
      for (const m of mutations) {
        (newSettings as Record<string, unknown>)[m.key] = m.newValue;
      }
      return {
        settings: newSettings,
        rippleHistory: [rippleEvent, ...state.rippleHistory].slice(0, 50),
        activeRipple: rippleEvent,
        isRippling: true,
      };
    });
  },

  clearActiveRipple: () => {
    set({ activeRipple: null, isRippling: false });
  },
}));
