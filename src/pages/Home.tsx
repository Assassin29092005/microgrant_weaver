import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import ProjectGrid from '../components/projects/ProjectGrid';
import InkButton from '../components/ui/InkButton';
import { useProjectStore } from '../store/projectStore';

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const allProjects = useProjectStore((s) => s.projects);

  const featuredProjects = useMemo(() => {
    return allProjects
      .filter((p) => !p.isFunded)
      .sort((a, b) => {
        const aPct = a.raisedAmount / a.goalAmount;
        const bPct = b.raisedAmount / b.goalAmount;
        return bPct - aPct;
      })
      .slice(0, 4);
  }, [allProjects]);

  const totalBacked = useMemo(() => allProjects.reduce((sum, p) => sum + p.raisedAmount, 0), [allProjects]);
  const totalBackers = useMemo(() => allProjects.reduce((sum, p) => sum + p.backerCount, 0), [allProjects]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-3xl mb-4" aria-hidden="true">🧵</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--color-ink)' }}>
            Weave Your Community<br />
            <span style={{ color: 'var(--color-rust-accent)' }}>Forward</span>
          </h1>
          <p className="font-body text-lg sm:text-xl max-w-2xl mx-auto mb-2"
            style={{ color: 'var(--color-ink-faded)' }}>
            Micro-grants for hyperlocal projects that stitch neighborhoods together.
            Fix a sidewalk. Plant a garden. Paint a mural. Every dollar weaves a thread.
          </p>

          <div className="ornament-divider text-sm my-6" aria-hidden="true">❧ ✦ ⁕ ✦ ❧</div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-8"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--color-moss-green)' }}>
                ${totalBacked.toLocaleString()}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-sepia-mid)' }}>
                Woven
              </span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--color-gold-leaf)' }}>
                {totalBackers}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-sepia-mid)' }}>
                Weavers
              </span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--color-rust-accent)' }}>
                {allProjects.length}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-sepia-mid)' }}>
                Projects
              </span>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/discover">
              <InkButton size="lg">Discover Projects</InkButton>
            </Link>
            <Link to="/submit">
              <InkButton variant="secondary" size="lg">Start a Project</InkButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold"
            style={{ color: 'var(--color-ink)' }}>
            ✦ Featured Weaves
          </h2>
          <Link to="/discover"
            className="text-sm font-body no-underline transition-colors hover:text-[var(--color-rust-accent)]"
            style={{ color: 'var(--color-ink-faded)' }}>
            View all →
          </Link>
        </div>
        <ProjectGrid projects={featuredProjects} />
      </section>

      {/* How it works teaser */}
      <section className="py-12 text-center">
        <div className="ornament-divider text-sm mb-6" aria-hidden="true">⁕ ❧ ⁕</div>
        <h2 className="font-display text-xl font-bold mb-3"
          style={{ color: 'var(--color-ink)' }}>
          How Does It Work?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-6">
          {[
            { icon: '📜', title: 'Propose', desc: 'Share a hyperlocal project idea — $50 to $500.' },
            { icon: '🧵', title: 'Weave', desc: 'Community members weave in micro-donations.' },
            { icon: '🦋', title: 'Ripple', desc: 'Every action sends subtle ripples across the platform.' },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              className="text-center"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.15 }}
            >
              <span className="text-3xl">{step.icon}</span>
              <h3 className="font-display text-lg font-bold mt-2 mb-1"
                style={{ color: 'var(--color-ink)' }}>
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-ink-faded)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/how-it-works">
            <InkButton variant="ghost">Learn more about the Butterfly Effect →</InkButton>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
