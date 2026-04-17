import { triggerRipple } from '../../lib/rippleEngine';
import { useButterflyStore } from '../../store/butterflyStore';
import type { SettingKey } from '../../types/butterfly';

/**
 * ButterflyEngine — orchestrates ripple triggers.
 * Use this when you need to trigger a ripple from outside a React component.
 */
export function triggerButterflyRipple(changedKey: SettingKey) {
  const store = useButterflyStore.getState();
  const result = triggerRipple(changedKey, store.settings);
  store.applyMutations(changedKey, result.mutations);
}
