import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ButterflyRippleProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function ButterflyRipple({ isVisible, onComplete }: ButterflyRippleProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 900);
          }}
        >
          {/* Ripple rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                borderColor: 'var(--color-gold-leaf)',
                opacity: 0.15,
              }}
              initial={{ width: 0, height: 0, opacity: 0.3 }}
              animate={{
                width: [0, 300 + i * 200],
                height: [0, 300 + i * 200],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Butterfly emoji */}
          <motion.span
            className="text-5xl absolute"
            initial={{ scale: 0, rotate: -30 }}
            animate={{
              scale: [0, 1.3, 1],
              rotate: [-30, 10, 0],
              y: [0, -20, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-hidden="true"
          >
            🦋
          </motion.span>

          {/* Subtle screen tint */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--color-gold-leaf)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.04, 0] }}
            transition={{ duration: 1.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
