import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ParchmentCard from '../ui/ParchmentCard';
import { useButterflyEffect } from '../../hooks/useButterflyEffect';
import { SETTINGS_CATALOG, formatSettingValue } from '../../lib/rippleEngine';
import type { SettingKey, Settings } from '../../types/butterfly';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const { settings, changeSetting } = useButterflyEffect();

  const renderControl = (key: SettingKey) => {
    const value = settings[key];
    switch (key) {
      case 'theme_warmth':
        return (
          <input
            type="range"
            min={0}
            max={100}
            value={value as number}
            onChange={(e) => changeSetting(key, parseInt(e.target.value) as Settings[typeof key])}
            className="w-full accent-[var(--color-rust-accent)]"
            aria-label="Theme warmth"
          />
        );
      case 'font_size_scale':
        return (
          <select
            value={value as number}
            onChange={(e) => changeSetting(key, parseFloat(e.target.value) as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Font size scale"
          >
            {[0.9, 0.95, 1.0, 1.05, 1.1].map((v) => (
              <option key={v} value={v}>{v}x</option>
            ))}
          </select>
        );
      case 'card_texture':
        return (
          <input
            type="range"
            min={0}
            max={100}
            value={(value as number) * 100}
            onChange={(e) => changeSetting(key, parseInt(e.target.value) / 100 as Settings[typeof key])}
            className="w-full accent-[var(--color-rust-accent)]"
            aria-label="Card texture intensity"
          />
        );
      case 'progress_bar_style':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Progress bar style"
          >
            {['quill', 'hourglass', 'thread'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );
      case 'date_format':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Date format"
          >
            {['relative', 'short', 'long'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );
      case 'backer_anonymity':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Backer anonymity"
          >
            <option value="show_name">Show names</option>
            <option value="anonymous">Anonymous</option>
          </select>
        );
      case 'currency_symbol':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Currency symbol"
          >
            {['$', '£', '€', '₹'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );
      case 'notification_sound':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Notification sound"
          >
            {['chime', 'bell', 'harp', 'none'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        );
      case 'sort_order':
        return (
          <select
            value={value as string}
            onChange={(e) => changeSetting(key, e.target.value as Settings[typeof key])}
            className="parchment-input text-sm py-1"
            aria-label="Sort order"
          >
            <option value="newest">Newest</option>
            <option value="most_funded">Most funded</option>
            <option value="almost_there">Almost there</option>
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md overflow-y-auto"
            style={{ backgroundColor: 'var(--color-parchment-bg)' }}
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold"
                    style={{ color: 'var(--color-ink)' }}>
                    🦋 Settings
                  </h2>
                  <p className="text-xs italic mt-0.5"
                    style={{ color: 'var(--color-ink-faded)' }}>
                    Every change may ripple…
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ink-button ghost text-lg"
                  aria-label="Close settings"
                >
                  ✕
                </button>
              </div>

              <div className="ornament-divider text-xs" aria-hidden="true">❧ ✦ ❧</div>

              {/* Settings list */}
              <div className="flex flex-col gap-5 mt-6">
                {SETTINGS_CATALOG.map((setting) => (
                  <ParchmentCard key={setting.key} noFold className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <label className="text-sm font-bold"
                        style={{ color: 'var(--color-ink)' }}>
                        {setting.label}
                      </label>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: 'rgba(201, 168, 76, 0.15)',
                          color: 'var(--color-gold-leaf)',
                        }}>
                        may ripple
                      </span>
                    </div>
                    <p className="text-xs mb-2"
                      style={{ color: 'var(--color-ink-faded)' }}>
                      {setting.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        {renderControl(setting.key)}
                      </div>
                      <span className="text-xs font-mono shrink-0"
                        style={{ color: 'var(--color-sepia-mid)' }}>
                        {formatSettingValue(setting.key, settings[setting.key])}
                      </span>
                    </div>
                  </ParchmentCard>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
