import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ParchmentCard from '../ui/ParchmentCard';
import ProgressQuill from '../ui/ProgressQuill';
import WaxSeal from '../ui/WaxSeal';
import { formatCurrency, formatPercentage } from '../../lib/formatCurrency';
import { useButterflyStore } from '../../store/butterflyStore';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons: Record<string, string> = {
  paths: '🛤️',
  greenery: '🌿',
  art: '🎨',
  safety: '🔦',
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const currencySymbol = useButterflyStore((s) => s.settings.currency_symbol);
  const percentage = formatPercentage(project.raisedAmount, project.goalAmount);

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.4,
        delay: index * 0.08,
        ease: 'easeOut',
      }}
    >
      <ParchmentCard
        as="article"
        className="h-full"
        onClick={() => navigate(`/project/${project.id}`)}
      >
        {/* Category badge & Funded seal */}
        <div className="flex items-start justify-between mb-3">
          <span className={`category-badge ${project.category}`}>
            {categoryIcons[project.category]} {project.category}
          </span>
          {project.isFunded && <WaxSeal size="sm" />}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold leading-snug mb-2"
          style={{ color: 'var(--color-ink)' }}>
          {project.title}
        </h3>

        {/* Neighborhood */}
        <p className="text-xs font-mono mb-3"
          style={{ color: 'var(--color-sepia-mid)' }}>
          📍 {project.neighborhood}
        </p>

        {/* Story excerpt */}
        <p className="text-sm mb-4 line-clamp-3"
          style={{ color: 'var(--color-ink-faded)' }}>
          {project.story}
        </p>

        {/* Progress */}
        <ProgressQuill percentage={percentage} className="mb-3" />

        {/* Stats */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-bold"
            style={{ color: 'var(--color-moss-green)' }}>
            {formatCurrency(project.raisedAmount, currencySymbol)}
            <span className="font-normal" style={{ color: 'var(--color-ink-faded)' }}>
              {' '}of {formatCurrency(project.goalAmount, currencySymbol)}
            </span>
          </span>
          <span className="text-xs font-mono"
            style={{ color: 'var(--color-ink-faded)' }}>
            {project.backerCount} weaver{project.backerCount !== 1 ? 's' : ''}
          </span>
        </div>
      </ParchmentCard>
    </motion.div>
  );
}
