import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import ProjectGrid from '../components/projects/ProjectGrid';
import { useProjectFeed } from '../hooks/useProjectFeed';

const categories = [
  { value: 'all', label: 'All Projects', icon: '✦' },
  { value: 'paths', label: 'Paths', icon: '🛤️' },
  { value: 'greenery', label: 'Greenery', icon: '🌿' },
  { value: 'art', label: 'Art', icon: '🎨' },
  { value: 'safety', label: 'Safety', icon: '🔦' },
];

export default function Discover() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const projects = useProjectFeed(activeCategory);

  return (
    <PageWrapper>
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2"
            style={{ color: 'var(--color-ink)' }}>
            Discover Projects
          </h1>
          <p className="font-body text-base"
            style={{ color: 'var(--color-ink-faded)' }}>
            Explore community weaves near you — find one that tugs at your thread.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className="font-body text-sm px-4 py-2 rounded transition-all duration-200 border"
              style={{
                backgroundColor: activeCategory === cat.value ? 'var(--color-rust-accent)' : 'var(--color-parchment-light)',
                color: activeCategory === cat.value ? 'var(--color-parchment-light)' : 'var(--color-ink-faded)',
                borderColor: activeCategory === cat.value ? 'var(--color-rust-accent)' : 'var(--color-parchment-dark)',
              }}
              onClick={() => setActiveCategory(cat.value)}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm font-mono mb-4"
          style={{ color: 'var(--color-sepia-mid)' }}>
          {projects.length} project{projects.length !== 1 ? 's' : ''} found
        </p>

        {/* Project grid */}
        <ProjectGrid projects={projects} />
      </motion.div>
    </PageWrapper>
  );
}
