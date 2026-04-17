import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { RippleEvent } from '../../types/butterfly';
import { getSettingLabel, formatSettingValue } from '../../lib/rippleEngine';

interface RippleNoticeProps {
  ripple: RippleEvent | null;
  onDismiss: () => void;
}

export default function RippleNotice({ ripple, onDismiss }: RippleNoticeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {ripple && (
        <motion.div
          className="fixed bottom-6 right-6 z-[9990] max-w-sm"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className="parchment-card p-4 shadow-lg border"
            style={{ borderColor: 'var(--color-gold-leaf)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">🦋</span>
                <h4 className="font-display text-sm font-bold"
                  style={{ color: 'var(--color-ink)' }}>
                  Butterfly Effect
                </h4>
              </div>
              <button
                onClick={onDismiss}
                className="text-xs px-1.5 py-0.5 rounded transition-colors hover:bg-[rgba(139,99,66,0.1)]"
                style={{ color: 'var(--color-ink-faded)' }}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>

            <p className="text-xs italic mb-3"
              style={{ color: 'var(--color-ink-faded)' }}>
              Your change sent ripples — 3 settings shifted
            </p>

            {/* Mutations list */}
            <div className="flex flex-col gap-1.5">
              {ripple.mutations.map((m, i) => (
                <motion.div
                  key={m.key}
                  className="flex items-center gap-2 text-xs"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.12 }}
                >
                  <span className="text-sm" aria-hidden="true">✦</span>
                  <span className="font-bold" style={{ color: 'var(--color-ink)' }}>
                    {getSettingLabel(m.key)}
                  </span>
                  <span style={{ color: 'var(--color-ink-faded)' }}>
                    {formatSettingValue(m.key, m.oldValue)} → {formatSettingValue(m.key, m.newValue)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
