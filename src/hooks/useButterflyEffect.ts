import { useCallback } from 'react';
import { useButterflyStore } from '../store/butterflyStore';
import { triggerRipple } from '../lib/rippleEngine';
import type { SettingKey, Settings } from '../types/butterfly';

export function useButterflyEffect() {
  const settings = useButterflyStore((s) => s.settings);
  const updateSetting = useButterflyStore((s) => s.updateSetting);
  const applyMutations = useButterflyStore((s) => s.applyMutations);
  const isRippling = useButterflyStore((s) => s.isRippling);
  const activeRipple = useButterflyStore((s) => s.activeRipple);
  const clearActiveRipple = useButterflyStore((s) => s.clearActiveRipple);

  const changeSetting = useCallback(
    (key: SettingKey, value: Settings[SettingKey]) => {
      // Apply the user's intended change
      updateSetting(key, value);

      // Trigger the butterfly effect — 3 random settings shift
      const ripple = triggerRipple(key, { ...settings, [key]: value });
      applyMutations(key, ripple.mutations);
    },
    [settings, updateSetting, applyMutations]
  );

  return {
    settings,
    changeSetting,
    isRippling,
    activeRipple,
    clearActiveRipple,
  };
}
