import { motion, useReducedMotion } from 'framer-motion';
import ParchmentCard from '../ui/ParchmentCard';
import ProgressQuill from '../ui/ProgressQuill';
import WaxSeal from '../ui/WaxSeal';
import { formatCurrency, formatPercentage } from '../../lib/formatCurrency';
import { useButterflyStore } from '../../store/butterflyStore';
import type { Project } from '../../types/project';

interface ProjectDetailProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  paths: '🛤️ Paths & Walkways',
  greenery: '🌿 Greenery & Gardens',
  art: '🎨 Art & Culture',
  safety: '🔦 Safety & Lighting',
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const shouldReduceMotion = useReducedMotion();
  const currencySymbol = useButterflyStore((s) => s.settings.currency_symbol);
  const percentage = formatPercentage(project.raisedAmount, project.goalAmount);

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ParchmentCard noFold className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <span className={`category-badge ${project.category} mb-3 inline-block`}>
              {categoryLabels[project.category]}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-1"
              style={{ color: 'var(--color-ink)' }}>
              {project.title}
            </h2>
            <p className="text-sm font-mono"
              style={{ color: 'var(--color-sepia-mid)' }}>
              📍 {project.location} · {project.neighborhood}
            </p>
            <p className="text-sm mt-1"
              style={{ color: 'var(--color-ink-faded)' }}>
              Started by <strong style={{ color: 'var(--color-ink)' }}>{project.creatorName}</strong> on {project.createdAt}
            </p>
          </div>
          {project.isFunded && <WaxSeal size="lg" />}
        </div>

        {/* Ornamental divider */}
        <div className="ornament-divider text-xs" aria-hidden="true">❧ ✦ ❧</div>

        {/* Funding progress */}
        <div className="my-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="font-mono text-2xl font-bold"
                style={{ color: 'var(--color-moss-green)' }}>
                {formatCurrency(project.raisedAmount, currencySymbol)}
              </span>
              <span className="font-mono text-sm ml-2"
                style={{ color: 'var(--color-ink-faded)' }}>
                of {formatCurrency(project.goalAmount, currencySymbol)} goal
              </span>
            </div>
            <span className="text-sm font-mono"
              style={{ color: 'var(--color-ink-faded)' }}>
              {project.backerCount} weaver{project.backerCount !== 1 ? 's' : ''}
            </span>
          </div>
          <ProgressQuill percentage={percentage} showLabel={false} />
        </div>

        {/* Story */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold mb-3"
            style={{ color: 'var(--color-ink)' }}>
            The Story
          </h3>
          <p className="text-base leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--color-ink-faded)' }}>
            {project.story}
          </p>
        </div>

        {/* Updates */}
        {project.updates.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold mb-3"
              style={{ color: 'var(--color-ink)' }}>
              Updates
            </h3>
            <div className="flex flex-col gap-3">
              {project.updates.map((update) => (
                <div key={update.id}
                  className="pl-4 border-l-2"
                  style={{ borderColor: 'var(--color-gold-leaf)' }}>
                  <p className="text-xs font-mono mb-1"
                    style={{ color: 'var(--color-sepia-mid)' }}>
                    {update.date}
                  </p>
                  <p className="text-sm"
                    style={{ color: 'var(--color-ink-faded)' }}>
                    {update.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </ParchmentCard>
    </motion.div>
  );
}
