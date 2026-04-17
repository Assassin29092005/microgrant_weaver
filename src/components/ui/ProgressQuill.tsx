import { motion, useReducedMotion } from 'framer-motion';

interface ProgressQuillProps {
  percentage: number;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressQuill({ percentage, className = '', showLabel = true }: ProgressQuillProps) {
  const shouldReduceMotion = useReducedMotion();
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-mono font-bold"
            style={{ color: 'var(--color-gold-leaf)' }}>
            {clamped}% funded
          </span>
        </div>
      )}
      <div className="progress-quill-track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={`${clamped}% funded`}>
        <motion.div
          className="progress-quill-fill"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </div>
  );
}
