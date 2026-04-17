import { motion, useReducedMotion } from 'framer-motion';

interface WaxSealProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WaxSeal({ className = '', size = 'md' }: WaxSealProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'w-10 h-10 text-[0.5rem]',
    md: 'w-14 h-14 text-[0.65rem]',
    lg: 'w-20 h-20 text-xs',
  };

  return (
    <motion.div
      className={`wax-seal ${sizeClasses[size]} ${className}`}
      initial={shouldReduceMotion ? {} : { scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
      aria-label="Fully funded"
    >
      <span>
        FULLY<br />FUNDED
      </span>
    </motion.div>
  );
}
