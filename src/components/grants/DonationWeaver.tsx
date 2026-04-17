import { motion, useReducedMotion } from 'framer-motion';
import ParchmentCard from '../ui/ParchmentCard';
import InkButton from '../ui/InkButton';
import AmountPicker from './AmountPicker';
import { useDonation } from '../../hooks/useDonation';

interface DonationWeaverProps {
  projectId: string;
  projectTitle: string;
  isFunded: boolean;
}

export default function DonationWeaver({ projectId, projectTitle, isFunded }: DonationWeaverProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    amount,
    name,
    message,
    isAnonymous,
    isSubmitting,
    isComplete,
    setAmount,
    setName,
    setMessage,
    setAnonymous,
    submitDonation,
  } = useDonation(projectId);

  if (isFunded) {
    return (
      <ParchmentCard noFold className="p-6 text-center">
        <p className="text-2xl mb-2" aria-hidden="true">🎉</p>
        <h3 className="font-display text-lg font-bold mb-1"
          style={{ color: 'var(--color-moss-green)' }}>
          Fully Funded!
        </h3>
        <p className="text-sm italic" style={{ color: 'var(--color-ink-faded)' }}>
          This project has been woven to completion. Thank you, community.
        </p>
      </ParchmentCard>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ParchmentCard noFold className="p-6 text-center">
          <p className="text-3xl mb-2" aria-hidden="true">🧵✨</p>
          <h3 className="font-display text-xl font-bold mb-1"
            style={{ color: 'var(--color-moss-green)' }}>
            Thread Woven!
          </h3>
          <p className="text-sm italic" style={{ color: 'var(--color-ink-faded)' }}>
            Your contribution to "{projectTitle}" has been woven into the fabric of your community.
          </p>
        </ParchmentCard>
      </motion.div>
    );
  }

  return (
    <ParchmentCard noFold className="p-6">
      <h3 className="font-display text-xl font-bold mb-1"
        style={{ color: 'var(--color-ink)' }}>
        Weave In Your Support
      </h3>
      <p className="text-sm mb-5 italic"
        style={{ color: 'var(--color-ink-faded)' }}>
        Even $1 strengthens the thread.
      </p>

      <div className="flex flex-col gap-5">
        {/* Amount */}
        <AmountPicker selectedAmount={amount} onSelect={setAmount} />

        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-1.5"
            style={{ color: 'var(--color-ink)' }}>
            Your Name
          </label>
          <input
            className="parchment-input"
            placeholder="Your display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isAnonymous}
            style={{ opacity: isAnonymous ? 0.5 : 1 }}
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="accent-[var(--color-rust-accent)]"
            />
            <span className="text-xs" style={{ color: 'var(--color-ink-faded)' }}>
              Weave anonymously as "A Neighbor"
            </span>
          </label>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-bold mb-1.5"
            style={{ color: 'var(--color-ink)' }}>
            Leave a thread <span className="font-normal italic">(optional)</span>
          </label>
          <textarea
            className="parchment-textarea"
            placeholder="A few words of encouragement..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{ minHeight: '80px' }}
          />
        </div>

        {/* Submit */}
        <InkButton
          size="lg"
          onClick={submitDonation}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Weaving...' : `🧵 Weave $${amount} into this project`}
        </InkButton>
      </div>
    </ParchmentCard>
  );
}
